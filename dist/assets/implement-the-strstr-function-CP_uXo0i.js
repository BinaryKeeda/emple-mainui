const n="Implement strstr Function",e="Find the starting index of the first occurrence of a substring (needle) in a given main string (haystack). Return -1 if not found.",t={difficulty:"Medium",tags:["String","Pattern Matching","KMP Algorithm","Brute Force"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Naive String Matching",description:"Check every possible starting position in the main string and compare the substring character-by-character.",steps:["Return 0 if the pattern is empty (trivial match).","Return -1 if pattern length is greater than text length.","Iterate over haystack from 0 to m - n, where m and n are lengths of haystack and needle respectively.","For each position i, compare characters of needle with haystack starting at i.","If all characters match, return the index i.","If no match is found after the loop, return -1."],time_complexity:"O(m * n)",space_complexity:"O(1)",code:{java:`class Solution {
    public int strStr(String haystack, String needle) {
        int m = haystack.length();
        int n = needle.length();
        if (n == 0) return 0;
        if (m < n) return -1;
        for (int i = 0; i <= m - n; i++) {
            int j;
            for (j = 0; j < n; j++) {
                if (haystack.charAt(i + j) != needle.charAt(j)) break;
            }
            if (j == n) return i;
        }
        return -1;
    }
}`,cpp:`class Solution {
public:
    int strStr(string haystack, string needle) {
        int m = haystack.size();
        int n = needle.size();
        if (n == 0) return 0;
        if (m < n) return -1;
        for (int i = 0; i <= m - n; i++) {
            int j;
            for (j = 0; j < n; j++) {
                if (haystack[i + j] != needle[j]) break;
            }
            if (j == n) return i;
        }
        return -1;
    }
};`}},{category:"Optimal",algorithm:"Knuth-Morris-Pratt (KMP) Algorithm",description:"Use LPS (Longest Prefix Suffix) array to efficiently search for pattern in text by avoiding redundant comparisons.",steps:["Return 0 if the pattern is empty.","Return -1 if pattern length is greater than text length.","Preprocess the pattern to create the LPS array.","Initialize two pointers i (haystack) and j (needle).","If characters match, increment both i and j.","If j reaches end of needle, match is found at i - j.","If mismatch and j > 0, update j = lps[j - 1]; else increment i.","If no match found, return -1."],time_complexity:"O(m + n)",space_complexity:"O(n)",code:{java:`class Solution {
    public int strStr(String haystack, String needle) {
        int m = haystack.length();
        int n = needle.length();
        if (n == 0) return 0;
        if (m < n) return -1;
        int[] lps = computeLPS(needle);
        int i = 0, j = 0;
        while (i < m) {
            if (haystack.charAt(i) == needle.charAt(j)) {
                i++; j++;
                if (j == n) return i - j;
            } else {
                if (j != 0) j = lps[j - 1];
                else i++;
            }
        }
        return -1;
    }
    private int[] computeLPS(String needle) {
        int n = needle.length();
        int[] lps = new int[n];
        int len = 0, i = 1;
        while (i < n) {
            if (needle.charAt(i) == needle.charAt(len)) {
                lps[i++] = ++len;
            } else {
                if (len != 0) len = lps[len - 1];
                else lps[i++] = 0;
            }
        }
        return lps;
    }
}`,cpp:`class Solution {
public:
    int strStr(string haystack, string needle) {
        int m = haystack.size();
        int n = needle.size();
        if (n == 0) return 0;
        if (m < n) return -1;
        vector<int> lps = computeLPS(needle);
        int i = 0, j = 0;
        while (i < m) {
            if (haystack[i] == needle[j]) {
                i++; j++;
                if (j == n) return i - j;
            } else {
                if (j != 0) j = lps[j - 1];
                else i++;
            }
        }
        return -1;
    }
private:
    vector<int> computeLPS(string needle) {
        int n = needle.size();
        vector<int> lps(n, 0);
        int len = 0, i = 1;
        while (i < n) {
            if (needle[i] == needle[len]) {
                lps[i++] = ++len;
            } else {
                if (len != 0) len = lps[len - 1];
                else lps[i++] = 0;
            }
        }
        return lps;
    }
};`}}],r=[{input:["findthefind","find"],output:0,explanation:"The substring 'find' first appears at index 0."},{input:["programming","gram"],output:3,explanation:"The substring 'gram' starts at index 3 in 'programming'."}],a={"1 <= text.length <= 10^4":!0,"0 <= pattern.length <= 10^4":!0},s=[{input:["abc",""],output:0,reason:"Empty pattern is found at the start."},{input:["abc","abcd"],output:-1,reason:"Pattern is longer than text."},{input:["aaaaab","aab"],output:3,reason:"Match found after repeated characters and mismatch."}],o=[{id:"tc1",input:["hello","ll"],expected_output:2},{id:"tc2",input:["mississippi","issip"],expected_output:4},{id:"tc3",input:["aaaaa","bba"],expected_output:-1}],c={lps_array:"LPS array stores for each prefix of the pattern the length of the longest proper prefix which is also a suffix.",kmp_efficiency:"KMP ensures no character in text is scanned more than once, improving efficiency over brute-force."},l=["Try all starting positions in haystack for a brute force approach.","To improve, skip unnecessary checks using pattern information.","Think about how prefix and suffix patterns help avoid re-checking characters."],p=["Can you implement a strstr-like function using regular expressions?","What if you had to find all occurrences, not just the first?","How would you adapt this for large-scale string processing (e.g., in bioinformatics)?"],h=["String","Pattern Matching","Brute Force","KMP","LPS Array"],u={title:n,description:e,metadata:t,approaches:i,examples:r,constraints:a,edge_cases:s,test_cases:o,notes:c,hints:l,follow_up:p,tags:h};export{i as approaches,a as constraints,u as default,e as description,s as edge_cases,r as examples,p as follow_up,l as hints,t as metadata,c as notes,h as tags,o as test_cases,n as title};
