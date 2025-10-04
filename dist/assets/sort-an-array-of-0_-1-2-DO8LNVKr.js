const n="Sort an Array of 0, 1 & 2",t="Given an array containing only 0s, 1s, and 2s, sort the array in-place using a single pass, such that all 0s come first, followed by 1s, and then 2s.",e={difficulty:"Medium",tags:["Array","Sorting","Dutch National Flag","Two Pointers"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Counting Sort",description:"Count the occurrences of 0s, 1s, and 2s and overwrite the array accordingly.",steps:["Initialize counters for 0s, 1s, and 2s.","Traverse the array once to count the number of 0s, 1s, and 2s.","Rewrite the array: fill it with 0s, then 1s, then 2s using the counters."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public void sortColors(int[] nums) {
        int count0 = 0, count1 = 0, count2 = 0;
        for (int num : nums) {
            if (num == 0) count0++;
            else if (num == 1) count1++;
            else count2++;
        }
        int i = 0;
        while (count0-- > 0) nums[i++] = 0;
        while (count1-- > 0) nums[i++] = 1;
        while (count2-- > 0) nums[i++] = 2;
    }
}`,cpp:`class Solution {
public:
    void sortColors(vector<int>& nums) {
        int count0 = 0, count1 = 0, count2 = 0;
        for (int num : nums) {
            if (num == 0) count0++;
            else if (num == 1) count1++;
            else count2++;
        }
        int i = 0;
        while (count0--) nums[i++] = 0;
        while (count1--) nums[i++] = 1;
        while (count2--) nums[i++] = 2;
    }
};`}},{category:"Optimal",algorithm:"Dutch National Flag Algorithm",description:"Use three pointers to sort the array in a single traversal: low for 0s, mid for current element, high for 2s.",steps:["Initialize three pointers: low = 0, mid = 0, high = nums.length - 1.","While mid <= high:","- If nums[mid] == 0: swap with nums[low], increment both low and mid.","- If nums[mid] == 1: increment mid.","- If nums[mid] == 2: swap with nums[high], decrement high (do not move mid).","Stop when mid > high."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low, mid);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums, mid, high);
                high--;
            }
        }
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}`,cpp:`class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low++], nums[mid++]);
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums[mid], nums[high--]);
            }
        }
    }
};`}}],o=[{input:[2,1,0,2,1,0],output:[0,0,1,1,2,2],explanation:"0s grouped first, followed by 1s, then 2s."},{input:[2,0,1],output:[0,1,2],explanation:"Each unique color is sorted in order."},{input:[1,1,1,0],output:[0,1,1,1],explanation:"Single 0 moved to the front, rest are 1s."}],s={"1 <= n <= 10^5":!0,"colors[i] ∈ {0, 1, 2}":!0},a=[{input:[0,0,0],output:[0,0,0],reason:"All elements are same (0)."},{input:[2,2,2],output:[2,2,2],reason:"All elements are same (2)."},{input:[1],output:[1],reason:"Only one element in the array."}],r=[{id:"tc1",input:[2,0,1,2,1,0],expected_output:[0,0,1,1,2,2]},{id:"tc2",input:[0,1,2,1,0,2,1],expected_output:[0,0,1,1,1,2,2]}],u={why_dnf_works:"The Dutch National Flag algorithm efficiently partitions the array into three segments using constant space and one traversal.",always_linear:"Regardless of input order, the optimal solution makes one pass, hence always O(n)."},l=["Try solving using counting sort first.","Can you sort the array in one pass with constant space?","Think of a three-pointer approach: one for each segment."],c=["Can you generalize this approach for arrays with more than three distinct values?","How would this work in a linked list version of the problem?","What changes would be required to make this stable (preserve original order)?"],m=["Array","Sorting","Dutch National Flag","Two Pointers","In-Place Sorting"],h={title:n,description:t,metadata:e,approaches:i,examples:o,constraints:s,edge_cases:a,test_cases:r,notes:u,hints:l,follow_up:c,tags:m};export{i as approaches,s as constraints,h as default,t as description,a as edge_cases,o as examples,c as follow_up,l as hints,e as metadata,u as notes,m as tags,r as test_cases,n as title};
