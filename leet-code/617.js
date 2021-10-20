function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

const tree1 = {
  val: 1,
  left: {
    val: 3,
    left: {
      val: 5,
    },
  },
  right: {
    val: 2,
  },
};

const tree2 = {
  val: 2,
  left: {
    val: 1,
    right: {
      val: 4,
    },
  },
  right: {
    val: 3,
    right: {
      val: 7,
    },
  },
};

var mergeTrees = function (root1, root2) {
  function merge(node1, node2) {
    if (node1 == null) {
      return node2;
    }

    if (node2 == null) {
      return node1;
    }

    const node = new TreeNode(node1.val + node2.val);

    node.left = merge(node1.left, node2.left);
    node.right = merge(node1.right, node2.right);
    return node;
  }

  return merge(root1, root2);
};

console.log(JSON.stringify(mergeTrees(tree1, tree2), undefined, 4));
