const { logger } = require("./../../logger.js");
util = require("util");
const config = require("./config");
const puppeteer = require("puppeteer");

async function click(page, selector) {
  try {
    await page.waitForSelector(selector);
    await page.click(selector);
  } catch (error) {
    throw new Error(`Could not click on selector: ${selector}`);
  }
}

async function typeText(page, text, selector) {
  try {
    await page.waitForSelector(selector);
    await page.type(selector, text);
  } catch (error) {
    throw new Error(`Could not type text into selector: ${selector}`);
  }
}

function waitForFrame(page, frameName) {
  let fulfill;
  const promise = new Promise((x) => (fulfill = x));
  checkFrame();
  return promise;

  function checkFrame() {
    const frame = page.frames().find((f) => f.name() === frameName);
    if (frame) fulfill(frame);
    else page.once("frameattached", checkFrame);
  }
}

async function loadURL(page, url) {
  const functionName = "loadURL";
  logger.log(
    "debug",
    `${functionName} ${page} ${util.inspect(url, false, 10, true)} ----==\n\n\n`
  );
  try {
    return await page.goto(url, { waitUntil: "networkidle0" });
  } catch (error) {
    throw new Error(`Cannot get text from selector: ${selector}`);
  }
}

async function getText(page, selector) {
  try {
    await page.waitForSelector(selector);
    return page.$eval(selector, (e) => e.innter.HTML);
  } catch (error) {
    throw new Error(`Cannot get text from selector: ${selector}`);
  }
}

async function getCount(page, selector) {
  try {
    await page.waitForSelector(selector);
    return page.$eval(selector, (items) => items.length);
  } catch (error) {
    throw new Error(`Cant get count of selector ${selector}`);
  }
}

async function pressKey(page, key) {
  try {
    await page.keyboard.press(key);
  } catch (error) {
    throw new Error(`Could not press ${key}`);
  }
}

async function shouldExist(page, selector) {
  try {
    await page.waitForSelector(selector, { visible: true });
  } catch (error) {
    throw new Error(`selector ${selector} not exist`);
  }
}

async function shouldNotExist(page, selector) {
  try {
    await page.waitForSelector((selector) => document.querySelector(selector));
  } catch (error) {
    throw new Error(`selector ${selector} is visible but should not exist`);
  }
}

async function waitForText(page, selector, text) {
  try {
    await page.waitForSelector(selector);
    await page.waitForFunction(
      (selector, text) =>
        document.querySelector(selector).innerText.includes(text),
      {},
      selector,
      text
    );
  } catch (error) {
    throw new Error(`Text: ${text} not found for selector ${selector}`);
  }
}

module.exports = {
  shouldNotExist,
  shouldExist,
  pressKey,
  getCount,
  getText,
  loadURL,
  waitForFrame,
  click,
  typeText,
  waitForText,
};
