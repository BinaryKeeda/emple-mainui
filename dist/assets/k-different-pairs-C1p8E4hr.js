const n="K Different Pairs",e="Given an integer array and a non-negative integer target_diff, find the count of unique pairs (i, j) such that the absolute difference between values[i] and values[j] is equal to target_diff, with i ≠ j. Pairs with the same values in different orders should only be counted once. When target_diff is 0, count unique identical value pairs.",t={difficulty:"Medium",tags:["Hashing","Two Pointers","Brute Force","Array","Set"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Nested Loops with Set",description:"Use two nested loops to compare each pair of values. Use a set to store valid unique pairs with the required absolute difference to avoid duplicates.",steps:["Initialize a set to store seen unique pairs as sorted tuples.","Loop through all i from 0 to n-1.","Loop through all j from i+1 to n-1.","Check if absolute difference between nums[i] and nums[j] equals target_diff.","If true, store the pair (min, max) in the set.","Return the size of the set."],time_complexity:"O(n^2)",space_complexity:"O(n)",code:{java:`import java.util.*;

class Solution {
    public int findPairs(int[] nums, int k) {
        Set<String> seen = new HashSet<>();
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (Math.abs(nums[i] - nums[j]) == k) {
                    int a = Math.min(nums[i], nums[j]);
                    int b = Math.max(nums[i], nums[j]);
                    seen.add(a + ":" + b);
                }
            }
        }
        return seen.size();
    }
}`,cpp:`#include <vector>
#include <set>
#include <cmath>
using namespace std;

class Solution {
public:
    int findPairs(vector<int>& nums, int k) {
        set<pair<int, int>> uniquePairs;
        int n = nums.size();
        for(int i = 0; i < n; ++i) {
            for(int j = i + 1; j < n; ++j) {
                if (abs(nums[i] - nums[j]) == k) {
                    int a = min(nums[i], nums[j]);
                    int b = max(nums[i], nums[j]);
                    uniquePairs.insert({a, b});
                }
            }
        }
        return uniquePairs.size();
    }
};`}},{category:"Optimal Approach",algorithm:"Hashing with Set and Frequency Map",description:"Use a HashSet to track seen numbers and a HashMap to count frequencies. Based on target_diff value, handle zero-difference and non-zero cases separately.",steps:["If target_diff < 0, return 0 (invalid input).","If target_diff == 0:","- Build a frequency map for all numbers.","- Count keys where frequency ≥ 2 (identical value pairs).","If target_diff > 0:","- Store all numbers in a set.","- For each number in the set, check if num + k exists.","- Count such valid pairs.","Return the total count."],time_complexity:"O(n)",space_complexity:"O(n)",code:{java:`import java.util.*;

class Solution {
    public int findPairs(int[] nums, int k) {
        if (k < 0) return 0;

        Set<Integer> seen = new HashSet<>();
        Set<Integer> uniquePairs = new HashSet<>();
        Map<Integer, Integer> freq = new HashMap<>();

        if (k == 0) {
            for (int num : nums)
                freq.put(num, freq.getOrDefault(num, 0) + 1);

            int count = 0;
            for (int value : freq.values())
                if (value > 1)
                    count++;
            return count;
        } else {
            for (int num : nums)
                seen.add(num);

            for (int num : seen)
                if (seen.contains(num + k))
                    uniquePairs.add(num);

            return uniquePairs.size();
        }
    }
}`,cpp:`#include <unordered_set>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int findPairs(vector<int>& nums, int k) {
        if (k < 0) return 0;

        unordered_set<int> seen;
        unordered_set<int> uniquePairs;
        unordered_map<int, int> freq;

        if (k == 0) {
            for (int num : nums)
                freq[num]++;
            int count = 0;
            for (auto& it : freq)
                if (it.second > 1)
                    count++;
            return count;
        } else {
            for (int num : nums)
                seen.insert(num);
            for (int num : seen)
                if (seen.count(num + k))
                    uniquePairs.insert(num);
            return uniquePairs.size();
        }
    }
};`}}],a=[{input:{values:[4,2,5,2,6],target_diff:3},output:1,explanation:"Valid unique pair: (2, 5). Duplicates and reverse pairs are counted once."},{input:{values:[10,20,30,40,50],target_diff:10},output:4,explanation:"Valid pairs: (10,20), (20,30), (30,40), (40,50)"},{input:{values:[7,7,7,7],target_diff:0},output:1,explanation:"One unique identical value pair: (7,7)"}],s={"1 <= values.length <= 100000":!0,"0 <= target_diff <= 1000000000":!0,"-10^9 <= values[i] <= 10^9":!0},u=[{input:{values:[1,2,3],target_diff:4},output:0,reason:"No valid pairs exist with the given difference."},{input:{values:[1,1],target_diff:0},output:1,reason:"Only one duplicate pair exists."},{input:{values:[1],target_diff:0},output:0,reason:"Single element can't form a pair."}],r=[{id:"tc1",input:{values:[1,3,1,5,4],target_diff:0},expected_output:1},{id:"tc2",input:{values:[1,2,3,4,5],target_diff:2},expected_output:3}],o={pair_uniqueness:"Store pairs in sorted order to avoid counting (a,b) and (b,a) separately.",frequency_map:"Used only when k == 0 to find duplicates."},d=["What if you use a set to track which numbers you’ve seen?","Try storing sorted pairs to prevent duplicates.","Think about how you would handle k = 0 vs. k > 0."],c=["Can you return the actual list of unique pairs instead of just the count?","What changes if you're asked to return all indices forming valid pairs?","How would this change if the array were sorted or streamed?"],f=["Hash Map","Two Pointers","Sorting","Edge Cases","Array"],l={title:n,description:e,metadata:t,approaches:i,examples:a,constraints:s,edge_cases:u,test_cases:r,notes:o,hints:d,follow_up:c,tags:f};export{i as approaches,s as constraints,l as default,e as description,u as edge_cases,a as examples,c as follow_up,d as hints,t as metadata,o as notes,f as tags,r as test_cases,n as title};
