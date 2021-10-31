export const sortData = (data) => {
  return data.reduce(
    (prev, i) => {
      i.type === "bun"
        ? prev.bun.push(i)
        : i.type === "sauce"
        ? prev.sauce.push(i)
        : i.type === "main"
        ? prev.main.push(i)
        : void 0;

      return prev;
    },
    { bun: [], sauce: [], main: [] }
  );
};

export const setOrderRequestBody = (order) => {
  const body = { ingredients: [] };
  order.bun ? body.ingredients.push(order.bun._id) : void 0;
  order.ingredients.length
    ? body.ingredients.push(...order.ingredients.map((i) => i._id))
    : void 0;
  return body;
};

export const setTotalPrice = (bun, ingrArr) => {
  const ingrSum = ingrArr.reduce((prev, i) => prev + i.price, 0);
  return bun ? (bun.price * 2) + ingrSum : ingrSum;
}
