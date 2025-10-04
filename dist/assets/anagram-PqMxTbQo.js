const t="Anagram Check",e="Given two strings str1 and str2, determine if they are anagrams of each other. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",n={difficulty:"Easy",tags:["String","Hashing","Sorting","Frequency Count"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},r=[{category:"Brute Force",algorithm:"Sort and Compare",description:"Sort both strings and compare character by character.",steps:["Check if the lengths of the strings are different; if yes, return false.","Convert both strings to character arrays.","Sort both character arrays in ascending order.","Compare the sorted arrays. If identical, return true; else, false."],time_complexity:"O(n log n)",space_complexity:"O(n)",code:{java:`import java.util.Arrays;
class Solution {
  public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    char[] sChars = s.toCharArray();
    char[] tChars = t.toCharArray();
    Arrays.sort(sChars);
    Arrays.sort(tChars);
    return Arrays.equals(sChars, tChars);
  }
}`,cpp:`#include <algorithm>
#include <string>
class Solution {
public:
  bool isAnagram(std::string s, std::string t) {
    if (s.length() != t.length()) return false;
    std::sort(s.begin(), s.end());
    std::sort(t.begin(), t.end());
    return s == t;
  }
}`}},{category:"Optimal",algorithm:"Frequency Count using Fixed Array",description:"Use a fixed-size array (26 for lowercase letters) to count frequencies.",steps:["Check if the lengths of the strings are different; if yes, return false.","Initialize an array of size 26 to store frequency counts.","Iterate over both strings simultaneously.","Increment the count for characters in the first string and decrement for the second.","After iteration, if all counts are zero, return true; else false."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
  public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] freq = new int[26];
    for (int i = 0; i < s.length(); i++) {
      freq[s.charAt(i) - 'a']++;
      freq[t.charAt(i) - 'a']--;
    }
    for (int count : freq) {
      if (count != 0) return false;
    }
    return true;
  }
}`,cpp:`#include <vector>
#include <string>
class Solution {
public:
  bool isAnagram(std::string s, std::string t) {
    if (s.length() != t.length()) return false;
    std::vector<int> freq(26, 0);
    for (int i = 0; i < s.length(); i++) {
      freq[s[i] - 'a']++;
      freq[t[i] - 'a']--;
    }
    for (int count : freq) {
      if (count != 0) return false;
    }
    return true;
  }
}`}}],a=[{input:["listen","silent"],output:!0,explanation:"Both contain the same letters (e, i, l, n, s, t)."},{input:["hello","world"],output:!1,explanation:"They contain different letters."}],s={"1 <= str1.length, str2.length <= 10^5":!0,"str1 and str2 contain only lowercase English letters":!0},i=[{input:["",""],output:!0,reason:"Empty strings are trivially anagrams."},{input:["a","ab"],output:!1,reason:"Different lengths cannot be anagrams."},{input:["rat","car"],output:!1,reason:"Characters do not match after sorting or counting."}],o=[{id:"tc1",input:["anagram","nagaram"],expected_output:!0},{id:"tc2",input:["binary","brainy"],expected_output:!0},{id:"tc3",input:["debitcard","badcredit"],expected_output:!0}],c={unicode_support:"For full Unicode support, consider using HashMap<Character, Integer> instead of fixed-size arrays.",case_sensitivity:"The given solution assumes all characters are lowercase. For case-insensitive checks, normalize both strings."},l=["What happens if you sort both strings?","Can you use a frequency array to track letter counts?","Check the string lengths before proceeding with logic."],u=["How would you handle case sensitivity?","What if the strings contain Unicode characters?","Can you do it in a streaming fashion without storing the full string?"],h=["String","Sorting","Hash Map","Frequency Array"],g={title:t,description:e,metadata:n,approaches:r,examples:a,constraints:s,edge_cases:i,test_cases:o,notes:c,hints:l,follow_up:u,tags:h};export{r as approaches,s as constraints,g as default,e as description,i as edge_cases,a as examples,u as follow_up,l as hints,n as metadata,c as notes,h as tags,o as test_cases,t as title};
