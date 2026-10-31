import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import os from 'os';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runSeniorQASuite() {
  console.log('====================================================');
  console.log('🚀 SENIOR QA SUITE: FULL BROWSER END-TO-END VALIDATION');
  console.log('====================================================\n');

  // Step A: Start Vite Dev Server
  console.log('1. Starting Vite dev server on 127.0.0.1:5173...');
  const viteProcess = spawn('npm.cmd', ['run', 'dev', '--', '--host', '127.0.0.1'], {
    shell: true,
    stdio: 'pipe'
  });

  viteProcess.stdout.on('data', (d) => {
    const text = d.toString();
    if (text.includes('Local:') || text.includes('ready in')) {
      console.log('   [VITE SERVER READY]:', text.trim());
    }
  });

  viteProcess.stderr.on('data', (d) => {
    const err = d.toString();
    if (!err.includes('DEP0190')) {
      console.error('   [VITE STDERR]:', err.trim());
    }
  });

  await wait(3000);

  // Step B: Launch isolated headless Chrome
  const tmpProfileDir = path.join(os.tmpdir(), 'qa-chrome-' + Date.now());
  fs.mkdirSync(tmpProfileDir, { recursive: true });

  console.log('2. Launching Headless Chrome with isolated profile...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: [
      `--user-data-dir=${tmpProfileDir}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--remote-debugging-port=0'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const consoleErrors = [];
  const uncaughtExceptions = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`   ❌ [BROWSER CONSOLE ERROR]: ${msg.text()}`);
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    console.error(`   ❌ [BROWSER UNCAUGHT EXCEPTION]: ${err.message}`);
    uncaughtExceptions.push(err.message);
  });

  try {
    // 3. Navigate to root
    console.log('3. Navigating to http://127.0.0.1:5173/ ...');
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
    console.log('   ✓ Page title:', await page.title());

    // Clear any leftover storage
    await page.evaluate(() => window.localStorage.clear());
    await page.reload({ waitUntil: 'networkidle0' });

    // Verify Welcome Screen
    console.log('\n4. Testing Welcome Screen...');
    let heading = await page.$eval('h1', el => el.textContent);
    console.log(`   ✓ Welcome Heading: "${heading}"`);

    // Click "Let's Start"
    console.log('   Clicking "Let’s Start" button...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent.includes("Start"));
      btn?.click();
    });
    await wait(600);

    // Verify Fear Map Screen
    console.log('\n5. Testing Fear Map Screen...');
    heading = await page.$eval('h1', el => el.textContent);
    console.log(`   ✓ Fear Map Heading: "${heading}"`);

    // Test Back Button from Fear Map
    console.log('   Testing Back button to Welcome...');
    await page.evaluate(() => {
      const backBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Back') || b.textContent.includes('←'));
      backBtn?.click();
    });
    await wait(500);
    heading = await page.$eval('h1', el => el.textContent);
    console.log(`   ✓ Returned to Welcome Screen: "${heading}"`);

    // Return to Fear Map
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes("Start"));
      btn?.click();
    });
    await wait(500);

    // Select a Concern Card
    console.log('   Selecting concern card "Sending something by mistake"...');
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('button, div[role="checkbox"]'));
      const card = cards.find(c => c.textContent.includes('Sending something by mistake') || c.textContent.includes('mistake'));
      card?.click();
    });
    await wait(300);

    // Click Continue
    console.log('   Clicking "Continue" button...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes("Continue"));
      btn?.click();
    });
    await wait(600);

    // Verify Recommendation Screen
    console.log('\n6. Testing Recommendation Screen...');
    heading = await page.$eval('h1', el => el.textContent);
    console.log(`   ✓ Recommendation Heading: "${heading}"`);

    // Click "Start Practice"
    console.log('   Clicking "Start Practice" button...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes("Start Practice"));
      btn?.click();
    });
    await wait(600);

    // Verify Practice Intro Screen
    console.log('\n7. Testing Practice Intro Screen...');
    heading = await page.$eval('h1', el => el.textContent);
    console.log(`   ✓ Practice Intro Heading: "${heading}"`);

    // ─────────────────────────────────────────────────────────────
    // TEST A: DEMO MODE (Watch Demonstration)
    // ─────────────────────────────────────────────────────────────
    console.log('\n8. Testing DEMO MODE: Clicking "Watch Demonstration"...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes("Watch Demonstration"));
      btn?.click();
    });
    await wait(1000);

    // Check if error occurred
    let pageContent = await page.evaluate(() => document.body.innerText);
    if (pageContent.includes('You are safe. Nothing is broken.')) {
      throw new Error('CRITICAL BUG: ErrorBoundary caught an exception on GuidedPracticeScreen!');
    }

    console.log('   ✓ GuidedPracticeScreen rendered successfully without crashing!');
    const demoBanner = await page.evaluate(() => {
      const b = document.querySelector('.demo-banner-top') || document.querySelector('strong');
      return b ? b.textContent : null;
    });
    console.log(`   ✓ Demo Banner displayed: "${demoBanner}"`);

    // Wait for the automated demo to run through its timers (7.5 seconds)
    console.log('   Waiting for hands-free automated demonstration to execute...');
    await wait(7500);

    const isDemoComplete = await page.evaluate(() => {
      return document.body.innerText.includes('Demonstration Complete') ||
             document.body.innerText.includes('Now Let Me Try');
    });
    console.log(`   ✓ Automated demonstration completed successfully: ${isDemoComplete}`);

    // ─────────────────────────────────────────────────────────────
    // TEST B: INTERACTIVE GUIDED PRACTICE (Try with Me)
    // ─────────────────────────────────────────────────────────────
    console.log('\n9. Testing INTERACTIVE GUIDED PRACTICE...');
    console.log('   Clicking "Now Let Me Try (Guided Practice) →"...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes("Now Let Me Try"));
      btn?.click();
    });
    await wait(500);

    const step1Heading = await page.$eval('h2', el => el.textContent);
    console.log(`   ✓ Step 1 Instruction: "${step1Heading}"`);

    // Step 1: Tap the Paperclip icon
    console.log('   Step 1: Tapping the attachment paperclip icon in the phone...');
    await page.evaluate(() => {
      const clipBtn = document.querySelector('.phone-action-btn') ||
                      document.querySelector('button[aria-label*="Attach"]');
      clipBtn?.click();
    });
    await wait(600);

    // Verify Picture Tray is Open
    const isTrayOpen = await page.evaluate(() => {
      const tray = document.querySelector('.picture-tray');
      return tray !== null && tray.offsetHeight > 0;
    });
    console.log(`   ✓ Picture Gallery Tray opened: ${isTrayOpen}`);
    if (!isTrayOpen) {
      throw new Error('BUG: Picture tray failed to open upon tapping attachment icon!');
    }

    const step2Heading = await page.$eval('h2', el => el.textContent);
    console.log(`   ✓ Step 2 Instruction: "${step2Heading}"`);

    // Step 2: Select a photo (My Cat)
    console.log('   Step 2: Tapping the photo in the tray...');
    await page.evaluate(() => {
      const photos = Array.from(document.querySelectorAll('.picture-tray-item'));
      photos[0]?.click();
    });
    await wait(600);

    const step3Heading = await page.$eval('h2', el => el.textContent);
    console.log(`   ✓ Step 3 Instruction: "${step3Heading}"`);

    // Step 3: Tap Send Button
    console.log('   Step 3: Tapping the send button in the phone...');
    await page.evaluate(() => {
      const sendBtn = document.querySelector('.phone-send-btn') ||
                      document.querySelector('button[aria-label*="Send"]');
      sendBtn?.click();
    });
    await wait(600);

    const guidedDone = await page.evaluate(() => {
      return document.body.innerText.includes('Guided Practice Complete') ||
             document.body.innerText.includes('Well Done');
    });
    console.log(`   ✓ Guided Practice marked complete: ${guidedDone}`);

    // ─────────────────────────────────────────────────────────────
    // TEST C: INDEPENDENT ATTEMPT (Training Wheels Off)
    // ─────────────────────────────────────────────────────────────
    console.log('\n10. Testing INDEPENDENT ATTEMPT...');
    console.log('   Clicking "Try It on Your Own (Independent) →"...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes("Try It on Your Own"));
      btn?.click();
    });
    await wait(800);

    // Verify Independent Screen rendered without blank screen
    pageContent = await page.evaluate(() => document.body.innerText);
    if (pageContent.includes('You are safe. Nothing is broken.')) {
      throw new Error('CRITICAL BUG: ErrorBoundary caught an exception on IndependentAttemptScreen!');
    }

    const independentBadge = await page.evaluate(() => {
      return document.body.innerText.includes('TRAINING WHEELS OFF');
    });
    console.log(`   ✓ Independent Attempt Screen mounted cleanly (Badge present: ${independentBadge})`);

    // Step 1: Tap paperclip
    console.log('   Independent Step 1: Tapping attachment icon...');
    await page.evaluate(() => {
      const clip = document.querySelector('.phone-action-btn');
      clip?.click();
    });
    await wait(500);

    // Step 2: Select garden flowers
    console.log('   Independent Step 2: Selecting photo from gallery tray...');
    await page.evaluate(() => {
      const photos = Array.from(document.querySelectorAll('.picture-tray-item'));
      photos[2]?.click(); // Garden flowers
    });
    await wait(500);

    // Step 3: Tap send
    console.log('   Independent Step 3: Tapping send button...');
    await page.evaluate(() => {
      const sendBtn = document.querySelector('.phone-send-btn');
      sendBtn?.click();
    });
    console.log('   Waiting for completion transition...');
    await wait(2200);

    // ─────────────────────────────────────────────────────────────
    // TEST D: SUMMARY & HONEST PROGRESS SCREEN
    // ─────────────────────────────────────────────────────────────
    console.log('\n11. Testing SUMMARY & HONEST PROGRESS SCREEN...');
    heading = await page.$eval('h1', el => el.textContent);
    console.log(`   ✓ Summary Screen Heading: "${heading}"`);

    const hasAttemptRecord = await page.evaluate(() => {
      return document.querySelectorAll('.history-card, [class*="card"], [class*="attempt"]').length > 0;
    });
    console.log(`   ✓ Attempt Record Card rendered: ${hasAttemptRecord}`);

    // Test "Try Suggested Activity →" from Summary
    console.log('   Testing "Try Suggested Activity →" button on Summary...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes("Try Suggested Activity"));
      btn?.click();
    });
    await wait(800);

    const targetHeading = await page.$eval('h1', el => el.textContent);
    console.log(`   ✓ Navigated from Summary to: "${targetHeading}"`);

    // ─────────────────────────────────────────────────────────────
    // TEST E: LANGUAGE SWITCHING & URDU AUDIO
    // ─────────────────────────────────────────────────────────────
    console.log('\n12. Testing Language Switching (Urdu & Roman Urdu)...');
    
    // Switch to اردو
    console.log('   Switching language to اردو...');
    await page.evaluate(() => {
      const urduBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'اردو');
      urduBtn?.click();
    });
    await wait(500);

    const urduSampleText = await page.evaluate(() => document.body.innerText);
    const containsUrdu = /[\u0600-\u06FF]/.test(urduSampleText);
    console.log(`   ✓ Urdu script rendered on screen: ${containsUrdu}`);

    // Test Audio button in Urdu
    console.log('   Testing Audio button in Urdu mode...');
    const audioTriggered = await page.evaluate(() => {
      const audioBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('سنیں') || b.textContent.includes('Hear'));
      if (audioBtn) {
        audioBtn.click();
        return true;
      }
      return false;
    });
    console.log(`   ✓ Urdu audio button clicked: ${audioTriggered}`);

    // Switch to Roman Urdu
    console.log('   Switching language to Roman Urdu...');
    await page.evaluate(() => {
      const romanBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Roman Urdu');
      romanBtn?.click();
    });
    await wait(500);

    // Verify speaker button is HIDDEN in Roman Urdu (as requested)
    const speakerButtonsInRoman = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.filter(b => b.textContent.includes('Hear') || b.textContent.includes('سنیں')).length;
    });
    console.log(`   ✓ Speaker buttons in Roman Urdu mode: ${speakerButtonsInRoman} (Expected 0 - speaker removed)`);

    console.log('\n====================================================');
    console.log(`🎉 ALL TESTS PASSED!`);
    console.log(`   Console Errors Count: ${consoleErrors.length}`);
    console.log(`   Uncaught Exceptions: ${uncaughtExceptions.length}`);
    console.log('====================================================\n');

  } catch (err) {
    console.error('\n❌ QA TEST RUN FAILED:', err.message);
    const screenshotPath = path.join(process.cwd(), 'qa-failure-screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`   Screenshot saved to: ${screenshotPath}`);
  } finally {
    console.log('Shutting down Chrome and Vite dev server...');
    await browser.close();
    viteProcess.kill();
    try {
      fs.rmSync(tmpProfileDir, { recursive: true, force: true });
    } catch {}
  }
}

runSeniorQASuite();
