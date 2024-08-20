import { test as base, Locator } from '@playwright/test';
import { ChallengePage } from '../page-objects/challenge-page';
import { Utilities } from '../utilities/utilities';

let group1: string[];
let group2: string[];
let group3: string[];


const test = base.extend<{ challengePage: ChallengePage}>({
   challengePage: async ({page}, use) => {
    const challengePage = new ChallengePage(page);
    group1 = ['0','1','2'];
    group2 = ['3','4','5'];
    group3 = ['6','7','8'];
    await page.goto(process.env.BASE_URL || '');
    await use(challengePage);
 },
});


test('Find the Fake Gold bar', async ({ page, challengePage }) => {
  const utilities = new Utilities();
  let result = await utilities.determinator(group1, group2, challengePage);
  let element: Locator;
  if(result == "=" ){
    result = await utilities.determinator(group3[0], group3[1], challengePage);
    if(result == "=" ){
      element = await challengePage.coinsRow(group3.at(2));
    }else if(result == "<"){
      element = await challengePage.coinsRow(group3.at(0));
    }else{
      element = await challengePage.coinsRow(group3.at(1));
    }
  }else if(result == "<"){
    result = await utilities.determinator(group1[0], group1[1], challengePage);
    if(result == "=" ){
      element = await challengePage.coinsRow(group1.at(2));
    }else if(result == "<"){
      element = await challengePage.coinsRow(group1.at(0));
    }else{
      element = await challengePage.coinsRow(group1.at(1));
    }    
  }else{
    result = await utilities.determinator(group2[0], group2[1], challengePage);
    if(result == "=" ){
      element = await challengePage.coinsRow(group2.at(2));
    }else if(result == "<"){
      element = await challengePage.coinsRow(group2.at(0));
    }else{
      element = await challengePage.coinsRow(group2.at(1));
    }
  }
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await element.click();
  for (const li of await challengePage.weightResultList.all()){
    console.log(await li.textContent());
  }
  console.log(`Number of weighing: ${(await challengePage.weightResultList.all()).length}`)
});

test.afterEach(async ({page}) => {
  await page.close();
});