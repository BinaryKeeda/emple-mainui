const t="Merge Two Sorted Lists",e="Given the starting nodes sortedListA and sortedListB of two sorted linked lists, merge them into a single sorted linked list by splicing nodes together (without creating new nodes). Return the head of the merged list.",n={difficulty:"Easy",tags:["Linked List","Two Pointers","Merge","In-Place"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},i=[{category:"Brute Force",algorithm:"New List Construction",description:"Create a new linked list by comparing nodes and copying values into new nodes.",steps:["Initialize a dummy node to build the merged list.","Use a pointer to track the current position in the new list.","While both input lists are not null, compare current nodes.","Append a new node with the smaller value to the merged list and advance the pointer in that list.","Once one list ends, append remaining nodes of the other list.","Return dummy.next as the head of the new merged list."],time_complexity:"O(m + n)",space_complexity:"O(m + n)",code:{java:`class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = new ListNode(list1.val);
                list1 = list1.next;
            } else {
                current.next = new ListNode(list2.val);
                list2 = list2.next;
            }
            current = current.next;
        }
        current.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`,cpp:`class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode* dummy = new ListNode(0);
        ListNode* current = dummy;
        while (list1 && list2) {
            if (list1->val <= list2->val) {
                current->next = new ListNode(list1->val);
                list1 = list1->next;
            } else {
                current->next = new ListNode(list2->val);
                list2 = list2->next;
            }
            current = current->next;
        }
        current->next = list1 ? list1 : list2;
        return dummy->next;
    }
};`}},{category:"Optimal",algorithm:"In-Place Merge with Tail Pointer",description:"Rearrange existing nodes without creating new ones by comparing and splicing directly.",steps:["Create a dummy node to serve as the head of the merged list.","Use a tail pointer to track the end of the merged list.","While both lists have nodes, compare and attach the smaller one to tail.","Advance the tail and the pointer of the list from which the node was taken.","After the loop, attach the remaining nodes of the non-empty list.","Return dummy.next as the merged head."],time_complexity:"O(m + n)",space_complexity:"O(1)",code:{java:`class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`,cpp:`class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode* dummy = new ListNode(0);
        ListNode* tail = dummy;
        while (list1 && list2) {
            if (list1->val <= list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        tail->next = list1 ? list1 : list2;
        return dummy->next;
    }
};`}}],s=[{input:{sortedListA:[2,5,7],sortedListB:[3,6,8]},output:[2,3,5,6,7,8],explanation:"Nodes from both lists are merged in sorted order."},{input:{sortedListA:[],sortedListB:[10]},output:[10],explanation:"Only list B has nodes, so it's returned as-is."},{input:{sortedListA:[100,200],sortedListB:[150,300]},output:[100,150,200,300],explanation:"Lists are interleaved and merged maintaining sorted order."},{input:{sortedListA:[],sortedListB:[]},output:[],explanation:"Both lists are empty, so the result is empty."}],o={"1 <= list length <= 10^4":!0,"ListNode.val is an integer":!0},l=[{input:{sortedListA:[1],sortedListB:[]},output:[1],reason:"One list is empty."},{input:{sortedListA:[1,2,3],sortedListB:[4,5,6]},output:[1,2,3,4,5,6],reason:"All elements in one list are smaller than the other."}],a=[{id:"tc1",input:{sortedListA:[5],sortedListB:[1,2,3]},expected_output:[1,2,3,5]},{id:"tc2",input:{sortedListA:[1,3,5],sortedListB:[2,4,6]},expected_output:[1,2,3,4,5,6]}],r={merge_behavior:"This problem emphasizes linking existing nodes rather than creating new ones.",dummy_node:"A dummy node is used to simplify head and tail management during merging."},d=["Try using a dummy node and a tail pointer to simplify the merge process.","Compare current nodes of both lists and attach the smaller one.","Don't forget to link remaining nodes when one list ends early."],u=["How would you modify this solution for k sorted linked lists?","Can you make the function recursive instead of iterative?","What if the input lists are not guaranteed to be sorted?"],m=["Linked List","Two Pointers","Merge","In-Place","Dummy Node"],c={title:t,description:e,metadata:n,approaches:i,examples:s,constraints:o,edge_cases:l,test_cases:a,notes:r,hints:d,follow_up:u,tags:m};export{i as approaches,o as constraints,c as default,e as description,l as edge_cases,s as examples,u as follow_up,d as hints,n as metadata,r as notes,m as tags,a as test_cases,t as title};
