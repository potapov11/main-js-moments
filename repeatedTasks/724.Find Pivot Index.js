const nums = [1,7,3,6,5,6];

var pivotIndex = function(nums) {
    if(!nums.length) return -1;
    const totalSum = nums.reduce((acc, item) => item + acc, 0);
    
    let leftSum = 0;

    for(let i = 0; i < nums.length; i++) {
        let sumRight = null;
        sumRight = totalSum - leftSum - nums[i];
        
        if(sumRight === leftSum) {
            return i
        }
        
        leftSum += nums[i];
    }

    return -1
};

console.log(pivotIndex(nums))
