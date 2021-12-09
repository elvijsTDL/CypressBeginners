import { BasePage } from "../BasePage";

const ALL_PRODUCT_NAMES = ".inventory_item_name";
const ALL_ADD_TO_CART_BUTTONS = "[data-test|=add-to-cart]";
const ALL_ADD_AND_REMOVE_BUTTONS = ".inventory_item_price + button";
const CART_BUTTON = ".shopping_cart_link";
const SORTING_DROPDOWN = "[data-test=product_sort_container]";
const ALL_PRODUCT_PRICES = ".inventory_item_price";

export class ProductsPage extends BasePage {
  static verifyUserLoggedIn() {
    this.isVisible(ALL_PRODUCT_NAMES);
  }

  static sortItemsBy(option) {
    cy.get(SORTING_DROPDOWN).select(option);
  }

  static verifyLowToHighPrices() {
    let priceArray = [];
    cy.get(ALL_PRODUCT_PRICES).each((product) => {
      priceArray.push(product.text().replace("$", ""));
    });
    cy.wrap(priceArray).then((array) => {
      let expectedArray = [...array].sort((a, b) => a - b);
      expect(array).to.deep.eq(expectedArray);
    });
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

  static verifyRemoveButton() {
    cy.get(ALL_ADD_AND_REMOVE_BUTTONS)
      .first()
      .should("have.text", "Remove")
      .and("have.css", "color", "rgb(71, 76, 85)");
  }
}
