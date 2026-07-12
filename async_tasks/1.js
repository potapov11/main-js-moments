// Задача 1. «Цепочка зависимых запросов»
// Условие:
// Напиши функцию getUserPosts(userId), которая:

// Загружает данные пользователя по адресу:
// https://jsonplaceholder.typicode.com/users/${userId}
// (из ответа нужен id и name).

// Затем, используя id пользователя, загружает все посты этого пользователя:
// https://jsonplaceholder.typicode.com/posts?userId=${userId}.

// Возвращает объект вида:

// js
// {
//   user: { id, name },
//   posts: [ ...массив постов ]
// }
// Требования:

// Используй async/await.

// Обработай ошибки (если первый запрос упадёт — не делать второй).

// Второй запрос должен ждать завершения первого (последовательно).

async function getUserPosts(userId) {
	try {
		const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

		if (!response.ok) {
			throw new Error('network failed');
		}

		const userData = await response.json();

		const userDataId = userData?.id;
		const userDataName = userData?.name;

		const responsePosts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

		if (!responsePosts.ok) {
			throw new Error('network failed');
		}

		const posts = await responsePosts.json();

		return {
			user: { userDataId, userDataName },
			posts: [...posts],
		};
	} catch (e) {
		console.error(e.message || 'error');
		throw 'error';
	}
}

getUserPosts(1)
	.then((data) => console.log(data))
	.catch((e) => console.error(e));
