export function calculateExpression(text) {
  // const map = {
  //   plus: "+",
  //   minus: "-",
  //   times: "*",
  //   multiply: "*",
  //   divide: "/",
  // };

  // let expr = text.toLowerCase();

  // Object.keys(map).forEach((word) => {
  //   expr = expr.replaceAll(word, map[word]);
  // });

  try {
    return eval(text);
  } catch {
    return "Error";
  }
}