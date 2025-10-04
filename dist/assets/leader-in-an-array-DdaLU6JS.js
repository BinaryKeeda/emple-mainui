const e="Leader in an Array",t="Given an array nums, modify it by replacing each element with the largest element to its right. The last element should be replaced with -1. Return the modified array.",n={difficulty:"Easy",tags:["Array","Greedy","Traversal","Optimized Loop"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},a=[{category:"Brute Force",algorithm:"Nested Loops",description:"Iterate through each element and find the maximum among the elements to its right. Replace the current element with this maximum.",steps:["Iterate through each element in the array except the last.","For each element at index i, scan elements from i+1 to the end.","Find the maximum among these elements.","Replace arr[i] with this maximum value.","Set the last element to -1."],time_complexity:"O(n^2)",space_complexity:"O(1)",code:{java:`class Solution {
    public int[] replaceElements(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int maxRight = arr[i + 1];
            for (int j = i + 2; j < n; j++) {
                if (arr[j] > maxRight) {
                    maxRight = arr[j];
                }
            }
            arr[i] = maxRight;
        }
        arr[n - 1] = -1;
        return arr;
    }
}`,cpp:`class Solution {
public:
    vector<int> replaceElements(vector<int>& arr) {
        int n = arr.size();
        for (int i = 0; i < n - 1; i++) {
            int maxRight = arr[i + 1];
            for (int j = i + 2; j < n; j++) {
                if (arr[j] > maxRight) {
                    maxRight = arr[j];
                }
            }
            arr[i] = maxRight;
        }
        arr[n - 1] = -1;
        return arr;
    }
};`}},{category:"Optimal",algorithm:"Reverse Traversal with Tracking",description:"Traverse the array from right to left, keeping track of the maximum seen so far, and replacing each element with this maximum.",steps:["Initialize maxSoFar as -1 (since last element becomes -1).","Traverse array from the last element to the first.","Temporarily store the current value.","Replace current element with maxSoFar.","Update maxSoFar to be the max of itself and the original value."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public int[] replaceElements(int[] arr) {
        int n = arr.length;
        int maxSoFar = -1;
        for (int i = n - 1; i >= 0; i--) {
            int current = arr[i];
            arr[i] = maxSoFar;
            maxSoFar = Math.max(maxSoFar, current);
        }
        return arr;
    }
}`,cpp:`class Solution {
public:
    vector<int> replaceElements(vector<int>& arr) {
        int n = arr.size();
        int maxSoFar = -1;
        for (int i = n - 1; i >= 0; i--) {
            int current = arr[i];
            arr[i] = maxSoFar;
            maxSoFar = max(maxSoFar, current);
        }
        return arr;
    }
};`}}],r=[{input:[12,15,8,9,10,3],output:[15,10,10,10,3,-1],explanation:"Each element is replaced with the largest element to its right; last is -1."},{input:[100],output:[-1],explanation:"Only one element → becomes -1."},{input:[5,4,3,2,1],output:[4,3,2,1,-1],explanation:"Array is in descending order → each element is replaced with its next."}],i={"1 <= n <= 100000":!0,"-10^9 <= arr[i] <= 10^9":!0},o=[{input:[],output:[],reason:"Empty array should remain empty"},{input:[0,0,0],output:[0,0,-1],reason:"All elements are the same"},{input:[-1,-2,-3],output:[-2,-3,-1],reason:"Handles negative numbers correctly"}],s=[{id:"tc1",input:[10,5,2],expected_output:[5,2,-1]},{id:"tc2",input:[1,2,3,4,5],expected_output:[5,5,5,5,-1]},{id:"tc3",input:[9],expected_output:[-1]}],l={reverse_traversal:"By traversing from the end, we avoid repeatedly scanning the remaining array and reduce time to linear.",in_place_update:"Both approaches modify the input array directly, ensuring O(1) space."},m=["Can you solve it without using extra space?","Think of how the maximum element to the right can be tracked while iterating from the end."],c=["How would the solution change if you had to return a new array instead of modifying in-place?","What if the array is being streamed and elements are being added dynamically?"],h=["Array","Greedy","Traversal","Optimization","In-place"],u={title:e,description:t,metadata:n,approaches:a,examples:r,constraints:i,edge_cases:o,test_cases:s,notes:l,hints:m,follow_up:c,tags:h};export{a as approaches,i as constraints,u as default,t as description,o as edge_cases,r as examples,c as follow_up,m as hints,n as metadata,l as notes,h as tags,s as test_cases,e as title};
