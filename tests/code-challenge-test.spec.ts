import { test as base} from '@playwright/test';
import { ChallengePage } from '../page-objects/challenge-page';

//fixture to prepare the test before executing test case.
const test = base.extend<{ challengePage: ChallengePage}>({
   challengePage: async ({page}, use) => {
    const challengePage = new ChallengePage(page);
    await page.goto(process.env.BASE_URL || '');
    await use(challengePage);
 },
});

[ //uncomment or comment out any parameter values line to just run a single or multiple number of tests
  { set1: ['0','1','2'], set2: ['3','4','5'], set3: ['6','7','8'] }, //Test in order
  // { set1: ['8','7','6'], set2: ['5','4','3'], set3: ['2','1','0'] }, //test in reverse
  // { set1: ['0','2','4'], set2: ['6','8','1'], set3: ['3','5','7'] }, // Test of Mix order
].forEach(({ set1, set2, set3 }) => {
  test('Find the fake gold bar and output the results with sets order: ' + set1 + ',' + set2 + ',' + set3, async ({ page, challengePage }) => {
    // need to set this up to catch the browser alert prompt when triggered
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`); //outputs the browser alert message
      dialog.dismiss().catch(() => {});
    });
    await(await challengePage.determinator(set1, set2, set3)).click(); // will trigger line 18-21
    for (const li of await challengePage.weightResultList.all()){ // gets the entire li elements and outputs them into the console
      console.log(await li.textContent()); //outputs to console.log the weighing record list
    }
    console.log(`Number of weighing: ${(await challengePage.weightResultList.all()).length}`) //outputs the number of wieghing to the console
  });
});

//closes the browser after each test
test.afterEach(async ({page}) => {
  await page.close();
});