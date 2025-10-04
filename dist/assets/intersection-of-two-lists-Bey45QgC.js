const e="Intersection of Two Linked Lists",t="Given the starting nodes of two singly linked lists, determine the node at which the two lists intersect (if any). The intersection is defined by reference, not value. If no such node exists, return null.",n={difficulty:"Medium",tags:["Linked List","Two Pointers","Hashing"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Hash Set Tracking",description:"Store all nodes of list1 in a hash set. Traverse list2 and return the first node found in the set (by reference).",steps:["Traverse List1 and store all nodes in a HashSet.","Traverse List2 and for each node, check if it exists in the HashSet.","If a match is found, return the current node as the intersection.","If no match is found, return null."],time_complexity:"O(m + n)",space_complexity:"O(m)",code:{java:`import java.util.HashSet;
public class Solution {
  public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    HashSet<ListNode> visited = new HashSet<>();
    ListNode curr = headA;
    while (curr != null) {
      visited.add(curr);
      curr = curr.next;
    }
    curr = headB;
    while (curr != null) {
      if (visited.contains(curr)) return curr;
      curr = curr.next;
    }
    return null;
  }
}`,cpp:`#include <unordered_set>
class Solution {
public:
  ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
    std::unordered_set<ListNode*> visited;
    ListNode* curr = headA;
    while (curr != nullptr) {
      visited.insert(curr);
      curr = curr->next;
    }
    curr = headB;
    while (curr != nullptr) {
      if (visited.find(curr) != visited.end()) return curr;
      curr = curr->next;
    }
    return nullptr;
  }
};`}},{category:"Optimal",algorithm:"Two Pointer Technique",description:"Use two pointers. When one reaches the end, switch it to the head of the other list. They will meet at the intersection or end together as null.",steps:["Initialize two pointers, p1 and p2, to the heads of list1 and list2 respectively.","Traverse both lists: move p1 and p2 one step at a time.","If p1 reaches the end, redirect it to headB; if p2 reaches the end, redirect it to headA.","Continue until p1 == p2 (intersection) or both are null (no intersection).","Return p1 (which will be the intersection node or null)."],time_complexity:"O(m + n)",space_complexity:"O(1)",code:{java:`public class Solution {
  public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    ListNode p1 = headA, p2 = headB;
    while (p1 != p2) {
      p1 = (p1 == null) ? headB : p1.next;
      p2 = (p2 == null) ? headA : p2.next;
    }
    return p1;
  }
}`,cpp:`class Solution {
public:
  ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
    ListNode *p1 = headA, *p2 = headB;
    while (p1 != p2) {
      p1 = (p1 == nullptr) ? headB : p1->next;
      p2 = (p2 == nullptr) ? headA : p2->next;
    }
    return p1;
  }
};`}}],s=[{input:{list1:"A → B → C → D → E",list2:"F → G → C → D → E"},output:"Node C",explanation:"Lists intersect at Node C and share the rest of the nodes."},{input:{list1:"X → Y → Z",list2:"M → N → O → P"},output:"null",explanation:"No common node by reference."},{input:{list1:"1 → 2 → 3 → 4",list2:"9 → 3 → 4"},output:"Node 3",explanation:"Lists merge starting from Node 3."}],o={lists_are_singly_linked:!0,lists_do_not_contain_cycles:!0,original_structure_must_remain:!0},r=[{input:{list1:"A → B",list2:"B"},output:"Node B",reason:"B is the starting node of list2 and exists in list1."},{input:{list1:"null",list2:"null"},output:"null",reason:"Both lists are empty."},{input:{list1:"A → B → C",list2:"D → E → F"},output:"null",reason:"No intersection by reference."}],a=[{id:"tc1",input:{list1:"1 → 2 → 3",list2:"6 → 7 → 3"},expected_output:"Node 3"},{id:"tc2",input:{list1:"1 → 2 → 3 → 4 → 5",list2:"6 → 4 → 5"},expected_output:"Node 4"}],l={memory_reference_check:"Intersection is determined by reference, not by node value.",equal_traversal:"Two pointers will either meet at the intersection node or both become null after at most m + n steps."},d=["Think about how to handle different lengths of lists.","What happens if you redirect a pointer to the head of the other list?","Can you detect intersection without using extra space?"],c=["What if the lists are extremely long and memory is limited?","Can you modify the structure to allow faster detection next time?","How would you adapt the logic for doubly linked lists?"],u=["Linked List","Hashing","Two Pointers","Memory Reference","Interview Favorite"],h={title:e,description:t,metadata:n,approaches:i,examples:s,constraints:o,edge_cases:r,test_cases:a,notes:l,hints:d,follow_up:c,tags:u};export{i as approaches,o as constraints,h as default,t as description,r as edge_cases,s as examples,c as follow_up,d as hints,n as metadata,l as notes,u as tags,a as test_cases,e as title};
