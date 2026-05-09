class DirectoryPage {
  searchEmployee(shortName, fullName) {
    cy.get('input[placeholder="Type for hints..."]').type(shortName);
    cy.contains('.oxd-autocomplete-option', fullName, { timeout: 10000 }).click();
    
    cy.intercept('GET', '**/api/v2/directory/employees?*').as('searchAction');
    cy.get('button[type="submit"]').click();
    return cy.wait('@searchAction');
  }

  filterByJobTitle(jobTitle) {
    cy.get('.oxd-select-text').eq(0).click();
    cy.contains('.oxd-select-option', jobTitle).click();
    
    cy.intercept('GET', '**/api/v2/directory/employees?*').as('filterJob');
    cy.get('button[type="submit"]').click();
    return cy.wait('@filterJob');
  }

  viewProfile(name) {
    cy.intercept('GET', '**/api/v2/directory/employees/*').as('getDetail');
    cy.contains('.orangehrm-directory-card', name).click();
    return cy.wait('@getDetail');
  }
}

export default new DirectoryPage();