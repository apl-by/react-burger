import { getMenu } from "../../support/utils";

describe("drag and drop of ingredients works correctly", function () {
  before(function () {
    cy.visit("http://localhost:3000");
    getMenu();
  });

  it("should open start page by default", function () {
    cy.contains("Соберите бургер");
  });

  it("should add ingredients to constructor with d&d", function () {
    cy.get("[data-cy='ingredient']").last().as("itemOne");
    cy.get("[data-cy='ingredient']").last().prev().as("itemTwo");
    cy.get("[data-cy='dropTargetSection']").as("dropTarget");

    cy.get("@itemOne").trigger("dragstart");
    cy.get("@dropTarget").trigger("drop");

    cy.get("@itemTwo").trigger("dragstart");
    cy.get("@dropTarget").trigger("drop");

    cy.get("[data-cy='dropTargetSection'] div ul")
      .children()
      .should("have.length", 2);
  });
});
