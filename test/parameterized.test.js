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

  const browsers = [
    {
      browser: 'Chrome',
      bVersion: '93.0',
      os: 'Windows 10',
    },
    {
      browser: 'Firefox',
      bVersion: '91.0',
      os: 'Windows 10',
    },
    {
      browser: 'Firefox',
      bVersion: '90.0',
      os: 'Windows 10',
    },
  ];

  browsers.forEach(({ browser, bVersion, os }) => {
    it(`successfully adds another todo for browser ${browser}, ${bVersion}, ${os}`, async function () {
      const capabilities = {
        ...ltCapabilities.capabilities,
        name: this.title,
        platformName: os,
        browserName: browser,
        browserVersion: bVersion,
      };

      driver = await new Builder().usingServer(gridUrl).withCapabilities(capabilities).build();

      await driver.get(todoEndpoint);

      await driver
        .findElement(By.id('sampletodotext'))
        .sendKeys('drink lots of coffee', Key.RETURN);

      let todoText = await driver
        .findElement(By.xpath('//li[last()]'))
        .getText()
        .then(value => {
          return value;
        });

      todoText.should.equal('drink lots of coffee');

      await driver.quit();
    });
  });
});
