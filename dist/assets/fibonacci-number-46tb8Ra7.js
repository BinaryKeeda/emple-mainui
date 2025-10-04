const n="Fibonacci Number",t=`Given an integer n, return the nth Fibonacci number where:
F(0) = 0
F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.`,e={difficulty:"Easy",tags:["Dynamic Programming","Recursion","Math","DP","Optimization"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Recursive Approach",description:"A naive recursive solution that follows the mathematical recurrence relation directly.",steps:["If n == 0, return 0.","If n == 1, return 1.","Else, return fib(n - 1) + fib(n - 2)."],time_complexity:"O(2^n)",space_complexity:"O(n)",code:{java:`class Solution {
    public int fib(int n) {
        if (n == 0) return 0;
        if (n == 1) return 1;
        return fib(n - 1) + fib(n - 2);
    }
}`,cpp:`class Solution {
public:
    int fib(int n) {
        if (n == 0) return 0;
        if (n == 1) return 1;
        return fib(n - 1) + fib(n - 2);
    }
};`}},{category:"Optimal",algorithm:"Dynamic Programming (Iterative)",description:"An iterative bottom-up dynamic programming approach that eliminates redundant calculations.",steps:["If n == 0, return 0.","If n == 1, return 1.","Initialize: a = 0, b = 1.","Iterate from i = 2 to n:","  c = a + b","  a = b, b = c","Return b"],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public int fib(int n) {
        if (n == 0) return 0;
        if (n == 1) return 1;
        int a = 0, b = 1, c;
        for (int i = 2; i <= n; i++) {
            c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`,cpp:`class Solution {
public:
    int fib(int n) {
        if (n == 0) return 0;
        if (n == 1) return 1;
        int a = 0, b = 1, c;
        for (int i = 2; i <= n; i++) {
            c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
};`}}],a=[{input:2,output:1,explanation:"F(2) = F(1) + F(0) = 1 + 0 = 1"},{input:3,output:2,explanation:"F(3) = F(2) + F(1) = 1 + 1 = 2"},{input:4,output:3,explanation:"F(4) = F(3) + F(2) = 2 + 1 = 3"}],o={"0 <= n <= 100000":!0},r=[{input:0,output:0,reason:"Base case F(0)"},{input:1,output:1,reason:"Base case F(1)"}],c=[{id:"tc1",input:5,expected_output:5},{id:"tc2",input:10,expected_output:55}],u={recursive_drawback:"The recursive method has exponential time complexity due to repeated calculations.",dp_advantage:"Iterative DP uses constant space and computes results in linear time, making it optimal for large n."},s=["Can you store the results of previous computations to avoid recalculating them?","What if you use iteration instead of recursion?","Is there a way to use constant space and still compute the result?"],p=["Can you implement this using memoization (top-down DP)?","What if n is extremely large and you need to return result modulo 10^9+7?","Can you compute F(n) in logarithmic time using matrix exponentiation?"],l=["Recursion","Dynamic Programming","Fibonacci","Math","Optimized Loop"],m={title:n,description:t,metadata:e,approaches:i,examples:a,constraints:o,edge_cases:r,test_cases:c,notes:u,hints:s,follow_up:p,tags:l};export{i as approaches,o as constraints,m as default,t as description,r as edge_cases,a as examples,p as follow_up,s as hints,e as metadata,u as notes,l as tags,c as test_cases,n as title};
