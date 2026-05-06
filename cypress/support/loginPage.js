class LoginPage {
  visitPage() {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  }

  inputUsername(username) {
    if (username) {
      cy.get('[name="username"]').type(username);
    }
  }

  inputPassword(password) {
    if (password) {
      cy.get('[name="password"]').type(password);
    }
  }

  clickLogin() {
    cy.get('button[type="submit"]').click();
  }

  clickForgotPassword() {
    cy.contains('Forgot your password?').click();
  }

  // Assertions
  verifyDashboard() {
    cy.url().should('include', '/dashboard');
  }

  verifyAlertError(message) {
    cy.get('.oxd-alert').should('contain', message);
  }

  verifyInputError(count) {
    cy.get('.oxd-input-group__message')
      .should('have.length', count)
      .and('contain', 'Required');
  }

  verifyPasswordMasking() {
    cy.get('[name="password"]').should('have.attr', 'type', 'password');
  }

  verifyForgotPage() {
    cy.url().should('include', 'requestPasswordResetCode');
  }
}

export default new LoginPage();