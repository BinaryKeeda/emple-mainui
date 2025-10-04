const e="Contains Duplicate",t="Given an integer array elements, determine if any value appears more than once. Return true if duplicates exist, otherwise return false.",n={difficulty:"Easy",tags:["Hashing","Array","Brute Force","Set"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},a=[{category:"Brute Force",algorithm:"Nested Loop Comparison",description:"Use two nested loops to compare all pairs of elements in the array.",steps:["Loop through each element using index i from 0 to n - 1.","For each i, loop through index j from i + 1 to n - 1.","If elements[i] == elements[j], return true (duplicate found).","If no duplicates found after full iteration, return false."],time_complexity:"O(n^2)",space_complexity:"O(1)",code:{java:`class Solution {
    public boolean containsDuplicate(int[] nums) {
        int n = nums.length;
        for(int i = 0; i < n; i++) {
            for(int j = i + 1; j < n; j++) {
                if(nums[i] == nums[j]) {
                    return true;
                }
            }
        }
        return false;
    }
}`,cpp:`class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        int n = nums.size();
        for(int i = 0; i < n; i++) {
            for(int j = i + 1; j < n; j++) {
                if(nums[i] == nums[j]) {
                    return true;
                }
            }
        }
        return false;
    }
};`}},{category:"Optimal",algorithm:"HashSet Lookup",description:"Use a HashSet to track seen elements while traversing the array.",steps:["Initialize an empty HashSet.","Traverse through each number in the array.","If the number is already in the set, return true (duplicate found).","Otherwise, add the number to the set.","If traversal completes without finding a duplicate, return false."],time_complexity:"O(n)",space_complexity:"O(n)",code:{java:`import java.util.HashSet;

class Solution {
    public boolean containsDuplicate(int[] nums) {
        HashSet<Integer> seen = new HashSet<>();
        for(int num : nums) {
            if(seen.contains(num)) {
                return true;
            }
            seen.add(num);
        }
        return false;
    }
}`,cpp:`#include <unordered_set>

class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for(int num : nums) {
            if(seen.count(num)) {
                return true;
            }
            seen.insert(num);
        }
        return false;
    }
};`}}],i=[{input:[5,8,2,5],output:!0,explanation:"The value 5 appears at index 0 and 3."},{input:[10,20,30,40],output:!1,explanation:"All values are unique."},{input:[7,7,7,7],output:!0,explanation:"The value 7 appears multiple times."}],s={"0 <= n <= 100000":!0,"10^(-9) <= arr[i] <= 10^9":!0},o=[{input:[],output:!1,reason:"Empty array has no duplicates."},{input:[1],output:!1,reason:"Single element cannot be duplicate."},{input:[2,2],output:!0,reason:"Two elements are the same."}],r=[{id:"tc1",input:[1,2,3,4,5],expected_output:!1},{id:"tc2",input:[9,8,7,6,9],expected_output:!0}],u={set_behavior:"Set provides constant-time lookup for existence check, making it ideal for duplicate detection.",early_exit:"If a duplicate is found early, the function returns immediately."},l=["Try using a data structure that remembers seen values.","Can you return early as soon as a duplicate is found?","What's the most efficient way to check if a value already appeared?"],c=["What if the input array is read-only?","What if you can only use constant space?","Can you do it with sorted data?"],p=["Array","Hashing","Duplicate Detection","Brute Force","Set Lookup"],d={title:e,description:t,metadata:n,approaches:a,examples:i,constraints:s,edge_cases:o,test_cases:r,notes:u,hints:l,follow_up:c,tags:p};export{a as approaches,s as constraints,d as default,t as description,o as edge_cases,i as examples,c as follow_up,l as hints,n as metadata,u as notes,p as tags,r as test_cases,e as title};
