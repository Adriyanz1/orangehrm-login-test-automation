describe('OrangeHRM Directory - Full Intercept Suite', () => {
    
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');

    cy.intercept('GET', '**/api/v2/directory/employees*').as('directory');
    
    cy.get('[type="submit"]').click();
    cy.get('a[href*="/directory/viewDirectory"]').click();

    cy.wait('@directory').its('response.statusCode').should('eq', 200);
  });

  it('TC_01 - Navigasi ke Menu Directory', () => {
    cy.get('.oxd-text--h6').should('contain', 'Directory');
  });

  it('TC_02 - Search berdasarkan Nama Karyawan', () => {
    cy.get('input[placeholder="Type for hints..."]').type('Peter');
    cy.contains('.oxd-autocomplete-option', 'Peter Mac Anderson', { timeout: 10000 }).click();
  
    cy.intercept('GET', '**/api/v2/directory/employees?*').as('searchResult');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@searchResult').its('response.statusCode').should('eq', 200);
    cy.get('.oxd-grid-item').should('contain', 'Peter');
  });

  it('TC_03 - Filter berdasarkan Job Title', () => {
    cy.intercept('GET', '**/api/v2/directory/employees?*').as('filterJob');

    cy.get('.oxd-select-text').eq(0).click();
    cy.contains('Account Assistant').click();
    cy.get('button[type="submit"]').click();

    cy.wait('@filterJob').its('response.statusCode').should('eq', 200);
    cy.get('.oxd-grid-item').should('be.visible');
  });

  it('TC_04 - Filter berdasarkan Lokasi', () => {
    cy.intercept('GET', '**/api/v2/directory/employees?*').as('filterLocation');

    cy.get('.oxd-select-text').eq(1).click();
    cy.contains('New York Sales Office').click();
    cy.get('button[type="submit"]').click();

    cy.wait('@filterLocation').its('response.statusCode').should('eq', 200);
    cy.get('.oxd-grid-item').should('contain', 'New York Sales Office');
  });

  it('TC_05 - Reset Filter Pencarian', () => {
    cy.get('button[type="reset"]').click();
    cy.get('.oxd-select-text').eq(0).should('contain', '-- Select --');
  });

  it('TC_06 - Klik Profil Peter dan Cek Info', () => {
      cy.intercept('GET', '**/api/v2/directory/employees/*').as('getDetail');
      cy.contains('.orangehrm-directory-card', 'Peter').click();

      cy.wait('@getDetail').its('response.statusCode').should('eq', 200);
      cy.get('body').should('contain', 'Peter');
    });

});