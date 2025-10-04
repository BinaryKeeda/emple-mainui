const t="Trapping Rain Water (Container With Most Water)",e="Given an array walls where each element walls[i] represents the height of a vertical wall at position i, find two walls that form a container (with the x-axis) holding the maximum possible water. The container cannot be tilted.",a={difficulty:"Medium",tags:["Two Pointers","Greedy","Array","Brute Force"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Nested Loop Area Calculation",description:"Check every pair of lines, calculate the area, and update max area accordingly.",steps:["Initialize max_area = 0.","Iterate i from 0 to n-1.","For each i, iterate j from i+1 to n-1.","Calculate width = j - i.","Calculate height = min(walls[i], walls[j]).","Calculate area = width * height.","Update max_area if area > max_area.","Return max_area."],time_complexity:"O(n^2)",space_complexity:"O(1)",code:{java:`class Solution {
    public int maxArea(int[] height) {
        int maxArea = 0;
        for (int i = 0; i < height.length; i++) {
            for (int j = i + 1; j < height.length; j++) {
                int currentArea = (j - i) * Math.min(height[i], height[j]);
                maxArea = Math.max(maxArea, currentArea);
            }
        }
        return maxArea;
    }
}`,cpp:`#include <vector>
#include <algorithm>
using namespace std;
class Solution {
public:
    int maxArea(vector<int>& height) {
        int max_area = 0;
        for (int i = 0; i < height.size(); i++) {
            for (int j = i + 1; j < height.size(); j++) {
                int current_area = (j - i) * min(height[i], height[j]);
                max_area = max(max_area, current_area);
            }
        }
        return max_area;
    }
};`}},{category:"Optimal (Two Pointers)",algorithm:"Two-Pointer Greedy",description:"Use two pointers starting from both ends and move inward, always advancing the smaller wall.",steps:["Initialize max_area = 0, left = 0, right = walls.length - 1.","While left < right:","  Calculate width = right - left.","  Calculate height = min(walls[left], walls[right]).","  Calculate area = width * height.","  Update max_area if area > max_area.","  If walls[left] < walls[right], increment left.","  Else, decrement right.","Return max_area."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public int maxArea(int[] height) {
        int maxArea = 0;
        int left = 0, right = height.length - 1;
        while (left < right) {
            int currentArea = (right - left) * Math.min(height[left], height[right]);
            maxArea = Math.max(maxArea, currentArea);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxArea;
    }
}`,cpp:`#include <vector>
#include <algorithm>
using namespace std;
class Solution {
public:
    int maxArea(vector<int>& height) {
        int max_area = 0;
        int left = 0, right = height.size() - 1;
        while (left < right) {
            int current_area = (right - left) * min(height[left], height[right]);
            max_area = max(max_area, current_area);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return max_area;
    }
};`}}],n=[{input:[4,9,5,3,7,2,8,6],output:35,explanation:`Walls at index 1 (height 9) and index 6 (height 8) form the largest container.
Width = 6 - 1 = 5, Height = min(9, 8) = 8, Area = 5 * 7 = 35`},{input:[5,5],output:5,explanation:"Equal heights, width = 1, height = 5, Area = 1 * 5 = 5"},{input:[2,1,4,3],output:6,explanation:"Walls at index 0 and 3: Width = 3, Height = min(2, 3) = 2, Area = 3 * 2 = 6"}],r={"2 <= walls.length <= 10^5":!0,"0 <= walls[i] <= 10^4":!0},h=[{input:[1,1,1],output:2,reason:"Max area between first and last wall: width = 2, height = 1, area = 2"},{input:[0,0,0],output:0,reason:"All wall heights are 0, area = 0"},{input:[1e4,0,1e4],output:2e4,reason:"Height limited by 10000, width = 2, area = 10000 * 2"}],l=[{id:"tc1",input:[1,2,1],expected_output:2},{id:"tc2",input:[3,10,2,1,4,6],expected_output:18}],o={greedy_pointer_movement:"Always move the pointer with the shorter wall inward to try increasing the potential height.",why_two_pointers_work:"Each step eliminates the shorter wall, never skipping any possible maximum area."},s=["Try brute force for small inputs to understand the pattern.","Focus on how the height is limited by the shorter wall.","Notice how moving the taller wall doesn't help, but moving the shorter one might."],c=["Can you modify this to find the area for multiple containers?","What if walls can change over time (dynamic array)?","Can this be extended to 2D shapes for volume?"],m=["Array","Two Pointers","Greedy","Optimization"],g={title:t,description:e,metadata:a,approaches:i,examples:n,constraints:r,edge_cases:h,test_cases:l,notes:o,hints:s,follow_up:c,tags:m};export{i as approaches,r as constraints,g as default,e as description,h as edge_cases,n as examples,c as follow_up,s as hints,a as metadata,o as notes,m as tags,l as test_cases,t as title};
