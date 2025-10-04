const e="Reverse Array in Groups",t="Given an array of integers and a group size, reverse every consecutive group of elements of that size in-place. If remaining elements are fewer than the group size, reverse them as-is.",r={difficulty:"Easy",tags:["Array","Two Pointers","In-Place Modification"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},n=[{category:"Brute-Force = Optimal",algorithm:"Explicit Group Reversal",description:"Traverse the array in increments of groupSize. For each group, reverse the subarray from current index to the smaller of current index + groupSize - 1 or the last index. This works in-place and touches each element only once.",steps:["Initialize loop variable i = 0 and iterate in steps of groupSize.","For each group, calculate left = i and right = min(i + groupSize - 1, n - 1).","Reverse the subarray from left to right using a two-pointer approach.","Repeat until i reaches the end of the array."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public void reverseInGroups(int[] arr, int k) {
        int n = arr.length;
        for (int i = 0; i < n; i += k) {
            int left = i;
            int right = Math.min(i + k - 1, n - 1);
            while (left < right) {
                int temp = arr[left];
                arr[left] = arr[right];
                arr[right] = temp;
                left++;
                right--;
            }
        }
    }
}`,cpp:`#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void reverseInGroups(vector<int> &arr, int k) {
        int n = arr.size();
        for (int i = 0; i < n; i += k) {
            int left = i;
            int right = min(i + k - 1, n - 1);
            while (left < right) {
                swap(arr[left], arr[right]);
                left++;
                right--;
            }
        }
    }
}`}}],i=[{input:{nums:[10,20,30,40,50,60],groupSize:2},output:[20,10,40,30,60,50],explanation:"Each pair of 2 elements is reversed: (10,20)->(20,10), (30,40)->(40,30), (50,60)->(60,50)"},{input:{nums:[5,8,3,9,1],groupSize:3},output:[3,8,5,1,9],explanation:"First 3 elements reversed: (5,8,3)->(3,8,5), remaining (9,1)->(1,9)"},{input:{nums:[100,200,300],groupSize:4},output:[300,200,100],explanation:"Since groupSize > array length, reverse the entire array"}],a={"1 <= groupSize <= 10^5":!0,"1 <= nums.length <= 10^5":!0,"1 <= nums[i] <= 10^9":!0},o=[{input:{nums:[1],groupSize:1},output:[1],reason:"Single element; reversing does not change the array"},{input:{nums:[7,14,21],groupSize:1},output:[7,14,21],reason:"Group size 1 means every element is its own group, no changes"},{input:{nums:[2,4,6,8],groupSize:10},output:[8,6,4,2],reason:"Group size larger than array; entire array reversed"}],s=[{id:"tc1",input:{nums:[1,2,3,4,5],groupSize:2},expected_output:[2,1,4,3,5]},{id:"tc2",input:{nums:[9,8,7,6],groupSize:4},expected_output:[6,7,8,9]}],u={in_place_note:"All changes are made directly in the input array without using extra memory.",efficiency_note:"Every element is accessed and swapped at most once; further optimization isn't possible."},p=["Try using a loop that jumps in steps of groupSize.","Use two pointers to reverse subarrays in-place.","Think of edge cases: what if fewer than groupSize elements remain?"],l=["Can you handle a situation where the array is streaming and group reversal needs to happen on-the-fly?","What if group sizes vary dynamically for each segment?","Could this logic be parallelized for very large arrays?"],c=["Array","In-Place","Two-Pointers","Reversal"],h={title:e,description:t,metadata:r,approaches:n,examples:i,constraints:a,edge_cases:o,test_cases:s,notes:u,hints:p,follow_up:l,tags:c};export{n as approaches,a as constraints,h as default,t as description,o as edge_cases,i as examples,l as follow_up,p as hints,r as metadata,u as notes,c as tags,s as test_cases,e as title};
