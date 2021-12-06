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
    cy.visit("https://www.saucedemo.com/");
    //2nd to best way of writing unique selectors, ids should be unique per page
    //And they are usually not changed often
    cy.get("#user-name").type("standard_user");
    //Best way to find elements with, added by QAs , will never change unless somebody hates you
    cy.get("[data-test=password]").type("secret_sauce");
    //Class name, not the best approach , suspectable to change quite frequently
    cy.get(".submit-button").click();
    cy.get(".inventory_item").should("be.visible");
  });
});
