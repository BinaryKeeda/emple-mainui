const t="Tower of Hanoi",o="Given k disks stacked in ascending order (smallest on top) on the source rod, determine the minimum number of moves required to transfer all disks to the destination rod using an auxiliary rod, following these rules: Only one disk can be moved at a time. A disk can only be placed on top of a larger disk.",e={difficulty:"Medium",tags:["Recursion","Mathematics","Backtracking","Divide and Conquer"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force (Recursive)",algorithm:"Recursive Tower of Hanoi",description:"Recursively move (k-1) disks to the auxiliary rod, then move the largest disk to destination, and finally move the (k-1) disks from auxiliary to destination.",steps:["If k == 1: Move disk from source to destination and return 1.","Recursively move (k - 1) disks from source to auxiliary using destination as helper.","Move the kth (largest) disk from source to destination.","Recursively move (k - 1) disks from auxiliary to destination using source as helper.","Return total moves: 2 * moves for (k - 1) + 1."],time_complexity:"O(2^k)",space_complexity:"O(k)",code:{java:`class Solution {
    public int towerOfHanoi(int k, int from, int to, int aux) {
        if (k == 1) {
            return 1;
        }
        return towerOfHanoi(k - 1, from, aux, to) + 1 + towerOfHanoi(k - 1, aux, to, from);
    }
}`,cpp:`class Solution {
public:
    int towerOfHanoi(int k, int from, int to, int aux) {
        if (k == 1) {
            return 1;
        }
        return towerOfHanoi(k - 1, from, aux, to) + 1 + towerOfHanoi(k - 1, aux, to, from);
    }
}`}},{category:"Optimal (Mathematical Formula)",algorithm:"2^k - 1",description:"Use the formula 2^k - 1 to directly compute the minimum number of moves without recursion.",steps:["Input number of disks k.","Compute 2 raised to the power k.","Subtract 1 to get the total number of moves.","Return the result."],time_complexity:"O(1)",space_complexity:"O(1)",code:{java:`class Solution {
    public int towerOfHanoi(int k, int from, int to, int aux) {
        return (int) Math.pow(2, k) - 1;
    }
}`,cpp:`#include <cmath>
class Solution {
public:
    int towerOfHanoi(int k, int from, int to, int aux) {
        return pow(2, k) - 1;
    }
}`}}],n=[{input:{k:1,source:"X",destination:"Y",auxiliary:"Z"},output:1,explanation:"Move disk 1 from 'X' to 'Y'. Total moves = 1."},{input:{k:2,source:"A",destination:"C",auxiliary:"B"},output:3,explanation:"Move disk 1 from 'A' to 'B'. Move disk 2 from 'A' to 'C'. Move disk 1 from 'B' to 'C'."}],a={"0 <= k <= 20":!0,"source and destination and auxiliary are distinct characters":!0},r=[{input:{k:0,source:"A",destination:"B",auxiliary:"C"},output:0,reason:"No disks to move, so 0 moves."},{input:{k:3,source:"X",destination:"Z",auxiliary:"Y"},output:7,reason:"2^3 - 1 = 7 moves for 3 disks."}],s=[{id:"tc1",input:{k:4,source:"A",destination:"C",auxiliary:"B"},expected_output:15},{id:"tc2",input:{k:0,source:"A",destination:"B",auxiliary:"C"},expected_output:0}],u={recursion_pattern:"Tower of Hanoi follows a classic divide-and-conquer strategy with the recurrence T(k) = 2T(k−1) + 1.",formula_pattern:"For any k, total minimum moves = 2^k − 1 without recursion."},c=["Can you move (k-1) disks to another rod and then come back to them after moving the largest disk?","Do you notice a pattern in the number of moves? Try small values of k.","Think recursively: solve smaller problems to build up to larger ones."],l=["Can you print the actual moves required for solving Tower of Hanoi?","What happens if you add time delays or simulate real rods using stacks?","How would the algorithm adapt if you had 4 rods instead of 3?"],d=["Recursion","Divide and Conquer","Mathematical Formula","Classic Problems"],m={title:t,description:o,metadata:e,approaches:i,examples:n,constraints:a,edge_cases:r,test_cases:s,notes:u,hints:c,follow_up:l,tags:d};export{i as approaches,a as constraints,m as default,o as description,r as edge_cases,n as examples,l as follow_up,c as hints,e as metadata,u as notes,d as tags,s as test_cases,t as title};
