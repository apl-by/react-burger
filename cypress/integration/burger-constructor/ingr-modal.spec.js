import { getMenu } from "../../support/utils";

describe("ingredient pop-up works correctly", function () {
  before(function () {
    cy.visit("http://localhost:3000");
    getMenu();
  });

  it("should open start page by default", function () {
    cy.contains("Соберите бургер");
  });

  it("should open the ingredient pop-up (after click) & close it(after press Esc)", function () {
    cy.get("[data-cy='ingredient']").first().click();
    cy.contains("Детали ингредиента");
    cy.get("body").type("{esc}");
    cy.contains("Детали ингредиента").should("not.exist");
  });

  it("should open the ingredient pop-up (after click) & close it(after click outside pop-up)", function () {
    cy.get("[data-cy='ingredient']").last().click();
    cy.contains("Детали ингредиента");
    cy.get("body").click(0, 0);
    cy.contains("Детали ингредиента").should("not.exist");
  });

  it("should open the ingredient pop-up (after click) & close it(after click on close button)", function () {
    cy.get("[data-cy='ingredient']").first().click();
    cy.contains("Детали ингредиента");
    cy.get("[data-cy='modalCloseBtnParent']").children().last().click();
    cy.contains("Детали ингредиента").should("not.exist");
  });
});
