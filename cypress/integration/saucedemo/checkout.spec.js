import { ProductsPage } from "../../pageObjects/pages/ProductsPage";
import { CartPage } from "../../pageObjects/pages/CartPage";
import { LoginPage } from "../../pageObjects/pages/LoginPage";

describe("Checkout test cases", () => {
  it("Adding an item to the cart", () => {
    LoginPage.loginWithUI("standard_user");
    ProductsPage.addFirstItemToCart();
    ProductsPage.verifyRemoveButton();
    ProductsPage.goToCart();
    CartPage.verifyAddedItem();
    CartPage.goToCheckout();
    CartPage.inputUserData()
    CartPage.verifyAddedItem()
    CartPage.finishCheckoutAndVerifyMessage()
  });
});
