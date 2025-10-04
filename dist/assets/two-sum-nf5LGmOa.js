const t="Two Sum",e="Find the indices of two distinct elements in an array that add up to a given target sum. Each input is guaranteed to have exactly one solution, and the same element cannot be used twice.",n={difficulty:"Easy",tags:["Array","HashMap","Brute Force","Two Pointers"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Nested Loops",description:"Loop through each element and check every pair to find two indices whose values sum to the target.",steps:["Loop through array with index i from 0 to n-1.","For each i, loop through index j from i+1 to n-1.","Check if values[i] + values[j] == target.","If true, return [i, j]."],time_complexity:"O(n^2)",space_complexity:"O(1)",code:{java:`class Solution {
    public int[] twoSum(int[] nums, int target) {
        int n = nums.length;
        for(int i = 0; i < n; i++) {
            for(int j = i + 1; j < n; j++) {
                if(nums[i] + nums[j] == target) {
                    return new int[] {i, j};
                }
            }
        }
        return new int[] {}; // Will not reach here due to guaranteed solution
    }
}`,cpp:`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        for(int i = 0; i < n; i++) {
            for(int j = i + 1; j < n; j++) {
                if(nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {}; // Won’t be reached since problem guarantees one solution
    }
}`}},{category:"Optimal",algorithm:"HashMap (Dictionary) Lookup",description:"Use a HashMap to store visited values and their indices. For each element, check if its complement exists in the map.",steps:["Initialize an empty HashMap to store numbers and their indices.","Loop through the array with index i.","Compute complement = target - nums[i].","If complement exists in map, return [map[complement], i].","Else, insert nums[i] with its index i into the map."],time_complexity:"O(n)",space_complexity:"O(n)",code:{java:`import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> numMap = new HashMap<>();
        for(int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if(numMap.containsKey(complement)) {
                return new int[] {numMap.get(complement), i};
            }
            numMap.put(nums[i], i);
        }
        return new int[] {};
    }
}`,cpp:`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> num_map;
        for(int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if(num_map.find(complement) != num_map.end()) {
                return {num_map[complement], i};
            }
            num_map[nums[i]] = i;
        }
        return {};
    }
}`}}],a=[{input:{values:[15,7,11,2],target_sum:9},output:[1,3],explanation:"7 (index 1) + 2 (index 3) = 9"},{input:{values:[30,10,40,20],target_sum:60},output:[2,3],explanation:"40 (index 2) + 20 (index 3) = 60"},{input:{values:[5,5],target_sum:10},output:[0,1],explanation:"5 (index 0) + 5 (index 1) = 10"}],o={"1 <= values.length <= 10^4":!0,"-10^9 <= values[i] <= 10^9":!0,"-10^9 <= target_sum <= 10^9":!0},s=[{input:{values:[0,4,3,0],target_sum:0},output:[0,3],reason:"Two zeroes at index 0 and 3 sum to 0"},{input:{values:[-3,4,3,90],target_sum:0},output:[0,2],reason:"-3 and 3 add to 0"}],u=[{id:"tc1",input:{values:[1,2,3],target_sum:5},expected_output:[1,2]},{id:"tc2",input:{values:[10,-2,5,7],target_sum:5},expected_output:[0,1]}],r={hashmap_idea:"HashMap helps reduce time complexity by checking complements in constant time.",guaranteed_solution:"You can safely return on first match because input guarantees exactly one solution."},m=["What if you store the value along with its index as you iterate?","How can you avoid using the same index twice?","Use a map to store previous values seen and check if complement exists."],p=["Can you return all pairs if multiple solutions are allowed?","What if you must return the pair with the smallest indices?","What if the array is sorted — can a two-pointer approach work then?"],c=["HashMap","Array","Two Pointers","Basic Algorithms","Lookup Table"],l={title:t,description:e,metadata:n,approaches:i,examples:a,constraints:o,edge_cases:s,test_cases:u,notes:r,hints:m,follow_up:p,tags:c};export{i as approaches,o as constraints,l as default,e as description,s as edge_cases,a as examples,p as follow_up,m as hints,n as metadata,r as notes,c as tags,u as test_cases,t as title};
