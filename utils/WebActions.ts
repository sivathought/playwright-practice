import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

/** Reusable actions that locate elements by test id (see `testIdAttribute` in playwright.config.ts). */
export class WebActions {
  constructor(private readonly page: Page) {}

  async fillByTestId(testId: string, value: string): Promise<void> {
    await this.page.getByTestId(testId).fill(value);
  }

  async clickByTestId(testId: string): Promise<void> {
    await this.page.getByTestId(testId).click();
  }

  async expectVisibleByTestId(testId: string): Promise<void> {
    await expect(this.page.getByTestId(testId)).toBeVisible();
  }
}
