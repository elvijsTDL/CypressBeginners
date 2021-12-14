import { LoginPage } from "../../pageObjects/pages/LoginPage";
import { ProductsPage } from "../../pageObjects/pages/ProductsPage";

describe("Products page test cases", () => {
  beforeEach(() => {});

  it.skip("Sorting items by price - low to high", () => {
    LoginPage.loginWithUI();
    ProductsPage.sortItemsBy("lohi");
    ProductsPage.verifyLowToHighPrices();
  });

  it.skip("Showing 1080p viewport", () => {
    cy.viewport(1920, 1080);
    LoginPage.loginWithUI();
    cy.wait(5000);
  });

  it.skip("Mobile viewport scrolling showcase", () => {
    cy.viewport("iphone-6");
    LoginPage.loginWithUI();
    ProductsPage.verifyScrolling();
  });
});
