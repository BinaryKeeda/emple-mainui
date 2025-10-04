const n="Counting Bits",t="Given a non-negative integer num, return an array count of length num + 1 where each entry count[i] represents the number of 1's in the binary representation of i. The solution should efficiently compute the counts for all numbers from 0 to num.",i={difficulty:"Easy",tags:["Bit Manipulation","Dynamic Programming","Binary Representation","Array"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},e=[{category:"Brute Force",algorithm:"Bit Counting by Conversion",description:"For each number from 0 to num, convert the number to binary and count the number of 1s in its binary representation using language-specific methods.",steps:["Initialize an array count of size num + 1.","For each i from 0 to num:","Convert i to binary representation.","Count the number of 1's in the binary string.","Store the count in count[i]."],time_complexity:"O(n log n)",space_complexity:"O(1)",code:{java:`class Solution {
  public int[] countBits(int n) {
    int[] ans = new int[n + 1];
    for (int i = 0; i <= n; i++) {
      ans[i] = Integer.bitCount(i); // Built-in bit count
    }
    return ans;
  }
}`,cpp:`#include <vector>
#include <bitset>
class Solution {
public:
  std::vector<int> countBits(int n) {
    std::vector<int> ans(n + 1);
    for (int i = 0; i <= n; ++i) {
      ans[i] = std::bitset<32>(i).count(); // Count 1's in binary
    }
    return ans;
  }
};`}},{category:"Optimal (Dynamic Programming)",algorithm:"DP using Bit Shifting",description:"Use the previously computed results: The number of 1s in i equals the number of 1s in i / 2 (i >> 1) plus 1 if i is odd.",steps:["Initialize an array count of size num + 1.","Set count[0] = 0.","For each i from 1 to num:","Compute count[i] = count[i >> 1] + (i & 1).","Return the resulting array."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
  public int[] countBits(int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
      dp[i] = dp[i >> 1] + (i & 1); // i / 2 + last bit
    }
    return dp;
  }
}`,cpp:`#include <vector>
class Solution {
public:
  std::vector<int> countBits(int n) {
    std::vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; ++i) {
      dp[i] = dp[i >> 1] + (i & 1); // i / 2 + last bit
    }
    return dp;
  }
};`}}],o=[{input:2,output:[0,1,1],explanation:"0 → 0 → 0 ones, 1 → 1 → 1 one, 2 → 10 → 1 one."},{input:5,output:[0,1,1,2,1,2],explanation:"0 → 0 → 0 ones, 1 → 1 → 1 one, 2 → 10 → 1 one, 3 → 11 → 2 ones, 4 → 100 → 1 one, 5 → 101 → 2 ones."}],s={"0 <= num <= 100000":!0},a=[{input:0,output:[0],reason:"Only one number: 0 with 0 bits set."},{input:1,output:[0,1],reason:"0 → 0 bits, 1 → 1 bit."}],r=[{id:"tc1",input:10,expected_output:[0,1,1,2,1,2,2,3,1,2,2]},{id:"tc2",input:16,expected_output:[0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4,1]}],u={bitwise_insight:"i >> 1 is i divided by 2 (ignores the least significant bit), and i & 1 checks if the last bit is 1 (i.e., odd).",optimization_reason:"The DP approach avoids string conversion and builds on smaller results, making it efficient for large inputs."},c=["Can you relate the number of 1s in a number to a smaller number?","Try to reuse previously computed values instead of recalculating from scratch.","Observe how shifting bits affects the binary count."],p=["Can you write this without using any built-in functions like bitCount or bitset?","Can you return the same answer using recursion with memoization?","What if you're computing this for a stream of incoming integers up to num?"],l=["Bit Manipulation","Binary Representation","Dynamic Programming","Counting"],m={title:n,description:t,metadata:i,approaches:e,examples:o,constraints:s,edge_cases:a,test_cases:r,notes:u,hints:c,follow_up:p,tags:l};export{e as approaches,s as constraints,m as default,t as description,a as edge_cases,o as examples,p as follow_up,c as hints,i as metadata,u as notes,l as tags,r as test_cases,n as title};
