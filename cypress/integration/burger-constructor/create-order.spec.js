/* eslint-disable jest/valid-expect */
/* eslint-disable no-unused-expressions */
/* eslint-disable jest/valid-expect-in-promise */
import { getMenu } from "../../support/utils";
import fixture from "../../fixtures/orderRes.json";

describe("making an order works correctly", function () {
  before(function () {
    cy.visit("http://localhost:3000");
    getMenu();
  });

  it("should open start page by default", function () {
    cy.contains("Соберите бургер");
  });

  it("should add ingredients to constructor without bun", function () {
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
    cy.contains("Оформить заказ");
  });

  it("should redirect to the login page if there is no authorization", function () {
    cy.get("button").contains("Оформить заказ").click();

    cy.contains("Вход");
  });

  it("should redirect to the previous page after login", function () {
    cy.get("input").first().type("test@test.by");
    cy.get("input").last().type("123456");

    cy.get("button").contains("Войти").click();

    cy.request("POST", "https://norma.nomoreparties.space/api/auth/login", {
      email: "test@test.by",
      password: "123456",
    }).then((res) => {
      expect(res.body).to.have.property("success", true);
      expect(res.body).include.keys(["accessToken", "refreshToken", "user"]);
    });

    cy.contains("Соберите бургер");
  });

  it("should appear the alert if there is no bun in the constructor after the submission order", function () {
    cy.get("button").contains("Оформить заказ").click();

    cy.contains("Кажется, вы забыли булку...");
  });

  it("should close alert after click on close button", function () {
    cy.get("[data-cy='modalCloseBtnParent']").children().last().click();

    cy.contains("Кажется, вы забыли булку...").should("not.exist");
  });

  it("should add a bun to the order", function () {
    cy.get("[data-cy='ingredient']").first().as("itemThree");
    cy.get("[data-cy='dropTargetSection']").as("dropTarget");

    cy.get("@itemThree").trigger("dragstart");
    cy.get("@dropTarget").trigger("drop");

    cy.contains("верх");
    cy.contains("низ");
  });

  it("should appear the pop-up with information about order after the submission order", function () {
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "orderRes.json",
    }).as("postOrder");

    cy.get("button").contains("Оформить заказ").click();

    cy.wait("@postOrder").then((interception) => {
      const body = interception.response.body;
      expect(body.order.number).equal(fixture.order.number);
    });

    cy.contains("идентификатор заказа");
    cy.contains(fixture.order.number);
  });

  it("should close the pop-up after click on close button", function () {
    cy.get("[data-cy='modalCloseBtnParent']").children().last().click();
    cy.contains(fixture.order.number).should("not.exist");
  });
});
