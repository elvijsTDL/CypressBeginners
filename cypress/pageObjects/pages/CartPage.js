import { BasePage } from "../BasePage";

const ALL_CART_ITEM_NAMES = ".inventory_item_name";
const CHECKOUT_BUTTON = "[data-test=checkout]";
const NAME_FIELD = "#first-name";
const SURNAME_FIELD = "#last-name";
const ZIP_CODE_FIELD = "#postal-code";
const CONTINUE_BUTTON = "[data-test=continue]";
const FINISH_BUTTON = "[data-test=finish]";
const CHECKOUT_THANK_YOU_MESSAGE = ".complete-header";
const ALL_REMOVE_BUTTONS = "[data-test*=remove]"

export class CartPage extends BasePage {
  static verifyAddedItem() {
    cy.get("@addedItem").then((addedItem) => {
      cy.get(ALL_CART_ITEM_NAMES).first().should("have.text", addedItem);
    });
  }

  static goToCheckout() {
    this.click(CHECKOUT_BUTTON);
  }

  static inputUserData(user) {
    cy.fixture("testingUsers.json").then((fixture)=>{
      this.type(NAME_FIELD, fixture[user].name);
      this.type(SURNAME_FIELD, fixture[user].surname);
      this.type(ZIP_CODE_FIELD, fixture[user].postalCode);
    })
    this.click(CONTINUE_BUTTON);
  }

  static finishCheckoutAndVerifyMessage() {
    this.click(FINISH_BUTTON);
    this.hasText(CHECKOUT_THANK_YOU_MESSAGE, "THANK YOU FOR YOUR ORDER");
  }

  static openCartPage() {
    cy.visit("/cart.html" , {failOnStatusCode: false})
  }

  static removeAllCartItems() {
    cy.get(ALL_REMOVE_BUTTONS).click({multiple:true})
  }

  static verifyEmptyCart(){
    cy.get(ALL_CART_ITEM_NAMES).should("not.exist")
  }
}
