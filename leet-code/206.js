const tree = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
      },
    },
  },
};

var reverseList = function (head) {
  let prev = null;
  let next = null;
  let curr = head;

  while (curr && curr.next) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  if (curr) {
    curr.next = prev;
  }

  return curr;
};

console.log(reverseList(tree));
