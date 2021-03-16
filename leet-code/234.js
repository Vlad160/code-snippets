const tree = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 2,
      next: {
        val: 1,
      },
    },
  },
};

var isPalindrome = function (head) {
  const stack = [];
  let node = head;
  while (node) {
    stack.push(node.val);
    node = node.next;
  }
  node = head;
  while (node) {
    if (node.val !== stack.pop()) {
      return false;
    }
    node = node.next;
  }
  return stack.length === 0;
};

console.log(isPalindrome(tree));
