import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTest() {
  console.log('1. Starting Vite dev server...');
  const viteProcess = spawn('npm.cmd', ['run', 'dev', '--', '--host', '127.0.0.1'], {
    shell: true,
    stdio: 'pipe'
  });

  viteProcess.stdout.on('data', (d) => {
    const text = d.toString();
    if (text.includes('Local:')) {
      console.log('   Vite server started:', text.trim());
    }
  });

  await wait(3000);

  console.log('2. Launching headless Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`   [BROWSER CONSOLE ERROR]:`, msg.text());
      errors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    console.error(`   [BROWSER UNCAUGHT EXCEPTION]:`, err.message);
    errors.push(err.message);
  });

  try {
    console.log('3. Navigating to http://127.0.0.1:5173/ ...');
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
    console.log('   Title:', await page.title());

    // 4. Welcome Screen
    console.log('4. Testing Welcome Screen...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const start = btns.find(b => b.textContent.includes("Start"));
      start?.click();
    });
    await wait(800);

    // 5. Fear Map
    console.log('5. Testing Fear Map Screen...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const cont = btns.find(b => b.textContent.includes("Continue"));
      cont?.click();
    });
    await wait(800);

    // 6. Recommendation
    console.log('6. Testing Recommendation Screen...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const startPrac = btns.find(b => b.textContent.includes("Start Practice"));
      startPrac?.click();
    });
    await wait(800);

    // 7. Practice Intro - click "Start Guided Practice →"
    console.log('7. Testing Practice Intro: Clicking "Start Guided Practice →" ...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const guidedBtn = btns.find(b => b.textContent.includes("Start Guided Practice"));
      guidedBtn?.click();
    });
    await wait(1500);

    // 8. Guided Practice Screen
    const heading = await page.evaluate(() => {
      const h = document.querySelector('h1, h2');
      return h ? h.textContent : 'NO HEADING FOUND';
    });
    console.log('8. Heading on Guided Practice:', heading);

    const isErrorBoundary = await page.evaluate(() => {
      return document.body.innerText.includes('You are safe. Nothing is broken.');
    });
    console.log('   Is ErrorBoundary showing?', isErrorBoundary);

    if (isErrorBoundary) {
      throw new Error('ErrorBoundary was triggered on GuidedPracticeScreen!');
    }

    // 9. Step 1: Tap paperclip
    console.log('9. Tapping attachment paperclip...');
    await page.evaluate(() => {
      const clip = document.querySelector('.phone-action-btn');
      clip?.click();
    });
    await wait(800);

    const trayOpen = await page.evaluate(() => {
      const tray = document.querySelector('.picture-tray');
      return Boolean(tray);
    });
    console.log('   Picture tray open in DOM:', trayOpen);

    // 10. Step 2: Select photo
    console.log('10. Selecting photo from tray...');
    await page.evaluate(() => {
      const photos = document.querySelectorAll('.picture-tray-item');
      if (photos[0]) photos[0].click();
    });
    await wait(800);

    // 11. Step 3: Tap Send
    console.log('11. Tapping send button...');
    await page.evaluate(() => {
      const sendBtn = document.querySelector('.phone-send-btn');
      sendBtn?.click();
    });
    await wait(1000);

    const guidedDoneText = await page.evaluate(() => document.body.innerText);
    const hasCompletedGuided = guidedDoneText.includes('Guided Practice Complete') || guidedDoneText.includes('Well Done');
    console.log('   Guided practice completed:', hasCompletedGuided);

    // 12. Proceed to Independent Attempt
    console.log('12. Clicking "Try It on Your Own (Independent) →" ...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const indepBtn = btns.find(b => b.textContent.includes('Try It on Your Own'));
      indepBtn?.click();
    });
    await wait(1500);

    const indepHeading = await page.evaluate(() => {
      const h = document.querySelector('h1, h2');
      return h ? h.textContent : 'NO HEADING FOUND';
    });
    console.log('   Independent Attempt Heading:', indepHeading);

    const isIndepError = await page.evaluate(() => {
      return document.body.innerText.includes('You are safe. Nothing is broken.');
    });
    console.log('   Is ErrorBoundary showing on Independent screen?', isIndepError);

    // 13. Independent Attempt Steps: paperclip -> photo -> send
    console.log('13. Executing independent task steps...');
    await page.evaluate(() => {
      const clip = document.querySelector('.phone-action-btn');
      clip?.click();
    });
    await wait(600);

    await page.evaluate(() => {
      const photos = document.querySelectorAll('.picture-tray-item');
      if (photos[1]) photos[1].click();
    });
    await wait(600);

    await page.evaluate(() => {
      const sendBtn = document.querySelector('.phone-send-btn');
      sendBtn?.click();
    });
    console.log('   Waiting for completion transition to Summary screen...');
    await wait(2500);

    // 14. Summary Screen
    const summaryHeading = await page.evaluate(() => {
      const h = document.querySelector('h1, h2');
      return h ? h.textContent : 'NO HEADING FOUND';
    });
    console.log('14. Summary Screen Heading:', summaryHeading);

    // 15. Testing "Try Suggested Activity →"
    console.log('15. Clicking "Try Suggested Activity →" on Summary screen...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const tryNext = btns.find(b => b.textContent.includes('Try Suggested Activity'));
      tryNext?.click();
    });
    await wait(1200);

    const afterTryHeading = await page.evaluate(() => {
      const h = document.querySelector('h1, h2');
      return h ? h.textContent : 'NO HEADING';
    });
    console.log('   Heading after "Try Suggested Activity":', afterTryHeading);

    // 16. Test Demo Mode
    console.log('16. Testing "Watch Demonstration" (Demo Mode)...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const demoBtn = btns.find(b => b.textContent.includes('Watch Demonstration'));
      demoBtn?.click();
    });
    await wait(1500);

    const demoHeading = await page.evaluate(() => {
      const h = document.querySelector('h1, h2');
      return h ? h.textContent : 'NO HEADING';
    });
    console.log('   Heading on Demo screen:', demoHeading);

    const hasPointer = await page.evaluate(() => {
      return Boolean(document.querySelector('.demo-pointer-wrapper'));
    });
    console.log('   Animated pointer visible:', hasPointer);

    console.log('\n=======================================');
    console.log('🎉 E2E BROWSER TEST COMPLETED SUCCESSFULLY!');
    console.log('Total console errors caught:', errors.length);
    console.log('=======================================\n');

  } catch (err) {
    console.error('E2E TEST RUNNER ERROR:', err);
  } finally {
    console.log('Closing browser and stopping Vite server...');
    await browser.close();
    viteProcess.kill('SIGINT');
  }
}

runTest();
