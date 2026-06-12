// 121. Best Time to Buy and Sell Stock
// Вход: number[] prices — цена в каждый день
// Примеры:
// Input: [7, 1, 5, 3, 6, 4]
// Output: 5
//
// Input: [7, 6, 4, 3, 1]
// Output: 0
//
// Input: [2, 4, 1]
// Output: 2

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
	let minPrice = Infinity;
	let maxProfit = 0;

	for (let i = 0; i < prices.length; i++) {
		if (prices[i] < minPrice) {
			minPrice = prices[i];
		} else {
			maxProfit = Math.max(maxProfit, prices[i] - minPrice);
		}
	}

	return maxProfit;
	// ...
};

// примеры вызова:
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log(maxProfit([7, 6, 4, 3, 1])); // 0
console.log(maxProfit([2, 4, 1])); // 2
