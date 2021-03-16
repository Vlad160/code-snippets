var isBalanced = function (root) {
  return getHeigth(root) !== null;
};

const getHeigth = (node) => {
  if (!node) {
    return 0;
  }
  const left = getHeigth(node.left);

  if (left === null) {
    return null;
  }

  const right = getHeigth(node.right);

  if (right === null) {
    return null;
  }
  if (Math.abs(right - left) > 1) {
    return null;
  }

  return Math.max(left, right) + 1;
};

const node = {
  value: 3,
  left: {
    value: 9,
  },
  right: {
    value: 20,
    left: {
      value: 15,
    },
    right: {
      value: 7,
    },
  },
};

const node2 = {
  value: 1,
  left: {
    value: 9,
    left: {
      value: 2,
      right: {
        value: 3,
      },
      left: {
        value: 3,
        right: {
          value: 4,
        },
        left: {
          value: 4,
        },
      },
    },
  },
  right: {
    value: 2,
  },
};

console.log(isBalanced(node2));
