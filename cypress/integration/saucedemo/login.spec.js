import { LoginPage } from "../../pageObjects/pages/LoginPage";
import { ProductsPage } from "../../pageObjects/pages/ProductsPage";

describe("Login test cases", () => {
  it("Logging in with a standard user", () => {
    LoginPage.loginWithUI("standard_user");
    ProductsPage.verifyUserLoggedIn();
  });
});
