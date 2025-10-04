const n="Number of Set Bits",t="Given a positive integer, return the number of set bits (1s) in its binary representation. Also known as the Hamming weight.",i={difficulty:"Easy",tags:["Bit Manipulation","Hamming Weight","Binary","Brian Kernighan","Basic Algorithms"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},e=[{category:"Brute Force",algorithm:"Right Shift and Check LSB",description:"Use right shift to inspect each bit. Count the bits where the least significant bit (LSB) is 1.",steps:["Initialize count = 0.","While num > 0:","Check if the LSB is set: if (num & 1) == 1, increment count.","Right shift num by 1 (discard the LSB): num = num >> 1.","Return the count."],time_complexity:"O(log num)",space_complexity:"O(1)",code:{java:`class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            count += n & 1;
            n = n >>> 1; // Unsigned right shift
        }
        return count;
    }
}`,cpp:`class Solution {
public:
    int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            count += n & 1;
            n = n >> 1;
        }
        return count;
    }
}`}},{category:"Optimized",algorithm:"Brian Kernighan's Algorithm",description:"Instead of checking each bit, this approach removes the least significant set bit in each iteration.",steps:["Initialize count = 0.","While num > 0:","Clear the least significant set bit: num = num & (num - 1).","Increment count.","Return count."],time_complexity:"O(number of set bits)",space_complexity:"O(1)",code:{java:`class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n = n & (n - 1);
            count++;
        }
        return count;
    }
}`,cpp:`class Solution {
public:
    int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n = n & (n - 1);
            count++;
        }
        return count;
    }
}`}}],s=[{input:7,output:3,explanation:"Binary representation of 7 is 111, which has 3 set bits."},{input:0,output:0,explanation:"Binary representation of 0 is 0, which has no set bits."}],a={"0 <= num <= 2^31 - 1":!0},o=[{input:0,output:0,reason:"Zero has no set bits."},{input:2147483647,output:31,reason:"Maximum positive 32-bit signed integer, all 31 bits set."},{input:1,output:1,reason:"Only one bit set."}],u=[{id:"tc1",input:15,expected_output:4},{id:"tc2",input:1023,expected_output:10}],c={unsigned_right_shift:"In Java, use `>>>` to perform an unsigned right shift for handling negative inputs as unsigned values.",brian_kernighan_explanation:"Each operation `n = n & (n - 1)` removes the least significant set bit, making it efficient when there are few set bits."},r=["Try using bitwise AND with 1 to check if a bit is set.","Observe how many times you can divide the number by 2 before it becomes 0.","In the optimized approach, note how (n & (n - 1)) affects the binary representation."],h=["Can you compute the number of set bits for all numbers from 0 to n in linear time?","Can you implement this using recursion?","What if the input is an array of numbers? Can you process them all efficiently?"],p=["Bit Manipulation","Hamming Weight","Binary Representation","Optimized Loop"],m={title:n,description:t,metadata:i,approaches:e,examples:s,constraints:a,edge_cases:o,test_cases:u,notes:c,hints:r,follow_up:h,tags:p};export{e as approaches,a as constraints,m as default,t as description,o as edge_cases,s as examples,h as follow_up,r as hints,i as metadata,c as notes,p as tags,u as test_cases,n as title};
