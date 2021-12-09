import { ProductsPage } from "../../pageObjects/pages/ProductsPage";
import { CartPage } from "../../pageObjects/pages/CartPage";
import { LoginPage } from "../../pageObjects/pages/LoginPage";

describe("Checkout test cases", () => {
  // after(() => {
  //   cy.request(
  //     "POST",
  //     "https://discord.com/api/webhooks/918538184688799805/Huge8PC2uV0Z-oSm_vdnDNvaw85ppCYm4yeD-gxCW4J88Jei9OkGLHzr9vCscCtnV767",
  //     {
  //       content: "Test run has finished running, please check the report",
  //       username: "Testing bot 123",
  //     }
  //   );
  // });

  it("Adding an item to the cart", () => {
    LoginPage.loginWithUI("normal_user");
    ProductsPage.addFirstItemToCart();
    ProductsPage.verifyRemoveButton();
    ProductsPage.goToCart();
    CartPage.verifyAddedItem();
    CartPage.goToCheckout();
    CartPage.inputUserData();
    CartPage.verifyAddedItem();
    CartPage.finishCheckoutAndVerifyMessage();
  });
});
