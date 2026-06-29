describe("Login flow", () => {

    it("logs in successfully", () => {

        cy.visit("http://localhost:5173/");

        cy.get('input[name="email"]')
            .type("moderator1@gmail.com");

        cy.get('input[name="password"]')
            .type("Parola123!");

        cy.get("button[type='submit']")
            .click();

        cy.url()
            .should("include", "/dashboard");

        cy.contains("Welcome back");
    });

});