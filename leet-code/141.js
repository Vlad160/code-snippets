const cycle = {
  val: 3,
  next: {
    val: 2,
    next: {
      val: 0,
      next: {
        val: -4,
      },
    },
  },
};

cycle.next.next.next.next = cycle.next;

var hasCycle = function (head) {
  let first = head;
  let second = head;

  while (second != null && second.next != null) {
    first = first.next;
    second = second.next.next;
    if (first === second) {
      return true;
    }
  }
  return false;
};

console.log(hasCycle(cycle));
