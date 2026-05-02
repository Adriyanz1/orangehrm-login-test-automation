describe('Pengujian Fitur Login OrangeHRM', () => {
  
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  it('TC_01 - Login Berhasil', () => {
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    // Validasi: Berhasil masuk ke halaman dashboard
    cy.url().should('include', '/dashboard');
  });

  it('TC_02 - Hanya Isi Username', () => {
    cy.get('[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();
    // Validasi: Muncul pesan Required di bawah kolom password
    cy.get('.oxd-input-group__message').should('contain', 'Required');
  });

  it('TC_03 - Hanya Isi Password', () => {
    cy.get('[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    // Validasi: Muncul pesan Required di bawah kolom username
    cy.get('.oxd-input-group__message').should('contain', 'Required');
  });

  it('TC_04 - Username & Password Kosong', () => {
    cy.get('button[type="submit"]').click();
    // Validasi: Muncul pesan Required pada kedua kolom
    cy.get('.oxd-input-group__message').should('have.length', 2).and('contain', 'Required');
  });

  it('TC_05 - Password Salah', () => {
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('123');
    cy.get('button[type="submit"]').click();
    // Validasi: Pesan error "Invalid credentials"
    cy.get('.oxd-alert').should('contain', 'Invalid credentials');
  });

  it('TC_06 - Username Salah', () => {
    cy.get('[name="username"]').type('User');
    cy.get('[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert').should('contain', 'Invalid credentials');
  });

  it('TC_07 - Sensitivitas Huruf (Password)', () => {
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('ADMIN123'); // Menggunakan huruf kapital
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert').should('contain', 'Invalid credentials');
  });

  it('TC_08 - Masking Password', () => {
    // Validasi: Atribut tipe input harus 'password' agar karakter disamarkan
    cy.get('[name="password"]').should('have.attr', 'type', 'password');
  });

  it('TC_09 - Login via Tombol Enter', () => {
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123{enter}'); // Menekan enter
    cy.url().should('include', '/dashboard');
  });

  it('TC_10 - Navigasi Link Lupa Password', () => {
    cy.contains('Forgot your password?').click();
    // Validasi: Diarahkan ke halaman requestPasswordResetCode
    cy.url().should('include', 'requestPasswordResetCode');
  });

});