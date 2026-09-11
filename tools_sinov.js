/* =========================================================
   MyStudent — ma'lumot tekshiruvi

   Ishlatish:
     node tools_sinov.js

   Nimani tekshiradi:
     1) db.json va data/*.json bir-biriga mos keladimi
     2) talaba kodlari va telefon raqamlari takrorlanmaydimi
     3) id lar takrorlanmaydimi
     4) yangiliklarda kerakli maydonlar bormi
     5) tarjima maydonlari to'liqmi (ogohlantirish)

   Ma'lumotni o'zgartirgandan keyin ishga tushiring —
   xato bo'lsa GitHub'ga yubormasdan oldin bilib olasiz.
   ========================================================= */
'use strict';

const fs = require('fs');
const path = require('path');

const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'server', 'db.json'), 'utf8'));

let xato = 0, ogoh = 0;
const XATO = function(s){ console.log('  XATO: ' + s); xato++; };
const OGOH = function(s){ console.log('  eslatma: ' + s); ogoh++; };

/* ---------- 1) talaba kodlari ---------- */
console.log('Talabalar:');
const kodlar = {};
(db.talabalar || []).forEach(function(t){
  if(!t.kod)  return XATO('kodsiz talaba: ' + (t.name || '?'));
  if(!t.name) return XATO('ismsiz talaba, kod: ' + t.kod);
  if(kodlar[t.kod]) XATO('kod takrorlangan (' + t.kod + '): ' +
                         kodlar[t.kod] + ' va ' + t.name);
  kodlar[t.kod] = t.name;
});
console.log('  ' + (db.talabalar || []).length + ' ta, kodlar takrorlanmagan');

/* ---------- telefon raqamlar ----------

   Kirish telefon raqam bilan bo'ladi, shuning uchun har talabada
   raqam bo'lishi va takrorlanmasligi shart. Takrorlansa — ikkinchi
   talaba hech qachon kira olmaydi (qidiruv birinchisini topadi). */
function raqamTozala(raqam){
  let r = String(raqam || '').replace(/\D/g, '');
  if(!r) return '';
  if(r.length === 9) r = '998' + r;
  if(r.length === 10 && r[0] === '0') r = '998' + r.slice(1);
  return r;
}

const raqamlar = {};
const xatoOldin = xato;
(db.talabalar || []).forEach(function(t){
  const r = raqamTozala(t.phone);
  if(!r) return XATO('telefon raqamsiz talaba: ' + (t.name || '?') +
                     ' — u tizimga kira olmaydi');
  if(r.length !== 12){
    XATO('telefon raqam noto\'g\'ri shaklda (' + t.phone + '): ' + t.name);
    return;
  }
  if(raqamlar[r]) XATO('telefon raqam takrorlangan (' + t.phone + '): ' +
                       raqamlar[r] + ' va ' + t.name +
                       ' — ikkinchisi kira olmaydi');
  raqamlar[r] = t.name;
});
if(xato === xatoOldin) console.log('  telefon raqamlar joyida, takrorlanmagan');

/* dekanat kodi bilan to'qnashuv */
const dekanat = process.env.DEKANAT_KODI || '9999';
if(kodlar[dekanat]){
  XATO('talaba kodi dekanat kodi bilan bir xil (' + dekanat + '): ' +
       kodlar[dekanat] + ' — bu talaba tizimga kira olmaydi');
}

/* ---------- 2) id lar ---------- */
function idTekshir(royxat, nom){
  if(!Array.isArray(royxat)) return;
  const korilgan = {};
  royxat.forEach(function(x){
    if(!x.id) return XATO(nom + ': id yo\'q — ' + (x.t || '?'));
    if(korilgan[x.id]) XATO(nom + ': id takrorlangan — ' + x.id);
    korilgan[x.id] = true;
  });
}
idTekshir(db.yangiliklar, 'yangiliklar');
idTekshir(db.kitoblar, 'kitoblar');
idTekshir(db.ishlar, 'ishlar');
idTekshir(db.arizalar, 'arizalar');

/* ---------- 3) yangiliklar ---------- */
console.log('Yangiliklar:');
(db.yangiliklar || []).forEach(function(n){
  if(!n.t)   XATO('yangilik sarlavhasiz: ' + n.id);
  if(!n.x)   XATO('yangilik qisqa matnsiz: ' + n.id);
  if(!n.who) XATO('yangilik kimdanligi yo\'q: ' + n.id);
  if(n.at && isNaN(Date.parse(n.at))) XATO('sana o\'qilmadi (' + n.id + '): ' + n.at);
  if(!n.at)  OGOH('sana yo\'q (' + n.id + ') — "qachon" noto\'g\'ri ko\'rinadi');
});
console.log('  ' + (db.yangiliklar || []).length + ' ta');

/* ---------- 4) tarjima to'liqmi ---------- */
console.log('Tarjimalar:');
function tarjimaTekshir(royxat, nom, maydonlar){
  if(!Array.isArray(royxat)) return;
  let yetishmaydi = 0;
  royxat.forEach(function(x){
    maydonlar.forEach(function(m){
      if(x[m] === undefined) return;          /* maydonning o'zi yo'q */
      ['ru', 'en'].forEach(function(til){
        if(x[m + '_' + til] === undefined) yetishmaydi++;
      });
    });
  });
  if(yetishmaydi) OGOH(nom + ': ' + yetishmaydi + ' ta tarjima yo\'q ' +
                       '(o\'sha joyda o\'zbekcha matn ko\'rinadi)');
  else console.log('  ' + nom + ': to\'liq');
}
tarjimaTekshir(db.yangiliklar, 'yangiliklar', ['who', 't', 'x', 'full']);
tarjimaTekshir(db.kitoblar, 'kitoblar', ['t', 'm', 'b', 'x', 'lang']);
tarjimaTekshir(db.ishlar, 'ishlar', ['t', 'm', 'b', 'x', 'place', 'mode', 'salary']);

/* ---------- 5) db.json va data/*.json mosligi ---------- */
console.log('Ikki manba mosligi:');
const juftlar = {
  'talabalar.json': 'talabalar',
  'yangiliklar.json': 'yangiliklar',
  'kutubxona.json': 'kitoblar',
  'ishlar.json': 'ishlar'
};
Object.keys(juftlar).forEach(function(fayl){
  const yol = path.join(__dirname, 'data', fayl);
  if(!fs.existsSync(yol)) return OGOH('data/' + fayl + ' yo\'q');

  const kalit = juftlar[fayl];
  const statik = JSON.parse(fs.readFileSync(yol, 'utf8'))[kalit] || [];
  const server = db[kalit] || [];

  if(statik.length !== server.length){
    OGOH('data/' + fayl + ': ' + statik.length + ' ta, ' +
         'db.json: ' + server.length + ' ta — mos emas');
    return;
  }
  /* id lar bir xilmi */
  const s1 = server.map(function(x){ return x.id; }).sort().join(',');
  const s2 = statik.map(function(x){ return x.id; }).sort().join(',');
  if(s1 !== s2) OGOH('data/' + fayl + ': id lar boshqacha');
});

/* ---------- xulosa ---------- */
console.log('');
if(xato){
  console.log('XATO: ' + xato + ' ta muammo topildi — tuzatilishi kerak.');
  process.exit(1);
}
console.log(ogoh ? ('Tayyor. ' + ogoh + ' ta eslatma bor (ilova ishlayveradi).')
                 : 'Tayyor. Hammasi joyida.');
