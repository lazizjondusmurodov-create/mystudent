/* =========================================================
   MyStudent — parol xavfsizligi

   Parollar HECH QACHON ochiq saqlanmaydi. db.json fayli
   GitHub'da ochiq turadi — u yerga ochiq parol yozilsa,
   uni istalgan odam o'qib oladi.

   Shuning uchun parolning "izi" (hash) saqlanadi:

     parol  ->  scrypt  ->  uzun tasodifiy satr

   Bu amal faqat bir tomonga ishlaydi: paroldan izni olish
   mumkin, izdan parolni tiklash mumkin emas. Tekshirishda
   kiritilgan parolning izi saqlangani bilan solishtiriladi.

   Har parolga o'z "tuzi" (salt) qo'shiladi — shuning uchun
   ikki xil odamda bir xil parol bo'lsa ham izlari boshqacha
   bo'ladi va bittasini ochish ikkinchisiga yordam bermaydi.

   scrypt ataylab sekin ishlaydi (~100 ms). Oddiy foydalanuvchi
   buni sezmaydi, lekin parolni taxminlab topmoqchi bo'lgan
   dastur uchun bu juda katta to'siq.
   ========================================================= */
'use strict';

const crypto = require('crypto');

/* scrypt sozlamalari. N ni oshirsa xavfsizroq, lekin sekinroq. */
const N = 16384, r = 8, p = 1, UZUNLIK = 32;

/* Paroldan iz yasash. Natija: "scrypt$<tuz>$<iz>" */
function izYasa(parol){
  const tuz = crypto.randomBytes(16).toString('hex');
  const iz = crypto.scryptSync(String(parol), tuz, UZUNLIK, { N, r, p });
  return 'scrypt$' + tuz + '$' + iz.toString('hex');
}

/* Kiritilgan parol saqlangan izga mos keladimi.

   Solishtirish timingSafeEqual bilan qilinadi: oddiy === har
   belgida to'xtaydi va javob vaqti bo'yicha parolning qancha
   qismi to'g'ri ekanini bilib olish mumkin. */
function izTekshir(parol, saqlangan){
  if(!parol || !saqlangan) return false;

  const qism = String(saqlangan).split('$');
  if(qism.length !== 3 || qism[0] !== 'scrypt') return false;

  const tuz = qism[1];
  let saqlanganIz;
  try{ saqlanganIz = Buffer.from(qism[2], 'hex'); }
  catch(e){ return false; }
  if(saqlanganIz.length !== UZUNLIK) return false;

  let yangiIz;
  try{
    yangiIz = crypto.scryptSync(String(parol), tuz, UZUNLIK, { N, r, p });
  }catch(e){ return false; }

  return crypto.timingSafeEqual(saqlanganIz, yangiIz);
}

/* Telefon raqamni yagona ko'rinishga keltirish.

   Odamlar raqamni har xil yozadi:
     +998 90 123 45 67
     998901234567
     90 123 45 67
     (90) 123-45-67

   Hammasi bitta ko'rinishga keltiriladi: 998901234567
   Shunda qidiruv har doim topadi. */
function raqamTozala(raqam){
  let s = String(raqam || '').replace(/\D/g, '');   /* faqat raqamlar */

  if(!s) return '';

  /* 9 xonali (901234567) -> O'zbekiston kodi qo'shiladi */
  if(s.length === 9) s = '998' + s;

  /* 12 xonali va 998 bilan boshlansa — to'g'ri shakl */
  /* 0 bilan boshlangan (0901234567) — nolni tashlaymiz */
  if(s.length === 10 && s[0] === '0') s = '998' + s.slice(1);

  return s;
}

/* Ikki raqam bir xilmi (yozilishidan qat'i nazar) */
function raqamTeng(a, b){
  const x = raqamTozala(a), y = raqamTozala(b);
  return !!x && x === y;
}

/* Parol yetarlicha kuchlimi. Xato matni yoki null qaytadi. */
function parolTekshir(parol){
  const s = String(parol || '');
  if(s.length < 6) return 'Parol kamida 6 belgidan iborat bo\'lsin';
  if(s.length > 100) return 'Parol juda uzun';
  if(/^\d+$/.test(s) && s.length < 8){
    return 'Faqat raqamdan iborat parol kamida 8 xonali bo\'lsin';
  }
  /* eng ko'p ishlatiladigan zaif parollar */
  const zaif = ['123456', '12345678', '111111', '000000', 'parol',
                'password', 'qwerty', '123123', 'student', 'talaba'];
  if(zaif.indexOf(s.toLowerCase()) !== -1) return 'Bu parol juda oson';
  return null;
}

module.exports = { izYasa, izTekshir, raqamTozala, raqamTeng, parolTekshir };
