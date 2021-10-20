const { resolve } = require("node:path");

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

function check(timeout = 1000, attempts = 10) {
  let res, rej;

  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  function checkWootric(attempt) {
    const wootricScore = document.getElementById("wootric-score");

    if (!wootricScore) {
      if (attempt === 0) {
        return rej("No wootric");
      }
      setTimeout(checkWootric, timeout, attempt - 1);
    } else {
      res(wootricScore);
    }
  }
  checkWootric(attempts);

  return promise;
}
