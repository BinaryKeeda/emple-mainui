const t="Reverse Bits",n="Given a 32-bit unsigned integer x, reverse all its bits and return the resulting integer.",e={difficulty:"Easy",tags:["Bit Manipulation","Math","Binary","Optimization"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Bit-by-Bit Reversal",description:"Iterate over each bit of the input, extract it, and shift into the reversed result.",steps:["Initialize result = 0.","Loop over 32 bits:","Extract the least significant bit using x & 1.","Left-shift result by 1 and add the extracted bit.","Right-shift x by 1 to process the next bit.","Return result."],time_complexity:"O(1)",space_complexity:"O(1)",code:{java:`public class Solution {
    public int reverseBits(int n) {
        int result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>>= 1; // Unsigned right shift
        }
        return result;
    }
}`,cpp:`class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>= 1;
        }
        return result;
    }
};`}},{category:"Optimal (Divide and Conquer)",algorithm:"Bitmasking + Chunk Swapping",description:"Use divide-and-conquer bitmasking to reverse chunks of bits: 16-bit, 8-bit, 4-bit, etc.",steps:["Swap 16-bit halves: x = (x >>> 16) | (x << 16).","Swap 8-bit chunks: x = ((x & 0xff00ff00) >>> 8) | ((x & 0x00ff00ff) << 8).","Swap 4-bit chunks: x = ((x & 0xf0f0f0f0) >>> 4) | ((x & 0x0f0f0f0f) << 4).","Swap 2-bit chunks: x = ((x & 0xcccccccc) >>> 2) | ((x & 0x33333333) << 2).","Swap 1-bit chunks: x = ((x & 0xaaaaaaaa) >>> 1) | ((x & 0x55555555) << 1).","Return x."],time_complexity:"O(1)",space_complexity:"O(1)",code:{java:`public class Solution {
    public int reverseBits(int n) {
        n = (n >>> 16) | (n << 16);
        n = ((n & 0xff00ff00) >>> 8) | ((n & 0x00ff00ff) << 8);
        n = ((n & 0xf0f0f0f0) >>> 4) | ((n & 0x0f0f0f0f) << 4);
        n = ((n & 0xcccccccc) >>> 2) | ((n & 0x33333333) << 2);
        n = ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1);
        return n;
    }
}`,cpp:`class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        n = (n >> 16) | (n << 16);
        n = ((n & 0xff00ff00) >> 8) | ((n & 0x00ff00ff) << 8);
        n = ((n & 0xf0f0f0f0) >> 4) | ((n & 0x0f0f0f0f) << 4);
        n = ((n & 0xcccccccc) >> 2) | ((n & 0x33333333) << 2);
        n = ((n & 0xaaaaaaaa) >> 1) | ((n & 0x55555555) << 1);
        return n;
    }
};`}}],s=[{input:43261596,output:964176192,explanation:"Binary 00000010100101000001111010011100 reversed to 00111001011110000010100101000000"},{input:4294967293,output:3221225471,explanation:"Binary 11111111111111111111111111111101 reversed to 10111111111111111111111111111111"}],a={Input:"32-bit unsigned integer",Output:"32-bit unsigned integer after reversing bits"},r=[{input:0,output:0,reason:"All bits are zero"},{input:4294967295,output:4294967295,reason:"All bits are one; reversal has no effect"},{input:1,output:2147483648,reason:"LSB becomes MSB"}],o=[{id:"tc1",input:"0b00000010100101000001111010011100",expected_output:"0b00111001011110000010100101000000"},{id:"tc2",input:"0b11111111111111111111111111111101",expected_output:"0b10111111111111111111111111111111"}],u={signed_behavior:"In Java, input/output may appear signed due to 2's complement, but bitwise operations treat them as unsigned.",bit_shift:"Use unsigned right shift >>> in Java to avoid sign extension."},c=["You can extract the last bit using bitwise AND with 1.","To reverse bits, shift result left and input right in each step.","Can you do it without loops?"],p=["What if you're repeatedly reversing bits of the same inputs? Can you cache results?","Can you write a SIMD version that processes multiple integers in parallel?","Can you reverse only the last 16 bits efficiently?"],f=["Bit Manipulation","Binary Operations","Math","Optimization","Interview"],l={title:t,description:n,metadata:e,approaches:i,examples:s,constraints:a,edge_cases:r,test_cases:o,notes:u,hints:c,follow_up:p,tags:f};export{i as approaches,a as constraints,l as default,n as description,r as edge_cases,s as examples,p as follow_up,c as hints,e as metadata,u as notes,f as tags,o as test_cases,t as title};
