const t="Maximum Subarray Sum (Kadane's Algorithm)",n="Given an integer array arr, find the contiguous subarray (sequence of adjacent elements) that yields the largest possible sum, and return that sum.",e={difficulty:"Medium",tags:["Array","Kadane's Algorithm","Dynamic Programming","Prefix Sum"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},a=[{category:"Brute Force",algorithm:"Nested Loops",description:"Check all possible subarrays and return the one with the maximum sum.",steps:["Initialize max_sum to the smallest possible value (e.g., INT_MIN).","Iterate over all possible starting indices i of the subarray.","For each i, iterate over all possible ending indices j ≥ i.","Compute the sum of the subarray arr[i..j].","Update max_sum if this sum is larger.","Return max_sum after checking all subarrays."],time_complexity:"O(n²)",space_complexity:"O(1)",code:{java:`class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            int currentSum = 0;
            for (int j = i; j < nums.length; j++) {
                currentSum += nums[j];
                if (currentSum > maxSum) {
                    maxSum = currentSum;
                }
            }
        }
        return maxSum;
    }
}`,cpp:`class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int max_sum = INT_MIN;
        for (int i = 0; i < nums.size(); i++) {
            int current_sum = 0;
            for (int j = i; j < nums.size(); j++) {
                current_sum += nums[j];
                if (current_sum > max_sum) {
                    max_sum = current_sum;
                }
            }
        }
        return max_sum;
    }
};`}},{category:"Optimal",algorithm:"Kadane's Algorithm",description:"A linear time algorithm that computes the maximum subarray sum using dynamic programming by keeping track of the current and maximum sum.",steps:["Initialize max_sum and current_sum to the first element of the array.","Iterate through the array starting from the second element.","At each step, set current_sum = max(arr[i], current_sum + arr[i]).","Update max_sum if current_sum is greater than max_sum.","Return max_sum after processing the entire array."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}`,cpp:`class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int max_sum = nums[0];
        int current_sum = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            current_sum = max(nums[i], current_sum + nums[i]);
            max_sum = max(max_sum, current_sum);
        }
        return max_sum;
    }
};`}}],r=[{input:[3,-1,-2,4,-1,2,1,-3,4],output:7,explanation:"The subarray [4, -1, 2, 1, -3, 4] yields the maximum sum of 7."},{input:[-2,-3,-1,-5],output:-1,explanation:"The subarray [-1] gives the maximum sum when all numbers are negative."},{input:[2,3,-2,5,6],output:14,explanation:"The entire array [2, 3, -2, 5, 6] gives the maximum sum."}],u={"1 <= n <= 100000":!0,"-10^4 <= arr[i] <= 10^4":!0},s=[{input:[-5],output:-5,reason:"Single negative element should return itself."},{input:[1],output:1,reason:"Single positive element should return itself."},{input:[0,0,0],output:0,reason:"Zero-only array returns 0 as max sum."}],i=[{id:"tc1",input:[-1,-2,-3],expected_output:-1},{id:"tc2",input:[5,-2,3,-1,2],expected_output:7}],m={kadanes_observation:"Kadane's Algorithm avoids rechecking subarrays by extending the current subarray only when it's beneficial.",negative_case:"If all numbers are negative, Kadane's still returns the largest single negative number."},o=["Try maintaining a running sum and reset it if it becomes less than the current element.","Think about whether it's better to start a new subarray or continue the previous one.","Can you do it in one pass using constant space?"],c=["How would you modify Kadane’s Algorithm to return the actual subarray instead of just the sum?","Can you adapt it to work on a 2D matrix for maximum submatrix sum?","What changes if the array is circular (wraparound case)?"],l=["Array","Kadane's Algorithm","Dynamic Programming","Sliding Window"],h={title:t,description:n,metadata:e,approaches:a,examples:r,constraints:u,edge_cases:s,test_cases:i,notes:m,hints:o,follow_up:c,tags:l};export{a as approaches,u as constraints,h as default,n as description,s as edge_cases,r as examples,c as follow_up,o as hints,e as metadata,m as notes,l as tags,i as test_cases,t as title};
