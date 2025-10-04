const n="Count Primes Using Sieve of Eratosthenes",e="Given an integer num, return the number of prime numbers strictly less than num. Use brute force or the Sieve of Eratosthenes for optimization.",i={difficulty:"Medium",tags:["Prime","Number Theory","Sieve","Math"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},t=[{category:"Brute Force",algorithm:"Check each number for primality",description:"Check all numbers from 2 to n-1 for primality by testing if divisible by any smaller number (up to √i).",steps:["Initialize count to 0.","Iterate from i = 2 to n - 1.","For each i, check if it is prime by testing divisibility from 2 to √i.","If it is prime, increment the count.","Return the final count."],time_complexity:"O(n √n)",space_complexity:"O(1)",code:{java:`public class Solution {
    public int countPrimes(int n) {
        if (n <= 2) return 0;
        int count = 0;
        for (int i = 2; i < n; i++) {
            if (isPrime(i)) {
                count++;
            }
        }
        return count;
    }

    private boolean isPrime(int num) {
        if (num <= 1) return false;
        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) return false;
        }
        return true;
    }
}`,cpp:`class Solution {
public:
    bool isPrime(int num) {
        if (num <= 1) return false;
        for (int i = 2; i * i <= num; ++i) {
            if (num % i == 0) return false;
        }
        return true;
    }

    int countPrimes(int n) {
        if (n <= 2) return 0;
        int count = 0;
        for (int i = 2; i < n; ++i) {
            if (isPrime(i)) ++count;
        }
        return count;
    }
};`}},{category:"Optimal",algorithm:"Sieve of Eratosthenes",description:"Efficiently find all primes less than n by marking multiples of each prime as non-prime.",steps:["Create a boolean array isPrime of size n and initialize all entries as true.","Mark isPrime[0] and isPrime[1] as false (0 and 1 are not prime).","Iterate p from 2 to √n.","If isPrime[p] is true, mark all multiples of p (from p*p to n) as false.","Count the number of true values in the array (i.e., primes).","Return the count."],time_complexity:"O(n log log n)",space_complexity:"O(n)",code:{java:`import java.util.Arrays;
public class Solution {
    public int countPrimes(int n) {
        if (n <= 2) return 0;
        boolean[] isPrime = new boolean[n];
        Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;

        for (int p = 2; p * p < n; p++) {
            if (isPrime[p]) {
                for (int multiple = p * p; multiple < n; multiple += p) {
                    isPrime[multiple] = false;
                }
            }
        }

        int count = 0;
        for (boolean prime : isPrime) {
            if (prime) count++;
        }
        return count;
    }
}`,cpp:`#include <vector>
#include <algorithm>
class Solution {
public:
    int countPrimes(int n) {
        if (n <= 2) return 0;
        std::vector<bool> isPrime(n, true);
        isPrime[0] = isPrime[1] = false;

        for (int p = 2; p * p < n; ++p) {
            if (isPrime[p]) {
                for (int multiple = p * p; multiple < n; multiple += p) {
                    isPrime[multiple] = false;
                }
            }
        }

        return std::count(isPrime.begin(), isPrime.end(), true);
    }
};`}}],r=[{input:11,output:4,explanation:"Primes strictly less than 11 are: 2, 3, 5, 7"},{input:20,output:8,explanation:"Primes strictly less than 20 are: 2, 3, 5, 7, 11, 13, 17, 19"}],o={"0 <= n <= 5000000":!0},s=[{input:0,output:0,reason:"No numbers to check for primality"},{input:2,output:0,reason:"No primes strictly less than 2"},{input:3,output:1,reason:"Only 2 is a prime less than 3"}],a=[{id:"tc1",input:10,expected_output:4},{id:"tc2",input:100,expected_output:25}],u={sieve_principle:"If a number p is prime, mark all multiples of p as not prime starting from p*p.",optimization:"Start crossing out from p*p, not 2*p, as smaller multiples have already been marked."},l=["Try marking only from p*p to reduce redundant work.","Boolean arrays are fast for marking non-primes.","Only check up to √n for base primes."],m=["How would you adapt this for very large values using segmented sieve?","Can this be optimized for memory using bitwise storage?","What if you wanted to return all primes instead of just count?"],p=["Prime","Sieve","Math","Array","Boolean Array"],c={title:n,description:e,metadata:i,approaches:t,examples:r,constraints:o,edge_cases:s,test_cases:a,notes:u,hints:l,follow_up:m,tags:p};export{t as approaches,o as constraints,c as default,e as description,s as edge_cases,r as examples,m as follow_up,l as hints,i as metadata,u as notes,p as tags,a as test_cases,n as title};
