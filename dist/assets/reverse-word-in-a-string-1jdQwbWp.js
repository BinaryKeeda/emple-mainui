const e="Reverse Words in a String",r="Given a string, reverse the order of the words. A word is a group of non-space characters. The final string should have exactly one space between words, and no leading or trailing spaces.",n={difficulty:"Easy",tags:["String","Two Pointers","In-Place","Text Processing"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},t=[{category:"Brute Force",algorithm:"Split + Reverse + Join",description:"Use extra space to split the string by one or more spaces, reverse the list, and join with a single space.",steps:["Trim leading and trailing spaces using `trim()`.","Split the string using regex `\\s+` to handle multiple spaces.","Reverse the array of words.","Join the words with a single space."],time_complexity:"O(n)",space_complexity:"O(n)",code:{java:`import java.util.*;

class Solution {
    public String reverseWords(String s) {
        String[] words = s.trim().split("\\\\s+");
        Collections.reverse(Arrays.asList(words));
        return String.join(" ", words);
    }
}`,cpp:`#include <vector>
#include <sstream>
#include <algorithm>

class Solution {
public:
    string reverseWords(string s) {
        size_t start = s.find_first_not_of(" ");
        size_t end = s.find_last_not_of(" ");
        if (start == string::npos) return "";
        string trimmed = s.substr(start, end - start + 1);

        vector<string> words;
        istringstream iss(trimmed);
        string word;
        while (iss >> word) {
            words.push_back(word);
        }

        reverse(words.begin(), words.end());
        ostringstream oss;
        for (size_t i = 0; i < words.size(); ++i) {
            if (i != 0) oss << " ";
            oss << words[i];
        }
        return oss.str();
    }
}`}},{category:"Optimal",algorithm:"In-Place Reversal",description:"Trim, normalize spaces, reverse the entire string, then reverse each word individually.",steps:["Trim and normalize the spaces: remove leading, trailing, and reduce multiple spaces to one.","Convert the cleaned string to a character array.","Reverse the entire character array.","Iterate through the array and reverse each word individually."],time_complexity:"O(n)",space_complexity:"O(1) for C++, O(n) for Java",code:{java:`class Solution {
    public String reverseWords(String s) {
        String trimmed = s.trim().replaceAll("\\\\s+", " ");
        char[] chars = trimmed.toCharArray();
        reverse(chars, 0, chars.length - 1);

        int start = 0;
        for (int end = 0; end <= chars.length; end++) {
            if (end == chars.length || chars[end] == ' ') {
                reverse(chars, start, end - 1);
                start = end + 1;
            }
        }

        return new String(chars);
    }

    private void reverse(char[] arr, int left, int right) {
        while (left < right) {
            char temp = arr[left];
            arr[left++] = arr[right];
            arr[right--] = temp;
        }
    }
}`,cpp:`class Solution {
public:
    string reverseWords(string s) {
        reverse(s.begin(), s.end());

        int i = 0, j = 0, n = s.size();
        while (i < n) {
            while (i < n && s[i] == ' ') i++;
            if (i == n) break;

            int wordStart = j;
            while (i < n && s[i] != ' ') s[j++] = s[i++];
            reverse(s.begin() + wordStart, s.begin() + j);
            if (i < n) s[j++] = ' ';
        }

        if (j > 0 && s[j-1] == ' ') j--;
        s.resize(j);
        return s;
    }
}`}}],s=[{input:'"  life is beautiful  "',output:'"beautiful is life"',explanation:"Extra spaces are trimmed and words are reversed."},{input:'"   coding   "',output:'"coding"',explanation:"Single word with leading/trailing spaces."}],i={"1 <= s.length <= 100000":!0},a=[{input:'"   "',output:'""',reason:"Only spaces should return an empty string."},{input:'"word"',output:'"word"',reason:"Single word without spaces stays the same."},{input:'"a   b   c"',output:'"c b a"',reason:"Multiple spaces are reduced to one."}],o=[{id:"tc1",input:'"the sky is blue"',expected_output:'"blue is sky the"'},{id:"tc2",input:'"  hello world  "',expected_output:'"world hello"'}],d={regex_note:"The regex `\\s+` is used to split the input string by one or more spaces.",in_place_advantage:"In-place reversal is more efficient in terms of memory when allowed (C++)."},l=["Can you split words without using extra space?","What happens if you reverse the entire string first?","Think about how to reverse individual words after the whole string is reversed."],c=["Can you implement the optimal approach using only O(1) extra space?","How would you do this if the string was streamed word-by-word?","Can you modify this to reverse characters of each word instead of word order?"],p=["String","Text Processing","Two Pointers","Optimization"],h={title:e,description:r,metadata:n,approaches:t,examples:s,constraints:i,edge_cases:a,test_cases:o,notes:d,hints:l,follow_up:c,tags:p};export{t as approaches,i as constraints,h as default,r as description,a as edge_cases,s as examples,c as follow_up,l as hints,n as metadata,d as notes,p as tags,o as test_cases,e as title};
