/* =========================================================
   MyStudent — telefon raqam bilan ishlash

   Kirish telefon raqam orqali bo'ladi, parol so'ralmaydi.
   Odamlar raqamni har xil yozadi, shuning uchun solishtirishdan
   oldin hammasi bitta ko'rinishga keltiriladi.
   ========================================================= */
'use strict';

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

module.exports = { raqamTozala, raqamTeng };
