const n="Add Two Numbers",e="Given two non-empty linked lists representing two non-negative integers in reverse digit order, return their sum as a new linked list also in reverse order.",t={difficulty:"Medium",tags:["Linked List","Math","Two Pointers","Simulation"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},r=[{category:"Brute Force",algorithm:"Convert Linked Lists to Numbers",description:"Convert both lists to integer values, add them, and then convert the result back to a linked list.",steps:["Traverse each linked list to reconstruct the integer (in reverse order).","Add the two integer values.","Convert the resulting integer back into a linked list by extracting digits in reverse order."],time_complexity:"O(max(m, n))",space_complexity:"O(max(m, n))",code:{java:`class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        long num1 = listToNumber(l1);
        long num2 = listToNumber(l2);
        return numberToList(num1 + num2);
    }
    private long listToNumber(ListNode node) {
        long num = 0, place = 1;
        while (node != null) {
            num += node.val * place;
            place *= 10;
            node = node.next;
        }
        return num;
    }
    private ListNode numberToList(long num) {
        if (num == 0) return new ListNode(0);
        ListNode dummy = new ListNode(0), curr = dummy;
        while (num > 0) {
            curr.next = new ListNode((int)(num % 10));
            curr = curr.next;
            num /= 10;
        }
        return dummy.next;
    }
}`,cpp:`class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        long long num1 = listToNumber(l1);
        long long num2 = listToNumber(l2);
        return numberToList(num1 + num2);
    }
private:
    long long listToNumber(ListNode* node) {
        long long num = 0, place = 1;
        while (node != nullptr) {
            num += node->val * place;
            place *= 10;
            node = node->next;
        }
        return num;
    }
    ListNode* numberToList(long long num) {
        if (num == 0) return new ListNode(0);
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        while (num > 0) {
            curr->next = new ListNode(num % 10);
            curr = curr->next;
            num /= 10;
        }
        return dummy->next;
    }
}`}},{category:"Optimal",algorithm:"Digit-by-Digit Addition with Carry",description:"Traverse both lists while summing corresponding digits and maintaining carry.",steps:["Initialize a dummy node and a carry variable (0).","Traverse both lists simultaneously, summing the digits and the carry.","Create new node for each digit of the result and append to result list.","Move to the next nodes in both lists.","If carry remains after traversal, append it as a new node."],time_complexity:"O(max(m, n))",space_complexity:"O(max(m, n))",code:{java:`class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0), curr = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int x = (l1 != null) ? l1.val : 0;
            int y = (l2 != null) ? l2.val : 0;
            int sum = x + y + carry;
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        return dummy.next;
    }
}`,cpp:`class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        int carry = 0;
        while (l1 != nullptr || l2 != nullptr || carry != 0) {
            int x = (l1 != nullptr) ? l1->val : 0;
            int y = (l2 != nullptr) ? l2->val : 0;
            int sum = x + y + carry;
            carry = sum / 10;
            curr->next = new ListNode(sum % 10);
            curr = curr->next;
            if (l1 != nullptr) l1 = l1->next;
            if (l2 != nullptr) l2 = l2->next;
        }
        return dummy->next;
    }
}`}}],i=[{input:{num1:[3,2,1],num2:[6,5,4]},output:[9,7,5],explanation:"123 + 456 = 579 → reversed = [9, 7, 5]"},{input:{num1:[5],num2:[5]},output:[0,1],explanation:"5 + 5 = 10 → reversed = [0, 1]"},{input:{num1:[8,9,9],num2:[2]},output:[0,0,0,1],explanation:"998 + 2 = 1000 → reversed = [0, 0, 0, 1]"}],o={"1 <= num1.length, num2.length <= 100":!0,"0 <= node.val <= 9":!0,"num1 and num2 do not contain leading zeroes unless the number is 0":!0},u=[{input:{num1:[0],num2:[0]},output:[0],reason:"Both numbers are 0"},{input:{num1:[9,9,9],num2:[1]},output:[0,0,0,1],reason:"Carry propagates through all digits"}],s=[{id:"tc1",input:{num1:[2,4,3],num2:[5,6,4]},expected_output:[7,0,8]},{id:"tc2",input:{num1:[0],num2:[7,3]},expected_output:[7,3]}],l={linked_list_order:"Each digit is stored in reverse order; the head node is the least significant digit.",carry_handling:"Don't forget to include a carry node if the last sum generates it."},a=["You don’t need to convert the entire list to an integer.","Use a dummy node to simplify the addition logic.","Use a carry variable for handling sums ≥ 10."],d=["What if the numbers are represented in forward order?","Can you solve it recursively instead of iteratively?","How would you handle negative numbers or subtraction?"],m=["Linked List","Carry Propagation","Two Pointers","Simulation"],c={title:n,description:e,metadata:t,approaches:r,examples:i,constraints:o,edge_cases:u,test_cases:s,notes:l,hints:a,follow_up:d,tags:m};export{r as approaches,o as constraints,c as default,e as description,u as edge_cases,i as examples,d as follow_up,a as hints,t as metadata,l as notes,m as tags,s as test_cases,n as title};
