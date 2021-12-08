import { BasePage } from "../BasePage";

const ALL_CART_ITEM_NAMES = ".inventory_item_name";
const CHECKOUT_BUTTON = "[data-test=checkout]"
const NAME_FIELD = "#first-name"
const SURNAME_FIELD = "#last-name"
const ZIP_CODE_FIELD = "#postal-code"
const CONTINUE_BUTTON = "[data-test=continue]"
const FINISH_BUTTON = "[data-test=finish]"
const CHECKOUT_THANK_YOU_MESSAGE = ".complete-header"


export class CartPage extends BasePage {
  static verifyAddedItem() {
    cy.get("@addedItem").then((addedItem) => {
      cy.get(ALL_CART_ITEM_NAMES).should("have.text", addedItem);
    });
  }

  static goToCheckout(){
    this.click(CHECKOUT_BUTTON)
  }

  static inputUserData(){
    this.type(NAME_FIELD,"Tester")
    this.type(SURNAME_FIELD,"Testererere")
    this.type(ZIP_CODE_FIELD,"LV1111")
    this.click(CONTINUE_BUTTON)
  }

  static finishCheckoutAndVerifyMessage(){
    this.click(FINISH_BUTTON)
    this.hasText(CHECKOUT_THANK_YOU_MESSAGE,"THANK YOU FOR YOUR ORDER")
  }

}
