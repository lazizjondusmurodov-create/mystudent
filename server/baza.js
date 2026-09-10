/* =========================================================
   MyStudent — arizalar bazasi (PostgreSQL)

   IKKI REJIM — o'zi tanlanadi:

     1) BAZA   — DATABASE_URL muhit o'zgaruvchisi bor bo'lsa
                 (Render bulutda uni o'zi qo'yadi).
                 Arizalar PostgreSQL'da saqlanadi va server
                 qayta ishga tushsa ham YO'QOLMAYDI.

     2) FAYL   — DATABASE_URL yo'q bo'lsa (uy kompyuterida).
                 Arizalar avvalgidek server/db.json ichida.

   Shu sababli mahalliy ishlash uchun hech narsa o'rnatish
   shart emas: `node server/server.js` avvalgidek ishlayveradi.
   ========================================================= */
'use strict';

/* Muhit o'zgaruvchisi panelga qo'lda kiritilganda ichiga ko'rinmas
   belgilar tushib qolishi mumkin: bosh/oxirgi bo'sh joy, qator
   uzilishi, qo'shtirnoq. Ular ulanishni jimgina buzadi —
   shuning uchun boshidayoq tozalaymiz. */
const URL = String(process.env.DATABASE_URL || '')
  .replace(/\s+/g, '')             /* bo'sh joy va qator uzilishlari */
  .replace(/^["']|["']$/g, '');    /* tasodifiy qo'shtirnoq */
let BAZA_BOR = !!URL;   /* ulanish uzilsa o'chiriladi */

let havza = null;   /* pg.Pool — faqat baza rejimida */

/* Bulutli bazalar (Neon, Supabase, Render) SSL talab qiladi.
   Sertifikat tekshiruvini yumshatamiz — ba'zi hostinglar o'z
   sertifikatini ishlatadi; ulanish baribir shifrlangan.
   Mahalliy bazada SSL kerak emas. */
function sslSozlama(){
  if(/localhost|127\.0\.0\.1/.test(URL)) return false;
  return { rejectUnauthorized: false };
}

/* Ulanishni tayyorlash va jadvalni yaratish.
   Server ishga tushganda bir marta chaqiriladi. */
async function tayyorla(){
  if(!BAZA_BOR){
    console.log('  Baza: DATABASE_URL yo\'q — arizalar db.json da');
    return false;
  }

  const { Pool } = require('pg');

  /* Tashxis uchun: ulanish satrining xavfsiz qismini chiqaramiz.
     Parol hech qachon logga tushmaydi. Muammo bo'lsa shu satrdan
     manzil to'g'ri kelganini darrov ko'rish mumkin. */
  try{
    const u = new (require('url').URL)(URL);
    console.log('  Baza manzili: ' + u.hostname + u.pathname +
                ' (foydalanuvchi: ' + u.username + ')');
  }catch(e){
    console.warn('  DIQQAT: DATABASE_URL noto\'g\'ri shaklda — ' + e.message);
  }

  /* URL ichidagi sslmode/channel_binding parametrlarini olib tashlaymiz.
     Sabab: pg ularni 'verify-full' deb talqin qiladi va Neon
     sertifikatida ulanish uzilib qoladi. SSL sozlamasini quyida
     o'zimiz beramiz — ulanish baribir shifrlangan. */
  const TOZA_URL = URL.replace(/[?&](sslmode|channel_binding)=[^&]*/g, function(m){
    return m[0] === '?' ? '?' : '';
  }).replace(/\?$/, '').replace(/\?&/, '?');

  havza = new Pool({
    connectionString: TOZA_URL,
    ssl: sslSozlama(),
    max: 5,
    /* Neon bepul rejada 5 daqiqa harakatsizlikdan keyin uxlaydi.
       Uyg'onishi bir necha soniya olishi mumkin — standart 30
       soniyalik kutish yetarli, lekin aniq yozib qo'yamiz. */
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000
  });

  /* Ulanish uzilsa (Neon uxlaganda bo'ladi) — dastur qulamasin.
     pg keyingi so'rovda yangi ulanish ochadi. */
  havza.on('error', function(e){
    console.warn('Baza ulanishi uzildi:', e.message);
  });

  await havza.query(`
    CREATE TABLE IF NOT EXISTS arizalar (
      id    TEXT PRIMARY KEY,
      kod   TEXT NOT NULL,
      fan   TEXT NOT NULL,
      turi  TEXT NOT NULL,
      holat TEXT NOT NULL DEFAULT 'kutilmoqda',
      sana  DATE NOT NULL DEFAULT CURRENT_DATE,
      vaqt  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  /* talaba o'z arizalarini tez topsin */
  await havza.query(`CREATE INDEX IF NOT EXISTS arizalar_kod ON arizalar (kod)`);

  console.log('  Baza: PostgreSQL ulandi — arizalar doimiy saqlanadi');
  return true;
}

/* Barcha arizalar, eng yangisi birinchi.
   Sana YYYY-MM-DD ko'rinishida qaytadi (ilova shuni kutadi). */
async function arizalarOl(){
  const r = await havza.query(
    `SELECT id, kod, fan, turi, holat,
            TO_CHAR(sana, 'YYYY-MM-DD') AS sana
       FROM arizalar
      ORDER BY vaqt DESC`
  );
  return r.rows;
}

/* Yangi ariza qo'shish */
async function arizaQosh(a){
  await havza.query(
    `INSERT INTO arizalar (id, kod, fan, turi, holat, sana)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [a.id, a.kod, a.fan, a.turi, a.holat, a.sana]
  );
  return a;
}

/* db.json dagi boshlang'ich arizalarni bazaga bir marta ko'chirish.
   ON CONFLICT — ikkinchi marta ishga tushsa takrorlanmaydi. */
async function boshlangichKochir(arizalar){
  if(!arizalar || !arizalar.length) return;
  for(const a of arizalar){
    await havza.query(
      `INSERT INTO arizalar (id, kod, fan, turi, holat, sana)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO NOTHING`,
      [a.id, a.kod || '', a.fan, a.turi, a.holat || 'kutilmoqda',
       a.sana || new Date().toISOString().slice(0, 10)]
    );
  }
}

module.exports = {
  /* getter — server ulanish xatosidan keyin o'chira olsin */
  get BAZA_BOR(){ return BAZA_BOR; },
  set BAZA_BOR(v){ BAZA_BOR = !!v; },
  tayyorla,
  arizalarOl,
  arizaQosh,
  boshlangichKochir
};
