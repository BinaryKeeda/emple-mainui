const e="Loop in a List",t="Given the head of a singly linked list, determine whether it contains a cycle. A cycle occurs when a node's next pointer points back to any previously visited node, forming an infinite loop.",n={difficulty:"Medium",tags:["Linked List","Cycle Detection","Floyd’s Algorithm","Hashing"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},s=[{category:"Brute Force",algorithm:"Hash Set Tracking",description:"Traverse the linked list and store each visited node in a hash set. If a node is visited again, a cycle is detected.",steps:["Initialize an empty hash set.","Start traversing the list from the head.","For each node, check if it's already in the set.","If yes, return true (cycle exists).","If no, add it to the set and continue.","If the traversal reaches null, return false (no cycle)."],time_complexity:"O(n)",space_complexity:"O(n)",code:{java:`import java.util.HashSet;
import java.util.Set;

public class Solution {
    public boolean hasCycle(ListNode head) {
        Set<ListNode> visited = new HashSet<>();
        ListNode current = head;
        while (current != null) {
            if (visited.contains(current)) {
                return true;
            }
            visited.add(current);
            current = current.next;
        }
        return false;
    }
}`,cpp:`#include <unordered_set>
using namespace std;

class Solution {
public:
    bool hasCycle(ListNode *head) {
        unordered_set<ListNode*> visited;
        ListNode *current = head;
        while (current != nullptr) {
            if (visited.find(current) != visited.end()) {
                return true;
            }
            visited.insert(current);
            current = current->next;
        }
        return false;
    }
}`}},{category:"Optimal",algorithm:"Floyd’s Tortoise and Hare",description:"Use two pointers: a slow one moving one step and a fast one moving two steps. If they ever meet, there is a cycle.",steps:["Check if the list is empty or has only one node (return false).","Initialize two pointers, slow and fast.","Move slow by one node and fast by two nodes in each iteration.","If at any point slow equals fast, return true (cycle exists).","If fast or fast.next becomes null, return false (no cycle)."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }
        ListNode slow = head;
        ListNode fast = head.next;
        while (fast != null && fast.next != null) {
            if (slow == fast) {
                return true;
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        return false;
    }
}`,cpp:`class Solution {
public:
    bool hasCycle(ListNode *head) {
        if (head == nullptr || head->next == nullptr) {
            return false;
        }
        ListNode *slow = head;
        ListNode *fast = head->next;
        while (fast != nullptr && fast->next != nullptr) {
            if (slow == fast) {
                return true;
            }
            slow = slow->next;
            fast = fast->next->next;
        }
        return false;
    }
}`}}],o=[{input:"[5, 8, 2, 9] with 9 → 8",output:!0,explanation:"There is a cycle: 9 points back to 8"},{input:"[10, 20] with 20 → 10",output:!0,explanation:"20 points back to 10, forming a loop"},{input:"[100]",output:!1,explanation:"Single node with no cycle"}],a={"0 <= Number of nodes <= 10^4":!0,"Node values can be arbitrary":!0},i=[{input:"[]",output:!1,reason:"Empty list has no cycle"},{input:"[1]",output:!1,reason:"Single node, no cycle"},{input:"[1, 2, 3, 4] with 4 → 2",output:!0,reason:"Cycle starting at 2"}],r=[{id:"tc1",input:"[1, 2, 3, 4] with 4 → 1",expected_output:!0},{id:"tc2",input:"[1, 2, 3, 4, 5]",expected_output:!1}],l={floyds_cycle_detection:"Also called the Tortoise and Hare algorithm. Works without extra space.",hash_set_method:"Simpler to implement but requires additional memory proportional to the number of nodes."},c=["Try keeping track of nodes you've already seen.","What happens if you use two pointers moving at different speeds?","What’s the memory difference between the two approaches?"],u=["Can you detect the starting node of the cycle?","Can you remove the cycle from the list?","How would you detect a cycle in a doubly linked list?"],d=["Linked List","Cycle Detection","Two Pointers","Hash Set"],h={title:e,description:t,metadata:n,approaches:s,examples:o,constraints:a,edge_cases:i,test_cases:r,notes:l,hints:c,follow_up:u,tags:d};export{s as approaches,a as constraints,h as default,t as description,i as edge_cases,o as examples,u as follow_up,c as hints,n as metadata,l as notes,d as tags,r as test_cases,e as title};
