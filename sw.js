/* =========================================================
   MyStudent — service worker
   Maqsad: ilova internetsiz ham ochilsin.

   Strategiya:
     - HTML (navigatsiya): avval tarmoq, ulanmasa keshdan.
       Shunda foydalanuvchi eski versiyada qamalib qolmaydi.
     - Qolgan fayllar (css/js/rasm): avval keshdan, fonda yangilanadi.
       Bu tez ochilishni beradi.

   Versiyani o'zgartirsangiz — eski kesh o'chiriladi.
   ========================================================= */
const VERSIYA = 'mystudent-v1';
const ASOSIY = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './favicon.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(VERSIYA)
      /* bitta fayl yuklanmasa ham o'rnatish buzilmasin */
      .then(function(c){ return Promise.allSettled(ASOSIY.map(function(u){ return c.add(u); })); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys()
      .then(function(nomlar){
        return Promise.all(nomlar
          .filter(function(n){ return n !== VERSIYA; })
          .map(function(n){ return caches.delete(n); }));
      })
      .then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  const req = e.request;

  /* faqat GET va shu saytning o'zi keshlanadi */
  if(req.method !== 'GET') return;
  if(new URL(req.url).origin !== self.location.origin) return;

  /* HTML: avval tarmoq — yangi versiya darhol yetib boradi */
  if(req.mode === 'navigate'){
    e.respondWith(
      fetch(req)
        .then(function(res){
          const nusxa = res.clone();
          caches.open(VERSIYA).then(function(c){ c.put(req, nusxa); });
          return res;
        })
        .catch(function(){
          return caches.match(req).then(function(r){ return r || caches.match('./index.html'); });
        })
    );
    return;
  }

  /* qolgani: keshdan tez, fonda yangilanadi */
  e.respondWith(
    caches.match(req).then(function(kesh){
      const tarmoq = fetch(req).then(function(res){
        if(res && res.status === 200){
          const nusxa = res.clone();
          caches.open(VERSIYA).then(function(c){ c.put(req, nusxa); });
        }
        return res;
      }).catch(function(){ return kesh; });
      return kesh || tarmoq;
    })
  );
});
