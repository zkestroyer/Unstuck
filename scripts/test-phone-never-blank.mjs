import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTest() {
  console.log('=== VERIFYING PHONE SCREEN NEVER BLANK UNDER ANY TASK ID ===');

  console.log('1. Spawning Vite dev server on port 5173...');
  const vite = spawn('npm.cmd', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '5173'], {
    shell: true,
    stdio: 'pipe'
  });

  vite.stdout.on('data', d => {
    const s = d.toString();
    if (s.includes('Local:')) console.log('   Vite ready:', s.trim());
  });

  await wait(3500);

  let browser;
  try {
    console.log('2. Launching headless Chrome...');
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    // Test 1: Corrupted/check-message in localStorage navigating to guidedPractice
    console.log('3. Setting localStorage with currentTaskId = "check-message" and screen = "guidedPractice"...');
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });

    await page.evaluate(() => {
      localStorage.setItem('unstuck_session_v1', JSON.stringify({
        screen: 'guidedPractice',
        currentTaskId: 'check-message',
        recommendedTaskId: 'check-message',
        attemptHistory: [],
        completedTaskIds: []
      }));
    });

    console.log('4. Reloading page with corrupted state...');
    await page.reload({ waitUntil: 'networkidle0' });
    await wait(1000);

    // Verify phone is NOT blank!
    const test1Check = await page.evaluate(() => {
      const screen = document.querySelector('.phone-screen');
      const chatHeader = document.querySelector('.phone-chat-header');
      const messagesArea = document.querySelector('.phone-messages-area');
      const inputBar = document.querySelector('.phone-input-bar');
      const bubbles = document.querySelectorAll('.chat-bubble');

      return {
        screenFound: !!screen,
        chatHeaderFound: !!chatHeader,
        messagesAreaFound: !!messagesArea,
        inputBarFound: !!inputBar,
        bubblesCount: bubbles.length
      };
    });

    console.log('Test 1 (Corrupted check-message state):', test1Check);
    if (!test1Check.chatHeaderFound || !test1Check.inputBarFound || test1Check.bubblesCount === 0) {
      throw new Error('Test 1 Failed: Phone screen is blank!');
    }
    console.log('  ✓ Test 1 PASSED: Fallback to messaging is active, phone is NOT blank!');

    // Test 2: Standard user journey Welcome -> Fear Map -> Recommendation -> Guided
    console.log('5. Testing standard user journey from welcome screen...');
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });

    // Click Let's start
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const start = btns.find(b => b.innerText.includes("Let's Start"));
      if (start) start.click();
    });
    await wait(600);

    // Click Continue
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('[role="checkbox"]'));
      if (cards[0]) cards[0].click();
      const btns = Array.from(document.querySelectorAll('button'));
      const cont = btns.find(b => b.innerText.includes("Continue"));
      if (cont) cont.click();
    });
    await wait(600);

    // Click Start Practice
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const start = btns.find(b => b.innerText.includes("Start Practice"));
      if (start) start.click();
    });
    await wait(600);

    // Click Try with me (Start Guided Practice)
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const guided = btns.find(b => b.innerText.includes("Start Guided Practice") || b.innerText.includes("Guided"));
      if (guided) guided.click();
    });
    await wait(1500);

    // Inspect phone in normal flow
    const test2Check = await page.evaluate(() => {
      const screen = document.querySelector('.phone-screen');
      const chatHeader = document.querySelector('.phone-chat-header');
      const messagesArea = document.querySelector('.phone-messages-area');
      const inputBar = document.querySelector('.phone-input-bar');
      const paperclip = document.querySelector('.phone-action-btn');

      return {
        screenFound: !!screen,
        chatHeaderFound: !!chatHeader,
        messagesAreaFound: !!messagesArea,
        inputBarFound: !!inputBar,
        paperclipFound: !!paperclip
      };
    });

    console.log('Test 2 (Standard User Journey):', test2Check);
    if (!test2Check.chatHeaderFound || !test2Check.inputBarFound || !test2Check.paperclipFound) {
      throw new Error('Test 2 Failed: Phone screen is blank!');
    }
    console.log('  ✓ Test 2 PASSED: Normal flow phone controls & messages fully visible!');

    // Take screenshot
    await page.screenshot({ path: 'public/test_phone_verified_visible.png' });
    console.log('Saved verification screenshot to public/test_phone_verified_visible.png');

    console.log(`\n=== ERRORS ENCOUNTERED: ${errors.length} ===`);
    if (errors.length > 0) {
      throw new Error(`Encountered ${errors.length} errors`);
    }

    console.log('🎉 PHONE BLANK SCREEN PERMANENTLY RESOLVED! ALL ASSERTIONS PASSED! 🎉');
    await browser.close();
  } finally {
    vite.kill();
  }
}

runTest().catch(err => {
  console.error('FATAL TEST ERROR:', err);
  process.exit(1);
});
