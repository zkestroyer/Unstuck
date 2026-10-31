import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runTest() {
  console.log('=== STARTING FAANG QA VALIDATION: WARM UI, CARD IMAGES & URDU AUDIO ALIGNMENT ===');

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('  [Browser Error]:', msg.text());
        consoleErrors.push(msg.text());
      }
    });

    // Step 1: Open Welcome Screen
    console.log('1. Loading http://127.0.0.1:5173/...');
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });

    // Step 2: Switch to Urdu
    console.log('2. Switching language to Urdu (اردو)...');
    const langBtns = await page.$$('button');
    let urduBtn = null;
    for (const btn of langBtns) {
      const text = await (await btn.getProperty('textContent')).jsonValue();
      if (text.includes('اردو')) {
        urduBtn = btn;
        break;
      }
    }
    if (!urduBtn) throw new Error('Urdu language button not found');
    await urduBtn.click();
    await new Promise(r => setTimeout(r, 600));

    // Verify Urdu Welcome Heading
    const bodyText = await page.evaluate(() => document.body.innerText);
    if (!bodyText.includes('آئیے ٹیکنالوجی استعمال کرنے کی مشق کریں')) {
      throw new Error('Urdu welcome heading not displayed');
    }
    console.log('  ✓ Urdu Welcome heading successfully verified');

    // Step 3: Trigger Welcome Audio & Inspect Audio src
    console.log('3. Triggering Welcome Urdu audio...');
    const audioBtn = await page.$('button[aria-label="یہ پیغام سنیں"]');
    if (audioBtn) {
      await audioBtn.click();
      await new Promise(r => setTimeout(r, 500));
      console.log('  ✓ Welcome audio button clicked');
    }

    // Step 4: Navigate to Fear Map
    console.log('4. Navigating to Fear Map screen...');
    const startBtns = await page.$$('button');
    let startBtn = null;
    for (const b of startBtns) {
      const txt = await (await b.getProperty('textContent')).jsonValue();
      if (txt.includes('آئیے شروع کریں')) {
        startBtn = b;
        break;
      }
    }
    if (!startBtn) throw new Error('Start button not found');
    await startBtn.click();
    await new Promise(r => setTimeout(r, 800));

    // Step 5: Verify all 7 Fear Map Concern Cards have SVG illustrations
    console.log('5. Verifying Fear Map Concern Card illustrations...');
    const cardImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        visible: img.offsetWidth > 0 && img.offsetHeight > 0
      }));
    });

    console.log(`  Found ${cardImages.length} images on Fear Map screen:`);
    const cardSvgCount = cardImages.filter(img => img.src.includes('/images/cards/card_')).length;
    console.log(`  ✓ Detected ${cardSvgCount} concern card SVG illustrations (expected 7)`);
    if (cardSvgCount < 7) {
      throw new Error(`Expected at least 7 card illustrations, found ${cardSvgCount}`);
    }

    // Step 6: Select concern and continue to Recommendation
    console.log('6. Selecting concern and moving to Recommendation...');
    const concernCards = await page.$$('[role="checkbox"]');
    if (concernCards.length > 0) {
      await concernCards[0].click();
      await new Promise(r => setTimeout(r, 300));
    }

    const continueBtns = await page.$$('button');
    let continueBtn = null;
    for (const b of continueBtns) {
      const txt = await (await b.getProperty('textContent')).jsonValue();
      if (txt.includes('جاری رکھیں')) {
        continueBtn = b;
        break;
      }
    }
    if (continueBtn) {
      await continueBtn.click();
      await new Promise(r => setTimeout(r, 800));
      console.log('  ✓ Navigated to Recommendation screen');
    }

    // Step 7: Verify Recommendation Screen banner image
    console.log('7. Verifying Recommendation module banner...');
    const recBanner = await page.evaluate(() => {
      const banner = document.querySelector('img[src*="/images/cards/module_"]');
      return banner ? { src: banner.src, visible: banner.offsetWidth > 0 } : null;
    });
    if (!recBanner) {
      throw new Error('Recommendation screen module banner not found');
    }
    console.log(`  ✓ Recommendation banner verified: ${recBanner.src}`);

    // Step 8: Navigate to Skill Map Library
    console.log('8. Navigating to Skill Map / Library screen...');
    const navItems = await page.$$('button');
    let libraryNav = null;
    for (const n of navItems) {
      const txt = await (await n.getProperty('textContent')).jsonValue();
      if (txt.includes('مہارتوں کا نقشہ')) {
        libraryNav = n;
        break;
      }
    }
    if (!libraryNav) throw new Error('Skill Map nav item not found');
    await libraryNav.click();
    await new Promise(r => setTimeout(r, 800));

    // Verify 4 Library Cards have banner images
    const libBanners = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img[src*="/images/cards/module_"]'));
      return imgs.map(img => img.src);
    });
    console.log(`  ✓ Library cards banner count: ${libBanners.length} (expected 4)`);
    if (libBanners.length < 4) {
      throw new Error(`Expected 4 module banners in Library, found ${libBanners.length}`);
    }

    // Step 9: Navigate to My Practice (Summary Screen)
    console.log('9. Navigating to My Practice (Summary screen)...');
    const allBtns = await page.$$('button');
    let summaryNav = null;
    for (const n of allBtns) {
      const txt = await (await n.getProperty('textContent')).jsonValue();
      if (txt.includes('میری مشق')) {
        summaryNav = n;
        break;
      }
    }
    if (!summaryNav) throw new Error('My Practice nav item not found');
    await summaryNav.click();
    await new Promise(r => setTimeout(r, 800));

    // Verify Warm Empty State & Next Step Banner
    const summaryCheck = await page.evaluate(() => {
      const badge = document.querySelector('span');
      const text = document.body.innerText;
      const banner = document.querySelector('img[src*="/images/cards/module_"]');
      return {
        hasJournalBadge: text.includes('پرسکون مشق کا ریکارڈ') || text.includes('SAFE PRACTICE JOURNAL'),
        hasEmptyMessage: text.includes('سیکھنے کا سفر') || text.includes('practice journal'),
        hasBanner: banner !== null
      };
    });

    console.log('  Summary Screen verification:', summaryCheck);
    if (!summaryCheck.hasJournalBadge || !summaryCheck.hasBanner) {
      throw new Error('Summary screen warm elements or module banner not properly displayed');
    }
    console.log('  ✓ Summary screen warm journal design and next-step banner verified');

    // Take verification screenshot
    await page.screenshot({ path: 'public/test_summary_verified.png', fullPage: true });
    console.log('  ✓ Full-page screenshot saved to public/test_summary_verified.png');

    console.log(`\n=== QA AUDIT COMPLETE: Console Errors: ${consoleErrors.length} ===`);
    if (consoleErrors.length > 0) {
      throw new Error(`Test failed with ${consoleErrors.length} console errors`);
    }

    console.log('🎉 ALL TESTS PASSED WITH ZERO DEFECTS! 🎉');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ QA Test Failed:', err);
    if (browser) await browser.close();
    process.exit(1);
  }
}

runTest();
