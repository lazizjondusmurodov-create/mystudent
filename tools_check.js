/* =========================================================
   Loyihani tekshirish — chiqarishdan oldin ishga tushiring:
     node tools_check.js

   Nimani tekshiradi:
     - index.html va sw.js dagi ?v= raqamlari mos kelishini
     - sw.js keshlaydigan fayllar haqiqatan mavjudligini
     - manifest.json va undagi ikonkalarni
     - tarjima kalitlari uchala tilda borligini
   ========================================================= */
const fs = require('fs');
const path = require('path');
const R = __dirname;
const o = (f) => fs.readFileSync(path.join(R, f), 'utf8');

let xato = 0;
const OK   = (m) => console.log('  ok   ' + m);
const XATO = (m) => { console.log('  XATO ' + m); xato++; };

console.log('\n1) Versiya raqamlari');
const html = o('index.html');
const sw   = o('sw.js');
const htmlV = [...html.matchAll(/(?:style\.css|app\.js)\?v=([\d.]+)/g)].map(m => m[1]);
const swV   = [...sw.matchAll(/(?:style\.css|app\.js)\?v=([\d.]+)/g)].map(m => m[1]);

if (!htmlV.length) XATO('index.html da ?v= topilmadi');
else if (new Set(htmlV).size !== 1) XATO('index.html ichida versiyalar har xil: ' + htmlV.join(', '));
else OK('index.html versiyasi: ' + htmlV[0]);

if (!swV.length) XATO('sw.js da ?v= topilmadi');
else if (new Set([...htmlV, ...swV]).size !== 1)
  XATO('sw.js (' + swV.join(',') + ') index.html (' + htmlV.join(',') + ') bilan mos emas — offline buziladi');
else OK('sw.js versiyasi mos');

console.log('\n2) sw.js keshlaydigan fayllar mavjudmi');
[...sw.matchAll(/'\.\/([^']*)'/g)].map(m => m[1]).filter(Boolean).forEach(f => {
  const toza = f.split('?')[0];
  if (!toza) return;
  fs.existsSync(path.join(R, toza)) ? OK(f) : XATO(f + ' — fayl yo\'q');
});

console.log('\n3) manifest.json');
try {
  const man = JSON.parse(o('manifest.json'));
  OK('JSON to\'g\'ri');
  man.icons.forEach(i => {
    fs.existsSync(path.join(R, i.src)) ? OK('ikonka ' + i.src) : XATO('ikonka yo\'q: ' + i.src);
  });
} catch (e) { XATO('manifest.json o\'qilmadi: ' + e.message); }

console.log('\n4) Tarjimalar uchala tilda');
const qatorlar = o('app.js').split('\n');

/* I18N ichidagi til bloklarini qator raqami bo'yicha ajratamiz:
   "  uz:{" dan keyingi "  ru:{" gacha — shu tilning kalitlari. */
const boshlar = [];
qatorlar.forEach((q, i) => {
  const m = q.match(/^  (uz|ru|en):\{/);
  if (m) boshlar.push({ til: m[1], i: i });
});
const oxirgi = boshlar.length ? boshlar[boshlar.length - 1].i : -1;
const i18nOxir = qatorlar.findIndex((q, i) => q === '};' && i > oxirgi);

const blok = { uz:null, ru:null, en:null };
boshlar.forEach((b, n) => {
  const oxir = (n + 1 < boshlar.length) ? boshlar[n + 1].i : i18nOxir;
  const matn = qatorlar.slice(b.i, oxir).join('\n');
  /* kalit nomlari: qator boshida yoki vergul/qavsdan keyin */
  const kalitlar = [...matn.matchAll(/(?:^|[{,])\s*(\w+)\s*:/gm)].map(x => x[1]);
  /* blokning o'z nomi (uz/ru/en) kalit emas — chiqarib tashlaymiz */
  blok[b.til] = new Set(kalitlar.filter(k => k !== b.til));
});

if (!blok.uz || !blok.ru || !blok.en) XATO('til bloklari ajratilmadi');
else {
  const yetishmayotgan = [];
  blok.uz.forEach(k => {
    ['ru','en'].forEach(t => { if (!blok[t].has(k)) yetishmayotgan.push(t + ' → ' + k); });
  });
  if (yetishmayotgan.length) {
    XATO('tarjima yetishmaydi: ' + yetishmayotgan.slice(0,12).join(', ') +
         (yetishmayotgan.length > 12 ? ' (+' + (yetishmayotgan.length - 12) + ' ta)' : ''));
  } else OK('uz/ru/en kalitlari to\'liq (' + blok.uz.size + ' ta)');
}

console.log(xato ? '\n' + xato + ' ta muammo topildi\n' : '\nHammasi joyida\n');
process.exit(xato ? 1 : 0);
