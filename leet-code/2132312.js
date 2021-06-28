let x = 1;
let y;
let z = "right";
let times = setInterval(move, 2);
let i = 0;
function move() {
  console.log(x);
  i++;
  if (i === 25) {
    clearInterval(times);
  }
  if (x === 5) {
    z = "left";
  } else if (x === 0) {
    z = "right";
  }

  if (z == "left") {
    x--;
    y = 50 * Math.sin(x * 0.005);
  } else {
    x++;
    y = 50 * Math.sin(x * 0.005);
  }
}
