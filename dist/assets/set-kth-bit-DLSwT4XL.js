const t="Set Kth Bit",e="Given an integer num and a bit position pos (0-indexed from the right), determine if the bit at position pos in num's binary representation is set (1). Return true if set, false otherwise.",i={difficulty:"Easy",tags:["Bit Manipulation","Binary","Masking","Right Shift"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},n=[{category:"Brute Force",algorithm:"Right Shift + Mask",description:"Right-shift the number by pos positions and isolate the least significant bit to check if the bit is set.",steps:["Right-shift the number by pos: num >> pos.","Isolate the LSB using & 1: (num >> pos) & 1.","Return true if result is 1, else return false."],time_complexity:"O(1)",space_complexity:"O(1)",code:{java:`class CheckBit {
    static boolean checkKthBit(int n, int k) {
        return ((n >> k) & 1) == 1;
    }
}`,cpp:`class Solution {
public:
    bool checkKthBit(int n, int k) {
        return (n >> k) & 1;
    }
};`}},{category:"Optimal",algorithm:"Bit Masking",description:"Use a bit mask to check if the bit at position k is set by creating a mask with 1 at position k and AND-ing it with the number.",steps:["Create a mask with only the kth bit set: mask = 1 << k.","Use AND to check: num & mask.","Return true if result is non-zero, else false."],time_complexity:"O(1)",space_complexity:"O(1)",code:{java:`class CheckBit {
    static boolean checkKthBit(int n, int k) {
        return (n & (1 << k)) != 0;
    }
}`,cpp:`class Solution {
public:
    bool checkKthBit(int n, int k) {
        return n & (1 << k);
    }
};`}}],s=[{input:{num:8,pos:3},output:"true",explanation:"Binary of 8 is 1000. Bit at position 3 is 1 → set."},{input:{num:10,pos:1},output:"true",explanation:"Binary of 10 is 1010. Bit at position 1 is 1 → set."}],o={"0 <= num <= 2^31 - 1":!0,"0 <= pos <= 31":!0},a=[{input:{num:0,pos:0},output:"false",reason:"All bits in 0 are unset."},{input:{num:1,pos:0},output:"true",reason:"LSB of 1 is set."},{input:{num:1024,pos:10},output:"true",reason:"Binary of 1024 is 10000000000, bit at pos 10 is set."}],r=[{id:"tc1",input:{num:15,pos:2},expected_output:"true"},{id:"tc2",input:{num:16,pos:4},expected_output:"true"},{id:"tc3",input:{num:16,pos:3},expected_output:"false"}],c={bit_indexing:"Bit positions are 0-indexed from the right (LSB = position 0).",difference:"Brute-force approach moves bit to LSB before checking, optimal creates a mask and checks directly.",efficiency:"Both approaches are O(1), but masking is generally considered more direct."},u=["Use right shift (>>) to bring target bit to LSB, then & 1.","Try using (1 << pos) to form a mask and check with & operator.","No need to convert to binary string."],p=["What if you need to toggle or clear a specific bit instead?","Can you set or unset the bit at a given position?","How do you count total set bits in a number efficiently?"],h=["Bit Manipulation","Binary","Masking","Right Shift"],l={title:t,description:e,metadata:i,approaches:n,examples:s,constraints:o,edge_cases:a,test_cases:r,notes:c,hints:u,follow_up:p,tags:h};export{n as approaches,o as constraints,l as default,e as description,a as edge_cases,s as examples,p as follow_up,u as hints,i as metadata,c as notes,h as tags,r as test_cases,t as title};
