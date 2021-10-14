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

 export const setCardsList = (title, array) => {
   return title === "Булки"
     ? array[0]
     : title === "Соусы"
     ? array[1]
     : title === "Начинки"
     ? array[2]
     : [];
 };