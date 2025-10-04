const e="Power of Two",t="Given an integer num, determine if it is a power of two. Return true if it is, otherwise return false. A number is considered a power of two if it can be expressed as 2 raised to some integer exponent (i.e., there exists an integer k such that num == 2^k).",n={difficulty:"Easy",tags:["Bit Manipulation","Math","Binary","Logarithmic","Fundamentals"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},o=[{category:"Brute Force",algorithm:"Loop and Divide",description:"Divide the number repeatedly by 2 and check if it becomes 1.",steps:["If num <= 0, return false.","While num is greater than 1, check if num % 2 != 0. If true, return false.","If loop completes and num becomes 1, return true."],time_complexity:"O(log n)",space_complexity:"O(1)",code:{java:`class Solution {
  public boolean isPowerOfTwo(int n) {
    if (n <= 0) return false;
    while (n % 2 == 0) n /= 2;
    return n == 1;
  }
}`,cpp:`class Solution {
public:
  bool isPowerOfTwo(int n) {
    if (n <= 0) return false;
    while (n % 2 == 0) n /= 2;
    return n == 1;
  }
};`}},{category:"Optimal",algorithm:"Bit Manipulation",description:"Use the property that powers of two have only one set bit in binary representation.",steps:["If num <= 0, return false.","Use expression: num & (num - 1).","If result is 0, then num is a power of two. Else, return false."],time_complexity:"O(1)",space_complexity:"O(1)",code:{java:`class Solution {
  public boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
  }
}`,cpp:`class Solution {
public:
  bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
  }
};`}}],i=[{input:8,output:!0,explanation:"8 can be written as 2³ (2 × 2 × 2 = 8)."},{input:1024,output:!0,explanation:"1024 = 2^10."},{input:18,output:!1,explanation:"No integer k where 2^k equals 18."}],r={"Integer range":"−2³¹ <= num <= 2³¹−1"},a=[{input:0,output:!1,reason:"Zero is not a power of two."},{input:1,output:!0,reason:"2^0 = 1, which is a power of two."},{input:-8,output:!1,reason:"Negative numbers are not considered powers of two."}],s=[{id:"tc1",input:16,expected_output:!0},{id:"tc2",input:5,expected_output:!1},{id:"tc3",input:1,expected_output:!0}],u={bitwise_logic:"For a power of two, only one bit is set (e.g., 2 = 10, 4 = 100, 8 = 1000). Subtracting 1 flips all bits after the only set bit, so ANDing them gives 0.",division_strategy:"Dividing by 2 repeatedly will only yield 1 for powers of two. Any interruption (odd result) indicates failure."},p=["Can you think of a number with only one set bit in its binary form?","Try using bitwise AND operator with num and (num - 1).","What will num & (num - 1) be for 8? For 10?"],l=["What if the number is in floating point form? Would you handle it the same way?","Can this logic be used for checking power of three or four?","Can you use recursion instead of loop?"],c=["Math","Bit Manipulation","Fundamentals","Binary Representation","Efficiency"],f={title:e,description:t,metadata:n,approaches:o,examples:i,constraints:r,edge_cases:a,test_cases:s,notes:u,hints:p,follow_up:l,tags:c};export{o as approaches,r as constraints,f as default,t as description,a as edge_cases,i as examples,l as follow_up,p as hints,n as metadata,u as notes,c as tags,s as test_cases,e as title};
