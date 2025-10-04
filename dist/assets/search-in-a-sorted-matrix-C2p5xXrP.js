const t="Search in a Sorted Matrix",e="Determine whether a given target value exists in a 2D matrix where each row is sorted and each first element of the row is greater than the last element of the previous row. The entire matrix behaves like a flattened sorted array.",i={difficulty:"Medium",tags:["Binary Search","Matrix","2D Array","Flattened Array"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},r=[{category:"Brute Force",algorithm:"Linear Search",description:"Traverse every element in the matrix row by row to find the target value.",steps:["Iterate through each row of the matrix.","For each row, iterate through each element.","If an element equals the target, return true.","If the loop completes without finding the target, return false."],time_complexity:"O(m × n)",space_complexity:"O(1)",code:{java:`class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;
        int m = matrix.length;
        int n = matrix[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == target) return true;
            }
        }
        return false;
    }
}`,cpp:`class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        int m = matrix.size(), n = matrix[0].size();
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (matrix[i][j] == target) return true;
            }
        }
        return false;
    }
};`}},{category:"Optimal",algorithm:"Binary Search on Flattened Matrix",description:"Use binary search treating the 2D matrix as a flattened sorted array.",steps:["Initialize left = 0 and right = m × n - 1.","While left <= right:","Compute mid = left + (right - left) / 2.","Convert mid to 2D indices using: row = mid / n, col = mid % n.","Compare matrix[row][col] with target.","If equal, return true. If less, search in the right half. If greater, search in the left half.","Return false if not found."],time_complexity:"O(log(m × n))",space_complexity:"O(1)",code:{java:`class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;
        int m = matrix.length, n = matrix[0].length;
        int left = 0, right = m * n - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int midValue = matrix[mid / n][mid % n];
            if (midValue == target) return true;
            else if (midValue < target) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
}`,cpp:`class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        int m = matrix.size(), n = matrix[0].size();
        int left = 0, right = m * n - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int midValue = matrix[mid / n][mid % n];
            if (midValue == target) return true;
            else if (midValue < target) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
};`}}],a=[{input:{grid:[[2,4,6,8],[10,12,14,16],[18,20,22,24]],value:12},output:!0,explanation:"12 exists in the second row of the matrix."},{input:{grid:[[5,10,15],[25,30,35],[45,50,55]],value:40},output:!1,explanation:"40 is not present in any row of the matrix."}],n={"1 <= m, n <= 1000":!0,"grid[i][j] is sorted and follows properties mentioned":!0,"target is an integer":!0},o=[{input:{grid:[[1]],value:1},output:!0,reason:"Matrix has one element which is the target."},{input:{grid:[[1]],value:2},output:!1,reason:"Matrix has one element which is not the target."}],l=[{id:"tc1",input:{grid:[[1,3,5],[7,9,11]],value:5},expected_output:!0},{id:"tc2",input:{grid:[[1,3,5],[7,9,11]],value:12},expected_output:!1}],s={flattening_matrix:"You can map any index `i` of a 1D array to matrix[i / n][i % n].",matrix_property:"Matrix is strictly increasing from top-left to bottom-right as a whole."},m=["Try treating the matrix as a flat array of size m × n.","Use binary search logic directly on flattened index space.","Mid index can be transformed into matrix coordinates."],h=["What if the matrix allows duplicate values?","What if the matrix is not strictly increasing row to row?","Can you modify the binary search logic for row-wise only sorted matrices?"],u=["Binary Search","Matrix","2D Array","Divide and Conquer"],c={title:t,description:e,metadata:i,approaches:r,examples:a,constraints:n,edge_cases:o,test_cases:l,notes:s,hints:m,follow_up:h,tags:u};export{r as approaches,n as constraints,c as default,e as description,o as edge_cases,a as examples,h as follow_up,m as hints,i as metadata,s as notes,u as tags,l as test_cases,t as title};
