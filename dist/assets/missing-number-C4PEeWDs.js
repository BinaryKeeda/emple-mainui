const n="Missing Number",t="Given an array of n unique integers where all elements lie in the range [0, n], find the single missing number in this range.",e={difficulty:"Easy",tags:["Array","Math","XOR","Brute Force","Optimization"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Sort and Compare",description:"Sort the array and compare each index with the value at that index. The first mismatch is the missing number.",steps:["Sort the array.","Iterate through the sorted array.","If nums[i] != i, return i.","If no mismatch is found, return n."],time_complexity:"O(n log n)",space_complexity:"O(1)",code:{java:`import java.util.Arrays;
class Solution {
  public int missingNumber(int[] nums) {
    Arrays.sort(nums);
    int n = nums.length;
    for (int i = 0; i < n; i++) {
      if (nums[i] != i) return i;
    }
    return n;
  }
}`,cpp:`#include <vector>
#include <algorithm>
class Solution {
public:
  int missingNumber(std::vector<int>& nums) {
    std::sort(nums.begin(), nums.end());
    int n = nums.size();
    for (int i = 0; i < n; i++) {
      if (nums[i] != i) return i;
    }
    return n;
  }
}`}},{category:"Optimal (Sum Formula)",algorithm:"Expected Sum - Actual Sum",description:"Calculate expected sum using n*(n+1)/2 and subtract the actual sum of array elements.",steps:["Let n = length of array.","Compute expected sum as n*(n+1)/2.","Compute actual sum of all elements in array.","Return expected sum - actual sum."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
  public int missingNumber(int[] nums) {
    int n = nums.length;
    int expectedSum = n * (n + 1) / 2;
    int actualSum = 0;
    for (int num : nums) actualSum += num;
    return expectedSum - actualSum;
  }
}`,cpp:`#include <vector>
#include <numeric>
class Solution {
public:
  int missingNumber(std::vector<int>& nums) {
    int n = nums.size();
    int expectedSum = n * (n + 1) / 2;
    int actualSum = std::accumulate(nums.begin(), nums.end(), 0);
    return expectedSum - actualSum;
  }
}`}},{category:"Optimal (Bit Manipulation)",algorithm:"XOR Method",description:"Use XOR of all numbers from 0 to n and XOR with all array elements to find the missing number.",steps:["Initialize xor_result = 0.","XOR all numbers from 0 to n with xor_result.","XOR all elements in the array with xor_result.","Return the final xor_result as the missing number."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
  public int missingNumber(int[] nums) {
    int xorResult = 0;
    int n = nums.length;
    for (int i = 0; i <= n; i++) xorResult ^= i;
    for (int num : nums) xorResult ^= num;
    return xorResult;
  }
}`,cpp:`#include <vector>
class Solution {
public:
  int missingNumber(std::vector<int>& nums) {
    int xorResult = 0;
    int n = nums.size();
    for (int i = 0; i <= n; i++) xorResult ^= i;
    for (int num : nums) xorResult ^= num;
    return xorResult;
  }
}`}}],s=[{input:[2,1,0],output:3,explanation:"Array has 3 elements. Range should be [0, 3]. Number 3 is missing."},{input:[0,1],output:2,explanation:"Array has 2 elements. Range is [0, 2]. Number 2 is missing."},{input:[5,3,1,4,2,7,0,9,6],output:8,explanation:"Array has 9 elements. Full range is [0, 9]. Missing number is 8."}],u={"1 <= n <= 100000":!0,"0 <= arr[i] <= n":!0,"All elements are unique":!0},a=[{input:[1,2,3],output:0,reason:"0 is missing and first mismatch is at index 0."},{input:[0,1,2],output:3,reason:"No mismatch, so missing number is n."}],r=[{id:"tc1",input:[4,2,1,0],expected_output:3},{id:"tc2",input:[0],expected_output:1},{id:"tc3",input:[3,0,1],expected_output:2}],o={xor_property:"Using XOR helps avoid integer overflow and is very efficient.",sum_vs_xor:"Sum is easier to understand but XOR is safer for large values due to overflow risks."},m=["Try calculating the expected sum of 0 to n.","What happens if you XOR all indices and all values in the array?","What would the difference between the sums tell you?"],l=["Can you solve this problem in O(1) space and without modifying the input?","What if the input is a stream of numbers instead of an array?","How would your approach change if two numbers were missing instead of one?"],c=["Array","Math","Bit Manipulation","Missing Element","Optimization"],p={title:n,description:t,metadata:e,approaches:i,examples:s,constraints:u,edge_cases:a,test_cases:r,notes:o,hints:m,follow_up:l,tags:c};export{i as approaches,u as constraints,p as default,t as description,a as edge_cases,s as examples,l as follow_up,m as hints,e as metadata,o as notes,c as tags,r as test_cases,n as title};
