/* =========================================================
   MyStudent — backend server

   Ishga tushirish:
     node server/server.js
   So'ng brauzerda:  http://localhost:3000

   Hech qanday tashqi kutubxona kerak emas — faqat Node.js.
   Ma'lumotlar server/db.json faylida saqlanadi.

   Endpointlar:
     POST /api/login            {telefon}      -> {token, talaba}
     POST /api/login            {kod}          -> {token, talaba}
     GET  /api/men              (token kerak)  -> {talaba}
     GET  /api/talabalar        (token kerak)  -> {talabalar}
     GET  /api/demo                            -> {demo} (namuna ro'yxati)
     GET  /api/jadval           (token kerak)  -> {semestrlar, darslar}
     GET  /api/imtihonlar       (token kerak)
     GET  /api/davomat          (token kerak)
     GET  /api/baholar          (token kerak)
     GET  /api/yangiliklar
     GET  /api/kutubxona
     GET  /api/ishlar
     GET  /api/qarzdorlik       (token kerak)
     GET  /api/fotolar
     GET  /api/yotoqxona        (token kerak)
     POST /api/arizalar         (token kerak)  -> yangi ariza qo'shadi
     GET  /api/salom                           -> hayot belgisi

     Dekanat (DEKANAT_KODI bilan kirgan):
     GET  /api/dekanat/arizalar                -> barcha arizalar
     POST /api/dekanat/holat    {id, holat}    -> qabul / rad etish

   Muhit o'zgaruvchilari:
     PORT           — port (odatiy 3000)
     DATABASE_URL   — PostgreSQL; bo'lmasa db.json ishlatiladi
     DEMO           — 'off' bo'lsa namuna ro'yxati ko'rsatilmaydi
     DEKANAT_KODI   — dekanat kirish kodi (odatiy 9999)
     KOD_KIRISH     — 'off' bo'lsa 4 xonali kod bilan kirish o'chadi
   ========================================================= */
'use strict';

const http = require('http');
const fs   = require('fs');
const path = require('path');
const crypto = require('crypto');

const baza  = require('./baza');
const raqamlar = require('./raqam');

const PORT = process.env.PORT || 3000;

/* Namuna (demo) rejimi: kirish kodlari ilovada ochiq ko'rsatiladimi.
   Haqiqiy foydalanishda hostingda DEMO=off qo'ying. */
const DEMO_YONIQ = String(process.env.DEMO || 'on').toLowerCase() !== 'off';

/* Dekanat (admin) kirish kodi. Bu koddan kirgan foydalanuvchi barcha
   talabalarning arizalarini ko'radi va ularga javob beradi.
   Hostingda DEKANAT_KODI bilan almashtiring — odatiy qiymat hammaga
   ma'lum va faqat namoyish uchun. */
const DEKANAT_KODI = String(process.env.DEKANAT_KODI || '9999');

/* 4 xonali kod bilan kirish yoqilganmi.

   Asosiy usul — telefon raqam. Kod usuli eski qurilmalarda
   saqlanib qolgan sessiyalar uchun qoldirilgan; keraksiz bo'lsa
   KOD_KIRISH=off qo'ying.

   Dekanat kodi bunga bog'liq emas — u har doim ishlaydi. */
const KOD_BILAN_KIRISH = String(process.env.KOD_KIRISH || 'on').toLowerCase() !== 'off';

/* ---------- kirish urinishlari chegarasi ----------

   Kirish faqat telefon raqam bilan bo'lgani uchun himoya yo'q:
   raqamni bilgan odam kabinetga kiradi. Chegara mavjud raqamlarni
   ketma-ket terib qidirishni sekinlashtiradi, xolos.

   Bitta manbadan ketma-ket 5 marta topilmagan raqam kiritilsa,
   o'sha raqam 15 daqiqaga bloklanadi. Muvaffaqiyatli kirishdan
   keyin hisob tozalanadi.

   Xotirada saqlanadi: server qayta ishga tushsa tozalanadi. */
const URINISHLAR = new Map();      /* raqam -> {soni, vaqt} */
const CHEGARA = 5;
const BLOK_VAQTI = 15 * 60 * 1000;

/* Necha urinish qolgani. 0 — bloklangan. */
function urinishTekshir(raqam){
  const y = URINISHLAR.get(raqam);
  if(!y) return CHEGARA;
  if(Date.now() - y.vaqt > BLOK_VAQTI){
    URINISHLAR.delete(raqam);      /* muddat o'tdi */
    return CHEGARA;
  }
  return Math.max(0, CHEGARA - y.soni);
}

function urinishQoshildi(raqam){
  const y = URINISHLAR.get(raqam);
  if(y && Date.now() - y.vaqt <= BLOK_VAQTI){
    y.soni++;
    y.vaqt = Date.now();
  }else{
    URINISHLAR.set(raqam, { soni: 1, vaqt: Date.now() });
  }
}

function urinishTozala(raqam){ URINISHLAR.delete(raqam); }

/* Eski yozuvlarni vaqti-vaqti bilan tozalaymiz, aks holda
   xotira o'sib boraveradi. */
setInterval(function(){
  const hozir = Date.now();
  URINISHLAR.forEach(function(y, k){
    if(hozir - y.vaqt > BLOK_VAQTI) URINISHLAR.delete(k);
  });
}, BLOK_VAQTI).unref();
const ROOT = path.join(__dirname, '..');     /* loyiha ildizi */
const DB   = path.join(__dirname, 'db.json');

/* ---------- ma'lumotlar bazasi (JSON fayl) ----------

   Bulutli hostingda (Render, Railway) disk vaqtinchalik:
   yozilgan narsa server qayta ishga tushganda yo'qoladi, ba'zan
   esa disk umuman faqat o'qish uchun bo'ladi. Shuning uchun
   ma'lumotni xotirada ham saqlaymiz va yozish xatosi serverni
   qulatmasin — ariza baribir qabul qilinadi, faqat vaqtinchalik. */
let XOTIRA = null;          /* yozishdan keyingi holat */
let DISK_YOZILADI = true;   /* birinchi xatodan keyin false bo'ladi */

function dbOqi(){
  if(XOTIRA) return XOTIRA;
  return JSON.parse(fs.readFileSync(DB, 'utf8'));
}
function dbYoz(d){
  XOTIRA = d;               /* har doim xotirada yangilanadi */
  if(!DISK_YOZILADI) return;
  try{
    fs.writeFileSync(DB, JSON.stringify(d, null, 2), 'utf8');
  }catch(e){
    DISK_YOZILADI = false;
    console.warn('db.json ga yozilmadi (' + e.code + ') — ' +
                 'malumot faqat xotirada saqlanadi');
  }
}

/* ---------- tokenlar (xotirada) ----------
   Haqiqiy tizimda JWT yoki bazadagi sessiya ishlatiladi.
   Server qayta ishga tushsa — tokenlar yo'qoladi, bu normal. */
const TOKENLAR = new Map();   /* token -> {kod, vaqt} */
const TOKEN_UMRI = 30 * 24 * 60 * 60 * 1000;   /* 30 kun */

function tokenYarat(kod){
  const token = crypto.randomBytes(24).toString('hex');
  TOKENLAR.set(token, { kod: kod, vaqt: Date.now() });
  return token;
}

function tokenTekshir(req){
  const h = req.headers['authorization'] || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : '';
  const yozuv = TOKENLAR.get(token);
  if(!yozuv) return null;
  if(Date.now() - yozuv.vaqt > TOKEN_UMRI){
    TOKENLAR.delete(token);
    return null;
  }
  return yozuv.kod;
}

/* ---------- javob yordamchilari ---------- */
function json(res, kod, obj){
  const body = JSON.stringify(obj);
  res.writeHead(kod, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    /* brauzer boshqa portdan so'rasa ham ishlasin */
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  });
  res.end(body);
}

const xato = (res, kod, xabar) => json(res, kod, { xato: xabar });

function tanaOqi(req){
  return new Promise(function(resolve, reject){
    let s = '';
    req.on('data', function(c){
      s += c;
      if(s.length > 1e6) reject(new Error('juda katta'));
    });
    req.on('end', function(){
      if(!s) return resolve({});
      try{ resolve(JSON.parse(s)); }catch(e){ reject(new Error('JSON emas')); }
    });
    req.on('error', reject);
  });
}

/* ---------- statik fayllar (ilovaning o'zi) ---------- */
const TURLAR = {
  '.html':'text/html; charset=utf-8', '.js':'application/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8',   '.json':'application/json; charset=utf-8',
  '.png':'image/png', '.svg':'image/svg+xml', '.ico':'image/x-icon',
  '.jpg':'image/jpeg', '.webmanifest':'application/manifest+json',
  '.txt':'text/plain; charset=utf-8', '.xml':'application/xml; charset=utf-8'
};

function statik(req, res, yol){
  let f = yol === '/' ? '/index.html' : yol;
  /* xavfsizlik: loyiha jildidan tashqariga chiqib bo'lmasin */
  const toliq = path.normalize(path.join(ROOT, decodeURIComponent(f)));
  if(!toliq.startsWith(ROOT)) return xato(res, 403, 'Ruxsat yo\'q');

  fs.readFile(toliq, function(e, buf){
    if(e){
      /* topilmasa — 404 sahifasi */
      fs.readFile(path.join(ROOT, '404.html'), function(e2, b404){
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(e2 ? 'Topilmadi' : b404);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': TURLAR[path.extname(toliq)] || 'application/octet-stream' });
    res.end(buf);
  });
}

/* ---------- API marshrutlari ---------- */
async function api(req, res, yol){
  const d = dbOqi();

  /* --- kirish --- */
  if(yol === '/api/login' && req.method === 'POST'){
    let tana;
    try{ tana = await tanaOqi(req); }
    catch(e){ return xato(res, 400, 'So\'rov noto\'g\'ri'); }

    /* --- USUL 1: telefon raqam (asosiy usul) ---

       Parol so'ralmaydi: raqamning o'zi kirish kaliti. Ya'ni
       raqamni bilgan odam o'sha talabaning kabinetiga kira oladi. */
    if(tana.telefon){
      const raqam = raqamlar.raqamTozala(tana.telefon);

      if(!raqam) return xato(res, 400, 'Telefon raqam noto\'g\'ri');

      /* Mavjud raqamlarni ketma-ket terib qidirishni sekinlashtiradi */
      const qoldi = urinishTekshir(raqam);
      if(qoldi === 0){
        return xato(res, 429, 'Juda ko\'p urinish. ' +
                    Math.ceil(BLOK_VAQTI / 60000) + ' daqiqadan keyin urinib ko\'ring');
      }

      const talaba = d.talabalar.find(function(t){
        return raqamlar.raqamTeng(t.phone, raqam);
      });

      if(!talaba){
        urinishQoshildi(raqam);
        return xato(res, 401, 'Bu raqam ro\'yxatda topilmadi');
      }

      urinishTozala(raqam);

      const ochiq = Object.assign({}, talaba);
      delete ochiq.kod;

      return json(res, 200, {
        token: tokenYarat(talaba.kod),
        talaba: ochiq
      });
    }

    /* --- USUL 2: kirish kodi (eski usul, dekanat uchun ham) --- */
    const kod = String(tana.kod || '').trim();
    if(!kod) return xato(res, 400, 'Kod kiritilmadi');

    /* Dekanat kodi talabalar ro'yxatida bo'lmaydi — alohida yo'l.
       Token beriladi, lekin talaba ma'lumoti o'rniga dekanat belgisi. */
    if(kod === DEKANAT_KODI){
      return json(res, 200, { token: tokenYarat(kod), dekanat: true });
    }

    /* Kod bilan kirish o'chirilgan bo'lsa — faqat telefon qoladi */
    if(!KOD_BILAN_KIRISH){
      return xato(res, 403, 'Kod bilan kirish o\'chirilgan — ' +
                            'telefon raqam bilan kiring');
    }

    const talaba = d.talabalar.find(function(t){ return t.kod === kod; });
    if(!talaba) return xato(res, 401, 'Kod noto\'g\'ri');

    /* maxfiy maydonlarni javobda qaytarmaymiz */
    const ochiq = Object.assign({}, talaba);
    delete ochiq.kod;

    return json(res, 200, { token: tokenYarat(kod), talaba: ochiq });
  }

  /* --- namuna ro'yxati (demo ilova uchun) ---

     Bu endpoint kirish raqamlarini va kodlarini ochiq ko'rsatadi —
     namoyish uchun qulay, haqiqiy tizim uchun xavfli.

     O'chirish: hostingda DEMO=off muhit o'zgaruvchisini qo'ying.
     Shunda ro'yxat ham, ilovadagi "namuna" oynasi ham yo'qoladi
     va kirish faqat raqamni bilgan odam uchun qoladi. */
  if(yol === '/api/demo'){
    if(!DEMO_YONIQ) return json(res, 200, { demo: [] });
    return json(res, 200, {
      demo: d.talabalar.map(function(t){
        return { kod: t.kod, phone: t.phone, name: t.name, group: t.group };
      })
    });
  }

  /* --- hayot belgisi ---
     Bepul hostingda server 15 daqiqa harakatsizlikdan keyin uxlaydi
     va keyingi tashrifchi ~50 soniya kutadi. Tashqi xizmat (masalan
     cron-job.org) shu manzilni har 10 daqiqada so'rab tursa, server
     uyg'oq qoladi. Endpoint ataylab yengil: bazaga ham, diskka ham
     tegmaydi. */
  if(yol === '/api/salom'){
    return json(res, 200, {
      holat: 'ishlayapti',
      vaqt: new Date().toISOString(),
      baza: baza.BAZA_BOR ? 'ulangan' : 'yo\'q'
    });
  }

  /* --- ochiq ma'lumotlar (token shart emas) --- */
  if(yol === '/api/yangiliklar') return json(res, 200, { yangiliklar: d.yangiliklar });
  if(yol === '/api/kutubxona')   return json(res, 200, { kitoblar: d.kitoblar });
  if(yol === '/api/ishlar')      return json(res, 200, { ishlar: d.ishlar });
  if(yol === '/api/fotolar')     return json(res, 200, { fotolar: d.fotolar });

  /* --- bundan keyingilari token talab qiladi --- */
  const kod = tokenTekshir(req);
  if(!kod) return xato(res, 401, 'Avval tizimga kiring');

  /* --- DEKANAT yo'llari ---
     Talaba qidiruvidan OLDIN turadi: dekanat kodi talabalar
     ro'yxatida yo'q, aks holda quyidagi tekshiruv uni to'sib qo'yardi. */
  if(kod === DEKANAT_KODI){
    /* barcha talabalarning arizalari */
    if(yol === '/api/dekanat/arizalar'){
      const arizalar = baza.BAZA_BOR ? await baza.arizalarOl() : d.arizalar;
      return json(res, 200, { arizalar: arizalar, dekanat: true });
    }

    /* arizani qabul qilish yoki rad etish */
    if(yol === '/api/dekanat/holat' && req.method === 'POST'){
      let tana;
      try{ tana = await tanaOqi(req); }
      catch(e){ return xato(res, 400, 'So\'rov noto\'g\'ri'); }

      const id = String(tana.id || '').trim();
      const holat = String(tana.holat || '').trim();
      if(!id) return xato(res, 400, 'id kerak');
      if(holat !== 'ok' && holat !== 'no'){
        return xato(res, 400, 'holat "ok" yoki "no" bo\'lishi kerak');
      }

      const ozgarish = {
        holat: holat,
        sabab: String(tana.sabab || '').slice(0, 300),
        javobVaqti: new Date().toISOString()
      };

      if(baza.BAZA_BOR){
        const a = await baza.arizaHolat(id, ozgarish);
        if(!a) return xato(res, 404, 'Ariza topilmadi');
        return json(res, 200, { ariza: a });
      }

      const a = d.arizalar.find(function(x){ return x.id === id; });
      if(!a) return xato(res, 404, 'Ariza topilmadi');
      Object.assign(a, ozgarish);
      dbYoz(d);
      return json(res, 200, { ariza: a });
    }

    /* dekanat talaba emas — qolgan endpointlar unga tegishli emas */
    return xato(res, 403, 'Bu bo\'lim talabalar uchun');
  }

  const men = d.talabalar.find(function(t){ return t.kod === kod; });
  if(!men) return xato(res, 401, 'Talaba topilmadi');

  if(yol === '/api/men'){
    const ochiq = Object.assign({}, men);
    delete ochiq.kod;
    return json(res, 200, { talaba: ochiq });
  }

  /* Talabalar ro'yxati.

     Ilova kirgan talabani shu ro'yxatdan topadi, shuning uchun
     kirgan foydalanuvchining o'z yozuvi kod bilan qaytadi.
     Boshqalarniki kodsiz — birovning kodini bilib olish mumkin
     bo'lmasin. */
  if(yol === '/api/talabalar'){
    return json(res, 200, {
      talabalar: d.talabalar.map(function(t){
        const ochiq = Object.assign({}, t);
        if(t.kod !== kod) delete ochiq.kod;
        return ochiq;
      })
    });
  }

  if(yol === '/api/jadval')     return json(res, 200, { semestrlar: d.semestrlar, darslar: d.darslar });
  if(yol === '/api/imtihonlar') return json(res, 200, { imtihonlar: d.imtihonlar });
  if(yol === '/api/davomat')    return json(res, 200, { davomat: d.davomat });
  if(yol === '/api/baholar')    return json(res, 200, { baholar: d.baholar });
  if(yol === '/api/yotoqxona')  return json(res, 200, { yotoqxona: d.yotoqxona });

  if(yol === '/api/qarzdorlik'){
    /* Baza rejimida arizalar PostgreSQL dan keladi (doimiy saqlanadi),
       aks holda db.json dagi ro'yxatdan. */
    const arizalar = baza.BAZA_BOR ? await baza.arizalarOl() : d.arizalar;
    return json(res, 200, {
      yillar: d.yillar, akademik: d.akademik,
      arizalar: arizalar, shartnoma: d.shartnoma
    });
  }

  /* --- yangi ariza yuborish (yozish amali) --- */
  if(yol === '/api/arizalar' && req.method === 'POST'){
    let tana;
    try{ tana = await tanaOqi(req); }
    catch(e){ return xato(res, 400, 'So\'rov noto\'g\'ri'); }

    if(!tana.fan || !tana.turi) return xato(res, 400, 'fan va turi kerak');

    const yangi = {
      id: 'ar' + Date.now(),
      kod: kod,
      fan: String(tana.fan).slice(0, 120),
      turi: String(tana.turi).slice(0, 40),
      /* 'wait' — ilova shu nomni kutadi (app.js: holat === 'wait').
         Ilgari bu yerda 'kutilmoqda' yozilardi: yangi ariza dekanat
         panelida qabul/rad tugmasisiz chiqib qolardi. */
      holat: 'wait',
      sana: new Date().toISOString().slice(0, 10)
    };
    if(baza.BAZA_BOR){
      await baza.arizaQosh(yangi);
    }else{
      d.arizalar.unshift(yangi);
      dbYoz(d);
    }
    return json(res, 201, { ariza: yangi });
  }

  return xato(res, 404, 'Bunday endpoint yo\'q');
}

/* ---------- server ---------- */
const server = http.createServer(function(req, res){
  const yol = (req.url || '/').split('?')[0];

  /* brauzerning oldindan so'rovi (CORS) */
  if(req.method === 'OPTIONS'){
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    });
    return res.end();
  }

  if(yol.startsWith('/api/')){
    api(req, res, yol).catch(function(e){
      console.error('API xatosi:', e);
      xato(res, 500, 'Server xatosi');
    });
    return;
  }

  if(req.method !== 'GET') return xato(res, 405, 'Faqat GET');
  statik(req, res, yol);
});

/* 0.0.0.0 — barcha tarmoq interfeyslari.
   Bulutli hostinglar (Render, Railway) so'rovni tashqaridan
   yuboradi; faqat localhost tinglansa javob yetib bormaydi. */
/* Avval bazani tayyorlaymiz, keyin so'rov qabul qilamiz — aks holda
   birinchi so'rov jadval yaratilishidan oldin kelib qolishi mumkin.
   Baza ulanmasa server baribir ko'tariladi: ilova ochiladi, faqat
   arizalar vaqtinchalik bo'ladi. */
baza.tayyorla()
  .catch(function(e){
    /* Faqat ULANISH xatosi bazadan voz kechishga sabab bo'ladi. */
    console.warn('  Baza ulanmadi (' + e.message + ') — arizalar vaqtinchalik');
    baza.BAZA_BOR = false;
    return false;
  })
  .then(function(ulandi){
    if(!ulandi) return;
    /* Boshlang'ich ko'chirish yiqilsa baza baribir ishlaydi —
       bu faqat namuna ma'lumotni ko'chirish, ulanish emas. */
    return baza.boshlangichKochir(dbOqi().arizalar).catch(function(e){
      console.warn('  Boshlang\'ich ko\'chirish to\'liq bo\'lmadi: ' + e.message);
    });
  })
  .then(ishgaTushir, ishgaTushir);

function ishgaTushir(){
server.listen(PORT, '0.0.0.0', function(){
  console.log('');
  console.log('  MyStudent server ishga tushdi');
  console.log('  Ilova:  http://localhost:' + PORT);
  console.log('  API:    http://localhost:' + PORT + '/api/');
  console.log('  Namuna rejimi: ' + (DEMO_YONIQ
    ? 'YONIQ — namuna ro\'yxati ochiq (o\'chirish: DEMO=off)'
    : 'o\'chiq — namuna ro\'yxati ko\'rsatilmaydi'));
  console.log('');
  console.log('  To\'xtatish: Ctrl+C');
  console.log('');
});
}
