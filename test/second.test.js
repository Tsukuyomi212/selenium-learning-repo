// mocha can run multiple tests at once (parallelization)
// but not inside one describe block
// if we have multiple 'it' blocks, inside one describe block, they will always run sequentially
// mocha runs test files in parallel

const { Builder, By, Key } = require('selenium-webdriver');
const ltCapabilities = require('../capabilities');
const should = require('chai').should();

describe('add another todo tests', function () {
  let driver;
  const todoEndpoint = 'https://lambdatest.github.io/sample-todo-app/';

  //connect to lambdatest
  const USERNAME = ltCapabilities.capabilities.user;
  const KEY = ltCapabilities.capabilities.accessKey;
  const GRID_HOST = 'hub.lambdatest.com/wd/hub';
  const gridUrl = `https://${USERNAME}:${KEY}@${GRID_HOST}`;

  beforeEach(function () {
    ltCapabilities.capabilities.name = this.currentTest.title;
    driver = new Builder()
      .usingServer(gridUrl)
      .withCapabilities(ltCapabilities.capabilities)
      .build();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('successfully adds another todo to application', async function () {
    await driver.get(todoEndpoint);
    await driver.findElement(By.id('sampletodotext')).sendKeys('drink lots of coffee', Key.RETURN);

    let todoText = await driver
      .findElement(By.xpath('//li[last()]'))
      .getText()
      .then(value => {
        return value;
      });

    todoText.should.equal('drink lots of coffee');
  });

  it('adding any new test for reporting', async function () {
    await driver.get(todoEndpoint);
    await driver.findElement(By.id('sampletodotext')).sendKeys('drink lots of coffee', Key.RETURN);

    let todoText = await driver
      .findElement(By.xpath('//li[last()]'))
      .getText()
      .then(value => {
        return value;
      });

    todoText.should.equal('drink lots of coffee');
  });
});
