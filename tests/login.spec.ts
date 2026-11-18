import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../data/loginData.json';
import testIds from '../data/testIds.json';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  for (const username of loginData.successUsers) {
    test(`${username} can log in and log out successfully`, async ({ page }) => {
      await loginPage.login(username, loginData.password);
      const timeout = loginData.timeouts.slowLogin;
      await expect(page).toHaveURL(new RegExp(loginData.inventoryUrlPattern), { timeout });
      await expect(page.getByTestId(testIds.inventory.title)).toHaveText(loginData.inventoryTitle, { timeout });

      await loginPage.logout();
    });
  }

  test('locked_out_user cannot log in', async ({ page }) => {
    const { username, error } = loginData.lockedUser;
    await loginPage.login(username, loginData.password);
    await expect(page).toHaveURL(loginData.baseUrl);
    await expect(page.getByTestId(testIds.login.error)).toContainText(error);
  });

  test('invalid password shows error', async ({ page }) => {
    const { username, password, error } = loginData.invalidLogin;
    await loginPage.login(username, password);
    await expect(page.getByTestId(testIds.login.error)).toContainText(error);
  });
});
