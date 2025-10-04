const n="Power Function",e="Implement a function compute_power(base, exponent) that calculates base raised to the power of exponent (i.e., base^exponent). The function should efficiently handle both positive and negative exponents.",t={difficulty:"Medium",tags:["Math","Recursion","Divide and Conquer","Brute Force","Exponentiation"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},o=[{category:"Brute Force",algorithm:"Loop and Multiply/Divide",description:"Use a simple loop to multiply the base with itself exponent times. Handle negative exponents by inverting the base.",steps:["If exponent is 0, return 1 (base^0 = 1).","Convert exponent to long to avoid overflow (e.g., Integer.MIN_VALUE).","If exponent is negative: invert base (base = 1/base) and negate exponent.","Initialize result = 1.0.","Loop from 1 to exponent and multiply result by base in each iteration.","Return the result."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public double myPow(double x, int n) {
        if (n == 0) return 1.0;
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        double result = 1.0;
        for (long i = 0; i < N; i++) {
            result *= x;
        }
        return result;
    }
}`,cpp:`class Solution {
public:
    double myPow(double x, int n) {
        if (n == 0) return 1.0;
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        double result = 1.0;
        for (long i = 0; i < N; i++) {
            result *= x;
        }
        return result;
    }
};`}},{category:"Optimal Approach",algorithm:"Exponentiation by Squaring",description:"Use divide-and-conquer method to calculate power in logarithmic time by squaring the base and halving the exponent.",steps:["If exponent is 0, return 1.","Convert exponent to long to handle overflow.","If exponent is negative: invert base and negate exponent.","Initialize result = 1.0.","While exponent > 0:","- If exponent is odd, multiply result by base.","- Square the base.","- Halve the exponent.","Return the final result."],time_complexity:"O(log n)",space_complexity:"O(1)",code:{java:`class Solution {
    public double myPow(double x, int n) {
        if (n == 0) return 1.0;
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        double result = 1.0;
        while (N > 0) {
            if (N % 2 == 1) {
                result *= x;
            }
            x *= x;
            N /= 2;
        }
        return result;
    }
}`,cpp:`class Solution {
public:
    double myPow(double x, int n) {
        if (n == 0) return 1.0;
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        double result = 1.0;
        while (N > 0) {
            if (N % 2 == 1) {
                result *= x;
            }
            x *= x;
            N /= 2;
        }
        return result;
    }
};`}}],i=[{input:[3,4],output:81,explanation:"3^4 = 3×3×3×3 = 81"},{input:[1.5,3],output:3.375,explanation:"1.5^3 = 1.5×1.5×1.5 = 3.375"},{input:[5,-2],output:.04,explanation:"5^-2 = 1 / (5^2) = 1 / 25 = 0.04"}],a={"base is a floating-point number":!0,"exponent is a 32-bit signed integer":!0,"if base == 0, exponent must not be negative":!0},s=[{input:[2,0],output:1,reason:"Any number to the power 0 is 1"},{input:[0,5],output:0,reason:"0 to any positive power is 0"},{input:[0,-3],output:"undefined",reason:"0 to a negative power is undefined"}],u=[{id:"tc1",input:[2,10],expected_output:1024},{id:"tc2",input:[2,-3],expected_output:.125}],r={overflow_handling:"Converting exponent to long prevents overflow issues with Integer.MIN_VALUE.",mathematical_principle:"Uses the property: x^n = x * x^(n-1), and x^n = (x^n/2)^2 for even n."},l=["Try handling negative exponents first.","Look into recursive or iterative squaring for optimization.","Avoid recalculating power for the same values multiple times."],p=["Can you implement it recursively without stack overflow?","Can you apply this to modular exponentiation?","What if the exponent is a floating-point number (not just int)?"],c=["Math","Power Function","Logarithmic Optimization","Edge Case Handling","Exponentiation by Squaring"],x={title:n,description:e,metadata:t,approaches:o,examples:i,constraints:a,edge_cases:s,test_cases:u,notes:r,hints:l,follow_up:p,tags:c};export{o as approaches,a as constraints,x as default,e as description,s as edge_cases,i as examples,p as follow_up,l as hints,t as metadata,r as notes,c as tags,u as test_cases,n as title};
