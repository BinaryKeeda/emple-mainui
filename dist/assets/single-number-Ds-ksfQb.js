const e="Single Number",n="Given a non-empty array of integers arr, where every element appears exactly twice except for one element that appears only once, find that unique element. Your solution must have linear runtime complexity (O(n)) and use only constant extra space (O(1)).",t={difficulty:"Easy",tags:["Bit Manipulation","Hash Map","Array","XOR"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},a=[{category:"Brute Force",algorithm:"Frequency Count using HashMap",description:"Count occurrences of each element using a hash map, then return the one with a count of 1.",steps:["Initialize an empty hash map.","Traverse the array and update the frequency count for each number.","Traverse the map entries to find the element with count = 1.","Return that element."],time_complexity:"O(n)",space_complexity:"O(n)",code:{java:`import java.util.HashMap;

class Solution {
    public int singleNumber(int[] nums) {
        HashMap<Integer, Integer> freq = new HashMap<>();
        for (int num : nums) {
            freq.put(num, freq.getOrDefault(num, 0) + 1);
        }
        for (int num : freq.keySet()) {
            if (freq.get(num) == 1) return num;
        }
        return -1; // should never reach here per problem statement
    }
}`,cpp:`#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        unordered_map<int, int> freq;
        for (int num : nums) freq[num]++;
        for (auto& pair : freq) {
            if (pair.second == 1) return pair.first;
        }
        return -1;
    }
};`}},{category:"Optimal",algorithm:"Bitwise XOR",description:"Use XOR property where a^a = 0 and a^0 = a to cancel out pairs, leaving the unique number.",steps:["Initialize result = 0.","Traverse each element of the array.","Update result = result XOR current element.","Return the final value of result."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public int singleNumber(int[] nums) {
        int result = 0;
        for (int num : nums) result ^= num;
        return result;
    }
}`,cpp:`class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int result = 0;
        for (int num : nums) result ^= num;
        return result;
    }
};`}}],r=[{input:[3,3,7],output:7,explanation:"The number 3 appears twice and cancels out, leaving 7."},{input:[8,5,6,5,6],output:8,explanation:"The numbers 5 and 6 appear twice, only 8 appears once."},{input:[10],output:10,explanation:"Only one number in the array, so it's unique."}],i={"1 <= arr.length <= 100000":!0,"Every element appears exactly twice except one":!0},u=[{input:[1],output:1,reason:"Single element case, it's the unique one."},{input:[1e6,1,1e6],output:1,reason:"Large duplicate number and one small unique."},{input:[0,0,-1],output:-1,reason:"Zero cancels itself, negative number remains."}],o=[{id:"tc1",input:[2,2,4],expected_output:4},{id:"tc2",input:[99,1,1,99,88],expected_output:88}],s={xor_logic:"The XOR operator cancels out equal numbers, making it perfect for this problem with exactly one unique element.",space_warning:"The hash map method is easier but violates the space constraint."},p=["Think about the XOR operation and its properties.","Can you solve this in one pass without using extra memory?"],c=["What if the input has three occurrences instead of two?","Can this approach be extended to find two unique numbers among duplicates?"],l=["Array","Bit Manipulation","XOR","Constant Space","Optimized Algorithm"],m={title:e,description:n,metadata:t,approaches:a,examples:r,constraints:i,edge_cases:u,test_cases:o,notes:s,hints:p,follow_up:c,tags:l};export{a as approaches,i as constraints,m as default,n as description,u as edge_cases,r as examples,c as follow_up,p as hints,t as metadata,s as notes,l as tags,o as test_cases,e as title};
