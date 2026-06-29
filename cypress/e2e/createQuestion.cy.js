describe("Create question flow", () => {

    it("logs in and creates a question", () => {

        cy.visit("http://localhost:5173/");

        cy.get('input[name="email"]')
            .type("moderator1@gmail.com");

        cy.get('input[name="password"]')
            .type("Parola123!");

        cy.contains("button", "Login")
            .click();

        cy.url()
            .should("include", "/dashboard");

        cy.visit("http://localhost:5173/questions/create");

        cy.contains("label", "Title")
            .parent()
            .find("input")
            .type("Cypress Question");

        cy.contains("label", "Text")
            .parent()
            .find("textarea")
            .type("Created automatically by Cypress.");

        cy.contains("button", "Submit")
            .click();

        cy.url()
            .should("include", "/questions");

        cy.contains("Cypress Question");
    });

});