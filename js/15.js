/**
 * JSON stringify parse
 */
const json = {
  name: "jack",
  age: 18,
  dataList: [
    {
      value: 1,
    },
  ],
  date: new Date(),
  reg: /\d+/,
};
// console.log(JSON.stringify(json))
// console.log(JSON.stringify(json, ['name', 'age']))
// console.log(JSON.stringify(json, ['name', 'age', 'reg'], 4))
const str = JSON.stringify(
  json,
  (key, value) => {
    switch (key) {
      case "reg":
        return [value.source, value.ignoreCase ?
                'i':'', value.global?'g':''];
      default:
        return value;
    }
  },
  4
);
// console.log(str);
console.log(
  JSON.parse(str, (key, value) => {
    switch (key) {
      case "reg":
        return new RegExp(value[0], value.slice(1).join(''));
      case "date":
        return new Date(value);
      default:
        return value;
    }
  })
);
