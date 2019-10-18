describe("Authenticator:", function() {
  // Step 1: setup the application state
  beforeEach(function() {
    cy.visit("/");
  });

  describe("Sign In:", () => {
    it("allows a user to signin", () => {
      cy.get(selectors.usernameInput).type("rick.p.smit+TEST@gmail.com");
      cy.get(selectors.signInPasswordInput).type("test123456");
      cy.findByText("Login").click();

      cy.findByText("Home").should("exist");
    });
  });
});
export const selectors = {
  // Auth component classes
  usernameInput: '[data-test="username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]'
};
