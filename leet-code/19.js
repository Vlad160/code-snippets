var removeNthFromEnd = function (head, n) {
  let len = 0;
  let node = head;
  let savedHead = head;
  while (node !== null) {
    node = node.next;
    len += 1;
  }
  const toRemove = len - n;
  let n1 = head;
  for (let i = 0; i < toRemove - 1; i++) {
    n1 = n1.next;
  }
  if (n1.next === null) {
    return null;
  }
  if (toRemove === 0) {
    savedHead = n1.next;
  }
  n1.next = n1.next.next;
  return savedHead;
};

var removeNthFromEnd2 = function (head, n) {
  let dummy = { value: 0 };
  dummy.next = head;
  let length = 0;
  let first = head;
  while (first != null) {
    length++;
    first = first.next;
  }
  length -= n;
  first = dummy;
  while (length > 0) {
    length--;
    first = first.next;
  }
  first.next = first.next.next;
  return dummy.next;
};

const nodes = {
  value: 1,
  next: {
    value: 2,
    next: null,
  },
  //     next: {
  //       value: 3,
  //       next: {
  //         value: 4,
  //         next: {
  //           value: 5,
  //           next: null,
  //         },
  //       },
  //     },
  //   },
};

console.log(removeNthFromEnd2(nodes, 1));
