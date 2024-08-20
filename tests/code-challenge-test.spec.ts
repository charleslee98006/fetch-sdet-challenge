import { test as base } from '@playwright/test';
import { ChallengePage } from '../page-objects/challenge-page';

const test = base.extend<{ challengePage: ChallengePage}>({
   challengePage: async ({page}, use) => {
    const challengePage = new ChallengePage(page);
    await page.goto(process.env.BASE_URL);
    await use(challengePage);
 },
});
const Group1 = [0,1,2];
const Group2 = [3,4,5];
const Group3 = [6,7,8];

test('Find the Fake Gold bar', async ({ challengePage }) => {

});

test.afterEach(async ({page}) => {
  await page.close();
});