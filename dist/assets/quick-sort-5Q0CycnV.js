const t="Quick Sort",i="Sort an array using the Quick Sort algorithm based on the Divide and Conquer approach with the last element as pivot.",n={difficulty:"Medium",tags:["Sorting","Divide and Conquer","Recursion","Quick Sort"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},r=[{category:"Brute Force",algorithm:"Naive Partition with Temporary Arrays",description:"Uses temporary left and right arrays to partition the input around the pivot, then recursively sorts both parts.",steps:["Choose the last element as the pivot.","Traverse the subarray and push elements <= pivot into left[], others into right[].","Concatenate left[], pivot, and right[] to form a new partitioned array.","Recursively apply quickSort to the left and right subarrays.","Copy the result back to the original array."],time_complexity:"O(n log n) average, O(n^2) worst case",space_complexity:"O(n)",code:{java:`import java.util.ArrayList;

class Solution {
    static class PartitionResult {
        ArrayList<Integer> array;
        int pivotIndex;

        PartitionResult(ArrayList<Integer> array, int pivotIndex) {
            this.array = array;
            this.pivotIndex = pivotIndex;
        }
    }

    static PartitionResult partition(int arr[], int low, int high) {
        ArrayList<Integer> left = new ArrayList<>();
        ArrayList<Integer> right = new ArrayList<>();
        int pivot = arr[high];

        for (int i = low; i < high; i++) {
            if (arr[i] <= pivot) left.add(arr[i]);
            else right.add(arr[i]);
        }

        left.add(pivot);
        ArrayList<Integer> partitioned = new ArrayList<>(left);
        partitioned.addAll(right);

        int pivotIndex = low + left.size() - 1;
        return new PartitionResult(partitioned, pivotIndex);
    }

    static void quickSort(int arr[], int low, int high) {
        if (low >= high) return;

        PartitionResult result = partition(arr, low, high);
        ArrayList<Integer> partitioned = result.array;
        int pivotIndex = result.pivotIndex;

        for (int i = low; i <= high; i++) {
            arr[i] = partitioned.get(i - low);
        }

        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}`,cpp:`#include <vector>
using namespace std;

class Solution {
public:
    vector<int> partition(vector<int>& arr, int low, int high, int& pivotIndex) {
        vector<int> left, right;
        int pivot = arr[high];
        for (int i = low; i < high; i++) {
            if (arr[i] <= pivot) left.push_back(arr[i]);
            else right.push_back(arr[i]);
        }
        left.push_back(pivot);
        vector<int> partitioned = left;
        partitioned.insert(partitioned.end(), right.begin(), right.end());
        pivotIndex = low + left.size() - 1;
        return partitioned;
    }

    void quickSort(vector<int>& arr, int low, int high) {
        if (low >= high) return;
        int pivotIndex;
        vector<int> partitioned = partition(arr, low, high, pivotIndex);
        for (int i = low; i <= high; i++) arr[i] = partitioned[i - low];
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
};`}},{category:"Optimal",algorithm:"Lomuto Partition (In-Place)",description:"Performs in-place partitioning by moving all elements <= pivot to the left of a boundary index.",steps:["Choose the last element as the pivot.","Initialize a boundary pointer i = low - 1.","Iterate through the array from low to high - 1:","If arr[j] <= pivot, increment i and swap arr[i] and arr[j].","After loop, place pivot in its correct position by swapping arr[i+1] and arr[high].","Return pivot index (i + 1).","Recursively apply quickSort to the left and right subarrays."],time_complexity:"O(n log n) average, O(n^2) worst case",space_complexity:"O(log n)",code:{java:`class Solution {
    static int partition(int arr[], int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    static void quickSort(int arr[], int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }
}`,cpp:`#include <vector>
using namespace std;

class Solution {
public:
    int partition(vector<int>& arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr[i], arr[j]);
            }
        }
        swap(arr[i + 1], arr[high]);
        return i + 1;
    }

    void quickSort(vector<int>& arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }
};`}}],e=[{input:[8,5,2,9,1],output:[1,2,5,8,9],explanation:"Array is partitioned and recursively sorted using the pivot."},{input:[10,3,7,4,12,5],output:[3,4,5,7,10,12],explanation:"Recursive calls partition and sort left and right of each pivot."}],a={"1 <= n <= 10^5":!0,"-10^9 <= arr[i] <= 10^9":!0},o=[{input:[],output:[],reason:"Empty array returns empty."},{input:[1],output:[1],reason:"Single element array is already sorted."},{input:[5,5,5,5],output:[5,5,5,5],reason:"All elements equal."}],s=[{id:"tc1",input:[4,1,3,9,7],expected_output:[1,3,4,7,9]},{id:"tc2",input:[20,10,30,50,40],expected_output:[10,20,30,40,50]}],p={worst_case_behavior:"Occurs when pivot is the smallest/largest and recursion is unbalanced.",inplace_advantage:"Optimal approach reduces space complexity due to in-place swaps."},l=["Use the last element as pivot for both approaches.","Try visualizing how partition works step-by-step.","Use recursion wisely to handle base cases and termination."],h=["How would you modify this to handle duplicate pivot values efficiently?","Can you implement Quick Sort iteratively using a stack?","What if the array contains objects or strings?"],c=["Sorting","Divide and Conquer","In-Place Algorithm","Recursion","DSA Sheet"],u={title:t,description:i,metadata:n,approaches:r,examples:e,constraints:a,edge_cases:o,test_cases:s,notes:p,hints:l,follow_up:h,tags:c};export{r as approaches,a as constraints,u as default,i as description,o as edge_cases,e as examples,h as follow_up,l as hints,n as metadata,p as notes,c as tags,s as test_cases,t as title};
