import { BasePage } from "../BasePage";

const ALL_CART_ITEM_NAMES = ".inventory_item_name";

export class CartPage extends BasePage {
  static verifyAddedItem() {
    cy.get("@addedItem").then((addedItem) => {
      cy.get(ALL_CART_ITEM_NAMES).should("have.text", addedItem);
    });
  }
}
