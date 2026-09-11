/* =========================================================
   MyStudent — fotogalereya rasmlarini tayyorlash

   Ishlatish:
     1) rasmlar/<albom>/ jildlariga rasm tashlang
     2) node tools_foto.js

   Nima qiladi:
     - har rasmni ikki o'lchamda tayyorlaydi:
         kichik (400px)  — albom ichidagi to'r va muqova uchun
         katta  (1400px) — to'liq ekran ko'ruvchi uchun
     - natijani docs/foto/<albom>/ ga yozadi
     - server/db.json va data/fotolar.json dagi albomlarga
       suratlar ro'yxatini yozadi (soni ham o'zi hisoblanadi)

   Nega Chrome orqali: loyihada tashqi kutubxona ishlatilmaydi
   (sharp o'rnatish kerak bo'lardi). Chrome allaqachon bor —
   skrinshot vositasi uchun, shuning uchun canvas orqali
   kichraytiramiz. Sifat yetarli, fayl kichik.

   Yangi albom qo'shish: ALBOMLAR ro'yxatiga bitta qator.
   ========================================================= */
'use strict';

const fs   = require('fs');
const path = require('path');

/* albom id (db.json dagi) -> rasmlar jildi */
const ALBOMLAR = [
  { id: 'ph1', jild: 'bilimlar-kuni'    },
  { id: 'ph2', jild: 'it-olimpiada'     },
  { id: 'ph3', jild: 'talabalar-bahori' },
  { id: 'ph4', jild: 'hackathon'        },
  { id: 'ph5', jild: 'kutubxona'        },
  { id: 'ph6', jild: 'sport'            }
];

const KICHIK = 400;      /* to'r va muqova uchun */
const KATTA  = 1400;     /* to'liq ekran uchun */
const SIFAT  = 0.82;     /* JPEG sifati */

const ILDIZ   = __dirname;
const MANBA   = path.join(ILDIZ, 'rasmlar');
const CHIQISH = path.join(ILDIZ, 'docs', 'foto');
const TURLAR  = ['.jpg', '.jpeg', '.png', '.webp'];

const CHROME = process.env.CHROME_PATH ||
               'C:/Program Files/Google/Chrome/Application/chrome.exe';

/* ---------- yordamchilar ---------- */

function jildYasa(p){
  fs.mkdirSync(p, { recursive: true });
}

function rasmlarniTop(jild){
  if(!fs.existsSync(jild)) return [];
  return fs.readdirSync(jild)
    .filter(function(f){
      return TURLAR.indexOf(path.extname(f).toLowerCase()) !== -1;
    })
    .sort();          /* tartib nom bo'yicha — barqaror bo'lsin */
}

/* Rasmni brauzerda kichraytirib, JPEG bayt qatorini qaytaradi.

   Chrome sahifasida canvas ishlatiladi: rasm yuklanadi, kerakli
   o'lchamga siqiladi (nisbat saqlanadi), keyin data URL olinadi. */
async function kichraytir(page, faylYoli, kengMax){
  const bayt = fs.readFileSync(faylYoli);
  const tur  = path.extname(faylYoli).toLowerCase() === '.png'
             ? 'image/png' : 'image/jpeg';
  const dataUrl = 'data:' + tur + ';base64,' + bayt.toString('base64');

  const natija = await page.evaluate(async function(src, kengMax, sifat){
    const img = new Image();
    img.src = src;
    await img.decode();

    let k = img.naturalWidth, b = img.naturalHeight;

    /* kattaroq tomonni chegaraga tushiramiz; kichik rasm
       kattalashtirilmaydi — sifati yomonlashardi */
    const nisbat = Math.min(1, kengMax / Math.max(k, b));
    k = Math.round(k * nisbat);
    b = Math.round(b * nisbat);

    const c = document.createElement('canvas');
    c.width = k; c.height = b;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, k, b);

    return { url: c.toDataURL('image/jpeg', sifat), k: k, b: b };
  }, dataUrl, kengMax, SIFAT);

  const base64 = natija.url.split(',')[1];
  return { bayt: Buffer.from(base64, 'base64'), k: natija.k, b: natija.b };
}

function olcham(n){
  return n < 1024 ? n + ' B'
       : n < 1024 * 1024 ? (n / 1024).toFixed(0) + ' KB'
       : (n / 1024 / 1024).toFixed(1) + ' MB';
}

/* ---------- asosiy ---------- */

(async function(){
  /* umuman rasm bormi — bo'lmasa Chrome ochmaymiz */
  const bor = ALBOMLAR.some(function(a){
    return rasmlarniTop(path.join(MANBA, a.jild)).length > 0;
  });

  if(!bor){
    console.log('rasmlar/ jildlari bo\'sh — qo\'shiladigan surat yo\'q.');
    console.log('Rasmlarni rasmlar/<albom>/ ichiga tashlang, keyin');
    console.log('shu buyruqni qayta ishga tushiring. Tafsilot:');
    console.log('  rasmlar/OQING.md');
    process.exit(0);
  }

  let puppeteer;
  try{
    puppeteer = require('puppeteer-core');
  }catch(e){
    console.log('XATO: puppeteer-core topilmadi.');
    console.log('  npm i puppeteer-core');
    process.exit(1);
  }

  if(!fs.existsSync(CHROME)){
    console.log('XATO: Chrome topilmadi: ' + CHROME);
    console.log('  CHROME_PATH bilan yo\'lni ko\'rsating.');
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  const natija = {};      /* albom id -> suratlar ro'yxati */
  let jami = 0, jamiBayt = 0, aslBayt = 0;

  for(const albom of ALBOMLAR){
    const jild   = path.join(MANBA, albom.jild);
    const fayllar = rasmlarniTop(jild);

    if(!fayllar.length){
      natija[albom.id] = [];
      continue;
    }

    console.log('\n' + albom.jild + ' (' + fayllar.length + ' ta)');
    jildYasa(path.join(CHIQISH, albom.jild));

    const suratlar = [];
    let n = 0;

    for(const f of fayllar){
      n++;
      const manba = path.join(jild, f);
      const nom   = String(n).padStart(3, '0');

      try{
        const kichik = await kichraytir(page, manba, KICHIK);
        const katta  = await kichraytir(page, manba, KATTA);

        const kFayl = nom + '-k.jpg';
        const bFayl = nom + '.jpg';

        fs.writeFileSync(path.join(CHIQISH, albom.jild, kFayl), kichik.bayt);
        fs.writeFileSync(path.join(CHIQISH, albom.jild, bFayl), katta.bayt);

        suratlar.push({
          kichik: 'docs/foto/' + albom.jild + '/' + kFayl,
          katta:  'docs/foto/' + albom.jild + '/' + bFayl
        });

        const asl = fs.statSync(manba).size;
        aslBayt  += asl;
        jamiBayt += kichik.bayt.length + katta.bayt.length;
        jami++;

        console.log('  ok   ' + f + '  ' + olcham(asl) + ' -> ' +
                    olcham(katta.bayt.length) + ' (' + katta.k + '×' + katta.b + ')');
      }catch(e){
        console.log('  XATO ' + f + ': ' + e.message);
      }
    }

    natija[albom.id] = suratlar;
  }

  await browser.close();

  /* ---------- ma'lumot fayllarini yangilaymiz ---------- */
  const fayllar = [
    { yol: path.join(ILDIZ, 'server', 'db.json'),      kalit: 'fotolar' },
    { yol: path.join(ILDIZ, 'data', 'fotolar.json'),   kalit: 'fotolar' }
  ];

  fayllar.forEach(function(f){
    const d = JSON.parse(fs.readFileSync(f.yol, 'utf8'));
    const royxat = d[f.kalit];
    if(!Array.isArray(royxat)) return;

    royxat.forEach(function(albom){
      const s = natija[albom.id];
      if(!s) return;

      if(s.length){
        albom.suratlar = s;
        albom.soni = s.length;      /* ro'yxatdagi son haqiqiy bo'lsin */
      }else{
        /* rasm qo'shilmagan albomda eski holat qoladi */
        delete albom.suratlar;
      }
    });

    fs.writeFileSync(f.yol, JSON.stringify(d, null, 2) + '\n', 'utf8');
    console.log('\nyangilandi: ' + path.relative(ILDIZ, f.yol));
  });

  console.log('\n' + jami + ' ta surat tayyor.');
  if(jami){
    console.log('asl hajm: ' + olcham(aslBayt) + '  ->  ilovada: ' + olcham(jamiBayt));
    console.log('\nKeyingi qadam:');
    console.log('  node tools_check.js');
    console.log('  git add -A && git commit -m "Fotogalereya rasmlari" && git push');
  }
})();
