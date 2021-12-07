import { BasePage } from "../BasePage";

const ALL_PRODUCT_NAMES = ".inventory_item_name";
const ALL_ADD_TO_CART_BUTTONS = "[data-test|=add-to-cart]";
const CART_BUTTON = ".shopping_cart_link";

export class ProductsPage extends BasePage {
  static verifyUserLoggedIn() {
    this.isVisible(ALL_PRODUCT_NAMES);
  }

  static goToCart() {
    this.click(CART_BUTTON);
  }

  static addFirstItemToCart() {
    cy.get(ALL_ADD_TO_CART_BUTTONS).first().click();
    cy.get(ALL_PRODUCT_NAMES)
      .first()
      .then((element) => {
        cy.wrap(element.text()).as("addedItem");
      });
  }
}
