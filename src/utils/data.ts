export const BASE_URL_API = "https://norma.nomoreparties.space/api";

export const BASE_URL_WS = "wss://norma.nomoreparties.space";

export const SECTION_TOP_MARGIN = 40;

export const menuSections = [
  { id: 0, section: "Булки", key: "bun" },
  { id: 1, section: "Соусы", key: "sauce" },
  { id: 2, section: "Начинки", key: "main" },
];

export const modalCardTemplate = [
  { id: 0, sign: "Калории, ккал", key: "calories" },
  { id: 1, sign: "Белки, г", key: "proteins" },
  { id: 2, sign: "Жиры, г", key: "fat" },
  { id: 3, sign: "Углеводы, г", key: "carbohydrates" },
];

export const dndTypes = {
  burgIngredient: "burgIngredient",
  ingrConstructor: "ingrConstructor",
};

export const cookiesSettings = {
  accessToken: {
    name: "accessToken",
    options: {
      "max-age": 604_800,
    },
  },
  refreshToken: {
    name: "refreshToken",
    options: {
      "max-age": 604_800,
    },
  },
};
