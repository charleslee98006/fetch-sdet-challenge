import { type Locator, type Page } from '@playwright/test';

export class ChallengePage {
  readonly page: Page;
  readonly resetButton: Locator;
  readonly weighButton: Locator;
  readonly resultSign: Locator;
  readonly weightResultList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.weighButton = page.getByRole('button', { name: 'Weigh' });
    this.resultSign = page.locator('.result >button');
    this.weightResultList = page.locator('ol > li');;
  }

  async bowlGridElement(side: string = '', position: string = '') {
    return this.page.locator('#'+side+'_'+position);
  };

  async coinsRow(position: string = '') {
    return this.page.getByRole('button', { name: position });
  };
}