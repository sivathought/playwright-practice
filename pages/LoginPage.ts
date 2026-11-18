import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import testIds from '../data/testIds.json';
import loginData from '../data/loginData.json';
import { WebActions } from '../utils/WebActions';

export class LoginPage {
  private readonly actions: WebActions;

  constructor(private readonly page: Page) {
    this.actions = new WebActions(page);
  }

  async open(): Promise<void> {
    await this.page.goto(loginData.baseUrl);
  }

  async isLoggedIn(): Promise<boolean> {
    return new RegExp(loginData.inventoryUrlPattern).test(this.page.url());
  }

  async login(username: string, password: string): Promise<void> {
    await this.actions.fillByTestId(testIds.login.username, username);
    await this.actions.fillByTestId(testIds.login.password, password);
    await this.actions.clickByTestId(testIds.login.loginButton);
  }

  async logout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.actions.clickByTestId(testIds.inventory.logoutLink);
    await expect(this.page).toHaveURL(loginData.baseUrl);
    await this.actions.expectVisibleByTestId(testIds.login.loginButton);
  }
}
