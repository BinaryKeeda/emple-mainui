const n="Substring Search (strStr)",t="Find the starting index of the first occurrence of a pattern (needle) in a given text (haystack). Return -1 if the pattern is not found.",e={difficulty:"Medium",tags:["String","Pattern Matching","KMP Algorithm","Brute Force"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Naive String Matching",description:"Try every possible starting point in the text and compare each character of the substring to the pattern.",steps:["Loop from i = 0 to i <= text.length - pattern.length","For each i, compare text[i + j] with pattern[j] for all j from 0 to pattern.length - 1","If all characters match, return the current index i","If no match is found throughout the loop, return -1"],time_complexity:"O(n * m)",space_complexity:"O(1)",code:{java:`class Solution {
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
};`}},{category:"Optimal",algorithm:"Knuth-Morris-Pratt (KMP)",description:"Use LPS (Longest Prefix Suffix) array to avoid rechecking characters during mismatches, achieving linear time complexity.",steps:["Build LPS array for the pattern (needle)","Initialize two pointers i (text) and j (pattern)","While i < text.length:","If characters match, increment both i and j","If j == pattern.length, return i - j","If characters mismatch and j != 0, update j to lps[j - 1]","Else, increment i","If pattern not found, return -1"],time_complexity:"O(n + m)",space_complexity:"O(m)",code:{java:`class Solution {
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
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) len = lps[len - 1];
                else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }
}`,cpp:`class Solution {
public:
    int strStr(string haystack, string needle) {
        int m = haystack.size(), n = needle.size();
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
};`}}],r=[{input:["findthefind","find"],output:0,explanation:"Pattern 'find' appears at index 0 and again at index 7. First match is at index 0."},{input:["programming","gram"],output:3,explanation:"Pattern 'gram' begins at index 3."},{input:["abcdefgh","xyz"],output:-1,explanation:"Pattern 'xyz' is not found in the text."},{input:["mississippi","issip"],output:4,explanation:"Pattern 'issip' starts at index 4."}],a={"1 <= text.length <= 10^5":!0,"1 <= pattern.length <= 10^4":!0},s=[{input:["",""],output:0,reason:"Empty pattern always matches at position 0."},{input:["abc",""],output:0,reason:"Empty pattern matches at the start of any string."},{input:["","abc"],output:-1,reason:"Pattern cannot be found in an empty text."}],o=[{id:"tc1",input:["ababcabcabababd","ababd"],expected_output:10},{id:"tc2",input:["hello","ll"],expected_output:2}],c={lps_meaning:"LPS (Longest Prefix which is also Suffix) helps avoid redundant comparisons in KMP.",brute_force_limit:"Brute-force is simple but inefficient for large texts and patterns."},l=["Try using two pointers to check each possible substring.","To optimize, can you avoid rechecking characters using some preprocessing?","Look into the KMP algorithm and its LPS array technique."],p=["What if we need to find all occurrences of the pattern, not just the first?","Can you modify KMP to count the total number of occurrences?","What changes if characters are inserted into or deleted from the text dynamically?"],u=["String","Brute Force","KMP","Pattern Matching","Substring Search"],h={title:n,description:t,metadata:e,approaches:i,examples:r,constraints:a,edge_cases:s,test_cases:o,notes:c,hints:l,follow_up:p,tags:u};export{i as approaches,a as constraints,h as default,t as description,s as edge_cases,r as examples,p as follow_up,l as hints,e as metadata,c as notes,u as tags,o as test_cases,n as title};
