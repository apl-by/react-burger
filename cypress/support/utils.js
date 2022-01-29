/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const ingredientDataKeys = [
  "calories",
  "carbohydrates",
  "fat",
  "image",
  "image_large",
  "image_mobile",
  "name",
  "price",
  "proteins",
  "type",
  "_id",
];

export const getMenu = () => {
  cy.request("https://norma.nomoreparties.space/api/ingredients").then(
    (res) => {
      expect(res.body).to.have.property("success", true);
      expect(res.body.data).to.be.an("array").that.is.not.empty;
      expect(res.body.data[0])
        .to.be.an("object")
        .that.include.keys([...ingredientDataKeys]);
    }
  );
};
