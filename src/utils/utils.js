export const sortData = (data) => {
  return data.reduce(
    (prev, i) => {
      const clon = prev;
      i.type === "bun"
        ? clon[0].push(i)
        : i.type === "sauce"
        ? clon[1].push(i)
        : i.type === "main"
        ? clon[2].push(i)
        : void 0;

      return clon;
    },
    [[], [], []]
  );
};