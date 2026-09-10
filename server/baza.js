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

  /* Ariza butunligicha JSON da saqlanadi.

     Nega alohida ustunlar emas: arizaning shakli turlicha bo'ladi —
     ilova yuborgani {fan, turi}, db.json dagi namunada esa {t,
     fanlar, kredit, holatT, files, fanlarRoyxat...} bor. Qat'iy
     ustunlar bo'lsa ulardan biri albatta yiqiladi va ma'lumot
     yo'qoladi. JSON da har qanday maydon buzilmay saqlanadi. */
  await havza.query(`
    CREATE TABLE IF NOT EXISTS arizalar (
      id   TEXT PRIMARY KEY,
      kod  TEXT NOT NULL DEFAULT '',
      data JSONB NOT NULL,
      vaqt TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  /* talaba o'z arizalarini tez topsin */
  await havza.query(`CREATE INDEX IF NOT EXISTS arizalar_kod ON arizalar (kod)`);

  /* Eski tor jadval qolgan bo'lsa — yangi ustunlarni qo'shamiz va
     majburiy shartlarni yumshatamiz, aks holda eski NOT NULL
     ustunlar yangi yozuvlarni rad etadi. */
  await havza.query(`ALTER TABLE arizalar ADD COLUMN IF NOT EXISTS data JSONB`);
  for(const ustun of ['fan', 'turi', 'holat', 'sana']){
    await havza.query(
      `ALTER TABLE arizalar ALTER COLUMN ${ustun} DROP NOT NULL`
    ).catch(function(){ /* bunday ustun yo'q — muammo emas */ });
  }

  console.log('  Baza: PostgreSQL ulandi — arizalar doimiy saqlanadi');
  return true;
}

/* Barcha arizalar, eng yangisi birinchi.
   Sana YYYY-MM-DD ko'rinishida qaytadi (ilova shuni kutadi). */
async function arizalarOl(){
  const r = await havza.query(
    `SELECT id, kod, data FROM arizalar ORDER BY vaqt DESC`
  );
  /* data ichida arizaning to'liq mazmuni; id va kod ustundan
     olinadi, chunki ular qidiruvda ishlatiladi. */
  return r.rows.map(function(q){
    return Object.assign({}, q.data, { id: q.id, kod: q.kod });
  });
}

/* Yangi ariza qo'shish */
async function arizaQosh(a){
  await havza.query(
    `INSERT INTO arizalar (id, kod, data) VALUES ($1, $2, $3)
     ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data`,
    [a.id, a.kod || '', JSON.stringify(a)]
  );
  return a;
}

/* Ariza holatini o'zgartirish (dekanat qabul qiladi yoki rad etadi).

   Ariza JSONB da butunligicha saqlanadi, shuning uchun uni o'qib,
   kerakli maydonlarni qo'shib, qaytib yozamiz. Topilmasa null. */
async function arizaHolat(id, ozgarish){
  const r = await havza.query('SELECT data FROM arizalar WHERE id = $1', [id]);
  if(!r.rowCount) return null;

  const yangi = Object.assign({}, r.rows[0].data, ozgarish, { id: id });
  await havza.query('UPDATE arizalar SET data = $2 WHERE id = $1',
                    [id, JSON.stringify(yangi)]);
  return yangi;
}

/* db.json dagi boshlang'ich arizalarni bazaga bir marta ko'chirish.
   ON CONFLICT — ikkinchi marta ishga tushsa takrorlanmaydi. */
async function boshlangichKochir(arizalar){
  if(!arizalar || !arizalar.length) return;
  for(const a of arizalar){
    /* Bitta yozuv ko'chmasa ham qolganini davom ettiramiz va
       bazani o'chirmaymiz — namuna ma'lumot tufayli butun
       saqlash tizimidan voz kechish noto'g'ri bo'lardi. */
    try{
      await havza.query(
        `INSERT INTO arizalar (id, kod, data) VALUES ($1, $2, $3)
         ON CONFLICT (id) DO NOTHING`,
        [a.id, a.kod || '', JSON.stringify(a)]
      );
    }catch(e){
      console.warn('  Ariza ko\'chmadi (' + a.id + '): ' + e.message);
    }
  }
}

module.exports = {
  /* getter — server ulanish xatosidan keyin o'chira olsin */
  get BAZA_BOR(){ return BAZA_BOR; },
  set BAZA_BOR(v){ BAZA_BOR = !!v; },
  tayyorla,
  arizalarOl,
  arizaQosh,
  arizaHolat,
  boshlangichKochir
};
