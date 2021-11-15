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

export const setOrderRequestBody = (order) => ({
  ingredients: [...order.map((i) => i._id)],
});

export const setTotalPrice = (bun, ingrArr) => {
  const ingrSum = ingrArr.reduce((prev, i) => prev + i.price, 0);
  return bun ? bun.price * 2 + ingrSum : ingrSum;
};

export const generateId = () => Math.random().toString(36).substr(2, 12);

export const findEmptyInput = (data) => Object.values(data).some(i => i === "");

export const findErrorInput = (data) => Object.values(data).some(i => i);
