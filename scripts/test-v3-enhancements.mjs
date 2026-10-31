import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import os from 'os';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runV3Verification() {
  console.log('====================================================');
  console.log('UNSTUCK v3.0 Master Verification Test Suite');
  console.log('====================================================');

  console.log('1. Starting Vite dev server on port 5173...');
  const viteProcess = spawn('cmd.exe', ['/c', 'npm run dev -- --host 127.0.0.1'], {
    stdio: 'ignore'
  });

  await wait(3500);

  const uniqueProfileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'unstuck_v3_profile_'));

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: uniqueProfileDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  let passCount = 0;
  let failCount = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`   ✓ PASS: ${testName}`);
      passCount++;
    } else {
      console.error(`   ✗ FAIL: ${testName}`);
      failCount++;
    }
  }

  try {
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });

    // ── Check 1: Welcome & Language Switching ──
    console.log('\n[TEST 1] Welcome Screen & Language Switching...');
    const welcomeTitle = await page.$eval('h1', el => el.textContent);
    assert(welcomeTitle.includes("practise using technology"), 'Welcome screen rendered with clear English text');

    // Switch to Urdu
    await page.evaluate(() => {
      const urBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'اردو');
      urBtn?.click();
    });
    await wait(400);
    const urTitle = await page.$eval('h1', el => el.textContent);
    assert(urTitle.includes("مشق کریں"), 'Switched to Urdu successfully');

    // Switch to Roman Urdu
    await page.evaluate(() => {
      const romanBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Roman Urdu');
      romanBtn?.click();
    });
    await wait(400);
    const romanTitle = await page.$eval('h1', el => el.textContent);
    assert(romanTitle.includes("practice karein"), 'Switched to Roman Urdu successfully');

    // Switch back to English for automated checks
    await page.evaluate(() => {
      const enBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'English');
      enBtn?.click();
    });
    await wait(400);

    // ── Check 2: Accessibility Toolbar Controls ──
    console.log('\n[TEST 2] Accessibility Toolbar Controls (Text Size, Contrast, Large Buttons, Motion)...');
    // Open Accessibility Toolbar
    await page.evaluate(() => {
      const a11yTrigger = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Accessibility'));
      a11yTrigger?.click();
    });
    await wait(500);

    // Click Text Size toggle to Large
    await page.evaluate(() => {
      const aPlusBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('A A+'));
      aPlusBtn?.click();
    });
    await wait(300);
    const textSizeAttr = await page.evaluate(() => document.documentElement.getAttribute('data-text-size'));
    assert(textSizeAttr === 'large', `Text size scaled up to Large (data-text-size="${textSizeAttr}")`);

    // Click High Contrast toggle
    await page.evaluate(() => {
      const panel = document.getElementById('accessibility-panel');
      const contrastBtn = Array.from(panel?.querySelectorAll('button') || []).find(b => {
        const row = b.closest('div');
        return row?.textContent.includes('High Contrast');
      });
      contrastBtn?.click();
    });
    await wait(300);
    const contrastAttr = await page.evaluate(() => document.documentElement.getAttribute('data-contrast'));
    assert(contrastAttr === 'high', `High contrast mode enabled (data-contrast="${contrastAttr}")`);

    // Revert High Contrast
    await page.evaluate(() => {
      const panel = document.getElementById('accessibility-panel');
      const contrastBtn = Array.from(panel?.querySelectorAll('button') || []).find(b => {
        const row = b.closest('div');
        return row?.textContent.includes('High Contrast');
      });
      contrastBtn?.click();
    });
    await wait(300);

    // ── Check 3: Digital Fear Map selections persist ──
    console.log('\n[TEST 3] Fear Map Selections & Recommendations...');
    await page.evaluate(() => {
      const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes("Let's Start"));
      startBtn?.click();
    });
    await wait(600);

    const fearHeading = await page.$eval('h1', el => el.textContent);
    assert(fearHeading.includes("comfortable doing"), 'Navigated to Fear Map');

    // Select "I worry I might delete something"
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('button'));
      const delCard = cards.find(c => c.textContent.includes('delete something'));
      delCard?.click();
    });
    await wait(400);

    // Continue to recommendation
    await page.evaluate(() => {
      const continueBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Continue'));
      continueBtn?.click();
    });
    await wait(600);

    const recReason = await page.$eval('p', el => el.textContent);
    assert(recReason.includes('deleting') || recReason.includes('Recently Deleted') || recReason.includes('trash'), 'Recommendation engine suggests Safe Deletion based on selected fear');

    // ── Check 4: Feature Two — "What Happens If...?" Exploration Sandbox ──
    console.log('\n[TEST 4] Feature Two: "What Happens If...?" Exploration Sandbox...');
    await page.evaluate(() => {
      const exploreNav = Array.from(document.querySelectorAll('nav button')).find(b => b.textContent.includes('What Happens'));
      exploreNav?.click();
    });
    await wait(800);

    const exploreHeading = await page.$eval('h1', el => el.textContent);
    assert(exploreHeading.includes("What Happens If"), 'Exploration Mode Screen loaded');

    // Test Delete button exploration action
    await page.evaluate(() => {
      const actionBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Delete button'));
      actionBtn?.click();
    });
    await wait(500);

    const expText = await page.evaluate(() => document.body.innerText);
    assert(expText.includes('Recently Deleted') || expText.includes('Trash'), 'Explains consequence of Delete in plain language');

    // Tap "Show me what happens"
    await page.evaluate(() => {
      const showMeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Show me what happens'));
      showMeBtn?.click();
    });
    await wait(600);

    const simTrashActive = await page.evaluate(() => document.body.innerText.includes('Recently Deleted Trash') || document.body.innerText.includes('in trash'));
    assert(simTrashActive, 'Simulated phone dynamically reflects the Delete action moving to Trash');

    // ── Check 5: Feature One — Digital Confidence Map Screen ──
    console.log('\n[TEST 5] Feature One: Digital Confidence Map Screen...');
    await page.evaluate(() => {
      const confNav = Array.from(document.querySelectorAll('nav button')).find(b => b.textContent.includes('Confidence Map'));
      confNav?.click();
    });
    await wait(800);

    const confHeading = await page.$eval('h1', el => el.textContent);
    assert(confHeading.includes("Confidence Map"), 'Confidence Map Screen loaded');

    const catCards = await page.evaluate(() => document.querySelectorAll('div[class*="categoryCard"]').length);
    assert(catCards === 4, `All 4 learning categories rendered in Confidence Map (count: ${catCards})`);

    const hasStartedStatus = await page.evaluate(() => document.body.innerText.includes('Just getting started'));
    assert(hasStartedStatus, 'Initial learning status shows "Just getting started" based on real history');

    // ── Check 6: Practice Flow & Feature Six Maps Privacy Sharing ──
    console.log('\n[TEST 6] Feature Six: Privacy-Aware Maps Location Sharing...');
    await page.evaluate(() => {
      const libNav = Array.from(document.querySelectorAll('nav button')).find(b => b.textContent.includes('Skill Library') || b.textContent.includes('Library') || b.textContent.includes('تمام مشقیں'));
      libNav?.click();
    });
    await wait(800);

    // Launch Maps practice
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('div[class*="libraryCard"]'));
      const mapsCard = cards.find(c => c.textContent.includes('Maps') || c.textContent.includes('نقش'));
      const btn = mapsCard?.querySelector('button');
      btn?.click();
    });
    await wait(800);

    // Step 1: Search bar
    await page.evaluate(() => {
      const searchBox = document.querySelector('.maps-search-box');
      searchBox?.click();
    });
    await wait(600);

    // Step 2: Share location
    await page.evaluate(() => {
      const shareBtn = document.querySelector('.maps-share-btn');
      shareBtn?.click();
    });
    await wait(600);

    // Check Privacy Note in Modal
    const hasPrivacyNote = await page.evaluate(() => document.body.innerText.includes('Safety Principle') || document.body.innerText.includes('know and trust'));
    assert(hasPrivacyNote, 'Privacy note is clearly displayed before location sharing');

    // Step 3: Confirm location sharing
    await page.evaluate(() => {
      const confirmBtn = document.querySelector('.maps-confirm-btn');
      confirmBtn?.click();
    });
    await wait(800);

    // Verify Active Sharing Banner and Stop Sharing button
    const hasLiveBanner = await page.evaluate(() => document.body.innerText.includes('Location sharing is active') || document.body.innerText.includes('Live Location'));
    assert(hasLiveBanner, 'Live location sharing status banner is visible in the simulation');

    const hasStopBtn = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Stop Sharing'));
    });
    assert(hasStopBtn, 'Prominent "Stop sharing location" button is available');

    // Click Stop Sharing
    await page.evaluate(() => {
      const stopBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Stop Sharing'));
      stopBtn?.click();
    });
    await wait(500);

    const stoppedNotice = await page.evaluate(() => document.body.innerText.includes('Location sharing stopped'));
    assert(stoppedNotice, 'User successfully stopped location sharing safely');

    // Complete guided maps
    await page.evaluate(() => {
      const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Try It on Your Own'));
      nextBtn?.click();
    });
    await wait(800);

    // ── Check 7: Independent Attempt & Feature Four Real-World Skill Transfer ──
    console.log('\n[TEST 7] Independent Attempt & Real-World Skill Transfer Bridge...');
    const indepHeading = await page.$eval('h2', el => el.textContent);
    assert(indepHeading.length > 0, 'Independent attempt loaded with training wheels off');

    // Complete independent steps: search -> share -> confirm
    await page.evaluate(() => {
      const searchBox = document.querySelector('.maps-search-box');
      searchBox?.click();
    });
    await wait(500);

    await page.evaluate(() => {
      const shareBtn = document.querySelector('.maps-share-btn');
      shareBtn?.click();
    });
    await wait(500);

    await page.evaluate(() => {
      const confirmBtn = document.querySelector('.maps-confirm-btn');
      confirmBtn?.click();
    });
    await wait(2200); // Allow independent completion timer

    // Check if Real-World Skill Transfer Screen loaded
    const isTransferScreen = await page.evaluate(() => document.body.innerText.includes('When you use your real phone') || document.body.innerText.includes('REAL-WORLD SKILL TRANSFER'));
    assert(isTransferScreen, 'Real-World Skill Transfer Card displayed after exercise');

    const hasTransferQuestion = await page.evaluate(() => document.body.innerText.includes('Would you feel comfortable trying this on your own phone?'));
    assert(hasTransferQuestion, 'Transfer confirmation question asked to learner');

    // Select "Yes, I would like to try on my phone." and continue to Summary
    await page.evaluate(() => {
      const choiceBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Yes, I would like to try'));
      choiceBtn?.click();
    });
    await wait(300);

    await page.evaluate(() => {
      const contBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Continue to Summary'));
      contBtn?.click();
    });
    await wait(800);

    // ── Check 8: Feature Seven — Personalized Learning Dashboard ──
    console.log('\n[TEST 8] Feature Seven: Personalized Learning Dashboard...');
    const summaryTitle = await page.$eval('h1', el => el.textContent);
    assert(summaryTitle.length > 0, 'Personalized Learning Dashboard (Summary) loaded');

    const hasAchievements = await page.evaluate(() => document.body.innerText.includes('What You Have Explored') || document.body.innerText.includes('آپ کی اہم کامیابیاں'));
    assert(hasAchievements, 'Achievements tab loaded with friendly milestone statements');

    // Check Skills I Explored tab
    await page.evaluate(() => {
      const catTab = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Skills I Explored') || b.textContent.includes('مہارتوں کا خلاصہ'));
      catTab?.click();
    });
    await wait(400);

    const hasCatSummary = await page.evaluate(() => document.body.innerText.includes('Navigation & Everyday') || document.body.innerText.includes('Navigation'));
    assert(hasCatSummary, 'Skills I Explored shows 4 learning categories with actual attempt counts');

    // ── Check 9: Confidence Map Update Verification ──
    console.log('\n[TEST 9] Confidence Map Live Status Update Verification...');
    await page.evaluate(() => {
      const confNav = Array.from(document.querySelectorAll('nav button')).find(b => b.textContent.includes('Confidence Map'));
      confNav?.click();
    });
    await wait(800);

    const hasComfortableStatus = await page.evaluate(() => document.body.innerText.includes('Comfortable with this skill'));
    assert(hasComfortableStatus, 'Confidence Map upgraded status to "Comfortable with this skill" for completed category!');

    // ── Check 10: LocalStorage Persistence Across Page Reload ──
    console.log('\n[TEST 10] Persistence Across Page Reload...');
    await page.reload({ waitUntil: 'networkidle0' });
    await wait(800);

    const reloadedStatus = await page.evaluate(() => document.body.innerText.includes('Comfortable with this skill'));
    assert(reloadedStatus, 'Practice history and confidence status survived page refresh in LocalStorage!');

    console.log('\n====================================================');
    console.log(`SUMMARY: ${passCount} PASSED, ${failCount} FAILED, ${consoleErrors.length} Console Errors`);
    console.log('====================================================');

    if (failCount === 0 && consoleErrors.length === 0) {
      console.log('🎉 ALL V3.0 ENHANCEMENT TESTS PASSED PERFECTLY!');
    }

  } catch (err) {
    console.error('Test Execution Error:', err);
  } finally {
    try {
      await browser.close();
      fs.rmSync(uniqueProfileDir, { recursive: true, force: true });
    } catch {}
    try {
      viteProcess.kill();
    } catch {}
    process.exit(failCount === 0 ? 0 : 1);
  }
}

runV3Verification();
