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

    /* modal / tugmalar */
    save:"Saqlash", cancel:"Bekor qilish", change:"O'zgartirish",
    yesExit:"Ha, chiqish", markRead:"O'qildi deb belgilash",
    notifications:"Bildirishnomalar", unread:"ta o'qilmagan xabar",
    noNew:"Yangi xabar yo'q", allRead:"Barcha bildirishnomalar o'qilgan.",
    langTitle:"Til", langSub:"Ilova tilini tanlang",

    /* formalar */
    editSub:"O'zgartirilgan ma'lumotlar shu qurilmada saqlanadi.",
    currentPass:"Joriy parol", newPass:"Yangi parol", repeatPass:"Yangi parolni takrorlang",
    passSub:"Yangi parol kamida 6 ta belgidan iborat bo'lsin.",
    min6:"Kamida 6 ta belgi", passMismatch:"Parollar mos kelmadi",
    required:"To'ldirilishi shart", groupHint:"Guruhni dekanat o'zgartiradi",
    exitTitle:"Tizimdan chiqish", exitSub:"Rostdan ham hisobingizdan chiqmoqchimisiz?",

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

    /* dars jadvali */
    semester:"semestr", prevWeek:"Oldingi hafta", nextWeek:"Keyingi hafta",
    thisWeek:"Joriy hafta", todayWord:"bugun",
    noLessons:"Tanlangan hafta uchun dars jadvali kiritilmagan.",
    noToday:"Bugun dars yo'q",

    /* kirish */
    authSub1:"Davom etish uchun telefon raqamingizni kiriting",
    phoneLabel:"Telefon raqam", sendCode:"Kod yuborish", sending:"Yuborilmoqda...",
    codeTitle:"Kodni kiriting", codeSent:"SMS kod yuborildi",
    enter:"Kirish", checking:"Tekshirilmoqda...",
    resend:"Kodni qayta yuborish", resendIn:"Qayta yuborish",
    changeNumber:"Raqamni o'zgartirish",
    badPhone:"Raqamni to'liq kiriting", badCode:"4 xonali kodni kiriting",
    wrongCode:"Kod noto'g'ri", welcome:"Xush kelibsiz!", codeResent:"Kod qayta yuborildi",
    authFoot:"Kirish orqali siz ommaviy oferta shartlariga rozilik bildirasiz",
    demoNote:"Namuna rejimi: istalgan raqam qabul qilinadi",
    demoYourCode:"Namuna rejimi — kodingiz:", demoFill:"Qo'yish",

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

    save:"Сохранить", cancel:"Отмена", change:"Изменить",
    yesExit:"Да, выйти", markRead:"Отметить как прочитанное",
    notifications:"Уведомления", unread:"непрочитанных",
    noNew:"Новых сообщений нет", allRead:"Все уведомления прочитаны.",
    langTitle:"Язык", langSub:"Выберите язык приложения",

    editSub:"Изменённые данные сохраняются на этом устройстве.",
    currentPass:"Текущий пароль", newPass:"Новый пароль", repeatPass:"Повторите пароль",
    passSub:"Новый пароль должен содержать минимум 6 символов.",
    min6:"Минимум 6 символов", passMismatch:"Пароли не совпадают",
    required:"Обязательное поле", groupHint:"Группу меняет деканат",
    exitTitle:"Выход из системы", exitSub:"Вы действительно хотите выйти?",

    saved:"Данные сохранены", checkData:"Проверьте данные",
    passChanged:"Пароль изменён", checkPass:"Проверьте пароли",
    loggedOut:"Вы вышли из системы", allMarked:"Все сообщения прочитаны",
    updated:"Данные обновлены",

    fApps:"Заявления", fRetake:"Повторное обучение", fFinal:"Итоговый экзамен",
    subjects2:"Предметы", credits:"Кредит",
    dlApp:"Скачать заявление", dlContract:"Скачать договор", dlReceipt:"Квитанция",
    dlSoon:"Скачивание скоро заработает",
    noApps:"По выбранному разделу заявлений нет.",

    semester:"семестр", prevWeek:"Предыдущая неделя", nextWeek:"Следующая неделя",
    thisWeek:"Текущая неделя", todayWord:"сегодня",
    noLessons:"На выбранную неделю расписание не загружено.",
    noToday:"Сегодня занятий нет",

    authSub1:"Введите номер телефона, чтобы продолжить",
    phoneLabel:"Номер телефона", sendCode:"Отправить код", sending:"Отправка...",
    codeTitle:"Введите код", codeSent:"Код отправлен по SMS",
    enter:"Войти", checking:"Проверка...",
    resend:"Отправить код снова", resendIn:"Повтор через",
    changeNumber:"Изменить номер",
    badPhone:"Введите номер полностью", badCode:"Введите 4-значный код",
    wrongCode:"Неверный код", welcome:"Добро пожаловать!", codeResent:"Код отправлен снова",
    authFoot:"Входя, вы соглашаетесь с условиями публичной оферты",
    demoNote:"Демо-режим: подойдёт любой номер",
    demoYourCode:"Демо-режим — ваш код:", demoFill:"Вставить",

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

    save:"Save", cancel:"Cancel", change:"Change",
    yesExit:"Yes, log out", markRead:"Mark as read",
    notifications:"Notifications", unread:"unread",
    noNew:"No new messages", allRead:"All notifications have been read.",
    langTitle:"Language", langSub:"Choose the app language",

    editSub:"Changes are saved on this device.",
    currentPass:"Current password", newPass:"New password", repeatPass:"Repeat new password",
    passSub:"The new password must be at least 6 characters.",
    min6:"At least 6 characters", passMismatch:"Passwords do not match",
    required:"This field is required", groupHint:"The group is set by the dean's office",
    exitTitle:"Log out", exitSub:"Are you sure you want to log out?",

    saved:"Details saved", checkData:"Please check the details",
    passChanged:"Password changed", checkPass:"Please check the passwords",
    loggedOut:"You have been logged out", allMarked:"All messages marked as read",
    updated:"Data updated",

    fApps:"Applications", fRetake:"Repeat course", fFinal:"Final exam",
    subjects2:"Subjects", credits:"Credits",
    dlApp:"Download application", dlContract:"Download contract", dlReceipt:"Receipt",
    dlSoon:"Downloading will be available soon",
    noApps:"No applications found in this section.",

    semester:"semester", prevWeek:"Previous week", nextWeek:"Next week",
    thisWeek:"Current week", todayWord:"today",
    noLessons:"No schedule has been published for the selected week.",
    noToday:"No classes today",

    authSub1:"Enter your phone number to continue",
    phoneLabel:"Phone number", sendCode:"Send code", sending:"Sending...",
    codeTitle:"Enter the code", codeSent:"A code was sent by SMS",
    enter:"Log in", checking:"Checking...",
    resend:"Send the code again", resendIn:"Resend in",
    changeNumber:"Change number",
    badPhone:"Enter the full number", badCode:"Enter the 4-digit code",
    wrongCode:"Wrong code", welcome:"Welcome!", codeResent:"Code sent again",
    authFoot:"By logging in you accept the terms of the public offer",
    demoNote:"Demo mode: any number is accepted",
    demoYourCode:"Demo mode — your code:", demoFill:"Fill in",

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

/* t('kalit') — joriy tildagi matnni qaytaradi */
function t(key){
  const L = I18N[LANG];
  return (L && L[key] !== undefined) ? L[key] : (I18N.uz[key] !== undefined ? I18N.uz[key] : key);
}

/* =========================================================
   1) FOYDALANUVCHI — keyin API'dan keladi, faqat shu joy o'zgaradi
   ========================================================= */
const USER = {
  name:"Talaba Ismi Sharifi",
  group:"ATTS-06-24",
  faculty:"Axborot tizimlari va texnologiyalari",
  form:"Sirtqi",
  course:"2-kurs",
  studentId:"ATTS-06-24",
  status:"O'qimoqda",
  phone:"",
  email:""
};

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
  $('profStatus').textContent = USER.status;
  $('profAva').textContent    = initials(USER.name);

  $('drawerName').textContent  = USER.name;
  $('drawerGroup').textContent = USER.group;
  $('drawerAva').textContent   = initials(USER.name);

  const rows = [
    [t('faculty'),   USER.faculty],
    [t('eduForm'),   USER.form],
    [t('course'),    USER.course],
    [t('studentId'), USER.studentId],
    [t('status'),    USER.status]
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
   Backend ulanganda bu massiv serverdan keladi:
     {sem:4, date:"2026-04-06", t:"Fan nomi", from:"08:30", to:"09:50",
      room:"214-xona", type:"Amaliyot", teacher:"A. Karimov"}
   Hozircha bo'sh — "Ma'lumotlar topilmadi" ko'rsatiladi. */
const SCHEDULE = [];

/* joriy semestr va ko'rilayotgan hafta */
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
let curSem = 4;
let weekStart = null;   /* dushanba, Date */

const ATTENDANCE = [
  {t:"Veb-dasturlash",      v:96},
  {t:"Ma'lumotlar bazasi",  v:88},
  {t:"Operatsion tizimlar", v:74},
  {t:"Ingliz tili",         v:100}
];

const NEWS = [
  {who:"Dekanat", when:"2 soat oldin", t:"Qishki sessiya jadvali e'lon qilindi",
   x:"Imtihonlar 10-yanvardan boshlanadi. Batafsil jadval kabinetdan yuklab olinadi.",
   ic:"cal", tone:"", isNew:true},
  {who:"Kutubxona", when:"Kecha", t:"Yangi elektron kitoblar qo'shildi",
   x:"Dasturlash va ma'lumotlar bazasi bo'yicha 12 ta yangi nashr.",
   ic:"book", tone:"ok", isNew:true},
  {who:"O'quv bo'limi", when:"3 kun oldin", t:"Amaliyot hisobotini topshirish muddati",
   x:"Hisobotlar 20-sentabrgacha qabul qilinadi.",
   ic:"warn", tone:"warn", isNew:false}
];

const DATA = {
  davomat:{title:"Davomat", bars: ATTENDANCE},
  ariza:{title:"Arizalar", empty:{t:"Ariza yo'q", m:"Hozircha yuborilgan arizangiz yo'q. Yangi ariza yuborish uchun dekanatga murojaat qiling."}},
  chaqiruv:{title:"Chaqiruv xatlari", items:[
    {t:"Qishki sessiya", m:"Yuborilgan: 05.01.2026 · PDF", b:"Tayyor", ok:true}
  ]},
  yotoqxona:{title:"Yotoqxona", empty:{t:"Joy band qilinmagan", m:"Sirtqi ta'lim shakli uchun yotoqxona ajratilmaydi."}}
};

const LIBRARY = [
  {id:"lib1", t:"Ma'lumotlar bazasi asoslari",   m:"A. Karimov · 2024 · PDF, 312 bet",  b:"Mavjud", ok:true,
   author:"A. Karimov", year:"2024", fmt:"PDF", pages:312, lang:"O'zbek",
   x:"Relatsion ma'lumotlar bazalari nazariyasi, SQL tili va normallashtirish qoidalari. Amaliy misollar bilan.",
   act:"download"},
  {id:"lib2", t:"Veb-dasturlash: HTML, CSS, JS", m:"N. Yusupova · 2025 · PDF, 248 bet", b:"Mavjud", ok:true,
   author:"N. Yusupova", year:"2025", fmt:"PDF", pages:248, lang:"O'zbek",
   x:"Zamonaviy veb-sahifa yaratish: semantik HTML, moslashuvchan CSS va JavaScript asoslari.",
   act:"download"},
  {id:"lib3", t:"Python dasturlash tili",        m:"M. To'xtayev · 2023 · Bosma nashr", b:"Band",   no:true,
   author:"M. To'xtayev", year:"2023", fmt:"Bosma nashr", pages:280, lang:"O'zbek",
   x:"Python sintaksisi, ma'lumot tuzilmalari va standart kutubxona. Boshlang'ich daraja uchun.",
   act:"busy", back:"18.09.2026"},
  {id:"lib4", t:"Operatsion tizimlar",           m:"S. Rahmonov · 2022 · PDF, 190 bet", b:"Mavjud", ok:true,
   author:"S. Rahmonov", year:"2022", fmt:"PDF", pages:190, lang:"O'zbek",
   x:"Jarayonlar, xotira boshqaruvi, fayl tizimlari va ko'p vazifali ishlash tamoyillari.",
   act:"download"}
];

const JOBS = [
  {id:"job1", t:"Frontend dasturchi (intern)", m:"Samarqand · To'liq bo'lmagan ish kuni · HTML, CSS, JS", b:"Ochiq", ok:true,
   company:"TimePay HR", place:"Samarqand", mode:"To'liq bo'lmagan ish kuni", salary:"3 000 000 so'm dan",
   x:"Mavjud veb-ilovalar interfeysini ishlab chiqish va qo'llab-quvvatlash. Tajribali dasturchi rahbarligida.",
   skills:["HTML", "CSS", "JavaScript", "Git"], act:"apply"},
  {id:"job2", t:"Backend dasturchi (junior)",  m:"Masofaviy · Python, Django, PostgreSQL", b:"Ochiq", ok:true,
   company:"IT Park Samarqand", place:"Masofaviy", mode:"To'liq ish kuni", salary:"5 000 000 so'm dan",
   x:"REST API yaratish, ma'lumotlar bazasi bilan ishlash va mavjud tizimlarni integratsiya qilish.",
   skills:["Python", "Django", "PostgreSQL", "Docker"], act:"apply"},
  {id:"job3", t:"Texnik yordam mutaxassisi",   m:"Samarqand · To'liq ish kuni", b:"Yopilgan", mute:true,
   company:"Universitet IT bo'limi", place:"Samarqand", mode:"To'liq ish kuni", salary:"2 500 000 so'm",
   x:"Kompyuter texnikasi va tarmoq uskunalariga xizmat ko'rsatish, foydalanuvchilarga yordam.",
   skills:["Windows", "Tarmoq", "Texnik xizmat"], act:"closed"}
];

/* ---------- QARZDORLIK ---------- */
const YEARS = ["2025-2026", "2024-2025"];

/* akademik qarzdorlik — fandan o'ta olmaganlik */
const AKADEMIK = [
  {fan:"Operatsion tizimlar", year:"2025-2026", sem:"1-semestr",
   ball:48, kerak:60, tur:"Yakuniy nazorat", sabab:"Ball yetarli emas"},
  {fan:"Ingliz tili",         year:"2024-2025", sem:"2-semestr",
   ball:0,  kerak:60, tur:"Yakuniy nazorat", sabab:"Imtihonga kelmagan"}
];

/* Akademik qarzdorlik arizalari.
   Backend ulanganda serverdan keladi. Namuna uchun bittasi qoldirilgan —
   bo'sh ro'yxat kerak bo'lsa, massivni [] qilib qo'ying. */
const ARIZALAR = [
  {
    id:"ar1",
    turi:"yakuniy",                 /* ariza | qayta | yakuniy */
    t:"Yakuniy nazorat qayta topshirish",
    fanlar:2, kredit:10,
    holat:"ok",                     /* ok | wait | no */
    holatT:"Shartnoma yaratildi",
    vaqt:"14:17 18.07.2026",
    x:"Ariza bo‘yicha shartnoma yaratildi. Shartnomani yuklab oling va to‘lovni amalga oshiring.",
    files:["ariza", "shartnoma"],
    fanlarRoyxat:[
      {t:"Operatsion tizimlar", m:"1-semestr · 5 kredit · 48/60 ball"},
      {t:"Ingliz tili",         m:"2-semestr · 5 kredit · imtihonga kelmagan"}
    ]
  }
];

/* shartnoma bo'yicha qarzdorlik — pul */
const SHARTNOMA_QARZ = [
  {year:"2025-2026", tur:"Kontrakt to'lovi", summa:0, muddat:"01.07.2026"}
];

function money(n){ return n.toLocaleString('ru-RU').replace(/ /g, ' '); }

/* ---------- KARYERA MARKAZI ---------- */
const CAREER = {
  rezyume:{title:"Rezyume", empty:{
    t:"Rezyume yaratilmagan",
    m:"Rezyume yaratsangiz, ish beruvchilar sizni topa oladi. Kabinetdagi ma'lumotlar avtomatik qo'shiladi."
  }},

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
  ]},

  foto:{title:"Fotogalereya", empty:{
    t:"Surat yo'q",
    m:"Tadbirlar suratlari shu yerda ko'rinadi. Hozircha yuklangan surat yo'q."
  }}
};

/* =========================================================
   5) HTML QURUVCHILAR
   ========================================================= */
function badgeHTML(r){
  if(!r.b) return '';
  const cls = r.no ? 'badge--no' : r.mute ? 'badge--mute' : r.ok ? 'badge--ok' : 'badge--warn';
  return '<span class="badge '+cls+'">'+esc(r.b)+'</span>';
}
function rowHTML(r){
  const badge = badgeHTML(r);
  const right = r.s ? '<div class="row__sum">'+esc(r.s)+'</div>' : badge;
  const extra = (r.s && r.b) ? '<div style="margin-top:9px">'+badge+'</div>' : '';
  const ichi  = '<div class="row__top"><div class="row__title">'+esc(r.t)+'</div>'+right+
                '</div><div class="row__meta">'+esc(r.m)+'</div>'+extra;

  /* id bo'lsa — bosiladigan tugma */
  if(r.id) return '<button class="row" data-item="'+esc(r.id)+'">'+ichi+'</button>';
  return '<div class="row">'+ichi+'</div>';
}
function barHTML(b){
  const cls = b.v < 60 ? 'is-bad' : b.v < 75 ? 'is-low' : '';
  return '<div class="row"><div class="row__top"><div class="row__title">'+esc(b.t)+
         '</div><div class="row__sum">'+b.v+'%</div></div>'+
         '<div class="bar"><i class="'+cls+'" style="width:'+b.v+'%"></i></div></div>';
}
function emptyHTML(e){
  return '<div class="empty"><div class="empty__ic">'+
    '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>'+
    '</div><b>'+esc(e.t)+'</b><p>'+esc(e.m)+'</p></div>';
}

$('libList').innerHTML = LIBRARY.map(rowHTML).join('');

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
fillCareerCounts();

/* Shaxsiy ma'lumotlar — yoyiladigan blok */
function fillCareerInfo(){
  $('accInfo').innerHTML = [
    [t('fullName'), USER.name],
    [t('group'),    USER.group],
    [t('faculty'),  USER.faculty],
    [t('course'),   USER.course],
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
  {key:"davomat",  i18n:"attendance",   tone:"blue",  ic:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'},
  {key:"_debt",    i18n:"debts",        tone:"warn",  ic:'<path d="M12 2 2 20h20z"/><path d="M12 9v5M12 17h.01"/>', tag:function(){ return AKADEMIK.length || ''; }, tagColor:"var(--warn)"},
  {key:"_soon",    i18n:"grades",       tone:"soon",  ic:'<path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9z"/>', tag:function(){ return t('soon'); }},
  {key:"ariza",    i18n:"applications", tone:"",      ic:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>'},
  {key:"chaqiruv", i18n:"callLetter",   tone:"blue",      ic:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'},
  {key:"yotoqxona",i18n:"dorm",         tone:"warn",  ic:'<path d="M2 10h20v7H2zM2 17v3M22 17v3M4 10V7a2 2 0 0 1 2-2h5v5"/>'}
];

function buildStrip(){
  $('strip').innerHTML = STRIP.map(function(p){
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

  /* tugmalarni qayta bog'lash */
  $('strip').querySelectorAll('[data-key]').forEach(function(b){
    b.addEventListener('click', function(){
      if(b.dataset.key === 'jadval') openSchedule();
      else openDetail(b.dataset.key);
    });
  });
  const pd = $('pillDebt');
  if(pd) pd.addEventListener('click', openDebt);
}

/* =========================================================
   6) BUGUNGI DARSLAR
   ========================================================= */
function buildToday(){
  const now  = new Date();
  const mins = now.getHours()*60 + now.getMinutes();

  let nextFound = false;
  $('todayList').innerHTML = SCHEDULE.map(function(l){
    const s = toMin(l.from), e = toMin(l.to);
    let cls = '', tag = '';

    if(mins >= s && mins <= e){
      cls = 'lesson--now';
      tag = '<span class="live"><i></i>'+esc(t('now'))+'</span>';
      nextFound = true;
    } else if(mins > e){
      cls = 'lesson--done';
    } else if(!nextFound){
      cls = 'lesson--next';
      nextFound = true;
    }

    return '<button class="lesson '+cls+'" data-key="jadval">'+
      '<span class="lesson__rail"></span>'+
      '<span class="lesson__in">'+
        '<span class="lesson__time">'+
          '<span class="lesson__h">'+esc(l.from)+'</span>'+
          '<span class="lesson__to">'+esc(l.to)+'</span>'+
        '</span>'+
        '<span class="lesson__body">'+
          '<span class="lesson__t">'+esc(l.t)+tag+'</span>'+
          '<span class="lesson__s">'+esc(l.room+' · '+l.type+' · '+l.teacher)+'</span>'+
        '</span>'+
      '</span>'+
    '</button>';
  }).join('');

  const qolgan = SCHEDULE.filter(function(l){ return mins <= toMin(l.to); }).length;
  $('todayTitle').textContent = qolgan ? t('today') + ' · ' + qolgan + ' ' + t('todayLeft') : t('today');

  /* dars kiritilmagan bo'lsa — bo'sh holat */
  if(!SCHEDULE.length){
    $('todayList').innerHTML =
      '<div class="row" style="text-align:center;padding:26px 16px">'+
        '<div style="font-size:14px;font-weight:650;color:var(--ink-3)">'+esc(t('noToday'))+'</div>'+
        '<div style="margin-top:6px;font-size:12.5px;color:var(--ink-4)">'+esc(t('noLessons'))+'</div>'+
      '</div>';
    $('todayTitle').textContent = t('today');
  }
}
buildToday();

/* =========================================================
   7) DAVOMAT KO'RSATKICHI
   ========================================================= */
function buildAttStat(){
  const avg = Math.round(ATTENDANCE.reduce(function(a,b){ return a + b.v; }, 0) / ATTENDANCE.length);
  $('statAtt').innerHTML = avg + '<small>%</small>';

  const bar = $('statAttBar');
  bar.className = avg < 60 ? 'is-bad' : avg < 75 ? 'is-low' : '';
  setTimeout(function(){ bar.style.width = avg + '%'; }, 260);

  const past = ATTENDANCE.filter(function(x){ return x.v < 75; }).length;
  const note = $('statAttNote');
  note.textContent = past ? past + ' ' + t('lowSubj') : t('allGood');
  if(past) note.style.color = 'var(--warn)';
}
buildAttStat();

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
    return '<article class="post'+(n.tone ? ' post--'+n.tone : '')+'">'+
      '<div class="post__top">'+
        '<span class="post__ic"><svg viewBox="0 0 24 24">'+ICONS[n.ic]+'</svg></span>'+
        '<span class="post__from">'+
          '<span class="post__who">'+esc(n.who)+'</span>'+
          '<div class="post__when">'+esc(n.when)+'</div>'+
        '</span>'+
        (n.isNew ? '<span class="post__new">'+esc(t('newTag'))+'</span>' : '')+
      '</div>'+
      '<div class="post__t">'+esc(n.t)+'</div>'+
      '<p class="post__x">'+esc(n.x)+'</p>'+
    '</article>';
  }).join('');
}
buildNews();

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

function openDetail(key){
  const d = DATA[key];
  if(!d) return;
  haptic();
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
}

window.addEventListener('popstate', function(){
  if(detailOpen) closeDetail();
});

document.querySelectorAll('[data-key]').forEach(function(btn){
  btn.addEventListener('click', function(){
    if(btn.dataset.key === 'jadval') openSchedule();
    else openDetail(btn.dataset.key);
  });
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
      '<circle cx="42" cy="42" r="31" stroke="#B8D4D0" stroke-width="7"/>'+
      '<circle cx="32" cy="37" r="3.4" fill="#B8D4D0"/>'+
      '<circle cx="52" cy="37" r="3.4" fill="#B8D4D0"/>'+
      '<path d="M32 54c5-5 15-5 20 0" stroke="#B8D4D0" stroke-width="5" stroke-linecap="round"/>'+
      '<path d="M65 65 88 88" stroke="#B8D4D0" stroke-width="7" stroke-linecap="round"/>'+
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

    const rows = ARIZALAR.filter(function(a){ return a.turi === debtFilter; });

    if(!rows.length){
      h += noResultHTML(t('notFound'), t('noApps'));
      return h;
    }

    h += '<div class="list">' + rows.map(appCardHTML).join('') + '</div>';
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

    '<div class="appc__btns">'+
      a.files.map(function(f, i){
        return '<button class="appc__btn'+(i ? '' : ' appc__btn--ghost')+'" data-dl="'+esc(f)+'">'+
               esc(F[f] || f)+'</button>';
      }).join('')+
    '</div>'+
  '</article>';
}

/* qarzdorlik sahifasini ochish */
function openDebt(){
  haptic();
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



/* qarzdorlik sahifasini yangilash */
$('refBtn').addEventListener('click', function(){
  const b = this;
  if(b.classList.contains('is-spin')) return;
  b.classList.add('is-spin');
  haptic(10);
  setTimeout(function(){
    renderDebt();
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
        '<div class="row__meta">'+esc(n.who+' · '+n.when)+'</div></div>';
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
    fieldHTML('fFac',   t('faculty'),  USER.faculty, {readonly:true}) +
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

  /* kirish sahifasidagi qayta-yuborish tugmasi */
  const rs = $('resend');
  if(rs && !rs.disabled) rs.textContent = t('resend');

  /* qayta chiziladigan qismlar */
  fillUserUI();
  buildStrip();
  buildToday();
  buildAttStat();
  buildNews();
  fillCareerCounts();

  /* ochiq qarzdorlik sahifasi bo'lsa — yangilash */
  if(detailOpen && detailTitle.textContent === I18N.uz.debtTitle) renderDebt();
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

/* barcha ro'yxatlarni bitta indeksga yig'amiz: id -> element */
const ITEMS = {};
(function indexItems(){
  function qo(list){
    if(!list) return;
    list.forEach(function(x){ if(x && x.id) ITEMS[x.id] = x; });
  }
  qo(LIBRARY);
  qo(JOBS);
  Object.keys(CAREER).forEach(function(k){ qo(CAREER[k].items); });
})();

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

   DIQQAT: bu NAMUNA. Brauzerdagi tekshiruv haqiqiy himoya emas —
   kodni F12 orqali o'qish mumkin. Backend tayyor bo'lganda:
     1) telefon serverga yuboriladi  -> server SMS jo'natadi
     2) kod serverga yuboriladi      -> server token qaytaradi
     3) token saqlanadi va har so'rovda Authorization sarlavhasida ketadi
   Quyidagi sendSMS() va checkCode() funksiyalarini fetch bilan almashtirasiz.
   ========================================================= */
const auth  = $('auth');
const step1 = $('step1'), step2 = $('step2');
const phoneInp = $('phoneInp'), phoneBox = $('phoneBox');
const codeBox  = $('codeBox');
const codeInps = Array.prototype.slice.call(codeBox.querySelectorAll('input'));

let authPhone = '';
let resendTimer = null, resendLeft = 0;

/* --- telefon formati: 90 123 45 67 --- */
function fmtPhone(raw){
  const d = raw.replace(/\D/g, '').slice(0, 9);
  let out = d.slice(0, 2);
  if(d.length > 2) out += ' ' + d.slice(2, 5);
  if(d.length > 5) out += ' ' + d.slice(5, 7);
  if(d.length > 7) out += ' ' + d.slice(7, 9);
  return out;
}
function phoneDigits(){ return phoneInp.value.replace(/\D/g, ''); }

phoneInp.addEventListener('input', function(){
  const pos = phoneInp.selectionStart;
  const oldLen = phoneInp.value.length;
  phoneInp.value = fmtPhone(phoneInp.value);
  phoneBox.classList.remove('is-bad');
  $('err1').textContent = '';
  /* kursorni oxirida ushlab turamiz (oddiy holat) */
  if(pos === oldLen) phoneInp.setSelectionRange(phoneInp.value.length, phoneInp.value.length);
});
phoneInp.addEventListener('focus', function(){ phoneBox.classList.add('is-on'); });
phoneInp.addEventListener('blur',  function(){ phoneBox.classList.remove('is-on'); });
phoneInp.addEventListener('keydown', function(e){
  if(e.key === 'Enter') $('sendCode').click();
});

/* --- SMS yuborish (namuna) --- */
let demoCode = '';

function sendSMS(phone){
  /* BACKEND: return fetch('/api/auth/send', {method:'POST', body:...})
     Haqiqiy SMS server tomonidan yuboriladi (Eskiz.uz, Play Mobile va h.k.).
     Namunada kodni o'zimiz yaratamiz va ekranda ko'rsatamiz. */
  demoCode = String(Math.floor(1000 + Math.random() * 9000));
  return new Promise(function(res){ setTimeout(res, 700); });
}

/* namunaviy kodni ekranda ko'rsatish */
function showDemoCode(){
  const box = $('demoBox');
  if(!box) return;
  box.innerHTML = esc(t('demoYourCode')) + ' <b id="demoNum">' + esc(demoCode) + '</b>' +
                  ' <button class="linkbtn" id="fillCode" style="padding:2px 6px">' +
                  esc(t('demoFill')) + '</button>';

  const f = $('fillCode');
  if(f) f.addEventListener('click', function(){
    codeInps.forEach(function(x, i){ x.value = demoCode[i] || ''; });
    haptic(8);
    $('doLogin').click();
  });
}

function startResend(){
  resendLeft = 45;
  const btn = $('resend');
  btn.disabled = true;
  clearInterval(resendTimer);

  function tick(){
    btn.textContent = t('resendIn') + ' 0:' + (resendLeft < 10 ? '0' : '') + resendLeft;
    if(resendLeft <= 0){
      clearInterval(resendTimer);
      btn.disabled = false;
      btn.textContent = t('resend');
      return;
    }
    resendLeft--;
  }
  tick();
  resendTimer = setInterval(tick, 1000);
}

$('sendCode').addEventListener('click', function(){
  const d = phoneDigits();
  if(d.length !== 9){
    phoneBox.classList.add('is-bad');
    $('err1').textContent = t('badPhone');
    haptic(20);
    return;
  }

  const btn = this;
  btn.classList.add('is-busy');
  btn.textContent = t('sending');
  authPhone = '+998 ' + fmtPhone(d);

  sendSMS(d).then(function(){
    btn.classList.remove('is-busy');
    btn.textContent = t('sendCode');

    $('shownPhone').textContent = authPhone;
    step1.hidden = true;
    step2.hidden = false;
    showDemoCode();
    startResend();
    haptic(12);
    setTimeout(function(){ codeInps[0].focus(); }, 120);
  });
});

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

/* --- kodni tekshirish (namuna) --- */
function checkCode(code){
  /* BACKEND: fetch('/api/auth/verify') -> {token: '...'}
     Namunada yuborilgan kod bilan taqqoslaymiz. */
  return new Promise(function(res){
    setTimeout(function(){ res(code === demoCode); }, 600);
  });
}

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

  checkCode(code).then(function(ok){
    loginBusy = false;
    btn.classList.remove('is-busy');
    btn.textContent = t('enter');

    if(!ok){
      codeBox.classList.add('is-bad');
      $('err2').textContent = t('wrongCode');
      haptic(20);
      return;
    }

    /* BACKEND: bu yerda tokenni saqlaysiz */
    try{
      localStorage.setItem('ms.auth', JSON.stringify({phone:authPhone, at:Date.now()}));
    }catch(e){}

    if(!USER.phone){
      USER.phone = authPhone;
      try{
        const u = JSON.parse(localStorage.getItem('ms.user') || '{}');
        u.phone = authPhone;
        localStorage.setItem('ms.user', JSON.stringify(u));
      }catch(e){}
      fillUserUI();
    }

    clearInterval(resendTimer);
    hideAuth();
    haptic(16);
    toast(t('welcome'));
  });
});

$('resend').addEventListener('click', function(){
  if(this.disabled) return;
  sendSMS(phoneDigits()).then(function(){
    showDemoCode();
    startResend();
    toast(t('codeResent'));
  });
});

$('backPhone').addEventListener('click', function(){
  clearInterval(resendTimer);
  codeInps.forEach(function(x){ x.value = ''; });
  codeBox.classList.remove('is-bad');
  $('err2').textContent = '';
  step2.hidden = true;
  step1.hidden = false;
  setTimeout(function(){ phoneInp.focus(); }, 120);
});

/* --- kirish sahifasini ko'rsatish / yashirish --- */
function hideAuth(){
  auth.classList.add('is-gone');
  document.body.style.overflow = '';
}
function showAuth(){
  auth.classList.remove('is-gone');
  step2.hidden = true;
  step1.hidden = false;
  phoneInp.value = '';
  codeInps.forEach(function(x){ x.value = ''; });
  $('err1').textContent = '';
  $('err2').textContent = '';
  document.body.style.overflow = 'hidden';
}

/* sahifa ochilganda: kirganmi? */
(function checkAuth(){
  let kirgan = false;
  try{ kirgan = !!localStorage.getItem('ms.auth'); }catch(e){}
  if(kirgan) hideAuth();
  else{
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ phoneInp.focus(); }, 300);
  }
})();

/* =========================================================
   27) DARS JADVALI — semestr va hafta tanlash
   ========================================================= */

/* haftaning dushanbasini topish */
function mondayOf(d){
  const x = new Date(d);
  const wd = (x.getDay() + 6) % 7;      /* 0 = dushanba */
  x.setDate(x.getDate() - wd);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(d, n){
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function dmy(d){
  const p = function(n){ return (n < 10 ? '0' : '') + n; };
  return p(d.getDate()) + '.' + p(d.getMonth() + 1) + '.' + d.getFullYear();
}
function iso(d){
  const p = function(n){ return (n < 10 ? '0' : '') + n; };
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}
function sameDay(a, b){ return iso(a) === iso(b); }

/* jadval sahifasi HTML */
function scheduleHTML(){
  const L = I18N[LANG];
  const oxiri = addDays(weekStart, 5);      /* dushanba–shanba */

  /* semestr lentasi */
  let h = '<div class="sem">' + SEMESTERS.map(function(n){
    return '<button class="'+(n === curSem ? 'is-on' : '')+'" data-sem="'+n+'">'+
      (n === curSem ? n + ' - ' + t('semester') : n)+'</button>';
  }).join('') + '</div>';

  /* hafta tanlagich */
  h += '<div class="week">'+
    '<button class="week__nav" id="wPrev" aria-label="'+esc(t('prevWeek'))+'">'+
      '<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>'+
    '<button class="week__now" id="wNow">'+esc(dmy(weekStart) + ' / ' + dmy(oxiri))+'</button>'+
    '<button class="week__nav" id="wNext" aria-label="'+esc(t('nextWeek'))+'">'+
      '<svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></button>'+
  '</div>';

  /* shu haftadagi darslar */
  const hafta = SCHEDULE.filter(function(l){
    if(l.sem !== undefined && l.sem !== curSem) return false;
    const d = new Date(l.date);
    return d >= weekStart && d <= addDays(weekStart, 6);
  });

  if(!hafta.length){
    h += noResultHTML(t('notFound'), t('noLessons'));
    return h;
  }

  /* kunlar bo'yicha guruhlash */
  const bugun = new Date();
  for(let i = 0; i < 6; i++){
    const kun = addDays(weekStart, i);
    const darslar = hafta.filter(function(l){ return sameDay(new Date(l.date), kun); });
    if(!darslar.length) continue;

    const today = sameDay(kun, bugun);
    h += '<div class="dayhead'+(today ? ' dayhead--today' : '')+'">'+
      esc(L.days[kun.getDay()] + ', ' + kun.getDate() + '-' + L.months[kun.getMonth()])+
      (today ? ' \u00b7 ' + esc(t('todayWord')) : '')+
    '</div>';

    h += '<div class="list">' + darslar
      .sort(function(a, b){ return toMin(a.from) - toMin(b.from); })
      .map(function(l){
        return rowHTML({t:l.t, m:l.from+'\u2013'+l.to+' \u00b7 '+l.room+' \u00b7 '+l.teacher,
                        b:l.type, mute:true});
      }).join('') + '</div>';
  }

  return h;
}

/* jadvalni ochish */
function openSchedule(){
  haptic();
  if(!weekStart) weekStart = mondayOf(new Date());
  $('refBtn').hidden = true;
  detailTitle.textContent = t('schedule');
  renderSchedule();

  detail.classList.add('is-open');
  detail.setAttribute('aria-hidden','false');
  detail.scrollTop = 0;

  if(!detailOpen){
    detailOpen = true;
    history.pushState({detail:true}, '');
  }
}

/* ichini qayta chizish */
function renderSchedule(){
  detailBody.innerHTML = scheduleHTML();

  detailBody.querySelectorAll('[data-sem]').forEach(function(b){
    b.addEventListener('click', function(){
      curSem = +b.dataset.sem;
      haptic();
      renderSchedule();
    });
  });

  const prev = $('wPrev'), next = $('wNext'), now = $('wNow');
  if(prev) prev.addEventListener('click', function(){
    weekStart = addDays(weekStart, -7);
    haptic();
    renderSchedule();
  });
  if(next) next.addEventListener('click', function(){
    weekStart = addDays(weekStart, 7);
    haptic();
    renderSchedule();
  });
  if(now) now.addEventListener('click', function(){
    weekStart = mondayOf(new Date());
    haptic();
    renderSchedule();
    toast(t('thisWeek'));
  });
}

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
