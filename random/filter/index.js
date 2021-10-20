const array = [
  {
    name: "John",
    isValue: true,
    arrayV: ["Dota"],
  },
  {
    name: "Johnny",
    isValue: false,
    arrayV: ["Cs:go"],
  },
  {
    name: "Mike",
    isValue: true,
    arrayV: ["Cs:go", "Minecraft"],
  },
];

const schema = {
  name: fString,
  isValue: fBoolean,
  arrayV: fArray(fString),
};

function fString(search, value) {
  return value.toLowerCase().includes(search);
}

function fBoolean(search, value) {
  const positive = ["yes", "true"];
  const negative = ["no", "false"];
  if (value) {
    return positive.some((p) => p.includes(search));
  } else {
    return negative.some((p) => p.includes(search));
  }
}

function fArray(schema) {
  return (search, value) => {
    return value.filter((v) => {
      if (typeof schema === "object") {
        for (const [key, fn] of Object.entries(schema)) {
          const included = fn(search.toLowerCase(), v[key]);
          return included;
        }
      } else {
        const fn = schema;
        return fn(search, v);
      }
    });
  };
}

function filter(schema, array, search) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const v = array[i];
    for (const [key, fn] of Object.entries(schema)) {
      const included = fn(search.toLowerCase(), v[key]);
      if (Array.isArray(included)) {
        if (included.length) {
          result.push({ ...v, [key]: included });
          break;
        }
        continue;
      }
      if (included) {
        result.push({ included });
        break;
      }
    }
  }
  return result;
}

const filtered = filter(schema, array, "Cs:go");

console.log(filtered);
