/**
 * Tour copy, English. Keyed to `src/lib/catalog.ts` ids.
 * `itinerary.length` must equal the tour's `itineraryDays` — enforced by
 * tests/i18n.spec.ts, so a half-written itinerary fails the build rather than
 * shipping.
 *
 * Voice: personal, concrete, lightly cheeky. The person writing this drives
 * the van. Prices never appear in prose — they live in the catalogue.
 */
export const enTours = {
  "west-coast-beaches": {
    name: "Auckland's Wild West Coast",
    tagline: "Black sand, gannets, and the coast the postcards ignore",
    summary:
      `Forty minutes from downtown Auckland is a coastline that behaves like the ` +
      `end of the earth: black-sand beaches, waves with genuine intent, and a ` +
      `gannet colony that runs its own crowded city on the cliffs at Muriwai. ` +
      `This is the short, sharp version of what we do — half a day longer than a ` +
      `harbour cruise, a whole world further out.`,
    highlights: [
      "Piha and Lion Rock, preferably with surf hammering the bar",
      "The Muriwai gannet colony at conversational distance",
      "Rainforest switchbacks through the Waitākere Ranges",
      "A coffee stop that is non-negotiable and locally correct",
    ],
    itinerary: [
      {
        title: "The wild half-day that eats the whole morning",
        body:
          `We collect you from central Auckland at 8am and climb straight into the ` +
          `Waitākere Ranges — rainforest one side, Tasman Sea the other. Down the ` +
          `Piha road for the view everyone stops at, then the beach itself: black ` +
          `sand, Lion Rock, and whatever the ocean is doing that day, which is ` +
          `never nothing.\n\n` +
          `North along the coast to Muriwai, where a few thousand gannets nest on ` +
          `the cliff tops within metres of the viewing platform. If the group ` +
          `wants longer on the sand, we take longer on the sand — that is the ` +
          `point of eleven seats.\n\n` +
          `Back in the city by mid-afternoon, salt-crusted and pleased with yourselves.`,
      },
    ],
  },

  "auckland-in-a-day": {
    name: "Auckland in a Day",
    tagline: "Volcanoes, two harbours, and the city between them",
    summary:
      `Auckland sits on fifty-odd volcanoes between two harbours, and most ` +
      `visitors only ever see the bit with the shops. This is the whole picture ` +
      `in one unhurried day — summit views, both coasts, and the neighbourhoods ` +
      `we would actually send you to for dinner.`,
    highlights: [
      "A volcanic summit before the tour buses wake up",
      "Both harbours — the Waitematā's sails, the Manukau's mood",
      "The west coast lookout that ends most people's idea of Auckland",
      "Local knowledge you can use for the rest of your stay",
    ],
    itinerary: [
      {
        title: "The whole city, properly",
        body:
          `A 9am pickup and straight up a maunga — a volcanic cone with the whole ` +
          `isthmus laid out below, so the rest of the day makes sense. Then the ` +
          `city in slices: the waterfront, the neighbourhoods, morning tea where ` +
          `the flat whites are taken seriously.\n\n` +
          `In the afternoon we cross to the west for the black-sand exclamation ` +
          `mark — a lookout over the Tasman that most Aucklanders save for ` +
          `impressing visitors. Your guide's advice on where to eat for the rest ` +
          `of your stay is included and opinionated.\n\n` +
          `Back by 7pm, with the city sorted into places you now know.`,
      },
    ],
  },

  "cathedral-cove-coromandel": {
    name: "Cathedral Cove & the Coromandel",
    tagline: "The cove before the crowds, and a beach you dig yourself",
    summary:
      `The Coromandel Peninsula is what New Zealanders mean when they say ` +
      `"the beach." This day gets you to Cathedral Cove's rock arch before the ` +
      `crowds land, feeds you properly in Hahei, and puts a spade in your hand ` +
      `at Hot Water Beach at exactly the right state of tide.`,
    highlights: [
      "Cathedral Cove's arch with morning light and no queue",
      "Lunch in Hahei — included, and the fish is local",
      "Your own hot pool, dug at low tide at Hot Water Beach",
      "One stop the group chooses — lookout, beach, or the famous pie shop",
    ],
    itinerary: [
      {
        title: "Over the hill to the good coast",
        body:
          `Away at 7:40am, over the Kopu bridge before the traffic wakes, and ` +
          `coffee where the locals get it. We walk into Cathedral Cove while the ` +
          `light is still low — your guide has photographed it all summer and ` +
          `knows exactly where to stand.\n\n` +
          `Lunch in Hahei is included. At Hot Water Beach the spades are already ` +
          `in the van; low tide is why the day runs when it runs, and digging your ` +
          `own spa in the sand is exactly as good as it sounds.\n\n` +
          `On the way home the group picks a stop — the Tairua lookout, an extra ` +
          `hour on the sand, or the pie shop we pretend is a secret. Drop-off ` +
          `around 6:45pm; your photos land in your inbox that evening.`,
      },
    ],
  },

  "waiheke-island": {
    name: "Waiheke Island, Vines & Bays",
    tagline: "A ferry, three vineyards, and no one watching the clock",
    summary:
      `Forty minutes across the harbour is an island that decided, some decades ` +
      `ago, to be very good at exactly two things: growing wine and being looked ` +
      `at. We do both properly — three tastings at vineyards we'd drink at ` +
      `ourselves, the bays in between, and a ferry ride home at golden hour. ` +
      `Adults only, for reasons the vineyards insist on.`,
    highlights: [
      "Return ferry included — the approach is half the show",
      "Tastings at three vineyards, chosen by people who go on their days off",
      "Oneroa's beach and the headland views between pours",
      "A pace with deliberate gaps in it",
    ],
    itinerary: [
      {
        title: "Island time, taken seriously",
        body:
          `We meet you at the downtown ferry terminal for the 9:30am sailing — ` +
          `the Waitematā and the gulf islands sliding past are the opening act. ` +
          `On the island, the van is waiting.\n\n` +
          `Three vineyards across the day, each different on purpose: one grand, ` +
          `one scrappy and brilliant, one with a view that upstages the wine. ` +
          `Between them, the bays — and lunch at the vineyard restaurant is ` +
          `yours to linger over.\n\n` +
          `The late-afternoon ferry brings you home with the sun behind the city. ` +
          `Nobody has ever complained about this day.`,
      },
    ],
  },

  "hobbiton-waitomo": {
    name: "Hobbiton & Waitomo",
    tagline: "The two everyone comes for, done without the queue crush",
    summary:
      `A long day, and honestly the least secret thing we do — these are the two ` +
      `most-visited attractions in the Waikato. What we change is the shape of the ` +
      `day: we leave early enough to reach the Shire before the coaches, eat a proper ` +
      `lunch rather than a packet, and take the back road between the two rather than ` +
      `the expressway.`,
    highlights: [
      "The film set with morning light on it, before the mid-morning crowd",
      "A boat, in silence, under a ceiling of glowworms",
      "Lunch in the Party Marquee, which is better than it has any right to be",
      "The Waikato back roads, which nobody photographs and everybody remembers",
    ],
    itinerary: [
      {
        title: "One long, good day",
        body:
          `We pick you up in central Auckland at 6:45am — early, and worth it. Two ` +
          `hours south through the Bombay Hills and dairy country to Matamata, where ` +
          `we walk the Shire with a guide while the light is still low.\n\n` +
          `Lunch is in the Party Marquee. Then west to Waitomo, where you'll go down ` +
          `into the cave system and out onto the underground river by boat. The ` +
          `glowworms are a genuine wonder and photographs do not do them justice, ` +
          `which is partly the point.\n\n` +
          `Home by about 7pm, along the back roads, with a coffee stop somewhere ` +
          `unremarkable and good.`,
      },
    ],
  },

  "rotorua-waiotapu": {
    name: "Rotorua & Wai-O-Tapu",
    tagline: "Steam, silica, and the smell you stop noticing after an hour",
    summary:
      `Rotorua sits on an active geothermal field and does not let you forget it. ` +
      `We run this ex-Auckland as one long, rich day: the Champagne Pool before ` +
      `the buses, lunch included, and the 1901 redwood forest to walk it all off. ` +
      `Rain makes the steam better, not worse — this is our all-weather banker.`,
    highlights: [
      "The Champagne Pool at Wai-O-Tapu, which is genuinely that colour",
      "Silica terraces that look like something has spilled and set",
      "Towering redwoods planted in 1901, on soft forest floor",
      "Lunch included, somewhere with steam in the view",
    ],
    itinerary: [
      {
        title: "Geothermal country, done properly",
        body:
          `Away from central Auckland at 7:30am, south through dairy country with ` +
          `a proper coffee stop. Into Wai-O-Tapu before the middle of the day and ` +
          `around the full circuit — mud pools, collapsed craters, and the ` +
          `Champagne Pool with its improbable orange rim.\n\n` +
          `Lunch is included in Rotorua. In the afternoon, the Whakarewarewa ` +
          `redwoods: hundred-and-twenty-year-old trees, soft forest floor, and the ` +
          `sudden quiet after a morning of hissing ground.\n\n` +
          `Home by about 7:30pm. Your guide's photos of the day — steam, colour, ` +
          `you in front of both — arrive that evening.`,
      },
    ],
  },

  "waitomo-rotorua": {
    name: "Waitomo Caves & Rotorua",
    tagline: "Underground rivers and boiling ground, one long day",
    summary:
      `The two great below-the-surface spectacles of the central North Island — ` +
      `a glowworm cave you drift through by boat, and a geothermal field that ` +
      `never switches off — folded into one ex-Auckland day with lunch included. ` +
      `For people whose time is short and whose standards are not.`,
    highlights: [
      "The Waitomo glowworm boat ride, in engineered silence",
      "Wai-O-Tapu's mud pools doing their slow, rude percussion",
      "Lunch included between the two",
      "One stop on the way home, chosen by the group",
    ],
    itinerary: [
      {
        title: "Under the island and back up",
        body:
          `A 7am start from central Auckland — this is the longest day tour we run ` +
          `and it earns every hour. Waitomo first: down through the cathedral-sized ` +
          `chambers and onto the river, lights off, a few hundred thousand ` +
          `glowworms doing the ceiling's work.\n\n` +
          `Lunch, included, then across to Rotorua and the Wai-O-Tapu field — mud ` +
          `pools, steaming terraces, ground that audibly disagrees with itself.\n\n` +
          `The group picks the homeward stop. Back around 7:30pm, photographed ` +
          `and fed.`,
      },
    ],
  },

  "tongariro-weekender": {
    name: "Tongariro Crossing Weekender",
    tagline: "The great walk-in-a-day, without the 4am alarm",
    summary:
      `The Tongariro Alpine Crossing is the best day walk in the country and the ` +
      `worst day trip from Auckland — unless you sleep at the mountain. We drive ` +
      `down the afternoon before, stay in National Park village, and walk the ` +
      `Crossing fresh, guided, at your group's pace. Alpine season only: the ` +
      `mountain sets the calendar, not us.`,
    highlights: [
      "The full 19.4km Crossing with your guide walking beside you",
      "Emerald Lakes, Red Crater, and steam on the descent",
      "A night in National Park village instead of a 4am start",
      "Huka Falls and Taupō on the drive down",
    ],
    itinerary: [
      {
        title: "Down to the mountain",
        body:
          `A civilised 10am departure from Auckland, with Huka Falls and a Taupō ` +
          `lakefront stop on the way south. Gear check and dinner in National Park ` +
          `village — your guide talks the group through the route over the meal, ` +
          `and checks the forecast one more time than is strictly necessary.\n\n` +
          `Night in the village, twin-share, close enough to the trailhead to make ` +
          `tomorrow easy.`,
      },
      {
        title: "The Crossing",
        body:
          `An early shuttle to the trailhead and onto the track as the light comes ` +
          `up. The Crossing takes six to eight hours: the Devil's Staircase, Red ` +
          `Crater's improbable colour, the Emerald Lakes, and the long steaming ` +
          `descent to Ketetahi. Your guide sets the pace to the group and carries ` +
          `the safety calls — if the mountain says no, we walk the lower tracks ` +
          `and tell you why.\n\n` +
          `Back in Auckland by about 9pm, tired in the specific way people pay ` +
          `for. Photos land the next morning.`,
      },
    ],
  },

  "bay-of-islands-weekender": {
    name: "Bay of Islands Weekender",
    tagline: "Two days north, one night in Paihia, no ferry timetable stress",
    summary:
      `The far north rewards an overnight: the bay itself, a boat trip among the ` +
      `islands, Russell across the water, and — on the way home — Tāne Mahuta, ` +
      `the largest living kauri, standing in the Waipoua forest like something ` +
      `that has opinions about your schedule. Accommodation in Paihia included.`,
    highlights: [
      "A half-day on the water among the islands",
      "Russell — the first capital, now the prettiest ferry ride in the country",
      "Tāne Mahuta, Lord of the Forest, on the western route home",
      "A night in Paihia with the evening to yourselves",
    ],
    itinerary: [
      {
        title: "North along the coast",
        body:
          `Away at 8am up the east coast — beaches, oyster country, and a proper ` +
          `lunch stop in Whangārei. Into Paihia by mid-afternoon with time to walk ` +
          `the waterfront or take the ferry across to Russell for the evening.\n\n` +
          `Night in Paihia, twin-share, close to the wharf.`,
      },
      {
        title: "The bay, then the forest road home",
        body:
          `Morning on the water — a half-day boat trip among the islands, with ` +
          `dolphins on their schedule, not ours. After lunch we take the western ` +
          `route home through the Waipoua forest and stop for Tāne Mahuta, two ` +
          `thousand years old and entirely unbothered by your itinerary.\n\n` +
          `Down the Kauri Coast and back into Auckland by early evening.`,
      },
    ],
  },

  "volcanic-heartland": {
    name: "Volcanic Heartland",
    tagline: "Four days through the island's hot, loud, improbable middle",
    summary:
      `This is the tour we built the company for. Glowworm caves, geothermal ` +
      `country, the big lake, and a volcano crossing, joined by the roads coaches ` +
      `don't take — with three nights' accommodation included and the van never ` +
      `more than eleven people full. In alpine season, day three is the Tongariro ` +
      `Alpine Crossing; in winter it becomes the lower-mountain day, and we're ` +
      `honest about that trade.`,
    highlights: [
      "Waitomo's glowworms and Wai-O-Tapu's boiling colour in one trip",
      "The Crossing, guided, in season — lower-mountain walks otherwise",
      "Three nights sorted: Rotorua, Taupō, National Park village",
      "The 45-minute stop each day that belongs to the group",
    ],
    itinerary: [
      {
        title: "Auckland → Rotorua: under the island first",
        body:
          `Waitomo mid-morning for the glowworm boat ride, then east into ` +
          `geothermal country. Mud pools at golden hour, dinner in Rotorua, and ` +
          `the smell of sulphur you will stop noticing by breakfast.\n\n` +
          `Night: Rotorua, twin-share.`,
      },
      {
        title: "Rotorua → Taupō: the colour and the lake",
        body:
          `Wai-O-Tapu early, before the buses — the Champagne Pool at its ` +
          `stillest. Huka Falls on the way south, then an afternoon in Taupō ` +
          `that is deliberately yours: spa, bike, lake swim, or nothing at all.\n\n` +
          `Night: Taupō, twin-share.`,
      },
      {
        title: "Tongariro: the mountain day",
        body:
          `In alpine season this is the full Crossing, guided, at the group's ` +
          `pace — Red Crater, the Emerald Lakes, the steaming descent. Outside ` +
          `the season, or when the mountain says no, we walk the lower tracks: ` +
          `Taranaki Falls, Tama Lakes as conditions allow, and no pretending ` +
          `that's the same thing, because it isn't — it's merely wonderful.\n\n` +
          `Night: National Park village, twin-share.`,
      },
      {
        title: "The long way home",
        body:
          `River country north, one last swim somewhere your guide is smug ` +
          `about, and the group's final chosen stop. Into Auckland by early ` +
          `evening, four days of photographs already in your inbox.`,
      },
    ],
  },
} as const;

export type ToursCopy = typeof enTours;
