import directoryPage from '../support/directoryPage';
import directoryData from '../fixtures/directoryData.json';

describe('OrangeHRM Directory - Full POM & Intercept Suite', () => {
    
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    cy.get('[name="username"]').type(directoryData.validUser.username);
    cy.get('[name="password"]').type(directoryData.validUser.password);

    cy.intercept('GET', '**/api/v2/directory/employees*').as('directoryLoad');
    
    cy.get('[type="submit"]').click();

    cy.get('a[href*="/directory/viewDirectory"]').click();

    cy.wait('@directoryLoad').its('response.statusCode').should('eq', 200);
  });

  it('TC_01 - Navigasi ke Menu Directory', () => {
    cy.get('.oxd-text--h6').should('contain', 'Directory');
  });

  it('TC_02 - Search berdasarkan Nama Karyawan', () => {
    directoryPage.searchEmployee(directoryData.search.keyword, directoryData.search.fullName)
      .its('response.statusCode').should('eq', 200);
    
    cy.get('.oxd-grid-item').should('contain', directoryData.search.keyword);
  });

  it('TC_03 - Filter berdasarkan Job Title', () => {
    directoryPage.filterByJobTitle(directoryData.filters.jobTitle)
      .its('response.statusCode').should('eq', 200);

    cy.get('.oxd-grid-item').should('be.visible');
  });

  it('TC_04 - Filter berdasarkan Lokasi', () => {
    cy.intercept('GET', '**/api/v2/directory/employees?*').as('filterLocation');

    cy.get('.oxd-select-text').eq(1).click();
    cy.contains(directoryData.filters.location).click();
    cy.get('button[type="submit"]').click();

    cy.wait('@filterLocation').its('response.statusCode').should('eq', 200);
    cy.get('.oxd-grid-item').should('contain', directoryData.filters.location);
  });

  it('TC_05 - Reset Filter Pencarian', () => {
    cy.get('button[type="reset"]').click();
    
    cy.get('.oxd-select-text').eq(0).should('contain', '-- Select --');
  });

  it('TC_06 - Klik Profil Peter dan Cek Info', () => {
    directoryPage.viewProfile(directoryData.search.keyword)
      .its('response.statusCode').should('eq', 200);

    cy.get('body').should('contain', directoryData.search.keyword);
  });

});