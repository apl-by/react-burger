//Реализация логики суммирования при добавлении сразу всех элементов.
// При реализации drag&drop логика будет другая
export const orderReducer = (state, action) => {
  switch (action.type) {
    case "bun":
      return state + action.bun.price * 2;
    case "ingredients":
      return state + action.ingredients.reduce((prev, i) => prev + i.price, 0);
    default:
      return null;
  }
};
