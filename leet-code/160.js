const own = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
    },
  },
};

const a = {
  val: 1,
  next: {
    val: 2,
    next: own,
  },
};

const b = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: own,
    },
  },
};

var getIntersectionNode = function (headA, headB) {
  let len1 = 0;
  let len2 = 0;
  let h = headA;

  while (h) {
    len1++;
    h = h.next;
  }
  h = headB;
  while (h) {
    len2++;
    h = h.next;
  }

  let diff = Math.abs(len1 - len2);

  let h2;
  if (len1 > len2) {
    h = headA;
    h2 = headB;
  } else {
    h = headB;
    h2 = headA;
  }

  while (diff > 0) {
    h = h.next;
    diff -= 1;
  }

  let c1 = h,
    c2 = h2;

  while (c1) {
    if (c1 === c2) {
      return c1;
    }
    c1 = c1.next;
    c2 = c2.next;
  }

  return null;
};

console.log(getIntersectionNode(a, b));
