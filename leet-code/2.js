/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let reminder = 0;
    let pointer = l1;
    let p2 = l2;
    const head = pointer;
    let prevPointer = pointer;
    while (pointer && p2) {
        const value = pointer.val + p2.val + reminder;
        const val = value % 10;
        reminder = (value / 10) << 0;
        pointer.val = val;
        prevPointer = pointer;
        pointer = pointer.next;
        p2 = p2.next;
    }

    if (p2) {
        prevPointer.next = p2;
        pointer = prevPointer.next;
    }

    while (reminder && pointer) {
        const value = pointer.val + reminder;
        const val = value % 10;
        reminder = (value / 10) << 0;
        pointer.val = val;
        prevPointer = pointer;
        pointer = pointer.next;
    }

    if (reminder) {
        prevPointer.next = { val: reminder, next: null };
    }

    return head;
};

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

const l1 = new ListNode(
    9,
    new ListNode(
        9,
        new ListNode(
            9,
            new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))),
        ),
    ),
);
const l2 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))));

console.log(JSON.stringify(addTwoNumbers(l1, l2), undefined, 4));
