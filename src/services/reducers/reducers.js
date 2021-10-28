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
// ---------------------------------------------------------
const initialMenu = {
  menu: [],
  menuRequest: false,
  menuFailed: false,
};

const initialConstructor = {
  ingredients: [],
  bun: null,
  empty: true,
};

const initialIngrDetails = {
  ingredient: {},
  isModalOpen: false,
};

const initialOrderDetails = {
  isModalOpen: false,
  orderList: [],
  orderRes: {},
  orderRequest: false,
  orderFailed: false,
};

export const menu = (state = initialMenu, action) => {
  console.log(state);
  switch (action.type) {
    case "MENU_REQUEST":
      return {
        ...state,
        menuRequest: true,
        menuFailed: false,
      };
    case "MENU_SUCCESS":
      return {
        ...state,
        menuRequest: false,
        menu: action.payload.menu,
      };
    case "MENU_ERROR":
      return {
        ...initialMenu,
        menuFailed: true,
      };
    default:
      return state;
  }
};

export const burgConstructor = (state = initialConstructor, action) => {
  switch (action.type) {
    case "ADD_BUN":
      return {
        ...state,
        bun: action.payload.bun,
        empty: false,
      };
    case "REMOVE_BUN":
      return {
        ...state,
        bun: null,
        empty: !state.ingredients.length,
      };
    case "ADD_INGREDIENT":
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload.ingredient],
        empty: false,
      };
    case "REMOVE_INGREDIENT": {
      const newList = state.orderList.filter(
        (i) => i.id !== action.payload.ingredient.id
      );
      return {
        ...state,
        orderList: [...newList],
        empty: !newList.length && !state.bun,
      };
    }
    case "CLEAR_CONSTRUCTOR":
      return initialConstructor;
    default:
      return state;
  }
};

export const ingrDetails = (state = initialIngrDetails, action) => {
  switch (action.type) {
    case "SHOW_INGR_DETAILS":
      return {
        ...state,
        ingredient: { ...action.payload.ingredient },
        isModalOpen: true,
      };
    case "CLOSE_INGR_DETAILS":
      return initialIngrDetails;
    default:
      return state;
  }
};

export const orderDetails = (state = initialOrderDetails, action) => {
  switch (action.type) {
    case "ORDER_REQUEST":
      return {
        ...initialOrderDetails,
        orderList: [...action.payload.order],
        orderRequest: true,
        orderFailed: false,
      };
    case "ORDER_SUCCESS":
      return {
        ...state,
        isModalOpen: true,
        orderRequest: false,
        orderRes: { ...action.payload.res },
      };
    case "ORDER_ERROR":
      return {
        ...initialOrderDetails,
        orderFailed: true,
      };
    case "CLOSE_ORDER_DETAILS":
      return {
        isModalOpen: false,
      };
    default:
      return state;
  }
};


