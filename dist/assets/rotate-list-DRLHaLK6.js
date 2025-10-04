const t="Rotate List",e="Given the starting node of a singly linked list and an integer 'rotations', rotate the list to the right by that many positions.",n={difficulty:"Medium",tags:["Linked List","Two Pointer","Rotation"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"Iterative Rotations",description:"Rotate the list one step at a time, k times. Each step involves finding the second last node and moving the last node to the front.",steps:["Check for base cases: if head is null, has only one node, or k = 0, return head.","Calculate the length of the list.","Reduce the number of rotations: k = k % length.","For k times:","  - Traverse to the second last node.","  - Detach the last node and move it to the front."],time_complexity:"O(n * k)",space_complexity:"O(1)",code:{java:`class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) {
            return head;
        }
        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }
        k %= length;
        if (k == 0) return head;
        for (int i = 0; i < k; i++) {
            ListNode curr = head;
            while (curr.next != tail) {
                curr = curr.next;
            }
            tail.next = head;
            head = tail;
            tail = curr;
            tail.next = null;
        }
        return head;
    }
}`,cpp:`class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) return head;
        int length = 1;
        ListNode* tail = head;
        while (tail->next) {
            tail = tail->next;
            length++;
        }
        k %= length;
        if (k == 0) return head;
        for (int i = 0; i < k; i++) {
            ListNode* curr = head;
            while (curr->next != tail) {
                curr = curr->next;
            }
            tail->next = head;
            head = tail;
            tail = curr;
            tail->next = nullptr;
        }
        return head;
    }
}`}},{category:"Optimal",algorithm:"Two-Pointer Technique",description:"Use two pointers to find the new head in a single traversal. Break the list and reconnect it to achieve rotation efficiently.",steps:["Check for base cases: head is null, has one node, or k = 0.","Calculate the length and find the tail.","Reduce k: k = k % length.","Traverse to the new tail (length - k - 1 steps).","Set new head to newTail.next, set newTail.next = null, and reconnect tail to old head."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) {
            return head;
        }
        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }
        k %= length;
        if (k == 0) return head;
        ListNode newTail = head;
        for (int i = 0; i < length - k - 1; i++) {
            newTail = newTail.next;
        }
        ListNode newHead = newTail.next;
        newTail.next = null;
        tail.next = head;
        return newHead;
    }
}`,cpp:`class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) return head;
        int length = 1;
        ListNode* tail = head;
        while (tail->next) {
            tail = tail->next;
            length++;
        }
        k %= length;
        if (k == 0) return head;
        ListNode* newTail = head;
        for (int i = 0; i < length - k - 1; i++) {
            newTail = newTail->next;
        }
        ListNode* newHead = newTail->next;
        newTail->next = nullptr;
        tail->next = head;
        return newHead;
    }
}`}}],a=[{input:{root:[10,20,30,40,50],rotations:3},output:[30,40,50,10,20],explanation:"After 3 right rotations, the list becomes [30, 40, 50, 10, 20]."},{input:{root:[100,200,300],rotations:5},output:[200,300,100],explanation:"5 rotations is same as 2 (5 % 3). After 2 rotations: [200, 300, 100]."}],o={"1 <= n <= 10^5":!0,"0 <= k <= 10^9":!0},l=[{input:{root:[],rotations:0},output:[],reason:"Empty list remains unchanged."},{input:{root:[1],rotations:5},output:[1],reason:"Single-element list is unaffected by any rotations."},{input:{root:[1,2,3],rotations:3},output:[1,2,3],reason:"k % n = 0 means no change to the list."}],s=[{id:"tc1",input:{root:[1,2,3,4,5],rotations:2},expected_output:[4,5,1,2,3]},{id:"tc2",input:{root:[0,1,2],rotations:4},expected_output:[2,0,1]}],r={rotation_equivalence:"Rotating a list of length n by k steps is the same as rotating it by (k % n) steps.",cycle_reconnect:"The optimal method involves reconnecting the tail to the head and breaking the list at the correct spot."},h=["Try computing the length first to avoid extra rotations.","Think of the list as circular and break it at the right position.","How can you do it in one pass after knowing the length?"],d=["What if you had to rotate to the left instead of right?","How would you handle a doubly linked list for this problem?","Can you do it recursively?"],c=["Linked List","Rotation","Two Pointer","Brute Force","Optimization"],u={title:t,description:e,metadata:n,approaches:i,examples:a,constraints:o,edge_cases:l,test_cases:s,notes:r,hints:h,follow_up:d,tags:c};export{i as approaches,o as constraints,u as default,e as description,l as edge_cases,a as examples,d as follow_up,h as hints,n as metadata,r as notes,c as tags,s as test_cases,t as title};
