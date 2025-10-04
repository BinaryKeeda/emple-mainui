const e="Nth Node from the End",t="Given the starting node of a singly linked list and an integer n, remove the nth node from the end of the list and return the modified list's head.",n={difficulty:"Medium",tags:["Linked List","Two Pointers","Dummy Node","Brute Force","Optimal"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},o=[{category:"Brute Force",algorithm:"Two-Pass Length Count",description:"Traverse the list twice — first to compute its length and then to locate and remove the target node.",steps:["Initialize a dummy node pointing to the head.","Traverse the list to calculate its total length.","Compute the position of the node to remove from the start: position = length - n.","Traverse again to reach the node just before the target node.","Modify the next pointer to remove the target node.","Return dummy.next as the new head."],time_complexity:"O(L)",space_complexity:"O(1)",code:{java:`class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        int length = 0;
        ListNode curr = head;
        
        while (curr != null) {
            length++;
            curr = curr.next;
        }

        int position = length - n;
        curr = dummy;

        for (int i = 0; i < position; i++) {
            curr = curr.next;
        }

        curr.next = curr.next.next;

        return dummy.next;
    }
}`,cpp:`class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        int length = 0;
        ListNode* curr = head;

        while (curr != nullptr) {
            length++;
            curr = curr->next;
        }

        int position = length - n;
        curr = dummy;

        for (int i = 0; i < position; i++) {
            curr = curr->next;
        }

        curr->next = curr->next->next;

        return dummy->next;
    }
};`}},{category:"Optimal",algorithm:"One-Pass Two Pointers",description:"Use two pointers with a fixed gap of n between them. When the fast pointer reaches the end, the slow pointer will be just before the target node.",steps:["Initialize a dummy node pointing to the head.","Set both fast and slow pointers to the dummy node.","Move the fast pointer n+1 steps ahead.","Move both fast and slow together until fast reaches the end.","Now slow points to the node just before the one to remove.","Modify the next pointer to skip the target node.","Return dummy.next as the new head."],time_complexity:"O(L)",space_complexity:"O(1)",code:{java:`class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy, slow = dummy;

        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }

        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }

        slow.next = slow.next.next;

        return dummy.next;
    }
}`,cpp:`class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* fast = dummy;
        ListNode* slow = dummy;

        for (int i = 0; i <= n; i++) {
            fast = fast->next;
        }

        while (fast != nullptr) {
            fast = fast->next;
            slow = slow->next;
        }

        slow->next = slow->next->next;

        return dummy->next;
    }
};`}}],i=[{input:{linkedList:[10,20,30,40,50],n:2},output:[10,20,30,50],explanation:"The 2nd node from the end is 40. Removing it leaves [10, 20, 30, 50]."},{input:{linkedList:[5],n:1},output:[],explanation:"Removing the only node results in an empty list."},{input:{linkedList:[100,200],n:1},output:[100],explanation:"Removing the last node (200) leaves [100]."}],s={"1 <= n <= length of the linked list":!0},a=[{input:{linkedList:[1],n:1},output:[],reason:"Single element node removed, resulting in an empty list."},{input:{linkedList:[1,2],n:2},output:[2],reason:"Removing head when n == length."},{input:{linkedList:[1,2,3],n:3},output:[2,3],reason:"Head node removed when n equals the length of list."}],d=[{id:"tc1",input:{linkedList:[1,2,3,4,5],n:2},expected_output:[1,2,3,5]},{id:"tc2",input:{linkedList:[10],n:1},expected_output:[]}],r={dummy_node_usage:"Using a dummy node helps simplify edge cases such as removing the head node.",single_pass_optimization:"The two-pointer approach ensures only a single traversal, reducing overhead."},l=["Can you solve this using only one traversal?","Try using two pointers to maintain a gap of n between them.","Handle edge cases where n equals the length of the list."],u=["How would you modify this if the list was doubly linked?","Can you implement this recursively?","What changes if the input is a circular linked list?"],h=["Linked List","Two Pointers","Dummy Node","Optimal","Edge Cases"],m={title:e,description:t,metadata:n,approaches:o,examples:i,constraints:s,edge_cases:a,test_cases:d,notes:r,hints:l,follow_up:u,tags:h};export{o as approaches,s as constraints,m as default,t as description,a as edge_cases,i as examples,u as follow_up,l as hints,n as metadata,r as notes,h as tags,d as test_cases,e as title};
