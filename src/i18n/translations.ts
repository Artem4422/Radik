export type Lang = "ru" | "en";

export type TranslationKey = keyof typeof translations.ru;

export const translations = {
  ru: {
    nav_about: "О НАС",
    nav_show: "ШОУ",
    nav_gallery: "ГАЛЕРЕЯ",
    nav_video: "ВИДЕО",
    nav_contact: "СВЯЗЬ С НАМИ",
    nav_partners: "ПАРТНЕРАМ",
    contact_title: "СВЯЗЬ С НАМИ",
    text_index:
      "JUGGLER SHOW&ndash; это мастерские манипуляции с небольшими предметами, масштабные иллюзии с таинственным исчезновением зрителей, полеты, невероятные освобождения самих мастеров. Благодаря 30-летнему опыту иллюзионисты способны заинтересовать самую широкую аудиторию. Создается ощущение, что волшебство передвигается вместе с ними&ndash; так оно и есть! Каждое шоу&ndash; это продуманное до мелочей событие, которое запоминается благодаря авторской иллюзионной драматургии и особым подходом к постановке. В арсенале коллектива исключительно собственные авторские номера и только оригинальные узнаваемые трюки. Артисты внимательны к современным тенденциям в области визуального искусства и создают незабываемый перфоманс при взаимодействии с гостями на сцене. Иллюзионисты JUGGLER являются создателями первой в России Школы иллюзионистов с несколькими площадками&nbsp; для школьников и студентов. Артисты имеют опыт выступлений перед президентом РФ, в одном из лучших развлекательных комплексов страны «Казино Сочи» (Красная Поляна); в Цирке на Цветном бульваре и в составе концертных программ звезд мировой эстрады. Мастера иллюзионного ремесла JUGGLER оставляют за собой всю работу над использованием физических законов этого мира в пользу волшебства и предлагают своим зрителям просто наслаждаться претворением его в реальность.",
    text_show:
      '"Волшебный мир JUGGLER" &ndash; уникальное театрализованное шоу, идея которого заключается в зрелищном повествовании историй из удивительной жизни иллюзионистов. Каждый номер &ndash; это отдельная сценическая зарисовка, тематически связанная с самыми разными историями. В процессе шоу иллюзионисты расскажут о путешествиях, поведают трогательную историю из детства, раскроют секрет фокуса и даже погрузятся в мир сновидений! В проекте собраны сольные жанровые номера и сценические номера в исполнении дуэта иллюзионистов: Игорь Воинов и Роман Сергеев. Шоу строится на всех возможных жанровых эффектах иллюзии: исчезновения, появления, перемещения, полеты, превращения, освобождения, ментальные и экстремальные трюки. Большая часть трюков &ndash; интерактивные номера, где зритель на сцене будет главным действующим лицом. Репертуар подобран таким образом, что будет интересен аудитории любого возраста. Главная задача команды JUGGLER &ndash; сделать современное семейное шоу.',
    text_gallery:
      "Мы привыкли считать мир понятным, что делает его довольно скучным. Даже шоу иллюзий кажется обыденным и предсказуемым. Сегодня ваше сердце будет биться особенно быстро. Ведь вы абсолютно ничего не сможете предвидеть. Наш секрет не в магии, гипнозе или специальном оборудовании. Просто наши руки быстрее ваших глаз. Попробуйте за ними успеть. Вы усомнитесь в том, что реально. Ожидайте неожиданного!",
    text_video:
      "Мы всегда верили, что законы реальности надёжны и предсказуемы. А что, если это не так? Приглашаем вас на шоу, где знакомое и привычное становится таинственным и завораживающим. Разум подвергнется испытаниям, а чувства обострятся до предела.<br><br>Команда JUGGLER представит вашему вниманию масштабные иллюзии с полётами над сценой, невероятные освобождения и метаморфозы, чтение мыслей и управление вниманием. Главным действующим лицом станете вы!<br><br>Сделайте шаг навстречу новой реальности. Станьте частью волшебного события &ndash; станьте частью JUGGLER SHOW.",
    btn_buy_ticket: "КУПИТЬ БИЛЕТ",
    btn_download_rider: "РАЙДЕР",
    btn_view_rider: "ПРОСМОТР РАЙДЕРА",
    btn_poster: "АФИША",
    footer_juggler_desc: "Juggler — от устар. англ. ловкий, фокусник.",
    footer_meta: "Meta запрещены на территории РФ.",
    footer_rights: "© 2026 JUGGLER SHOW. ВСЕ ПРАВА ЗАЩИЩЕНЫ.",
    doc_title_index: "JUGGLER SHOW — О НАС",
    doc_title_show: "JUGGLER SHOW — ШОУ",
    doc_title_gallery: "JUGGLER SHOW — ГАЛЕРЕЯ",
    doc_title_video: "JUGGLER SHOW — ВИДЕО",
    doc_title_contact: "JUGGLER SHOW — СВЯЗЬ С НАМИ",
    doc_title_event: "JUGGLER SHOW — СОБЫТИЕ",
    doc_title_partners: "JUGGLER SHOW — ПАРТНЕРАМ",
    doc_title_poster: "JUGGLER SHOW — АФИША",
    doc_title_ticket: "JUGGLER SHOW — БИЛЕТ",
    partner_view: "СМОТРЕТЬ",
  },
  en: {
    nav_about: "ABOUT US",
    nav_show: "THE SHOW",
    nav_gallery: "GALLERY",
    nav_video: "VIDEO",
    nav_contact: "CONTACT US",
    nav_partners: "PARTNERS",
    contact_title: "CONTACT US",
    text_index:
      "JUGGLER SHOW features masterful manipulations with small objects, grand illusions with mysterious disappearances of spectators, levitations, and incredible escapes by the masters themselves. With 30 years of experience, the illusionists can captivate the widest audience. It feels as if the magic moves right along with them&nbsp;&mdash; and indeed it does! Each show is a meticulously planned event, remembered for its original illusionary dramaturgy and unique approach to staging. The group's repertoire consists exclusively of their own original acts and recognizable tricks. The artists pay close attention to modern trends in visual arts, creating an unforgettable performance through interaction with guests on stage. The JUGGLER illusionists are the founders of Russia's first School of Illusionists, with several branches for schoolchildren and students. The artists have experience performing for the President of the Russian Federation, at \"Casino Sochi\" (Krasnaya Polyana), one of the best entertainment complexes in the country, at the Circus on Tsvetnoy Boulevard, and as part of concert programs for world pop stars. The masters of illusionary craft, JUGGLER, take on all the hard work of bending the physical laws of this world in favor of magic, offering their audience the simple joy of watching it become reality.",
    text_show:
      '"The Magic World of JUGGLER" is a unique theatrical show built around the spectacular storytelling of stories from the amazing lives of illusionists. Each act is a separate scenic sketch, thematically connected to a variety of tales. During the show, the illusionists will talk about their travels, share a touching childhood story, reveal the secret of a magic trick, and even plunge into the world of dreams! The project brings together solo genre acts and stage performances by the illusionist duo: Igor Voinov and Roman Sergeev. The show is built on all possible genre effects of illusion: disappearances, appearances, transpositions, levitations, transformations, escapes, mental and extreme tricks. Most of the tricks are interactive acts where a spectator on stage becomes the main character. The repertoire is selected in such a way that it will be interesting to an audience of any age. The main goal of the JUGGLER team is to create a modern family show.',
    text_gallery:
      "We are used to thinking of the world as understandable, which makes it rather boring. Even an illusion show seems commonplace and predictable. Today your heart will beat particularly fast. Because you won't be able to foresee absolutely anything. Our secret is not in magic, hypnosis, or special equipment. It's just that our hands are faster than your eyes. Try to keep up with them. You will doubt what is real. Expect the unexpected!",
    text_video:
      "We have always believed that the laws of reality are reliable and predictable. What if that is not the case? We invite you to a show where the familiar and commonplace becomes mysterious and captivating. Your mind will be tested, and your senses heightened to the limit.<br><br>The JUGGLER team will present to you grand illusions with flights above the stage, incredible escapes and metamorphoses, mind reading, and attention control. You will be the main character!<br><br>Take a step towards a new reality. Become part of a magical event — become part of the JUGGLER SHOW.",
    btn_buy_ticket: "BUY TICKET",
    btn_download_rider: "RIDER",
    btn_view_rider: "VIEW RIDER",
    btn_poster: "POSTER",
    footer_juggler_desc: "Juggler - magician, sleight-of-hand artist (obsolete term)",
    footer_meta: "Meta is recognized as an extremist organization in the Russian Federation.",
    footer_rights: "© 2026 JUGGLER SHOW. ALL RIGHTS RESERVED.",
    doc_title_index: "JUGGLER SHOW — ABOUT US",
    doc_title_show: "JUGGLER SHOW — THE SHOW",
    doc_title_gallery: "JUGGLER SHOW — GALLERY",
    doc_title_video: "JUGGLER SHOW — VIDEO",
    doc_title_contact: "JUGGLER SHOW — CONTACT US",
    doc_title_event: "JUGGLER SHOW — EVENT",
    doc_title_partners: "JUGGLER SHOW — PARTNERS",
    doc_title_poster: "JUGGLER SHOW — POSTER",
    doc_title_ticket: "JUGGLER SHOW — TICKET",
    partner_view: "VIEW",
  },
} as const;

export type PageId =
  | "index"
  | "show"
  | "gallery"
  | "video"
  | "contact"
  | "partners"
  | "event"
  | "poster"
  | "ticket";

export function getBrowserLang(): Lang {
  const nav = navigator as Navigator & { userLanguage?: string; languages?: readonly string[] };
  const localePool = [navigator.language, nav.userLanguage, ...(nav.languages ?? [])]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase());

  const isRussianLocale = localePool.some((locale) => locale.startsWith("ru") || locale.includes("-ru"));
  const regionPool = localePool
    .map((locale) => locale.split("-")[1] ?? "")
    .filter(Boolean);

  const isBelarusOrKazakhstan = regionPool.some((region) => region === "by" || region === "kz");

  if (isRussianLocale && !isBelarusOrKazakhstan) return "ru";
  return "en";
}
