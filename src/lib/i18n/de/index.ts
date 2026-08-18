import { SITE, MAX_GROUP } from "../../constants";
import type { Dictionary } from "../en";

/**
 * Deutsch. Vollständig übersetzt — keine englischen Rückfälle im Fließtext.
 *
 * Der deutsche Markt ist der einzige nicht-englische, den diese Website
 * bedient, und zwar aus recherchierten Gründen: 74% der deutschen Gäste reisen
 * zum Urlaub an (Markt insgesamt ~48%), sie geben pro Reise am meisten aus
 * ($8.664) und bleiben am längsten — und ihre meistgenannte Aktivität ist
 * "Wandern". Siehe docs/research/inbound-markets.md.
 *
 * Ton: Sie-Form. Deutsche Reiseanbieter siezen; das Duzen wäre hier eine
 * Übersetzung des englischen "you", nicht des Registers.
 */
export const de: Dictionary = {
  ui: {
    skipToContent: "Zum Inhalt springen",
    menu: "Menü",
    close: "Schließen",
    languageLabel: "Sprache",
    home: "Startseite",
    backToTours: "Alle Touren",
    readMore: "Weiterlesen",
    from: "Ab",
    perPerson: "pro Person",
    perPersonPerDay: "pro Person und Tag",
    gstIncluded: "inkl. GST (neuseeländische MwSt.)",
    nights: "Nächte",
    days: "Tage",
    day: "Tag",
    hours: "Stunden",
    maxGroup: `Maximal ${MAX_GROUP}`,
    departsFrom: "Abfahrt ab",
    minAge: "Mindestalter",
    fitness: "Kondition",
    season: "Saison",
    included: "Inbegriffen",
    notIncluded: "Nicht inbegriffen",
    itinerary: "Der Tag, Stunde für Stunde",
    itineraryMulti: "Der Ablauf, Tag für Tag",
    highlights: "Höhepunkte",
    gallery: "Bilder",
    enquire: "Zu dieser Tour anfragen",
    enquireShort: "Anfragen",
    bookNow: "Termine ansehen",
    viewTour: "Tour ansehen",
    allYear: "Ganzjährig",
    seasonalOnly: "Saisonal",
    weatherDependent: "Wetterabhängig",
    childPrice: "Kind (5–14)",
    singleSupp: "Einzelzimmerzuschlag",
    breadcrumb: "Sie sind hier",
    relatedTours: "Weitere Touren",
    scrollForMore: "Weiter",
  },

  nav: {
    tours: "Touren",
    destinations: "Reiseziele",
    about: "Über uns",
    safety: "Sicherheit & Zulassungen",
    faq: "Fragen",
    contact: "Kontakt",
    journal: "Journal",
  },

  places: {
    matamata: "Matamata",
    waitomo: "Waitomo",
    rotorua: "Rotorua",
    waiotapu: "Wai-O-Tapu",
    redwoods: "Whakarewarewa-Wald",
    piha: "Piha",
    waitakere: "Waitākere Ranges",
    muriwai: "Muriwai",
    waiheke: "Waiheke Island",
    tongariro: "Tongariro-Nationalpark",
    taupo: "Taupō",
    hukafalls: "Huka Falls",
    bayofislands: "Bay of Islands",
    hokianga: "Hokianga",
    waipoua: "Waipoua-Wald",
    capereinga: "Cape Rēinga",
    coromandel: "Coromandel",
    eastcape: "East Cape",
    tolagabay: "Tolaga Bay",
    gisborne: "Gisborne",
    waikaremoana: "Lake Waikaremoana",
  },

  includes: {
    transport: "Fahrt im eigenen Fahrzeug, mit Erläuterungen unterwegs",
    guide: "Eine Reiseleitung von hier — die ganze Tour über dieselbe",
    entryFees: "Sämtliche Eintritte und Aktivitätsbuchungen",
    lunch: "Mittagessen",
    packedLunch: "Ein Lunchpaket, morgens frisch gemacht",
    morningTea: "Vormittagspause mit Kaffee und Kuchen",
    dinner: "Abendessen",
    someDinners: "Abendessen an den Abenden, an denen es sonst nichts gibt",
    accommodation: "Übernachtung im Doppelzimmer",
    breakfast: "Frühstück an jedem Morgen",
    pickupCity: "Abholung und Rückfahrt zu Ihrer Unterkunft in der Stadt",
    ferry: "Fähre hin und zurück",
    tastings: "Verkostungen auf drei Weingütern",
    trackTransfer: "Transfer zu beiden Enden des Wanderwegs",
    safetyGear: "Sicherheitsausrüstung, und ein Rucksack, falls nötig",
    boatTrip: "Ein halber Tag auf dem Wasser",
    personalSpending: "Persönliche Ausgaben, Souvenirs und Getränke",
    travelInsurance: "Reiseversicherung — bitte selbst abschließen",
    hikingBoots: "Wanderschuhe (wir sagen Ihnen vorher genau, was Sie brauchen)",
  },

  fitnessLevels: {
    easy: "Leicht — kurze Wege auf befestigten Pfaden, mit vielen Pausen",
    moderate: "Mittel — einige Stunden auf den Beinen, teils unebenes Gelände",
    active: "Anspruchsvoll — ein ganzer Wandertag mit echtem Anstieg",
  },

  home: {
    metaTitle: `${SITE.name} — Touren in kleinen Gruppen, Nordinsel Neuseeland`,
    metaDescription:
      "Geführte Touren in kleinen Gruppen über die Nordinsel Neuseelands — " +
      "ein bis fünf Tage, maximal acht Gäste, ganzjährig ab Auckland und Rotorua.",
    heroKicker: "Nordinsel, Aotearoa Neuseeland",
    heroTitle: "Die Nordinsel, in ihrem eigenen Tempo",
    heroBody:
      `Acht Gäste, eine Reiseleitung und genug Zeit, um tatsächlich anzuhalten. ` +
      `Ein bis fünf Tage, ganzjährig, ab Auckland und Rotorua.`,
    heroCtaPrimary: "Zu den Touren",
    heroCtaSecondary: "Warum nur acht Gäste",

    introKicker: "Was wir machen",
    introTitle: "Klein genug, um den Plan zu ändern",
    introBody:
      `Die meisten Touren über diese Insel fahren im Fünfzigsitzer nach einem ` +
      `Zeitplan, der sich nicht biegen lässt. Unsere nicht. Wir nehmen höchstens ` +
      `${MAX_GROUP} Gäste in einem Fahrzeug mit — und können deshalb einen Regenschauer ` +
      `abwarten, den langen Weg um das East Cape nehmen oder an einem Aussichtspunkt ` +
      `stehen bleiben, bis das Licht stimmt.\n\n` +
      `Das heißt auch: Wir kosten pro Person mehr als ein Reisebus. Wir erklären ` +
      `lieber, warum, als so zu tun, als wäre es anders.`,

    pillarsTitle: "Drei Dinge, die den Unterschied machen",
    pillars: [
      {
        title: "Eine Reiseleitung, die ganze Zeit",
        body:
          `Keine Übergabe an einer Regionsgrenze, kein fremder Anbieter, der Sie auf ` +
          `einem Parkplatz in Empfang nimmt. Wer Sie am ersten Morgen abholt, setzt Sie ` +
          `am Ende auch wieder ab.`,
      },
      {
        title: "Wir richten uns nach den Jahreszeiten",
        body:
          `Die alpinen Überquerungen laufen von Oktober bis Mai und enden, sobald der ` +
          `Schnee kommt. Statt Ihnen im Juli eine schlechtere Version zu verkaufen, ` +
          `fahren wir dann nach Norden — in Gegenden, die im Winter wirklich besser sind.`,
      },
      {
        title: "Preise stehen auf der Seite",
        body:
          `Jeder Preis steht hier, in neuseeländischen Dollar, inklusive GST, mit einer ` +
          `Auflistung dessen, was er abdeckt. Sie sollten keine E-Mail schreiben müssen, ` +
          `um zu erfahren, was ein Tag kostet.`,
      },
    ],

    toursTitle: "Wohin wir Sie mitnehmen",
    toursBody:
      "Ein bis fünf Tage. Tagestouren fahren fast das ganze Jahr; die mehrtägigen Touren haben feste Termine.",
    toursCta: "Alle Touren und Preise",

    seasonTitle: "Im Juli ist es eine andere Insel",
    seasonBody:
      `Neuseelands Jahreszeiten sind denen der Nordhalbkugel entgegengesetzt — Dezember ` +
      `ist Hochsommer, Juli ist tiefster Winter. Eine nennenswerte Skisaison gibt es auf ` +
      `der Nordinsel nicht, also schließen wir nicht. Wir ziehen um.`,
    seasonCta: "Wie das Jahr abläuft",

    proofTitle: "Das Praktische",
    proofBody:
      `Ein kleiner Anbieter gewinnt Vertrauen, indem er konkret wird. Also hier das Konkrete.`,

    ctaTitle: "Sagen Sie uns ungefähr, was Sie vorhaben",
    ctaBody:
      `Zeitraum, wie viele Sie sind, und was Sie sehen möchten. Wir sagen Ihnen ehrlich, ` +
      `ob wir dazu passen — auch dann, wenn wir es nicht tun.`,
    ctaButton: "Gespräch beginnen",
  },

  toursIndex: {
    metaTitle: `Touren und Preise — ${SITE.name}`,
    metaDescription:
      "Alle Touren über die Nordinsel, mit Preisen in NZD, Leistungen und Saison.",
    title: "Touren und Preise",
    lede:
      `Zehn Touren, ein bis fünf Tage. Alle Preise gelten pro Person, in ` +
      `neuseeländischen Dollar, inklusive GST. Mehrtagespreise gelten im Doppelzimmer.`,
    dayToursTitle: "Tagestouren",
    dayToursBody: "Am Abend zurück, wo Sie gestartet sind.",
    multiDayTitle: "Zwei bis fünf Tage",
    multiDayBody:
      `Übernachtung und Frühstück inbegriffen, im Doppelzimmer. Die Termine sind fest ` +
      `und nicht täglich — ein Fahrzeug und eine Reiseleitung reichen nur so weit.`,
    comparePrice: "Zu den Preisen",
    comparePriceBody:
      `Ein Fünfzigsitzer fährt diese Insel für etwa ein Drittel unseres Tagessatzes, ` +
      `weil er fünfzig Plätze füllt. Eine private Reiseleitung kostet etwa das Doppelte, ` +
      `weil sie zwei füllt. Wir liegen bewusst dazwischen, bei ${MAX_GROUP}.`,
  },

  contact: {
    metaTitle: `Kontakt — ${SITE.name}`,
    metaDescription:
      "Fragen Sie nach einer Tour, einer privaten Abfahrt oder einem Termin, der nicht gelistet ist.",
    title: "Kontakt",
    lede:
      `Wir sind ein kleines Team — Sie bekommen eine Person und kein Ticketsystem. ` +
      `Schreiben Sie uns ungefähr, was Sie vorhaben; wir melden uns innerhalb eines ` +
      `Werktags.`,
    formName: "Ihr Name",
    formEmail: "E-Mail",
    formPhone: "Telefon oder WhatsApp (optional)",
    formTour: "Welche Tour?",
    formTourAny: "Noch unentschieden",
    formDates: "Ungefährer Zeitraum",
    formGroup: "Wie viele Personen?",
    formMessage: "Gibt es sonst etwas, das wir wissen sollten?",
    formSubmit: "Absenden",
    formSuccess: "Danke — Ihre Nachricht ist angekommen.",
    formSuccessBody:
      "Wir antworten an die angegebene Adresse, in der Regel innerhalb eines Werktags.",
    formPresentation:
      "Dieses Formular ist eine Demonstration und noch mit keinem Postfach verbunden.",
    otherWays: "Andere Wege zu uns",
    responseNote: "Wir beantworten Anfragen montags bis samstags, neuseeländischer Zeit.",
  },

  consent: {
    title: "Cookies",
    body:
      `Wir würden gern Google Analytics einsetzen, um zu sehen, welche Seiten ` +
      `tatsächlich gelesen werden. Dabei werden Cookies gesetzt. Ohne Ihr ` +
      `ausdrückliches Ja wird nichts geladen und nichts übertragen.`,
    accept: "Analyse erlauben",
    decline: "Nein danke",
    manage: "Cookie-Einstellungen",
    policyLink: "Cookie-Richtlinie lesen",
  },

  footer: {
    tagline: "Weniger Menschen. Längere Tage. Die Nordinsel in ihrem eigenen Tempo.",
    exploreTitle: "Entdecken",
    companyTitle: "Unternehmen",
    legalTitle: "Rechtliches",
    followTitle: "Folgen",
    privacy: "Datenschutz",
    terms: "Buchungsbedingungen",
    cookies: "Cookie-Richtlinie",
    credits: "Bildnachweise",
    accessibility: "Barrierefreiheit",
    rights: "Alle Rechte vorbehalten.",
    builtIn: `Mit Sitz in ${SITE.base}, unterwegs auf der ganzen Nordinsel.`,
    fictionNotice:
      "Dies ist eine Demonstrationswebsite für ein Unternehmen, das nicht existiert. " +
      "Nichts hiervon ist buchbar, und kein Preis auf dieser Seite ist ein echtes Angebot.",
  },

  notFound: {
    metaTitle: "Seite nicht gefunden",
    title: "Diese Straße führt nirgendwohin",
    body:
      "Die gesuchte Seite wurde verschoben oder hat nie existiert. Die Touren sind alle noch da.",
    cta: "Zurück zu den Touren",
  },
};
