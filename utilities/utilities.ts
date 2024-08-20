import { ChallengePage } from "../page-objects/challenge-page";

export class Utilities {

    async determinator(set1: string[] | string, set2: string[] | string, challengePage: ChallengePage){
        if(typeof set1 === "string" && typeof set2 === "string"){
            let temp1 = new Array();
            let temp2 = new Array();
            temp1.push(set1);
            temp2.push(set2);
            set1 = temp1;
            set2 = temp2;
        }
        for (let i = 0; i < set1.length; i++) {
            let leftGrid = await challengePage.bowlGridElement('left', i);
            let rightGrid = await challengePage.bowlGridElement('right', i); 
            await leftGrid.click();
            await leftGrid.fill((set1[i]));
            await rightGrid.click();
            await rightGrid.fill((set2[i]));
        };
        await challengePage.weighButton.click();
        await challengePage.resultQuestionMark.waitFor({state: 'hidden'});
        const result = await challengePage.resultSign.textContent();
        await challengePage.resetButton.click();
        await challengePage.resultQuestionMark.waitFor({state: 'visible'});
        return result;
    }
}