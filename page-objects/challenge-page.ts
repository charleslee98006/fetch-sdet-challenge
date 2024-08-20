import { type Locator, type Page } from '@playwright/test';

/**  
 * The Find Gold Bar Challenge page atrributes 
*/
export class ChallengePage {
  readonly page: Page;
  readonly resetButton: Locator;
  readonly weighButton: Locator;
  readonly resultSign: Locator;
  readonly resultQuestionMark: Locator;
  readonly weightResultList: Locator;

  /**
 * Constructor that sets the challenge page attributes
 * @param  {Page} page passing in the Playwright page object
 */
  constructor(page: Page) {
    this.page = page;
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.weighButton = page.getByRole('button', { name: 'Weigh' });
    this.resultSign = page.locator('.result >button');
    this.weightResultList = page.locator('ol > li'); //returns the entire weighing list
    this.resultQuestionMark = page.getByRole('button', {name: '?'});
  }

  /**
   * A method that gets left or right bowls' grid position element based on input
   * @param  {string} side left or right values only; default value is set to empty string
   * @param  {string} position number ranging from 0 to 8 to get specific grid spot
   * @return {Locator} returns the promise locator element from the left or right bowl 
   */
  async bowlGridElement(side: string = '', position: number): Promise<Locator> {
    return this.page.locator('#' + side + '_' + position);
  };

  /**
   * A method that gets the locator element on the row of coins.
   * @param  {string} position number ranging from 0 to 8 to get specific coin from row; default value is set to empty string
   * @return {Locator} returns a promise of the  specific element locator from coin row
   */
  async coinsRow(position: string = ''): Promise<Locator> {
    return this.page.getByRole('button', { name: position });
  };

  /**
   * A recursive method that determines if the comparison between two groups are greater, lesser or equal to each other.
   * @param  {string} set1 first set that can be either a string array or string value
   * @param  {string} set2 second set that can be either a string array or string value
   * @param  {string} set3 second set that can be either a string array or string value
   * @return {string} returns a locator promise from the coin row element
   */
  async determinator(set1: string[] | string, set2: string[] | string , set3: string[] | string): Promise<Locator>{
    let result = await this.getWeighResults(set1, set2);
    if( set1.length == 1){ //Assuming that all three sets are equal in length
      let fakeGold: string;
      if(result == "=" ){
        fakeGold = set3[0];
      }else if(result == "<"){
        fakeGold = set1[0];
      }else{
        fakeGold = set2[0];
      }
      return await this.coinsRow(fakeGold);
    }
    if(result == "=" ){
      return await this.determinator(set3[0], set3[1], set3[2]);
    }else if(result == "<"){
      return await this.determinator(set1[0], set1[1], set1[2]);
    }else{
      return await this.determinator(set2[0], set2[1], set2[2]);
    }
  }
  
  /**
   * A method that gets the weight results and resets for new wieghing.
   * @param  {string} set1 first set that can be either a string array or string value
   * @param  {string} set2 second set that can be either a string array or string value
   * @return {string} returns a promise string from the results element
  */
  async getWeighResults(set1: string[] | string, set2: string[] | string): Promise<string>{
      //Checks if the parameters are strings and converts them to string[]
      if(typeof set1 === "string" && typeof set2 === "string"){
        let temp1 = new Array();
        let temp2 = new Array();
        temp1.push(set1);
        temp2.push(set2);
        set1 = temp1;
        set2 = temp2;
    }
    // insert the sets individually into both bowls respectively with the assumption that there is equal number in both sets 
    for (let i = 0; i < set1.length; i++) {
        let leftGrid = await this.bowlGridElement('left', i); //tied the position of left table grid to the position of the string array 
        let rightGrid = await this.bowlGridElement('right', i); //tied the position of right table grid to the position of the string array 
        await leftGrid.click();
        await leftGrid.fill((set1[i])); //Fills in the box the value in left bowl with value from array
        await rightGrid.click();
        await rightGrid.fill((set2[i])); //Fills in the box the value in right bowl with value from array
    };
    await this.weighButton.click(); //Presses the weigh button
    await this.resultQuestionMark.waitFor({state: 'hidden'}); //waits for the question to be hidden; helps with stability of test
    const result = await this.resultSign.textContent(); //get the weighing results from comparison
    await this.resetButton.click(); //Presses the Reset button to clear values from bowls
    await this.resultQuestionMark.waitFor({state: 'visible'});
    return result || '';
  }
}