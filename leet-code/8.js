var myAtoi = function (s) {
  let i = 0;
  let n = 0;
  let isMinus = false;

  const sw = () => {
    let char = "";
    while ((char = s[i]) === " ") {
      i++;
    }
  };
  const sign = () => {
    let char = s[i];
    if (char === "-") {
      isMinus = true;
      i++;
    }
  };
  const nums = () => {
    while (true) {
      let char = s[i];
      if (!char) {
        break;
      }
      if (char.charCodeAt(0) < 48 || char.charCodeAt(0) > 60) {
        break;
      }
      n = n * 10 + parseInt(char);
      i++;
    }
  };

  sw();
  sign();
  nums();

  return isMinus ? -n : n;
};

console.log(myAtoi("4193 with words"));
