function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
const list1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 4,
    },
  },
};

const list2 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 4,
    },
  },
};

var mergeTwoLists = function (l1, l2) {
  let h1 = l1;
  let h2 = l2;
  let head = new ListNode();
  let root = head;
  while (h1 || h2) {
    let cur = null;
    if (!h1) {
      cur = h2;
    } else if (!h2) {
      cur = h1;
    } else {
      cur = h1.val < h2.val ? h1 : h2;
    }
    head.next = cur;
    head = head.next;
    if (cur === h1) {
      h1 = h1.next;
    } else {
      h2 = h2.next;
    }
  }
  return root.next;
};

console.log(JSON.stringify(mergeTwoLists(list1, list2)));
