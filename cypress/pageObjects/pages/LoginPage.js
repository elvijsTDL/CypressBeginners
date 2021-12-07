import { BasePage } from "../BasePage";

const USERNAME_FIELD = "#user-name";
const PASSWORD_FIELD = "[data-test=password]";
const SUBMIT_LOGIN_BUTTON = ".submit-button";
const LOGIN_ERROR = "[data-test=error]";

export class LoginPage extends BasePage {
  static loginWithUI(username) {
    cy.visit("https://www.saucedemo.com");
    this.type(USERNAME_FIELD, username);
    this.type(PASSWORD_FIELD, "secret_sauce");
    this.click(SUBMIT_LOGIN_BUTTON);
  }
}
