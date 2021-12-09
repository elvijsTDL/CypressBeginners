// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username) => {
  cy.visit("/");
  cy.get("#user-name").type(username);
  cy.get("[data-test=password]").type("secret_sauce");
  cy.get(".submit-button").click();
  cy.getCookie("session-username").then((cookie) => {
    expect(cookie.value).to.eq("standard_user");
  });
  cy.get(".inventory_item").should("be.visible");
});

Cypress.Commands.add("setLoginCookiesAndLogin", (username) => {
  cy.setCookie("session-username", username);
  cy.visit("/inventory.html", {
    failOnStatusCode: false,
  });
});
