/* =========================================================
   Skrinshot olish vositasi — docs/ jildidagi rasmlarni yangilaydi.

   Ishlatish:
     1) npm i puppeteer-core
     2) python -m http.server 8899        (loyiha ildizida)
     3) node tools_shot.js

   Har bir sahifa uchun: qaysi tab ochiladi va qaysi
   data-key tugmasi bosiladi — pastdagi SAHIFALAR ro'yxatida.
   ========================================================= */
const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT    = path.join(__dirname, 'docs');
const BASE   = process.env.BASE_URL || 'http://localhost:8899';

const SAHIFALAR = [
  { fayl:'home',      tab:'home'                   },
  { fayl:'jadval',    tab:'home',    key:'jadval'  },
  { fayl:'baholar',   tab:'home',    key:'_grades' },
  { fayl:'davomat',   tab:'home',    key:'davomat' },
  { fayl:'imtihon',   tab:'home',    key:'_exams'  },
  { fayl:'kutubxona', tab:'kutubxona'              },
  { fayl:'karyera',   tab:'karyera'                },
  { fayl:'rezyume',   tab:'karyera', key:'rezyume' },
  { fayl:'foto',      tab:'karyera', key:'foto'    },
  { fayl:'kabinet',   tab:'kabinet'                }
];

const kut = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--hide-scrollbars']
  });

  let xato = 0;
  for (const s of SAHIFALAR) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 800, deviceScaleFactor: 2 });
    try {
      await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle2', timeout: 30000 });

      /* ma'lumotlar API'dan yuklanishini kutamiz */
      await page.waitForFunction(() => !document.getElementById('boot'), { timeout: 15000 });

      /* hali kirmagan bo'lsa — namuna kodi bilan kiramiz.
         Kirgandan keyin sessiya localStorage'da qoladi, shuning uchun shartli. */
      const kirishKerak = await page.$('[data-demo]');
      if (kirishKerak) {
        await page.click('[data-demo]');
        await kut(900);
      }

      /* har bir skrinshot bosh ekrandan boshlansin */
      await page.waitForSelector('.tab[data-tab="home"]', { timeout: 10000 });
      await page.click('.tab[data-tab="home"]');
      await kut(400);

      if (s.tab !== 'home') {
        await page.click(`.tab[data-tab="${s.tab}"]`);
        await kut(600);
      }

      if (s.key) {
        await page.waitForSelector(`[data-key="${s.key}"]`, { timeout: 10000 });
        await page.click(`[data-key="${s.key}"]`);
        await kut(1000);
      }

      /* toast xabari ("Xush kelibsiz!") kontentni to'smasin */
      await page.waitForFunction(
        () => { const t = document.getElementById('toast'); return !t || !t.classList.contains('is-on'); },
        { timeout: 6000 }
      ).catch(() => {});

      await kut(400);
      await page.screenshot({ path: path.join(OUT, `${s.fayl}.png`) });
      console.log(`OK   ${s.fayl}.png`);
    } catch (e) {
      console.log(`XATO ${s.fayl}: ${e.message.split('\n')[0]}`);
      xato++;
    }
    await page.close();
  }

  await browser.close();
  console.log(xato ? `\n${xato} ta xato` : '\nHammasi tayyor');
  process.exit(xato ? 1 : 0);
})();
