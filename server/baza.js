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

const URL = process.env.DATABASE_URL || '';
let BAZA_BOR = !!URL;   /* ulanish uzilsa o'chiriladi */

let havza = null;   /* pg.Pool — faqat baza rejimida */

/* Render'ning ichki manzili (…-a.oregon-postgres.render.com emas,
   balki qisqa nomi) SSL talab qilmaydi; tashqi manzil qiladi.
   Ikkalasida ham ishlashi uchun sertifikat tekshiruvini
   yumshatamiz — ulanish baribir shifrlangan. */
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
  havza = new Pool({ connectionString: URL, ssl: sslSozlama(), max: 5 });

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
