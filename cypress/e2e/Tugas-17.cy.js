import LoginPage from '../support/loginPage';
import loginData from '../fixtures/loginData.json';

describe('Pengujian Fitur Login OrangeHRM Menggunakan POM', () => {

  it('TC_01 - Login Berhasil', () => {
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.validUser.username);
    LoginPage.inputPassword(loginData.validUser.password);
    LoginPage.clickLogin();
    LoginPage.verifyDashboard();
  });

  it('TC_02 - Hanya Isi Username', () => {
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.validUser.username);
    LoginPage.clickLogin();
    LoginPage.verifyInputError(1);
  });

  it('TC_03 - Hanya Isi Password', () => {
    LoginPage.visitPage();
    LoginPage.inputPassword(loginData.validUser.password);
    LoginPage.clickLogin();
    LoginPage.verifyInputError(1);
  });

  it('TC_04 - Username & Password Kosong', () => {
    LoginPage.visitPage();
    LoginPage.clickLogin();
    LoginPage.verifyInputError(2);
  });

  it('TC_05 - Password Salah', () => {
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.validUser.username);
    LoginPage.inputPassword(loginData.invalidUser.password);
    LoginPage.clickLogin();
    LoginPage.verifyAlertError(loginData.messages.invalidCredentials);
  });

  it('TC_06 - Username Salah', () => {
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.invalidUser.username);
    LoginPage.inputPassword(loginData.validUser.password);
    LoginPage.clickLogin();
    LoginPage.verifyAlertError(loginData.messages.invalidCredentials);
  });

  it('TC_07 - Sensitivitas Huruf (Password)', () => {
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.validUser.username);
    LoginPage.inputPassword(loginData.invalidUser.capsPassword);
    LoginPage.clickLogin();
    LoginPage.verifyAlertError(loginData.messages.invalidCredentials);
  });

  it('TC_08 - Masking Password', () => {
    LoginPage.visitPage();
    LoginPage.verifyPasswordMasking();
  });

  it('TC_09 - Login via Tombol Enter', () => {
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.validUser.username);
    // Menambahkan aksi khusus untuk Enter
    cy.get('[name="password"]').type(`${loginData.validUser.password}{enter}`);
    LoginPage.verifyDashboard();
  });

  it('TC_10 - Navigasi Link Lupa Password', () => {
    LoginPage.visitPage();
    LoginPage.clickForgotPassword();
    LoginPage.verifyForgotPage();
  });

});