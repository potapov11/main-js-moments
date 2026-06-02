const createLogger = (level = 'info') => {
	const levels = ['debug', 'info', 'warn', 'error'];
	const index = levels.indexOf(level);
	if (index === -1) {
		throw new Error('Unknown log level: ' + level);
	}
	const shouldLog = (target) => levels.indexOf(target) >= index;
	const format = (target, args) => {
		const ts = new Date().toISOString();
		return [`[${ts}][${target.toUpperCase()}]`, ...args];
	};
	return Object.freeze({
		debug: (...args) => shouldLog('debug') && console.log(...format('debug', args)),
		info: (...args) => shouldLog('info') && console.info(...format('info', args)),
		warn: (...args) => shouldLog('warn') && console.warn(...format('warn', args)),
		error: (...args) => shouldLog('error') && console.error(...format('error', args)),
	});
};

const logger = createLogger('debug');

class ApiError extends Error {
	constructor(message, statusCode, details) {
		super(message);
		this.name = 'ApiError';
		this.statusCode = statusCode ?? 500;
		if (details && typeof details === 'object') {
			Object.assign(this, details);
		}
	}
}

// Этот класс инкапсулирует "сервер" пользователей.
// Снаружи видны только публичные методы: listUsers / createUser / deleteUser.
// Приватные поля (#users, #nextId, #latency) и приватный метод #delay прячут детали:
// - где и как хранятся пользователи;
// - как реализована задержка/асинхронность.
// Остальной код работает только с промисами и методами, не зная внутреннюю реализацию.
class FakeUserApi {
	// Приватное поле: внешнему коду запрещено напрямую читать/менять коллекцию пользователей.
	#users = new Map();

	// Приватный счётчик id. Никто снаружи не может "подкрутить" его руками.
	#nextId = 1;

	// Приватное поле с задержкой. Можно сменить стратегию (например, рандомный delay),
	// при этом публичный API не изменится.
	#latency;

	constructor(latency = 250) {
		this.#latency = latency;
	}

	// Приватный метод: скрывает механику задержки и работы с Promise.
	// Снаружи доступен только результат (промис), но не сам механизм.
	#delay(value, fail = false) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (fail) {
					reject(value);
				} else {
					resolve(value);
				}
			}, this.#latency);
		});
	}

	async listUsers() {
		logger.debug('API listUsers');
		// Работаем через приватное поле #users — коллекцию нельзя поменять извне.
		const users = Array.from(this.#users.values());
		return this.#delay(users);
	}

	async createUser(input) {
		logger.debug('API createUser', input);
		const name = input?.name?.trim?.();
		if (!name) {
			// Ошибка тоже идёт через приватный #delay — единая точка управления "асинхронностью".
			return this.#delay(new ApiError('Name is required', 400), true);
		}
		const id = this.#nextId++;
		const user = Object.freeze({
			id,
			name,
			createdAt: new Date().toISOString(),
			role: input.role ?? 'user',
		});
		this.#users.set(id, user);
		return this.#delay(user);
	}

	async deleteUser(id) {
		logger.debug('API deleteUser', id);
		if (!this.#users.has(id)) {
			return this.#delay(new ApiError('User not found', 404, { id }), true);
		}
		this.#users.delete(id);
		return this.#delay({ ok: true });
	}
}

// Store отвечает за состояние всего приложения.
// Приватное поле #state всегда хранится как Object.freeze(...)
// и изменяется только через update — это запрещает прямую мутацию состояния снаружи.
// Приватный #listeners прячет детали подписки, чтобы нельзя было случайно испортить коллекцию слушателей.
class Store {
	// Приватное состояние: его нельзя поменять или перезаписать напрямую из внешнего кода.
	#state;

	// Приватный набор слушателей: subscribe/unsubscribe — единственный способ работать с ним.
	#listeners = new Set();

	constructor(initialState) {
		// Состояние сразу "замораживается", чтобы его не мутировали по ссылке.
		this.#state = Object.freeze({ ...initialState });
	}

	getState() {
		// Отдаём наружу только текущее значение, без возможности его менять напрямую.
		return this.#state;
	}

	subscribe(listener) {
		this.#listeners.add(listener);
		return () => this.#listeners.delete(listener);
	}

	update(reducer) {
		// Внутри класса мы сами решаем, как обновлять #state.
		// Снаружи никто не может сделать store.#state = {...} или store.#state.foo = 123.
		const draft = { ...this.#state };
		const result = reducer(draft);
		if (result && typeof result === 'object') {
			this.#state = Object.freeze({ ...result });
		} else {
			this.#state = Object.freeze(draft);
		}
		for (const fn of this.#listeners) {
			try {
				fn(this.#state);
			} catch (e) {
				logger.error('Listener error', e);
			}
		}
	}
}

// UserService — слой, который "склеивает" API и Store.
// Снаружи доступны только методы load / addUser / removeUser.
// Приватные поля #api и #store скрывают детали: откуда приходят данные и как именно хранится состояние.
class UserService {
	// Приватный API: нельзя извне "подменить" его методы без конструктора.
	#api;

	// Приватный стор: внешний код не знает, как он устроен, и не может его заменять на лету.
	#store;

	constructor(api, store) {
		this.#api = api;
		this.#store = store;
	}

	async load() {
		this.#store.update((draft) => {
			draft.isLoading = true;
			draft.error = null;
		});
		try {
			const users = await this.#api.listUsers();
			this.#store.update((draft) => {
				draft.users = users;
				draft.isLoading = false;
			});
		} catch (error) {
			this.#store.update((draft) => {
				draft.error = error;
				draft.isLoading = false;
			});
		}
	}

	async addUser(input) {
		this.#store.update((draft) => {
			draft.isSaving = true;
			draft.error = null;
		});
		try {
			const user = await this.#api.createUser(input);
			this.#store.update((draft) => {
				draft.users = [...draft.users, user];
				draft.isSaving = false;
			});
			return user;
		} catch (error) {
			this.#store.update((draft) => {
				draft.error = error;
				draft.isSaving = false;
			});
			throw error;
		}
	}

	async removeUser(id) {
		this.#store.update((draft) => {
			draft.isSaving = true;
			draft.error = null;
		});
		try {
			await this.#api.deleteUser(id);
			this.#store.update((draft) => {
				draft.users = draft.users.filter((u) => u.id !== id);
				draft.isSaving = false;
			});
		} catch (error) {
			this.#store.update((draft) => {
				draft.error = error;
				draft.isSaving = false;
			});
			throw error;
		}
	}
}

// Обёртка над состоянием через Proxy.
// Здесь приватности нет, но это пример контроля доступа к полям через ловушку get/set.
const createStateProxy = (target) => {
	const accessLog = new Map();
	const record = (prop) => {
		const prev = accessLog.get(prop) ?? 0;
		accessLog.set(prop, prev + 1);
	};
	const handler = {
		get(obj, prop, receiver) {
			if (prop === Symbol.toStringTag) return 'StateProxy';
			if (prop === 'accessLog') return accessLog;
			record(prop);
			const value = Reflect.get(obj, prop, receiver);
			if (typeof value === 'object' && value !== null) {
				return createStateProxy(value);
			}
			return value;
		},
		set(obj, prop, value) {
			// Здесь мы специально не даём мутировать состояние — только читать.
			throw new Error('State is read-only. Use store.update instead.');
		},
	};
	return new Proxy(target, handler);
};

const createIdGenerator = (prefix = 'id') => {
	let counter = 0;
	return () => {
		counter += 1;
		return `${prefix}-${counter}`;
	};
};

function* chunkify(iterable, size) {
	let chunk = [];
	for (const item of iterable) {
		chunk.push(item);
		if (chunk.length === size) {
			yield chunk;
			chunk = [];
		}
	}
	if (chunk.length) {
		yield chunk;
	}
}

const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

const withRetry = async (fn, { retries = 3, baseDelay = 100 } = {}) => {
	let attempt = 0;
	for (;;) {
		try {
			return await fn();
		} catch (error) {
			attempt += 1;
			if (attempt > retries) {
				throw error;
			}
			const jitter = Math.random() * baseDelay;
			const wait = baseDelay * attempt + jitter;
			logger.warn('Retry attempt', attempt, 'wait', wait.toFixed(0));
			await delay(wait);
		}
	}
};

const pipeline =
	(...fns) =>
	(input) =>
		fns.reduce((value, fn) => fn(value), input);

const byId = (collection) => {
	return collection.reduce((map, item) => {
		if (item && typeof item.id !== 'undefined') {
			map.set(item.id, item);
		}
		return map;
	}, new Map());
};

const groupBy = (collection, keySelector) => {
	const map = new Map();
	for (const item of collection) {
		const key = keySelector(item);
		const bucket = map.get(key);
		if (bucket) {
			bucket.push(item);
		} else {
			map.set(key, [item]);
		}
	}
	return map;
};

const sortUsers = (users) => {
	return [...users].sort((a, b) => {
		if (a.name === b.name) {
			return a.id - b.id;
		}
		return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
	});
};

const createUserViewModel = (users) => {
	const normalized = users.map((u) => ({
		...u,
		name: u.name.trim(),
	}));
	const sorted = sortUsers(normalized);
	const byRole = groupBy(sorted, (u) => u.role ?? 'user');
	return {
		all: sorted,
		byRole,
		ids: sorted.map((u) => u.id),
		byId: byId(sorted),
	};
};

const initialState = {
	users: [],
	isLoading: false,
	isSaving: false,
	error: null,
};

const api = new FakeUserApi(150);
const store = new Store(initialState);
const service = new UserService(api, store);

store.subscribe((state) => {
	const view = createUserViewModel(state.users);
	const proxyState = createStateProxy({ ...state, view });
	logger.info('STATE', {
		isLoading: proxyState.isLoading,
		isSaving: proxyState.isSaving,
		error: proxyState.error && {
			name: proxyState.error.name,
			message: proxyState.error.message,
			statusCode: proxyState.error.statusCode,
		},
		users: proxyState.view.all.map((u) => ({
			id: u.id,
			name: u.name,
			role: u.role,
		})),
	});
});

const idGen = createIdGenerator('user');

const main = async () => {
	logger.info('Start demo');
	await service.load();

	const createRandomUser = () => {
		const id = idGen();
		const roles = ['user', 'admin', 'editor'];
		const role = roles[Math.floor(Math.random() * roles.length)];
		const name = `User ${id}`;
		return { name, role };
	};

	await withRetry(() => service.addUser(createRandomUser()), {
		retries: 2,
		baseDelay: 80,
	});

	await withRetry(() => service.addUser(createRandomUser()), {
		retries: 2,
		baseDelay: 80,
	});

	const current = store.getState().users;
	if (current.length) {
		const [first] = current;
		await service.removeUser(first.id);
	}

	const finalUsers = store.getState().users;
	const chunks = [...chunkify(finalUsers, 2)];
	logger.info(
		'Final users chunks',
		chunks.map((c) => c.map((u) => u.id)),
	);
	logger.info('Demo finished');
};

main().catch((e) => {
	logger.error('Fatal error in main', e);
});
