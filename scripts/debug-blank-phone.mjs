import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function debug() {
  console.log('1. Spawning Vite dev server...');
  const vite = spawn('npm.cmd', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '5173'], {
    shell: true,
    stdio: 'pipe'
  });

  vite.stdout.on('data', d => {
    const s = d.toString();
    if (s.includes('Local:')) console.log('   Vite is live:', s.trim());
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

    page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    console.log('3. Loading app at http://127.0.0.1:5173/...');
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });

    // Step 1: Click "Let's Start"
    console.log('4. Clicking start on Welcome...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const start = btns.find(b => b.innerText.includes("Let's Start") || b.innerText.includes("شروع"));
      if (start) start.click();
    });
    await wait(800);

    // Step 2: In Fear Map, select the first concern (wrong_button)
    console.log('5. Selecting concern on Fear Map...');
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('[role="checkbox"]'));
      if (cards[0]) cards[0].click();
      const btns = Array.from(document.querySelectorAll('button'));
      const cont = btns.find(b => b.innerText.includes("Continue") || b.innerText.includes("جاری"));
      if (cont) cont.click();
    });
    await wait(800);

    // Step 3: In Recommendation, click Start Practice
    console.log('6. Clicking Start Practice on Recommendation...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const start = btns.find(b => b.innerText.includes("Start Practice") || b.innerText.includes("مشق شروع"));
      if (start) start.click();
    });
    await wait(800);

    // Step 4: In Practice Intro, click "Try with me (Guided practice)"
    console.log('7. Selecting Guided Practice in Practice Intro...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const guided = btns.find(b => b.innerText.includes("Try with me") || b.innerText.includes("Guided"));
      if (guided) guided.click();
    });
    await wait(1200);

    // Step 5: Inspect Guided Practice Screen & Simulated Phone
    console.log('8. Inspecting Guided Practice Screen & Phone elements...');
    const domInspection = await page.evaluate(() => {
      const chassis = document.querySelector('.phone-chassis');
      const screen = document.querySelector('.phone-screen');
      const chatHeader = document.querySelector('.phone-chat-header');
      const messagesArea = document.querySelector('.phone-messages-area');
      const inputBar = document.querySelector('.phone-input-bar');
      const maps = document.querySelector('.maps-container');
      const gallery = document.querySelector('.gallery-container');
      const allPhoneElements = screen ? Array.from(screen.querySelectorAll('*')).map(el => ({
        tag: el.tagName,
        className: el.className,
        text: el.innerText ? el.innerText.substring(0, 30) : ''
      })) : [];

      return {
        screenExists: !!screen,
        screenChildrenCount: screen ? screen.children.length : 0,
        chatHeaderExists: !!chatHeader,
        messagesAreaExists: !!messagesArea,
        inputBarExists: !!inputBar,
        mapsExists: !!maps,
        galleryExists: !!gallery,
        allPhoneElements
      };
    });

    console.log('DOM Inspection Result:\n', JSON.stringify(domInspection, null, 2));

    await page.screenshot({ path: 'public/debug_guided_phone.png' });
    console.log('Saved debug screenshot to public/debug_guided_phone.png');

    await browser.close();
  } finally {
    vite.kill();
  }
}

debug().catch(console.error);
