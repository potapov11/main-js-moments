var moveZeroes = function (nums) {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      nums[write] = nums[read];
      write++;
    }
  }
  for (let i = write; i < nums.length; i++) {
    nums[i] = 0;
  }
};

const nums = [0, 1, 0, 3, 12];
moveZeroes(nums);
console.log(nums); 