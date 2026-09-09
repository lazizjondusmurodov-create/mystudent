/* =========================================================
   MyStudent — API qatlami

   Ilova ma'lumotlarni shu fayl orqali oladi. Hozir ular
   data/*.json fayllaridan keladi (statik "server").

   HAQIQIY BACKEND ULANGANDA:
   pastdagi API_BASE ni o'zgartirish kifoya, masalan:
     const API_BASE = 'https://api.mystudent.uz';
   qolgan kod umuman o'zgarmaydi — endpointlar bir xil qoladi.

   Endpointlar:
     GET /talabalar    -> {talabalar:[...]}
     GET /jadval       -> {semestrlar:[...], darslar:[...]}
     GET /imtihonlar   -> {imtihonlar:[...]}
     GET /davomat      -> {davomat:[...]}
     GET /baholar      -> {baholar:[...]}
     GET /yangiliklar  -> {yangiliklar:[...]}
     GET /kutubxona    -> {kitoblar:[...]}
     GET /ishlar       -> {ishlar:[...]}
     GET /qarzdorlik   -> {yillar, akademik, arizalar, shartnoma}
     GET /fotolar      -> {fotolar:[...]}
     GET /yotoqxona    -> {yotoqxona:{...}}
   ========================================================= */

/* Statik rejim: manzillar data/ jildidagi .json fayllar.
   Haqiqiy serverga o'tganda API_BASE ni to'ldiring va
   API_STATIK ni false qiling. */
const API_BASE   = '';
const API_STATIK = true;

/* Endpoint -> haqiqiy manzil */
function apiURL(yol){
  if(API_STATIK) return 'data/' + yol + '.json';
  return API_BASE.replace(/\/$/, '') + '/' + yol;
}

/* Bitta so'rov. Xato bo'lsa — tushunarli xabar bilan qaytaradi. */
async function apiGet(yol){
  const manzil = apiURL(yol);
  let res;
  try{
    res = await fetch(manzil, {
      headers: { 'Accept': 'application/json' },
      /* haqiqiy API da token shu yerga qo'shiladi:
         headers: { Authorization: 'Bearer ' + token } */
      cache: 'no-cache'
    });
  }catch(e){
    throw new Error('Tarmoqqa ulanib bo\'lmadi: ' + yol);
  }
  if(!res.ok) throw new Error('Server xatosi (' + res.status + '): ' + yol);
  try{
    return await res.json();
  }catch(e){
    throw new Error('Javob JSON emas: ' + yol);
  }
}

/* Ilova ishga tushganda kerak bo'ladigan hamma ma'lumot.
   Barchasi parallel yuklanadi — ketma-ket kutilmaydi. */
async function apiHammasi(){
  const yollar = ['talabalar','jadval','imtihonlar','davomat','baholar',
                  'yangiliklar','kutubxona','ishlar','qarzdorlik','fotolar',
                  'yotoqxona'];

  const javoblar = await Promise.all(yollar.map(function(y){ return apiGet(y); }));

  const d = {};
  yollar.forEach(function(y, i){ Object.assign(d, javoblar[i]); });
  return d;
}
