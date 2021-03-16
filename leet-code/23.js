var mergeKLists = function (lists) {
  while (true) {
    let min = Infinity;
    let mins = [];
    for (let i = 0; i < lists.length; i++) {
      const v = lists[i].value;
      if (v < min) {
        min = v;
        mins = [];
        mins.push(i);
      } else if (v === min) {
        mins.push(i);
      }
    }
    for (const list of mins) {
      while (list.value === min) {
          
      }
    }
  }
};
