/**
 * Tour copy, English. Keyed to `src/lib/catalog.ts` ids.
 * `itinerary.length` must equal the tour's `itineraryDays` — enforced by
 * tests/i18n.spec.ts, so a half-written itinerary fails the build rather than
 * shipping.
 */
export const enTours = {
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

  "rotorua-geothermal": {
    name: "Rotorua geothermal day",
    tagline: "Steam, silica, and the smell you stop noticing after an hour",
    summary:
      `Rotorua sits on an active geothermal field, and it does not let you forget it. ` +
      `This is the all-weather day in our catalogue — rain makes the steam better, not ` +
      `worse — and it is the one we run most often in winter.`,
    highlights: [
      "The Champagne Pool at Wai-O-Tapu, which is genuinely that colour",
      "Silica terraces that look like something has spilled and set",
      "Towering redwoods planted in 1901, on soft forest floor",
      "A soak in a hot pool at the end, if you want one",
    ],
    itinerary: [
      {
        title: "Geothermal country",
        body:
          `A 9am start from your Rotorua accommodation. We go to Wai-O-Tapu first ` +
          `and walk the full circuit — mud pools, collapsed craters, and the ` +
          `Champagne Pool with its orange arsenic-and-antimony rim.\n\n` +
          `Morning tea somewhere with a view of something steaming. Then into ` +
          `Whakarewarewa Forest, where the Californian redwoods planted over a ` +
          `century ago have grown to a scale that stops conversation.\n\n` +
          `We finish mid-afternoon. If you would like to end the day in a hot pool ` +
          `we will drop you at one and tell you which is best.`,
      },
    ],
  },

  "west-coast-beaches": {
    name: "West coast & black sand",
    tagline: "Forty minutes from the city, and a different country",
    summary:
      `Auckland's west coast is iron-sand, hard surf and rainforest, and most ` +
      `visitors never see it. Half a day, close to town, and the most dramatic ` +
      `landscape you can reach from a city hotel before lunch.`,
    highlights: [
      "Lion Rock at Piha, from the sand and from the lookout above it",
      "Black iron sand — magnetic, and startling underfoot on a hot day",
      "Kauri forest in the Waitākere Ranges, with the boot-wash stations that are keeping it alive",
      "Gannet colony at Muriwai, wheeling at eye level",
    ],
    itinerary: [
      {
        title: "Out west",
        body:
          `A 9am pick-up, then west through the Waitākere Ranges. We stop at the ` +
          `Arataki lookout for the view over the whole catchment, and walk a short ` +
          `section of kauri forest — scrubbing boots on the way in and out, because ` +
          `kauri dieback is spread on footwear and the trees here are hundreds of ` +
          `years old.\n\n` +
          `Down to Piha for the beach and the climb up Lion Rock. Then north along ` +
          `the coast to Muriwai and the gannet colony, where several thousand birds ` +
          `nest on a stack close enough to hear.\n\n` +
          `Back in the city by about 4pm.`,
      },
    ],
  },

  "waiheke-island": {
    name: "Waiheke Island",
    tagline: "Thirty-five minutes by ferry, and nobody is in a hurry",
    summary:
      `An island of vineyards, olive groves and coves in the Hauraki Gulf, close ` +
      `enough to Auckland to be a day trip and far enough to feel like leaving. ` +
      `Three tastings, a long lunch, and a swim if the weather is doing its job.`,
    highlights: [
      "Three cellar doors, chosen for the people rather than the scores",
      "Syrah and Bordeaux blends that do not travel, so this is where you drink them",
      "Lunch looking down vine rows to the water",
      "A swim at Onetangi if the day allows",
    ],
    itinerary: [
      {
        title: "Island day",
        body:
          `We meet at the downtown ferry terminal and cross at 9:15am — thirty-five ` +
          `minutes, and worth standing outside for.\n\n` +
          `Three vineyards through the day, spaced so it stays enjoyable rather than ` +
          `becoming a march. Lunch is long and sitting down. Between tastings we ` +
          `take the coast road and stop at Onetangi, and if it is warm you should swim.\n\n` +
          `Back on the 5pm ferry. Adults only, for obvious reasons.`,
      },
    ],
  },

  "tongariro-crossing": {
    name: "Tongariro Alpine Crossing",
    tagline: "Nineteen and a half kilometres across an active volcanic massif",
    summary:
      `Widely called the best day walk in New Zealand, and it earns it. It is also ` +
      `a serious alpine day: 19.4km, around 800m of climb, and weather that changes ` +
      `without asking. We run it October to May with a guide, a track transfer at ` +
      `both ends, and the willingness to call it off.`,
    highlights: [
      "Red Crater, and the drop into the Emerald Lakes beyond it",
      "Mount Ngāuruhoe standing over the whole first half of the walk",
      "Steam venting from ground you are standing on",
      "The long descent north with Lake Taupō laid out ahead",
    ],
    itinerary: [
      {
        title: "The Crossing",
        body:
          `A pre-dawn start — we are at Mangatepopo for first light, because the ` +
          `weather on this mountain is best early and the last shuttle does not wait.\n\n` +
          `Up the valley, then the Devil's Staircase to South Crater. Across the ` +
          `crater floor, up to Red Crater at 1,886m — the high point, and usually the ` +
          `cold, windy one. Down the scree to the Emerald Lakes, past Blue Lake, then ` +
          `a long descent through tussock and beech to Ketetahi.\n\n` +
          `Seven to nine hours walking. We carry the safety gear and a spare layer ` +
          `you will probably want. Back in Rotorua by early evening.\n\n` +
          `**If the mountain says no, we do not go.** DOC issues a formal warning in ` +
          `bad conditions and shuttle operators must stop running under the terms of ` +
          `their concession. You get another date or your money back.`,
      },
    ],
  },

  "volcanic-two-day": {
    name: "Volcanic heartland",
    tagline: "Two days on the most active ground in the country",
    summary:
      `Rotorua and Taupō sit on the Taupō Volcanic Zone, which is why the ground ` +
      `steams and the lake is a caldera. Two days, one night, and no walking that ` +
      `requires anything more than comfortable shoes.`,
    highlights: [
      "Wai-O-Tapu's full circuit, unhurried",
      "Huka Falls — 220,000 litres a second through a nine-metre gap",
      "Ōrākei Kōrako, the geothermal terrace most visitors drive straight past",
      "Craters of the Moon at dusk, when the steam catches the light",
    ],
    itinerary: [
      {
        title: "Rotorua and the terraces",
        body:
          `Morning at Wai-O-Tapu, walking the full circuit rather than the short ` +
          `loop. Afternoon at Ōrākei Kōrako, which needs a boat to reach and is the ` +
          `better site of the two — fewer people, more terrace.\n\n` +
          `We stay in Taupō. Dinner is your own; we will tell you where to go.`,
      },
      {
        title: "Taupō and the river",
        body:
          `Huka Falls first thing, before the tour buses. Then the Waikato River ` +
          `downstream — the volume of water is difficult to believe until you are ` +
          `standing over it.\n\n` +
          `Craters of the Moon in the afternoon, walking the boardwalk through vents ` +
          `and steaming ground. Back to Rotorua by early evening.`,
      },
    ],
  },

  "central-plateau": {
    name: "Central Plateau",
    tagline: "Three days built around the Crossing, with room to move it",
    summary:
      `The Tongariro Alpine Crossing with a day either side — which is the honest ` +
      `way to sell an alpine walk in a maritime climate. If day two is unwalkable we ` +
      `swap it to day three. That flexibility is the entire reason this itinerary is ` +
      `three days rather than one.`,
    highlights: [
      "The Crossing, with a spare day built in for weather",
      "Huka Falls and the Waikato at full volume",
      "Ōrākei Kōrako's silica terraces by boat",
      "Two nights in one place, so you unpack once",
    ],
    itinerary: [
      {
        title: "South to the mountains",
        body:
          `Out of Rotorua mid-morning, south past Ōrākei Kōrako for the terraces and ` +
          `on to Taupō for Huka Falls. We get to National Park village in the late ` +
          `afternoon, sort gear, and eat early — tomorrow starts before dawn.`,
      },
      {
        title: "The Crossing",
        body:
          `The full 19.4km alpine crossing with a track transfer at both ends. Seven ` +
          `to nine hours. See the day-tour page for the detail.\n\n` +
          `If the forecast is bad we move it to tomorrow and do this day's plan ` +
          `instead. Having the spare day is the point.`,
      },
      {
        title: "Whakapapa, and north",
        body:
          `A gentler day. The Taranaki Falls loop from Whakapapa if legs allow, or ` +
          `the Tawhai Falls short walk if they do not. Lunch looking at Ruapehu.\n\n` +
          `North through the Desert Road — genuinely desert-like, and unlike anywhere ` +
          `else in the country — and back to Rotorua by evening.`,
      },
    ],
  },

  "northland-three": {
    name: "Northland & the Hokianga",
    tagline: "Three days in the winterless north",
    summary:
      `Northland is subtropical, and it is where we go when the mountains close. ` +
      `Kauri forest, a harbour with giant dunes on the far shore, and the place where ` +
      `two oceans meet. This is our best winter tour and we would rather say so than ` +
      `pretend every month is equal.`,
    highlights: [
      "Tāne Mahuta, around 2,000 years old and 45 metres tall",
      "The Hokianga, with the north-head dunes across the water",
      "Cape Rēinga, where the Tasman Sea and the Pacific visibly collide",
      "Ninety Mile Beach — a legal highway, though we won't drive it",
    ],
    itinerary: [
      {
        title: "North to the Bay of Islands",
        body:
          `Out of Auckland early, north over the Brynderwyns. We're on the water in ` +
          `the Bay of Islands by afternoon — a half-day boat trip out among the ` +
          `islands, with a decent chance of dolphins.\n\n` +
          `Night in Paihia.`,
      },
      {
        title: "Across to the Hokianga",
        body:
          `West across the peninsula to Waipoua Forest and Tāne Mahuta, the largest ` +
          `living kauri. Boot-wash stations both ways — dieback is the real threat to ` +
          `these trees and the protocol is not optional.\n\n` +
          `On to the Hokianga in the afternoon. The harbour with those enormous pale ` +
          `dunes on the north head is one of the great views in the country and ` +
          `almost nobody sees it. Night at Ōpononi.`,
      },
      {
        title: "Cape Rēinga and south",
        body:
          `North to Cape Rēinga, where you can watch the Tasman and the Pacific meet ` +
          `in a visible line of broken water. It is also, in Māori understanding, ` +
          `where spirits depart — a significant place, and we treat it as one.\n\n` +
          `Down the length of the peninsula and back to Auckland by evening.`,
      },
    ],
  },

  "north-island-five": {
    name: "North Island in five",
    tagline: "Coast, forest, geothermal and alpine, without rushing any of it",
    summary:
      `Five days is the shortest trip that can take in the coast, the caves, the ` +
      `geothermal field and the mountains without any of them becoming a photo stop. ` +
      `It is the tour we would book ourselves.`,
    highlights: [
      "Cathedral Cove and the Coromandel coast",
      "The Waitomo glowworm grotto by boat",
      "Wai-O-Tapu and the geothermal field",
      "Huka Falls and Lake Taupō",
      "A day in Tongariro National Park",
    ],
    itinerary: [
      {
        title: "Auckland to the Coromandel",
        body:
          `East out of Auckland along the Firth of Thames, then the coast road round ` +
          `to Hahei. Cathedral Cove in the afternoon light, and Hot Water Beach if ` +
          `the tide is doing the right thing — you dig your own pool in the sand and ` +
          `hot water comes up through it.`,
      },
      {
        title: "South through Waitomo",
        body:
          `Down the Coromandel and inland to Waitomo. The cave system and the ` +
          `glowworm grotto by boat, then east to Rotorua for two nights.`,
      },
      {
        title: "Geothermal Rotorua",
        body:
          `Wai-O-Tapu's full circuit in the morning. Whakarewarewa Forest and the ` +
          `redwoods after lunch. An unhurried day, deliberately placed in the middle ` +
          `of the trip.`,
      },
      {
        title: "Taupō and the plateau",
        body:
          `South to Huka Falls and the lake. Ōrākei Kōrako's terraces by boat, then ` +
          `on to the Tongariro area for the night, with Ruapehu ahead of you.`,
      },
      {
        title: "Tongariro, then north",
        body:
          `A day in the national park — the Taranaki Falls loop, or a section of the ` +
          `Crossing if the weather and the group are both up for it.\n\n` +
          `Then north through the Desert Road and back to Auckland, arriving evening.`,
      },
    ],
  },

  "east-cape-five": {
    name: "East Cape",
    tagline: "The road most people skip, which is exactly why we go",
    summary:
      `The East Cape is the emptiest coastline in the North Island and the hardest ` +
      `to reach — long driving days, few towns, and almost no tour buses. It is also ` +
      `where the sun first hits inhabited land each day. If you have been to New ` +
      `Zealand before, this is the one to do.`,
    highlights: [
      "First light of the day at the East Cape lighthouse",
      "Tolaga Bay wharf, at 660 metres the longest in the country",
      "Lake Waikaremoana, still and black, ringed by old-growth forest",
      "Long empty roads, which are the actual attraction",
    ],
    itinerary: [
      {
        title: "Rotorua to Ōpōtiki",
        body:
          `East through the Bay of Plenty, along the coast to Ōpōtiki. The road ` +
          `changes character here — the towns thin out and the coast opens up. ` +
          `Night at Ōpōtiki.`,
      },
      {
        title: "Around the Cape",
        body:
          `The long day, and the best one. State Highway 35 round the top of the ` +
          `Cape: pōhutukawa hanging over the road, bays with nobody on them, and a ` +
          `pace set by how often you want to stop. Night near Te Araroa.`,
      },
      {
        title: "First light, then south",
        body:
          `An early climb to the East Cape lighthouse for sunrise — around 750 steps, ` +
          `and the first inhabited place on earth to see the day.\n\n` +
          `South in the afternoon to Tolaga Bay and its extraordinary wharf. Night ` +
          `near Gisborne.`,
      },
      {
        title: "Inland to Waikaremoana",
        body:
          `West into Te Urewera — dense old-growth forest, and a road that takes ` +
          `longer than the map suggests. Lake Waikaremoana is black, still, and ` +
          `almost silent. A short walk on the lake track in the afternoon.`,
      },
      {
        title: "Out through the forest",
        body:
          `A slow morning at the lake, then back through the forest and north to ` +
          `Rotorua, arriving late afternoon.\n\n` +
          `You will have covered around 1,100km and seen perhaps six other tourists.`,
      },
    ],
  },
} as const;

export type TourCopy = typeof enTours;
