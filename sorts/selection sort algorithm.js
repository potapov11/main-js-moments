const nums = [5, 2, 9, 1, 5, 6];

function selectionSort(nums) {
    const result = [];

    function helperFindMinIndex(arr) {
        let min = arr[0];
        let minIndex = 0;

        for(let i = 0; i < arr.length; i++) {
            if(arr[i] < min) {
                min = arr[i];
                minIndex = i;
            }
        }

        return minIndex;
    }

    while(nums.length) {
        const minIndex = helperFindMinIndex(nums);
        result.push(nums[minIndex]);
        nums.splice(minIndex, 1);
    }

    return result;
}

console.log(selectionSort(nums))

function selectionSortInPlace(nums) {
    for (let i = 0; i < nums.length; i++) {
        
        let minIndex = i;

        for (let k = i + 1; k < nums.length; k++) {
            if (nums[k] < nums[minIndex]) {
                minIndex = k;
            }
        }

        if (minIndex !== i) {
            [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
        }
    }

    return nums; 
}

console.log(selectionSortInPlace(nums));
