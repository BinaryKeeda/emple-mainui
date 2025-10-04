const e="Merge Sort",r="Sort the given array using the Merge Sort algorithm. Merge Sort is a classic divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and merges them into a single sorted array.",t={difficulty:"Medium",tags:["Sorting","Divide and Conquer","Recursion","Array"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Recursive Merge Sort",description:"Recursively divide the array into halves, sort each half, and merge them using a temporary array.",steps:["Base Case: If l >= r, return (the subarray is already sorted).","Divide: Find the midpoint mid = l + (r - l) / 2.","Recursively sort the left half from l to mid.","Recursively sort the right half from mid+1 to r.","Merge the sorted halves using a temporary array.","Copy the merged result back to the original array."],time_complexity:"O(n log n)",space_complexity:"O(n)",code:{java:`class Solution {
    void merge(int arr[], int l, int mid, int r) {
        int[] temp = new int[r - l + 1];
        int i = l, j = mid + 1, k = 0;
        while (i <= mid && j <= r) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= r) temp[k++] = arr[j++];
        for (int p = 0; p < k; p++) arr[l + p] = temp[p];
    }
    void mergeSort(int arr[], int l, int r) {
        if (l >= r) return;
        int mid = l + (r - l) / 2;
        mergeSort(arr, l, mid);
        mergeSort(arr, mid + 1, r);
        merge(arr, l, mid, r);
    }
}`,cpp:`class Solution {
public:
    void merge(vector<int>& arr, int l, int mid, int r) {
        vector<int> temp(r - l + 1);
        int i = l, j = mid + 1, k = 0;
        while (i <= mid && j <= r) {
            if (arr[i] <= arr[j]) temp[k++] = arr[i++];
            else temp[k++] = arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= r) temp[k++] = arr[j++];
        for (int p = 0; p < k; p++) arr[l + p] = temp[p];
    }
    void mergeSort(vector<int>& arr, int l, int r) {
        if (l >= r) return;
        int mid = l + (r - l) / 2;
        mergeSort(arr, l, mid);
        mergeSort(arr, mid + 1, r);
        merge(arr, l, mid, r);
    }
};`}},{category:"Optimal",algorithm:"Iterative Bottom-Up Merge Sort",description:"Sort the array using iterative merge passes starting from size 1 and doubling each time until the whole array is merged.",steps:["Initialize subarray size = 1.","Loop while size < n: for each pair of subarrays of the current size, merge them.","Calculate left, mid, right indices for merging.","Merge each pair using a temporary array.","After each pass, double the subarray size."],time_complexity:"O(n log n)",space_complexity:"O(n)",code:{java:`class Solution {
    void merge(int arr[], int l, int mid, int r) {
        int[] temp = new int[r - l + 1];
        int i = l, j = mid + 1, k = 0;
        while (i <= mid && j <= r) {
            if (arr[i] <= arr[j]) temp[k++] = arr[i++];
            else temp[k++] = arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= r) temp[k++] = arr[j++];
        for (int p = 0; p < k; p++) arr[l + p] = temp[p];
    }
    void mergeSort(int arr[], int l, int r) {
        int n = arr.length;
        for (int size = 1; size < n; size *= 2) {
            for (int left = 0; left < n; left += 2 * size) {
                int mid = Math.min(left + size - 1, n - 1);
                int right = Math.min(left + 2 * size - 1, n - 1);
                merge(arr, left, mid, right);
            }
        }
    }
}`,cpp:`class Solution {
public:
    void merge(vector<int>& arr, int l, int mid, int r) {
        vector<int> temp(r - l + 1);
        int i = l, j = mid + 1, k = 0;
        while (i <= mid && j <= r) {
            if (arr[i] <= arr[j]) temp[k++] = arr[i++];
            else temp[k++] = arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= r) temp[k++] = arr[j++];
        for (int p = 0; p < k; p++) arr[l + p] = temp[p];
    }
    void mergeSort(vector<int>& arr, int l, int r) {
        int n = arr.size();
        for (int size = 1; size < n; size *= 2) {
            for (int left = 0; left < n; left += 2 * size) {
                int mid = min(left + size - 1, n - 1);
                int right = min(left + 2 * size - 1, n - 1);
                merge(arr, left, mid, right);
            }
        }
    }
};`}}],n=[{input:[38,27,43,3,9,82,10],output:[3,9,10,27,38,43,82],explanation:"Split and recursively sort [38,27,43,3] → [3,27,38,43], [9,82,10] → [9,10,82]; merge to get final result."},{input:[5,1,4,2,8],output:[1,2,4,5,8],explanation:"Iteratively merge size=1 → [1,5], [2,4], [8]; size=2 → [1,2,4,5], then [1,2,4,5,8]."}],a={"1 <= n <= 100000":!0,"1 <= arr[i] <= 1000000000":!0},o=[{input:[],output:[],reason:"Empty array is already sorted."},{input:[1],output:[1],reason:"Single element array is already sorted."},{input:[2,1],output:[1,2],reason:"Minimal unsorted case."}],s=[{id:"tc1",input:[3,1,2],expected_output:[1,2,3]},{id:"tc2",input:[10,9,8,7],expected_output:[7,8,9,10]}],l={divide_conquer:"Merge Sort repeatedly divides the array into halves and merges sorted parts.",stable_sort:"Merge Sort is a stable sorting algorithm—equal elements retain original order.",non_in_place:"Recursive merge sort uses extra space; iterative may optimize but also uses temp arrays."},m=["Think recursively: divide into halves, sort, then merge.","For iterative, simulate levels of recursion with loop and subarray size doubling.","Use a helper `merge()` function to simplify logic."],p=["Can you do in-place merge without extra space?","How does Merge Sort perform on linked lists vs arrays?","Can you optimize Merge Sort for small subarrays using Insertion Sort?"],d=["Sorting","Divide and Conquer","Merge Sort","Recursion","Iteration"],u={title:e,description:r,metadata:t,approaches:i,examples:n,constraints:a,edge_cases:o,test_cases:s,notes:l,hints:m,follow_up:p,tags:d};export{i as approaches,a as constraints,u as default,r as description,o as edge_cases,n as examples,p as follow_up,m as hints,t as metadata,l as notes,d as tags,s as test_cases,e as title};
