const n="GCD of Array",e="Find the Greatest Common Divisor (GCD) of all elements in the given array.",t={difficulty:"Easy",tags:["Math","GCD","Array","Euclidean Algorithm"],author:"Aryan Bhandari",created_at:"2025-06-26",updated_at:"2025-06-26",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Divisor Checking",description:"Check every number from min(arr) down to 1 and test if all elements are divisible by it.",steps:["Find the minimum element in the array.","Iterate from that minimum value down to 1.","For each value i, check if all array elements are divisible by i.","If true, return i as the GCD.","If none found, return 1."],time_complexity:"O(min * n)",space_complexity:"O(1)",code:{java:`public class GCDArrayBrute {
  public static int findGCD(int[] nums) {
    int min = nums[0];
    for (int num : nums) min = Math.min(min, num);
    for (int i = min; i >= 1; i--) {
      boolean allDivisible = true;
      for (int num : nums) {
        if (num % i != 0) {
          allDivisible = false;
          break;
        }
      }
      if (allDivisible) return i;
    }
    return 1;
  }
}`,cpp:`#include <iostream>
#include <vector>
using namespace std;
int findGCD(vector<int>& nums) {
  int minVal = nums[0];
  for (int num : nums) minVal = min(minVal, num);
  for (int i = minVal; i >= 1; --i) {
    bool allDiv = true;
    for (int num : nums) {
      if (num % i != 0) {
        allDiv = false;
        break;
      }
    }
    if (allDiv) return i;
  }
  return 1;
}`}},{category:"Better (Iterative Euclidean)",algorithm:"Iterative Euclidean Algorithm",description:"Use iterative Euclidean algorithm pairwise through the array.",steps:["Implement gcd(a, b) using while loop with Euclidean algorithm.","Initialize result with the first element of the array.","Iterate through the rest of the array, updating result = gcd(result, current).","If at any point result becomes 1, return early.","Return the final result as the GCD."],time_complexity:"O(n * log(max))",space_complexity:"O(1)",code:{java:`public class GCDArrayBetter {
  public static int gcd(int a, int b) {
    while (b != 0) {
      int temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
  public static int findGCD(int[] nums) {
    int result = nums[0];
    for (int i = 1; i < nums.length; i++) {
      result = gcd(result, nums[i]);
      if (result == 1) return 1;
    }
    return result;
  }
}`,cpp:`#include <iostream>
#include <vector>
using namespace std;
int gcd(int a, int b) {
  while (b != 0) {
    int temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
int findGCD(vector<int>& nums) {
  int result = nums[0];
  for (int i = 1; i < nums.size(); ++i) {
    result = gcd(result, nums[i]);
    if (result == 1) return 1;
  }
  return result;
}`}},{category:"Best (Recursive + Functional Reduce)",algorithm:"Recursive Euclidean + Functional Reduction",description:"Use recursion to compute GCD functionally across array (e.g. via reduce).",steps:["Define a recursive gcd(a, b) function: if b == 0 return a, else return gcd(b, a % b).","Use a reduce operation or recursion to apply gcd to the entire array.","In reduce: result = gcd(result, current) for each pair.","Return the reduced GCD value of the array."],time_complexity:"O(n * log(max))",space_complexity:"O(n)",code:{java:`import java.util.Arrays;
public class GCDArrayRecursive {
  public static int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
  }
  public static int findGCD(int[] nums) {
    return Arrays.stream(nums).reduce(GCDArrayRecursive::gcd).orElse(0);
  }
}`,cpp:`#include <iostream>
#include <vector>
using namespace std;
int gcd(int a, int b) {
  if (b == 0) return a;
  return gcd(b, a % b);
}
int findGCD(vector<int>& nums, int index = 0) {
  if (index == nums.size() - 1) return nums[index];
  int nextGCD = findGCD(nums, index + 1);
  return gcd(nums[index], nextGCD);
}`}}],r=[{input:[12,24,36],output:12,explanation:"GCD(12, 24) = 12, GCD(12, 36) = 12"},{input:[3,5,7],output:1,explanation:"No common divisor greater than 1"}],a={"1 <= n <= 100000":!0,"1 <= arr[i] <= 1000000000":!0},s=[{input:[1,1,1],output:1,reason:"GCD of all 1s is 1"},{input:[1e9,1e9],output:1e9,reason:"Two large equal values"},{input:[2],output:2,reason:"Single element"}],u=[{id:"tc1",input:[8,16,32],expected_output:8},{id:"tc2",input:[7,13,29],expected_output:1}],o={euclidean_algorithm:"The GCD of two numbers a and b (a > b) is the same as GCD(b, a % b). This process continues until b becomes 0.",early_exit:"If GCD becomes 1 at any point, we can exit early as 1 is the lowest possible GCD."},l=["Try to reduce the problem from 3 or more numbers to 2 at a time.","Can you use the result of one GCD to reduce the next?","What's the most efficient way to find GCD of two numbers?"],c=["What if the array is constantly updated and you need GCD in real-time?","Can you do it in parallel for large arrays?","What if elements are added or removed dynamically?"],m=["Math","Number Theory","Basic Algorithms","Optimized Loop","Recursion"],d={title:n,description:e,metadata:t,approaches:i,examples:r,constraints:a,edge_cases:s,test_cases:u,notes:o,hints:l,follow_up:c,tags:m};export{i as approaches,a as constraints,d as default,e as description,s as edge_cases,r as examples,c as follow_up,l as hints,t as metadata,o as notes,m as tags,u as test_cases,n as title};
