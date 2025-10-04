const e="Reverse Linked List",n="Given the starting node ‘listHead’ of a singly linked list, reverse the order of its nodes and return the new head of the reversed list.",t={difficulty:"Easy",tags:["Linked List","Two Pointers","Recursion","In-Place"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},r=[{category:"Brute Force",algorithm:"Value Collection and Rebuilding",description:"Traverse the list to collect values in an array, reverse the array, and rebuild the linked list with new nodes using the reversed values.",steps:["Traverse the linked list and collect all node values into a list/vector.","Reverse the list/vector.","Create a new linked list using the reversed list of values.","Return the head of the newly constructed list."],time_complexity:"O(n)",space_complexity:"O(n)",code:{java:`class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null) return null;
        List<Integer> values = new ArrayList<>();
        ListNode curr = head;
        while (curr != null) {
            values.add(curr.val);
            curr = curr.next;
        }
        Collections.reverse(values);
        ListNode dummy = new ListNode(0);
        ListNode newCurr = dummy;
        for (int val : values) {
            newCurr.next = new ListNode(val);
            newCurr = newCurr.next;
        }
        return dummy.next;
    }
}`,cpp:`#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (!head) return nullptr;
        vector<int> values;
        ListNode* curr = head;
        while (curr) {
            values.push_back(curr->val);
            curr = curr->next;
        }
        reverse(values.begin(), values.end());
        ListNode* dummy = new ListNode(0);
        ListNode* newCurr = dummy;
        for (int val : values) {
            newCurr->next = new ListNode(val);
            newCurr = newCurr->next;
        }
        return dummy->next;
    }
}`}},{category:"Optimal",algorithm:"In-Place Reversal Using Pointers",description:"Use three pointers (prev, curr, next) to reverse the pointers of each node in-place without extra memory.",steps:["Initialize prev as null and curr as head.","Iterate while curr is not null.","Store next = curr.next.","Reverse the link: curr.next = prev.","Move prev = curr and curr = next.","At the end, prev will be the new head. Return it."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,cpp:`class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`}}],s=[{input:[10,20,30,40,50],output:[50,40,30,20,10],explanation:"Original: 10 → 20 → 30 → 40 → 50 → null, Reversed: 50 → 40 → 30 → 20 → 10 → null"},{input:[5,8],output:[8,5],explanation:"Original: 5 → 8 → null, Reversed: 8 → 5 → null"},{input:[],output:[],explanation:"Empty list remains empty after reversal"}],i={"1 <= Number of nodes <= 10^5":!0,"ListNode value range":"-10^9 <= Node.val <= 10^9"},o=[{input:[],output:[],reason:"Edge case for an empty list"},{input:[100],output:[100],reason:"Single element list should return the same node"}],a=[{id:"tc1",input:[1,2,3],expected_output:[3,2,1]},{id:"tc2",input:[99],expected_output:[99]}],l={memory_advantage:"Optimal approach avoids auxiliary space by reversing in-place.",application:"This technique is used in problems involving reversing segments or sublists, such as reversing a sublist between two positions."},u=["Can you reverse the links instead of copying values?","How can you reverse the list without extra memory?"],d=["Can you reverse only the first k nodes of the linked list?","How would you reverse a linked list recursively?","How to reverse in groups of size k?"],c=["Linked List","Two Pointers","Pointer Manipulation","In-Place"],p={title:e,description:n,metadata:t,approaches:r,examples:s,constraints:i,edge_cases:o,test_cases:a,notes:l,hints:u,follow_up:d,tags:c};export{r as approaches,i as constraints,p as default,n as description,o as edge_cases,s as examples,d as follow_up,u as hints,t as metadata,l as notes,c as tags,a as test_cases,e as title};
