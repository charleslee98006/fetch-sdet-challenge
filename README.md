# Fetch SDET Challenge 
This contains the instructions and assumptions made for building and running the code challenge algorithm.

## Getting started
1. Please setup your git config and clone the repository onto your local machine (IDE, preferred VSCode)
2. Do a ```npm install``` in the terminal and you should be real
    - Note, you can always following the [Installing Playwright](https://playwright.dev/docs/intro#installing-playwright) guide if something installation goes wrong.
3. try ```npm run test``` and you should see tests running.
    - To run each individual tests,  you can just go the the code-challenge-test.spec.ts file and comment out a lines or install the playwright test in vscode plugin to run each individual in the testing section from the testing flask icon

## Key Assumptions
Below are some key assumptions made from the challenge when making the best algorithm:
- The left and right bowls table cell positions does not matter as long as there are numbers insert to compare.
- Algorithm will always require 3 sets with equal number of elements  and 9 uniques numbers ranging from 0 to 8.
- left and right bowls cells cannot insert negative or decimal numbers.
- program will change the position of fake gold when refreshed.
- test is currently only executed in headless chrome with 1 worker as no indication of which browser was needed to run.
- In the event of needing scale the program, PageObject model has been implemented to better organize code and methods. Environment variables and fixtures are implemented as well for the same reason.
- Output values are sent out to the console terminal
- Comments and documentation are added throughout the project code for reability and for new people. 