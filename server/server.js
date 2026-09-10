/* =========================================================
   MyStudent — backend server

   Ishga tushirish:
     node server/server.js
   So'ng brauzerda:  http://localhost:3000

   Hech qanday tashqi kutubxona kerak emas — faqat Node.js.
   Ma'lumotlar server/db.json faylida saqlanadi.

   Endpointlar:
     POST /api/login            {kod}          -> {token, talaba}
     GET  /api/men              (token kerak)  -> {talaba}
     GET  /api/talabalar        (token kerak)  -> {talabalar}
     GET  /api/demo                            -> {demo} (namuna kodlari)
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
   ========================================================= */
'use strict';

const http = require('http');
const fs   = require('fs');
const path = require('path');
const crypto = require('crypto');

const baza = require('./baza');

const PORT = process.env.PORT || 3000;
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

    const kod = String(tana.kod || '').trim();
    if(!kod) return xato(res, 400, 'Kod kiritilmadi');

    const talaba = d.talabalar.find(function(t){ return t.kod === kod; });
    if(!talaba) return xato(res, 401, 'Kod noto\'g\'ri');

    /* kodni javobda qaytarmaymiz */
    const ochiq = Object.assign({}, talaba);
    delete ochiq.kod;

    return json(res, 200, { token: tokenYarat(kod), talaba: ochiq });
  }

  /* --- namuna kodlari (demo ilova uchun) ---
     Haqiqiy tizimda bu endpoint BO'LMAYDI: kirish kodlari
     hech qachon ochiq ko'rsatilmaydi. Bu faqat namoyish uchun. */
  if(yol === '/api/demo'){
    return json(res, 200, {
      demo: d.talabalar.map(function(t){
        return { kod: t.kod, name: t.name, group: t.group };
      })
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

  const men = d.talabalar.find(function(t){ return t.kod === kod; });
  if(!men) return xato(res, 401, 'Talaba topilmadi');

  if(yol === '/api/men'){
    const ochiq = Object.assign({}, men);
    delete ochiq.kod;
    return json(res, 200, { talaba: ochiq });
  }

  /* Ilova kirish kodiga qarab talabani topadi, shuning uchun
     ro'yxat kod bilan qaytadi — faqat kirgan foydalanuvchiga. */
  if(yol === '/api/talabalar') return json(res, 200, { talabalar: d.talabalar });

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
      holat: 'kutilmoqda',
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
  console.log('');
  console.log('  To\'xtatish: Ctrl+C');
  console.log('');
});
}
