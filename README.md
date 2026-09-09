# MyStudent — talaba kabineti

Talabalar uchun mobil veb-ilova: dars jadvali, davomat, baholar, imtihonlar,
kutubxona va karyera bo'limlari bitta joyda. O'zbek, rus va ingliz tillarida.

**Demo:** https://lazizjondusmurodov-create.github.io/mystudent/

## Ekranlar

| Bosh sahifa | Dars jadvali | Baholar |
|---|---|---|
| ![Bosh sahifa](docs/home.png) | ![Dars jadvali](docs/jadval.png) | ![Baholar](docs/baholar.png) |

| Davomat | Imtihonlar | Kutubxona |
|---|---|---|
| ![Davomat](docs/davomat.png) | ![Imtihonlar](docs/imtihon.png) | ![Kutubxona](docs/kutubxona.png) |

| Karyera | Rezyume | Kabinet |
|---|---|---|
| ![Karyera](docs/karyera.png) | ![Rezyume](docs/rezyume.png) | ![Kabinet](docs/kabinet.png) |

## Imkoniyatlar

- **Dars jadvali** — haftalik ko'rinish, joriy kun ajratilgan, dars tafsilotlari
- **Davomat** — foiz, qoldirilgan soatlar, fanlar bo'yicha tafsilot
- **Baholar** — semestr bo'yicha, o'rtacha ball, kredit va eng yuqori/past fanlar
- **Imtihonlar** — jadval va qolgan kunlar hisoblagichi
- **Qarzdorlik** — akademik va shartnoma bo'yicha, ariza yuborish
- **Yotoqxona** — joy holati va ariza
- **Kutubxona** — kitoblar ro'yxati va qidiruv
- **Karyera** — rezyume, ish takliflari, yutuqlar, mahorat darslari, maqolalar, bloglar, fotogalereya
- **Uch til** — o'zbek, rus, ingliz (yuqori o'ngdagi tugmadan almashtiriladi)
- **Qorong'i rejim** — Sozlamalar → Ko'rinish: tizim bo'yicha, yorug' yoki qorong'i
- **Internetsiz ishlaydi** — telefon ekraniga o'rnatiladi (PWA)

## Ishga tushirish

Alohida qurish (build) talab qilinmaydi — oddiy statik sayt:

```bash
python -m http.server 8899
# so'ng brauzerda: http://localhost:8899
```

## Namuna kirish kodlari

Kirish ekranida talabani tanlash mumkin yoki kodni qo'lda kiritish:

| Kod | Talaba | Guruh |
|---|---|---|
| `2024` | Aliyev Jasur | ATT-06-24 |
| `3050` | Yusupova Nilufar | KIF-04-25 |
| `7788` | Rahmonov Sardor | IQT-02-23 |
| `1111` | Dusmurodov Lazizjon | ATT-06-24 |

## Tuzilishi

```
index.html      — sahifa tuzilmasi va meta teglar
api.js          — API qatlami: ma'lumot shu yerdan olinadi
server/         — backend: server.js va db.json
data/           — statik rejim uchun ma'lumot (server bo'lmaganda)
app.js          — butun mantiq: tillar, sahifalar, ko'rinish
style.css       — uslublar (ranglar CSS o'zgaruvchilarida)
manifest.json   — PWA sozlamalari
sw.js           — service worker: internetsiz ishlash
404.html        — topilmadi sahifasi (mustaqil, style.css ga bog'liq emas)
robots.txt      — qidiruv tizimlari uchun
sitemap.xml     — sayt xaritasi
docs/           — README uchun skrinshotlar
tools_shot.js   — skrinshotlarni avtomatik yangilash vositasi
tools_check.js  — loyihani tekshirish vositasi
```

## Chiqarishdan oldin

```bash
node tools_check.js
```

Versiya raqamlari, kesh ro'yxati, manifest va tarjimalarni tekshiradi.

**Muhim:** `style.css` yoki `app.js` o'zgarsa, `?v=` raqamini
[index.html](index.html) **va** [sw.js](sw.js) da bir xil qilib yangilang,
hamda `sw.js` dagi `VERSIYA` ni ko'taring — aks holda foydalanuvchida
eski nusxa qolib ketadi. `tools_check.js` shuni tekshiradi.

## Backend (API server)

Loyihada haqiqiy backend bor — `server/server.js`. Node.js'da yozilgan,
**tashqi kutubxona talab qilmaydi** (npm install kerak emas).

```bash
node server/server.js
# so'ng brauzerda: http://localhost:3000
```

Ma'lumotlar `server/db.json` faylida saqlanadi. Ariza yuborilsa —
faylga yoziladi va server qayta ishga tushsa ham qoladi.

### Kirish va himoya

```
POST /api/login  {kod:"2024"}  →  {token, talaba}
```

Token olingandan keyin himoyalangan endpointlarga `Authorization: Bearer <token>`
sarlavhasi bilan murojaat qilinadi. Tokensiz ular **401** qaytaradi.

### Ikki rejim

Ilova o'zi aniqlaydi qaysi rejimda ishlashini:

| Rejim | Qachon | Ma'lumot manbai |
|---|---|---|
| **Server** | `node server/server.js` ishlab tursa | `http://localhost:3000/api/...` |
| **Statik** | server bo'lmasa (GitHub Pages demo) | `data/*.json` fayllari |

Majburiy tanlash uchun [api.js](api.js) da `API_REJIM` ni `'server'`
yoki `'statik'` qiling. Boshqa domendagi serverga ulash uchun `API_BASE`
ni to'ldiring.

### Endpointlar:

| Manzil | Qaytaradi |
|---|---|
| `GET /talabalar` | `{talabalar:[...]}` |
| `GET /jadval` | `{semestrlar:[...], darslar:[...]}` |
| `GET /imtihonlar` | `{imtihonlar:[...]}` |
| `GET /davomat` | `{davomat:[...]}` |
| `GET /baholar` | `{baholar:[...]}` |
| `GET /yangiliklar` | `{yangiliklar:[...]}` |
| `GET /kutubxona` | `{kitoblar:[...]}` |
| `GET /ishlar` | `{ishlar:[...]}` |
| `GET /qarzdorlik` | `{yillar, akademik, arizalar, shartnoma}` |
| `GET /fotolar` | `{fotolar:[...]}` |
| `GET /yotoqxona` | `{yotoqxona:{...}}` |
| `POST /arizalar` | yangi ariza yozadi → `{ariza}` |

Token talab qilmaydiganlar: `yangiliklar`, `kutubxona`, `ishlar`, `fotolar`.

Barcha so'rovlar parallel ketadi. Ma'lumot kelguncha yuklanish ekrani
turadi; xato bo'lsa — sabab va "Qayta urinish" tugmasi ko'rsatiladi.

### API'ni qo'lda sinash

```bash
# kirish
curl -X POST http://localhost:3000/api/login   -H "Content-Type: application/json" -d '{"kod":"2024"}'

# tokensiz — 401
curl http://localhost:3000/api/baholar

# token bilan
curl http://localhost:3000/api/baholar -H "Authorization: Bearer <TOKEN>"
```

## Mavzu (yorug'/qorong'i)

Ilova ichida: **Sozlamalar → Ko'rinish** — uch variant bor:

| Variant | Nima qiladi |
|---|---|
| Tizim bo'yicha | telefon sozlamasiga moslashadi (standart) |
| Yorug' | doim yorug' |
| Qorong'i | doim qorong'i |

Tanlov `localStorage` da (`ms.theme`) saqlanadi. Ranglar `style.css`
boshidagi CSS o'zgaruvchilarida yig'ilgan — mavzu shu tokenlarni
almashtirish orqali ishlaydi.

## Skrinshotlarni yangilash

```bash
npm i puppeteer-core
python -m http.server 8899    # boshqa terminalda
node tools_shot.js
```

Yangi sahifa qo'shilsa, [tools_shot.js](tools_shot.js) ichidagi `SAHIFALAR`
ro'yxatiga uning `tab` va `data-key` qiymatlari yoziladi.
