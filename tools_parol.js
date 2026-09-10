/* =========================================================
   MyStudent — talabalarga parol o'rnatish

   Ishlatish:

     node tools_parol.js                     — holatni ko'rsatadi
     node tools_parol.js 998901234567 parol  — bittasiga parol qo'yadi
     node tools_parol.js --hammasi           — hammasiga tasodifiy parol

   Parol HECH QACHON db.json ga ochiq yozilmaydi — faqat uning
   izi (hash) saqlanadi. Shuning uchun --hammasi bilan yaratilgan
   parollar faqat SHU YERDA, bir marta ko'rsatiladi. Ularni
   nusxalab, talabalarga tarqating: keyin tiklab bo'lmaydi.

   O'zgarishdan keyin GitHub'ga yuborish esdan chiqmasin:
     git add server/db.json && git commit -m "..." && git push
   ========================================================= */
'use strict';

const fs = require('fs');
const path = require('path');
const parol = require('./server/parol');

const DB = path.join(__dirname, 'server', 'db.json');
const d = JSON.parse(fs.readFileSync(DB, 'utf8'));

const arg = process.argv.slice(2);

/* Odam o'qishi oson, lekin taxminlash qiyin parol yasaydi.
   Chalkashadigan belgilar (0/O, 1/l/I) ishlatilmaydi. */
function parolYasa(){
  const harf = 'abcdefghjkmnpqrstuvwxyz';
  const katta = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const raqam = '23456789';
  const hammasi = harf + katta + raqam;
  const crypto = require('crypto');
  let s = '';
  /* kamida bittadan katta harf va raqam bo'lsin */
  s += katta[crypto.randomInt(katta.length)];
  s += raqam[crypto.randomInt(raqam.length)];
  for(let i = 0; i < 6; i++) s += hammasi[crypto.randomInt(hammasi.length)];
  /* aralashtiramiz */
  return s.split('').sort(function(){ return crypto.randomInt(3) - 1; }).join('');
}

function saqla(){
  fs.writeFileSync(DB, JSON.stringify(d, null, 2) + '\n', 'utf8');
}

/* ---------- holatni ko'rsatish ---------- */
if(!arg.length){
  console.log('Talabalar:\n');
  let yoq = 0;
  d.talabalar.forEach(function(t){
    const bor = !!t.parolIzi;
    if(!bor) yoq++;
    console.log('  ' + (bor ? '[parol bor]' : '[PAROL YO\'Q]') +
                '  ' + parol.raqamTozala(t.phone).padEnd(14) +
                '  ' + t.name);
  });
  console.log('\nJami: ' + d.talabalar.length + ' ta, ' +
              (yoq ? yoq + ' tasida parol yo\'q' : 'hammasida parol bor'));
  if(yoq){
    console.log('\nParol qo\'yish:');
    console.log('  node tools_parol.js <raqam> <parol>   — bittasiga');
    console.log('  node tools_parol.js --hammasi          — hammasiga tasodifiy');
  }
  process.exit(0);
}

/* ---------- hammasiga tasodifiy parol ---------- */
if(arg[0] === '--hammasi'){
  const yangilar = [];
  d.talabalar.forEach(function(t){
    if(t.parolIzi) return;              /* boricha qoladi */
    const p = parolYasa();
    t.parolIzi = parol.izYasa(p);
    yangilar.push({ raqam: parol.raqamTozala(t.phone), ism: t.name, parol: p });
  });

  if(!yangilar.length){
    console.log('Hammasida parol bor — o\'zgarish kerak emas.');
    console.log('Qayta o\'rnatish uchun raqam va parolni yozing.');
    process.exit(0);
  }

  saqla();

  console.log('\n=== PAROLLAR — BIR MARTA KO\'RSATILADI ===\n');
  yangilar.forEach(function(x){
    console.log('  ' + x.raqam.padEnd(14) + '  ' + x.parol.padEnd(10) + '  ' + x.ism);
  });
  console.log('\nShu ro\'yxatni nusxalab oling — qayta ko\'rsatilmaydi.');
  console.log('Talabalar kirgandan keyin parolni o\'zgartira oladi.\n');
  console.log('Endi yuboring:');
  console.log('  git add server/db.json && git commit -m "Parollar" && git push');
  process.exit(0);
}

/* ---------- bittasiga parol ---------- */
const raqam = parol.raqamTozala(arg[0]);
const yangi = arg[1];

if(!raqam){
  console.log('Telefon raqam noto\'g\'ri: ' + arg[0]);
  process.exit(1);
}
if(!yangi){
  console.log('Parol ko\'rsatilmadi.');
  console.log('Misol: node tools_parol.js ' + raqam + ' Talaba2026');
  process.exit(1);
}

const kamchilik = parol.parolTekshir(yangi);
if(kamchilik){
  console.log(kamchilik);
  process.exit(1);
}

const talaba = d.talabalar.find(function(t){ return parol.raqamTeng(t.phone, raqam); });
if(!talaba){
  console.log('Bu raqam bilan talaba topilmadi: ' + raqam);
  console.log('Mavjud raqamlar:');
  d.talabalar.forEach(function(t){
    console.log('  ' + parol.raqamTozala(t.phone) + '  ' + t.name);
  });
  process.exit(1);
}

const bor = !!talaba.parolIzi;
talaba.parolIzi = parol.izYasa(yangi);
saqla();

console.log((bor ? 'Parol almashtirildi' : 'Parol o\'rnatildi') + ': ' + talaba.name);
console.log('Raqam: ' + raqam);
console.log('\nEndi yuboring:');
console.log('  git add server/db.json && git commit -m "Parol" && git push');
