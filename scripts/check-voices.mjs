import puppeteer from 'puppeteer-core';
import os from 'os';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function checkVoices() {
  const tmpDir = path.join(os.tmpdir(), 'chrome-test-' + Math.floor(Math.random() * 100000));
  fs.mkdirSync(tmpDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: [
      `--user-data-dir=${tmpDir}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--remote-debugging-port=0'
    ]
  });

  const page = await browser.newPage();
  await page.goto('about:blank');

  const voices = await page.evaluate(async () => {
    return new Promise(resolve => {
      let v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        resolve(v.map(item => ({ name: item.name, lang: item.lang, default: item.default })));
        return;
      }
      window.speechSynthesis.onvoiceschanged = () => {
        v = window.speechSynthesis.getVoices();
        resolve(v.map(item => ({ name: item.name, lang: item.lang, default: item.default })));
      };
      setTimeout(() => {
        resolve(window.speechSynthesis.getVoices().map(item => ({ name: item.name, lang: item.lang })));
      }, 2000);
    });
  });

  console.log('Available voices in Chrome (' + voices.length + '):');
  console.log(JSON.stringify(voices, null, 2));

  await browser.close();
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch {}
}

checkVoices();
