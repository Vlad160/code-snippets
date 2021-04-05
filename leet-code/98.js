const tree = {
  val: 5,
  left: {
    val: 4,
  },
  right: {
    val: 6,
    left: {
      val: 3,
    },
    right: {
      val: 7,
    },
  },
};

var isValidBST = function (root) {
  const check = (node, min = -Infinity, max = Infinity) => {
    if (!node) {
      return true;
    }

    if (node.val > min && node.val < max) {
      return (
        check(node.left, min, node.val) && check(node.right, node.val, max)
      );
    }
    return false;
  };
  return check(root);
};

console.log(isValidBST(tree));
