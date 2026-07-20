function promiseWithTimeOut(promise, ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			promise.then(resolve).catch(reject);
		}, ms);
	});
}

const myPromise = new Promise((resolve) => resolve('success'));
promiseWithTimeOut(myPromise, 5000).then((res) => console.log(res));
