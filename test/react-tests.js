const { logger } = require("../server/logger.js");
util = require("util");
const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const config = require("./lib/config");
const {
  checkFrame,
  waitForFrame,
  shouldNotExist,
  shouldExist,
  pressKey,
  getCount,
  getText,
  loadURL,
  click,
  typeText,
  waitForText,
} = require("./lib/helpers");
const { generateEmail, generatePassword, user } = require("./lib/utils");

async function setupPage(browser, page) {
  try {
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
    return { browser, page };
  } catch (err) {
    logger.log("error", `CATCH ERROR  ${err}`);
  }
}

async function closePage(browser, page) {
  try {
    await browser.close();
    return;
  } catch (err) {
    logger.log("error", `CATCH ERROR  ${err}`);
  }
}

// describe('Threadbeast Puppeteer Payment tests', () => {
//     let browser;
//     let page;

//     before(async () => {
//         try {
//             browser = await puppeteer.launch({
//             headless: config.isHeadless,
//             slowMo: config.slowMo,
//             devtools: config.isDevTools,
//             timeout: config.launchTimeout
//             });
//             page = await browser.newPage();
//             await page.setDefaultTimeout(config.waitingTimeout);
//             await page.setViewport({
//                 width: config.viewportWidth,
//                 height: config.viewportHeight
//             });

//             logger.log('info', `login route ${config.routes.public.login}`);
//             await page.goto(`${config.routes.public.login}`, { waitUntil: 'networkidle0' }); // wait until page load
//             // await page.type('#loginEmail', config.CREDENTIALS.email);
//             // await page.type('#loginPassword', config.CREDENTIALS.password);
//             await typeText(page, config.CREDENTIALS.email, 'input[name=email]');
//             await typeText(page, config.CREDENTIALS.password, 'input[name=password]');
//             // await page.type(page, config.CREDENTIALS.email, 'input[name=email]', );
//             // await page.type(page, config.CREDENTIALS.password, 'input[name=password]')
//             await Promise.all([
//               // click(page, 'input[type=submit]'),
//               await page.waitForSelector('#loginButton'),
//               await page.click('#loginButton')
//               // page.waitForNavigation({ waitUntil: 'networkidle0' }),
//             ]);
//             logger.log('info', `tests page ${await page}`);
//             // logger.log('debug', `tests page  ${util.inspect(page, false, 10, true)}`);
//         } catch( err) {
//             logger.log('error', `CATCH ERROR  ${err}`);
//         }
//     });

//     after(async () => {
//         try {
//            await browser.close();
//         } catch( err) {
//             logger.log('error', `CATCH ERROR  ${err}`);
//         }

//     });

//     it('load payments', async () => {
//         try{
//            await page.goto(`${config.routes.private.payments}`);
//             // await page.goto(config.baseURL);
//             await page.waitForSelector('.Payment');
//             // await loadURL(page, `${config.baseURL}${config.paymentURL}`);
//             await shouldExist(page, '.Payment')
//             const url = await page.url();
//             const title = await page.title();
//             expect(url).to.contain('payment');
//             expect(title).to.contain('Threadbeast Payment Portal');
//         } catch( err) {
//             logger.log('error', `CATCH ERROR  ${err}`);
//         }

//     });

//     it('browser reload', async () => {
//         try{
//             await page.reload();
//             // await page.waitForSelector('#page-content');
//             await shouldExist(page, '.Payment')
//             const url = await page.url();
//             const title = await page.title();
//             expect(url).to.contain('payment');
//             expect(title).to.contain('Threadbeast Payment Portal');
//         } catch( err) {
//             logger.log('error', `CATCH ERROR  ${err}`);
//         }
//     });

//     it('iframe load check', async () => {
//         try {
//             await shouldExist(page, '.Payment');
//             logger.log('info',`waiting for Payment page to be ready.`);

//             await shouldExist(page, '#CheckoutForm');
//             logger.log('info',`waiting for CheckoutForm Row to be ready.`);

//             await shouldExist(page, '#checkout');
//             logger.log('info',`waiting for checkout div to be ready.`);

//             const elementHandle = await page.waitForSelector('iframe');
//             logger.log('info',`wait for iframe selector ${elementHandle}`);

//             // const frame = await elementHandle.contentFrame();
//             // logger.log('info',`filling form in iframe ${frame}`);

//             // await frame.type('input[name=cardnumber]', 4242424242424242, { delay: 10000 });
//             // logger.log('info','filling in cardnumber');
//             // await frame.type('input[name=exp-date]', 1222, { delay: 10000 });
//             //  logger.log('info','filling in date');
//             // await frame.type('input[name=cvc]', 2344, { delay: 10000 });
//             //  logger.log('info','filling in cvc');

//         } catch( err) {
//             logger.log('error', `CATCH ERROR  ${err}`);
//         }
//     });

//     it('update credit card click', async () => {
//         try {

//             const card = {
//                 number: '4242424242424242',
//                 monthyear: '0122',
//                 cvc: '000',
//             }

//             // await page.waitForSelector('.InputContainer')
//             // await page.click('[data-testid="billingSubscribeButton"]')
//             // await page.waitForSelector('[data-testid="billingCardWrapper"]')
//             // await sleep(2000) // wait for initial mounting stripe CardElement animations
//             // await page.click('[data-testid="billingCardWrapper"]')
//             await page.keyboard.type('input[name=cardnumber]',card.number, { delay: 50 });
//             logger.log('info','filling in cardnumber');
//             await page.keyboard.type('input[name=exp-date]',card.monthyear, { delay: 50 });
//             logger.log('info','filling in date');
//             await page.keyboard.type('input[name=cvc]',card.cvc, { delay: 50 });
//             logger.log('info','filling in cvc');

//             const update_cc_button_clicked = await Promise.all([
//               await page.waitForSelector('#update_creditcard_button'),
//               await page.click('#update_creditcard_button')
//             ]);
//             logger.log('info',`wait for update_creditcard_button selector and click ${update_cc_button_clicked}`);
//         } catch( err) {
//             logger.log('error', `CATCH ERROR  ${err}`);
//         }
//     });

//     it('select plan', async () => {
//         try {
//             await page.waitForSelector('#Payment__Entry');

//             await page.select('#Payment__Entry', 'Basic');
//             logger.log('info',`select Basic`);
//             await page.select('.Payment__Entry', 'Essential');
//             logger.log('info',`select Essential`);
//             await page.select('#Payment__Entry', 'Premium');
//             logger.log('info',`select Premium`);
//             await page.select('.Payment__Entry', 'Baller');
//             logger.log('info',`select Baller`);
//             // await page.keyboard.press('Enter');
//             // await pressKey(page, '#reactivate');
//             await page.click('#reactivate');
//             logger.log('info',`click reactivate`);

//             await shouldExist(page, '.Payment');
//             logger.log('info',`waiting for Payment page to be ready.`);
//         } catch(err) {
//             logger.log('error', `CATCH ERROR  ${err}`);
//         }

//     });

//     it('select plan', async () => {
//         try {
//             await page.waitForSelector('.Sidebar');
//             await page.waitForSelector('#Logout');
//             await page.click('#Logout');
//             logger.log('info',`click Logout`);
//         } catch(err) {
//             logger.log('error', `CATCH ERROR  ${err}`);
//         }

//     });

//     it('generates bad email', async () => {
//         await page.waitForSelector('.Login');
//         await shouldExist(page, '.Login');
//         logger.log('info',`loading Login page`);

//         const bad_email = await user.email;
//         logger.log('info',`bad_email generated ${bad_email}`);
//         const bad_password = await user.password;
//         logger.log('info',`bad_password generated ${bad_password}`);

//         await typeText(page, bad_email, 'input[name=email]');
//         await typeText(page, bad_password, 'input[name=password]');
//         const clicked = await Promise.all([
//           await page.waitForSelector('#loginButton'),
//           await page.click('#loginButton')
//         ]);
//         logger.log('info',`bad login clicked ${clicked}`);
//     });

//     // it('logs in with good email', async () => {
//     //     await page.reload();
//     //     await page.waitForSelector('.Login');
//     //     await shouldExist(page, '.Login');
//     //     logger.log('info',`loading Login page`);
//     //     await typeText(page, config.CREDENTIALS.email, 'input[name=email]');
//     //     await typeText(page, config.CREDENTIALS.password, 'input[name=password]');
//     //     const clicked = await Promise.all([
//     //       await page.waitForSelector('#loginButton'),
//     //       await page.click('#loginButton')
//     //     ]);
//     //     logger.log('info',`good login clicked ${clicked}`);
//     // });

//     // it('submit searchbox', async () => {
//     //     // await page.goto(config.baseURL);
//     //     await loadURL(page, config.baseURL);
//     //     await typeText(page, 'Javascript', '#nav-search');
//     //     // await page.keyboard.press('Enter');
//     //     await pressKey(page, 'Enter');
//     //     // await page.waitForSelector('#articles-list');
//     //     await shouldExist(page, '#articles-list')
//     // });
// });

// describe('New Member', () => {
//     let browser;
//     let page;
//     before(async () => {
//       try {
//           browser = await puppeteer.launch({
//             headless: config.isHeadless,
//             slowMo: config.slowMo,
//             devtools: config.isDevTools,
//             timeout: config.launchTimeout
//           });
//           page = await browser.newPage();
//           await page.setDefaultTimeout(config.waitingTimeout);
//           await page.setViewport({
//               width: config.viewportWidth,
//               height: config.viewportHeight
//           });
//           return {browser, page};
//       } catch( err) {
//           logger.log('error', `CATCH ERROR  ${err}`);
//       }
//     });
//     after(async () => {
//       try {
//          await browser.close();
//          return;
//       } catch( err) {
//           logger.log('error', `CATCH ERROR  ${err}`);
//       }
//     });

//     it('should navigate to New Member from login', async () => {
//         await page.goto(`${config.routes.public.login}`);
//         await shouldExist(page, '.Login');
//         logger.log('info',`loading Login page`);

//         const clicked = await Promise.all([
//           await page.waitForSelector('#newMemberButton'),
//           await page.click('#newMemberButton')
//         ]);
//         logger.log('info',`newMemberButton clicked ${clicked}`);
//     });

//     it('should navigate to NewMember via url', async () => {
//         await page.goto(`${config.routes.public.newmember}`);
//         await shouldExist(page, '#newmember');
//         logger.log('info',`go directly to newMember page`);

//         await page.waitForSelector('#newmember');
//         logger.log('info',`loading New Member creation page`);

//         await page.waitForSelector('#newmember-form');
//         const email = 'rose@threadbeast.com';
//         await typeText(page, email, 'input[name=email]');
//         logger.log('info',`email entered ${email}`);

//         const clicked_password = await Promise.all([
//           await page.waitForSelector('button[name=NewMemberPassword]'),
//           await page.click('button[name=NewMemberPassword]')
//         ]);
//         logger.log('info',`NewMemberPassword clicked_password ${clicked_password}`);
//     });

//     it('should enter new member email and click the New Member password button', async () => {
//         await page.waitForSelector('#newmember-form');
//         const email = 'rose@threadbeast.com';
//         await typeText(page, email, 'input[name=email]');
//         logger.log('info',`email entered ${email}`);

//         const clicked_password = await Promise.all([
//           await page.waitForSelector('button[name=NewMemberPassword]'),
//           await page.click('button[name=NewMemberPassword]')
//         ]);
//         logger.log('info',`NewMemberPassword clicked_password ${clicked_password}`);
//     });

//     it('should succeed in creating new member', async () => {

//         logger.log('info',`NewMember created `);
//     });

// })

// describe('Forgotten Password', () => {
//     let browser;
//     let page;
//     before(async () => {
//       try {
//           browser = await puppeteer.launch({
//             headless: config.isHeadless,
//             slowMo: config.slowMo,
//             devtools: config.isDevTools,
//             timeout: config.launchTimeout
//           });
//           page = await browser.newPage();
//           await page.setDefaultTimeout(config.waitingTimeout);
//           await page.setViewport({
//               width: config.viewportWidth,
//               height: config.viewportHeight
//           });
//           return {browser, page};
//       } catch( err) {
//           logger.log('error', `CATCH ERROR  ${err}`);
//       }
//     });
//     after(async () => {
//       try {
//          await browser.close();
//          return;
//       } catch( err) {
//           logger.log('error', `CATCH ERROR  ${err}`);
//       }
//     });

//     it('should navigate to login', async () => {
//         await page.goto(`${config.routes.public.login}`);
//         await shouldExist(page, '.Login');
//         logger.log('info',`loading Login page`);
//     });

//     it('should click forgot password Button', async () => {
//          const clicked = await Promise.all([
//           await page.waitForSelector('#forgotPasswordButton'),
//           await page.click('#forgotPasswordButton')
//         ]);
//         logger.log('info',`forgotPasswordButton clicked ${clicked}`);
//         await shouldExist(page, '#forgot');
//         await page.waitForSelector('#forgot');
//         logger.log('info',`loading Forgot Password page after button click`);
//     });

//     it('should load Forgot Password page after button click on login page', async () => {
//         await shouldExist(page, '#forgot');
//         await page.waitForSelector('#forgot');
//     })

//     it('should load Forgot Password page from forgot url', async () => {
//         // await page.goto(`${config.routes.public.forgot}`);
//         await loadURL(page, `${config.routes.public.forgot}`)
//         await shouldExist(page, '#forgot');
//         await page.waitForSelector('#forgot');
//     })

//     it('should submit email', async () => {
//         await page.waitForSelector('#forgot-form');
//         const email = 'rose@threadbeast.com';
//         await typeText(page, email, 'input[name=email]');
//         logger.log('info',`email entered ${email}`);

//         const clicked_password = await Promise.all([
//           await page.waitForSelector('#ForgotPassword'),
//           await click(page, '#ForgotPassword')
//         ]);
//         logger.log('info',`ForgotPassword clicked_password ${clicked_password}`);
//     })

//     it('should display success message', async () => {
//         await waitForText(
//             page,
//             'body',
//             'success'
//         )
//     })

//     it('should display failure message', async () => {
//         await waitForText(
//             page,
//             'body',
//             'Error: Please login again'
//         )
//     })

// });

describe("SetPassword", () => {
  let browser;
  let page;
  before(async () => {
    try {
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
      return { browser, page };
    } catch (err) {
      logger.log("error", `CATCH ERROR  ${err}`);
    }
  });
  after(async () => {
    try {
      await browser.close();
      return;
    } catch (err) {
      logger.log("error", `CATCH ERROR  ${err}`);
    }
  });

  it("should load setPassword Page", async () => {
    await page.goto(`${config.routes.public.setpassword}`);
    await shouldExist(page, "#setpassword");
    await page.waitForSelector("#setpassword");
  });

  it("should load SetPassword form", async () => {
    await shouldExist(page, "#setpassword-form");
    await page.waitForSelector("#setpassword-form");
  });

  it("enter email, phone, zip, password for setPassword", async () => {
    await typeText(page, config.user.email, "input[name=email]");
    await typeText(page, config.user.phone, "input[name=phone]");
    await typeText(page, config.user.zip, "input[name=zip]");
    await typeText(page, config.user.password, "input[name=password]");
    const clicked = await Promise.all([
      await page.waitForSelector("#SetPassword"),
      await page.click("#SetPassword"),
    ]);
    logger.log("info", `SetPassword clicked ${clicked}`);
  });

  it("should display success message", async () => {
    await waitForText(page, "body", "success");
  });

  it("should display failure message", async () => {
    await waitForText(page, "body", "Error: Please login again");
  });
});
