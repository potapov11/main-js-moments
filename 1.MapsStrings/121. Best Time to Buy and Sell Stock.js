const prices = [7, 1, 5, 3, 6, 4];

var maxProfit = function (prices) {
	let dayToSell = prices[0];

	let maxProfit = 0;

	for (let i = 1; i < prices.length; i++) {
		dayToSell = Math.min(dayToSell, prices[i]);
		maxProfit = Math.max(maxProfit, prices[i] - dayToSell);
	}

	return maxProfit;
};

console.log(maxProfit(prices));
