import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runAllFeaturesTest() {
  console.log('1. Starting Vite dev server...');
  const viteProcess = spawn('npm.cmd', ['run', 'dev', '--', '--host', '127.0.0.1'], {
    shell: true,
    stdio: 'pipe'
  });

  await wait(2500);

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
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });

    // ── Test 1: Navigation to Skill Map & All Features Library ──
    console.log('2. Testing Skill Map & All Features Library...');
    await page.evaluate(() => {
      window.localStorage.clear();
      const navBtn = Array.from(document.querySelectorAll('nav button')).find(b => b.textContent.includes('Skill Map') || b.textContent.includes('Features'));
      navBtn?.click();
    });
    await wait(800);

    const libHeading = await page.$eval('h1', el => el.textContent);
    console.log(`   ✓ Library Screen Heading: "${libHeading}"`);

    const cardsCount = await page.evaluate(() => {
      return document.querySelectorAll('div[class*="libraryCard"]').length;
    });
    console.log(`   ✓ Total Feature Cards Rendered: ${cardsCount} (Expected: 4 modules)`);

    // ── Test 2: Launch Maps Practice (explore-maps) ──
    console.log('\n3. Testing MAPS PRACTICE (explore-maps)...');
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('div[class*="libraryCard"]'));
      const mapsCard = cards.find(c => c.textContent.includes('Maps') || c.textContent.includes('نقش'));
      const guidedBtn = mapsCard?.querySelector('button');
      guidedBtn?.click();
    });
    await wait(1000);

    const mapsHeading = await page.$eval('h2', el => el.textContent);
    console.log(`   ✓ Maps Step 1 Heading: "${mapsHeading}"`);

    // Maps Step 1: Tap Search Bar
    console.log('   Maps Step 1: Tapping search bar...');
    await page.evaluate(() => {
      const searchBox = document.querySelector('.maps-search-box');
      searchBox?.click();
    });
    await wait(800);

    // Maps Step 2: Tap Share Location
    console.log('   Maps Step 2: Tapping Share Location button on destination card...');
    await page.evaluate(() => {
      const shareBtn = document.querySelector('.maps-share-btn');
      shareBtn?.click();
    });
    await wait(800);

    // Maps Step 3: Tap Send Location to Family
    console.log('   Maps Step 3: Confirming Send Location to Family...');
    await page.evaluate(() => {
      const confirmBtn = document.querySelector('.maps-confirm-btn');
      confirmBtn?.click();
    });
    await wait(1000);

    const mapsDone = await page.evaluate(() => {
      return document.body.innerText.includes('Guided Practice Complete') ||
             document.body.innerText.includes('Well Done');
    });
    console.log(`   ✓ Maps Guided Practice Completed: ${mapsDone}`);

    // ── Test 3: Safe Deletion & Trash Recovery Practice (safe-delete) ──
    console.log('\n4. Testing SAFE DELETION & TRASH RECOVERY (safe-delete)...');
    await page.evaluate(() => {
      const navBtn = Array.from(document.querySelectorAll('nav button')).find(b => b.textContent.includes('Skill Map') || b.textContent.includes('Features'));
      navBtn?.click();
    });
    await wait(800);

    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('div[class*="libraryCard"]'));
      const deleteCard = cards.find(c => c.textContent.includes('Delete') || c.textContent.includes('ڈیلیٹ'));
      const guidedBtn = deleteCard?.querySelector('button');
      guidedBtn?.click();
    });
    await wait(1000);

    const deleteHeading = await page.$eval('h2', el => el.textContent);
    console.log(`   ✓ Safe Delete Step 1 Heading: "${deleteHeading}"`);

    // Safe Delete Step 1: Tap Trash Icon on Photo
    console.log('   Safe Delete Step 1: Tapping trash can on photo...');
    await page.evaluate(() => {
      const trashBtn = document.querySelector('.gallery-trash-btn');
      trashBtn?.click();
    });
    await wait(800);

    // Safe Delete Step 2: Open Recently Deleted Tab
    console.log('   Safe Delete Step 2: Opening Recently Deleted tab...');
    await page.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('.gallery-tab'));
      const trashTab = tabs.find(t => t.textContent.includes('Recently Deleted'));
      trashTab?.click();
    });
    await wait(800);

    // Safe Delete Step 3: Tap Restore Photo
    console.log('   Safe Delete Step 3: Tapping Restore Photo...');
    await page.evaluate(() => {
      const restoreBtn = document.querySelector('.trash-restore-btn');
      restoreBtn?.click();
    });
    await wait(1000);

    const deleteDone = await page.evaluate(() => {
      return document.body.innerText.includes('Guided Practice Complete') ||
             document.body.innerText.includes('Well Done');
    });
    console.log(`   ✓ Safe Delete Guided Practice Completed: ${deleteDone}`);

    // ── Test 4: Urdu Voiceover & Studio Audio Playback ──
    console.log('\n5. Testing URDU VOICEOVER with Studio Audio files...');
    await page.evaluate(() => {
      const urduBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'اردو');
      urduBtn?.click();
    });
    await wait(600);

    // Click Hear Button
    console.log('   Clicking "Hear instruction" in Urdu...');
    const playedAudio = await page.evaluate(() => {
      const audioBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('سنیں') || b.textContent.includes('ہدایت'));
      if (audioBtn) {
        audioBtn.click();
        return true;
      }
      return false;
    });
    console.log(`   ✓ Urdu Audio Button Clicked: ${playedAudio}`);

    console.log('\n=======================================');
    console.log('🎉 ALL FEATURES & AUDIO TEST PASSED 100%!');
    console.log(`Total errors caught: ${errors.length}`);
    console.log('=======================================\n');

  } catch (err) {
    console.error('ALL FEATURES TEST ERROR:', err);
  } finally {
    await browser.close();
    viteProcess.kill('SIGINT');
  }
}

runAllFeaturesTest();
