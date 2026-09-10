/* =========================================================
   MyStudent — dastur mantiqi
   Bu fayl index.html oxiridagi <script src="app.js"> orqali ulanadi.

   TUZILISH:
     0)  Tillar (I18N)            — uz / ru / en lug'atlari
     1)  Foydalanuvchi (USER)     — backend ulanganda shu joy o'zgaradi
     2)  Yordamchi funksiyalar
     3)  Foydalanuvchi ma'lumotlarini joylashtirish
     4)  Ma'lumotlar (jadval, davomat, e'lonlar, kutubxona, karyera)
     5)  HTML quruvchilar
     6)  Bugungi darslar
     7)  Davomat ko'rsatkichi
     8)  E'lonlar
     9)  Yon menyu
     10) Tablar
     11) Ichki sahifa
     12) Toast
     13) Modal oyna
     14) Bildirishnomalar
     15) Shaxsiy ma'lumotlarni tahrirlash
     16) Parolni o'zgartirish
     17) Tizimdan chiqish
     18) Tilni qo'llash va almashtirish
     19) Oxirgi ochilgan tabni tiklash
     20) Skeleton
     21) Pull-to-refresh
     22) Swipe
     23) Fokus qamovi
     24) Yon menyu sahifalari + sozlamalar
     25) Ro'yxat qatorlari — batafsil oyna
     26) Kirish (login)
   ========================================================= */

/* =========================================================
   0) TILLAR
   Yangi matn qo'shsangiz — uchala tilga ham yozing
   ========================================================= */
const I18N = {
  uz:{
    _name:"O'zbekcha", _code:"UZ",

    /* tablar va sarlavhalar */
    tabHome:"Asosiy", tabLib:"Kutubxona", tabCareer:"Karyera", tabProfile:"Kabinet",
    titleHome:"Bosh sahifa", titleLib:"Kutubxona", titleCareer:"Karyera", titleProfile:"Kabinet",

    /* feed */
    today:"Bugungi darslar", todayLeft:"ta qoldi", all:"Barchasi",
    metrics:"Ko'rsatkichlar", news:"E'lonlar",
    attendance:"Davomat", avgGrade:"O'rtacha baho", soon:"Tez orada",
    now:"Hozir", allGood:"Barcha fanlar yaxshi", lowSubj:"ta fan past",

    /* davomat */
    attTitle:"Davomat", attTotal:"Umumiy davomat", attHours:"soat",
    attAll:"Jami", attCame:"Qatnashgan", attMissed:"Qoldirilgan",
    attExcused:"Sababli", attUnexcused:"Sababsiz",
    attMissedDays:"Qoldirilgan darslar", attNoMiss:"Bitta ham dars qoldirilmagan",
    attOf:"dan", attWarn:"Davomat past — dekanatga murojaat qiling",
    attRisk:"ta fandan davomat past", attFine:"Davomat yaxshi",
    attNoData:"Ma'lumot yo'q", attNoDataX:"Davomat ma'lumotlari hali kiritilmagan.",
    newTag:"YANGI",

    /* lenta */
    schedule:"Dars jadvali", grades:"Baholarim", debts:"Qarzdorlik",
    applications:"Arizalar", callLetter:"Chaqiruv xati", dorm:"Yotoqxona",

    /* kutubxona / karyera */
    libTitle:"Elektron kutubxona", careerTitle:"Karyera markazi",
    personalData:"Shaxsiy ma'lumotlar", resume:"Rezyume", jobs:"Ish takliflari",
    awards:"Yutuqlar", masterclass:"Mahorat darslari", articles:"Ilmiy maqolalar",
    blogs:"Bloglar", gallery:"Fotogalereya",

    /* kabinet */
    infoTitle:"Ma'lumotlar", settings:"Sozlamalar",
    changePass:"Parolni o'zgartirish", logout:"Tizimdan chiqish",
    faculty:"Fakultet", eduForm:"Ta'lim shakli", course:"Bosqich",
    studentId:"Talaba ID", status:"Holat", phone:"Telefon", email:"E-pochta",
    group:"Guruh", fullName:"F.I.SH.",

    /* qarzdorlik */
    debtTitle:"Qarzlar", byContract:"Shartnoma bo'yicha", academic:"Akademik qarzdorlik",
    notFound:"Ma'lumotlar topilmadi",
    noAcademic:"o'quv yili uchun akademik qarzdorlik yo'q.",
    noContract:"o'quv yili uchun to'lov qarzdorligi yo'q.",
    academicDebt:"Akademik qarzdorlik", subjects:"ta fan",
    retakeNote:"Qayta topshirish uchun dekanatga murojaat qiling",
    totalDebt:"Umumiy qarzdorlik", payBy:"To'lash muddati:",
    points:"ball", pointsShort:"ball yetishmayapti",

    /* baholar */
    gradesTitle:"Baholarim", gpaLabel:"O'rtacha ball", gpaOf:"5 dan",
    semLabel:"semestr", allSem:"Barcha semestrlar",
    gCredits:"kredit", gTotal:"Jami", gPassed:"O'zlashtirildi", gFailed:"O'zlashtirilmadi",
    gJN:"JN", gON:"ON", gYN:"YN",
    gJNFull:"Joriy nazorat", gONFull:"Oraliq nazorat", gYNFull:"Yakuniy nazorat",
    gA5:"A'lo", gB4:"Yaxshi", gC3:"Qoniqarli", gD2:"Qoniqarsiz",
    gNoData:"Baholar kiritilmagan", gNoDataX:"Tanlangan semestr uchun baholar hali qo'yilmagan.",
    gSubjCount:"ta fan", gBest:"Eng yuqori", gWorst:"Eng past",
    gDebtSubj:"ta fandan qarz",
    gDetail:"Nazorat turlari bo'yicha", gMax:"maks",

    /* modal / tugmalar */
    save:"Saqlash", cancel:"Bekor qilish", change:"O'zgartirish",
    yesExit:"Ha, chiqish", markRead:"O'qildi deb belgilash",
    notifications:"Bildirishnomalar", unread:"ta o'qilmagan xabar",
    noNew:"Yangi xabar yo'q", allRead:"Barcha bildirishnomalar o'qilgan.",
    langTitle:"Til", langSub:"Ilova tilini tanlang",
    themeTitle:"Ko'rinish", themeSub:"Yorug' yoki qorong'i rejim",
    themeAuto:"Tizim bo'yicha", themeAutoSub:"Telefon sozlamasiga moslashadi",
    themeLight:"Yorug'", themeDark:"Qorong'i",

    /* formalar */
    editSub:"O'zgartirilgan ma'lumotlar shu qurilmada saqlanadi.",
    currentPass:"Joriy parol", newPass:"Yangi parol", repeatPass:"Yangi parolni takrorlang",
    passSub:"Yangi parol kamida 6 ta belgidan iborat bo'lsin.",
    min6:"Kamida 6 ta belgi", passMismatch:"Parollar mos kelmadi",
    required:"To'ldirilishi shart", groupHint:"Guruhni dekanat o'zgartiradi",
    exitTitle:"Tizimdan chiqish", exitSub:"Rostdan ham hisobingizdan chiqmoqchimisiz?",
    sessionEnded:"Sessiya muddati tugadi — qayta kiring",
    justNow:"Hozirgina", minAgo:"daqiqa oldin", hourAgo:"soat oldin",
    yesterday:"Kecha", dayAgo:"kun oldin",

    /* toast */
    saved:"Ma'lumotlar saqlandi", checkData:"Ma'lumotlarni tekshiring",
    passChanged:"Parol o'zgartirildi", checkPass:"Parollarni tekshiring",
    loggedOut:"Tizimdan chiqdingiz", allMarked:"Barcha xabarlar o'qildi",
    updated:"Ma'lumotlar yangilandi",

    /* qarzdorlik arizalari */
    fApps:"Arizalar", fRetake:"Qayta o'qish", fFinal:"Yakuniy imtihon",
    subjects2:"Fanlar", credits:"Kredit",
    dlApp:"Arizani yuklash", dlContract:"Shartnomani yuklash", dlReceipt:"Kvitansiya",
    dlSoon:"Yuklash tez orada ishga tushadi",
    noApps:"Tanlangan bo'lim bo'yicha ariza topilmadi.",

    /* ariza yuborish */
    newApp:"Yangi ariza", sendApp:"Ariza yuborish", appType:"Ariza turi",
    appSubjects:"Fanlarni tanlang", appNote:"Izoh", appNoteHint:"Ariza sababini qisqacha yozing",
    appNotePh:"Masalan: kasallik sababli imtihonga kelolmadim",
    pickSubject:"Kamida bitta fan tanlang", writeNote:"Izoh yozing",
    appSent:"Ariza yuborildi", appSentX:"Arizangiz dekanatga yuborildi. Javobni shu yerda kuzatib boring.",
    stWait:"Ko'rib chiqilmoqda", stOk:"Qabul qilindi", stNo:"Rad etildi",
    stWaitX:"Ariza dekanatga yuborildi. Javob 3 ish kuni ichida beriladi.",
    appApproved:"Ariza qabul qilindi. Hujjatlarni yuklab oling va to'lovni amalga oshiring.",
    appRejected:"Ariza rad etildi. Batafsil ma'lumot uchun dekanatga murojaat qiling.",
    noDebtForApp:"Akademik qarzdorlik yo'q — ariza yuborish shart emas.",

    /* dekanat (admin) */
    adminMode:"Dekanat rejimi", adminTitle:"Kelgan arizalar", adminOn:"Dekanat rejimi yoqildi",
    accept:"Qabul qilish", reject:"Rad etish", adminNo:"Hozircha yangi ariza yo'q.",
    fromStudent:"Talaba", decidedOk:"Ariza qabul qilindi", decidedNo:"Ariza rad etildi",
    rejectWhy:"Rad etish sababi", rejectPh:"Masalan: hujjatlar to'liq emas",
    exitAdmin:"Dekanat rejimidan chiqish",

    /* dars jadvali */
    semester:"semestr", prevWeek:"Oldingi hafta", nextWeek:"Keyingi hafta",
    thisWeek:"Joriy hafta", todayWord:"bugun",
    schedTitle:"Dars jadvali", noDayLessons:"Dars yo'q",
    lsnTime:"Vaqti", lsnRoom:"Xona", lsnType:"Dars turi", lsnDate:"Sana",
    lsnDur:"Davomiyligi", lsnMin:"daqiqa", lsnNow:"Hozir davom etmoqda",
    lsnDone:"Tugagan", lsnSoon:"Boshlanishiga", lsnLeft:"qoldi",

    /* imtihonlar */
    examTitle:"Imtihonlar", examNext:"Yaqin imtihon", examAll:"Barcha imtihonlar",
    examDays:"kun", examHours:"soat", examMin:"daqiqa", examLeft:"qoldi",
    examToday:"Bugun!", examTomorrow:"Ertaga", examNow:"Hozir davom etmoqda",
    examDone:"O'tgan", examPassed:"Topshirilgan", examType:"Nazorat turi",
    examNo:"Imtihon yo'q", examNoX:"Hozircha imtihon jadvali e'lon qilinmagan.",
    examUpcoming:"Kutilmoqda", examPast:"O'tgan imtihonlar",
    examRetake:"Qayta topshirish", examGrade:"Baho",

    /* arizalar bo'limi */
    appsTitle:"Arizalarim", appsAll:"Hammasi", appsWait:"Ko'rib chiqilmoqda",
    appsDone:"Javob berilgan", appsNone:"Ariza yuborilmagan",
    appsNoneX:"Hozircha yuborilgan arizangiz yo'q. Yangi ariza yuborish uchun quyidagi tugmani bosing.",
    appsNoFilter:"Bu bo'lim bo'yicha ariza topilmadi.",
    appsCount:"ta ariza",

    /* yotoqxona */
    dormTitle:"Yotoqxona", dormPlace:"Joy", dormBuilding:"Bino", dormRoom:"Xona",
    dormBed:"O'rin", dormFloor:"Qavat", dormType:"Xona turi", dormPeople:"kishilik",
    dormPay:"To'lov", dormPaid:"To'langan", dormDebt:"Qarzdorlik", dormPerMonth:"oyiga",
    dormRules:"Ichki tartib qoidalari", dormContact:"Komendant",
    dormNo:"Joy band qilinmagan",
    dormNoX:"Sizga yotoqxonadan joy ajratilmagan. Ariza berish uchun quyidagi tugmani bosing.",
    dormApply:"Yotoqxonaga ariza berish", dormApplied:"Ariza yuborildi",
    dormQueue:"Navbatdasiz", dormQueueN:"Navbat raqami",
    dormStatus:"Holat", dormActive:"Faol", dormFrom:"Joylashgan sana",

    /* rezyume */
    cvTitle:"Rezyume", cvEdu:"Ta'lim", cvSkills:"Ko'nikmalar",
    cvAwards:"Yutuqlar", cvCourses:"Kurslar", cvPapers:"Maqolalar",
    cvContact:"Aloqa", cvAbout:"Qisqacha", cvGpa:"O'rtacha ball",
    cvDownload:"PDF yuklab olish", cvShare:"Havolani ulashish",
    cvExp:"Ish tajribasi", cvProjects:"Loyihalar", cvLangs:"Tillar",
    cvLang:"Dasturlash tillari", cvFw:"Freymvorklar", cvDb:"Ma'lumotlar bazasi",
    cvTools:"Vositalar", cvOther:"Boshqa",
    cvNative:"ona tili", cvFluent:"erkin", cvBasic:"boshlang'ich",
    cvNone:"Rezyume yaratilmagan",
    cvNoneX:"Rezyume yaratsangiz, ish beruvchilar sizni topa oladi. Kabinetdagi ma'lumotlar avtomatik qo'shiladi.",
    cvCreate:"Rezyume yaratish",
    cvAbout2:"Frontend yo'nalishidagi talaba. React va TypeScript bilan interfeys yaratish bo'yicha "+
             "amaliy tajribaga ega. Moslashuvchan dizayn va REST API integratsiyasi bilan ishlaydi.",
    cvAutoNote:"Rezyume kabinetdagi ma'lumotlaringizdan avtomatik tuzildi.",
    cvAboutText:"Django va Django REST Framework yo'nalishiga ixtisoslashgan Python backend dasturchi. "+
                "Token autentifikatsiya va egalik asosidagi ruxsat qatlami bilan to'liq CRUD REST API'lar "+
                "yaratgan. SQL so'rovlar, ma'lumotlar bazasi sxemasini loyihalash va Git bo'yicha amaliy "+
                "tajribaga ega. Hozirda kuniga 100+ foydalanuvchiga xizmat ko'rsatuvchi HR platformasida "+
                "texnik yordam ko'rsatadi.",
    cvAbout3:"Axborot tizimlari va texnologiyalari yo'nalishidagi talaba. Veb ilovalar yaratish bo'yicha "+
             "amaliy tajribaga ega: JavaScript, HTML va CSS bilan mobil interfeyslar quradi. "+
             "Toza kod va foydalanuvchiga qulay dizaynga e'tibor qaratadi.",

    /* fotogalereya */
    photoTitle:"Fotogalereya", photoCount:"ta surat", photoNo:"Surat yo'q",
    photoNoX:"Tadbirlar suratlari shu yerda ko'rinadi.", photoAll:"Barchasi",
    weekLessons:"ta dars", freeDay:"Dam olish kuni",
    noLessons:"Tanlangan hafta uchun dars jadvali kiritilmagan.",
    noToday:"Bugun dars yo'q",

    /* kirish */
    authSub:"Davom etish uchun kirish kodini kiriting",
    enter:"Kirish", checking:"Tekshirilmoqda...",
    badCode:"4 xonali kodni kiriting",
    wrongCode:"Kod noto'g'ri", welcome:"Xush kelibsiz!",
    authFoot:"Kirish orqali siz ommaviy oferta shartlariga rozilik bildirasiz",
    demoYourCode:"Namuna rejimi — kirish kodi:", demoFill:"Qo'yish",
    demoCodes:"Namuna rejimi — talabani tanlang:",

    /* batafsil oyna */
    author:"Muallif", year:"Yil", format:"Format", pages:"Betlar soni",
    bookLang:"Til", backOn:"Qaytariladi",
    company:"Tashkilot", place:"Joylashuv", workMode:"Ish rejimi", salary:"Maosh",
    result:"Natija", organizer:"Tashkilotchi", dateWord:"Sana",
    teacher:"O'qituvchi", lessons:"Darslar soni", duration:"Davomiyligi", level:"Daraja",
    source:"Nashr", advisor:"Ilmiy rahbar",
    readTime:"O'qish vaqti", views:"Ko'rishlar",
    progress:"Ko'rilgan", close:"Yopish",
    download:"Yuklab olish", reserve:"Band qilish", applyJob:"Ariza yuborish",
    closedJob:"Vakansiya yopilgan", viewCert:"Sertifikatni ko'rish",
    watch:"Ko'rishni boshlash", readMore:"To'liq o'qish",
    downloadSoon:"Yuklash tez orada ishga tushadi",
    reserveSoon:"Band qilish tez orada ishga tushadi",
    applySoon:"Ariza yuborish tez orada ishga tushadi",
    certSoon:"Sertifikat tez orada mavjud bo'ladi",
    watchSoon:"Videolar tez orada qo'shiladi",
    readSoon:"Matn tez orada qo'shiladi",

    /* sozlamalar */
    general:"Umumiy", data:"Ma'lumotlar",
    notifLessons:"Darslar", notifLessonsSub:"Dars boshlanishidan oldin eslatma",
    notifNews:"E'lonlar", notifNewsSub:"Universitet xabarlari",
    notifDebts:"Qarzdorlik", notifDebtsSub:"To'lov va akademik qarz haqida",
    notifSound:"Ovoz",
    clearCache:"Ma'lumotlarni tozalash", clearCacheSub:"Saqlangan sozlamalar o'chiriladi",
    clearCacheAsk:"Barcha saqlangan ma'lumotlar (til, sozlamalar, shaxsiy ma'lumotlar) o'chiriladi. Davom etasizmi?",
    clearYes:"Ha, tozalash", cleared:"Ma'lumotlar tozalandi",

    /* ilova haqida */
    aboutText:"Talabalar uchun yagona ilova: dars jadvali, davomat, qarzdorlik, kutubxona va karyera markazi.",
    aboutNote:"Ilova sinov bosqichida. Ma'lumotlar namuna sifatida ko'rsatilgan.",

    /* yordam */
    faq1q:"Ma'lumotlarim noto'g'ri ko'rsatilyapti",
    faq1a:"Kabinet bo'limidagi “Shaxsiy ma'lumotlar” orqali telefon va pochtani o'zgartirishingiz mumkin. Guruh va fakultetni faqat dekanat o'zgartiradi.",
    faq2q:"Akademik qarzdorlikni qanday yopaman?",
    faq2a:"Qayta topshirish uchun dekanatga murojaat qiling. Topshirilgandan keyin ma'lumot 1-2 kun ichida yangilanadi.",
    faq3q:"Ilova ishlamayapti yoki sekin",
    faq3a:"Sozlamalar bo'limidan “Ma'lumotlarni tozalash” ni bosing va ilovani qayta oching.",
    helpContact:"Qo'shimcha savollar bo'yicha universitet o'quv bo'limiga murojaat qiling.",

    /* ulashish */
    linkCopied:"Havola nusxalandi", shareFail:"Ulashib bo'lmadi",
    promoSoon:"Tez orada ishga tushadi",

    /* hujjatlar */
    offerDoc:[
      ["1. Umumiy qoidalar","Ushbu ilova universitet talabalari uchun mo'ljallangan axborot xizmatidir. Ilovadan foydalanish orqali siz shartlarga rozilik bildirasiz."],
      ["2. Xizmat doirasi","Ilova dars jadvali, davomat, qarzdorlik, kutubxona va karyera bo'yicha ma'lumot beradi. Ma'lumotlar universitet axborot tizimidan olinadi."],
      ["3. Javobgarlik","Ilovada ko'rsatilgan ma'lumotlar ma'lumot uchun. Rasmiy hujjat sifatida dekanat tasdiqlagan nusxa ishlatiladi."],
      ["4. O'zgarishlar","Shartlar oldindan xabar berilmasdan o'zgartirilishi mumkin. Yangi tahrir ilovada e'lon qilinadi."]
    ],
    privacyDoc:[
      ["Qanday ma'lumot yig'iladi","Ism, guruh, fakultet, bosqich — universitet tizimidan. Telefon va pochta — siz kiritsangiz."],
      ["Qayerda saqlanadi","O'zgartirgan ma'lumotlaringiz shu qurilmaning xotirasida (localStorage) saqlanadi va serverga yuborilmaydi."],
      ["Uchinchi shaxslar","Ma'lumotlaringiz reklama yoki boshqa maqsadda uchinchi shaxslarga berilmaydi."],
      ["Ma'lumotni o'chirish","Sozlamalar → Ma'lumotlarni tozalash orqali qurilmada saqlangan hamma narsani o'chirishingiz mumkin."]
    ],

    /* drawer */
    about:"Ilova haqida", share:"Ulashish", help:"Yordam",
    offer:"Ommaviy oferta", privacy:"Maxfiylik siyosati", version:"Ilova versiyasi",
    promoText:"Barcha ma'lumotlaringiz yagona ilovada",

    /* kunlar va oylar */
    days:["Yakshanba","Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"],
    months:["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentabr","oktabr","noyabr","dekabr"],
    dateFmt:function(d, L){ return L.days[d.getDay()] + ', ' + d.getDate() + '-' + L.months[d.getMonth()]; }
  },

  ru:{
    _name:"Русский", _code:"RU",

    tabHome:"Главная", tabLib:"Библиотека", tabCareer:"Карьера", tabProfile:"Кабинет",
    titleHome:"Главная", titleLib:"Библиотека", titleCareer:"Карьера", titleProfile:"Кабинет",

    today:"Занятия сегодня", todayLeft:"осталось", all:"Все",
    metrics:"Показатели", news:"Объявления",
    attendance:"Посещаемость", avgGrade:"Средний балл", soon:"Скоро",
    now:"Сейчас", allGood:"Все предметы в норме", lowSubj:"предм. низкая",

    /* посещаемость */
    attTitle:"Посещаемость", attTotal:"Общая посещаемость", attHours:"ч.",
    attAll:"Всего", attCame:"Посещено", attMissed:"Пропущено",
    attExcused:"По уважит.", attUnexcused:"Без причины",
    attMissedDays:"Пропущенные занятия", attNoMiss:"Ни одного пропуска",
    attOf:"из", attWarn:"Низкая посещаемость — обратитесь в деканат",
    attRisk:"предм. низкая посещаемость", attFine:"Посещаемость в норме",
    attNoData:"Нет данных", attNoDataX:"Данные о посещаемости ещё не внесены.",
    newTag:"НОВОЕ",

    schedule:"Расписание", grades:"Мои оценки", debts:"Задолженность",
    applications:"Заявления", callLetter:"Вызов", dorm:"Общежитие",

    libTitle:"Электронная библиотека", careerTitle:"Центр карьеры",
    personalData:"Личные данные", resume:"Резюме", jobs:"Вакансии",
    awards:"Достижения", masterclass:"Мастер-классы", articles:"Научные статьи",
    blogs:"Блоги", gallery:"Фотогалерея",

    infoTitle:"Данные", settings:"Настройки",
    changePass:"Изменить пароль", logout:"Выйти из системы",
    faculty:"Факультет", eduForm:"Форма обучения", course:"Курс",
    studentId:"ID студента", status:"Статус", phone:"Телефон", email:"Эл. почта",
    group:"Группа", fullName:"Ф.И.О.",

    debtTitle:"Задолженности", byContract:"По контракту", academic:"Академическая",
    notFound:"Данные не найдены",
    noAcademic:"учебный год — академической задолженности нет.",
    noContract:"учебный год — задолженности по оплате нет.",
    academicDebt:"Академическая задолженность", subjects:"предмета",
    retakeNote:"Для пересдачи обратитесь в деканат",
    totalDebt:"Общая задолженность", payBy:"Срок оплаты:",
    points:"баллов", pointsShort:"баллов не хватает",

    /* оценки */
    gradesTitle:"Мои оценки", gpaLabel:"Средний балл", gpaOf:"из 5",
    semLabel:"семестр", allSem:"Все семестры",
    gCredits:"кредит", gTotal:"Всего", gPassed:"Освоено", gFailed:"Не освоено",
    gJN:"ТК", gON:"РК", gYN:"ИК",
    gJNFull:"Текущий контроль", gONFull:"Рубежный контроль", gYNFull:"Итоговый контроль",
    gA5:"Отлично", gB4:"Хорошо", gC3:"Удовлетворительно", gD2:"Неудовлетворительно",
    gNoData:"Оценки не выставлены", gNoDataX:"За выбранный семестр оценки ещё не выставлены.",
    gSubjCount:"предметов", gBest:"Наивысший", gWorst:"Наименьший",
    gDebtSubj:"предмет(ов) не сдано",
    gDetail:"По видам контроля", gMax:"макс",

    save:"Сохранить", cancel:"Отмена", change:"Изменить",
    yesExit:"Да, выйти", markRead:"Отметить как прочитанное",
    notifications:"Уведомления", unread:"непрочитанных",
    noNew:"Новых сообщений нет", allRead:"Все уведомления прочитаны.",
    langTitle:"Язык", langSub:"Выберите язык приложения",
    themeTitle:"Оформление", themeSub:"Светлый или тёмный режим",
    themeAuto:"Как в системе", themeAutoSub:"Подстраивается под настройки телефона",
    themeLight:"Светлое", themeDark:"Тёмное",

    editSub:"Изменённые данные сохраняются на этом устройстве.",
    currentPass:"Текущий пароль", newPass:"Новый пароль", repeatPass:"Повторите пароль",
    passSub:"Новый пароль должен содержать минимум 6 символов.",
    min6:"Минимум 6 символов", passMismatch:"Пароли не совпадают",
    required:"Обязательное поле", groupHint:"Группу меняет деканат",
    exitTitle:"Выход из системы", exitSub:"Вы действительно хотите выйти?",
    sessionEnded:"Сеанс истёк — войдите снова",
    justNow:"Только что", minAgo:"мин. назад", hourAgo:"ч. назад",
    yesterday:"Вчера", dayAgo:"дн. назад",

    saved:"Данные сохранены", checkData:"Проверьте данные",
    passChanged:"Пароль изменён", checkPass:"Проверьте пароли",
    loggedOut:"Вы вышли из системы", allMarked:"Все сообщения прочитаны",
    updated:"Данные обновлены",

    fApps:"Заявления", fRetake:"Повторное обучение", fFinal:"Итоговый экзамен",
    subjects2:"Предметы", credits:"Кредит",
    dlApp:"Скачать заявление", dlContract:"Скачать договор", dlReceipt:"Квитанция",
    dlSoon:"Скачивание скоро заработает",
    noApps:"По выбранному разделу заявлений нет.",

    newApp:"Новое заявление", sendApp:"Отправить заявление", appType:"Тип заявления",
    appSubjects:"Выберите предметы", appNote:"Комментарий", appNoteHint:"Кратко укажите причину",
    appNotePh:"Например: не смог прийти на экзамен по болезни",
    pickSubject:"Выберите хотя бы один предмет", writeNote:"Напишите комментарий",
    appSent:"Заявление отправлено", appSentX:"Заявление отправлено в деканат. Следите за ответом здесь.",
    stWait:"На рассмотрении", stOk:"Принято", stNo:"Отклонено",
    stWaitX:"Заявление отправлено в деканат. Ответ в течение 3 рабочих дней.",
    appApproved:"Заявление принято. Скачайте документы и произведите оплату.",
    appRejected:"Заявление отклонено. За подробностями обратитесь в деканат.",
    noDebtForApp:"Академической задолженности нет — заявление не требуется.",

    adminMode:"Режим деканата", adminTitle:"Поступившие заявления", adminOn:"Режим деканата включён",
    accept:"Принять", reject:"Отклонить", adminNo:"Новых заявлений пока нет.",
    fromStudent:"Студент", decidedOk:"Заявление принято", decidedNo:"Заявление отклонено",
    rejectWhy:"Причина отказа", rejectPh:"Например: документы неполные",
    exitAdmin:"Выйти из режима деканата",

    semester:"семестр", prevWeek:"Предыдущая неделя", nextWeek:"Следующая неделя",
    thisWeek:"Текущая неделя", todayWord:"сегодня",
    schedTitle:"Расписание", noDayLessons:"Занятий нет",
    lsnTime:"Время", lsnRoom:"Аудитория", lsnType:"Вид занятия", lsnDate:"Дата",
    lsnDur:"Длительность", lsnMin:"мин.", lsnNow:"Идёт сейчас",
    lsnDone:"Завершено", lsnSoon:"До начала", lsnLeft:"осталось",

    /* экзамены */
    examTitle:"Экзамены", examNext:"Ближайший экзамен", examAll:"Все экзамены",
    examDays:"дн.", examHours:"ч.", examMin:"мин.", examLeft:"осталось",
    examToday:"Сегодня!", examTomorrow:"Завтра", examNow:"Идёт сейчас",
    examDone:"Прошёл", examPassed:"Сдан", examType:"Вид контроля",
    examNo:"Экзаменов нет", examNoX:"Расписание экзаменов пока не опубликовано.",
    examUpcoming:"Предстоящие", examPast:"Прошедшие экзамены",
    examRetake:"Пересдача", examGrade:"Оценка",

    /* заявления */
    appsTitle:"Мои заявления", appsAll:"Все", appsWait:"На рассмотрении",
    appsDone:"С ответом", appsNone:"Заявлений нет",
    appsNoneX:"Вы ещё не подавали заявлений. Нажмите кнопку ниже, чтобы подать новое.",
    appsNoFilter:"По этому разделу заявлений не найдено.",
    appsCount:"заявлений",

    /* общежитие */
    dormTitle:"Общежитие", dormPlace:"Место", dormBuilding:"Корпус", dormRoom:"Комната",
    dormBed:"Койко-место", dormFloor:"Этаж", dormType:"Тип комнаты", dormPeople:"-местная",
    dormPay:"Оплата", dormPaid:"Оплачено", dormDebt:"Задолженность", dormPerMonth:"в месяц",
    dormRules:"Правила проживания", dormContact:"Комендант",
    dormNo:"Место не выделено",
    dormNoX:"Вам не выделено место в общежитии. Нажмите кнопку ниже, чтобы подать заявление.",
    dormApply:"Подать заявление", dormApplied:"Заявление отправлено",
    dormQueue:"Вы в очереди", dormQueueN:"Номер в очереди",
    dormStatus:"Статус", dormActive:"Активно", dormFrom:"Дата заселения",

    /* резюме */
    cvTitle:"Резюме", cvEdu:"Образование", cvSkills:"Навыки",
    cvAwards:"Достижения", cvCourses:"Курсы", cvPapers:"Публикации",
    cvContact:"Контакты", cvAbout:"О себе", cvGpa:"Средний балл",
    cvDownload:"Скачать PDF", cvShare:"Поделиться ссылкой",
    cvExp:"Опыт работы", cvProjects:"Проекты", cvLangs:"Языки",
    cvLang:"Языки программирования", cvFw:"Фреймворки", cvDb:"Базы данных",
    cvTools:"Инструменты", cvOther:"Прочее",
    cvNative:"родной", cvFluent:"свободно", cvBasic:"базовый",
    cvNone:"Резюме не создано",
    cvNoneX:"Создайте резюме, чтобы работодатели могли вас найти. Данные из кабинета добавятся автоматически.",
    cvCreate:"Создать резюме",
    cvAbout2:"Студентка направления frontend-разработки. Практический опыт создания интерфейсов "+
             "на React и TypeScript. Работает с адаптивной вёрсткой и интеграцией REST API.",
    cvAutoNote:"Резюме сформировано автоматически из данных вашего кабинета.",
    cvAboutText:"Python backend-разработчик со специализацией на Django и Django REST Framework. "+
                "Разработал полноценные CRUD REST API с токен-аутентификацией и слоем прав на основе "+
                "владения объектом. Практический опыт работы с SQL-запросами, проектированием схемы "+
                "базы данных и Git. Сейчас оказывает техническую поддержку HR-платформы, обслуживающей "+
                "100+ пользователей ежедневно.",
    cvAbout3:"Студент направления информационных систем и технологий. Практический опыт создания "+
             "веб-приложений: разрабатывает мобильные интерфейсы на JavaScript, HTML и CSS. "+
             "Уделяет внимание чистому коду и удобному для пользователя дизайну.",

    /* фотогалерея */
    photoTitle:"Фотогалерея", photoCount:"фото", photoNo:"Фотографий нет",
    photoNoX:"Здесь появятся фотографии с мероприятий.", photoAll:"Все",
    weekLessons:"занятий", freeDay:"Выходной",
    noLessons:"На выбранную неделю расписание не загружено.",
    noToday:"Сегодня занятий нет",

    authSub:"Введите код доступа, чтобы продолжить",
    enter:"Войти", checking:"Проверка...",
    badCode:"Введите 4-значный код",
    wrongCode:"Неверный код", welcome:"Добро пожаловать!",
    authFoot:"Входя, вы соглашаетесь с условиями публичной оферты",
    demoYourCode:"Демо-режим — код доступа:", demoFill:"Вставить",
    demoCodes:"Демо-режим — выберите студента:",

    author:"Автор", year:"Год", format:"Формат", pages:"Страниц",
    bookLang:"Язык", backOn:"Вернётся",
    company:"Организация", place:"Место", workMode:"График", salary:"Зарплата",
    result:"Результат", organizer:"Организатор", dateWord:"Дата",
    teacher:"Преподаватель", lessons:"Уроков", duration:"Длительность", level:"Уровень",
    source:"Издание", advisor:"Научный руководитель",
    readTime:"Время чтения", views:"Просмотры",
    progress:"Пройдено", close:"Закрыть",
    download:"Скачать", reserve:"Забронировать", applyJob:"Откликнуться",
    closedJob:"Вакансия закрыта", viewCert:"Посмотреть сертификат",
    watch:"Начать просмотр", readMore:"Читать полностью",
    downloadSoon:"Скачивание скоро заработает",
    reserveSoon:"Бронирование скоро заработает",
    applySoon:"Отклик скоро заработает",
    certSoon:"Сертификат скоро будет доступен",
    watchSoon:"Видео скоро добавят",
    readSoon:"Текст скоро добавят",

    general:"Общие", data:"Данные",
    notifLessons:"Занятия", notifLessonsSub:"Напоминание перед началом пары",
    notifNews:"Объявления", notifNewsSub:"Новости университета",
    notifDebts:"Задолженность", notifDebtsSub:"Об оплате и академическом долге",
    notifSound:"Звук",
    clearCache:"Очистить данные", clearCacheSub:"Сохранённые настройки будут удалены",
    clearCacheAsk:"Все сохранённые данные (язык, настройки, личные данные) будут удалены. Продолжить?",
    clearYes:"Да, очистить", cleared:"Данные очищены",

    aboutText:"Единое приложение для студентов: расписание, посещаемость, задолженности, библиотека и центр карьеры.",
    aboutNote:"Приложение в тестовой версии. Данные показаны как пример.",

    faq1q:"Мои данные отображаются неверно",
    faq1a:"В разделе Кабинет → Личные данные можно изменить телефон и почту. Группу и факультет меняет только деканат.",
    faq2q:"Как закрыть академическую задолженность?",
    faq2a:"Обратитесь в деканат для пересдачи. Данные обновятся в течение 1–2 дней.",
    faq3q:"Приложение не работает или тормозит",
    faq3a:"В Настройках нажмите «Очистить данные» и откройте приложение заново.",
    helpContact:"По дополнительным вопросам обращайтесь в учебный отдел.",

    linkCopied:"Ссылка скопирована", shareFail:"Не удалось поделиться",
    promoSoon:"Скоро запустится",

    offerDoc:[
      ["1. Общие положения","Приложение предназначено для студентов университета. Используя его, вы соглашаетесь с условиями."],
      ["2. Объём услуг","Приложение предоставляет данные о расписании, посещаемости, задолженностях, библиотеке и карьере."],
      ["3. Ответственность","Данные носят информационный характер. Официальным документом считается копия, заверенная деканатом."],
      ["4. Изменения","Условия могут быть изменены без предварительного уведомления."]
    ],
    privacyDoc:[
      ["Какие данные собираются","Имя, группа, факультет, курс — из системы университета. Телефон и почта — если вы их укажете."],
      ["Где хранятся","Изменённые данные хранятся в памяти этого устройства и не отправляются на сервер."],
      ["Третьи лица","Ваши данные не передаются третьим лицам."],
      ["Удаление данных","Настройки → Очистить данные удалит всё, что сохранено на устройстве."]
    ],

    about:"О приложении", share:"Поделиться", help:"Помощь",
    offer:"Публичная оферта", privacy:"Политика конфиденциальности", version:"Версия приложения",
    promoText:"Все ваши данные в одном приложении",

    days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],
    months:["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],
    dateFmt:function(d, L){ return L.days[d.getDay()] + ', ' + d.getDate() + ' ' + L.months[d.getMonth()]; }
  },

  en:{
    _name:"English", _code:"EN",

    tabHome:"Home", tabLib:"Library", tabCareer:"Career", tabProfile:"Profile",
    titleHome:"Home", titleLib:"Library", titleCareer:"Career", titleProfile:"Profile",

    today:"Today's classes", todayLeft:"left", all:"See all",
    metrics:"Overview", news:"Announcements",
    attendance:"Attendance", avgGrade:"Average grade", soon:"Coming soon",
    now:"Now", allGood:"All subjects on track", lowSubj:"subject(s) low",

    /* attendance */
    attTitle:"Attendance", attTotal:"Overall attendance", attHours:"h",
    attAll:"Total", attCame:"Attended", attMissed:"Missed",
    attExcused:"Excused", attUnexcused:"Unexcused",
    attMissedDays:"Missed classes", attNoMiss:"No classes missed",
    attOf:"of", attWarn:"Low attendance — contact the dean's office",
    attRisk:"subject(s) with low attendance", attFine:"Attendance is fine",
    attNoData:"No data", attNoDataX:"Attendance data has not been entered yet.",
    newTag:"NEW",

    schedule:"Class schedule", grades:"My grades", debts:"Debts",
    applications:"Applications", callLetter:"Call letter", dorm:"Dormitory",

    libTitle:"Digital library", careerTitle:"Career centre",
    personalData:"Personal details", resume:"Resume", jobs:"Job offers",
    awards:"Achievements", masterclass:"Masterclasses", articles:"Research papers",
    blogs:"Blogs", gallery:"Photo gallery",

    infoTitle:"Details", settings:"Settings",
    changePass:"Change password", logout:"Log out",
    faculty:"Faculty", eduForm:"Study mode", course:"Year",
    studentId:"Student ID", status:"Status", phone:"Phone", email:"Email",
    group:"Group", fullName:"Full name",

    debtTitle:"Debts", byContract:"By contract", academic:"Academic debt",
    notFound:"No data found",
    noAcademic:"academic year — no academic debt.",
    noContract:"academic year — no payment debt.",
    academicDebt:"Academic debt", subjects:"subject(s)",
    retakeNote:"Contact the dean's office to retake",
    totalDebt:"Total debt", payBy:"Due date:",
    points:"points", pointsShort:"points short",

    /* grades */
    gradesTitle:"My grades", gpaLabel:"Average score", gpaOf:"of 5",
    semLabel:"semester", allSem:"All semesters",
    gCredits:"credits", gTotal:"Total", gPassed:"Passed", gFailed:"Failed",
    gJN:"CA", gON:"MT", gYN:"FE",
    gJNFull:"Continuous assessment", gONFull:"Midterm", gYNFull:"Final exam",
    gA5:"Excellent", gB4:"Good", gC3:"Satisfactory", gD2:"Unsatisfactory",
    gNoData:"No grades yet", gNoDataX:"Grades for the selected semester have not been posted yet.",
    gSubjCount:"subjects", gBest:"Highest", gWorst:"Lowest",
    gDebtSubj:"subjects failed",
    gDetail:"By assessment type", gMax:"max",

    save:"Save", cancel:"Cancel", change:"Change",
    yesExit:"Yes, log out", markRead:"Mark as read",
    notifications:"Notifications", unread:"unread",
    noNew:"No new messages", allRead:"All notifications have been read.",
    langTitle:"Language", langSub:"Choose the app language",
    themeTitle:"Appearance", themeSub:"Light or dark mode",
    themeAuto:"System default", themeAutoSub:"Follows your phone settings",
    themeLight:"Light", themeDark:"Dark",

    editSub:"Changes are saved on this device.",
    currentPass:"Current password", newPass:"New password", repeatPass:"Repeat new password",
    passSub:"The new password must be at least 6 characters.",
    min6:"At least 6 characters", passMismatch:"Passwords do not match",
    required:"This field is required", groupHint:"The group is set by the dean's office",
    exitTitle:"Log out", exitSub:"Are you sure you want to log out?",
    sessionEnded:"Session expired — please sign in again",
    justNow:"Just now", minAgo:"min ago", hourAgo:"h ago",
    yesterday:"Yesterday", dayAgo:"d ago",

    saved:"Details saved", checkData:"Please check the details",
    passChanged:"Password changed", checkPass:"Please check the passwords",
    loggedOut:"You have been logged out", allMarked:"All messages marked as read",
    updated:"Data updated",

    fApps:"Applications", fRetake:"Repeat course", fFinal:"Final exam",
    subjects2:"Subjects", credits:"Credits",
    dlApp:"Download application", dlContract:"Download contract", dlReceipt:"Receipt",
    dlSoon:"Downloading will be available soon",
    noApps:"No applications found in this section.",

    newApp:"New application", sendApp:"Submit application", appType:"Application type",
    appSubjects:"Select subjects", appNote:"Comment", appNoteHint:"Briefly state the reason",
    appNotePh:"For example: I missed the exam due to illness",
    pickSubject:"Select at least one subject", writeNote:"Please write a comment",
    appSent:"Application submitted", appSentX:"Your application was sent to the dean's office. Track the reply here.",
    stWait:"Under review", stOk:"Approved", stNo:"Rejected",
    stWaitX:"Sent to the dean's office. A reply follows within 3 working days.",
    appApproved:"Application approved. Download the documents and complete the payment.",
    appRejected:"Application rejected. Contact the dean's office for details.",
    noDebtForApp:"No academic debt — no application needed.",

    adminMode:"Dean's office mode", adminTitle:"Incoming applications", adminOn:"Dean's office mode enabled",
    accept:"Approve", reject:"Reject", adminNo:"No new applications yet.",
    fromStudent:"Student", decidedOk:"Application approved", decidedNo:"Application rejected",
    rejectWhy:"Reason for rejection", rejectPh:"For example: incomplete documents",
    exitAdmin:"Exit dean's office mode",

    semester:"semester", prevWeek:"Previous week", nextWeek:"Next week",
    thisWeek:"Current week", todayWord:"today",
    schedTitle:"Class schedule", noDayLessons:"No classes",
    lsnTime:"Time", lsnRoom:"Room", lsnType:"Class type", lsnDate:"Date",
    lsnDur:"Duration", lsnMin:"min", lsnNow:"In progress",
    lsnDone:"Finished", lsnSoon:"Starts in", lsnLeft:"left",

    /* exams */
    examTitle:"Exams", examNext:"Next exam", examAll:"All exams",
    examDays:"d", examHours:"h", examMin:"min", examLeft:"left",
    examToday:"Today!", examTomorrow:"Tomorrow", examNow:"In progress",
    examDone:"Past", examPassed:"Passed", examType:"Assessment type",
    examNo:"No exams", examNoX:"The exam schedule has not been published yet.",
    examUpcoming:"Upcoming", examPast:"Past exams",
    examRetake:"Retake", examGrade:"Grade",

    /* applications */
    appsTitle:"My applications", appsAll:"All", appsWait:"Under review",
    appsDone:"Answered", appsNone:"No applications",
    appsNoneX:"You have not submitted any applications yet. Tap the button below to create one.",
    appsNoFilter:"No applications found in this section.",
    appsCount:"applications",

    /* dormitory */
    dormTitle:"Dormitory", dormPlace:"Place", dormBuilding:"Building", dormRoom:"Room",
    dormBed:"Bed", dormFloor:"Floor", dormType:"Room type", dormPeople:"-person",
    dormPay:"Payment", dormPaid:"Paid", dormDebt:"Outstanding", dormPerMonth:"per month",
    dormRules:"House rules", dormContact:"Warden",
    dormNo:"No place assigned",
    dormNoX:"You have not been assigned a place. Tap the button below to apply.",
    dormApply:"Apply for a place", dormApplied:"Application sent",
    dormQueue:"You are in the queue", dormQueueN:"Queue number",
    dormStatus:"Status", dormActive:"Active", dormFrom:"Moved in",

    /* resume */
    cvTitle:"Resume", cvEdu:"Education", cvSkills:"Skills",
    cvAwards:"Achievements", cvCourses:"Courses", cvPapers:"Publications",
    cvContact:"Contact", cvAbout:"About", cvGpa:"Average score",
    cvDownload:"Download PDF", cvShare:"Share link",
    cvExp:"Experience", cvProjects:"Projects", cvLangs:"Languages",
    cvLang:"Languages", cvFw:"Frameworks", cvDb:"Databases",
    cvTools:"Tools", cvOther:"Other",
    cvNative:"native", cvFluent:"fluent", cvBasic:"basic",
    cvNone:"No resume yet",
    cvNoneX:"Create a resume so employers can find you. Your profile data will be added automatically.",
    cvCreate:"Create resume",
    cvAbout2:"Frontend development student with hands-on experience building interfaces in React "+
             "and TypeScript. Works with responsive layouts and REST API integration.",
    cvAutoNote:"This resume was generated automatically from your profile data.",
    cvAboutText:"Python backend developer focused on Django and Django REST Framework. Built full CRUD "+
                "REST APIs with token authentication and an ownership-based permission layer. Practical "+
                "experience with SQL queries, database schema design, and Git. Currently provides technical "+
                "support for an HR platform serving 100+ daily users.",
    cvAbout3:"Information systems and technologies student with hands-on experience building web "+
             "applications. Creates mobile interfaces with JavaScript, HTML and CSS, with a focus on "+
             "clean code and user-friendly design.",

    /* photo gallery */
    photoTitle:"Photo gallery", photoCount:"photos", photoNo:"No photos",
    photoNoX:"Event photos will appear here.", photoAll:"All",
    weekLessons:"classes", freeDay:"Day off",
    noLessons:"No schedule has been published for the selected week.",
    noToday:"No classes today",

    authSub:"Enter the access code to continue",
    enter:"Log in", checking:"Checking...",
    badCode:"Enter the 4-digit code",
    wrongCode:"Wrong code", welcome:"Welcome!",
    authFoot:"By logging in you accept the terms of the public offer",
    demoYourCode:"Demo mode — access code:", demoFill:"Fill in",
    demoCodes:"Demo mode — pick a student:",

    author:"Author", year:"Year", format:"Format", pages:"Pages",
    bookLang:"Language", backOn:"Available from",
    company:"Organisation", place:"Location", workMode:"Schedule", salary:"Salary",
    result:"Result", organizer:"Organiser", dateWord:"Date",
    teacher:"Instructor", lessons:"Lessons", duration:"Duration", level:"Level",
    source:"Publication", advisor:"Supervisor",
    readTime:"Reading time", views:"Views",
    progress:"Completed", close:"Close",
    download:"Download", reserve:"Reserve", applyJob:"Apply",
    closedJob:"Position closed", viewCert:"View certificate",
    watch:"Start watching", readMore:"Read in full",
    downloadSoon:"Downloading will be available soon",
    reserveSoon:"Reserving will be available soon",
    applySoon:"Applying will be available soon",
    certSoon:"The certificate will be available soon",
    watchSoon:"Videos are coming soon",
    readSoon:"The full text is coming soon",

    general:"General", data:"Data",
    notifLessons:"Classes", notifLessonsSub:"Reminder before a class starts",
    notifNews:"Announcements", notifNewsSub:"University news",
    notifDebts:"Debts", notifDebtsSub:"Payment and academic debt alerts",
    notifSound:"Sound",
    clearCache:"Clear data", clearCacheSub:"Saved settings will be removed",
    clearCacheAsk:"All saved data (language, settings, personal details) will be removed. Continue?",
    clearYes:"Yes, clear", cleared:"Data cleared",

    aboutText:"One app for students: class schedule, attendance, debts, library and the career centre.",
    aboutNote:"The app is in testing. All data shown is sample data.",

    faq1q:"My details are shown incorrectly",
    faq1a:"Go to Profile → Personal details to change your phone and email. Group and faculty are set by the dean's office.",
    faq2q:"How do I clear an academic debt?",
    faq2a:"Contact the dean's office to arrange a retake. The record updates within 1–2 days.",
    faq3q:"The app is not working or is slow",
    faq3a:"Open Settings and tap “Clear data”, then reopen the app.",
    helpContact:"For further questions, contact the university academic office.",

    linkCopied:"Link copied", shareFail:"Could not share",
    promoSoon:"Launching soon",

    offerDoc:[
      ["1. General terms","This app is an information service for university students. By using it you accept these terms."],
      ["2. Scope of service","The app provides information on the class schedule, attendance, debts, library and career centre, sourced from the university system."],
      ["3. Liability","The information shown is for reference. The copy certified by the dean's office is the official document."],
      ["4. Changes","These terms may change without prior notice. Any new version is published in the app."]
    ],
    privacyDoc:[
      ["What data is collected","Name, group, faculty and year come from the university system. Phone and email only if you enter them."],
      ["Where it is stored","Details you change are stored in this device's memory (localStorage) and are not sent to a server."],
      ["Third parties","Your data is not shared with third parties for advertising or any other purpose."],
      ["Deleting data","Settings → Clear data removes everything stored on this device."]
    ],

    about:"About the app", share:"Share", help:"Help",
    offer:"Public offer", privacy:"Privacy policy", version:"App version",
    promoText:"All your information in one app",

    days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    months:["January","February","March","April","May","June","July","August","September","October","November","December"],
    dateFmt:function(d, L){ return L.days[d.getDay()] + ', ' + L.months[d.getMonth()] + ' ' + d.getDate(); }
  }
};

let LANG = 'uz';
try{
  const sv = localStorage.getItem('ms.lang');
  if(sv && I18N[sv]) LANG = sv;
}catch(e){}

/* =========================================================
   MAVZU (yorug' / qorong'i)
   'auto'  — telefon sozlamasiga qarab (standart)
   'light' | 'dark' — foydalanuvchi majburiy tanlagan

   'auto' da <html> da atribut turmaydi, shunda CSS dagi
   @media (prefers-color-scheme) o'zi ishlaydi.
   ========================================================= */
let THEME = 'auto';
try{
  const sv = localStorage.getItem('ms.theme');
  if(sv === 'light' || sv === 'dark' || sv === 'auto') THEME = sv;
}catch(e){}

function applyTheme(){
  const el = document.documentElement;
  if(THEME === 'auto') el.removeAttribute('data-theme');
  else el.setAttribute('data-theme', THEME);

  /* brauzer manzil qatori rangi ham mos bo'lsin */
  const qorongi = THEME === 'dark' ||
    (THEME === 'auto' && window.matchMedia('(prefers-color-scheme:dark)').matches);
  document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){
    m.remove();
  });
  const m = document.createElement('meta');
  m.name = 'theme-color';
  m.content = qorongi ? '#171314' : '#FAF8F8';
  document.head.appendChild(m);
}
applyTheme();

/* 'auto' rejimda tizim sozlamasi o'zgarsa — darhol moslashamiz */
try{
  window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change', function(){
    if(THEME === 'auto') applyTheme();
  });
}catch(e){}

/* t('kalit') — joriy tildagi matnni qaytaradi */
function t(key){
  const L = I18N[LANG];
  return (L && L[key] !== undefined) ? L[key] : (I18N.uz[key] !== undefined ? I18N.uz[key] : key);
}

/* ---------- MA'LUMOTLAR LUG'ATI ----------
   Fan nomlari, xona, dars turi kabi ma'lumotlar SCHEDULE, EXAMS va boshqa
   massivlarda o'zbekcha yozilgan. td() ularni joriy tilga o'giradi.
   Lug'atda topilmasa — matn o'zgarishsiz qaytadi (o'zbekcha ko'rinadi).

   Backend ulanganda: server har bir yozuvni tanlangan tilda qaytaradi,
   shunda td() kerak bo'lmaydi — chaqiruvlarni olib tashlash kifoya. */
const D_RU = {
  /* fakultetlar */
  "Axborot tizimlari va texnologiyalari":"Информационные системы и технологии",
  "Kompyuter injiniringi":"Компьютерный инжиниринг",
  "Iqtisodiyot va menejment":"Экономика и менеджмент",
  /* fanlar */
  "Mobil ilovalar ishlab chiqish":"Разработка мобильных приложений",
  "Axborot xavfsizligi":"Информационная безопасность",
  "Ingliz tili":"Английский язык",
  "Dasturiy ta'minot arxitekturasi":"Архитектура программного обеспечения",
  "Loyihalarni boshqarish":"Управление проектами",
  "Ma'lumotlar bazasi":"Базы данных",
  "Veb dasturlash":"Веб-программирование",
  "Algoritmlar":"Алгоритмы",
  "Operatsion tizimlar":"Операционные системы",
  "Kompyuter tarmoqlari":"Компьютерные сети",
  /* dars turi */
  "Ma'ruza":"Лекция", "Amaliyot":"Практика", "Laboratoriya":"Лаборатория",
  "Yakuniy nazorat":"Итоговый контроль", "Oraliq nazorat":"Промежуточный контроль",
  /* holat */
  "Tayyor":"Готово", "Kutilmoqda":"Ожидается", "Faol":"Активно",
  "Qishki sessiya":"Зимняя сессия", "Yozgi sessiya":"Летняя сессия",
  "Yuborilgan":"Отправлено",
  "Shartnoma yaratildi":"Договор создан",
  "Ko'rib chiqilmoqda":"На рассмотрении", "Javob berilgan":"Отвечено",
  "O'qimoqda":"Учится",
  /* semestr / kurs */
  "1-kurs":"1 курс", "2-kurs":"2 курс", "3-kurs":"3 курс", "4-kurs":"4 курс",
  "Kunduzgi":"Очная", "Sirtqi":"Заочная", "Kechki":"Вечерняя"
};

const D_EN = {
  /* fakultetlar */
  "Axborot tizimlari va texnologiyalari":"Information Systems and Technologies",
  "Kompyuter injiniringi":"Computer Engineering",
  "Iqtisodiyot va menejment":"Economics and Management",
  /* fanlar */
  "Mobil ilovalar ishlab chiqish":"Mobile Application Development",
  "Axborot xavfsizligi":"Information Security",
  "Ingliz tili":"English Language",
  "Dasturiy ta'minot arxitekturasi":"Software Architecture",
  "Loyihalarni boshqarish":"Project Management",
  "Ma'lumotlar bazasi":"Databases",
  "Veb dasturlash":"Web Programming",
  "Algoritmlar":"Algorithms",
  "Operatsion tizimlar":"Operating Systems",
  "Kompyuter tarmoqlari":"Computer Networks",
  /* dars turi */
  "Ma'ruza":"Lecture", "Amaliyot":"Practice", "Laboratoriya":"Lab",
  "Yakuniy nazorat":"Final exam", "Oraliq nazorat":"Midterm",
  /* holat */
  "Tayyor":"Ready", "Kutilmoqda":"Pending", "Faol":"Active",
  "Qishki sessiya":"Winter session", "Yozgi sessiya":"Summer session",
  "Yuborilgan":"Sent",
  "Shartnoma yaratildi":"Contract created",
  "Ko'rib chiqilmoqda":"Under review", "Javob berilgan":"Answered",
  "O'qimoqda":"Studying",
  /* semestr / kurs */
  "1-kurs":"1st year", "2-kurs":"2nd year", "3-kurs":"3rd year", "4-kurs":"4th year",
  "Kunduzgi":"Full-time", "Sirtqi":"Part-time", "Kechki":"Evening"
};

/* td('matn') — ma'lumot matnini joriy tilga o'giradi.
   "214-xona" va "2-bino" kabi raqamli qo'shimchalar alohida ishlanadi. */
function td(s){
  if(s == null) return s;
  const str = String(s);
  if(LANG === 'uz') return str;

  const D = (LANG === 'ru') ? D_RU : D_EN;
  if(D[str] !== undefined) return D[str];

  /* "214-xona" -> "ауд. 214" / "room 214" */
  let m = str.match(/^(\d+)-xona$/);
  if(m) return (LANG === 'ru') ? ('ауд. ' + m[1]) : ('room ' + m[1]);

  /* "2-bino" -> "корпус 2" / "building 2" */
  m = str.match(/^(\d+)-bino$/);
  if(m) return (LANG === 'ru') ? ('корпус ' + m[1]) : ('building ' + m[1]);

  /* "4 kishilik" -> "на 4 человека" / "4-person" */
  m = str.match(/^(\d+)\s*kishilik$/);
  if(m) return (LANG === 'ru') ? ('на ' + m[1] + ' чел.') : (m[1] + '-person');

  /* "Yuborilgan: 05.01.2026 · PDF" — boshidagi so'z tarjima qilinadi */
  m = str.match(/^([^:]+):\s*(.+)$/);
  if(m && D[m[1]] !== undefined) return D[m[1]] + ': ' + m[2];

  return str;
}

/* qavat matni: uz "4-qavat", ru "этаж 4", en "floor 4" */
function qavatText(n){
  if(LANG === 'uz') return n + '-' + t('dormFloor').toLowerCase();
  return t('dormFloor').toLowerCase() + ' ' + n;
}

/* =========================================================
   1) FOYDALANUVCHI — keyin API'dan keladi, faqat shu joy o'zgaradi
   ========================================================= */
/* ---------- TALABALAR BAZASI ----------
   Har bir talabaning o'z kirish kodi bor. Login ekranida kod kiritilganda
   shu talabaning ma'lumotlari yuklanadi.

   Backend ulanganda bu massiv o'rniga:
     POST /api/login  {kod}  ->  {token, talaba}
     GET  /api/talaba (token bilan)
   qolgan kod o'zgarmaydi — USER obyekti to'ldirilsa kifoya. */
let TALABALAR = [];   /* data/*.json dan yuklanadi */

/* Joriy talaba. Login vaqtida to'ldiriladi. */
const USER = {
  name:"", group:"", faculty:"", form:"", course:"",
  studentId:"", status:"", phone:"", email:"", kod:""
};

/* kod bo'yicha talabani topish */
function talabaTop(kod){
  return TALABALAR.filter(function(x){ return x.kod === kod; })[0] || null;
}

/* USER ni tanlangan talaba bilan to'ldirish */
function userYukla(t2){
  Object.keys(USER).forEach(function(k){
    if(k in t2) USER[k] = t2[k];
  });
  USER.kod = t2.kod;
  if(t2.sem) curSem = t2.sem;
}

/* =========================================================
   2) YORDAMCHI FUNKSIYALAR
   ========================================================= */
function $(id){ return document.getElementById(id); }
function initials(full){
  const p = full.trim().split(/\s+/);
  return ((p[0] || '?').charAt(0) + (p[1] || '').charAt(0)).toUpperCase();
}
function esc(s){
  return String(s).replace(/[&<>"]/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
  });
}
function haptic(ms){ if(navigator.vibrate) navigator.vibrate(ms || 8); }
function toMin(s){ const p = s.split(':'); return (+p[0])*60 + (+p[1]); }


/* =========================================================
   3) FOYDALANUVCHI MA'LUMOTLARI
   ========================================================= */
function fillUserUI(){
  $('helloName').textContent = USER.name.split(/\s+/).slice(0,2).join(' ');

  $('profName').textContent   = USER.name;
  $('profGroup').textContent  = USER.group;
  $('profStatus').textContent = td(USER.status);
  $('profAva').textContent    = initials(USER.name);

  $('drawerName').textContent  = USER.name;
  $('drawerGroup').textContent = USER.group;
  $('drawerAva').textContent   = initials(USER.name);

  const rows = [
    [t('faculty'),   td(USER.faculty)],
    [t('eduForm'),   td(USER.form)],
    [t('course'),    td(USER.course)],
    [t('studentId'), USER.studentId],
    [t('status'),    td(USER.status)]
  ];
  if(USER.phone) rows.push([t('phone'), USER.phone]);
  if(USER.email) rows.push([t('email'), USER.email]);

  $('infoBox').innerHTML = rows.map(function(r){
    return '<div class="info__row"><span>'+esc(r[0])+'</span><b>'+esc(r[1])+'</b></div>';
  }).join('');

  if(typeof fillCareerInfo === 'function') fillCareerInfo();
}
fillUserUI();



/* =========================================================
   4) MA'LUMOTLAR
   ========================================================= */
/* Dars jadvali.
   Backend ulanganda bu massiv serverdan keladi (GET /api/jadval):
     {sem:5, date:"2026-09-07", t:"Fan nomi", from:"08:30", to:"09:50",
      room:"214-xona", type:"Amaliyot", teacher:"A. Karimov"}
   date — ISO ko'rinishda "YYYY-MM-DD". */
let SCHEDULE = [];   /* data/*.json dan yuklanadi */

/* ---------- SANA YORDAMCHILARI ---------- */
/* Date -> "YYYY-MM-DD" */
function isoDate(d){
  return d.getFullYear()+'-'+
         String(d.getMonth()+1).padStart(2,'0')+'-'+
         String(d.getDate()).padStart(2,'0');
}

/* berilgan sana tegishli haftaning dushanbasi */
function mondayOf(d){
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return x;
}

/* bugungi sana (ISO) */
function todayIso(){ return isoDate(new Date()); }

/* "qachon" matnini sanadan hisoblaymiz: "2 soat oldin", "Kecha", ...

   E'lonlarda ilgari bu matn qo'lda yozilgan edi ("2 soat oldin"),
   shuning uchun vaqt o'tsa ham o'zgarmasdi. Endi db.json dagi
   `at` (ISO vaqt) dan hisoblanadi va tanlangan tilda chiqadi.
   `at` bo'lmasa — eski `when` matni ishlatiladi. */
function qachonMatn(n){
  const xom = n && n.at;
  if(!xom) return (n && n.when) ? n.when : '';

  /* diqqat: t() — tarjima funksiyasi, shuning uchun sana boshqa nomda */
  const vaqt = new Date(xom);
  if(isNaN(vaqt.getTime())) return n.when || '';

  const daq = Math.floor((Date.now() - vaqt.getTime()) / 60000);

  if(daq < 1)   return t('justNow');
  if(daq < 60)  return daq + ' ' + t('minAgo');

  const soat = Math.floor(daq / 60);
  if(soat < 24) return soat + ' ' + t('hourAgo');

  /* kun farqi kalendar bo'yicha: soatlarga qarab emas */
  const bugun = new Date(); bugun.setHours(0,0,0,0);
  const kun   = new Date(vaqt); kun.setHours(0,0,0,0);
  const farq  = Math.round((bugun - kun) / 86400000);

  if(farq === 1) return t('yesterday');
  if(farq < 7)   return farq + ' ' + t('dayAgo');

  /* eski e'lonlar: "3-sentabr" */
  return kun.getDate() + '-' + I18N[LANG].months[kun.getMonth()];
}

/* bir kunning darslari, vaqt bo'yicha tartiblangan */
function lessonsOn(iso){
  return SCHEDULE.filter(function(l){ return l.date === iso; })
                 .sort(function(a, b){ return toMin(a.from) - toMin(b.from); });
}

/* joriy semestr va ko'rilayotgan hafta */
let SEMESTERS = [];   /* data/*.json dan yuklanadi */
let curSem = 5;
let weekStart = null;   /* dushanba, Date */

/* ---------- IMTIHONLAR ----------
   date  — "YYYY-MM-DD", from/to — vaqt
   tur   — nazorat turi
   ball  — o'tgan imtihon natijasi (bo'lmasa hali topshirilmagan)
   Backend: GET /api/imtihonlar */
let EXAMS = [];   /* data/*.json dan yuklanadi */

/* imtihongacha qolgan vaqt (millisekund; manfiy — o'tib ketgan) */
function examLeftMs(x){
  return new Date(x.date + 'T' + x.from + ':00').getTime() - Date.now();
}

/* imtihon holati: 'now' | 'done' | 'soon' */
function examState(x){
  const start = new Date(x.date + 'T' + x.from + ':00').getTime();
  const end   = new Date(x.date + 'T' + x.to   + ':00').getTime();
  const now   = Date.now();
  return now > end ? 'done' : now >= start ? 'now' : 'soon';
}

/* qolgan vaqtni matnga aylantirish: "12 kun 4 soat" */
function examCountdown(ms){
  if(ms <= 0) return '';
  const daq  = Math.floor(ms / 60000);
  const kun  = Math.floor(daq / 1440);
  const soat = Math.floor((daq % 1440) / 60);
  const min  = daq % 60;

  if(kun)  return kun + ' ' + t('examDays') + (soat ? ' ' + soat + ' ' + t('examHours') : '');
  if(soat) return soat + ' ' + t('examHours') + (min ? ' ' + min + ' ' + t('examMin') : '');
  return min + ' ' + t('examMin');
}

/* kelayotgan imtihonlar — sana bo'yicha */
function examsUpcoming(){
  return EXAMS.filter(function(x){ return examState(x) !== 'done'; })
              .sort(function(a, b){ return examLeftMs(a) - examLeftMs(b); });
}

/* o'tgan imtihonlar — yangisidan boshlab */
function examsPast(){
  return EXAMS.filter(function(x){ return examState(x) === 'done'; })
              .sort(function(a, b){ return examLeftMs(b) - examLeftMs(a); });
}

/* eng yaqin imtihon */
function examNext(){
  return examsUpcoming()[0] || null;
}

/* ---------- DAVOMAT ----------
   jami   — semestrdagi jami dars soati
   kelgan — qatnashgan soat
   qoldi  — qoldirilgan darslar: sana + sabab ('sababli' | 'sababsiz')
   Foiz avtomatik hisoblanadi. Backend: GET /api/davomat */
let ATTENDANCE = [];   /* data/*.json dan yuklanadi */

/* har bir fan uchun hisob-kitob */
function attCalc(x){
  const qoldi    = x.qoldi ? x.qoldi.length : 0;
  const kelgan   = x.jami - qoldi;
  const sababsiz = (x.qoldi || []).filter(function(q){ return q.s === 'sababsiz'; }).length;
  return {
    jami:x.jami, kelgan:kelgan, qoldi:qoldi, sababsiz:sababsiz,
    sababli:qoldi - sababsiz,
    v:x.jami ? Math.round(kelgan / x.jami * 100) : 100
  };
}

/* umumiy davomat — barcha fanlar bo'yicha */
function attTotal(){
  let jami = 0, kelgan = 0, sababsiz = 0, sababli = 0;
  ATTENDANCE.forEach(function(x){
    const c = attCalc(x);
    jami += c.jami; kelgan += c.kelgan;
    sababsiz += c.sababsiz; sababli += c.sababli;
  });
  return {
    jami:jami, kelgan:kelgan, qoldi:jami - kelgan,
    sababsiz:sababsiz, sababli:sababli,
    v: jami ? Math.round(kelgan / jami * 100) : 100
  };
}

/* davomat darajasi -> rang */
function attTone(v){
  return v >= 90 ? 'ok' : v > 75 ? 'good' : v >= 60 ? 'warn' : 'bad';
}

/* ---------- BAHOLAR ----------
   Har bir fan: jn (joriy, maks 30), on (oraliq, maks 30), yn (yakuniy, maks 40).
   jami = jn + on + yn (100 ballik tizim). Backend ulanganda GET /api/baholar. */
let GRADES = [];   /* data/*.json dan yuklanadi */

/* nazorat turlarining maksimal ballari */
const G_MAX = {jn:30, on:30, yn:40};

/* 100 ballik ball -> 5 ballik baho */
function gradeOf(ball){
  return ball >= 86 ? 5 : ball >= 71 ? 4 : ball >= 60 ? 3 : 2;
}

/* baho -> nom va rang klassi */
function gradeName(g){
  return g === 5 ? t('gA5') : g === 4 ? t('gB4') : g === 3 ? t('gC3') : t('gD2');
}
function gradeTone(g){
  return g === 5 ? 'ok' : g === 4 ? 'good' : g === 3 ? 'warn' : 'bad';
}

/* fanning umumiy balli */
function gradeSum(x){ return x.jn + x.on + x.yn; }

/* tanlangan semestr fanlari ('all' — hammasi) */
function gradesOf(sem){
  return sem === 'all' ? GRADES.slice() : GRADES.filter(function(x){ return x.sem === sem; });
}

/* kredit bo'yicha o'rtacha baho (GPA, 5 ballik) */
function gpaOf(rows){
  if(!rows.length) return 0;
  let ball = 0, kredit = 0;
  rows.forEach(function(x){
    ball   += gradeOf(gradeSum(x)) * x.kredit;
    kredit += x.kredit;
  });
  return kredit ? ball / kredit : 0;
}

/* E'lonlar. full — bosilganda ochiladigan to'liq matn.
   Backend: GET /api/elonlar */
let NEWS = [];   /* data/*.json dan yuklanadi */

const DATA = {
  chaqiruv:{title:"Chaqiruv xatlari", items:[
    {t:"Qishki sessiya", m:"Yuborilgan: 05.01.2026 · PDF", b:"Tayyor", ok:true}
  ]}
};

let LIBRARY = [];   /* data/*.json dan yuklanadi */

let JOBS = [];   /* data/*.json dan yuklanadi */

/* ---------- QARZDORLIK ---------- */
let YEARS = [];   /* data/*.json dan yuklanadi */

/* akademik qarzdorlik — fandan o'ta olmaganlik */
let AKADEMIK = [];   /* data/*.json dan yuklanadi */

/* Akademik qarzdorlik arizalari.
   Backend ulanganda serverdan keladi. Namuna uchun bittasi qoldirilgan —
   bo'sh ro'yxat kerak bo'lsa, massivni [] qilib qo'ying. */
let ARIZALAR = [];   /* data/*.json dan yuklanadi */

/* ---------- ARIZA SAQLASH (localStorage) ----------
   Imtihon namunasi uchun arizalar brauzer xotirasida saqlanadi.
   Backend ulanganda faqat shu 3 ta funksiya server bilan almashtiriladi:
     arizaOqi()  -> GET  /api/arizalar
     arizaYoz()  -> POST /api/arizalar
   ------------------------------------------------- */
const ARIZA_KEY = 'ms.arizalar';

/* saqlangan arizalarni o'qish */
function arizaOqi(){
  try{
    const raw = localStorage.getItem(ARIZA_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}

/* arizalarni saqlash */
function arizaYoz(list){
  try{ localStorage.setItem(ARIZA_KEY, JSON.stringify(list)); }catch(e){}
}

/* namuna + yuborilgan arizalar birgalikda */
function hammaArizalar(){
  return ARIZALAR.concat(arizaOqi());
}

/* holat bo'yicha matn va rang */
function holatMatn(h){
  return h === 'ok' ? t('stOk') : h === 'no' ? t('stNo') : t('stWait');
}

/* hozirgi vaqt: "14:17 18.07.2026" */
function hozirVaqt(){
  const d = new Date(), n = function(x){ return String(x).padStart(2, '0'); };
  return n(d.getHours())+':'+n(d.getMinutes())+' '+
         n(d.getDate())+'.'+n(d.getMonth()+1)+'.'+d.getFullYear();
}

/* shartnoma bo'yicha qarzdorlik — pul */
let SHARTNOMA_QARZ = [];   /* data/*.json dan yuklanadi */

function money(n){ return n.toLocaleString('ru-RU').replace(/ /g, ' '); }

/* ---------- FOTOGALEREYA ----------
   Suratlar o'rniga rangli gradient va ikonka ishlatiladi (rasm fayllari yo'q).
   Backend ulanganda: {id, t, sana, soni, rasm:"url"} */
let PHOTOS = [];   /* data/*.json dan yuklanadi */

/* ---------- YOTOQXONA ----------
   holat: 'yashaydi' | 'navbat' | 'yoq'
   Backend: GET /api/yotoqxona */
let DORM = {};   /* data/*.json dan yuklanadi */

/* yotoqxona to'lov qoldig'i */
function dormLeft(){
  return Math.max(0, DORM.oylik - DORM.tolangan);
}

/* ---------- KARYERA MARKAZI ---------- */
const CAREER = {
  ishlar:{title:"Ish takliflari", items: JOBS},

  yutuq:{title:"Yutuqlar", items:[
    {id:"win1", t:"Respublika IT-olimpiadasi", m:"2-o'rin · Toshkent · 15.03.2026", b:"Sertifikat", ok:true,
     place:"Toshkent", date:"15.03.2026", result:"2-o'rin", org:"Xalq ta'limi vazirligi",
     x:"Algoritmlar va ma'lumot tuzilmalari bo'yicha respublika bosqichi. 120 ishtirokchi orasida 2-o'rin.",
     act:"cert"},
    {id:"win2", t:"Hackathon \"Smart City\"", m:"Ishtirokchi · Samarqand · 08.12.2025", b:"Diplom", ok:true,
     place:"Samarqand", date:"08.12.2025", result:"Ishtirokchi", org:"IT Park Samarqand",
     x:"48 soatlik jamoaviy loyiha: shahar transporti uchun mobil ilova prototipi.",
     act:"cert"}
  ]},

  mahorat:{title:"Mahorat darslari", items:[
    {id:"les1", t:"Git va GitHub asoslari", m:"A. Karimov · 6 ta video · 2 s 40 daq", b:"Yangi", ok:true,
     teacher:"A. Karimov", count:6, dur:"2 s 40 daq", level:"Boshlang'ich", progress:0,
     x:"Versiya nazorati tizimi bilan ishlash: commit, branch, merge va jamoaviy loyihada hamkorlik.",
     act:"watch"},
    {id:"les2", t:"React bilan tanishuv", m:"N. Yusupova · 12 ta video · 5 s", b:"Davom etmoqda", mute:true,
     teacher:"N. Yusupova", count:12, dur:"5 s", level:"O'rta", progress:42,
     x:"Komponentlar, holat boshqaruvi va hooks. Amaliy loyiha bilan birga o'rganiladi.",
     act:"watch"},
    {id:"les3", t:"SQL so'rovlarini optimallash", m:"M. To'xtayev · 8 ta video · 3 s 10 daq", b:"Yakunlandi", mute:true,
     teacher:"M. To'xtayev", count:8, dur:"3 s 10 daq", level:"O'rta", progress:100,
     x:"Indekslar, so'rov rejasi tahlili va sekin ishlaydigan so'rovlarni tezlashtirish.",
     act:"watch"},
    {id:"les4", t:"Rezyume yozish san'ati", m:"Karyera markazi · 4 ta video · 1 s", b:"Yangi", ok:true,
     teacher:"Karyera markazi", count:4, dur:"1 s", level:"Boshlang'ich", progress:0,
     x:"Ish beruvchi e'tiborini tortadigan rezyume tuzish va suhbatga tayyorgarlik.",
     act:"watch"}
  ]},

  maqola:{title:"Ilmiy maqolalar", items:[
    {id:"art1", t:"Ma'lumotlar bazasini indekslash usullari", m:"Talabalar konferensiyasi · 2026 · 8 bet", b:"Chop etilgan", ok:true,
     source:"Talabalar konferensiyasi", year:"2026", pages:8, coauthor:"A. Karimov (rahbar)",
     x:"B-tree va hash indekslarning katta hajmli jadvallardagi samaradorligi qiyoslanadi.",
     act:"read"},
    {id:"art2", t:"Veb-ilovalar xavfsizligi", m:"Universitet to'plami · 2025 · 6 bet", b:"Chop etilgan", ok:true,
     source:"Universitet to'plami", year:"2025", pages:6, coauthor:"N. Yusupova (rahbar)",
     x:"XSS va SQL-injection hujumlaridan himoyalanishning amaliy usullari.",
     act:"read"}
  ]},

  blog:{title:"Bloglar", items:[
    {id:"bl1", t:"Birinchi ish suhbatim qanday o'tdi", m:"Sh. Aliyev · 12 daq o'qish · 340 ko'rish", b:"Mashhur", ok:true,
     author:"Sh. Aliyev", read:"12 daq", views:340, date:"02.09.2026",
     x:"Tayyorgarlikdan tortib javob kutishgacha — birinchi texnik suhbat tajribasi va olingan saboqlar.",
     act:"read"},
    {id:"bl2", t:"Talaba uchun 10 ta foydali vosita", m:"Karyera markazi · 7 daq o'qish · 1200 ko'rish", b:"Mashhur", ok:true,
     author:"Karyera markazi", read:"7 daq", views:1200, date:"28.08.2026",
     x:"Vaqtni rejalashtirish, qayd yuritish va loyiha ustida ishlash uchun bepul dasturlar.",
     act:"read"},
    {id:"bl3", t:"Masofaviy ishlash: afzallik va kamchilik", m:"D. Nazarova · 9 daq o'qish · 210 ko'rish", mute:true, b:"Yangi",
     author:"D. Nazarova", read:"9 daq", views:210, date:"05.09.2026",
     x:"Uydan turib ishlashning ijobiy tomonlari va e'tibordan chetda qoladigan qiyinchiliklari.",
     act:"read"}
  ]}
};

/* =========================================================
   5) HTML QURUVCHILAR
   ========================================================= */
function badgeHTML(r){
  if(!r.b) return '';
  const cls = r.no ? 'badge--no' : r.mute ? 'badge--mute' : r.ok ? 'badge--ok' : 'badge--warn';
  return '<span class="badge '+cls+'">'+esc(td(r.b))+'</span>';
}
function rowHTML(r){
  const badge = badgeHTML(r);
  const right = r.s ? '<div class="row__sum">'+esc(r.s)+'</div>' : badge;
  const extra = (r.s && r.b) ? '<div style="margin-top:9px">'+badge+'</div>' : '';
  const ichi  = '<div class="row__top"><div class="row__title">'+esc(td(r.t))+'</div>'+right+
                '</div><div class="row__meta">'+esc(td(r.m))+'</div>'+extra;

  /* id bo'lsa — bosiladigan tugma */
  if(r.id) return '<button class="row" data-item="'+esc(r.id)+'">'+ichi+'</button>';
  return '<div class="row">'+ichi+'</div>';
}
function barHTML(b){
  const cls = b.v < 60 ? 'is-bad' : b.v < 75 ? 'is-low' : '';
  return '<div class="row"><div class="row__top"><div class="row__title">'+esc(td(b.t))+
         '</div><div class="row__sum">'+b.v+'%</div></div>'+
         '<div class="bar"><i class="'+cls+'" style="width:'+b.v+'%"></i></div></div>';
}
function emptyHTML(e){
  return '<div class="empty"><div class="empty__ic">'+
    '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>'+
    '</div><b>'+esc(e.t)+'</b><p>'+esc(e.m)+'</p></div>';
}

/* kutubxona API kelgandan keyin chiziladi (ilovaniBoshla) */

/* karyera bo'limlarini DATA ga qo'shish — openDetail ular bilan ham ishlaydi */
Object.keys(CAREER).forEach(function(k){ DATA[k] = CAREER[k]; });

/* qatorlardagi sonlar */
function fillCareerCounts(){
  const pairs = [
    ['cntJobs','ishlar'], ['cntWin','yutuq'], ['cntLes','mahorat'],
    ['cntArt','maqola'],  ['cntBlog','blog']
  ];
  pairs.forEach(function(p){
    const el = $(p[0]), d = CAREER[p[1]];
    if(!el) return;
    const n = d.items ? d.items.length : 0;
    if(n) el.textContent = n; else el.remove();
  });
}
/* fillCareerCounts() ham API'dan keyin chaqiriladi */

/* Shaxsiy ma'lumotlar — yoyiladigan blok */
function fillCareerInfo(){
  $('accInfo').innerHTML = [
    [t('fullName'), USER.name],
    [t('group'),    USER.group],
    [t('faculty'),  td(USER.faculty)],
    [t('course'),   td(USER.course)],
    [t('phone'),    USER.phone || "—"],
    [t('email'),    USER.email || "—"]
  ].map(function(r){
    return '<div class="info__row"><span>'+esc(r[0])+'</span><b>'+esc(r[1])+'</b></div>';
  }).join('');
}
fillCareerInfo();

(function careerAccordion(){
  const btn = $('accBtn'), box = $('accBox');
  btn.addEventListener('click', function(){
    haptic();
    const open = box.classList.toggle('is-open');
    btn.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

/* =========================================================
   5.5) USTKI LENTA (bo'limlar)
   ========================================================= */
const STRIP = [
  {key:"jadval",   i18n:"schedule",     tone:"",      ic:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>'},
  {key:"_exams",   i18n:"examTitle",    tone:"warn",  ic:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/>', tag:function(){ const x = examNext(); if(!x) return ''; const w = examDayWord(x); return w || examCountdown(examLeftMs(x)).split(' ').slice(0,2).join(' '); }, tagColor:"var(--warn)"},
  {key:"davomat",  i18n:"attendance",   tone:"blue",  ic:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'},
  {key:"_debt",    i18n:"debts",        tone:"warn",  ic:'<path d="M12 2 2 20h20z"/><path d="M12 9v5M12 17h.01"/>', tag:function(){ return AKADEMIK.length || ''; }, tagColor:"var(--warn)"},
  {key:"_grades",  i18n:"grades",       tone:"ok",    ic:'<path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9z"/>', tag:function(){ return gpaOf(gradesOf(curSem)).toFixed(1); }, tagColor:"var(--ok)"},
  {key:"ariza",    i18n:"applications", tone:"",      ic:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>'},
  {key:"chaqiruv", i18n:"callLetter",   tone:"blue",      ic:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'},
  {key:"yotoqxona",i18n:"dorm",         tone:"warn",  ic:'<path d="M2 10h20v7H2zM2 17v3M22 17v3M4 10V7a2 2 0 0 1 2-2h5v5"/>'}
];

function buildStrip(){
  /* dekanat rejimida ustki lentaga "Dekanat" tugmasi qo'shiladi */
  const items = adminMode
    ? [{key:"_admin", i18n:"adminMode", tone:"warn",
        ic:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        tag:function(){
          const n = arizaOqi().filter(function(a){ return a.holat === 'wait'; }).length;
          return n || '';
        }, tagColor:"var(--danger)"}].concat(STRIP)
    : STRIP;

  $('strip').innerHTML = items.map(function(p){
    const soon = p.tone === 'soon';
    const cls  = 'pill' + (p.tone && !soon ? ' pill--' + p.tone : '') + (soon ? ' pill--soon' : '');
    const tag  = p.tag ? p.tag() : '';
    const tagH = tag ? '<span class="pill__tag"'+(p.tagColor ? ' style="background:'+p.tagColor+'"' : '')+'>'+esc(String(tag))+'</span>' : '';
    const el   = soon ? 'div' : 'button';
    const attr = soon ? '' : (p.key === '_debt' ? ' id="pillDebt"' : ' data-key="'+esc(p.key)+'"');

    return '<'+el+' class="'+cls+'"'+attr+'>'+
      '<svg viewBox="0 0 24 24">'+p.ic+'</svg>'+
      '<span data-i18n="'+esc(p.i18n)+'">'+esc(t(p.i18n))+'</span>'+
      tagH+
    '</'+el+'>';
  }).join('');

  /* tugmalar document dagi delegatsiya orqali ishlaydi — bu yerda
     qayta bog'lash shart emas (aks holda ikki marta ochiladi). */
}

/* =========================================================
   6) BUGUNGI DARSLAR
   ========================================================= */
function buildToday(){
  const now  = new Date();
  const mins = now.getHours()*60 + now.getMinutes();

  const bugun = lessonsOn(todayIso());

  /* dars kiritilmagan bo'lsa — bo'sh holat */
  if(!bugun.length){
    $('todayList').innerHTML =
      '<div class="row" style="text-align:center;padding:26px 16px">'+
        '<div style="font-size:14px;font-weight:650;color:var(--ink-3)">'+esc(t('noToday'))+'</div>'+
        '<div style="margin-top:6px;font-size:12.5px;color:var(--ink-4)">'+esc(t('noLessons'))+'</div>'+
      '</div>';
    $('todayTitle').textContent = t('today');
    return;
  }

  let nextFound = false;

  $('todayList').innerHTML = '<div class="tl">' + bugun.map(function(l, i){
    const s2 = toMin(l.from), e2 = toMin(l.to);

    /* dars holati */
    let cls = '', tag = '', dot = '';
    if(mins >= s2 && mins <= e2){
      cls = ' tli--now';
      tag = '<span class="live"><i></i>'+esc(t('now'))+'</span>';
      dot = '<span class="tl__dot tl__dot--now"></span>';
      nextFound = true;
    } else if(mins > e2){
      cls = ' tli--done';
      dot = '<span class="tl__dot tl__dot--done">'+
              '<svg viewBox="0 0 12 12"><path d="M2.5 6.2l2.4 2.4L9.5 4"/></svg>'+
            '</span>';
    } else if(!nextFound){
      cls = ' tli--next';
      dot = '<span class="tl__dot tl__dot--next"></span>';
      nextFound = true;
    } else {
      dot = '<span class="tl__dot"></span>';
    }

    /* dars turi — rangli teg (amaliyot / ma'ruza) */
    const amaliy = /amali|практ|practic/i.test(l.type);
    const tur = '<span class="tl__type'+(amaliy ? ' tl__type--p' : '')+'">'+esc(td(l.type))+'</span>';

    const oxirgi = (i === bugun.length - 1) ? ' tli--last' : '';

    return '<button class="tli'+cls+oxirgi+'" data-lsn="'+SCHEDULE.indexOf(l)+'">'+
      '<span class="tl__rail">'+dot+'</span>'+
      '<span class="tl__time">'+
        '<span class="tl__h">'+esc(l.from)+'</span>'+
        '<span class="tl__to">'+esc(l.to)+'</span>'+
      '</span>'+
      '<span class="tl__body">'+
        '<span class="tl__t">'+esc(td(l.t))+tag+'</span>'+
        '<span class="tl__s">'+tur+
          '<span class="tl__room">'+esc(td(l.room))+'</span>'+
        '</span>'+
        '<span class="tl__x">'+esc(l.teacher)+'</span>'+
      '</span>'+
    '</button>';
  }).join('') + '</div>';

  const qolgan = bugun.filter(function(l){ return mins <= toMin(l.to); }).length;
  $('todayTitle').textContent = qolgan
    ? t('today') + ' \u00b7 ' + qolgan + ' ' + t('todayLeft')
    : t('today');
}
buildToday();

/* =========================================================
   7) DAVOMAT KO'RSATKICHI
   ========================================================= */
function buildAttStat(){
  const note = $('statAttNote');
  const bar  = $('statAttBar');

  if(!ATTENDANCE.length){
    $('statAtt').innerHTML = '—';
    bar.style.width = '0';
    note.textContent = t('attNoData');
    return;
  }

  const tot = attTotal();
  $('statAtt').innerHTML = tot.v + '<small>%</small>';

  bar.className = tot.v < 60 ? 'is-bad' : tot.v < 75 ? 'is-low' : '';
  setTimeout(function(){ bar.style.width = tot.v + '%'; }, 260);

  /* qoldirilgan soat bo'lsa — shuni ko'rsatamiz, bo'lmasa "hammasi yaxshi" */
  const past = ATTENDANCE.filter(function(x){ return attCalc(x).v < 75; }).length;
  if(past){
    note.textContent = past + ' ' + t('lowSubj');
    note.style.color = 'var(--warn)';
  } else if(tot.qoldi){
    note.textContent = tot.qoldi + ' ' + t('attHours') + ' ' + t('attMissed').toLowerCase();
    note.style.color = '';
  } else {
    note.textContent = t('allGood');
    note.style.color = '';
  }
}
buildAttStat();

/* o'rtacha baho ko'rsatkichi (joriy semestr) */
function buildGpaStat(){
  const rows = gradesOf(curSem);
  const el   = $('statGpa');
  if(!el) return;

  const bar  = $('statGpaBar');
  const note = $('statGpaNote');

  if(!rows.length){
    el.innerHTML = '—';
    bar.style.width = '0';
    note.textContent = t('gNoData');
    return;
  }

  const gpa = gpaOf(rows);
  el.innerHTML = (Math.round(gpa * 100) / 100).toFixed(2) + '<small>/5</small>';

  const pct = Math.round(gpa / 5 * 100);
  bar.className = gpa < 3 ? 'is-bad' : gpa < 4 ? 'is-low' : '';
  setTimeout(function(){ bar.style.width = pct + '%'; }, 300);

  const past = rows.filter(function(x){ return gradeOf(gradeSum(x)) < 3; }).length;
  note.textContent = past ? past + ' ' + t('gDebtSubj') : rows.length + ' ' + t('gSubjCount');
  note.style.color = past ? 'var(--danger)' : '';
}
buildGpaStat();

/* =========================================================
   8) E'LONLAR
   ========================================================= */
function buildNews(){
  const ICONS = {
    cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    warn:'<path d="M12 2 2 20h20z"/><path d="M12 9v5M12 17h.01"/>'
  };
  $('newsList').innerHTML = NEWS.map(function(n){
    return '<button class="post'+(n.tone ? ' post--'+n.tone : '')+'" data-news="'+esc(n.id)+'">'+
      '<span class="post__top">'+
        '<span class="post__ic"><svg viewBox="0 0 24 24">'+ICONS[n.ic]+'</svg></span>'+
        '<span class="post__from">'+
          '<span class="post__who">'+esc(n.who)+'</span>'+
          '<span class="post__when">'+esc(qachonMatn(n))+'</span>'+
        '</span>'+
        (n.isNew ? '<span class="post__new">'+esc(t('newTag'))+'</span>' : '')+
      '</span>'+
      '<span class="post__t">'+esc(n.t)+'</span>'+
      '<span class="post__x">'+esc(n.x)+'</span>'+
      (n.full ? '<span class="post__more">'+esc(t('readMore'))+
                '<svg viewBox="0 0 8 14"><path d="M1 1l6 6-6 6"/></svg></span>' : '')+
    '</button>';
  }).join('');
}
buildNews();

/* e'lonni to'liq ochish */
function openNews(id){
  const n = NEWS.filter(function(x){ return x.id === id; })[0];
  if(!n) return;
  haptic();

  /* to'liq matn: qatorlarga ajratamiz */
  const matn = (n.full || n.x).split('\n').map(function(p){
    return p.trim() ? '<p class="nwx__p">'+esc(p)+'</p>' : '';
  }).join('');

  openModal(n.t, n.who + ' \u00b7 ' + qachonMatn(n),
    '<div class="nwx">'+matn+'</div>'+
    '<button class="btn btn--ghost" id="nwClose">'+esc(t('close'))+'</button>');

  const c = $('nwClose');
  if(c) c.addEventListener('click', closeModal);
}

/* =========================================================
   9) YON MENYU
   ========================================================= */
const drawer = $('drawer'), scrim = $('scrim'), openBtn = $('openBtn');
function openMenu(){
  drawer.classList.add('is-open'); scrim.classList.add('is-open');
  openBtn.setAttribute('aria-expanded','true');
  document.body.style.overflow = 'hidden';
}
function closeMenu(){
  drawer.classList.remove('is-open'); scrim.classList.remove('is-open');
  openBtn.setAttribute('aria-expanded','false');
  document.body.style.overflow = '';
}
openBtn.addEventListener('click', function(){ openMenu(); });
scrim.addEventListener('click', function(){ closeMenu(); });

/* =========================================================
   10) TABLAR
   ========================================================= */
const tabs  = document.querySelectorAll('.tab');
const views = document.querySelectorAll('.view');
const pageTitle = $('pageTitle');

tabs.forEach(function(tab){
  tab.addEventListener('click', function(){
    closeDetail();
    haptic();
    tabs.forEach(function(t){ t.classList.remove('is-active'); });
    tab.classList.add('is-active');
    views.forEach(function(v){ v.classList.remove('is-active'); });
    $('view-' + tab.dataset.tab).classList.add('is-active');
    pageTitle.textContent = t(tab.dataset.i18nTitle);
    window.scrollTo(0,0);
    try{ localStorage.setItem('ms.tab', tab.dataset.tab); }catch(e){}
  });
});

/* =========================================================
   11) ICHKI SAHIFA
   ========================================================= */
const detail = $('detail'), detailTitle = $('detailTitle'), detailBody = $('detailBody');
let detailOpen = false;

/* qaysi ichki sahifa ochiq: 'grades' | 'att' | 'sched' | 'debt' | 'admin' | '' */
let curPage = '';

/* sahifa nomi -> uni qayta chizadigan funksiya (pastda to'ldiriladi) */
const PAGE_RENDER = {};

/* imtihon sanog'ini yangilab turuvchi taymer */
let examTimer = null;

/* sahifa nomi -> sarlavha i18n kaliti */
const PAGE_TITLE = {
  grades:'gradesTitle', att:'attTitle',    sched:'schedTitle',
  debt:'debtTitle',     admin:'adminMode', exams:'examTitle',
  apps:'appsTitle',     dorm:'dormTitle',   cv:'cvTitle',
  photo:'photoTitle'
};

function openDetail(key){
  const d = DATA[key];
  if(!d) return;
  haptic();
  curPage = 'detail:' + key;
  $('refBtn').hidden = true;
  detailTitle.textContent = d.title;

  let html = '';
  if(d.items) html = '<div class="list">' + d.items.map(rowHTML).join('') + '</div>';
  if(d.bars)  html = '<div class="list">' + d.bars.map(barHTML).join('') + '</div>';
  if(d.empty) html = emptyHTML(d.empty);
  detailBody.innerHTML = html;

  detail.classList.add('is-open');
  detail.setAttribute('aria-hidden','false');
  detail.scrollTop = 0;

  if(!detailOpen){
    detailOpen = true;
    history.pushState({detail:true}, '');
  }
}
function closeDetail(){
  detail.classList.remove('is-open');
  detail.setAttribute('aria-hidden','true');
  detailOpen = false;
  curPage = '';
  /* imtihon sanog'i taymerini to'xtatish */
  if(examTimer){
    clearInterval(examTimer);
    examTimer = null;
  }
}

window.addEventListener('popstate', function(){
  if(detailOpen) closeDetail();
});

/* Hodisa delegatsiyasi: tugmalar qayta chizilganda ham ishlashi uchun
   handler document ga bir marta bog'lanadi (buildToday, buildStrip va
   boshqalar innerHTML bilan qayta chizadi — eski handler yo'qoladi). */
document.addEventListener('click', function(e){
  /* e'lon — to'liq matn */
  const nw = e.target.closest('[data-news]');
  if(nw){
    openNews(nw.dataset.news);
    return;
  }

  /* dars — tafsilot oynasi */
  const lsn = e.target.closest('[data-lsn]');
  if(lsn){
    openLesson(+lsn.dataset.lsn);
    return;
  }

  /* qarzdorlik tugmasi (id bo'yicha) */
  if(e.target.closest('#pillDebt')){
    openDebt();
    return;
  }

  /* bo'lim tugmalari */
  const btn = e.target.closest('[data-key]');
  if(!btn) return;

  const k = btn.dataset.key;
  if(k === 'jadval')       openSchedule();
  else if(k === '_admin')  openAdmin();
  else if(k === '_grades') openGrades();
  else if(k === 'davomat') openAtt();
  else if(k === '_exams')  openExams();
  else if(k === 'ariza')   openApps();
  else if(k === 'yotoqxona') openDorm();
  else if(k === 'rezyume') openCv();
  else if(k === 'foto')    openPhoto();
  else                     openDetail(k);
});
$('backBtn').addEventListener('click', function(){
  if(detailOpen) history.back(); else closeDetail();
});

/* =========================================================
   11.5) QARZDORLIK SAHIFASI
   ========================================================= */
let debtTab    = 'akademik';   /* 'akademik' | 'shartnoma' */
let debtFilter = 'yakuniy';   /* 'ariza' | 'qayta' | 'yakuniy' */
let debtYear   = YEARS[0];

/* "topilmadi" rasmi — qidiruv oynasi + xafa yuz */
function noResultHTML(text, sub){
  return '<div class="nores">'+
    '<svg viewBox="0 0 100 100" fill="none">'+
      '<circle cx="42" cy="42" r="31" stroke="#E0BFBC" stroke-width="7"/>'+
      '<circle cx="32" cy="37" r="3.4" fill="#E0BFBC"/>'+
      '<circle cx="52" cy="37" r="3.4" fill="#E0BFBC"/>'+
      '<path d="M32 54c5-5 15-5 20 0" stroke="#E0BFBC" stroke-width="5" stroke-linecap="round"/>'+
      '<path d="M65 65 88 88" stroke="#E0BFBC" stroke-width="7" stroke-linecap="round"/>'+
    '</svg>'+
    '<b>'+esc(text)+'</b>'+
    (sub ? '<p>'+esc(sub)+'</p>' : '')+
  '</div>';
}

function debtHTML(){
  /* segment tugmalari */
  let h = '<div class="seg">'+
    '<button class="'+(debtTab === 'shartnoma' ? 'is-on' : '')+'" data-dtab="shartnoma">'+esc(t('byContract'))+'</button>'+
    '<button class="'+(debtTab === 'akademik'  ? 'is-on' : '')+'" data-dtab="akademik">'+esc(t('academic'))+'</button>'+
  '</div>';

  if(debtTab === 'akademik'){
    /* filtr tugmalari */
    const F = [
      {k:'ariza',   label:t('fApps')},
      {k:'qayta',   label:t('fRetake')},
      {k:'yakuniy', label:t('fFinal')}
    ];
    h += '<div class="dfilter">' + F.map(function(f){
      return '<button class="'+(debtFilter === f.k ? 'is-on' : '')+'" data-dfil="'+f.k+'">'+
             esc(f.label)+'</button>';
    }).join('') + '</div>';

    /* yangi ariza yuborish tugmasi */
    h += '<div class="newapp"><button class="btn btn--primary" id="newAppBtn">'+
         esc(t('newApp'))+'</button></div>';

    const rows = hammaArizalar().filter(function(a){ return a.turi === debtFilter; });

    if(!rows.length){
      h += noResultHTML(t('notFound'), t('noApps'));
      return h;
    }

    /* yangi yuborilganlar tepada */
    h += '<div class="list">' + rows.slice().reverse().map(appCardHTML).join('') + '</div>';
    return h;
  }

  /* --- shartnoma bo'yicha --- */
  h += '<div class="filters"><div class="sel"><select id="debtYear">'+
    YEARS.map(function(y){
      return '<option value="'+esc(y)+'"'+(y === debtYear ? ' selected' : '')+'>'+esc(y)+'</option>';
    }).join('')+
  '</select></div></div>';

  const rows = SHARTNOMA_QARZ.filter(function(x){
    return x.year === debtYear && x.summa > 0;
  });

  if(!rows.length){
    h += noResultHTML(t('notFound'), debtYear + ' ' + t('noContract'));
    return h;
  }

  const jami = rows.reduce(function(a, b){ return a + b.summa; }, 0);
  h += '<div class="sum sum--bad">'+
    '<div class="sum__label">'+esc(t('totalDebt'))+'</div>'+
    '<div class="sum__val">'+money(jami)+'<small>so\'m</small></div>'+
    '<div class="sum__note">'+esc(t('payBy'))+' '+esc(rows[0].muddat)+'</div>'+
  '</div>';

  h += '<div class="list">' + rows.map(function(x){
    return rowHTML({t:x.tur, m:x.year+' \u00b7 '+t('payBy')+' '+x.muddat,
                    s:money(x.summa)+" so'm", b:"Qarzdor", no:true});
  }).join('') + '</div>';

  return h;
}

/* ariza kartasi */
function appCardHTML(a){
  const dot = a.holat === 'ok' ? '' : a.holat === 'wait' ? ' appc__dot--wait' : ' appc__dot--no';
  const st  = a.holat === 'ok' ? '' : a.holat === 'wait' ? ' appc__state--wait' : ' appc__state--no';
  const ic  = a.holat === 'ok'
    ? '<circle cx="12" cy="12" r="10"/><path d="m8.5 12 2.5 2.5 4.5-5"/>'
    : a.holat === 'wait'
      ? '<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>'
      : '<circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>';

  const F = {ariza:t('dlApp'), shartnoma:t('dlContract'), kvitansiya:t('dlReceipt')};

  return '<article class="appc">'+
    '<div class="appc__head">'+
      '<span class="appc__dot'+dot+'"></span>'+
      '<span class="appc__t">'+esc(a.t)+'</span>'+
    '</div>'+

    '<button class="appc__meta" data-appsub="'+esc(a.id)+'">'+
      '<span class="appc__mi">'+esc(t('subjects2'))+':<b>'+a.fanlar+'</b></span>'+
      '<span class="appc__mi appc__mi--r">'+esc(t('credits'))+':<b>'+a.kredit+'</b></span>'+
      '<svg class="appc__chev" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6"/></svg>'+
    '</button>'+

    '<div class="appc__state'+st+'">'+
      '<div class="appc__sh">'+
        '<svg class="appc__si" viewBox="0 0 24 24">'+ic+'</svg>'+
        '<span class="appc__st">'+esc(a.holatT)+'</span>'+
        '<span class="appc__sd">'+esc(a.vaqt)+'</span>'+
      '</div>'+
      '<p class="appc__sx">'+esc(a.x)+'</p>'+
    '</div>'+

    /* talaba yozgan izoh */
    (a.izoh ? '<p class="appc__note"><b>'+esc(t('appNote'))+':</b> '+esc(a.izoh)+'</p>' : '')+

    ((a.files && a.files.length) ? '<div class="appc__btns">'+
      a.files.map(function(f, i){
        return '<button class="appc__btn'+(i ? '' : ' appc__btn--ghost')+'" data-dl="'+esc(f)+'">'+
               esc(F[f] || f)+'</button>';
      }).join('')+
    '</div>' : '')+
  '</article>';
}

/* ---------- YANGI ARIZA YUBORISH ---------- */

/* ariza turlari — kalit va nomi */
const ARIZA_TURLARI = [
  {k:'ariza',   nom:function(){ return t('fApps');   }},
  {k:'qayta',   nom:function(){ return t('fRetake'); }},
  {k:'yakuniy', nom:function(){ return t('fFinal');  }}
];

/* ariza formasini ochish */
function openNewApp(){
  /* qarzdorlik yo'q bo'lsa — ariza kerak emas */
  if(!AKADEMIK.length){
    toast(t('noDebtForApp'));
    return;
  }

  haptic();

  const turH = '<div class="field" id="f_appType"><label>'+esc(t('appType'))+'</label>'+
    '<div class="sel"><select id="appType">'+
      ARIZA_TURLARI.map(function(x){
        return '<option value="'+esc(x.k)+'"'+(x.k === debtFilter ? ' selected' : '')+'>'+
               esc(x.nom())+'</option>';
      }).join('')+
    '</select></div></div>';

  /* akademik qarzdorlik fanlari — belgilanadigan ro'yxat */
  const fanH = '<div class="field" id="f_appSubj"><label>'+esc(t('appSubjects'))+'</label>'+
    '<div class="applist">'+
      AKADEMIK.map(function(f, i){
        return '<label class="appck">'+
          '<input type="checkbox" data-fan="'+i+'">'+
          '<span class="appck__b"><b>'+esc(f.fan)+'</b>'+
          '<i>'+esc(f.sem+' · '+f.ball+'/'+f.kerak+' ball · '+f.sabab)+'</i></span>'+
        '</label>';
      }).join('')+
    '</div><div class="err">'+esc(t('pickSubject'))+'</div></div>';

  const izohH = '<div class="field" id="f_appNote"><label for="appNote">'+esc(t('appNote'))+'</label>'+
    '<textarea id="appNote" rows="3" placeholder="'+esc(t('appNotePh'))+'"></textarea>'+
    '<div class="hint">'+esc(t('appNoteHint'))+'</div>'+
    '<div class="err">'+esc(t('writeNote'))+'</div></div>';

  openModal(t('newApp'), USER.name + ' · ' + USER.group,
    turH + fanH + izohH +
    '<button class="btn btn--primary" id="appSend">'+esc(t('sendApp'))+'</button>'+
    '<button class="btn btn--ghost" id="appCancel">'+esc(t('close'))+'</button>');

  const cancel = $('appCancel');
  if(cancel) cancel.addEventListener('click', closeModal);

  /* to'g'rilanganda qizil xato darhol yo'qolsin */
  document.querySelectorAll('[data-fan]').forEach(function(c){
    c.addEventListener('change', function(){
      const bor = Array.prototype.slice.call(document.querySelectorAll('[data-fan]'))
        .some(function(x){ return x.checked; });
      $('f_appSubj').classList.toggle('is-bad', !bor);
    });
  });
  const nt = $('appNote');
  if(nt) nt.addEventListener('input', function(){
    $('f_appNote').classList.toggle('is-bad', !nt.value.trim());
  });

  const send = $('appSend');
  if(send) send.addEventListener('click', yuborArizani);
}

/* formani tekshirish va saqlash */
function yuborArizani(){
  const turi = $('appType').value;
  const izoh = $('appNote').value.trim();
  const belgilangan = Array.prototype.slice.call(
    document.querySelectorAll('[data-fan]')
  ).filter(function(c){ return c.checked; });

  /* tekshirish */
  let xato = false;
  $('f_appSubj').classList.toggle('is-bad', !belgilangan.length);
  if(!belgilangan.length) xato = true;
  $('f_appNote').classList.toggle('is-bad', !izoh);
  if(!izoh) xato = true;

  if(xato){ haptic(20); return; }

  /* tanlangan fanlar */
  const fanlar = belgilangan.map(function(c){ return AKADEMIK[+c.dataset.fan]; });
  const kredit = fanlar.length * 5;   /* har fan 5 kredit */

  const turNomi = (ARIZA_TURLARI.filter(function(x){ return x.k === turi; })[0] || {}).nom;

  const yangi = {
    id:      'usr' + Date.now(),
    yangimi: true,                    /* foydalanuvchi yuborgan — dekanat ko'radi */
    turi:    turi,
    t:       turNomi ? turNomi() : turi,
    fanlar:  fanlar.length,
    kredit:  kredit,
    holat:   'wait',
    holatT:  t('stWait'),
    vaqt:    hozirVaqt(),
    x:       t('stWaitX'),
    izoh:    izoh,
    talaba:  USER.name,
    guruh:   USER.group,
    files:   [],                      /* javob kelguncha yuklanadigan fayl yo'q */
    fanlarRoyxat: fanlar.map(function(f){
      return {t:f.fan, m:f.sem + ' · 5 kredit · ' + f.sabab};
    })
  };

  const list = arizaOqi();
  list.push(yangi);
  arizaYoz(list);

  closeModal();
  haptic(16);

  /* yuborilgan turga o'tib, ro'yxatni yangilaymiz */
  debtFilter = turi;
  renderDebt();
  toast(t('appSent'));
}

/* =========================================================
   11.6) DEKANAT (ADMIN) PANELI
   Kirish: login ekranida DEKANAT_KODI kiritiladi.
   Bu yerda kelgan arizalar ko'riladi va qabul/rad qilinadi.
   ========================================================= */
let adminMode = false;
try{ adminMode = localStorage.getItem('ms.admin') === '1'; }catch(e){}

function adminHTML(){
  const list = arizaOqi();

  let h = '<div class="adminbar">'+
    '<span class="adminbar__t">'+esc(t('adminTitle'))+'</span>'+
    '<button class="linkbtn" id="adminExit">'+esc(t('exitAdmin'))+'</button>'+
  '</div>';

  if(!list.length){
    h += noResultHTML(t('notFound'), t('adminNo'));
    return h;
  }

  h += '<div class="list">' + list.slice().reverse().map(function(a){
    const dot = a.holat === 'ok' ? '' : a.holat === 'wait' ? ' appc__dot--wait' : ' appc__dot--no';

    /* javob berilmagan bo'lsa — tugmalar chiqadi */
    const btns = a.holat === 'wait'
      ? '<div class="appc__btns">'+
          '<button class="appc__btn appc__btn--ghost" data-rej="'+esc(a.id)+'">'+esc(t('reject'))+'</button>'+
          '<button class="appc__btn" data-acc="'+esc(a.id)+'">'+esc(t('accept'))+'</button>'+
        '</div>'
      : '<div class="appc__done">'+esc(holatMatn(a.holat))+' · '+esc(a.vaqt)+'</div>';

    return '<article class="appc">'+
      '<div class="appc__head">'+
        '<span class="appc__dot'+dot+'"></span>'+
        '<span class="appc__t">'+esc(a.t)+'</span>'+
      '</div>'+
      '<p class="appc__who">'+esc(t('fromStudent'))+': <b>'+esc(a.talaba || '-')+'</b>'+
        (a.guruh ? ' · '+esc(a.guruh) : '')+'</p>'+
      '<button class="appc__meta" data-appsub="'+esc(a.id)+'">'+
        '<span class="appc__mi">'+esc(t('subjects2'))+':<b>'+a.fanlar+'</b></span>'+
        '<span class="appc__mi appc__mi--r">'+esc(t('credits'))+':<b>'+a.kredit+'</b></span>'+
        '<svg class="appc__chev" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6"/></svg>'+
      '</button>'+
      (a.izoh ? '<p class="appc__note"><b>'+esc(t('appNote'))+':</b> '+esc(a.izoh)+'</p>' : '')+
      btns+
    '</article>';
  }).join('') + '</div>';

  return h;
}

/* arizaga javob berish: 'ok' yoki 'no' */
function javobBer(id, holat, sabab){
  const list = arizaOqi();
  const a = list.filter(function(x){ return x.id === id; })[0];
  if(!a) return;

  a.holat  = holat;
  a.holatT = holatMatn(holat);
  a.vaqt   = hozirVaqt();

  if(holat === 'ok'){
    a.x = t('appApproved');
    a.files = ['ariza', 'shartnoma'];   /* qabul qilinsa hujjat beriladi */
  }else{
    a.x = sabab ? t('rejectWhy') + ': ' + sabab : t('appRejected');
    a.files = [];
  }

  arizaYoz(list);
  haptic(16);
  renderAdmin();
  toast(holat === 'ok' ? t('decidedOk') : t('decidedNo'));
}

/* dekanat panelini ochish */
function openAdmin(){
  haptic();
  curPage = 'admin';
  detailTitle.textContent = t('adminMode');
  $('refBtn').hidden = true;
  renderAdmin();

  detail.classList.add('is-open');
  detail.setAttribute('aria-hidden','false');
  detail.scrollTop = 0;

  if(!detailOpen){
    detailOpen = true;
    history.pushState({detail:true}, '');
  }
}

function renderAdmin(){
  detailBody.innerHTML = adminHTML();

  /* qabul qilish */
  detailBody.querySelectorAll('[data-acc]').forEach(function(b){
    b.addEventListener('click', function(){ javobBer(b.dataset.acc, 'ok'); });
  });

  /* rad etish — sababi so'raladi */
  detailBody.querySelectorAll('[data-rej]').forEach(function(b){
    b.addEventListener('click', function(){
      const id = b.dataset.rej;
      haptic();
      openModal(t('reject'), '', 
        '<div class="field" id="f_rejWhy"><label for="rejWhy">'+esc(t('rejectWhy'))+'</label>'+
        '<textarea id="rejWhy" rows="3" placeholder="'+esc(t('rejectPh'))+'"></textarea>'+
        '<div class="err">'+esc(t('writeNote'))+'</div></div>'+
        '<button class="btn btn--danger" id="rejOk">'+esc(t('reject'))+'</button>'+
        '<button class="btn btn--ghost" id="rejNo">'+esc(t('close'))+'</button>');

      const no = $('rejNo');
      if(no) no.addEventListener('click', closeModal);

      const w0 = $('rejWhy');
      if(w0) w0.addEventListener('input', function(){
        $('f_rejWhy').classList.toggle('is-bad', !w0.value.trim());
      });

      const ok = $('rejOk');
      if(ok) ok.addEventListener('click', function(){
        const w = $('rejWhy').value.trim();
        if(!w){ $('f_rejWhy').classList.add('is-bad'); haptic(20); return; }
        closeModal();
        javobBer(id, 'no', w);
      });
    });
  });

  /* fanlar ro'yxati */
  detailBody.querySelectorAll('[data-appsub]').forEach(function(b){
    b.addEventListener('click', function(){
      const a = arizaOqi().filter(function(x){ return x.id === b.dataset.appsub; })[0];
      if(!a) return;
      haptic();
      openModal(a.t, t('subjects2') + ': ' + a.fanlar + ' · ' + t('credits') + ': ' + a.kredit,
        '<div class="list" style="padding:0">' +
          (a.fanlarRoyxat || []).map(rowHTML).join('') +
        '</div>' +
        '<button class="btn btn--ghost" id="subClose">' + esc(t('close')) + '</button>');
      const c = $('subClose');
      if(c) c.addEventListener('click', closeModal);
    });
  });

  /* dekanat rejimidan chiqish */
  const ex = $('adminExit');
  if(ex) ex.addEventListener('click', function(){
    adminMode = false;
    try{ localStorage.removeItem('ms.admin'); }catch(e){}
    haptic();
    closeDetail();
    buildStrip();
  });
}

/* =========================================================
   11.7) QARZDORLIK SAHIFASI YORDAMCHI
   ========================================================= */
/* qarzdorlik sahifasini ochish */
function openDebt(){
  haptic();
  curPage = 'debt';
  detailTitle.textContent = t('debtTitle');
  $('refBtn').hidden = false;
  renderDebt();

  detail.classList.add('is-open');
  detail.setAttribute('aria-hidden','false');
  detail.scrollTop = 0;

  if(!detailOpen){
    detailOpen = true;
    history.pushState({detail:true}, '');
  }
}

/* ichini qayta chizish + tugmalarni bog'lash */
function renderDebt(){
  detailBody.innerHTML = debtHTML();

  /* yangi ariza tugmasi */
  const nb = $('newAppBtn');
  if(nb) nb.addEventListener('click', openNewApp);

  detailBody.querySelectorAll('[data-dtab]').forEach(function(b){
    b.addEventListener('click', function(){
      debtTab = b.dataset.dtab;
      haptic();
      renderDebt();
    });
  });

  detailBody.querySelectorAll('[data-dfil]').forEach(function(b){
    b.addEventListener('click', function(){
      debtFilter = b.dataset.dfil;
      haptic();
      renderDebt();
    });
  });

  /* fanlar ro'yxatini ochish */
  detailBody.querySelectorAll('[data-appsub]').forEach(function(b){
    b.addEventListener('click', function(){
      const a = ARIZALAR.filter(function(x){ return x.id === b.dataset.appsub; })[0];
      if(!a) return;
      haptic();
      openModal(a.t, t('subjects2') + ': ' + a.fanlar + ' \u00b7 ' + t('credits') + ': ' + a.kredit,
        '<div class="list" style="padding:0">' +
          (a.fanlarRoyxat || []).map(rowHTML).join('') +
        '</div>' +
        '<button class="btn btn--ghost" id="subClose">' + esc(t('close')) + '</button>');
      const c = $('subClose');
      if(c) c.addEventListener('click', closeModal);
    });
  });

  /* yuklash tugmalari */
  detailBody.querySelectorAll('[data-dl]').forEach(function(b){
    b.addEventListener('click', function(){
      haptic(12);
      toast(t('dlSoon'));
    });
  });

  const ys = $('debtYear');
  if(ys) ys.addEventListener('change', function(){
    debtYear = ys.value;
    renderDebt();
  });
}



/* =========================================================
   11.6) BAHOLAR SAHIFASI
   ========================================================= */
let gradeSem  = curSem;      /* tanlangan semestr: raqam yoki 'all' */
let gradeOpen = null;        /* yoyilgan fan indeksi */

/* nazorat turi qatori: JN / ON / YN */
function gCtrlHTML(label, val, max){
  const pct = Math.round(val / max * 100);
  const cls = pct < 60 ? 'is-bad' : pct < 71 ? 'is-low' : '';
  return '<div class="gctrl">'+
    '<div class="gctrl__t">'+esc(label)+'</div>'+
    '<div class="gctrl__bar"><i class="'+cls+'" style="width:'+pct+'%"></i></div>'+
    '<div class="gctrl__v">'+val+'<small>/'+max+'</small></div>'+
  '</div>';
}

/* bitta fan kartasi */
function gradeCardHTML(x, i){
  const jami = gradeSum(x);
  const g    = gradeOf(jami);
  const tone = gradeTone(g);
  const open = gradeOpen === i;

  return '<button class="gcard'+(open ? ' is-open' : '')+'" data-gcard="'+i+'" aria-expanded="'+(open ? 'true' : 'false')+'">'+
    '<span class="gcard__head">'+
      '<span class="gcard__mark gcard__mark--'+tone+'">'+g+'</span>'+
      '<span class="gcard__body">'+
        '<span class="gcard__t">'+esc(td(x.t))+'</span>'+
        '<span class="gcard__m">'+x.kredit+' '+esc(t('gCredits'))+' \u00b7 '+esc(gradeName(g))+'</span>'+
      '</span>'+
      '<span class="gcard__sum">'+jami+'<small>/100</small></span>'+
      '<svg class="gcard__caret" viewBox="0 0 14 9"><path d="M1 1l6 6 6-6"/></svg>'+
    '</span>'+
    '<span class="gcard__bar"><i class="is-'+tone+'" style="width:'+jami+'%"></i></span>'+
    '<span class="gcard__more">'+
      '<span class="gcard__more-t">'+esc(t('gDetail'))+'</span>'+
      gCtrlHTML(t('gJNFull'), x.jn, G_MAX.jn)+
      gCtrlHTML(t('gONFull'), x.on, G_MAX.on)+
      gCtrlHTML(t('gYNFull'), x.yn, G_MAX.yn)+
    '</span>'+
  '</button>';
}

function gradesHTML(){
  /* semestr tanlash */
  let h = '<div class="filters"><div class="sel"><select id="gradeSemSel">'+
    '<option value="all"'+(gradeSem === 'all' ? ' selected' : '')+'>'+esc(t('allSem'))+'</option>'+
    SEMESTERS.map(function(n){
      return '<option value="'+n+'"'+(gradeSem === n ? ' selected' : '')+'>'+
             n+'-'+esc(t('semLabel'))+'</option>';
    }).join('')+
  '</select></div></div>';

  const rows = gradesOf(gradeSem);

  if(!rows.length){
    h += noResultHTML(t('gNoData'), t('gNoDataX'));
    return h;
  }

  /* o'rtacha ball (GPA) */
  const gpa  = gpaOf(rows);
  const g5   = Math.round(gpa * 100) / 100;
  const tone = gradeTone(Math.round(gpa));
  const pass = rows.filter(function(x){ return gradeOf(gradeSum(x)) > 2; }).length;
  const fail = rows.length - pass;

  h += '<div class="gpa gpa--'+tone+'">'+
    '<div class="gpa__label">'+esc(t('gpaLabel'))+'</div>'+
    '<div class="gpa__val">'+g5.toFixed(2)+'<small>'+esc(t('gpaOf'))+'</small></div>'+
    '<div class="gpa__ring" style="--p:'+Math.round(gpa / 5 * 100)+'"></div>'+
    '<div class="gpa__stats">'+
      '<span><b>'+rows.length+'</b>'+esc(t('gTotal'))+'</span>'+
      '<span><b class="is-ok">'+pass+'</b>'+esc(t('gPassed'))+'</span>'+
      (fail ? '<span><b class="is-bad">'+fail+'</b>'+esc(t('gFailed'))+'</span>' : '')+
    '</div>'+
  '</div>';

  /* eng yuqori / eng past */
  const sorted = rows.slice().sort(function(a, b){ return gradeSum(b) - gradeSum(a); });
  if(sorted.length > 1){
    const top = sorted[0], low = sorted[sorted.length - 1];
    h += '<div class="gtop">'+
      '<div class="gtop__c"><div class="gtop__l">'+esc(t('gBest'))+'</div>'+
        '<div class="gtop__t">'+esc(top.t)+'</div>'+
        '<div class="gtop__v is-ok">'+gradeSum(top)+'</div></div>'+
      '<div class="gtop__c"><div class="gtop__l">'+esc(t('gWorst'))+'</div>'+
        '<div class="gtop__t">'+esc(low.t)+'</div>'+
        '<div class="gtop__v'+(gradeOf(gradeSum(low)) < 3 ? ' is-bad' : '')+'">'+gradeSum(low)+'</div></div>'+
    '</div>';
  }

  /* fanlar ro'yxati — eng yuqori balldan boshlab */
  h += '<div class="list">' + sorted.map(function(x){
    return gradeCardHTML(x, GRADES.indexOf(x));
  }).join('') + '</div>';

  return h;
}

function openGrades(){
  haptic();
  curPage = 'grades';
  detailTitle.textContent = t('gradesTitle');
  $('refBtn').hidden = false;
  renderGrades();

  detail.classList.add('is-open');
  detail.setAttribute('aria-hidden','false');
  detail.scrollTop = 0;

  if(!detailOpen){
    detailOpen = true;
    history.pushState({detail:true}, '');
  }
}

function renderGrades(){
  detailBody.innerHTML = gradesHTML();

  const sel = $('gradeSemSel');
  if(sel) sel.addEventListener('change', function(){
    gradeSem  = sel.value === 'all' ? 'all' : +sel.value;
    gradeOpen = null;
    haptic();
    renderGrades();
  });

  /* fan kartasini yoyish/yig'ish */
  detailBody.querySelectorAll('[data-gcard]').forEach(function(b){
    b.addEventListener('click', function(){
      const i = +b.dataset.gcard;
      gradeOpen = (gradeOpen === i) ? null : i;
      haptic();
      renderGrades();
    });
  });

  /* barlarni animatsiya bilan chizish */
  requestAnimationFrame(function(){
    detailBody.querySelectorAll('.gcard__bar i, .gctrl__bar i').forEach(function(el){
      const w = el.style.width;
      el.style.width = '0';
      requestAnimationFrame(function(){ el.style.width = w; });
    });
  });
}

/* =========================================================
   11.65) DARS JADVALI SAHIFASI
   ========================================================= */

/* hafta sarlavhasi: "7 – 13 sentabr" */
function weekLabel(mon){
  const L   = I18N[LANG];
  const end = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + 6);
  const m1  = L.months[mon.getMonth()], m2 = L.months[end.getMonth()];

  return mon.getMonth() === end.getMonth()
    ? mon.getDate() + ' \u2013 ' + end.getDate() + ' ' + m2
    : mon.getDate() + ' ' + m1 + ' \u2013 ' + end.getDate() + ' ' + m2;
}

/* bitta dars qatori */
function schedLessonHTML(l, isToday){
  const now  = new Date();
  const mins = now.getHours()*60 + now.getMinutes();
  const s = toMin(l.from), e = toMin(l.to);

  let cls = '', tag = '';
  if(isToday){
    if(mins >= s && mins <= e){
      cls = ' slot--now';
      tag = '<span class="live"><i></i>'+esc(t('now'))+'</span>';
    } else if(mins > e){
      cls = ' slot--done';
    }
  }

  return '<button class="slot'+cls+'" data-lsn="'+SCHEDULE.indexOf(l)+'">'+
    '<span class="slot__time">'+
      '<span class="slot__h">'+esc(l.from)+'</span>'+
      '<span class="slot__to">'+esc(l.to)+'</span>'+
    '</span>'+
    '<span class="slot__body">'+
      '<span class="slot__t">'+esc(td(l.t))+tag+'</span>'+
      '<span class="slot__s">'+esc(td(l.room))+' \u00b7 '+esc(td(l.type))+'</span>'+
      '<span class="slot__x">'+esc(l.teacher)+'</span>'+
    '</span>'+
    '<svg class="slot__chev" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6"/></svg>'+
  '</button>';
}

/* bitta kun bloki */
function schedDayHTML(d){
  const L     = I18N[LANG];
  const iso   = isoDate(d);
  const rows  = lessonsOn(iso);
  const today = iso === todayIso();
  const wd    = (d.getDay() + 6) % 7;          /* 0 = dushanba */
  const off   = wd === 6;                       /* yakshanba */

  /* darssiz ish kunini ham ko'rsatamiz, yakshanbani faqat dars bo'lsa */
  if(!rows.length && off) return '';

  return '<section class="day'+(today ? ' day--today' : '')+'">'+
    '<div class="day__head">'+
      '<div class="day__name">'+esc(L.days[d.getDay()])+
        (today ? '<span class="day__now">'+esc(t('todayWord'))+'</span>' : '')+
      '</div>'+
      '<div class="day__date">'+d.getDate()+' '+esc(L.months[d.getMonth()])+
        (rows.length ? ' \u00b7 ' + rows.length + ' ' + esc(t('weekLessons')) : '')+
      '</div>'+
    '</div>'+
    (rows.length
      ? '<div class="day__list">' + rows.map(function(l){
          return schedLessonHTML(l, today);
        }).join('') + '</div>'
      : '<div class="day__off">'+esc(off ? t('freeDay') : t('noDayLessons'))+'</div>')+
  '</section>';
}

function schedHTML(){
  const mon = weekStart;
  const cur = isoDate(mondayOf(new Date()));
  const isCur = isoDate(mon) === cur;

  /* hafta boshqaruvi */
  let h = '<div class="wnav">'+
    '<button class="wnav__b" data-week="-1" aria-label="'+esc(t('prevWeek'))+'">'+
      '<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>'+
    '</button>'+
    '<div class="wnav__mid">'+
      '<div class="wnav__t">'+esc(weekLabel(mon))+'</div>'+
      (isCur ? '<div class="wnav__s">'+esc(t('thisWeek'))+'</div>' : '')+
    '</div>'+
    '<button class="wnav__b" data-week="1" aria-label="'+esc(t('nextWeek'))+'">'+
      '<svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>'+
    '</button>'+
  '</div>';

  /* joriy haftaga qaytish tugmasi */
  if(!isCur){
    h += '<div class="wback"><button id="weekNow">'+
         esc(t('thisWeek'))+'</button></div>';
  }

  /* hafta kunlari */
  let days = '', total = 0;
  for(let i = 0; i < 7; i++){
    const d = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + i);
    total += lessonsOn(isoDate(d)).length;
    days  += schedDayHTML(d);
  }

  if(!total) return h + noResultHTML(t('notFound'), t('noLessons'));

  return h + days;
}

/* dars haqida to'liq ma'lumot */
function openLesson(i){
  const l = SCHEDULE[i];
  if(!l) return;
  haptic();

  const L    = I18N[LANG];
  const d    = new Date(l.date + 'T00:00:00');
  const sana = d.getDate() + ' ' + L.months[d.getMonth()] + ', ' + L.days[d.getDay()].toLowerCase();
  const dur  = toMin(l.to) - toMin(l.from);

  /* holat: hozir / tugagan / boshlanishiga qancha qoldi */
  let holat = '';
  if(l.date === todayIso()){
    const now  = new Date();
    const mins = now.getHours()*60 + now.getMinutes();
    const s2 = toMin(l.from), e2 = toMin(l.to);

    if(mins >= s2 && mins <= e2){
      holat = '<div class="lsn-state lsn-state--now">'+
        '<span class="live"><i></i></span>'+esc(t('lsnNow'))+'</div>';
    } else if(mins > e2){
      holat = '<div class="lsn-state lsn-state--done">'+esc(t('lsnDone'))+'</div>';
    } else {
      const qoldi = s2 - mins;
      const soat  = Math.floor(qoldi / 60), daq = qoldi % 60;
      const matn  = (soat ? soat + ' ' + t('attHours') + ' ' : '') + daq + ' ' + t('lsnMin');
      holat = '<div class="lsn-state">'+esc(t('lsnSoon'))+' '+esc(matn)+'</div>';
    }
  }

  const html = holat +
    '<div class="dt__facts">'+
      factRow(t('lsnDate'), sana)+
      factRow(t('lsnTime'), l.from + ' \u2013 ' + l.to)+
      factRow(t('lsnDur'),  dur + ' ' + t('lsnMin'))+
      factRow(t('lsnRoom'), td(l.room))+
      factRow(t('lsnType'), td(l.type))+
      factRow(t('teacher'), l.teacher)+
    '</div>'+
    '<button class="btn btn--ghost" id="lsnClose">'+esc(t('close'))+'</button>';

  openModal(td(l.t), td(l.room) + ' \u00b7 ' + td(l.type), html);
  const c = $('lsnClose');
  if(c) c.addEventListener('click', closeModal);
}

function openSchedule(){
  haptic();
  curPage = 'sched';
  if(!weekStart) weekStart = mondayOf(new Date());
  detailTitle.textContent = t('schedTitle');
  $('refBtn').hidden = false;
  renderSched();

  detail.classList.add('is-open');
  detail.setAttribute('aria-hidden','false');
  detail.scrollTop = 0;

  if(!detailOpen){
    detailOpen = true;
    history.pushState({detail:true}, '');
  }
}

function renderSched(){
  detailBody.innerHTML = schedHTML();

  /* oldingi / keyingi hafta */
  detailBody.querySelectorAll('[data-week]').forEach(function(b){
    b.addEventListener('click', function(){
      const step = +b.dataset.week;
      weekStart = new Date(weekStart.getFullYear(), weekStart.getMonth(),
                           weekStart.getDate() + step * 7);
      haptic();
      renderSched();
      detail.scrollTop = 0;
    });
  });

  /* dars tafsiloti */
  detailBody.querySelectorAll('[data-lsn]').forEach(function(b){
    b.addEventListener('click', function(){ openLesson(+b.dataset.lsn); });
  });

  /* joriy haftaga qaytish */
  const wn = $('weekNow');
  if(wn) wn.addEventListener('click', function(){
    weekStart = mondayOf(new Date());
    haptic();
    renderSched();
    detail.scrollTop = 0;
  });
}

/* =========================================================
   11.64) REZYUME SAHIFASI
   ========================================================= */

/* ko'nikmalar — mahorat darslari va maqolalardan yig'iladi */
/* ---------- REZYUME MA'LUMOTLARI ----------
   Talabaning haqiqiy rezyumesi. Backend: GET /api/rezyume */
/* ---------- REZYUMELAR ----------
   Har bir talabaning o'z rezyumesi (kirish kodi bo'yicha).
   Rezyume yaratmagan talabada yozuv bo'lmaydi — bo'sh holat ko'rsatiladi.
   Backend: GET /api/rezyume (token bo'yicha) */
const CV_BAZA = {

  /* Aliyev Jasur */
  "2024":{
    rol:"Python Backend Developer",
    shahar:"Samarqand, O'zbekiston",
    github:"github.com/j-aliyev",
    haqida:"cvAboutText",

    skills:[
      {g:"cvLang",  v:"Python, SQL"},
      {g:"cvFw",    v:"Django, Django REST Framework"},
      {g:"cvDb",    v:"PostgreSQL, SQLite"},
      {g:"cvTools", v:"Git, GitHub, Postman, Swagger / OpenAPI"},
      {g:"cvOther", v:"REST API loyihalash, Token autentifikatsiya, CRM tizimlari"}
    ],

    ish:[
      {t:"Texnik mutaxassis", org:"IT Park Samarqand", vaqt:"2025 — hozirgacha",
       nuqta:[
         "Kuniga 100+ foydalanuvchidan kelgan texnik so'rovlarni hal qilish",
         "CRM tizimida xodimlar ma'lumotlarini yuritish va hisobotlar tayyorlash",
         "Ma'lumotlar bazasidan SQL so'rovlar orqali ma'lumot olish va nomuvofiqliklarni aniqlash"
       ]}
    ],

    loyiha:[
      {t:"Blog API — Django REST Framework",
       x:"Postlar va kitoblar uchun to'liq CRUD REST API. Token asosidagi ro'yxatdan o'tish va "+
         "autentifikatsiya, faqat muallif tahrirlay oladigan ruxsat qatlami, izohlar uchun endpointlar "+
         "va mashhur postlar endpointi. Swagger UI va ReDoc bilan hujjatlashtirilgan.",
       stek:"Python · Django · DRF · SQLite · Swagger"},

      {t:"O'quv loyihalari to'plami",
       x:"Iteratorlar va kontekst menejerlari bo'yicha amaliy Python mashqlari, bitta fayldan iborat "+
         "Django ilovasi hamda foydalanuvchilar va buyurtmalar jadvallari bilan PostgreSQL sxemasi.",
       stek:"github.com/j-aliyev/python-praktika"}
    ],

    tillar:[
      {t:"O'zbek", d:"cvNative"},
      {t:"Rus",    d:"cvFluent"},
      {t:"Ingliz", d:"cvBasic"}
    ]
  },

  /* Yusupova Nilufar */
  "3050":{
    rol:"Frontend Developer",
    shahar:"Samarqand, O'zbekiston",
    github:"github.com/n-yusupova",
    haqida:"cvAbout2",

    skills:[
      {g:"cvLang",  v:"JavaScript, TypeScript"},
      {g:"cvFw",    v:"React, Vue"},
      {g:"cvDb",    v:"Firebase"},
      {g:"cvTools", v:"Git, Figma, Vite"},
      {g:"cvOther", v:"Responsive dizayn, REST API integratsiya"}
    ],

    ish:[],

    loyiha:[
      {t:"Talabalar portali interfeysi",
       x:"Universitet talabalari uchun mobil interfeys. Dars jadvali, baholar va e'lonlar bo'limlari.",
       stek:"React · TypeScript · Vite"}
    ],

    tillar:[
      {t:"O'zbek", d:"cvNative"},
      {t:"Rus",    d:"cvFluent"},
      {t:"Ingliz", d:"cvFluent"}
    ]
  },

  /* Dusmurodov Lazizjon */
  "1111":{
    rol:"Frontend Developer",
    shahar:"Samarqand, O'zbekiston",
    github:"github.com/lazizjondusmurodov-create",
    haqida:"cvAbout3",

    skills:[
      {g:"cvLang",  v:"JavaScript, HTML, CSS"},
      {g:"cvFw",    v:"Vanilla JS, Sass"},
      {g:"cvDb",    v:"localStorage, JSON"},
      {g:"cvTools", v:"Git, GitHub, VS Code"},
      {g:"cvOther", v:"Mobil interfeys, Responsive dizayn, i18n (uz/ru/en)"}
    ],

    ish:[],

    loyiha:[
      {t:"MyStudent — talaba kabineti ilovasi",
       x:"Talabalar uchun mobil veb ilova: dars jadvali, davomat, baholar, kutubxona va karyera "+
         "bo'limlari. Uch tilli interfeys (o'zbek, rus, ingliz), swipe bilan tab almashtirish va "+
         "pull-to-refresh. Framework'siz, sof JavaScript'da yozilgan.",
       stek:"JavaScript · HTML · CSS"}
    ],

    tillar:[
      {t:"O'zbek", d:"cvNative"},
      {t:"Rus",    d:"cvBasic"},
      {t:"Ingliz", d:"cvBasic"}
    ]
  }

  /* "7788" — Rahmonov Sardor rezyume yaratmagan (bo'sh holat namunasi) */
};

/* joriy talabaning rezyumesi (bo'lmasa null) */
function cvOf(){
  return CV_BAZA[USER.kod] || null;
}


function cvHTML(){
  const CV = cvOf();

  /* rezyume yaratilmagan bo'lsa */
  if(!CV){
    return noResultHTML(t('cvNone'), t('cvNoneX')) +
      '<div class="newapp"><button class="btn btn--primary" id="cvNew">' +
      esc(t('cvCreate')) + '</button></div>';
  }

  const gpa  = gpaOf(gradesOf('all'));
  const yut  = (CAREER.yutuq   && CAREER.yutuq.items)   || [];
  const kurs = (CAREER.mahorat && CAREER.mahorat.items) || [];
  const maq  = (CAREER.maqola  && CAREER.maqola.items)  || [];

  /* sarlavha */
  let h = '<div class="cv">'+
    '<div class="cv__head">'+
      '<div class="cv__ava">'+esc(initials(USER.name))+'</div>'+
      '<div class="cv__hi">'+
        '<div class="cv__name">'+esc(USER.name)+'</div>'+
        '<div class="cv__role">'+esc(CV.rol)+'</div>'+
        '<div class="cv__sub">'+esc(CV.shahar)+'</div>'+
      '</div>'+
    '</div>'+

    '<div class="cv__links">'+
      '<span class="cv__link"><svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2z"/></svg>'+
      esc(USER.phone)+'</span>'+
      '<span class="cv__link"><svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>'+
      esc(USER.email)+'</span>'+
      '<span class="cv__link"><svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19.9 5a4.9 4.9 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.6 0C6.9 1.1 5.8 1.4 5.8 1.4A4.9 4.9 0 0 0 5.7 5a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22"/></svg>'+
      esc(CV.github)+'</span>'+
    '</div>'+

    '<div class="cv__gpa">'+
      '<span class="cv__gpav">'+(Math.round(gpa * 100) / 100).toFixed(2)+'<small>/5</small></span>'+
      '<span class="cv__gpal">'+esc(t('cvGpa'))+'</span>'+
    '</div>'+
  '</div>';

  /* qisqacha */
  h += '<h2 class="eyebrow">'+esc(t('cvAbout'))+'</h2>'+
    '<div class="cvsec"><p class="cvsec__p">'+esc(t(CV.haqida))+'</p></div>';

  /* ko'nikmalar — guruhlar bo'yicha */
  h += '<h2 class="eyebrow">'+esc(t('cvSkills'))+'</h2>'+
    '<div class="cvsec">' + CV.skills.map(function(k){
      return '<div class="cvsk">'+
        '<span class="cvsk__g">'+esc(t(k.g))+'</span>'+
        '<span class="cvsk__v">'+esc(k.v)+'</span>'+
      '</div>';
    }).join('') + '</div>';

  /* ish tajribasi */
  if(CV.ish.length){
    h += '<h2 class="eyebrow">'+esc(t('cvExp'))+'</h2>'+
      '<div class="cvsec">' + CV.ish.map(function(x){
        return '<div class="cvrow">'+
          '<div class="cvrow__top">'+
            '<span class="cvrow__t">'+esc(x.t)+'</span>'+
            '<span class="cvrow__d">'+esc(x.vaqt)+'</span>'+
          '</div>'+
          '<div class="cvrow__m">'+esc(x.org)+'</div>'+
          '<ul class="cvlist">' + x.nuqta.map(function(n){
            return '<li>'+esc(n)+'</li>';
          }).join('') + '</ul>'+
        '</div>';
      }).join('') + '</div>';
  }

  /* loyihalar */
  if(CV.loyiha.length){
    h += '<h2 class="eyebrow">'+esc(t('cvProjects'))+'</h2>'+
      '<div class="cvsec">' + CV.loyiha.map(function(x){
        return '<div class="cvrow">'+
          '<div class="cvrow__t">'+esc(x.t)+'</div>'+
          '<p class="cvrow__x">'+esc(x.x)+'</p>'+
          '<div class="cvrow__stek">'+esc(x.stek)+'</div>'+
        '</div>';
      }).join('') + '</div>';
  }

  /* ta'lim */
  h += '<h2 class="eyebrow">'+esc(t('cvEdu'))+'</h2>'+
    '<div class="cvsec">'+
      '<div class="cvrow">'+
        '<div class="cvrow__top">'+
          '<span class="cvrow__t">'+esc(td(USER.faculty))+'</span>'+
          '<span class="cvrow__d">'+esc(td(USER.status))+'</span>'+
        '</div>'+
        '<div class="cvrow__m">'+esc(td(USER.form))+' · '+esc(td(USER.course))+' · '+esc(USER.group)+'</div>'+
      '</div>'+
    '</div>';

  /* yutuqlar */
  if(yut.length){
    h += '<h2 class="eyebrow">'+esc(t('cvAwards'))+'</h2>'+
      '<div class="cvsec">' + yut.map(function(x){
        return '<div class="cvrow">'+
          '<div class="cvrow__t">'+esc(x.t)+'</div>'+
          '<div class="cvrow__m">'+esc(x.m)+'</div>'+
        '</div>';
      }).join('') + '</div>';
  }

  /* tugatilgan kurslar */
  const bitgan = kurs.filter(function(x){ return /yakun|заверш|complet/i.test(x.b || ''); });
  if(bitgan.length){
    h += '<h2 class="eyebrow">'+esc(t('cvCourses'))+'</h2>'+
      '<div class="cvsec">' + bitgan.map(function(x){
        return '<div class="cvrow">'+
          '<div class="cvrow__t">'+esc(x.t)+'</div>'+
          '<div class="cvrow__m">'+esc(x.m)+'</div>'+
        '</div>';
      }).join('') + '</div>';
  }

  /* maqolalar */
  if(maq.length){
    h += '<h2 class="eyebrow">'+esc(t('cvPapers'))+'</h2>'+
      '<div class="cvsec">' + maq.map(function(x){
        return '<div class="cvrow">'+
          '<div class="cvrow__t">'+esc(x.t)+'</div>'+
          '<div class="cvrow__m">'+esc(x.m)+'</div>'+
        '</div>';
      }).join('') + '</div>';
  }

  /* tillar */
  h += '<h2 class="eyebrow">'+esc(t('cvLangs'))+'</h2>'+
    '<div class="cvsec"><div class="cvtags">' + CV.tillar.map(function(x){
      return '<span class="cvtag">'+esc(x.t)+' · '+esc(t(x.d))+'</span>';
    }).join('') + '</div></div>';

  /* tugmalar */
  h += '<div class="cvbtns">'+
    '<button class="btn btn--primary" id="cvDl">'+esc(t('cvDownload'))+'</button>'+
    '<button class="btn btn--ghost" id="cvShare">'+esc(t('cvShare'))+'</button>'+
  '</div>'+
  '<p class="cvnote">'+esc(t('cvAutoNote'))+'</p>';

  return h;
}

function openCv(){
  haptic();
  curPage = 'cv';
  detailTitle.textContent = t('cvTitle');
  $('refBtn').hidden = true;
  renderCv();

  detail.classList.add('is-open');
  detail.setAttribute('aria-hidden','false');
  detail.scrollTop = 0;

  if(!detailOpen){
    detailOpen = true;
    history.pushState({detail:true}, '');
  }
}

function renderCv(){
  detailBody.innerHTML = cvHTML();

  const nw = $('cvNew');
  if(nw) nw.addEventListener('click', function(){
    haptic(12);
    toast(t('dlSoon'));
  });

  const d = $('cvDl');
  if(d) d.addEventListener('click', function(){ haptic(12); toast(t('dlSoon')); });

  const sh = $('cvShare');
  if(sh) sh.addEventListener('click', function(){
    haptic(12);
    if(navigator.share){
      navigator.share({title:USER.name, text:t('cvTitle')}).catch(function(){});
    } else {
      toast(t('dlSoon'));
    }
  });
}

/* =========================================================
   11.65) FOTOGALEREYA SAHIFASI
   ========================================================= */
function photoHTML(){
  if(!PHOTOS.length) return noResultHTML(t('photoNo'), t('photoNoX'));

  return '<div class="pgrid">' + PHOTOS.map(function(x){
    return '<button class="pcard pcard--'+esc(x.ton)+'" data-photo="'+esc(x.id)+'">'+
      '<span class="pcard__img"><svg viewBox="0 0 24 24">'+x.ic+'</svg></span>'+
      '<span class="pcard__t">'+esc(x.t)+'</span>'+
      '<span class="pcard__m">'+esc(x.sana)+' · '+x.soni+' '+esc(t('photoCount'))+'</span>'+
    '</button>';
  }).join('') + '</div>';
}

function openPhoto(){
  haptic();
  curPage = 'photo';
  detailTitle.textContent = t('photoTitle');
  $('refBtn').hidden = true;
  renderPhoto();

  detail.classList.add('is-open');
  detail.setAttribute('aria-hidden','false');
  detail.scrollTop = 0;

  if(!detailOpen){
    detailOpen = true;
    history.pushState({detail:true}, '');
  }
}

function renderPhoto(){
  detailBody.innerHTML = photoHTML();

  detailBody.querySelectorAll('[data-photo]').forEach(function(b){
    b.addEventListener('click', function(){
      const x = PHOTOS.filter(function(y){ return y.id === b.dataset.photo; })[0];
      if(!x) return;
      haptic();
      openModal(x.t, x.sana + ' · ' + x.soni + ' ' + t('photoCount'),
        '<div class="pmod pmod--'+esc(x.ton)+'">'+
          '<svg viewBox="0 0 24 24">'+x.ic+'</svg>'+
        '</div>'+
        '<button class="btn btn--ghost" id="phClose">'+esc(t('close'))+'</button>');
      const c = $('phClose');
      if(c) c.addEventListener('click', closeModal);
    });
  });
}

/* =========================================================
   11.66) ARIZALAR SAHIFASI
   ========================================================= */
let appsFilter = 'all';   /* 'all' | 'wait' | 'done' */

function appsHTML(){
  const hammasi = hammaArizalar();

  const F = [
    {k:'all',  label:t('appsAll')},
    {k:'wait', label:t('appsWait')},
    {k:'done', label:t('appsDone')}
  ];
  let h = '<div class="dfilter">' + F.map(function(f){
    return '<button class="'+(appsFilter === f.k ? 'is-on' : '')+'" data-afil="'+f.k+'">'+
           esc(f.label)+'</button>';
  }).join('') + '</div>';

  h += '<div class="newapp"><button class="btn btn--primary" id="newAppBtn2">'+
       esc(t('newApp'))+'</button></div>';

  if(!hammasi.length) return h + noResultHTML(t('appsNone'), t('appsNoneX'));

  const rows = hammasi.filter(function(a){
    return appsFilter === 'all'  ? true
         : appsFilter === 'wait' ? a.holat === 'wait'
         : a.holat !== 'wait';
  });

  if(!rows.length) return h + noResultHTML(t('notFound'), t('appsNoFilter'));

  h += '<div class="list">' + rows.slice().reverse().map(appCardHTML).join('') + '</div>';
  return h;
}

function openApps(){
  haptic();
  curPage = 'apps';
  detailTitle.textContent = t('appsTitle');
  $('refBtn').hidden = false;
  renderApps();

  detail.classList.add('is-open');
  detail.setAttribute('aria-hidden','false');
  detail.scrollTop = 0;

  if(!detailOpen){
    detailOpen = true;
    history.pushState({detail:true}, '');
  }
}

function renderApps(){
  detailBody.innerHTML = appsHTML();

  detailBody.querySelectorAll('[data-afil]').forEach(function(b){
    b.addEventListener('click', function(){
      appsFilter = b.dataset.afil;
      haptic();
      renderApps();
    });
  });

  const nb = $('newAppBtn2');
  if(nb) nb.addEventListener('click', openNewApp);

  detailBody.querySelectorAll('[data-appsub]').forEach(function(b){
    b.addEventListener('click', function(){
      const a = hammaArizalar().filter(function(x){ return x.id === b.dataset.appsub; })[0];
      if(!a) return;
      haptic();
      openModal(a.t, t('subjects2') + ': ' + a.fanlar + ' · ' + t('credits') + ': ' + a.kredit,
        '<div class="list" style="padding:0">' +
          (a.fanlarRoyxat || []).map(rowHTML).join('') +
        '</div>' +
        '<button class="btn btn--ghost" id="subClose2">' + esc(t('close')) + '</button>');
      const c = $('subClose2');
      if(c) c.addEventListener('click', closeModal);
    });
  });

  detailBody.querySelectorAll('[data-dl]').forEach(function(b){
    b.addEventListener('click', function(){
      haptic(12);
      toast(t('dlSoon'));
    });
  });
}

/* =========================================================
   11.67) YOTOQXONA SAHIFASI
   ========================================================= */
function dormHTML(){
  /* joy ajratilmagan yoki navbatda */
  if(DORM.holat !== 'yashaydi'){
    let h = '';
    if(DORM.holat === 'navbat'){
      h += '<div class="dsum dsum--wait">'+
        '<div class="dsum__label">'+esc(t('dormQueue'))+'</div>'+
        '<div class="dsum__val">'+DORM.navbat+'<small>'+esc(t('dormQueueN'))+'</small></div>'+
      '</div>';
      h += noResultHTML(t('dormApplied'), t('dormNoX'));
    } else {
      h += noResultHTML(t('dormNo'), t('dormNoX'));
      h += '<div class="newapp"><button class="btn btn--primary" id="dormApply">'+
           esc(t('dormApply'))+'</button></div>';
    }
    return h;
  }

  /* joy ajratilgan */
  let h = '<div class="dsum">'+
    '<div class="dsum__label">'+esc(t('dormPlace'))+'</div>'+
    '<div class="dsum__val">'+esc(DORM.xona)+'<small>'+esc(t('dormRoom')).toLowerCase()+'</small></div>'+
    '<div class="dsum__note">'+esc(td(DORM.bino))+' · '+esc(qavatText(DORM.qavat))+
      ' · '+esc(t('dormBed'))+' '+esc(DORM.orin)+'</div>'+
    '<span class="dsum__chip">'+esc(t('dormActive'))+'</span>'+
  '</div>';

  h += '<h2 class="eyebrow">'+esc(t('infoTitle'))+'</h2>'+
    '<div class="info" style="margin:0 18px 4px">'+
      [[t('dormBuilding'), td(DORM.bino)],
       [t('dormRoom'),     DORM.xona],
       [t('dormBed'),      DORM.orin],
       [t('dormFloor'),    DORM.qavat],
       [t('dormType'),     td(DORM.kishi + ' kishilik')],
       [t('dormFrom'),     DORM.sana]
      ].map(function(r){
        return '<div class="info__row"><span>'+esc(r[0])+'</span><b>'+esc(String(r[1]))+'</b></div>';
      }).join('')+
    '</div>';

  const qoldi = dormLeft();
  h += '<h2 class="eyebrow">'+esc(t('dormPay'))+'</h2>'+
    '<div class="sum'+(qoldi ? ' sum--bad' : '')+'" style="margin:0 18px 4px">'+
      '<div class="sum__label">'+esc(qoldi ? t('dormDebt') : t('dormPaid'))+'</div>'+
      '<div class="sum__val">'+money(qoldi || DORM.tolangan)+'<small>so’m</small></div>'+
      '<div class="sum__note">'+money(DORM.oylik)+' so’m · '+esc(t('dormPerMonth'))+'</div>'+
    '</div>';

  h += '<h2 class="eyebrow">'+esc(t('dormRules'))+'</h2>'+
    '<div class="drules">' + DORM.qoidalar.map(function(q){
      return '<div class="drules__i">'+
        '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>'+
        '<span>'+esc(q)+'</span>'+
      '</div>';
    }).join('') + '</div>';

  h += '<h2 class="eyebrow">'+esc(t('dormContact'))+'</h2>'+
    '<div class="info" style="margin:0 18px 4px">'+
      '<div class="info__row"><span>'+esc(t('fullName'))+'</span><b>'+esc(DORM.komendant)+'</b></div>'+
      '<div class="info__row"><span>'+esc(t('phone'))+'</span><b>'+esc(DORM.tel)+'</b></div>'+
    '</div>';

  return h;
}

function openDorm(){
  haptic();
  curPage = 'dorm';
  detailTitle.textContent = t('dormTitle');
  $('refBtn').hidden = false;
  renderDorm();

  detail.classList.add('is-open');
  detail.setAttribute('aria-hidden','false');
  detail.scrollTop = 0;

  if(!detailOpen){
    detailOpen = true;
    history.pushState({detail:true}, '');
  }
}

function renderDorm(){
  detailBody.innerHTML = dormHTML();

  const ab = $('dormApply');
  if(ab) ab.addEventListener('click', function(){
    haptic(12);
    DORM.holat = 'navbat';
    DORM.navbat = 14;
    toast(t('dormApplied'));
    renderDorm();
  });
}

/* =========================================================
   11.68) IMTIHONLAR SAHIFASI
   ========================================================= */

/* sanani chiroyli ko'rsatish: "11 sentabr, juma" */
function examDateText(x){
  const L = I18N[LANG];
  const d = new Date(x.date + 'T00:00:00');
  return d.getDate() + ' ' + L.months[d.getMonth()] + ', ' + L.days[d.getDay()].toLowerCase();
}

/* bugundan necha kun keyinligini so'z bilan: bugun / ertaga */
function examDayWord(x){
  const bugun  = new Date(todayIso() + 'T00:00:00').getTime();
  const kuni   = new Date(x.date     + 'T00:00:00').getTime();
  const farq   = Math.round((kuni - bugun) / 86400000);
  return farq === 0 ? t('examToday') : farq === 1 ? t('examTomorrow') : '';
}

/* eng yaqin imtihon — katta sanoq kartasi */
function examNextHTML(){
  const x = examNext();
  if(!x) return '';

  const st = examState(x);
  const ms = examLeftMs(x);

  /* holatga qarab: hozir ketyapti / bugun / sanoq */
  let big, note;
  if(st === 'now'){
    big  = '<span class="live"><i></i></span>' + t('examNow');
    note = x.from + ' \u2013 ' + x.to + ' \u00b7 ' + x.room;
  } else {
    const word = examDayWord(x);
    big  = word || examCountdown(ms);
    note = examDateText(x) + ' \u00b7 ' + x.from + ' \u00b7 ' + td(x.room);
  }

  const tone = st === 'now' ? ' exnext--now'
             : ms < 86400000 ? ' exnext--soon' : '';

  return '<div class="exnext'+tone+'">'+
    '<div class="exnext__label">'+esc(t('examNext'))+'</div>'+
    '<div class="exnext__big">'+big+
      (st === 'soon' && !examDayWord(x) ? '<small>'+esc(t('examLeft'))+'</small>' : '')+
    '</div>'+
    '<div class="exnext__t">'+esc(td(x.t))+'</div>'+
    '<div class="exnext__note">'+esc(note)+'</div>'+
  '</div>';
}

/* bitta imtihon kartasi */
function examCardHTML(x){
  const st   = examState(x);
  const past = st === 'done';

  /* o'ng tomondagi belgi: ball yoki sanoq */
  let right = '';
  if(past && x.ball !== undefined){
    const pct  = Math.round(x.ball / x.maks * 100);
    const tone = pct >= 86 ? 'ok' : pct >= 71 ? 'good' : pct >= 60 ? 'warn' : 'bad';
    right = '<span class="excard__ball excard__ball--'+tone+'">'+x.ball+
            '<small>/'+x.maks+'</small></span>';
  } else if(st === 'now'){
    right = '<span class="excard__tag excard__tag--now">'+esc(t('examNow'))+'</span>';
  } else if(!past){
    const word = examDayWord(x);
    right = '<span class="excard__tag">'+esc(word || examCountdown(examLeftMs(x)))+'</span>';
  }

  const d = new Date(x.date + 'T00:00:00');

  return '<div class="excard'+(past ? ' excard--past' : '')+(st === 'now' ? ' excard--now' : '')+'">'+
    '<div class="excard__day">'+
      '<span class="excard__d">'+d.getDate()+'</span>'+
      '<span class="excard__m">'+esc(I18N[LANG].months[d.getMonth()].slice(0, 3))+'</span>'+
    '</div>'+
    '<div class="excard__body">'+
      '<div class="excard__t">'+esc(td(x.t))+'</div>'+
      '<div class="excard__s">'+esc(x.from)+' \u2013 '+esc(x.to)+' \u00b7 '+esc(td(x.room))+'</div>'+
      '<div class="excard__x">'+esc(td(x.tur))+' \u00b7 '+esc(x.teacher)+'</div>'+
    '</div>'+
    right+
  '</div>';
}

function examsHTML(){
  if(!EXAMS.length) return noResultHTML(t('examNo'), t('examNoX'));

  const kel = examsUpcoming();
  const otg = examsPast();

  let h = examNextHTML();

  if(kel.length){
    h += '<h2 class="eyebrow">'+esc(t('examUpcoming'))+'</h2>'+
         '<div class="list">' + kel.map(examCardHTML).join('') + '</div>';
  }

  if(otg.length){
    h += '<h2 class="eyebrow">'+esc(t('examPast'))+'</h2>'+
         '<div class="list">' + otg.map(examCardHTML).join('') + '</div>';
  }

  return h;
}

function openExams(){
  haptic();
  curPage = 'exams';
  detailTitle.textContent = t('examTitle');
  $('refBtn').hidden = false;
  renderExams();

  detail.classList.add('is-open');
  detail.setAttribute('aria-hidden','false');
  detail.scrollTop = 0;

  if(!detailOpen){
    detailOpen = true;
    history.pushState({detail:true}, '');
  }
}

/* sanoq har daqiqada yangilanadi (examTimer yuqorida e'lon qilingan) */
function renderExams(){
  detailBody.innerHTML = examsHTML();

  clearInterval(examTimer);
  examTimer = setInterval(function(){
    /* sahifa yopilgan bo'lsa — to'xtatamiz */
    if(!detailOpen || curPage !== 'exams'){
      clearInterval(examTimer);
      examTimer = null;
      return;
    }
    detailBody.innerHTML = examsHTML();
  }, 60000);
}

/* =========================================================
   11.7) DAVOMAT SAHIFASI
   ========================================================= */
let attOpen = null;   /* yoyilgan fan indeksi */

/* qoldirilgan bitta dars qatori */
function attMissHTML(q){
  const bad = q.s === 'sababsiz';
  return '<span class="amiss">'+
    '<span class="amiss__dot'+(bad ? ' amiss__dot--no' : '')+'"></span>'+
    '<span class="amiss__d">'+esc(q.d)+'</span>'+
    '<span class="amiss__s'+(bad ? ' amiss__s--no' : '')+'">'+
      esc(bad ? t('attUnexcused') : t('attExcused'))+
    '</span>'+
  '</span>';
}

/* bitta fan kartasi */
function attCardHTML(x, i){
  const c    = attCalc(x);
  const tone = attTone(c.v);
  const open = attOpen === i;

  let more = '';
  if(open){
    more = '<span class="acard__more-t">'+esc(t('attMissedDays'))+'</span>' +
      (c.qoldi
        ? (x.qoldi || []).map(attMissHTML).join('')
        : '<span class="amiss amiss--none">'+esc(t('attNoMiss'))+'</span>');
  }

  return '<button class="acard'+(open ? ' is-open' : '')+'" data-acard="'+i+'" aria-expanded="'+(open ? 'true' : 'false')+'">'+
    '<span class="acard__head">'+
      '<span class="acard__pct acard__pct--'+tone+'">'+c.v+'<small>%</small></span>'+
      '<span class="acard__body">'+
        '<span class="acard__t">'+esc(td(x.t))+'</span>'+
        '<span class="acard__m">'+c.kelgan+'/'+c.jami+' '+esc(t('attHours'))+
          (c.qoldi ? ' \u00b7 '+c.qoldi+' '+esc(t('attMissed')).toLowerCase() : '')+
        '</span>'+
      '</span>'+
      (c.qoldi ? '<svg class="acard__caret" viewBox="0 0 14 9"><path d="M1 1l6 6 6-6"/></svg>' : '')+
    '</span>'+
    '<span class="acard__bar"><i class="is-'+tone+'" style="width:'+c.v+'%"></i></span>'+
    '<span class="acard__more">'+more+'</span>'+
  '</button>';
}

function attHTML(){
  if(!ATTENDANCE.length) return noResultHTML(t('attNoData'), t('attNoDataX'));

  const tot  = attTotal();
  const tone = attTone(tot.v);

  /* umumiy karta */
  let h = '<div class="atot atot--'+tone+'">'+
    '<div class="atot__label">'+esc(t('attTotal'))+'</div>'+
    '<div class="atot__val">'+tot.v+'<small>%</small></div>'+
    '<div class="atot__ring" style="--p:'+tot.v+'"></div>'+
    '<div class="atot__stats">'+
      '<span><b>'+tot.jami+'</b>'+esc(t('attAll'))+'</span>'+
      '<span><b class="is-ok">'+tot.kelgan+'</b>'+esc(t('attCame'))+'</span>'+
      (tot.sababli   ? '<span><b class="is-warn">'+tot.sababli+'</b>'+esc(t('attExcused'))+'</span>' : '')+
      (tot.sababsiz  ? '<span><b class="is-bad">'+tot.sababsiz+'</b>'+esc(t('attUnexcused'))+'</span>' : '')+
    '</div>'+
  '</div>';

  /* past davomat ogohlantirishi */
  const past = ATTENDANCE.filter(function(x){ return attCalc(x).v <= 75; }).length;
  if(past){
    h += '<div class="anote">'+
      '<svg viewBox="0 0 24 24"><path d="M12 2 2 20h20z"/><path d="M12 9v5M12 17h.01"/></svg>'+
      '<span>'+esc(t('attWarn'))+'</span>'+
    '</div>';
  }

  /* fanlar — eng past davomat tepada */
  const rows = ATTENDANCE.map(function(x, i){ return {x:x, i:i, v:attCalc(x).v}; })
                         .sort(function(a, b){ return a.v - b.v; });

  h += '<div class="list">' + rows.map(function(r){
    return attCardHTML(r.x, r.i);
  }).join('') + '</div>';

  return h;
}

function openAtt(){
  haptic();
  curPage = 'att';
  detailTitle.textContent = t('attTitle');
  $('refBtn').hidden = false;
  renderAtt();

  detail.classList.add('is-open');
  detail.setAttribute('aria-hidden','false');
  detail.scrollTop = 0;

  if(!detailOpen){
    detailOpen = true;
    history.pushState({detail:true}, '');
  }
}

function renderAtt(){
  detailBody.innerHTML = attHTML();

  detailBody.querySelectorAll('[data-acard]').forEach(function(b){
    b.addEventListener('click', function(){
      const i = +b.dataset.acard;
      attOpen = (attOpen === i) ? null : i;
      haptic();
      renderAtt();
    });
  });

  requestAnimationFrame(function(){
    detailBody.querySelectorAll('.acard__bar i').forEach(function(el){
      const w = el.style.width;
      el.style.width = '0';
      requestAnimationFrame(function(){ el.style.width = w; });
    });
  });
}

/* ochiq sahifani yangilash — qarzdorlik yoki baholar */
/* Ochiq ichki sahifani qayta chizish.
   Sahifa nomi curPage da saqlanadi — sarlavha matniga tayanmaydi,
   shuning uchun til almashsa ham to'g'ri sahifa yangilanadi. */
function renderDetailPage(){
  const r = PAGE_RENDER[curPage];
  if(r) r();
}

/* sahifa nomi -> qayta chizuvchi funksiya */
PAGE_RENDER.grades = renderGrades;
PAGE_RENDER.att    = renderAtt;
PAGE_RENDER.sched  = renderSched;
PAGE_RENDER.debt   = renderDebt;
PAGE_RENDER.admin  = renderAdmin;
PAGE_RENDER.exams  = renderExams;
PAGE_RENDER.apps   = renderApps;
PAGE_RENDER.dorm   = renderDorm;
PAGE_RENDER.cv     = renderCv;
PAGE_RENDER.photo  = renderPhoto;

/* sahifani yangilash tugmasi */
$('refBtn').addEventListener('click', function(){
  const b = this;
  if(b.classList.contains('is-spin')) return;
  b.classList.add('is-spin');
  haptic(10);
  setTimeout(function(){
    renderDetailPage();
    b.classList.remove('is-spin');
    toast(t('updated'));
  }, 800);
});

/* =========================================================
   12) TOAST
   ========================================================= */
const toastEl = $('toast');
let toastTimer = null;
function toast(text){
  toastEl.textContent = text;
  toastEl.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ toastEl.classList.remove('is-on'); }, 2400);
}

/* =========================================================
   13) MODAL OYNA
   ========================================================= */
const modal = $('modal'), modalTitle = $('modalTitle'),
      modalSub = $('modalSub'), modalBody = $('modalBody');

function openModal(title, sub, html){
  modalTitle.textContent = title;
  modalSub.textContent = sub;
  modalBody.innerHTML = html;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  const first = modalBody.querySelector('input:not([readonly])');
  if(first) setTimeout(function(){ first.focus(); }, 320);
}
function closeModal(){
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
$('modalScrim').addEventListener('click', closeModal);

function fieldHTML(id, label, value, opt){
  opt = opt || {};
  return '<div class="field" id="f_'+id+'">'+
    '<label for="'+id+'">'+esc(label)+'</label>'+
    '<input id="'+id+'" type="'+(opt.type || 'text')+'" value="'+esc(value || '')+'"'+
      (opt.readonly ? ' readonly' : '')+
      (opt.placeholder ? ' placeholder="'+esc(opt.placeholder)+'"' : '')+'>'+
    (opt.hint ? '<div class="hint">'+esc(opt.hint)+'</div>' : '')+
    '<div class="err">'+esc(opt.err || 'To\'ldirilishi shart')+'</div>'+
  '</div>';
}
function markBad(id, on){ $('f_'+id).classList.toggle('is-bad', !!on); }

/* =========================================================
   14) BILDIRISHNOMALAR
   ========================================================= */
$('bellBtn').addEventListener('click', function(){
  haptic();
  const yangi = NEWS.filter(function(n){ return n.isNew; });
  let html = '';

  if(yangi.length){
    html = yangi.map(function(n){
      return '<div class="row"><div class="row__top">'+
        '<div class="row__title">'+esc(n.t)+'</div>'+
        '<span class="badge badge--ok">'+esc(t('newTag'))+'</span></div>'+
        '<div class="row__meta">'+esc(n.who+' · '+qachonMatn(n))+'</div></div>';
    }).join('');
    html += '<button class="btn btn--ghost" id="markRead">'+esc(t('markRead'))+'</button>';
  } else {
    html = '<div class="empty" style="padding:24px 0"><b>'+esc(t('noNew'))+'</b>'+
           '<p>'+esc(t('allRead'))+'</p></div>';
  }

  openModal(t('notifications'), yangi.length + ' ' + t('unread'), html);

  const mr = $('markRead');
  if(mr) mr.addEventListener('click', function(){
    NEWS.forEach(function(n){ n.isNew = false; });
    $('bellDot').style.display = 'none';
    document.querySelectorAll('.post__new').forEach(function(el){ el.remove(); });
    closeModal();
    toast(t('allMarked'));
  });
});

/* =========================================================
   15) SHAXSIY MA'LUMOTLARNI TAHRIRLASH
   ========================================================= */
try{
  const savedUser = JSON.parse(localStorage.getItem('ms.user') || '{}');
  Object.keys(savedUser).forEach(function(k){ if(k in USER) USER[k] = savedUser[k]; });
  if(Object.keys(savedUser).length) fillUserUI();
}catch(e){}

$('btnEdit').addEventListener('click', function(){
  haptic();
  openModal(
    t('personalData'),
    t('editSub'),
    fieldHTML('fName',  t('fullName'), USER.name,  {placeholder:'Familiya Ism Sharif', err:t('required')}) +
    fieldHTML('fPhone', t('phone'),    USER.phone, {type:'tel', placeholder:'+998 90 123 45 67', err:t('required')}) +
    fieldHTML('fMail',  t('email'),    USER.email, {type:'email', placeholder:'mail@example.com', err:t('required')}) +
    fieldHTML('fGroup', t('group'),    USER.group, {readonly:true, hint:t('groupHint')}) +
    fieldHTML('fFac',   t('faculty'),  td(USER.faculty), {readonly:true}) +
    '<button class="btn btn--primary" id="saveEdit">'+esc(t('save'))+'</button>'+
    '<button class="btn btn--ghost" id="cancelEdit">'+esc(t('cancel'))+'</button>'
  );

  $('cancelEdit').addEventListener('click', closeModal);

  $('saveEdit').addEventListener('click', function(){
    const name  = $('fName').value.trim();
    const phone = $('fPhone').value.trim();
    const mail  = $('fMail').value.trim();

    let ok = true;
    if(name.length < 3){ markBad('fName', true); ok = false; } else markBad('fName', false);
    if(mail && mail.indexOf('@') < 1){ markBad('fMail', true); ok = false; } else markBad('fMail', false);
    if(!ok){ toast(t('checkData')); return; }

    USER.name = name; USER.phone = phone; USER.email = mail;
    try{
      localStorage.setItem('ms.user', JSON.stringify({name:name, phone:phone, email:mail}));
    }catch(e){}

    fillUserUI();
    closeModal();
    haptic(14);
    toast(t('saved'));
  });
});

/* =========================================================
   16) PAROLNI O'ZGARTIRISH
   ========================================================= */
$('btnPass').addEventListener('click', function(){
  haptic();
  openModal(
    t('changePass'),
    t('passSub'),
    fieldHTML('pOld', t('currentPass'), '', {type:'password', placeholder:'••••••', err:t('required')}) +
    fieldHTML('pNew', t('newPass'),     '', {type:'password', placeholder:'••••••', hint:t('min6'), err:t('min6')}) +
    fieldHTML('pRe',  t('repeatPass'),  '', {type:'password', placeholder:'••••••', err:t('passMismatch')}) +
    '<button class="btn btn--primary" id="savePass">'+esc(t('change'))+'</button>'+
    '<button class="btn btn--ghost" id="cancelPass">'+esc(t('cancel'))+'</button>'
  );

  $('cancelPass').addEventListener('click', closeModal);

  $('savePass').addEventListener('click', function(){
    const oldP = $('pOld').value, newP = $('pNew').value, reP = $('pRe').value;
    let ok = true;
    if(!oldP){ markBad('pOld', true); ok = false; } else markBad('pOld', false);
    if(newP.length < 6){ markBad('pNew', true); ok = false; } else markBad('pNew', false);
    if(newP !== reP || !reP){ markBad('pRe', true); ok = false; } else markBad('pRe', false);
    if(!ok){ toast(t('checkPass')); return; }

    closeModal();
    haptic(14);
    toast(t('passChanged'));
  });
});

/* =========================================================
   17) TIZIMDAN CHIQISH
   ========================================================= */
$('btnExit').addEventListener('click', function(){
  haptic();
  openModal(
    t('exitTitle'),
    t('exitSub'),
    '<button class="btn btn--danger" id="doExit">'+esc(t('yesExit'))+'</button>'+
    '<button class="btn btn--ghost" id="cancelExit">'+esc(t('cancel'))+'</button>'
  );

  $('cancelExit').addEventListener('click', closeModal);
  $('doExit').addEventListener('click', function(){
    try{ localStorage.removeItem('ms.auth'); }catch(e){}
    closeModal();
    closeDetail();
    toast(t('loggedOut'));
    setTimeout(function(){ showAuth(); }, 500);
  });
});

/* Escape — modal, detail, menyu */
document.addEventListener('keydown', function(e){
  if(e.key !== 'Escape') return;
  if(modal.classList.contains('is-open')){ closeModal(); return; }
  if(detailOpen) history.back();
  closeMenu();
});

/* =========================================================
   18) TILNI QO'LLASH VA ALMASHTIRISH
   ========================================================= */
function applyLang(){
  const L = I18N[LANG];

  document.documentElement.lang = LANG;
  $('langBtn').textContent = L._code;

  /* data-i18n bo'lgan hamma elementni tarjima qilish */
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    const k = el.dataset.i18n;
    if(typeof L[k] === 'string') el.textContent = L[k];
  });

  /* sahifa sarlavhasi — faol tabga qarab */
  const act = document.querySelector('.tab.is-active');
  if(act) $('pageTitle').textContent = t(act.dataset.i18nTitle);

  /* sana */
  $('feedDate').textContent = L.dateFmt(new Date(), L);



  /* qayta chiziladigan qismlar */
  fillUserUI();
  buildStrip();
  buildToday();
  buildAttStat();
  buildGpaStat();
  buildNews();
  fillCareerCounts();

  /* ochiq ichki sahifa bo'lsa — sarlavha va ichini yangi tilda qayta chizish */
  if(detailOpen && PAGE_TITLE[curPage]){
    detailTitle.textContent = t(PAGE_TITLE[curPage]);
    renderDetailPage();
  }
}

$('langBtn').addEventListener('click', function(){
  haptic();
  const html = '<div class="langlist">' +
    Object.keys(I18N).map(function(code){
      const L = I18N[code];
      return '<button class="langopt'+(code === LANG ? ' is-on' : '')+'" data-lang="'+code+'">'+
        '<span class="langopt__code">'+esc(L._code)+'</span>'+
        '<span class="langopt__name">'+esc(L._name)+'</span>'+
        '<svg class="langopt__tick" viewBox="0 0 18 18"><path d="M3 9.5l4 4 8-9"/></svg>'+
      '</button>';
    }).join('') + '</div>';

  openModal(t('langTitle'), t('langSub'), html);

  modalBody.querySelectorAll('[data-lang]').forEach(function(b){
    b.addEventListener('click', function(){
      LANG = b.dataset.lang;
      try{ localStorage.setItem('ms.lang', LANG); }catch(e){}
      applyLang();
      closeModal();
      haptic(14);
    });
  });
});

applyLang();

/* =========================================================
   20) SKELETON — yuklanish animatsiyasi
   ========================================================= */
function skPill(){
  return '<span class="sk-pill"></span>';
}
function skLesson(){
  return '<div class="sk-row sk-lesson">'+
    '<span class="sk-time"><span class="sk" style="height:15px"></span>'+
      '<span class="sk" style="height:10px;width:32px;margin-top:5px"></span></span>'+
    '<span class="sk-body"><span class="sk" style="height:14px;width:62%"></span>'+
      '<span class="sk" style="height:11px;width:82%;margin-top:7px"></span></span>'+
  '</div>';
}
function skRow(){
  return '<div class="sk-row">'+
    '<span class="sk" style="height:14px;width:58%"></span>'+
    '<span class="sk" style="height:11px;width:78%;margin-top:8px"></span>'+
  '</div>';
}
function skPost(){
  return '<div class="sk-row">'+
    '<div style="display:flex;gap:9px;align-items:center;margin-bottom:10px">'+
      '<span class="sk" style="height:30px;width:30px;border-radius:9px;flex:0 0 30px"></span>'+
      '<span style="flex:1"><span class="sk" style="height:11px;width:38%"></span>'+
        '<span class="sk" style="height:9px;width:26%;margin-top:5px"></span></span>'+
    '</div>'+
    '<span class="sk" style="height:14px;width:72%"></span>'+
    '<span class="sk" style="height:11px;width:94%;margin-top:8px"></span>'+
  '</div>';
}
function rep(fn, n){
  let h = '';
  for(let i = 0; i < n; i++) h += fn();
  return h;
}

/* asosiy sahifani skeletonga aylantirish */
function showSkeleton(){
  $('strip').innerHTML     = rep(skPill, 5);
  $('todayList').innerHTML = rep(skLesson, 3);
  $('newsList').innerHTML  = rep(skPost, 2);
  $('libList').innerHTML   = rep(skRow, 4);
}

/* ma'lumotlarni qayta chizish (skeletondan keyin) */
function refreshData(){
  buildStrip();
  buildToday();
  buildAttStat();
  buildGpaStat();
  buildNews();
  $('libList').innerHTML = LIBRARY.map(rowHTML).join('');
  applyLang();
}

/* =========================================================
   21) PULL-TO-REFRESH — pastga tortib yangilash
   ========================================================= */
(function pullToRefresh(){
  const ptr = $('ptr');
  const TORTISH = 78;    /* shu masofadan keyin yangilanadi */
  const CHEK    = 130;   /* maksimal tortish */

  let boshY = 0, masofa = 0, faol = false, yuklanmoqda = false;

  function joyla(px, anim){
    ptr.classList.toggle('is-anim', !!anim);
    if(px <= 0){
      ptr.style.transform = 'translateY(-58px)';
      ptr.style.opacity = '0';
      return;
    }
    const y = Math.min(px, CHEK) * .62;
    ptr.style.transform = 'translateY(' + (y + 8) + 'px) rotate(' + (px * 2.2) + 'deg)';
    ptr.style.opacity = Math.min(px / TORTISH, 1);
  }

  function qayta(){
    ptr.classList.remove('is-ready');
    ptr.classList.add('is-load');
    ptr.style.transform = 'translateY(58px)';
    ptr.style.opacity = '1';
    ptr.classList.add('is-anim');

    showSkeleton();
    haptic(12);

    setTimeout(function(){
      refreshData();
      ptr.classList.remove('is-load');
      joyla(0, true);
      toast(t('updated'));
      yuklanmoqda = false;
    }, 750);
  }

  document.addEventListener('touchstart', function(e){
    if(yuklanmoqda || detailOpen) return;
    if(drawer.classList.contains('is-open')) return;
    if(modal.classList.contains('is-open')) return;
    if(window.scrollY > 0) return;
    boshY = e.touches[0].clientY;
    faol = true;
    masofa = 0;
  }, {passive:true});

  document.addEventListener('touchmove', function(e){
    if(!faol || yuklanmoqda) return;
    masofa = e.touches[0].clientY - boshY;

    if(masofa <= 0){ joyla(0); return; }
    if(window.scrollY > 0){ faol = false; joyla(0, true); return; }

    joyla(masofa);
    ptr.classList.toggle('is-ready', masofa >= TORTISH);
  }, {passive:true});

  document.addEventListener('touchend', function(){
    if(!faol || yuklanmoqda) return;
    faol = false;

    if(masofa >= TORTISH){
      yuklanmoqda = true;
      qayta();
    } else {
      joyla(0, true);
      ptr.classList.remove('is-ready');
    }
    masofa = 0;
  });
})();

/* =========================================================
   22) SWIPE — barmoq harakatlari
   chapdan o'ngga surish  -> menyu ochiladi
   ichki sahifada o'ngga  -> sahifa yopiladi
   ========================================================= */
(function swipe(){
  const CHET   = 26;   /* ekran chetidan shuncha px ichida boshlansa */
  const OCHISH = 62;   /* menyu ochilishi uchun kerakli masofa */
  const YOPISH = 70;   /* ichki sahifa yopilishi uchun */

  let x0 = 0, y0 = 0, dx = 0, dy = 0;
  let rejim = null;    /* 'menu' | 'detail' | 'drawer-close' | null */
  const kengligi = function(){ return Math.min(window.innerWidth * .84, 340); };

  function tugat(){
    if(rejim === 'menu'){
      drawer.classList.remove('is-drag');
      scrim.classList.remove('is-drag');
      drawer.style.transform = '';
      scrim.style.opacity = '';
      if(dx >= OCHISH) openMenu(); else closeMenu();
    }
    else if(rejim === 'drawer-close'){
      drawer.classList.remove('is-drag');
      scrim.classList.remove('is-drag');
      drawer.style.transform = '';
      scrim.style.opacity = '';
      if(-dx >= OCHISH) closeMenu(); else openMenu();
    }
    else if(rejim === 'detail'){
      detail.classList.remove('is-drag');
      detail.style.transform = '';
      if(dx >= YOPISH){ haptic(10); history.back(); }
    }
    rejim = null; dx = 0; dy = 0;
  }

  document.addEventListener('touchstart', function(e){
    if(modal.classList.contains('is-open')) return;
    const T = e.touches[0];
    x0 = T.clientX; y0 = T.clientY; dx = 0; dy = 0; rejim = null;

    if(drawer.classList.contains('is-open')) rejim = 'drawer-close';
    else if(detailOpen && x0 <= CHET * 2)    rejim = 'detail';
    else if(x0 <= CHET)                      rejim = 'menu';
  }, {passive:true});

  document.addEventListener('touchmove', function(e){
    if(!rejim) return;
    const T = e.touches[0];
    dx = T.clientX - x0;
    dy = T.clientY - y0;

    /* vertikal harakat ustun bo'lsa — bu scroll, aralashmaymiz */
    if(Math.abs(dy) > Math.abs(dx) + 8){
      if(rejim === 'menu'){ rejim = null; }
      return;
    }

    if(rejim === 'menu'){
      if(dx <= 0) return;
      const w = kengligi();
      const siljish = Math.min(dx, w) - w;
      drawer.classList.add('is-drag');
      scrim.classList.add('is-drag', 'is-open');
      drawer.style.transform = 'translateX(' + siljish + 'px)';
      scrim.style.opacity = Math.min(dx / w, 1) * .9;
    }
    else if(rejim === 'drawer-close'){
      if(dx >= 0) return;
      const w = kengligi();
      drawer.classList.add('is-drag');
      scrim.classList.add('is-drag');
      drawer.style.transform = 'translateX(' + Math.max(dx, -w) + 'px)';
      scrim.style.opacity = Math.max(1 + dx / w, 0) * .9;
    }
    else if(rejim === 'detail'){
      if(dx <= 0) return;
      detail.classList.add('is-drag');
      detail.style.transform = 'translateX(' + dx + 'px)';
    }
  }, {passive:true});

  document.addEventListener('touchend', tugat);
  document.addEventListener('touchcancel', tugat);
})();

/* =========================================================
   23) FOKUS QAMOVI — Tab tugmasi ochiq oynadan chiqmasin
   ========================================================= */
(function focusTrap(){
  const SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), ' +
                   'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  /* hozir qaysi oyna ochiq? */
  function faolOyna(){
    if(modal.classList.contains('is-open'))  return modal;
    if(drawer.classList.contains('is-open')) return drawer;
    return null;
  }

  document.addEventListener('keydown', function(e){
    if(e.key !== 'Tab') return;

    const box = faolOyna();
    if(!box) return;

    const list = Array.prototype.filter.call(
      box.querySelectorAll(SELECTOR),
      function(el){ return el.offsetParent !== null; }
    );
    if(!list.length){ e.preventDefault(); return; }

    const birinchi = list[0];
    const oxirgi   = list[list.length - 1];

    /* fokus oyna tashqarisida bo'lsa — ichkariga qaytaramiz */
    if(!box.contains(document.activeElement)){
      e.preventDefault();
      birinchi.focus();
      return;
    }

    if(e.shiftKey && document.activeElement === birinchi){
      e.preventDefault();
      oxirgi.focus();
    } else if(!e.shiftKey && document.activeElement === oxirgi){
      e.preventDefault();
      birinchi.focus();
    }
  });

  /* menyu ochilganda birinchi elementga fokus */
  const _openMenu = openMenu;
  openMenu = function(){
    _openMenu();
    setTimeout(function(){
      const el = drawer.querySelector(SELECTOR);
      if(el) el.focus();
    }, 340);
  };

  /* yopilganda fokus qaytadan tugmaga */
  const _closeMenu = closeMenu;
  closeMenu = function(){
    const edi = drawer.classList.contains('is-open');
    _closeMenu();
    if(edi) openBtn.focus();
  };
})();

/* =========================================================
   24) YON MENYU SAHIFALARI + SOZLAMALAR
   ========================================================= */

/* bildirishnoma sozlamalari — qurilmada saqlanadi */
const PREFS = {lessons:true, news:true, debts:true, sound:false};
try{
  const sv = JSON.parse(localStorage.getItem('ms.prefs') || '{}');
  Object.keys(sv).forEach(function(k){ if(k in PREFS) PREFS[k] = !!sv[k]; });
}catch(e){}

function savePrefs(){
  try{ localStorage.setItem('ms.prefs', JSON.stringify(PREFS)); }catch(e){}
}

/* ichki sahifani ixtiyoriy HTML bilan ochish */
function openPage(title, html){
  haptic();
  closeMenu();
  $('refBtn').hidden = true;
  detailTitle.textContent = title;
  detailBody.innerHTML = html;
  detail.classList.add('is-open');
  detail.setAttribute('aria-hidden','false');
  detail.scrollTop = 0;
  if(!detailOpen){
    detailOpen = true;
    history.pushState({detail:true}, '');
  }
}

/* --- SOZLAMALAR --- */
/* mavzu tanlash oynasi — til tanlash bilan bir xil ko'rinishda */
function openThemePicker(){
  const VAR = [
    { k:'auto',  nom:t('themeAuto'),  izoh:t('themeAutoSub'),
      ic:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>' },
    { k:'light', nom:t('themeLight'), izoh:'',
      ic:'<circle cx="12" cy="12" r="4.6"/><path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7"/>' },
    { k:'dark',  nom:t('themeDark'),  izoh:'',
      ic:'<path d="M20 13.4A8.5 8.5 0 1 1 10.6 4a6.8 6.8 0 0 0 9.4 9.4z"/>' }
  ];

  const html = '<div class="langlist">' + VAR.map(function(v){
    return '<button class="langopt'+(v.k === THEME ? ' is-on' : '')+'" data-theme-opt="'+v.k+'">'+
      '<span class="langopt__ic"><svg viewBox="0 0 24 24">'+v.ic+'</svg></span>'+
      '<span class="langopt__name">'+esc(v.nom)+
        (v.izoh ? '<small>'+esc(v.izoh)+'</small>' : '')+
      '</span>'+
      '<svg class="langopt__tick" viewBox="0 0 18 18"><path d="M3 9.5l4 4 8-9"/></svg>'+
    '</button>';
  }).join('') + '</div>';

  openModal(t('themeTitle'), t('themeSub'), html);

  modalBody.querySelectorAll('[data-theme-opt]').forEach(function(b){
    b.addEventListener('click', function(){
      THEME = b.dataset.themeOpt;
      try{ localStorage.setItem('ms.theme', THEME); }catch(e){}
      applyTheme();
      closeModal();
      haptic(14);
      /* sozlamalar ochiq bo'lsa — qatordagi nomni yangilaymiz */
      const val = detailBody.querySelector('[data-act="theme"] .set__val');
      if(val) val.textContent = themeNomi();
    });
  });
}

/* sozlamalar qatorida ko'rinadigan mavzu nomi */
function themeNomi(){
  if(THEME === 'light') return t('themeLight');
  if(THEME === 'dark')  return t('themeDark');
  return t('themeAuto');
}

function setRow(o){
  const ic = '<span class="set__ic'+(o.tone ? ' set__ic--'+o.tone : '')+'">'+
             '<svg viewBox="0 0 24 24">'+o.ic+'</svg></span>';
  const body = '<span class="set__body"><span class="set__t">'+esc(o.t)+'</span>'+
               (o.s ? '<span class="set__s">'+esc(o.s)+'</span>' : '')+'</span>';

  if(o.sw !== undefined){
    return '<div class="set__row set__row--static">'+ic+body+
      '<button class="sw'+(o.sw ? ' is-on' : '')+'" data-pref="'+esc(o.pref)+'" '+
      'role="switch" aria-checked="'+(o.sw ? 'true' : 'false')+'" aria-label="'+esc(o.t)+'"></button></div>';
  }
  return '<button class="set__row" data-act="'+esc(o.act || '')+'">'+ic+body+
    (o.val ? '<span class="set__val">'+esc(o.val)+'</span>' : '')+
    '<svg class="set__chev" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6"/></svg></button>';
}

function settingsHTML(){
  const L = I18N[LANG];
  return '<div class="doc"><div class="set">'+

    '<div class="set__group">'+
      '<div class="set__cap">'+esc(t('general'))+'</div>'+
      setRow({t:t('langTitle'), s:t('langSub'), val:L._name, act:'lang',
        ic:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>'})+
      setRow({t:t('themeTitle'), s:t('themeSub'), val:themeNomi(), act:'theme',
        ic:'<circle cx="12" cy="12" r="4.6"/><path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7"/>'})+
    '</div>'+

    '<div class="set__group">'+
      '<div class="set__cap">'+esc(t('notifications'))+'</div>'+
      setRow({t:t('notifLessons'), s:t('notifLessonsSub'), pref:'lessons', sw:PREFS.lessons,
        ic:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>'})+
      setRow({t:t('notifNews'), s:t('notifNewsSub'), pref:'news', sw:PREFS.news,
        ic:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'})+
      setRow({t:t('notifDebts'), s:t('notifDebtsSub'), pref:'debts', sw:PREFS.debts, tone:'warn',
        ic:'<path d="M12 2 2 20h20z"/><path d="M12 9v5M12 17h.01"/>'})+
      setRow({t:t('notifSound'), pref:'sound', sw:PREFS.sound,
        ic:'<path d="M11 5 6 9H2v6h4l5 4zM16 9a5 5 0 0 1 0 6"/>'})+
    '</div>'+

    '<div class="set__group">'+
      '<div class="set__cap">'+esc(t('data'))+'</div>'+
      setRow({t:t('clearCache'), s:t('clearCacheSub'), act:'clear', tone:'danger',
        ic:'<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>'})+
    '</div>'+

  '</div></div>';
}

function openSettings(){
  openPage(t('settings'), settingsHTML());

  /* tugmachalar */
  detailBody.querySelectorAll('[data-pref]').forEach(function(b){
    b.addEventListener('click', function(){
      const k = b.dataset.pref;
      PREFS[k] = !PREFS[k];
      b.classList.toggle('is-on', PREFS[k]);
      b.setAttribute('aria-checked', PREFS[k] ? 'true' : 'false');
      savePrefs();
      haptic(10);
    });
  });

  /* amallar */
  detailBody.querySelectorAll('[data-act]').forEach(function(b){
    b.addEventListener('click', function(){
      const a = b.dataset.act;
      if(a === 'lang'){ $('langBtn').click(); }
      else if(a === 'theme'){ openThemePicker(); }
      else if(a === 'clear'){
        openModal(t('clearCache'), t('clearCacheAsk'),
          '<button class="btn btn--danger" id="doClear">'+esc(t('clearYes'))+'</button>'+
          '<button class="btn btn--ghost" id="noClear">'+esc(t('cancel'))+'</button>');
        $('noClear').addEventListener('click', closeModal);
        $('doClear').addEventListener('click', function(){
          try{ localStorage.clear(); }catch(e){}
          closeModal();
          toast(t('cleared'));
          setTimeout(function(){ location.reload(); }, 900);
        });
      }
    });
  });
}

/* --- ILOVA HAQIDA --- */
function aboutHTML(){
  return '<div class="about">'+
    '<div class="about__logo">MS</div>'+
    '<div class="about__name">MyStudent</div>'+
    '<div class="about__ver">'+esc(t('version'))+' 3.0.0</div>'+
    '<p class="about__x">'+esc(t('aboutText'))+'</p>'+
  '</div>'+
  '<div class="doc">'+
    '<div class="doc__note">'+esc(t('aboutNote'))+'</div>'+
  '</div>';
}

/* --- YORDAM --- */
function helpHTML(){
  const savol = [
    [t('faq1q'), t('faq1a')],
    [t('faq2q'), t('faq2a')],
    [t('faq3q'), t('faq3a')]
  ];
  return '<div class="doc">'+
    savol.map(function(q){
      return '<h3>'+esc(q[0])+'</h3><p>'+esc(q[1])+'</p>';
    }).join('')+
    '<div class="doc__note">'+esc(t('helpContact'))+'</div>'+
  '</div>';
}

/* --- OFERTA / MAXFIYLIK --- */
function docHTML(key){
  const bloklar = t(key);
  return '<div class="doc">'+
    bloklar.map(function(b){
      return '<h3>'+esc(b[0])+'</h3><p>'+esc(b[1])+'</p>';
    }).join('')+
  '</div>';
}

/* --- MENYU TUGMALARINI BOG'LASH --- */
document.querySelectorAll('[data-menu]').forEach(function(b){
  b.addEventListener('click', function(){
    const k = b.dataset.menu;
    if(k === 'sozlama')        openSettings();
    else if(k === 'haqida')    openPage(t('about'),   aboutHTML());
    else if(k === 'yordam')    openPage(t('help'),    helpHTML());
    else if(k === 'oferta')    openPage(t('offer'),   docHTML('offerDoc'));
    else if(k === 'maxfiylik') openPage(t('privacy'), docHTML('privacyDoc'));
  });
});

/* --- ULASHISH --- */
$('shareBtn').addEventListener('click', function(){
  haptic();
  const data = {title:'MyStudent', text:t('promoText'), url:location.href};

  if(navigator.share){
    navigator.share(data).catch(function(){});
    closeMenu();
    return;
  }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(location.href).then(function(){
      closeMenu();
      toast(t('linkCopied'));
    }).catch(function(){ closeMenu(); toast(t('shareFail')); });
    return;
  }
  closeMenu();
  toast(t('shareFail'));
});

/* --- PROMO --- */
$('promoBtn').addEventListener('click', function(){
  haptic();
  closeMenu();
  toast(t('promoSoon'));
});

/* =========================================================
   25) RO'YXAT QATORLARI — batafsil oyna
   ========================================================= */

/* barcha ro'yxatlarni bitta indeksga yig'amiz: id -> element

   DIQQAT: ma'lumot API'dan keladi, ya'ni bu fayl o'qilganda LIBRARY va
   JOBS hali bo'sh. Shuning uchun indeks funksiyaga olingan va
   malumotlarniQoy() ichida qayta chaqiriladi — aks holda kitob
   bosilganda ITEMS bo'sh bo'lib, oyna ochilmaydi. */
const ITEMS = {};
function indexItems(){
  function qo(list){
    if(!list) return;
    list.forEach(function(x){ if(x && x.id) ITEMS[x.id] = x; });
  }
  qo(LIBRARY);
  qo(JOBS);
  Object.keys(CAREER).forEach(function(k){ qo(CAREER[k].items); });
}
indexItems();

/* fakt qatori */
function factRow(label, val){
  if(val === undefined || val === null || val === '') return '';
  return '<div class="dt__fact"><span>'+esc(label)+'</span><b>'+esc(String(val))+'</b></div>';
}

/* har tur uchun faktlar ro'yxati */
function itemFacts(x){
  let f = '';

  /* kutubxona */
  f += factRow(t('author'),   x.author);
  f += factRow(t('year'),     x.year);
  f += factRow(t('format'),   x.fmt);
  f += factRow(t('pages'),    x.pages);
  f += factRow(t('bookLang'), x.lang);
  f += factRow(t('backOn'),   x.back);

  /* ish o'rni */
  f += factRow(t('company'),  x.company);
  f += factRow(t('place'),    x.place);
  f += factRow(t('workMode'), x.mode);
  f += factRow(t('salary'),   x.salary);

  /* yutuq */
  f += factRow(t('result'),   x.result);
  f += factRow(t('organizer'),x.org);
  f += factRow(t('dateWord'), x.date);

  /* mahorat darsi */
  f += factRow(t('teacher'),  x.teacher);
  f += factRow(t('lessons'),  x.count);
  f += factRow(t('duration'), x.dur);
  f += factRow(t('level'),    x.level);

  /* maqola */
  f += factRow(t('source'),   x.source);
  f += factRow(t('advisor'),  x.coauthor);

  /* blog */
  f += factRow(t('readTime'), x.read);
  f += factRow(t('views'),    x.views);
  if(x.read) f += factRow(t('dateWord'), x.date);

  return f ? '<div class="dt__facts">'+f+'</div>' : '';
}

/* amal tugmasi */
function itemAction(x){
  const A = {
    download:{label:t('download'), cls:'btn--primary', msg:t('downloadSoon')},
    busy:    {label:t('reserve'),  cls:'btn--primary', msg:t('reserveSoon')},
    apply:   {label:t('applyJob'), cls:'btn--primary', msg:t('applySoon')},
    closed:  {label:t('closedJob'),cls:'btn--ghost',   msg:null, off:true},
    cert:    {label:t('viewCert'), cls:'btn--primary', msg:t('certSoon')},
    watch:   {label:t('watch'),    cls:'btn--primary', msg:t('watchSoon')},
    read:    {label:t('readMore'), cls:'btn--primary', msg:t('readSoon')}
  };
  const a = A[x.act];
  if(!a) return '';
  return '<button class="btn '+a.cls+'" id="itemAct"'+(a.off ? ' disabled style="opacity:.5;cursor:default"' : '')+'>'+
         esc(a.label)+'</button>';
}

/* batafsil oynani ochish */
function openItem(id){
  const x = ITEMS[id];
  if(!x) return;
  haptic();

  let html = '';
  if(x.x) html += '<p class="dt__x">'+esc(x.x)+'</p>';

  /* mahorat darsi — progress */
  if(x.progress !== undefined && x.progress > 0){
    const cls = x.progress >= 100 ? '' : '';
    html += '<div class="dt__prog"><b>'+esc(t('progress'))+': '+x.progress+'%</b>'+
            '<div class="bar"><i class="'+cls+'" style="width:'+x.progress+'%"></i></div></div>';
  }

  html += itemFacts(x);

  /* ish o'rni — ko'nikmalar */
  if(x.skills && x.skills.length){
    html += '<div class="dt__tags">'+
      x.skills.map(function(k){ return '<span class="dt__tag">'+esc(k)+'</span>'; }).join('')+
    '</div>';
  }

  html += itemAction(x);
  html += '<button class="btn btn--ghost" id="itemClose">'+esc(t('close'))+'</button>';

  openModal(x.t, x.m, html);

  $('itemClose').addEventListener('click', closeModal);

  const act = $('itemAct');
  if(act && !act.disabled){
    act.addEventListener('click', function(){
      const A = {
        download:t('downloadSoon'), busy:t('reserveSoon'), apply:t('applySoon'),
        cert:t('certSoon'), watch:t('watchSoon'), read:t('readSoon')
      };
      closeModal();
      haptic(12);
      toast(A[x.act] || t('promoSoon'));
    });
  }
}

/* qatorlarni bog'lash — ro'yxat qayta chizilganda ham ishlashi uchun
   hodisani hujjat darajasida ushlaymiz */
document.addEventListener('click', function(e){
  const btn = e.target.closest ? e.target.closest('[data-item]') : null;
  if(btn) openItem(btn.dataset.item);
});

/* =========================================================
   26) KIRISH (login)

   DIQQAT: bu NAMUNA himoya. Kod brauzer faylida turadi \u2014
   F12 orqali o'qish mumkin. Haqiqiy himoya faqat server bilan bo'ladi:
     kod serverga yuboriladi -> server tekshiradi -> token qaytaradi
   ========================================================= */
/* Talaba kirish kodlari TALABALAR massivida (har birida o'z kodi).
   Namuna rejimi uchun birinchi talabaning kodi ko'rsatiladi. */
/* funksiya, chunki TALABALAR API'dan keyin to'ladi */
function demoKod(){ return TALABALAR.length ? TALABALAR[0].kod : ''; }
const DEKANAT_KODI = '9999';        /* dekanat (admin) kirish kodi */

const auth     = $('auth');
const codeBox  = $('codeBox');
const codeInps = Array.prototype.slice.call(codeBox.querySelectorAll('input'));

/* --- kod maydonlari --- */
codeInps.forEach(function(inp, i){
  inp.addEventListener('input', function(){
    inp.value = inp.value.replace(/\D/g, '').slice(0, 1);
    codeBox.classList.remove('is-bad');
    $('err2').textContent = '';
    if(inp.value && i < codeInps.length - 1) codeInps[i + 1].focus();
    if(codeInps.every(function(x){ return x.value; })) $('doLogin').click();
  });

  inp.addEventListener('keydown', function(e){
    if(e.key === 'Backspace' && !inp.value && i > 0){
      codeInps[i - 1].focus();
      codeInps[i - 1].value = '';
      e.preventDefault();
    }
    if(e.key === 'ArrowLeft'  && i > 0) codeInps[i - 1].focus();
    if(e.key === 'ArrowRight' && i < codeInps.length - 1) codeInps[i + 1].focus();
    if(e.key === 'Enter') $('doLogin').click();
  });

  /* butun kodni bir joyga qo'yish */
  inp.addEventListener('paste', function(e){
    const txt = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
    if(!txt) return;
    e.preventDefault();
    codeInps.forEach(function(x, j){ x.value = txt[j] || ''; });
    const oxiri = Math.min(txt.length, codeInps.length) - 1;
    if(oxiri >= 0) codeInps[oxiri].focus();
    if(txt.length >= 4) $('doLogin').click();
  });
});

/* --- kirish --- */
let loginBusy = false;
$('doLogin').addEventListener('click', function(){
  if(loginBusy) return;
  const code = codeInps.map(function(x){ return x.value; }).join('');

  if(code.length !== 4){
    codeBox.classList.add('is-bad');
    $('err2').textContent = t('badCode');
    haptic(20);
    return;
  }

  loginBusy = true;
  const btn = this;
  btn.classList.add('is-busy');
  btn.textContent = t('checking');

  (async function(){
    const dekanat = (code === DEKANAT_KODI);
    let talaba = null;

    /* SERVER REJIMI: kod serverga yuboriladi, token qaytadi.
       Dekanat kodi mahalliy tekshiriladi (demo uchun). */
    if(API_SERVER_BOR && !dekanat){
      try{
        const j = await apiLogin(code);
        /* kirgandan keyin himoyalangan ma'lumotni yuklaymiz */
        const q = await apiQolganini();
        malumotlarniQoy(q);
        talaba = talabaTop(code) || j.talaba || null;
      }catch(e){
        talaba = null;
      }
    }else{
      talaba = dekanat ? TALABALAR[0] : talabaTop(code);
    }

    loginBusy = false;
    btn.classList.remove('is-busy');
    btn.textContent = t('enter');

    /* kod hech qaysi talabaga mos kelmasa */
    if(!talaba){
      codeBox.classList.add('is-bad');
      $('err2').textContent = t('wrongCode');
      codeInps.forEach(function(x){ x.value = ''; });
      codeInps[0].focus();
      haptic(20);
      return;
    }

    /* topilgan talaba ma'lumotlarini yuklaymiz */
    userYukla(talaba);

    try{
      localStorage.setItem('ms.auth', JSON.stringify({at:Date.now(), kod:talaba.kod}));
    }catch(e){}

    /* dekanat kodi bilan kirilsa — admin rejimi yoqiladi */
    adminMode = dekanat;
    try{
      if(dekanat) localStorage.setItem('ms.admin', '1');
      else        localStorage.removeItem('ms.admin');
    }catch(e){}

    hideAuth();
    /* talaba ma'lumotlari bilan butun ekranni qayta chizamiz */
    applyLang();
    haptic(16);
    toast(dekanat ? t('adminOn') : t('welcome'));
    if(dekanat) setTimeout(openAdmin, 400);
  })();
});

/* --- kirish sahifasini ko'rsatish / yashirish --- */
function hideAuth(){
  auth.classList.add('is-gone');
  document.body.style.overflow = '';
}
function showAuth(){
  auth.classList.remove('is-gone');
  codeInps.forEach(function(x){ x.value = ''; });
  codeBox.classList.remove('is-bad');
  $('err2').textContent = '';
  document.body.style.overflow = 'hidden';
  showDemoCode();          /* talabalar ro'yxatini qayta chizamiz */
  setTimeout(function(){ codeInps[0].focus(); }, 300);
}

/* kodni ekranda ko'rsatish (namuna rejimi) */
/* kirish ekranidagi namuna kodlari.
   Server rejimida GET /api/demo dan, statikda TALABALAR dan keladi. */
let DEMO_ROYXAT = [];

function showDemoCode(){
  const box = $('demoBox');
  if(!box) return;

  const royxat = DEMO_ROYXAT.length ? DEMO_ROYXAT : TALABALAR;
  if(!royxat.length){ box.innerHTML = ''; return; }

  /* namuna rejimi: har bir talabaning kodi ko'rsatiladi */
  box.innerHTML = '<div class="demo__t">'+esc(t('demoCodes'))+'</div>' +
    '<div class="demo__list">' + royxat.map(function(x){
      const ism = x.name.split(/\s+/).slice(0, 2).join(' ');
      return '<button class="demo__i" data-demo="'+esc(x.kod)+'">'+
        '<span class="demo__k">'+esc(x.kod)+'</span>'+
        '<span class="demo__n">'+esc(ism)+'</span>'+
        '<span class="demo__g">'+esc(x.group)+'</span>'+
      '</button>';
    }).join('') + '</div>';

  box.querySelectorAll('[data-demo]').forEach(function(b){
    b.addEventListener('click', function(){
      const kod = b.dataset.demo;
      codeInps.forEach(function(x, i){ x.value = kod[i] || ''; });
      haptic(8);
      $('doLogin').click();
    });
  });
}

/* sessiya shuncha kundan keyin eskiradi — qayta kirish so'raladi */
const SESSIYA_KUN = 30;

/* sahifa ochilganda: kirganmi? */
function checkAuth(){
  let kirgan = false;
  /* saqlangan sessiyani tiklash: qaysi talaba kirgan edi */
  try{
    const saqlangan = JSON.parse(localStorage.getItem('ms.auth') || 'null');
    if(saqlangan){
      /* muddati o'tganmi? (eski yozuvlarda 'at' bo'lmasligi mumkin) */
      const yosh = Date.now() - (saqlangan.at || 0);
      const eskirgan = yosh > SESSIYA_KUN * 24 * 60 * 60 * 1000;

      if(eskirgan){
        localStorage.removeItem('ms.auth');
      }else{
        const talaba = talabaTop(saqlangan.kod) || TALABALAR[0];
        userYukla(talaba);
        kirgan = true;
      }
    }
  }catch(e){}

  if(kirgan){
    /* talaba ma'lumotlari o'zgargani uchun ekranni qayta chizamiz */
    applyLang();
    hideAuth();
    return;
  }
  document.body.style.overflow = 'hidden';
  showDemoCode();
  setTimeout(function(){ codeInps[0].focus(); }, 300);
}

/* =========================================================
   ILOVANI ISHGA TUSHIRISH
   Avval ma'lumotlar API'dan yuklanadi, keyin ekran chiziladi.
   ========================================================= */
/* API'dan kelgan ma'lumotni o'z joyiga qo'yadi.
   Kelmagan qismlar o'zgarmaydi — server rejimida ma'lumot
   ikki bosqichda keladi (kirishdan oldin / keyin). */
function malumotlarniQoy(d){
  if(d.demo)        DEMO_ROYXAT    = d.demo;
  if(d.talabalar)   TALABALAR      = d.talabalar;
  if(d.semestrlar)  SEMESTERS      = d.semestrlar;
  if(d.darslar)     SCHEDULE       = d.darslar;
  if(d.imtihonlar)  EXAMS          = d.imtihonlar;
  if(d.davomat)     ATTENDANCE     = d.davomat;
  if(d.baholar)     GRADES         = d.baholar;
  if(d.yangiliklar) NEWS           = d.yangiliklar;
  if(d.kitoblar)    LIBRARY        = d.kitoblar;
  if(d.ishlar)      JOBS           = d.ishlar;
  if(d.yillar)      YEARS          = d.yillar;
  if(d.akademik)    AKADEMIK       = d.akademik;
  if(d.arizalar)    ARIZALAR       = d.arizalar;
  if(d.shartnoma)   SHARTNOMA_QARZ = d.shartnoma;
  if(d.fotolar)     PHOTOS         = d.fotolar;
  if(d.yotoqxona)   DORM           = d.yotoqxona;

  /* CAREER.ishlar JOBS ga tayanadi */
  if(CAREER.ishlar){
    CAREER.ishlar.items = JOBS;
    if(typeof DATA !== 'undefined') DATA.ishlar = CAREER.ishlar;
  }

  /* endi ma'lumot bor — id -> element indeksini qayta quramiz,
     shunda qatorlar bosilganda batafsil oyna ochiladi */
  indexItems();

  /* ma'lumotga tayanadigan ro'yxatlarni qayta chizamiz */
  const lib = document.getElementById('libList');
  if(lib && LIBRARY.length) lib.innerHTML = LIBRARY.map(rowHTML).join('');
  fillCareerCounts();
}

async function ilovaniBoshla(){
  try{
    const d = await apiHammasi();
    malumotlarniQoy(d);

    yuklanmoqdaYop();
    checkAuth();
  }catch(e){
    /* Sessiya eskirgan bo'lsa — xato ekranida qamab qo'ymaymiz.
       Token allaqachon tozalangan, saqlangan sessiyani ham o'chirib
       kirish ekranini ko'rsatamiz: foydalanuvchi qayta kira oladi. */
    if(e && e.qaytaKirish){
      try{ localStorage.removeItem('ms.auth'); }catch(x){}
      yuklanmoqdaYop();
      checkAuth();
      toast(t('sessionEnded'));
      return;
    }
    yuklashXatosi(e && e.message ? e.message : 'Noma\'lum xato');
  }
}

/* yuklanish paytida ko'rinadigan holat */
function yuklanmoqdaYop(){
  const el = document.getElementById('boot');
  if(el) el.remove();
}

function yuklashXatosi(xabar){
  const el = document.getElementById('boot');
  if(!el) return;
  el.innerHTML =
    '<div class="boot__box">'+
      '<div class="boot__t">Ma\'lumotlar yuklanmadi</div>'+
      '<div class="boot__s">'+esc(xabar)+'</div>'+
      '<button class="btn btn--primary" onclick="location.reload()">Qayta urinish</button>'+
    '</div>';
}

ilovaniBoshla();

/* =========================================================
   19) OXIRGI OCHILGAN TABNI TIKLASH
   (hamma narsa e'lon qilingandan keyin turishi shart)
   ========================================================= */
try{
  const saved = localStorage.getItem('ms.tab');
  if(saved && saved !== 'home'){
    const t = document.querySelector('.tab[data-tab="'+saved+'"]');
    if(t) t.click();
  }
}catch(e){}
