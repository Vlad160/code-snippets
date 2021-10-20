const fetch = require("node-fetch");

function doRequest() {
  return fetch("https://auth.esports-house.com/auth.php", {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
      Accept: "*/*",
      "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
    },
    referrer:
      "https://auth.esports-house.com/N8jUdSRs0Z/ng58od1vj0/kpu6lvklja?q=N8jUdSRs0Z&s=f1f2a7b840ed313fc274d357cc2849c0",
    body: `doAuth=1&login=${Math.random().toString(
      32
    )}&password=${Math.random().toString(32)}`,
    method: "POST",
    mode: "cors",
  });
}

async function makeRequest() {
  let res;
  try {
    res = await doRequest();
  } catch (e) {
    console.log(e);
    return;
  }
  if (!res.ok) {
    console.log(res.statusText);
    return;
  }
}

function wait(time = 100) {
  return new Promise((res) => {
    setTimeout(() => res(), time);
  });
}

async function main() {
  let seq = 0;
  const loop = (i) => {
    console.log(i);
    return makeRequest()
      .catch()
      .then(wait)
      .then(() => loop(seq++));
  };

  for (let i = 0; i < 1000; i++) {
    await wait();
    loop(seq++);
  }
}

main();
