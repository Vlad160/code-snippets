const tree = {
  val: 1,
  right: {
    val: 2,
    left: {
      val: 3,
    },
  },
};

// TODO: Revrite using stack
var inorderTraversal = function (root) {
  const lookup = [];

  function traverse(node) {
    if (!node) {
      return;
    }
    traverse(node.left);
    lookup.push(node.val);
    traverse(node.right);
  }

  traverse(root);
  return lookup;
};

console.log(inorderTraversal(tree));
