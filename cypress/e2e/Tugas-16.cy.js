describe('Scenario Verifikasi Fungsi Login', () => {

  it('TC_01 - Login Berhasil', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary');
    
    cy.get('[type="submit"]').click();

    cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/dashboard');
  });

  it('TC_02 - Hanya Isi Username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('Admin');
    cy.get('[type="submit"]').click();
    
    // Hanya menggunakan assertion karena tidak men trigger API apapun
    cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required');
  });

  it('TC_03 - Hanya Isi Password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="password"]').type('admin123');
    cy.get('[type="submit"]').click();

    // Hanya menggunakan assertion karena tidak men trigger API apapun
    cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required');
  });

  it('TC_04 - Username & Password Kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[type="submit"]').click();
    
     // Hanya menggunakan assertion karena tidak men trigger API apapun
    cy.get('.oxd-input-group__message').should('have.length', 2).and('contain', 'Required');
  });

  it('TC_05 - Password Salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('salah123');

    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('salahPass');
    
    cy.get('[type="submit"]').click();

    cy.wait('@salahPass').its('response.statusCode').should('be.oneOf', [200, 302]);
    
    cy.get('.oxd-alert').should('be.visible').and('contain', 'Invalid credentials');
  });

  it('TC_06 - Username Salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('salahUsername');

    cy.get('[name="username"]').type('SalahUser');
    cy.get('[name="password"]').type('admin123');

    cy.get('[type="submit"]').click();

    cy.wait('@salahUsername').its('response.statusCode').should('be.oneOf', [200, 304]);
    cy.get('.oxd-alert').should('be.visible').and('contain', 'Invalid credentials');
  });

  it('TC_07 - Sensitivitas Huruf (Password)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('ADMIN123');
    cy.get('[type="submit"]').click();

    // Hanya menggunakan assertion karena tidak men trigger API apapun
    cy.get('.oxd-alert').should('be.visible').and('contain', 'Invalid credentials');
  });

  it('TC_08 - Masking Password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    cy.get('[name="password"]').should('have.attr', 'type', 'password');
  });

  it('TC_09 - Login via Tombol Enter', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index').as('enterAuth');
    
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123{enter}');

    cy.wait('@enterAuth').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/dashboard');
  });

  it('TC_10 - Navigasi Link Lupa Password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Intercept request navigasi
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('resetPassword');
    
    cy.contains('Forgot your password?').click();
    
    cy.wait('@resetPassword').its('response.statusCode').should('eq', 200);
    cy.url().should('include', 'requestPasswordResetCode');
  });

});