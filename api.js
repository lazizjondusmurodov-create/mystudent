/* =========================================================
   MyStudent — API qatlami

   Ilova ma'lumotni faqat shu fayl orqali oladi.

   IKKI REJIM:
     1) SERVER  — backend ishlab turganda (node server/server.js).
        Kirish kodi serverga yuboriladi, token qaytadi, keyingi
        so'rovlar shu token bilan ketadi.
     2) STATIK  — server bo'lmasa (masalan GitHub Pages demo).
        Ma'lumot data/*.json fayllaridan o'qiladi.

   Rejim o'zi aniqlanadi: sahifa ochilganda /api/salom so'raladi.
   Majburiy tanlash uchun API_REJIM ni 'server' yoki 'statik' qiling.
   ========================================================= */

/* 'avto' | 'server' | 'statik' */
const API_REJIM = 'avto';

/* Backend manzili. Bo'sh bo'lsa — sahifa turgan manzilning o'zi.
   Boshqa domendagi serverga ulash uchun to'liq yozing:
     const API_BASE = 'https://api.mystudent.uz'; */
const API_BASE = '';

/* Statik rejimda endpoint -> fayl nomi */
const STATIK_FAYL = {
  'men':        'talabalar',
  'talabalar':  'talabalar',
  'demo':       'talabalar',
  'jadval':     'jadval',
  'imtihonlar': 'imtihonlar',
  'davomat':    'davomat',
  'baholar':    'baholar',
  'yangiliklar':'yangiliklar',
  'kutubxona':  'kutubxona',
  'ishlar':     'ishlar',
  'qarzdorlik': 'qarzdorlik',
  'fotolar':    'fotolar',
  'yotoqxona':  'yotoqxona'
};

let API_SERVER_BOR = false;      /* aniqlangandan keyin to'ladi */
let API_TOKEN = null;

/* saqlangan tokenni tiklaymiz */
try{ API_TOKEN = localStorage.getItem('ms.token') || null; }catch(e){}

function apiIldiz(){
  return API_BASE ? API_BASE.replace(/\/$/, '') : '';
}

/* Server ishlab turibdimi? Bir marta tekshiriladi.

   Eslatma: server bo'lmasa brauzer konsolida 404 ko'rinadi —
   bu kutilgan holat, ilova statik rejimga o'tadi. */
async function apiRejimAniqla(){
  if(API_REJIM === 'server'){ API_SERVER_BOR = true;  return; }
  if(API_REJIM === 'statik'){ API_SERVER_BOR = false; return; }

  /* GitHub Pages kabi statik hostingda /api/ umuman yo'q —
     u yerda tekshiruvni o'tkazib yuboramiz (tezroq ochiladi). */
  try{
    if(location.hostname.endsWith('github.io')){ API_SERVER_BOR = false; return; }
  }catch(e){}

  try{
    const res = await fetch(apiIldiz() + '/api/demo', {
      headers: { 'Accept': 'application/json' }
    });
    API_SERVER_BOR = res.ok;
  }catch(e){
    API_SERVER_BOR = false;
  }
}

/* Bitta GET so'rovi */
async function apiGet(yol){
  let manzil, sarlavha = { 'Accept': 'application/json' };

  if(API_SERVER_BOR){
    manzil = apiIldiz() + '/api/' + yol;
    if(API_TOKEN) sarlavha['Authorization'] = 'Bearer ' + API_TOKEN;
  }else{
    const fayl = STATIK_FAYL[yol] || yol;
    manzil = 'data/' + fayl + '.json';
  }

  let res;
  try{
    res = await fetch(manzil, { headers: sarlavha, cache: 'no-cache' });
  }catch(e){
    throw new Error('Tarmoqqa ulanib bo\'lmadi: ' + yol);
  }
  /* Token yaroqsiz (masalan server qayta ishga tushgan — tokenlar
     xotirada turadi). Uni darhol tozalaymiz, aks holda har bir
     qayta yuklashda yana 401 keladi va foydalanuvchi qamalib qoladi. */
  if(res.status === 401){
    apiLogout();
    const e = new Error('Sessiya tugagan, qayta kiring');
    e.qaytaKirish = true;
    throw e;
  }
  if(!res.ok) throw new Error('Server xatosi (' + res.status + '): ' + yol);
  try{
    return await res.json();
  }catch(e){
    throw new Error('Javob JSON emas: ' + yol);
  }
}

/* Kirish. Server rejimida — POST /api/login, statikda — mahalliy tekshiruv. */
async function apiLogin(kod){
  if(!API_SERVER_BOR){
    /* statik rejim: kod data/talabalar.json ichidan tekshiriladi */
    const d = await apiGet('talabalar');
    const t = (d.talabalar || []).find(function(x){ return x.kod === kod; });
    if(!t) throw new Error('Kod noto\'g\'ri');
    return { talaba: t };
  }

  let res;
  try{
    res = await fetch(apiIldiz() + '/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ kod: kod })
    });
  }catch(e){
    throw new Error('Serverga ulanib bo\'lmadi');
  }

  const j = await res.json().catch(function(){ return {}; });
  if(!res.ok) throw new Error(j.xato || 'Kirish amalga oshmadi');

  API_TOKEN = j.token;
  try{ localStorage.setItem('ms.token', API_TOKEN); }catch(e){}
  return j;
}

/* Telefon raqam bilan kirish (asosiy usul).

   Parol so'ralmaydi — raqamning o'zi kirish kaliti. Server
   rejimida serverga boradi, statikda data/talabalar.json ichidan
   qidiriladi. */
async function apiLoginTel(telefon){
  if(!API_SERVER_BOR){
    /* statik rejim: raqam data/talabalar.json ichidan topiladi */
    const d = await apiGet('talabalar');
    const izlangan = apiRaqamTozala(telefon);
    const t = (d.talabalar || []).find(function(x){
      return apiRaqamTozala(x.phone) === izlangan;
    });
    if(!t) throw new Error('Bu raqam ro\'yxatda topilmadi');
    return { talaba: t };
  }

  let res;
  try{
    res = await fetch(apiIldiz() + '/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ telefon: telefon })
    });
  }catch(e){
    throw new Error('Serverga ulanib bo\'lmadi');
  }

  const j = await res.json().catch(function(){ return {}; });
  if(!res.ok){
    const e = new Error(j.xato || 'Kirish amalga oshmadi');
    /* 429 — urinishlar chegarasi; ilova buni alohida ko'rsatadi */
    if(res.status === 429) e.tooMany = true;
    throw e;
  }

  API_TOKEN = j.token;
  try{ localStorage.setItem('ms.token', API_TOKEN); }catch(e){}
  return j;
}

/* Telefon raqamni yagona ko'rinishga keltirish: 998901234567.
   Serverdagi server/raqam.js dagi bilan bir xil qoida. */
function apiRaqamTozala(raqam){
  let s = String(raqam || '').replace(/\D/g, '');
  if(!s) return '';
  if(s.length === 9) s = '998' + s;
  if(s.length === 10 && s[0] === '0') s = '998' + s.slice(1);
  return s;
}

function apiLogout(){
  API_TOKEN = null;
  try{ localStorage.removeItem('ms.token'); }catch(e){}
}

/* Yangi ariza yuborish — faqat server rejimida yoziladi. */
async function apiArizaYubor(fan, turi){
  if(!API_SERVER_BOR){
    /* statik rejimda server yo'q — ariza faqat ekranda ko'rinadi */
    return { ariza: { id:'local'+Date.now(), fan:fan, turi:turi,
                      holat:'kutilmoqda', sana:new Date().toISOString().slice(0,10) },
             mahalliy: true };
  }
  const res = await fetch(apiIldiz() + '/api/arizalar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + API_TOKEN
    },
    body: JSON.stringify({ fan: fan, turi: turi })
  });
  const j = await res.json().catch(function(){ return {}; });
  if(!res.ok) throw new Error(j.xato || 'Ariza yuborilmadi');
  return j;
}

/* ---------- DEKANAT ----------
   Dekanat barcha talabalarning arizalarini ko'radi va ularga
   javob beradi. Statik rejimda server yo'q — u yerda dekanat
   paneli avvalgidek brauzer xotirasi bilan ishlaydi. */

/* Barcha arizalar (faqat dekanat tokeni bilan) */
async function apiDekanatArizalar(){
  if(!API_SERVER_BOR) return null;    /* null = statik rejim */
  const d = await apiGet('dekanat/arizalar');
  return d.arizalar || [];
}

/* Arizani qabul qilish ('ok') yoki rad etish ('no') */
async function apiDekanatJavob(id, holat, sabab){
  if(!API_SERVER_BOR) return null;
  const res = await fetch(apiIldiz() + '/api/dekanat/holat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + API_TOKEN
    },
    body: JSON.stringify({ id: id, holat: holat, sabab: sabab || '' })
  });
  const j = await res.json().catch(function(){ return {}; });
  if(!res.ok) throw new Error(j.xato || 'Javob saqlanmadi');
  return j.ariza;
}

/* Ilova ishga tushganda kerak bo'ladigan hamma ma'lumot.
   Barchasi parallel yuklanadi. */
async function apiHammasi(){
  await apiRejimAniqla();

  /* server rejimida token bo'lmasa — himoyalangan endpointlar 401 beradi,
     shuning uchun avval ochiq ma'lumotni olamiz, qolganini kirgandan keyin */
  const ochiq = ['yangiliklar','kutubxona','ishlar','fotolar'];
  /* server rejimida kirish kodlari alohida ochiq endpointdan keladi */
  if(API_SERVER_BOR && !API_TOKEN) ochiq.push('demo');
  const yopiq = ['talabalar','jadval','imtihonlar','davomat','baholar',
                 'qarzdorlik','yotoqxona'];

  /* statik rejimda hammasi ochiq */
  const yollar = (API_SERVER_BOR && !API_TOKEN) ? ochiq : ochiq.concat(yopiq);

  const javoblar = await Promise.all(yollar.map(function(y){ return apiGet(y); }));

  const d = {};
  yollar.forEach(function(y, i){ Object.assign(d, javoblar[i]); });
  d._serverRejimi = API_SERVER_BOR;
  d._kirgan = !!(API_TOKEN || !API_SERVER_BOR);
  return d;
}

/* Kirgandan keyin qolgan (himoyalangan) ma'lumotni yuklash */
async function apiQolganini(){
  if(!API_SERVER_BOR) return {};
  const yollar = ['talabalar','jadval','imtihonlar','davomat','baholar',
                  'qarzdorlik','yotoqxona'];
  const javoblar = await Promise.all(yollar.map(function(y){ return apiGet(y); }));
  const d = {};
  yollar.forEach(function(y, i){ Object.assign(d, javoblar[i]); });
  return d;
}
