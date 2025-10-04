const e="Middle of the Linked List",t="Given the head of a singly linked list, return the middle node. If the list has an odd number of nodes, return the exact middle. If the list has an even number of nodes, return the second of the two middle nodes.",n={difficulty:"Easy",tags:["Linked List","Two Pointers","Fast and Slow","Brute Force"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},o=[{category:"Brute Force",algorithm:"Two-Pass Traversal",description:"Traverse the list twice — first to count the number of nodes, second to reach the (n/2)-th node.",steps:["Initialize a counter to 0 and a pointer curr = head.","First Pass: Traverse the entire list and increment counter.","Second Pass: Reset curr to head and move it forward (count / 2) times.","Return curr which now points to the middle node."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public ListNode middleNode(ListNode head) {
        int count = 0;
        ListNode curr = head;
        while (curr != null) {
            count++;
            curr = curr.next;
        }
        curr = head;
        for (int i = 0; i < count / 2; i++) {
            curr = curr.next;
        }
        return curr;
    }
}`,cpp:`class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        int count = 0;
        ListNode* curr = head;
        while (curr != nullptr) {
            count++;
            curr = curr->next;
        }
        curr = head;
        for (int i = 0; i < count / 2; i++) {
            curr = curr->next;
        }
        return curr;
    }
}`}},{category:"Optimal",algorithm:"Fast and Slow Pointers",description:"Use two pointers — slow and fast. Move slow by one step and fast by two steps until fast reaches the end. Slow will then be at the middle.",steps:["Initialize two pointers: slow = head and fast = head.","While fast != null and fast.next != null:","Move slow to slow.next.","Move fast to fast.next.next.","When loop ends, slow will be at the middle node.","Return slow."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`,cpp:`class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }
}`}}],s=[{input:[1,2,3,4,5],output:[3,4,5],explanation:"The list has an odd number of nodes. The middle node is 3."},{input:[1,2,3,4,5,6],output:[4,5,6],explanation:"The list has an even number of nodes. The second middle node is 4."}],i={"1 <= length of list <= 10^5":!0},d=[{input:[],output:null,reason:"Empty list — no nodes to return."},{input:[42],output:[42],reason:"Single node — it is the middle by default."}],a=[{id:"tc1",input:[10,20,30,40,50],expected_output:[30,40,50]},{id:"tc2",input:[11,22,33,44,55,66],expected_output:[44,55,66]}],l={definition:"A singly linked list is a list of nodes where each node points to the next one, with the last pointing to null.",why_second_middle:"For even-length lists, returning the second middle simplifies implementations like Leetcode’s definition."},r=["Try using two pointers at different speeds.","The slow pointer will reach the middle when the fast pointer finishes.","Can you solve this in a single pass?"],u=["Can you solve it if you’re only allowed to make one traversal?","What if the linked list is very large and cannot be loaded entirely into memory?","Can you do this with a circular linked list?"],c=["Linked List","Fast & Slow Pointer","Interview Questions","Leetcode Easy"],h={title:e,description:t,metadata:n,approaches:o,examples:s,constraints:i,edge_cases:d,test_cases:a,notes:l,hints:r,follow_up:u,tags:c};export{o as approaches,i as constraints,h as default,t as description,d as edge_cases,s as examples,u as follow_up,r as hints,n as metadata,l as notes,c as tags,a as test_cases,e as title};
