import * as Axe from 'axe-core';
import { convertAxeToSarif } from 'axe-sarif-converter';
import { AxeBuilder } from 'axe-webdriverjs';
import chromeDriver from 'chromedriver';
import webdriver, { By, ThenableWebDriver, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

const TEST_TIMEOUT_MS = 30000;

describe('Graph Explorer', () => {
  let driver: ThenableWebDriver;

  // beforeAll(async () => {
  //   chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriver.path).build());

  //   driver = new webdriver
  //   .Builder()
  //   .withCapabilities(webdriver.Capabilities.chrome())
  //   .build();
  // }, TEST_TIMEOUT_MS);

  // afterAll(async() => {
  //   return driver && driver.quit();
  // }, TEST_TIMEOUT_MS);

  // beforeEach(async() => {
  //   await driver.get('https://developer.microsoft.com/en-us/graph/graph-explorer/preview');
  //   await driver.wait(until.elementLocated(By.css('h1')));
  // }, TEST_TIMEOUT_MS);

  it('checks for accessibility violations', async() => {
    chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriver.path).build());

    driver = new webdriver
    .Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

    await driver.get('https://developer.microsoft.com/en-us/graph/graph-explorer/preview');
    await driver.wait(until.elementLocated(By.css('h1')));

    const accessibilityScanResults = await AxeBuilder(driver)
      .analyze();
    expect(accessibilityScanResults.violations).toStrictEqual([]);

    return driver && driver.quit();
  });
});