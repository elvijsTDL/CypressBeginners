describe("Showcasing specific things on other web pages", () => {
  it.skip("Showing a way to deal with elements that need hovering", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://automationpractice.com/index.php");
    cy.get(".product-container")
      .filter(":visible")
      .first()
      .trigger("mouseover");
    cy.get("[class*=add_to_cart_button]").should("be.visible");
  });

  it("Mocking requests with cypress to test error states of application", () => {
    cy.intercept("POST", "**protocol-v1-goerli", {
      statusCode: 400,
      body: {
        message: "Error loading the stream details",
      },
    });
    cy.visit(
      "https://app.superfluid.finance/streams/goerli/0x04c054715203c4c74d0a222c647106728971bbc357de456305fb4ee60a60c72d/26"
    );
    cy.contains("We are unable to fetch the stream details right now.").should(
      "be.visible"
    );
  });

  it.only("Dynamicly mocking Coingecko responses", () => {
    cy.fixture("currencies").then((fixture) => {
      cy.intercept("GET", "**markets**", (request) => {
        request.continue((response) => {
          response.body[0]["current_price"] =
            fixture.tokenValues[request.query["ids"]] *
            fixture.fiatValues[request.query["vs_currency"]].multiplier;
        });
      }).as("coingeckoRequest");
      cy.visit(
        "https://app.superfluid.finance/streams/goerli/0x04c054715203c4c74d0a222c647106728971bbc357de456305fb4ee60a60c72d/26"
      );
      let currencies = ["USD", "GBP", "EUR", "CNY"];
      currencies.forEach((currency) => {
        cy.get("[data-cy=fiat_currency]").click();
        cy.get("[data-cy=item-" + currency + "-multi]")
          .filter(":visible")
          .click();
        cy.wait("@coingeckoRequest");
        let flowRate = 9645061728395;
        let secondsPerMonth = 2592000;
        let result = (
          ((flowRate * secondsPerMonth) / 1e18) *
          fixture.fiatValues[currency].multiplier
        ).toFixed(2);
        cy.get("[data-cy=per_month]").should(
          "have.text",
          result + " " + currency
        );
      });
    });
  });
});
