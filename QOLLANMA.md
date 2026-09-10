# MyStudent — boshqaruv qo'llanmasi

Ilova internetda ishlab turibdi. Bu hujjat kundalik ishlar uchun:
ma'lumot almashtirish, xavfsizlik sozlamalari, domen ulash.

Texnik tavsif `README.md` da.

---

## 1. Muhit o'zgaruvchilari

Render panelida: **servis → Environment → Add Environment Variable**.
O'zgartirgandan keyin **Save** bosiladi, server o'zi qayta ishga tushadi.

| Nomi | Nima qiladi | Odatiy |
|---|---|---|
| `DATABASE_URL` | PostgreSQL ulanish satri. Bo'lmasa arizalar vaqtinchalik saqlanadi | — |
| `DEMO` | `off` bo'lsa kirish kodlari ro'yxati yashiriladi | `on` |
| `DEKANAT_KODI` | Dekanat paneliga kirish kodi | `9999` |
| `PORT` | Port. Render uni o'zi qo'yadi, tegmang | `3000` |

### Haqiqiy foydalanishga o'tishda

Ikkalasini albatta qo'ying:

```
DEMO          = off
DEKANAT_KODI  = (o'zingiz o'ylab topgan kod)
```

Birinchisisiz kirish kodlari kirish ekranida hammaga ko'rinadi.
Ikkinchisisiz istalgan odam `9999` bilan dekanat paneliga kiradi.

---

## 2. Ma'lumotni almashtirish

Barcha ma'lumot **`server/db.json`** faylida. Uni tahrirlab, GitHub'ga
yuborsangiz — Render o'zi yangi nusxani chiqaradi (2-3 daqiqa).

```bash
git add server/db.json
git commit -m "Talabalar ro'yxati yangilandi"
git push
```

> **Diqqat — ikkita manba bor.** `data/*.json` fayllari server
> ishlamay qolganda (statik rejim) ishlatiladi va bir xil ma'lumotni
> saqlaydi. Server ishlab turganda ilova faqat `server/db.json` ni
> o'qiydi, shuning uchun kundalik ishda o'shani yangilash kifoya.
>
> Lekin ikkalasi bir-biridan uzoqlashib ketmasin: agar server
> vaqtincha o'chsa, ilova `data/` dagi eski ma'lumotni ko'rsatadi.
> Muhim o'zgarishlarda (yangi talaba, yangi e'lon) ikkala joyni ham
> yangilang.

### Tekshiruv vositasi

Ma'lumotni o'zgartirgandan **keyin, GitHub'ga yuborishdan oldin**:

```bash
node tools_sinov.js
```

Bu takrorlangan kodlar, yetishmayotgan maydonlar, buzuq sanalar va
ikki manba orasidagi farqni topadi. `XATO` chiqsa — tuzatish shart;
`eslatma` chiqsa — ilova baribir ishlaydi.

### Talaba qo'shish

`talabalar` ro'yxatiga yangi yozuv:

```json
{
  "kod": "5501",
  "name": "Familiya Ism Otasining ismi",
  "group": "ATT-01-25",
  "faculty": "Axborot texnologiyalari",
  "course": "1-kurs",
  "phone": "+998 90 123 45 67",
  "email": "talaba@example.uz"
}
```

`kod` — talabaning kirish paroli. **Har talabada boshqacha** bo'lishi
shart, aks holda ikki kishi bir kabinetga kiradi.

### Yangilik (e'lon) qo'shish

`yangiliklar` ro'yxatining **boshiga** qo'ying — eng yangisi tepada
turadi:

```json
{
  "id": "n4",
  "who": "Dekanat",
  "t": "E'lon sarlavhasi",
  "x": "Qisqa mazmuni — ro'yxatda ko'rinadi",
  "full": "To'liq matn.\n\nYangi xatboshi shunday.",
  "ic": "cal",
  "tone": "",
  "isNew": true,
  "at": "2026-09-15T09:00:00.000Z"
}
```

- `id` — takrorlanmas bo'lsin (`n4`, `n5`, ...)
- `at` — e'lon vaqti. "2 soat oldin" shundan hisoblanadi
- `ic` — belgi: `cal` (kalendar), `book` (kitob), `warn` (ogohlantirish)
- `tone` — `""` odatiy, `"warn"` sariq, `"bad"` qizil

**Tarjima** (ixtiyoriy): `t_ru`, `t_en`, `x_ru`, `x_en`, `full_ru`,
`full_en`, `who_ru`, `who_en` maydonlarini qo'shing. Bo'lmasa ruscha va
inglizcha rejimda ham o'zbekcha matn ko'rinadi — ilova baribir ishlaydi.

---

## 3. Dekanat paneli

**Kirish:** kirish ekraniga `DEKANAT_KODI` ni kiriting.

Panelda barcha talabalarning arizalari ko'rinadi. Har biriga **Qabul
qilish** yoki **Rad etish** tugmasi bor. Javob bazaga yoziladi va
arizani yuborgan talaba uni o'z telefonida ko'radi.

---

## 4. Baza (Neon)

Arizalar **Neon** dagi PostgreSQL bazasida. Panel: [neon.tech](https://neon.tech)

### Parolni almashtirish

Parol boshqa birovga ma'lum bo'lib qolsa:

1. Neon → **Connect** → **Reset password**
2. Yangi satrni **Copy snippet** bilan nusxalang
3. Render → **Environment** → `DATABASE_URL` → eskisini o'chirib
   yangisini qo'ying → **Save**

Render o'zi qayta ishga tushadi. Ma'lumot yo'qolmaydi — faqat parol
o'zgaradi.

### Bazani ko'rish

Neon panelida **SQL Editor** bor:

```sql
-- barcha arizalar
SELECT id, kod, data->>'fan' AS fan, data->>'holat' AS holat
FROM arizalar ORDER BY vaqt DESC;

-- javob berilmagan arizalar
SELECT id, kod, data->>'fan' AS fan
FROM arizalar WHERE data->>'holat' = 'kutilmoqda';
```

---

## 5. Server uxlab qolishi

Bepul rejada server 15 daqiqa harakatsizlikdan keyin uxlaydi. Keyingi
tashrifchi ~50 soniya kutadi.

**Yechim:** [cron-job.org](https://cron-job.org) da bepul akkaunt oching
va yangi vazifa yarating:

- **URL:** `https://mystudent-lspe.onrender.com/api/salom`
- **Interval:** har 10 daqiqada

Bu manzil ataylab yengil qilingan — bazaga ham, diskka ham tegmaydi.

> Eslatma: Render bepul rejasida oyiga 750 soat ishlash vaqti bor. Bir
> oy 730 soat, ya'ni bitta servisni doim uyg'oq tutish chegara ichida.
> Ikkinchi servis qo'shsangiz chegaradan chiqasiz.

---

## 6. O'z domenini ulash

Masalan `mystudent.uz`:

1. Domenni sotib oling (`ahost.uz`, `uz.uz` yoki boshqa registrator)
2. Render → servis → **Settings** → **Custom Domains** → **Add**
3. Render sizga qiymat beradi — uni domen panelida qo'shing:
   - `www` uchun: **CNAME** → Render bergan manzil
   - domenning o'zi uchun: **A** yozuvi → Render bergan IP
4. 10-60 daqiqa kuting

HTTPS sertifikatini Render bepul va avtomatik beradi.

Domen ulangach `index.html` dagi ikki qatorni yangilang, aks holda
havola ulashilganda eski manzil ko'rinadi:

```html
<meta property="og:image" content="https://mystudent.uz/og.png">
<meta property="og:url" content="https://mystudent.uz/">
```

---

## 7. Kesh (foydalanuvchida eski nusxa qolsa)

Ilova PWA — fayllar telefonda saqlanadi. `app.js`, `style.css` yoki
`index.html` ni o'zgartirsangiz, **ikkala joyda** versiyani ko'taring:

- `index.html` — `?v=6.1` → `?v=6.2` (uch joyda)
- `sw.js` — `?v=6.1` va `const VERSIYA = 'mystudent-v12'` → `v13`

Aks holda ilovani o'rnatgan foydalanuvchilarda eski nusxa qolib ketadi.

Faqat `db.json` yoki `data/*.json` o'zgarsa — versiyani ko'tarish
shart emas.

---

## 8. Ikkita manzil

Ilova ikki joyda turadi — farqini bilib qo'ying:

| | Render | GitHub Pages |
|---|---|---|
| Manzil | `mystudent-lspe.onrender.com` | `...github.io/mystudent/` |
| Backend | bor | **yo'q** |
| Ariza yuborish | bazaga yoziladi | saqlanmaydi |
| Dekanat paneli | ishlaydi | **ishlamaydi** |
| Kirish himoyasi | server tekshiradi | yo'q |
| Ma'lumot manbai | `server/db.json` | `data/*.json` |
| Uxlaydimi | 15 daqiqadan keyin | yo'q, doim tez |

**Odamlarga Render havolasini bering.** Pages faqat interfeysni tez
ko'rsatish uchun.

Ikkalasi ham `main` shoxidan avtomatik yangilanadi — `git push` qilsangiz
2-3 daqiqada ikkalasi ham yangilanadi. Shuning uchun `data/*.json` ni
`server/db.json` bilan mos tutish muhim (2-bo'limga qarang).

Pages kerak bo'lmasa: GitHub → repo → **Settings** → **Pages** →
**Source: None**.

---

## 9. Muammo bo'lsa

**Render → Logs** birinchi qaraladigan joy. Ishga tushishda quyidagi
satrlar chiqadi:

```
Baza manzili: ep-....neon.tech/neondb (foydalanuvchi: neondb_owner)
Baza: PostgreSQL ulandi — arizalar doimiy saqlanadi
Namuna rejimi: YONIQ — kirish kodlari ochiq (o'chirish: DEMO=off)
MyStudent server ishga tushdi
```

| Log'da | Ma'nosi | Nima qilish |
|---|---|---|
| `Baza: DATABASE_URL yo'q` | O'zgaruvchi qo'yilmagan | Environment'ga qo'shing |
| `DIQQAT: ...noto'g'ri shaklda` | Satr buzuq ko'chgan | Neon'dan qayta nusxalang |
| `Baza ulanmadi (...)` | Ulanish rad etildi | Parol almashganmi? |
| `Ariza ko'chmadi (...)` | Bitta yozuv ko'chmadi | Baza ishlayveradi, e'tiborsiz qoldiring |

**Ilova ochilmasa:** avval `https://.../api/salom` ni oching. Javob
kelsa — server tirik, muammo ilovada. Kelmasa — Render'da servis
o'chgan yoki qurilish yiqilgan.
