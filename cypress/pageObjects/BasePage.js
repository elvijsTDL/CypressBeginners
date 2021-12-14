export class BasePage {
  static click(selector) {
    cy.get(selector).filter(":visible").click();
  }

  static type(selector, text) {
    cy.get(selector).type(text);
  }

  static isVisible(selector) {
    cy.get(selector).should("be.visible");
  }

  static hasText(selector, text) {
    cy.get(selector).should("have.text", text);
  }

  static isNotVisible(selector) {
    cy.get(selector).should("not.be.visible");
  }
}
