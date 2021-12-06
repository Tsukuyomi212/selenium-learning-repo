const { Builder, By, Key } = require('selenium-webdriver');
// const assert = require('assert');
const should = require('chai').should();

describe('add todo tests', function () {
  it('successfully adds a todo to application', async function () {
    let driver = await new Builder().forBrowser('firefox').build();
    await driver.get('https://lambdatest.github.io/sample-todo-app/');
    await driver.findElement(By.id('sampletodotext')).sendKeys('Learn Selenium', Key.RETURN);

    let todoText = await driver
      .findElement(By.xpath('//li[last()]'))
      .getText()
      .then(value => {
        return value;
      });

    todoText.should.equal('Learn Selenium');

    await driver.quit();
  });
});

// async function example() {
//   // launch the browser
//   let driver = await new Builder().forBrowser('firefox').build();

//   // navigate to our app
//   await driver.get('https://lambdatest.github.io/sample-todo-app/');

//   // add a todo
//   await driver.findElement(By.id('sampletodotext')).sendKeys('Learn Selenium', Key.RETURN);

//   let todoText = await driver
//     .findElement(By.xpath('//li[last()]'))
//     .getText()
//     .then(value => {
//       return value;
//     });

//   // assert using node assertions
//   // assert.strictEqual(todoText, 'Learn Selenium');

//   //assert using chai
//   todoText.should.equal('Learn Selenium');

//   // close the browser
//   await driver.quit();
// }

//when we use a test runner like mocha, we don't need to execute the function like this
// example();
