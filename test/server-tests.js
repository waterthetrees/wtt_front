const puppeteer = require("puppeteer");
util = require("util");
const expect = require("chai").expect;
const config = require("../lib/config");
const click = require("../lib/helpers").click;
const pressKey = require("../lib/helpers").pressKey;
const typeText = require("../lib/helpers").typeText;
const loadURL = require("../lib/helpers").loadURL;
const shouldExist = require("../lib/helpers").shouldExist;
const shouldNotExist = require("../lib/helpers").shouldNotExist;

describe("Threadbeast Puppeteer tests", () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({
      headless: config.isHeadless,
      slowMo: config.slowMo,
      devtools: config.isDevTools,
      timeout: config.launchTimeout,
    });
    page = await browser.newPage();
    await page.setDefaultTimeout(config.waitingTimeout);
    await page.setViewport({
      width: config.viewportWidth,
      height: config.viewportHeight,
    });
    console.log("tests", page);
  });

  after(async () => {
    await browser.close();
  });

  // it('load payments', async () => {
  //     // await page.goto('https://dev.to/');
  //     // await page.goto(config.baseURL);
  //     // await page.waitForSelector('#nav-search');
  //     await loadURL(page, config.baseURL)
  //     await shouldExist(page, '.Style')
  //     const url = await page.url();

  //     const title = await page.title();

  //     expect(url).to.contain('style');
  //     expect(title).to.contain('Styles');
  // });

  // it('browser reload', async () => {
  //     await page.reload();
  //     // await page.waitForSelector('#page-content');
  //     await shouldExist(page, '.Payment')
  //     const url = await page.url();
  //     const title = await page.title();
  //     expect(url).to.contain('payment');
  //     expect(title).to.contain('Payments');
  // });

  // it('click method', async () => {
  //     // await page.goto(config.baseURL);
  //     // await page.waitForSelector('#write-link');
  //     // await page.click('#write-link');
  //     await loadURL(page, config.baseURL);
  //     await click(page, '.btn');
  //     // await page.waitForSelector('.registration-rainbow');
  //     await shouldExist(page, '.Payments')
  //     // await page.click('#write-link', {
  //     // button: "right",
  //     // clickCount: 5,
  //     // delay:  100
  //     // })
  // });

  // it('submit searchbox', async () => {
  //     // await page.goto(config.baseURL);
  //     await loadURL(page, config.baseURL);
  //     await typeText(page, 'Javascript', '#nav-search');
  //     // await page.keyboard.press('Enter');
  //     await pressKey(page, 'Enter');
  //     // await page.waitForSelector('#articles-list');
  //     await shouldExist(page, '#articles-list')
  // });
});
