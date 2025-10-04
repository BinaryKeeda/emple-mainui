const e="Remove Duplicate Letters",t="Given a string str, remove duplicate letters so that each letter appears exactly once. Among all possible results, return the one that comes first in alphabetical order. str consists of lowercase letters only.",n={difficulty:"Medium",tags:["Greedy","Stack","String","Backtracking","Lexicographical Order"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},r=[{category:"Brute Force",algorithm:"Permutation Generation + Filtering",description:"Generate all permutations of unique characters and filter valid ones that maintain the character order in the original string. Return the lexicographically smallest valid permutation.",steps:["Extract all unique characters from the string.","Generate all possible permutations of these characters.","Filter permutations that preserve character order from the original string.","Sort the valid permutations lexicographically.","Return the first one as the result."],time_complexity:"O(n!)",space_complexity:"O(n!)",code:{java:`import java.util.*;
class Solution {
    public String removeDuplicateLetters(String s) {
        Set<Character> unique = new HashSet<>();
        for (char c : s.toCharArray()) unique.add(c);
        List<String> permutations = new ArrayList<>();
        generatePermutations("", new ArrayList<>(unique), permutations);
        List<String> valid = new ArrayList<>();
        for (String perm : permutations) {
            if (isValid(perm, s)) valid.add(perm);
        }
        Collections.sort(valid);
        return valid.isEmpty() ? "" : valid.get(0);
    }
    private void generatePermutations(String current, List<Character> chars, List<String> result) {
        if (chars.isEmpty()) {
            result.add(current);
            return;
        }
        for (int i = 0; i < chars.size(); i++) {
            char c = chars.get(i);
            List<Character> remaining = new ArrayList<>(chars);
            remaining.remove(i);
            generatePermutations(current + c, remaining, result);
        }
    }
    private boolean isValid(String perm, String s) {
        int index = 0;
        for (char c : perm.toCharArray()) {
            index = s.indexOf(c, index);
            if (index == -1) return false;
            index++;
        }
        return true;
    }
}`,cpp:`#include <vector>
#include <string>
#include <unordered_set>
#include <algorithm>
using namespace std;
class Solution {
public:
    string removeDuplicateLetters(string s) {
        unordered_set<char> unique(s.begin(), s.end());
        vector<char> chars(unique.begin(), unique.end());
        sort(chars.begin(), chars.end());
        vector<string> permutations;
        generatePermutations("", chars, permutations);
        vector<string> valid;
        for (const string& perm : permutations) {
            if (isValid(perm, s)) valid.push_back(perm);
        }
        sort(valid.begin(), valid.end());
        return valid.empty() ? "" : valid[0];
    }
private:
    void generatePermutations(string current, vector<char> chars, vector<string>& result) {
        if (chars.empty()) {
            result.push_back(current);
            return;
        }
        for (size_t i = 0; i < chars.size(); i++) {
            char c = chars[i];
            vector<char> remaining = chars;
            remaining.erase(remaining.begin() + i);
            generatePermutations(current + c, remaining, result);
        }
    }
    bool isValid(const string& perm, const string& s) {
        size_t index = 0;
        for (char c : perm) {
            index = s.find(c, index);
            if (index == string::npos) return false;
            index++;
        }
        return true;
    }
};`}},{category:"Optimal (Stack + Greedy)",algorithm:"Greedy with Stack and Frequency Counting",description:"Use a stack to build the result string while ensuring lexicographical order and avoiding duplicates. Track frequency and use a visited set to ensure uniqueness.",steps:["Count frequencies of each character in the string.","Initialize an empty stack and a visited set.","For each character in the string:"," - Decrease its count."," - Skip it if already in the stack."," - While it is smaller than the top of the stack and the top character appears later, pop the top character."," - Push the current character to the stack and mark it as visited.","Build and return the result string from the stack."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`import java.util.*;
class Solution {
    public String removeDuplicateLetters(String s) {
        int[] count = new int[26];
        boolean[] inStack = new boolean[26];
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) count[c - 'a']++;
        for (char c : s.toCharArray()) {
            count[c - 'a']--;
            if (inStack[c - 'a']) continue;
            while (!stack.isEmpty() && c < stack.peek() && count[stack.peek() - 'a'] > 0) {
                inStack[stack.pop() - 'a'] = false;
            }
            stack.push(c);
            inStack[c - 'a'] = true;
        }
        StringBuilder sb = new StringBuilder();
        while (!stack.isEmpty()) sb.append(stack.removeLast());
        return sb.toString();
    }
}`,cpp:`#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <deque>
using namespace std;
class Solution {
public:
    string removeDuplicateLetters(string s) {
        unordered_map<char, int> count;
        unordered_set<char> inStack;
        deque<char> stack;
        for (char c : s) count[c]++;
        for (char c : s) {
            count[c]--;
            if (inStack.count(c)) continue;
            while (!stack.empty() && c < stack.back() && count[stack.back()] > 0) {
                inStack.erase(stack.back());
                stack.pop_back();
            }
            stack.push_back(c);
            inStack.insert(c);
        }
        return string(stack.begin(), stack.end());
    }
};`}}],a=[{input:"demigoddessship",output:"deghimops",explanation:"Only one occurrence of each character in alphabetical order from the original string."},{input:"cbacdcbc",output:"acdb",explanation:"Smallest lexicographical sequence with all letters from input exactly once."}],i={"1 <= str.length <= 10000":!0,"str contains only lowercase English letters":!0},c=[{input:"a",output:"a",reason:"Single character, no duplicates to remove"},{input:"zzzz",output:"z",reason:"All duplicates, return only one occurrence"}],s=[{id:"tc1",input:"abcd",expected_output:"abcd"},{id:"tc2",input:"bbcaac",expected_output:"bac"}],o={lexicographical_order:"Lexicographical order means dictionary order; the solution must be the smallest possible alphabetically.",stack_mechanism:"Stack ensures greedy removal of characters while maintaining result order."},u=["Try to use a stack and track the last occurrence of each character.","Can you remove characters from the result if a better option is available later?","Keep track of characters already included in the result."],l=["How would you modify this if uppercase and lowercase letters are considered different?","What if the string allows for deleting at most k duplicates?","How can this be extended for removing duplicate words from a sentence?"],d=["String","Greedy","Stack","Lexicographical Order","Backtracking"],p={title:e,description:t,metadata:n,approaches:r,examples:a,constraints:i,edge_cases:c,test_cases:s,notes:o,hints:u,follow_up:l,tags:d};export{r as approaches,i as constraints,p as default,t as description,c as edge_cases,a as examples,l as follow_up,u as hints,n as metadata,o as notes,d as tags,s as test_cases,e as title};
