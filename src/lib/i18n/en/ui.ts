/**
 * User-facing chrome strings, English.
 *
 * These live here rather than in components so the later German pass (#3) is a
 * content job rather than surgery. AGENTS.md rule 7.
 */
export const enUi = {
  places: {
    auckland: "Auckland",
    hahei: "Hahei",
    hotwaterbeach: "Hot Water Beach",
    tairua: "Tairua",
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
} as const;

export type Ui = typeof enUi;
