// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import addContext from "mochawesome/addContext";

Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed") {
    const screenshot = `assets/screenshots/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
    addContext({ test }, screenshot);
    addContext(
      { test },
      { title: "Time of execution:", value: "dsfgdfsgdsfgdsfg" }
    );
  }
});

Cypress.on("uncaught:exception", (err, runnable) => {
  //To handle specific errors , you can check the error message and handle them as needed
  //   if(err.message.includes("Warning")) {
  return false;
  //    }
  // returning false here prevents Cypress from
  // failing the test case if the application throws an error
});
