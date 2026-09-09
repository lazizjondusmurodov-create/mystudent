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
app.js          — butun mantiq: tillar, ma'lumotlar, sahifalar
style.css       — uslublar
docs/           — README uchun skrinshotlar
tools_shot.js   — skrinshotlarni avtomatik yangilash vositasi
```

## Skrinshotlarni yangilash

```bash
npm i puppeteer-core
python -m http.server 8899    # boshqa terminalda
node tools_shot.js
```

Yangi sahifa qo'shilsa, [tools_shot.js](tools_shot.js) ichidagi `SAHIFALAR`
ro'yxatiga uning `tab` va `data-key` qiymatlari yoziladi.
