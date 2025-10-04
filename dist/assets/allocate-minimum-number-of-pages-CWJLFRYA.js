const n="Allocate Minimum Pages",t="Allocate books such that the maximum number of pages assigned to a student is minimized. Books must be allocated contiguously and in order.",e={difficulty:"Medium",tags:["Binary Search","Greedy","Array","DP"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Recursive Backtracking",description:"Try all possible contiguous splits of books into k parts recursively and track the minimum among the maximum allocations.",steps:["Base Case: If k == 1, assign all remaining books to one student.","Try all valid positions to split books for the current student.","Assign current subset to a student and solve the rest recursively for k-1 students.","Track the max pages among all students for a given split.","Return the minimum among all maximums."],time_complexity:"O(kⁿ)",space_complexity:"O(n)",code:{java:`class Solution {
    private int helper(int[] arr, int k, int start) {
        if (k == 1) {
            int sum = 0;
            for (int i = start; i < arr.length; i++) sum += arr[i];
            return sum;
        }
        int minMax = Integer.MAX_VALUE;
        int sum = 0;
        for (int i = start; i <= arr.length - k; i++) {
            sum += arr[i];
            int res = helper(arr, k - 1, i + 1);
            minMax = Math.min(minMax, Math.max(sum, res));
        }
        return minMax;
    }
    public static int findPages(int[] arr, int k) {
        if (k > arr.length) return -1;
        Solution sol = new Solution();
        return sol.helper(arr, k, 0);
    }
}`,cpp:`class Solution {
public:
    int helper(vector<int>& arr, int k, int start) {
        if (k == 1) return accumulate(arr.begin() + start, arr.end(), 0);
        int minMax = INT_MAX, sum = 0;
        for (int i = start; i <= arr.size() - k; i++) {
            sum += arr[i];
            int res = helper(arr, k - 1, i + 1);
            minMax = min(minMax, max(sum, res));
        }
        return minMax;
    }
    int findPages(vector<int>& arr, int k) {
        if (k > arr.size()) return -1;
        return helper(arr, k, 0);
    }
}`}},{category:"Optimal",algorithm:"Binary Search + Greedy Allocation",description:"Use binary search on the answer space (max pages) and check feasibility using greedy allocation.",steps:["Set low = max(arr), high = sum(arr).","While low <= high, compute mid = (low + high) / 2.","Use greedy strategy to check if books can be divided within k students such that no one exceeds mid pages.","If feasible, update result and reduce high.","Else, increase low.","Return the final minimum maximum value."],time_complexity:"O(n log(sum))",space_complexity:"O(1)",code:{java:`import java.util.Arrays;
class Solution {
    private boolean isPossible(int[] arr, int k, int mid) {
        int students = 1, sum = 0;
        for (int pages : arr) {
            if (sum + pages > mid) {
                students++;
                sum = pages;
                if (students > k) return false;
            } else {
                sum += pages;
            }
        }
        return true;
    }
    public static int findPages(int[] arr, int k) {
        if (k > arr.length) return -1;
        int low = Arrays.stream(arr).max().getAsInt();
        int high = Arrays.stream(arr).sum();
        int res = -1;
        Solution sol = new Solution();
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (sol.isPossible(arr, k, mid)) {
                res = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return res;
    }
}`,cpp:`class Solution {
public:
    bool isPossible(vector<int>& arr, int k, int mid) {
        int students = 1, sum = 0;
        for (int pages : arr) {
            if (sum + pages > mid) {
                students++;
                sum = pages;
                if (students > k) return false;
            } else {
                sum += pages;
            }
        }
        return true;
    }
    int findPages(vector<int>& arr, int k) {
        if (k > arr.size()) return -1;
        int low = *max_element(arr.begin(), arr.end());
        int high = accumulate(arr.begin(), arr.end(), 0);
        int res = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (isPossible(arr, k, mid)) {
                res = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return res;
    }
}`}}],s=[{input:{num:[10,20,30,40],k:2},output:60,explanation:"Optimal split is [10, 20, 30] and [40] with max pages 60."},{input:{num:[5,10,15],k:4},output:-1,explanation:"Cannot allocate to more students than books."}],a={"1 <= num.length <= 10^5":!0,"1 <= num[i] <= 10^6":!0,"1 <= k <= 10^5":!0},r=[{input:{num:[10,20,30],k:1},output:60,reason:"Only one student, so sum of all pages is the answer."},{input:{num:[10,20,30],k:3},output:30,reason:"Each student gets one book."},{input:{num:[10,20,30],k:5},output:-1,reason:"Not enough books to assign at least one per student."}],o=[{id:"tc1",input:{num:[12,34,67,90],k:2},expected_output:113},{id:"tc2",input:{num:[10,5,30,20],k:2},expected_output:35}],u={greedy_strategy:"Allocate books to current student until next book causes overload (pages > mid), then assign to next student.",binary_search_on_answer:"We are not searching elements, but the possible answer space between max(num) and sum(num)."},l=["Can you split the problem into decision + search?","Why can't you assign books non-contiguously?","What’s the lower and upper bound for max pages?"],m=["What if book sizes change frequently?","Can we optimize if number of students is also dynamic?","How would you modify this if some books are optional?"],c=["Greedy","Binary Search","Array Partition","Dynamic Programming"],d={title:n,description:t,metadata:e,approaches:i,examples:s,constraints:a,edge_cases:r,test_cases:o,notes:u,hints:l,follow_up:m,tags:c};export{i as approaches,a as constraints,d as default,t as description,r as edge_cases,s as examples,m as follow_up,l as hints,e as metadata,u as notes,c as tags,o as test_cases,n as title};
