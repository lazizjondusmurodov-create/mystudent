# Fotogalereya rasmlari

Har albomning o'z jildi bor. Rasmlarni **shu jildlarga tashlang** —
nomi muhim emas (`IMG_2034.jpg` ham bo'laveradi), tartib nom
bo'yicha alifbo tartibida chiqadi.

```
rasmlar/
  bilimlar-kuni/      → "Bilimlar kuni" albomi
  it-olimpiada/       → "IT-olimpiada"
  talabalar-bahori/   → "Talabalar bahori"
  hackathon/          → "Hackathon Smart City"
  kutubxona/          → "Kutubxona ochilishi"
  sport/              → "Sport musobaqalari"
```

Qabul qilinadi: `.jpg`, `.jpeg`, `.png`, `.webp`

## Rasm tashlagandan keyin

```bash
node tools_foto.js
```

Bu buyruq:
- har rasmni ikki o'lchamda tayyorlaydi — ro'yxat uchun kichik
  (400px) va to'liq ekran uchun katta (1400px)
- natijani `docs/foto/` ga yozadi
- `server/db.json` va `data/fotolar.json` dagi ro'yxatni yangilaydi
  (nechta surat borligi ham o'zi hisoblanadi)

Keyin odatdagidek:

```bash
node tools_check.js
git add -A && git commit -m "Yangi rasmlar" && git push
```

## Eslatma

- Telefondan olingan rasm 3-5 MB bo'ladi; vosita uni ~150 KB gacha
  kichraytiradi, shuning uchun ilova tez ochiladi va internetsiz ham
  ishlaydi.
- Asl rasmlar `rasmlar/` da qoladi (GitHub'ga yuborilmaydi), faqat
  kichraytirilgan nusxa `docs/foto/` orqali ilovaga tushadi.
- Yangi albom kerak bo'lsa: yangi jild yasang va `tools_foto.js`
  ichidagi `ALBOMLAR` ro'yxatiga bitta qator qo'shing.
