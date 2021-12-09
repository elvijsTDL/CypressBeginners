function fizzBuzz(number) {
  if (number % 3 === 0 && number % 5 === 0) {
    return "fizzbuzz";
  }
  if (number % 3 === 0) {
    return "fizz";
  }
  if (number % 5 === 0) {
    return "buzz";
  }
  return "Not a multiple of 3 or 5";
}

function validateFizzBuzz(array, expected) {
  array.forEach((number) => {
    expect(fizzBuzz(number)).to.eq(expected);
  });
}

describe.skip("Fizz buzz unit test cases", () => {
  //Mocha hooks
  before(() => {
    cy.log("Running only once before the test case");
  });

  beforeEach(() => {
    cy.log("Running before each test case");
  });

  after(() => {
    cy.log("Runs after the test cases");
  });

  afterEach(() => {
    cy.log("Runs after each of the test case");
  });

  it("Returns fizz if number is a multiple of 3", () => {
    validateFizzBuzz([3, 6, 9, 12], "fizz");
  });

  it("Returns buzz if number is a multiple of 5", () => {
    validateFizzBuzz([5, 10, 20, 25], "buzz");
  });

  it("Returns fizzbuzz if number is a multiple of 5 and 3", () => {
    validateFizzBuzz([15, 30, 45, 60], "fizzbuzz");
  });
});

describe("Day 1 example of E2E tests", () => {
  //Logging into a web page
  it("Logging in with a standart user", () => {
    cy.visit("/");
    //2nd to best way of writing unique selectors, ids should be unique per page
    //And they are usually not changed often
    cy.get("#user-name").type("standard_user");
    //Best way to find elements with, added by QAs , will never change unless somebody hates you
    cy.get("[data-test=password]").type("secret_sauce");
    //Class name, not the best approach , suspectable to change quite frequently
    cy.get(".submit-button").click();
    cy.getCookie("session-username").then((cookie) => {
      expect(cookie.value).to.eq("standard_user");
    });
    cy.get(".inventory_item").should("be.visible");
  });

  it("Logging in with a locked user", () => {
    cy.visit("/");
    cy.get("#user-name").type("locked_out_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get(".submit-button").click();
    cy.get("[data-test=error]").should(
      "have.text",
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  it("Missing username error in login page", () => {
    cy.visit("/");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get(".submit-button").click();
    cy.get("[data-test=error]").should(
      "have.text",
      "Epic sadface: Username is required"
    );
  });

  it("Missing password error in login page", () => {
    cy.visit("/");
    cy.get("#user-name").type("locked_out_user");
    cy.get(".submit-button").click();
    cy.get("[data-test=error]").should(
      "have.text",
      "Epic sadface: Password is required"
    );
  });

  it("Invalid user error in login page", () => {
    cy.visit("/");
    cy.get("#user-name").type("locked_oudsfgdsfgdsfgt_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get(".submit-button").click();
    cy.get("[data-test=error]").should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Starting the test case without logging in with UI", () => {
    cy.setCookie("session-username", "standard_user");
    cy.visit("/inventory.html", {
      failOnStatusCode: false,
    });
  });

  it.only("Showcasing cypress commands", () => {
    cy.login("standard_user");
  });
});
