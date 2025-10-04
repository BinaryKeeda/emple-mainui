const t="Kth Smallest Element in a Sorted Matrix",n="Given an n x n matrix where each row and each column are sorted in ascending order, return the kth smallest element in the matrix.",e={difficulty:"Medium",tags:["Matrix","Heap","Binary Search","Sorting"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Flatten and Sort",description:"Convert the matrix into a 1D array, sort it, and return the k-th element.",steps:["Initialize an empty list to hold all elements.","Iterate through each row and append all elements to the list.","Sort the flattened list.","Return the element at index k-1 (0-based indexing)."],time_complexity:"O(n^2 log n)",space_complexity:"O(n^2)",code:{java:`import java.util.ArrayList;
import java.util.Collections;
class Solution {
    public int kthSmallest(int[][] matrix, int k) {
        ArrayList<Integer> flattened = new ArrayList<>();
        for (int[] row : matrix) {
            for (int num : row) {
                flattened.add(num);
            }
        }
        Collections.sort(flattened);
        return flattened.get(k - 1);
    }
}`,cpp:`#include <vector>
#include <algorithm>
class Solution {
public:
    int kthSmallest(std::vector<std::vector<int>>& matrix, int k) {
        std::vector<int> flattened;
        for (const auto& row : matrix) {
            flattened.insert(flattened.end(), row.begin(), row.end());
        }
        std::sort(flattened.begin(), flattened.end());
        return flattened[k - 1];
    }
}`}},{category:"Optimal",algorithm:"Binary Search on Matrix",description:"Use binary search on the value range instead of indices. Count elements less than or equal to mid value to narrow down the k-th smallest.",steps:["Set low = matrix[0][0], high = matrix[n-1][n-1].","While low < high:","   - mid = (low + high) / 2","   - Count how many elements are ≤ mid by checking each row from right to left.","   - If count < k, move search to right half (low = mid + 1).","   - Else, move search to left half (high = mid).","When loop ends, low holds the kth smallest element."],time_complexity:"O(n log(max - min))",space_complexity:"O(1)",code:{java:`class Solution {
    public int kthSmallest(int[][] matrix, int k) {
        int n = matrix.length;
        int low = matrix[0][0];
        int high = matrix[n - 1][n - 1];

        while (low < high) {
            int mid = low + (high - low) / 2;
            int count = 0;
            int j = n - 1;

            for (int i = 0; i < n; i++) {
                while (j >= 0 && matrix[i][j] > mid) j--;
                count += (j + 1);
            }

            if (count < k) low = mid + 1;
            else high = mid;
        }
        return low;
    }
}`,cpp:`#include <vector>
#include <algorithm>
class Solution {
public:
    int kthSmallest(std::vector<std::vector<int>>& matrix, int k) {
        int n = matrix.size();
        int low = matrix[0][0];
        int high = matrix[n - 1][n - 1];

        while (low < high) {
            int mid = low + (high - low) / 2;
            int count = 0;
            int j = n - 1;

            for (int i = 0; i < n; i++) {
                while (j >= 0 && matrix[i][j] > mid) j--;
                count += (j + 1);
            }

            if (count < k) low = mid + 1;
            else high = mid;
        }
        return low;
    }
}`}}],a=[{input:{matrix:[[1,5,9],[10,11,13],[12,13,15]],k:8},output:13,explanation:"Sorted elements: [1, 5, 9, 10, 11, 12, 13, 13, 15], 8th smallest = 13"},{input:{matrix:[[-5]],k:1},output:-5,explanation:"Only one element, hence the 1st smallest is -5"}],o={"1 <= n <= 300":!0,"matrix[i][j]":"Sorted row-wise and column-wise","1 <= k <= n*n":!0},r=[{input:{matrix:[[1,2],[1,3]],k:2},output:1,reason:"1 is repeated, and it's the second smallest too"},{input:{matrix:[[1]],k:1},output:1,reason:"Single-element matrix"}],l=[{id:"tc1",input:{matrix:[[1,5],[10,15]],k:3},expected_output:10},{id:"tc2",input:{matrix:[[1,2],[3,4]],k:4},expected_output:4}],s={binary_search_tip:"You don’t binary search the index, you binary search the value range.",matrix_property:"Each row and each column is sorted, which allows for binary search based counting."},h=["Think about the sorted nature of the matrix.","Can you avoid using extra space by not flattening the matrix?","Try binary searching on the value range instead of elements directly."],c=["What if the matrix is not sorted column-wise?","Can you modify the algorithm for unsorted matrices using heaps?","What if k is very close to 1 or to n^2? Can the algorithm be optimized for such cases?"],m=["Matrix","Heap","Sorting","Binary Search","Value-Based Search"],d={title:t,description:n,metadata:e,approaches:i,examples:a,constraints:o,edge_cases:r,test_cases:l,notes:s,hints:h,follow_up:c,tags:m};export{i as approaches,o as constraints,d as default,n as description,r as edge_cases,a as examples,c as follow_up,h as hints,e as metadata,s as notes,m as tags,l as test_cases,t as title};
