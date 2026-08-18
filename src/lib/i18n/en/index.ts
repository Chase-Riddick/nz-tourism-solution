import { SITE, MAX_GROUP, GUIDE_YEARS } from "../../constants";

export const en = {
  /* ────────────────────────────────  Chrome  ──────────────────────────── */
  ui: {
    skipToContent: "Skip to content",
    menu: "Menu",
    close: "Close",
    languageLabel: "Language",
    home: "Home",
    backToTours: "All tours",
    readMore: "Read more",
    from: "From",
    perPerson: "per person",
    perPersonPerDay: "per person, per day",
    gstIncluded: "GST included",
    nights: "nights",
    days: "days",
    day: "Day",
    hours: "hours",
    maxGroup: `Maximum ${MAX_GROUP}`,
    departsFrom: "Departs from",
    minAge: "Minimum age",
    fitness: "Fitness",
    season: "When it runs",
    included: "What's included",
    notIncluded: "What's not included",
    itinerary: "The day, hour by hour",
    itineraryMulti: "Where you go, day by day",
    highlights: "Highlights",
    gallery: "Photographs",
    enquire: "Ask about this tour",
    enquireShort: "Enquire",
    bookNow: "Check dates",
    viewTour: "View this tour",
    allYear: "Year-round",
    seasonalOnly: "Seasonal",
    weatherDependent: "Weather dependent",
    childPrice: "Child (5–14)",
    singleSupp: "Single room supplement",
    breadcrumb: "You are here",
    relatedTours: "Other tours you might like",
    scrollForMore: "Scroll",
  },

  /* ────────────────────────────  Navigation  ──────────────────────────── */
  nav: {
    tours: "Tours",
    destinations: "Where we go",
    about: "About",
    safety: "Safety & credentials",
    faq: "Questions",
    contact: "Contact",
    journal: "Journal",
  },

  /* ──────────────────────────────  Places  ────────────────────────────── */
  places: {
    matamata: "Matamata",
    waitomo: "Waitomo",
    rotorua: "Rotorua",
    waiotapu: "Wai-O-Tapu",
    redwoods: "Whakarewarewa Forest",
    piha: "Piha",
    waitakere: "Waitākere Ranges",
    muriwai: "Muriwai",
    waiheke: "Waiheke Island",
    tongariro: "Tongariro National Park",
    taupo: "Taupō",
    hukafalls: "Huka Falls",
    bayofislands: "Bay of Islands",
    hokianga: "Hokianga",
    waipoua: "Waipoua Forest",
    capereinga: "Cape Rēinga",
    coromandel: "Coromandel",
    eastcape: "East Cape",
    tolagabay: "Tolaga Bay",
    gisborne: "Gisborne",
    waikaremoana: "Lake Waikaremoana",
  },

  /* ──────────────────────────  Inclusion lines  ───────────────────────── */
  includes: {
    transport: "Travel in our own vehicle, with commentary along the way",
    guide: "A guide who lives here, for the whole trip",
    entryFees: "All entry fees and activity bookings",
    lunch: "Lunch",
    packedLunch: "A packed lunch, made that morning",
    morningTea: "Morning tea",
    dinner: "Dinner",
    someDinners: "Dinner on the nights where there's nowhere else to eat",
    accommodation: "Accommodation, twin share",
    breakfast: "Breakfast each morning",
    pickupCity: "Pick-up and drop-off at your city accommodation",
    ferry: "Return ferry",
    tastings: "Tastings at three vineyards",
    trackTransfer: "Track transfer at both ends",
    safetyGear: "Safety gear, and a pack if you need one",
    boatTrip: "A half-day on the water",
    personalSpending: "Personal spending, souvenirs and drinks",
    travelInsurance: "Travel insurance — please arrange your own",
    hikingBoots: "Hiking boots (we'll tell you what you need)",
  },

  fitnessLevels: {
    easy: "Easy — short walks on formed paths, and plenty of sitting down",
    moderate: "Moderate — a few hours on your feet, some uneven ground",
    active: "Active — a full day's walking, with real ascent",
  },

  /* ────────────────────────────  Home page  ───────────────────────────── */
  home: {
    metaTitle: `${SITE.name} — small-group North Island tours`,
    metaDescription: SITE.description,
    heroKicker: "North Island, Aotearoa New Zealand",
    heroTitle: "The North Island, at its own pace",
    heroBody:
      `Eight people, one guide, and the time to actually stop. One to five days, ` +
      `year-round, from Auckland and Rotorua.`,
    heroCtaPrimary: "See the tours",
    heroCtaSecondary: "Why eight people",

    introKicker: "What we do",
    introTitle: "Small enough to change the plan",
    introBody:
      `Most tours of this island are run in fifty-seat coaches on a timetable that ` +
      `cannot bend. Ours are not. We take a maximum of ${MAX_GROUP} guests in one ` +
      `vehicle, which means we can wait out a rain squall, take the long way round ` +
      `the East Cape, or stay at a lookout until the light is right.\n\n` +
      `It also means we cost more per person than a coach, and we would rather ` +
      `explain why than pretend otherwise.`,

    pillarsTitle: "Three things that make the difference",
    pillars: [
      {
        title: "One guide, the whole way",
        body:
          `No handover at a regional boundary, no local operator you have never met ` +
          `meeting you at a car park. The person who picks you up on the first ` +
          `morning is the person who drops you off at the end.`,
      },
      {
        title: "We move with the seasons",
        body:
          `The alpine crossings run October to May and stop when the snow arrives. ` +
          `Rather than sell you a poor version in July, we go north instead — to ` +
          `country that is genuinely better in winter.`,
      },
      {
        title: "Published prices",
        body:
          `Every rate is on this site, in New Zealand dollars, GST included, with ` +
          `what it covers written out. You should not have to send an email to find ` +
          `out what a day costs.`,
      },
    ],

    toursTitle: "Where we can take you",
    toursBody: "One to five days. Day tours run most of the year; multi-day departures are set.",
    toursCta: "All tours and prices",

    seasonTitle: "It is a different island in July",
    seasonBody:
      `New Zealand's seasons run opposite to the northern hemisphere — December is ` +
      `high summer and July is midwinter. The North Island has no ski season to speak ` +
      `of, so we do not close. We move.`,
    seasonCta: "How the year works",

    proofTitle: "The practical part",
    proofBody:
      `A small operator earns trust by being specific, so here is the specific version.`,

    ctaTitle: "Tell us roughly what you want",
    ctaBody:
      `Dates, how many of you, and what you are hoping to see. We will tell you ` +
      `honestly whether we are the right fit — including when we are not.`,
    ctaButton: "Start a conversation",
  },

  /* ───────────────────────────  Tours index  ──────────────────────────── */
  toursIndex: {
    metaTitle: `Tours and prices — ${SITE.name}`,
    metaDescription:
      "Every North Island tour we run, with prices in NZD, what's included, and when each one operates.",
    title: "Tours and prices",
    lede:
      `Ten tours, one to five days. Every price is per person, in New Zealand ` +
      `dollars, GST included. Multi-day prices are twin share.`,
    dayToursTitle: "Day tours",
    dayToursBody: "Back where you started by evening.",
    multiDayTitle: "Two to five days",
    multiDayBody:
      `Accommodation and breakfast included, twin share. Departures are set rather ` +
      `than daily — one vehicle and one guide only stretches so far.`,
    comparePrice: "About the prices",
    comparePriceBody:
      `A fifty-seat coach can run this island at roughly a third of our per-day rate, ` +
      `because it is filling fifty seats. A private driver-guide costs roughly double, ` +
      `because it is filling two. We sit in between, deliberately, at ${MAX_GROUP}.`,
  },

  /* ─────────────────────────────  Contact  ────────────────────────────── */
  contact: {
    metaTitle: `Contact — ${SITE.name}`,
    metaDescription: "Ask about a tour, a private departure, or a date that isn't listed.",
    title: "Get in touch",
    lede:
      `We are a small team, so you will get a person rather than a ticketing system. ` +
      `Tell us roughly what you are after and we will come back within one working day.`,
    formName: "Your name",
    formEmail: "Email",
    formPhone: "Phone or WhatsApp (optional)",
    formTour: "Which tour?",
    formTourAny: "Not sure yet",
    formDates: "Rough dates",
    formGroup: "How many of you?",
    formMessage: "Anything else we should know?",
    formSubmit: "Send it",
    formSuccess: "Thanks — that's come through.",
    formSuccessBody:
      "We'll reply to the address you gave us, usually within one working day.",
    formPresentation:
      "This form is a demonstration and is not connected to an inbox yet.",
    otherWays: "Other ways to reach us",
    responseNote: "We answer enquiries Monday to Saturday, New Zealand time.",
  },

  /* ─────────────────────────────  Consent  ────────────────────────────── */
  consent: {
    title: "Cookies",
    body:
      `We would like to use Google Analytics to see which pages people actually ` +
      `read. It sets cookies. Nothing loads and nothing is sent unless you say yes.`,
    accept: "Allow analytics",
    decline: "No thanks",
    manage: "Cookie preferences",
    policyLink: "Read the cookie policy",
  },

  /* ─────────────────────────────  Footer  ─────────────────────────────── */
  footer: {
    tagline: SITE.tagline,
    exploreTitle: "Explore",
    companyTitle: "Company",
    legalTitle: "Legal",
    followTitle: "Follow along",
    privacy: "Privacy",
    terms: "Booking conditions",
    cookies: "Cookie policy",
    credits: "Photo credits",
    accessibility: "Accessibility",
    rights: "All rights reserved.",
    builtIn: `Based in ${SITE.base}, working across the North Island.`,
    fictionNotice:
      "This is a demonstration website for a company that does not exist. " +
      "Nothing on it can be booked and no price here is a real offer.",
  },

  /* ──────────────────────────────  404  ───────────────────────────────── */
  notFound: {
    metaTitle: "Page not found",
    title: "That road doesn't go anywhere",
    body: "The page you were after has moved or never existed. The tours are all still here.",
    cta: "Back to the tours",
  },
} as const;

export type Dictionary = typeof en;
