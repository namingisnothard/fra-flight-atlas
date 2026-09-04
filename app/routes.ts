export type Route = { city: string; iata: string; country: string; airlines: string[]; frequency: string; lat: number; lng: number; timezone: string };

export const routes: Route[] = [
  {
    "city": "Munich",
    "iata": "MUC",
    "country": "Germany",
    "airlines": [
      "Condor",
      "Eurowings Discover",
      "Kuwait Airways",
      "Lufthansa"
    ],
    "frequency": "18× daily",
    "lat": 48.353802,
    "lng": 11.7861,
    "timezone": "Europe/Berlin"
  },
  {
    "city": "Berlin",
    "iata": "BER",
    "country": "Germany",
    "airlines": [
      "Condor",
      "Lufthansa",
      "Lufthansa City Airlines"
    ],
    "frequency": "15× daily",
    "lat": 52.361738,
    "lng": 13.502341,
    "timezone": "Europe/Berlin"
  },
  {
    "city": "Vienna",
    "iata": "VIE",
    "country": "Austria",
    "airlines": [
      "Austrian",
      "Condor",
      "PJV"
    ],
    "frequency": "15× daily",
    "lat": 48.110298,
    "lng": 16.5697,
    "timezone": "Europe/Vienna"
  },
  {
    "city": "London",
    "iata": "LHR",
    "country": "United Kingdom",
    "airlines": [
      "British Airways",
      "EAT Leipzig",
      "Lufthansa",
      "Lufthansa City Airlines"
    ],
    "frequency": "15× daily",
    "lat": 51.470748,
    "lng": -0.459909,
    "timezone": "Europe/London"
  },
  {
    "city": "Palma De Mallorca",
    "iata": "PMI",
    "country": "Spain",
    "airlines": [
      "Condor",
      "Eurowings Discover",
      "Lufthansa",
      "TUIfly"
    ],
    "frequency": "14× daily",
    "lat": 39.551701,
    "lng": 2.73881,
    "timezone": "Europe/Madrid"
  },
  {
    "city": "Hamburg",
    "iata": "HAM",
    "country": "Germany",
    "airlines": [
      "AWH",
      "Condor",
      "Lufthansa",
      "Lufthansa City Airlines"
    ],
    "frequency": "14× daily",
    "lat": 53.630402,
    "lng": 9.98823,
    "timezone": "Europe/Berlin"
  },
  {
    "city": "Zurich",
    "iata": "ZRH",
    "country": "Switzerland",
    "airlines": [
      "Air Dolomiti",
      "Condor",
      "Lufthansa",
      "SWISS"
    ],
    "frequency": "14× daily",
    "lat": 47.458056,
    "lng": 8.548056,
    "timezone": "Europe/Zurich"
  },
  {
    "city": "Rome",
    "iata": "FCO",
    "country": "Italy",
    "airlines": [
      "Condor",
      "easyJet",
      "ITA Airways",
      "Lufthansa"
    ],
    "frequency": "13× daily",
    "lat": 41.804532,
    "lng": 12.251998,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Paris",
    "iata": "CDG",
    "country": "France",
    "airlines": [
      "Air France",
      "Condor",
      "Eurowings Discover",
      "Lufthansa"
    ],
    "frequency": "12× daily",
    "lat": 49.00896,
    "lng": 2.554117,
    "timezone": "Europe/Paris"
  },
  {
    "city": "Amsterdam",
    "iata": "AMS",
    "country": "Netherlands",
    "airlines": [
      "Cathay Pacific",
      "KLM",
      "Korean Air",
      "Lufthansa"
    ],
    "frequency": "11× daily",
    "lat": 52.308601,
    "lng": 4.76389,
    "timezone": "Europe/Amsterdam"
  },
  {
    "city": "Madrid",
    "iata": "MAD",
    "country": "Spain",
    "airlines": [
      "Air Europa",
      "EAT Leipzig",
      "Iberia",
      "Lufthansa"
    ],
    "frequency": "10× daily",
    "lat": 40.493407,
    "lng": -3.572249,
    "timezone": "Europe/Madrid"
  },
  {
    "city": "Barcelona",
    "iata": "BCN",
    "country": "Spain",
    "airlines": [
      "Condor",
      "Lufthansa"
    ],
    "frequency": "10× daily",
    "lat": 41.2971,
    "lng": 2.07846,
    "timezone": "Europe/Madrid"
  },
  {
    "city": "Prague",
    "iata": "PRG",
    "country": "Czechia",
    "airlines": [
      "Condor",
      "Lufthansa",
      "MPC"
    ],
    "frequency": "9× daily",
    "lat": 50.100874,
    "lng": 14.259911,
    "timezone": "Europe/Prague"
  },
  {
    "city": "Budapest",
    "iata": "BUD",
    "country": "Hungary",
    "airlines": [
      "Condor",
      "Lufthansa"
    ],
    "frequency": "9× daily",
    "lat": 47.43018,
    "lng": 19.262393,
    "timezone": "Europe/Budapest"
  },
  {
    "city": "Istanbul",
    "iata": "IST",
    "country": "Türkiye",
    "airlines": [
      "Lufthansa",
      "Turkish Airlines"
    ],
    "frequency": "8× daily",
    "lat": 41.274874,
    "lng": 28.732136,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Venice",
    "iata": "VCE",
    "country": "Italy",
    "airlines": [
      "Condor",
      "Excellent Air",
      "Lufthansa",
      "PJJ"
    ],
    "frequency": "8× daily",
    "lat": 45.505299,
    "lng": 12.3519,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Lisbon",
    "iata": "LIS",
    "country": "Portugal",
    "airlines": [
      "Lufthansa",
      "TAP Air Portugal"
    ],
    "frequency": "8× daily",
    "lat": 38.7813,
    "lng": -9.13592,
    "timezone": "Europe/Lisbon"
  },
  {
    "city": "Warsaw",
    "iata": "WAW",
    "country": "Poland",
    "airlines": [
      "LOT - Polish Airlines",
      "Lufthansa"
    ],
    "frequency": "8× daily",
    "lat": 52.165699,
    "lng": 20.9671,
    "timezone": "Europe/Warsaw"
  },
  {
    "city": "Athens",
    "iata": "ATH",
    "country": "Greece",
    "airlines": [
      "Aegean Airlines",
      "Lufthansa",
      "Sky Express"
    ],
    "frequency": "7× daily",
    "lat": 37.936401,
    "lng": 23.9445,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Copenhagen",
    "iata": "CPH",
    "country": "Denmark",
    "airlines": [
      "Lufthansa",
      "SAS"
    ],
    "frequency": "7× daily",
    "lat": 55.617900848389,
    "lng": 12.656000137329,
    "timezone": "Europe/Copenhagen"
  },
  {
    "city": "Milan",
    "iata": "MXP",
    "country": "Italy",
    "airlines": [
      "Condor",
      "Lufthansa"
    ],
    "frequency": "7× daily",
    "lat": 45.6306,
    "lng": 8.72811,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Antalya",
    "iata": "AYT",
    "country": "Türkiye",
    "airlines": [
      "Freebird Airlines",
      "Lufthansa",
      "Pegasus",
      "Sun Express"
    ],
    "frequency": "7× daily",
    "lat": 36.898701,
    "lng": 30.800501,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Dublin",
    "iata": "DUB",
    "country": "Ireland",
    "airlines": [
      "Aer Lingus",
      "Lufthansa"
    ],
    "frequency": "6× daily",
    "lat": 53.428713,
    "lng": -6.262121,
    "timezone": "Europe/Dublin"
  },
  {
    "city": "Heraklion",
    "iata": "HER",
    "country": "Greece",
    "airlines": [
      "Aegean Airlines",
      "Condor",
      "Eurowings Discover",
      "TUIfly"
    ],
    "frequency": "6× daily",
    "lat": 35.339699,
    "lng": 25.1803,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Brussels",
    "iata": "BRU",
    "country": "Belgium",
    "airlines": [
      "Brussels Airlines",
      "EAT Leipzig"
    ],
    "frequency": "6× daily",
    "lat": 50.901402,
    "lng": 4.48444,
    "timezone": "Europe/Brussels"
  },
  {
    "city": "New York",
    "iata": "JFK",
    "country": "United States",
    "airlines": [
      "Condor",
      "Delta Air Lines",
      "EAT Leipzig",
      "Lufthansa +1 more"
    ],
    "frequency": "6× daily",
    "lat": 40.639447,
    "lng": -73.779317,
    "timezone": "America/New_York"
  },
  {
    "city": "Istanbul",
    "iata": "SAW",
    "country": "Türkiye",
    "airlines": [
      "AJet",
      "Pegasus"
    ],
    "frequency": "6× daily",
    "lat": 40.898602,
    "lng": 29.3092,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Helsinki",
    "iata": "HEL",
    "country": "Finland",
    "airlines": [
      "Finnair",
      "Lufthansa",
      "Lufthansa City Airlines"
    ],
    "frequency": "6× daily",
    "lat": 60.318363,
    "lng": 24.963341,
    "timezone": "Europe/Helsinki"
  },
  {
    "city": "Oslo",
    "iata": "OSL",
    "country": "Norway",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "6× daily",
    "lat": 60.193901,
    "lng": 11.1004,
    "timezone": "Europe/Oslo"
  },
  {
    "city": "Stockholm",
    "iata": "ARN",
    "country": "Sweden",
    "airlines": [
      "Lufthansa",
      "Lufthansa City Airlines"
    ],
    "frequency": "6× daily",
    "lat": 59.64849,
    "lng": 17.928829,
    "timezone": "Europe/Stockholm"
  },
  {
    "city": "Luxembourg",
    "iata": "LUX",
    "country": "Luxembourg",
    "airlines": [
      "Air Dolomiti",
      "Lufthansa"
    ],
    "frequency": "5× daily",
    "lat": 49.626845,
    "lng": 6.212134,
    "timezone": "Europe/Luxembourg"
  },
  {
    "city": "Belgrade",
    "iata": "BEG",
    "country": "Serbia",
    "airlines": [
      "Air Serbia",
      "Lufthansa"
    ],
    "frequency": "5× daily",
    "lat": 44.818401,
    "lng": 20.309099,
    "timezone": "Europe/Belgrade"
  },
  {
    "city": "Zagreb",
    "iata": "ZAG",
    "country": "Croatia",
    "airlines": [
      "Croatia Airlines",
      "Lufthansa"
    ],
    "frequency": "5× daily",
    "lat": 45.742901,
    "lng": 16.0688,
    "timezone": "Europe/Zagreb"
  },
  {
    "city": "Tel Aviv Yafo",
    "iata": "TLV",
    "country": "Israel",
    "airlines": [
      "Condor",
      "El Al",
      "Israir Airlines",
      "Lufthansa"
    ],
    "frequency": "5× daily",
    "lat": 32.011398,
    "lng": 34.8867,
    "timezone": "Asia/Jerusalem"
  },
  {
    "city": "Chicago",
    "iata": "ORD",
    "country": "United States",
    "airlines": [
      "AAE",
      "Lufthansa",
      "United Airlines"
    ],
    "frequency": "5× daily",
    "lat": 41.9786,
    "lng": -87.9048,
    "timezone": "America/Chicago"
  },
  {
    "city": "Kraków",
    "iata": "KRK",
    "country": "Poland",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "5× daily",
    "lat": 50.077702,
    "lng": 19.7848,
    "timezone": "Europe/Warsaw"
  },
  {
    "city": "Bucharest",
    "iata": "OTP",
    "country": "Romania",
    "airlines": [
      "Lufthansa",
      "TAROM"
    ],
    "frequency": "5× daily",
    "lat": 44.571792,
    "lng": 26.103285,
    "timezone": "Europe/Bucharest"
  },
  {
    "city": "Düsseldorf",
    "iata": "DUS",
    "country": "Germany",
    "airlines": [
      "Lufthansa",
      "Lufthansa City Airlines",
      "PJV"
    ],
    "frequency": "5× daily",
    "lat": 51.289501,
    "lng": 6.76678,
    "timezone": "Europe/Berlin"
  },
  {
    "city": "Hanover",
    "iata": "HAJ",
    "country": "Germany",
    "airlines": [
      "AWH",
      "Lufthansa"
    ],
    "frequency": "5× daily",
    "lat": 52.461102,
    "lng": 9.68508,
    "timezone": "Europe/Berlin"
  },
  {
    "city": "San Francisco",
    "iata": "SFO",
    "country": "United States",
    "airlines": [
      "Condor",
      "Lufthansa",
      "United Airlines"
    ],
    "frequency": "5× daily",
    "lat": 37.619806,
    "lng": -122.374821,
    "timezone": "America/Los_Angeles"
  },
  {
    "city": "Shanghai",
    "iata": "PVG",
    "country": "China",
    "airlines": [
      "Air China",
      "China Eastern Airlines",
      "China Southern Airlines",
      "Lufthansa"
    ],
    "frequency": "5× daily",
    "lat": 31.1434,
    "lng": 121.805,
    "timezone": "Asia/Shanghai"
  },
  {
    "city": "Cairo",
    "iata": "CAI",
    "country": "Egypt",
    "airlines": [
      "Condor",
      "EgyptAir",
      "Lufthansa"
    ],
    "frequency": "5× daily",
    "lat": 30.111534,
    "lng": 31.396694,
    "timezone": "Africa/Cairo"
  },
  {
    "city": "Nice",
    "iata": "NCE",
    "country": "France",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "5× daily",
    "lat": 43.658401,
    "lng": 7.21587,
    "timezone": "Europe/Paris"
  },
  {
    "city": "Salzburg",
    "iata": "SZG",
    "country": "Austria",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "5× daily",
    "lat": 47.793301,
    "lng": 13.0043,
    "timezone": "Europe/Vienna"
  },
  {
    "city": "Toronto",
    "iata": "YYZ",
    "country": "Canada",
    "airlines": [
      "Air Canada",
      "Condor",
      "Lufthansa"
    ],
    "frequency": "5× daily",
    "lat": 43.675935,
    "lng": -79.629421,
    "timezone": "America/Toronto"
  },
  {
    "city": "Washington",
    "iata": "IAD",
    "country": "United States",
    "airlines": [
      "Lufthansa",
      "United Airlines"
    ],
    "frequency": "5× daily",
    "lat": 38.9445,
    "lng": -77.455803,
    "timezone": "America/New_York"
  },
  {
    "city": "Billund",
    "iata": "BLL",
    "country": "Denmark",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "4× daily",
    "lat": 55.740335,
    "lng": 9.157019,
    "timezone": "Europe/Copenhagen"
  },
  {
    "city": "Geneva",
    "iata": "GVA",
    "country": "Switzerland",
    "airlines": [
      "Lufthansa",
      "SWISS"
    ],
    "frequency": "4× daily",
    "lat": 46.238098,
    "lng": 6.10895,
    "timezone": "Europe/Zurich"
  },
  {
    "city": "Graz",
    "iata": "GRZ",
    "country": "Austria",
    "airlines": [
      "Air Dolomiti"
    ],
    "frequency": "4× daily",
    "lat": 46.9911,
    "lng": 15.4396,
    "timezone": "Europe/Vienna"
  },
  {
    "city": "Firenze",
    "iata": "FLR",
    "country": "Italy",
    "airlines": [
      "Air Dolomiti"
    ],
    "frequency": "4× daily",
    "lat": 43.808558,
    "lng": 11.202822,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Leipzig",
    "iata": "LEJ",
    "country": "Germany",
    "airlines": [
      "EAT Leipzig",
      "Lufthansa"
    ],
    "frequency": "4× daily",
    "lat": 51.420657,
    "lng": 12.232705,
    "timezone": "Europe/Berlin"
  },
  {
    "city": "Lyon",
    "iata": "LYS",
    "country": "France",
    "airlines": [
      "Air Dolomiti",
      "Lufthansa"
    ],
    "frequency": "4× daily",
    "lat": 45.725996,
    "lng": 5.090139,
    "timezone": "Europe/Paris"
  },
  {
    "city": "Bologna",
    "iata": "BLQ",
    "country": "Italy",
    "airlines": [
      "Air Dolomiti",
      "Lufthansa"
    ],
    "frequency": "4× daily",
    "lat": 44.5354,
    "lng": 11.2887,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Bilbao",
    "iata": "BIO",
    "country": "Spain",
    "airlines": [
      "Lufthansa",
      "Lufthansa City Airlines"
    ],
    "frequency": "4× daily",
    "lat": 43.301102,
    "lng": -2.91061,
    "timezone": "Europe/Madrid"
  },
  {
    "city": "Nuremberg",
    "iata": "NUE",
    "country": "Germany",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "4× daily",
    "lat": 49.498699,
    "lng": 11.078056,
    "timezone": "Europe/Berlin"
  },
  {
    "city": "Goteborg",
    "iata": "GOT",
    "country": "Sweden",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "4× daily",
    "lat": 57.6628,
    "lng": 12.2798,
    "timezone": "Europe/Stockholm"
  },
  {
    "city": "İzmir",
    "iata": "ADB",
    "country": "Türkiye",
    "airlines": [
      "Lufthansa",
      "Pegasus",
      "Sun Express"
    ],
    "frequency": "4× daily",
    "lat": 38.2924,
    "lng": 27.157,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Porto",
    "iata": "OPO",
    "country": "Portugal",
    "airlines": [
      "Eurowings Discover",
      "Lufthansa",
      "TUIfly"
    ],
    "frequency": "4× daily",
    "lat": 41.2481002808,
    "lng": -8.68138980865,
    "timezone": "Europe/Lisbon"
  },
  {
    "city": "Seoul",
    "iata": "ICN",
    "country": "South Korea",
    "airlines": [
      "Air Incheon",
      "Asiana Airlines",
      "Korean Air",
      "Lufthansa +1 more"
    ],
    "frequency": "4× daily",
    "lat": 37.469101,
    "lng": 126.450996,
    "timezone": "Asia/Seoul"
  },
  {
    "city": "Tunis",
    "iata": "TUN",
    "country": "Tunisia",
    "airlines": [
      "Lufthansa",
      "Nouvelair Tunisie",
      "Tunisair"
    ],
    "frequency": "4× daily",
    "lat": 36.851002,
    "lng": 10.2272,
    "timezone": "Africa/Tunis"
  },
  {
    "city": "London",
    "iata": "LGW",
    "country": "United Kingdom",
    "airlines": [
      "Condor"
    ],
    "frequency": "4× daily",
    "lat": 51.148744,
    "lng": -0.185739,
    "timezone": "Europe/London"
  },
  {
    "city": "Manchester",
    "iata": "MAN",
    "country": "United Kingdom",
    "airlines": [
      "Lufthansa",
      "Lufthansa City Airlines"
    ],
    "frequency": "4× daily",
    "lat": 53.349375,
    "lng": -2.279521,
    "timezone": "Europe/London"
  },
  {
    "city": "Reykjavik",
    "iata": "KEF",
    "country": "Iceland",
    "airlines": [
      "Icelandair",
      "Lufthansa"
    ],
    "frequency": "4× daily",
    "lat": 63.985001,
    "lng": -22.6056,
    "timezone": "Atlantic/Reykjavik"
  },
  {
    "city": "Split",
    "iata": "SPU",
    "country": "Croatia",
    "airlines": [
      "Condor",
      "Croatia Airlines",
      "Eurowings Discover"
    ],
    "frequency": "4× daily",
    "lat": 43.538898,
    "lng": 16.298,
    "timezone": "Europe/Zagreb"
  },
  {
    "city": "Wrocław",
    "iata": "WRO",
    "country": "Poland",
    "airlines": [
      "Air Dolomiti",
      "Lufthansa"
    ],
    "frequency": "4× daily",
    "lat": 51.103719,
    "lng": 16.882096,
    "timezone": "Europe/Warsaw"
  },
  {
    "city": "Bâle/Mulhouse",
    "iata": "BSL",
    "country": "France",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 47.60068,
    "lng": 7.521117,
    "timezone": "Europe/Paris"
  },
  {
    "city": "Bangkok",
    "iata": "BKK",
    "country": "Thailand",
    "airlines": [
      "Condor",
      "Thai Airways International"
    ],
    "frequency": "3× daily",
    "lat": 13.6811,
    "lng": 100.747002,
    "timezone": "Asia/Bangkok"
  },
  {
    "city": "Birmingham",
    "iata": "BHX",
    "country": "United Kingdom",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 52.453899,
    "lng": -1.74803,
    "timezone": "Europe/London"
  },
  {
    "city": "Boston",
    "iata": "BOS",
    "country": "United States",
    "airlines": [
      "Condor",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 42.36197,
    "lng": -71.0079,
    "timezone": "America/New_York"
  },
  {
    "city": "Dresden",
    "iata": "DRS",
    "country": "Germany",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 51.134123,
    "lng": 13.767831,
    "timezone": "Europe/Berlin"
  },
  {
    "city": "Dubai",
    "iata": "DXB",
    "country": "United Arab Emirates",
    "airlines": [
      "Emirates"
    ],
    "frequency": "3× daily",
    "lat": 25.24979,
    "lng": 55.370992,
    "timezone": "Asia/Dubai"
  },
  {
    "city": "Edinburgh",
    "iata": "EDI",
    "country": "United Kingdom",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 55.950145,
    "lng": -3.372288,
    "timezone": "Europe/London"
  },
  {
    "city": "Ljubljana",
    "iata": "LJU",
    "country": "Slovenia",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 46.223701,
    "lng": 14.4576,
    "timezone": "Europe/Ljubljana"
  },
  {
    "city": "Poznań",
    "iata": "POZ",
    "country": "Poland",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 52.421598,
    "lng": 16.823359,
    "timezone": "Europe/Warsaw"
  },
  {
    "city": "Singapore",
    "iata": "SIN",
    "country": "Singapore",
    "airlines": [
      "Lufthansa",
      "Singapore Airlines"
    ],
    "frequency": "3× daily",
    "lat": 1.35019,
    "lng": 103.994003,
    "timezone": "Asia/Singapore"
  },
  {
    "city": "Sofia",
    "iata": "SOF",
    "country": "Bulgaria",
    "airlines": [
      "Bulgaria Air",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 42.696357,
    "lng": 23.417671,
    "timezone": "Europe/Sofia"
  },
  {
    "city": "Thessaloniki",
    "iata": "SKG",
    "country": "Greece",
    "airlines": [
      "Aegean Airlines",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 40.51928,
    "lng": 22.970009,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Tokyo",
    "iata": "HND",
    "country": "Japan",
    "airlines": [
      "ANA",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 35.549678,
    "lng": 139.786958,
    "timezone": "Asia/Tokyo"
  },
  {
    "city": "Vancouver",
    "iata": "YVR",
    "country": "Canada",
    "airlines": [
      "Air Canada",
      "Condor",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 49.193901,
    "lng": -123.183998,
    "timezone": "America/Vancouver"
  },
  {
    "city": "Los Angeles",
    "iata": "LAX",
    "country": "United States",
    "airlines": [
      "Condor",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 33.942501,
    "lng": -118.407997,
    "timezone": "America/Los_Angeles"
  },
  {
    "city": "Riga",
    "iata": "RIX",
    "country": "Latvia",
    "airlines": [
      "airBaltic",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 56.920752,
    "lng": 23.970711,
    "timezone": "Europe/Riga"
  },
  {
    "city": "São Paulo",
    "iata": "GRU",
    "country": "Brazil",
    "airlines": [
      "LATAM",
      "LATAM Brasil",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": -23.431274,
    "lng": -46.469954,
    "timezone": "America/Sao_Paulo"
  },
  {
    "city": "Gdańsk",
    "iata": "GDN",
    "country": "Poland",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 54.377602,
    "lng": 18.4662,
    "timezone": "Europe/Warsaw"
  },
  {
    "city": "Luqa",
    "iata": "MLA",
    "country": "Malta",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 35.845932,
    "lng": 14.491546,
    "timezone": "Europe/Malta"
  },
  {
    "city": "Nápoli",
    "iata": "NAP",
    "country": "Italy",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 40.886002,
    "lng": 14.2908,
    "timezone": "Europe/Rome"
  },
  {
    "city": "New Delhi",
    "iata": "DEL",
    "country": "India",
    "airlines": [
      "Air India",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 28.55563,
    "lng": 77.09519,
    "timezone": "Asia/Kolkata"
  },
  {
    "city": "Valencia",
    "iata": "VLC",
    "country": "Spain",
    "airlines": [
      "Lufthansa",
      "Lufthansa City Airlines"
    ],
    "frequency": "3× daily",
    "lat": 39.489162,
    "lng": -0.480961,
    "timezone": "Europe/Madrid"
  },
  {
    "city": "Bergen",
    "iata": "BGO",
    "country": "Norway",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 60.2934,
    "lng": 5.21814,
    "timezone": "Europe/Oslo"
  },
  {
    "city": "Dallas-Fort Worth",
    "iata": "DFW",
    "country": "United States",
    "airlines": [
      "American Airlines",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 32.896801,
    "lng": -97.038002,
    "timezone": "America/Chicago"
  },
  {
    "city": "Doha",
    "iata": "DOH",
    "country": "Qatar",
    "airlines": [
      "Qatar Airways"
    ],
    "frequency": "3× daily",
    "lat": 25.273056,
    "lng": 51.608056,
    "timezone": "Asia/Qatar"
  },
  {
    "city": "Málaga",
    "iata": "AGP",
    "country": "Spain",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 36.6749,
    "lng": -4.49911,
    "timezone": "Europe/Madrid"
  },
  {
    "city": "Milan",
    "iata": "LIN",
    "country": "Italy",
    "airlines": [
      "Air Dolomiti",
      "easyJet"
    ],
    "frequency": "3× daily",
    "lat": 45.445099,
    "lng": 9.27674,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Tallinn",
    "iata": "TLL",
    "country": "Estonia",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 59.413246,
    "lng": 24.83264,
    "timezone": "Europe/Tallinn"
  },
  {
    "city": "Vilnius",
    "iata": "VNO",
    "country": "Lithuania",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 54.634102,
    "lng": 25.285801,
    "timezone": "Europe/Vilnius"
  },
  {
    "city": "Atlanta",
    "iata": "ATL",
    "country": "United States",
    "airlines": [
      "Delta Air Lines",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 33.6367,
    "lng": -84.428101,
    "timezone": "America/New_York"
  },
  {
    "city": "Chişinău",
    "iata": "RMO",
    "country": "Moldova",
    "airlines": [
      "HiSky",
      "HYM",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 46.92774,
    "lng": 28.931704,
    "timezone": "Europe/Chisinau"
  },
  {
    "city": "Hong Kong",
    "iata": "HKG",
    "country": "Hong Kong",
    "airlines": [
      "Cathay Pacific",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 22.31184,
    "lng": 113.914862,
    "timezone": "Asia/Hong_Kong"
  },
  {
    "city": "Houston",
    "iata": "IAH",
    "country": "United States",
    "airlines": [
      "Lufthansa",
      "United Airlines"
    ],
    "frequency": "3× daily",
    "lat": 29.9844,
    "lng": -95.3414,
    "timezone": "America/Chicago"
  },
  {
    "city": "Hurghada",
    "iata": "HRG",
    "country": "Egypt",
    "airlines": [
      "Air Cairo",
      "Condor",
      "Nesma Airlines",
      "TUIfly"
    ],
    "frequency": "3× daily",
    "lat": 27.176776,
    "lng": 33.796692,
    "timezone": "Africa/Cairo"
  },
  {
    "city": "Montreal",
    "iata": "YUL",
    "country": "Canada",
    "airlines": [
      "Air Canada",
      "Lufthansa"
    ],
    "frequency": "3× daily",
    "lat": 45.467837,
    "lng": -73.742294,
    "timezone": "America/Toronto"
  },
  {
    "city": "Trieste",
    "iata": "TRS",
    "country": "Italy",
    "airlines": [
      "Air Dolomiti",
      "TUIfly"
    ],
    "frequency": "3× daily",
    "lat": 45.827862,
    "lng": 13.466672,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Abu Dhabi",
    "iata": "AUH",
    "country": "United Arab Emirates",
    "airlines": [
      "Etihad Airways"
    ],
    "frequency": "2× daily",
    "lat": 24.440966,
    "lng": 54.649237,
    "timezone": "Asia/Dubai"
  },
  {
    "city": "Marseille",
    "iata": "MRS",
    "country": "France",
    "airlines": [
      "Lufthansa",
      "Lufthansa City Airlines"
    ],
    "frequency": "2× daily",
    "lat": 43.438088,
    "lng": 5.2125,
    "timezone": "Europe/Paris"
  },
  {
    "city": "Olbia",
    "iata": "OLB",
    "country": "Italy",
    "airlines": [
      "Condor",
      "Lufthansa"
    ],
    "frequency": "2× daily",
    "lat": 40.898953,
    "lng": 9.518457,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Rodes Island",
    "iata": "RHO",
    "country": "Greece",
    "airlines": [
      "Condor",
      "Eurowings Discover",
      "TUIfly"
    ],
    "frequency": "2× daily",
    "lat": 36.405399,
    "lng": 28.086201,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Yerevan",
    "iata": "EVN",
    "country": "Armenia",
    "airlines": [
      "Condor",
      "Lufthansa"
    ],
    "frequency": "2× daily",
    "lat": 40.148941,
    "lng": 44.397887,
    "timezone": "Asia/Yerevan"
  },
  {
    "city": "Algiers",
    "iata": "ALG",
    "country": "Algeria",
    "airlines": [
      "Air Algerie",
      "Lufthansa"
    ],
    "frequency": "2× daily",
    "lat": 36.693886,
    "lng": 3.214531,
    "timezone": "Africa/Algiers"
  },
  {
    "city": "Casablanca",
    "iata": "CMN",
    "country": "Morocco",
    "airlines": [
      "Lufthansa",
      "Royal Air Maroc"
    ],
    "frequency": "2× daily",
    "lat": 33.3675,
    "lng": -7.58997,
    "timezone": "Africa/Casablanca"
  },
  {
    "city": "Detroit",
    "iata": "DTW",
    "country": "United States",
    "airlines": [
      "Delta Air Lines",
      "Lufthansa"
    ],
    "frequency": "2× daily",
    "lat": 42.21377,
    "lng": -83.353786,
    "timezone": "America/Detroit"
  },
  {
    "city": "Dubrovnik",
    "iata": "DBV",
    "country": "Croatia",
    "airlines": [
      "Croatia Airlines",
      "Eurowings Discover"
    ],
    "frequency": "2× daily",
    "lat": 42.562247,
    "lng": 18.265543,
    "timezone": "Europe/Zagreb"
  },
  {
    "city": "Gran Canaria Island",
    "iata": "LPA",
    "country": "Spain",
    "airlines": [
      "Condor",
      "Eurowings Discover",
      "TUIfly"
    ],
    "frequency": "2× daily",
    "lat": 27.9319,
    "lng": -15.3866,
    "timezone": "Atlantic/Canary"
  },
  {
    "city": "Ibiza Town",
    "iata": "IBZ",
    "country": "Spain",
    "airlines": [
      "Condor",
      "Eurowings Discover",
      "Lufthansa"
    ],
    "frequency": "2× daily",
    "lat": 38.872898,
    "lng": 1.37312,
    "timezone": "Europe/Madrid"
  },
  {
    "city": "Newark",
    "iata": "EWR",
    "country": "United States",
    "airlines": [
      "Lufthansa",
      "United Airlines"
    ],
    "frequency": "2× daily",
    "lat": 40.6894,
    "lng": -74.170545,
    "timezone": "America/New_York"
  },
  {
    "city": "Sarajevo",
    "iata": "SJJ",
    "country": "Bosnia &amp; Herzegovina",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "2× daily",
    "lat": 43.8246,
    "lng": 18.331499,
    "timezone": "Europe/Sarajevo"
  },
  {
    "city": "Seattle",
    "iata": "SEA",
    "country": "United States",
    "airlines": [
      "Condor",
      "Lufthansa"
    ],
    "frequency": "2× daily",
    "lat": 47.447943,
    "lng": -122.310276,
    "timezone": "America/Los_Angeles"
  },
  {
    "city": "Tirana",
    "iata": "TIA",
    "country": "Albania",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "2× daily",
    "lat": 41.4147,
    "lng": 19.7206,
    "timezone": "Europe/Tirane"
  },
  {
    "city": "Verona",
    "iata": "VRN",
    "country": "Italy",
    "airlines": [
      "Air Dolomiti"
    ],
    "frequency": "2× daily",
    "lat": 45.394955,
    "lng": 10.887303,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Ankara",
    "iata": "ESB",
    "country": "Türkiye",
    "airlines": [
      "AJet",
      "Pegasus",
      "Sun Express"
    ],
    "frequency": "2× daily",
    "lat": 40.128101,
    "lng": 32.995098,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Denver",
    "iata": "DEN",
    "country": "United States",
    "airlines": [
      "Lufthansa",
      "United Airlines"
    ],
    "frequency": "2× daily",
    "lat": 39.860027,
    "lng": -104.673792,
    "timezone": "America/Denver"
  },
  {
    "city": "Kerkyra Island",
    "iata": "CFU",
    "country": "Greece",
    "airlines": [
      "Condor",
      "Eurowings Discover",
      "TUIfly"
    ],
    "frequency": "2× daily",
    "lat": 39.60145,
    "lng": 19.912179,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Linz",
    "iata": "LNZ",
    "country": "Austria",
    "airlines": [
      "Danish Air"
    ],
    "frequency": "2× daily",
    "lat": 48.235362,
    "lng": 14.188128,
    "timezone": "Europe/Vienna"
  },
  {
    "city": "Beijing",
    "iata": "PEK",
    "country": "China",
    "airlines": [
      "Air China"
    ],
    "frequency": "2× daily",
    "lat": 40.077349,
    "lng": 116.596702,
    "timezone": "Asia/Shanghai"
  },
  {
    "city": "Fuerteventura Island",
    "iata": "FUE",
    "country": "Spain",
    "airlines": [
      "Condor",
      "Eurowings Discover",
      "TUIfly"
    ],
    "frequency": "2× daily",
    "lat": 28.4527,
    "lng": -13.8638,
    "timezone": "Atlantic/Canary"
  },
  {
    "city": "Funchal",
    "iata": "FNC",
    "country": "Portugal",
    "airlines": [
      "Condor",
      "Eurowings Discover",
      "TUIfly"
    ],
    "frequency": "2× daily",
    "lat": 32.697812,
    "lng": -16.774613,
    "timezone": "Atlantic/Madeira"
  },
  {
    "city": "Kos Island",
    "iata": "KGS",
    "country": "Greece",
    "airlines": [
      "Condor",
      "Eurowings Discover",
      "TUIfly"
    ],
    "frequency": "2× daily",
    "lat": 36.794523,
    "lng": 27.09115,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Larnarca",
    "iata": "LCA",
    "country": "Cyprus",
    "airlines": [
      "Eurowings Discover",
      "TUIfly"
    ],
    "frequency": "2× daily",
    "lat": 34.875099,
    "lng": 33.624901,
    "timezone": "Asia/Nicosia"
  },
  {
    "city": "Mumbai",
    "iata": "BOM",
    "country": "India",
    "airlines": [
      "Air India",
      "Lufthansa"
    ],
    "frequency": "2× daily",
    "lat": 19.088699,
    "lng": 72.867897,
    "timezone": "Asia/Kolkata"
  },
  {
    "city": "Tenerife Island",
    "iata": "TFS",
    "country": "Spain",
    "airlines": [
      "Condor",
      "Eurowings Discover",
      "TUIfly"
    ],
    "frequency": "2× daily",
    "lat": 28.0445,
    "lng": -16.5725,
    "timezone": "Atlantic/Canary"
  },
  {
    "city": "Calgary",
    "iata": "YYC",
    "country": "Canada",
    "airlines": [
      "Condor",
      "Eurowings Discover"
    ],
    "frequency": "2× daily",
    "lat": 51.118822,
    "lng": -114.009933,
    "timezone": "America/Edmonton"
  },
  {
    "city": "Pisa",
    "iata": "PSA",
    "country": "Italy",
    "airlines": [
      "Air Dolomiti"
    ],
    "frequency": "2× daily",
    "lat": 43.683899,
    "lng": 10.3927,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Faro",
    "iata": "FAO",
    "country": "Portugal",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "2× daily",
    "lat": 37.015909,
    "lng": -7.970939,
    "timezone": "Europe/Lisbon"
  },
  {
    "city": "Jo'anna",
    "iata": "JNB",
    "country": "South Africa",
    "airlines": [
      "Condor",
      "Lufthansa"
    ],
    "frequency": "2× daily",
    "lat": -26.140081,
    "lng": 28.246801,
    "timezone": "Africa/Johannesburg"
  },
  {
    "city": "London",
    "iata": "LCY",
    "country": "United Kingdom",
    "airlines": [
      "Air Dolomiti"
    ],
    "frequency": "2× daily",
    "lat": 51.505299,
    "lng": 0.055278,
    "timezone": "Europe/London"
  },
  {
    "city": "Souda",
    "iata": "CHQ",
    "country": "Greece",
    "airlines": [
      "Condor",
      "Eurowings Discover"
    ],
    "frequency": "2× daily",
    "lat": 35.531207,
    "lng": 24.150673,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Torino",
    "iata": "TRN",
    "country": "Italy",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "2× daily",
    "lat": 45.200802,
    "lng": 7.64963,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Amman",
    "iata": "AMM",
    "country": "Jordan",
    "airlines": [
      "Royal Jordanian"
    ],
    "frequency": "Daily",
    "lat": 31.7226009369,
    "lng": 35.9931983948,
    "timezone": "Asia/Amman"
  },
  {
    "city": "Astana",
    "iata": "NQZ",
    "country": "Kazakhstan",
    "airlines": [
      "Air Astana",
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 51.027035,
    "lng": 71.467094,
    "timezone": "Asia/Almaty"
  },
  {
    "city": "Las Vegas",
    "iata": "LAS",
    "country": "United States",
    "airlines": [
      "Condor",
      "Eurowings Discover"
    ],
    "frequency": "Daily",
    "lat": 36.083361,
    "lng": -115.151817,
    "timezone": "America/Los_Angeles"
  },
  {
    "city": "Taipei",
    "iata": "TPE",
    "country": "Taiwan",
    "airlines": [
      "China Airlines"
    ],
    "frequency": "Daily",
    "lat": 25.0777,
    "lng": 121.233002,
    "timezone": "Asia/Taipei"
  },
  {
    "city": "Tashkent",
    "iata": "TAS",
    "country": "Uzbekistan",
    "airlines": [
      "Centrum Air",
      "MFX",
      "QNT",
      "Taban Airlines +1 more"
    ],
    "frequency": "Daily",
    "lat": 41.2579,
    "lng": 69.281197,
    "timezone": "Asia/Tashkent"
  },
  {
    "city": "Addis Ababa",
    "iata": "ADD",
    "country": "Ethiopia",
    "airlines": [
      "Ethiopian Airlines"
    ],
    "frequency": "Daily",
    "lat": 8.97789,
    "lng": 38.799301,
    "timezone": "Africa/Addis_Ababa"
  },
  {
    "city": "Punta Cana",
    "iata": "PUJ",
    "country": "Dominican Republic",
    "airlines": [
      "Condor",
      "Eurowings Discover"
    ],
    "frequency": "Daily",
    "lat": 18.567093,
    "lng": -68.364558,
    "timezone": "America/Puerto_Rico"
  },
  {
    "city": "Tampa",
    "iata": "TPA",
    "country": "United States",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "Daily",
    "lat": 27.9755,
    "lng": -82.533203,
    "timezone": "America/New_York"
  },
  {
    "city": "Abuja",
    "iata": "ABV",
    "country": "Nigeria",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 9.00679,
    "lng": 7.26317,
    "timezone": "Africa/Lagos"
  },
  {
    "city": "Alicante",
    "iata": "ALC",
    "country": "Spain",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 38.2822,
    "lng": -0.558156,
    "timezone": "Europe/Madrid"
  },
  {
    "city": "Baku",
    "iata": "GYD",
    "country": "Azerbaijan",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 40.47278,
    "lng": 50.050931,
    "timezone": "Asia/Baku"
  },
  {
    "city": "Bangalore",
    "iata": "BLR",
    "country": "India",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 13.1979,
    "lng": 77.706299,
    "timezone": "Asia/Kolkata"
  },
  {
    "city": "Beirut",
    "iata": "BEY",
    "country": "Lebanon",
    "airlines": [
      "Middle East Airlines"
    ],
    "frequency": "Daily",
    "lat": 33.819833,
    "lng": 35.487443,
    "timezone": "Asia/Beirut"
  },
  {
    "city": "Buenos Aires",
    "iata": "EZE",
    "country": "Argentina",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": -34.8222,
    "lng": -58.5358,
    "timezone": "America/Argentina/Buenos_Aires"
  },
  {
    "city": "Cancún",
    "iata": "CUN",
    "country": "Mexico",
    "airlines": [
      "Condor"
    ],
    "frequency": "Daily",
    "lat": 21.040817,
    "lng": -86.87347,
    "timezone": "America/Cancun"
  },
  {
    "city": "Charlotte",
    "iata": "CLT",
    "country": "United States",
    "airlines": [
      "American Airlines"
    ],
    "frequency": "Daily",
    "lat": 35.2140007019043,
    "lng": -80.94309997558594,
    "timezone": "America/New_York"
  },
  {
    "city": "Hanoi",
    "iata": "HAN",
    "country": "Vietnam",
    "airlines": [
      "Vietnam Airlines"
    ],
    "frequency": "Daily",
    "lat": 21.221201,
    "lng": 105.806999,
    "timezone": "Asia/Bangkok"
  },
  {
    "city": "Lanzarote Island",
    "iata": "ACE",
    "country": "Spain",
    "airlines": [
      "Condor",
      "Eurowings Discover",
      "TUIfly"
    ],
    "frequency": "Daily",
    "lat": 28.945499,
    "lng": -13.6052,
    "timezone": "Atlantic/Canary"
  },
  {
    "city": "Manama",
    "iata": "BAH",
    "country": "Bahrain",
    "airlines": [
      "Gulf Air"
    ],
    "frequency": "Daily",
    "lat": 26.267295,
    "lng": 50.63764,
    "timezone": "Asia/Tehran"
  },
  {
    "city": "Mexico City",
    "iata": "MEX",
    "country": "Mexico",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 19.435822,
    "lng": -99.07033,
    "timezone": "America/Mexico_City"
  },
  {
    "city": "Miami",
    "iata": "MIA",
    "country": "United States",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 25.796011,
    "lng": -80.289751,
    "timezone": "America/New_York"
  },
  {
    "city": "Nairobi",
    "iata": "NBO",
    "country": "Kenya",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": -1.318886,
    "lng": 36.928233,
    "timezone": "Africa/Nairobi"
  },
  {
    "city": "Nantes",
    "iata": "NTE",
    "country": "France",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 47.153198,
    "lng": -1.61073,
    "timezone": "Europe/Paris"
  },
  {
    "city": "Raleigh/Durham",
    "iata": "RDU",
    "country": "United States",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 35.878659,
    "lng": -78.7873,
    "timezone": "America/New_York"
  },
  {
    "city": "Rio de Janeiro",
    "iata": "GIG",
    "country": "Brazil",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": -22.809999,
    "lng": -43.250557,
    "timezone": "America/Sao_Paulo"
  },
  {
    "city": "Santiago de Compostela",
    "iata": "SCQ",
    "country": "Spain",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 42.896301,
    "lng": -8.41514,
    "timezone": "Europe/Madrid"
  },
  {
    "city": "Tokyo",
    "iata": "NRT",
    "country": "Japan",
    "airlines": [
      "JAL"
    ],
    "frequency": "Daily",
    "lat": 35.76858,
    "lng": 140.388714,
    "timezone": "Asia/Tokyo"
  },
  {
    "city": "Ulaan Baatar",
    "iata": "UBN",
    "country": "Mongolia",
    "airlines": [
      "Miat - Mongolian Airlines"
    ],
    "frequency": "Daily",
    "lat": 47.646916,
    "lng": 106.819833,
    "timezone": "Asia/Ulaanbaatar"
  },
  {
    "city": "Varna",
    "iata": "VAR",
    "country": "Bulgaria",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "Daily",
    "lat": 43.232101,
    "lng": 27.8251,
    "timezone": "Europe/Sofia"
  },
  {
    "city": "Windhoek",
    "iata": "WDH",
    "country": "Namibia",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "Daily",
    "lat": -22.4799,
    "lng": 17.4709,
    "timezone": "Africa/Windhoek"
  },
  {
    "city": "Zanzibar",
    "iata": "ZNZ",
    "country": "Tanzania",
    "airlines": [
      "Condor",
      "Eurowings Discover"
    ],
    "frequency": "Daily",
    "lat": -6.22202,
    "lng": 39.224899,
    "timezone": "Africa/Dar_es_Salaam"
  },
  {
    "city": "Almaty",
    "iata": "ALA",
    "country": "Kazakhstan",
    "airlines": [
      "Air Astana",
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 43.354267,
    "lng": 77.042828,
    "timezone": "Asia/Almaty"
  },
  {
    "city": "Catania",
    "iata": "CTA",
    "country": "Italy",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 37.466801,
    "lng": 15.0664,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Chennai",
    "iata": "MAA",
    "country": "India",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 12.990005,
    "lng": 80.169296,
    "timezone": "Asia/Kolkata"
  },
  {
    "city": "Dalaman",
    "iata": "DLM",
    "country": "Türkiye",
    "airlines": [
      "Sun Express",
      "TUIfly"
    ],
    "frequency": "Daily",
    "lat": 36.7131,
    "lng": 28.7925,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Houmt El Souk",
    "iata": "DJE",
    "country": "Tunisia",
    "airlines": [
      "Eurowings Discover",
      "Nouvelair Tunisie",
      "TUIfly",
      "Tunisair"
    ],
    "frequency": "Daily",
    "lat": 33.873719,
    "lng": 10.7773,
    "timezone": "Africa/Tunis"
  },
  {
    "city": "Jerez de la Forntera",
    "iata": "XRY",
    "country": "Spain",
    "airlines": [
      "Condor",
      "Eurowings Discover",
      "TUIfly"
    ],
    "frequency": "Daily",
    "lat": 36.744598,
    "lng": -6.06011,
    "timezone": "Europe/Madrid"
  },
  {
    "city": "Orlando",
    "iata": "MCO",
    "country": "United States",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "Daily",
    "lat": 28.429399490356445,
    "lng": -81.30899810791016,
    "timezone": "America/New_York"
  },
  {
    "city": "Palermo",
    "iata": "PMO",
    "country": "Italy",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 38.175999,
    "lng": 13.091,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Philadelphia",
    "iata": "PHL",
    "country": "United States",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "Daily",
    "lat": 39.871899,
    "lng": -75.241096,
    "timezone": "America/New_York"
  },
  {
    "city": "Tromsø",
    "iata": "TOS",
    "country": "Norway",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Daily",
    "lat": 69.683296,
    "lng": 18.9189,
    "timezone": "Europe/Oslo"
  },
  {
    "city": "Bogotá",
    "iata": "BOG",
    "country": "Colombia",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "6× weekly",
    "lat": 4.70159,
    "lng": -74.1469,
    "timezone": "America/Bogota"
  },
  {
    "city": "Cagliari",
    "iata": "CAG",
    "country": "Italy",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "6× weekly",
    "lat": 39.251499,
    "lng": 9.05428,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Guangzhou",
    "iata": "CAN",
    "country": "China",
    "airlines": [
      "China Southern Airlines"
    ],
    "frequency": "6× weekly",
    "lat": 23.392401,
    "lng": 113.299004,
    "timezone": "Asia/Shanghai"
  },
  {
    "city": "Halifax",
    "iata": "YHZ",
    "country": "Canada",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "6× weekly",
    "lat": 44.8807983398,
    "lng": -63.5085983276,
    "timezone": "America/Halifax"
  },
  {
    "city": "Ho Chi Minh City",
    "iata": "SGN",
    "country": "Vietnam",
    "airlines": [
      "Vietnam Airlines"
    ],
    "frequency": "6× weekly",
    "lat": 10.8188,
    "lng": 106.652,
    "timezone": "Asia/Ho_Chi_Minh"
  },
  {
    "city": "Hyderabad",
    "iata": "HYD",
    "country": "India",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "6× weekly",
    "lat": 17.231318,
    "lng": 78.429855,
    "timezone": "Asia/Kolkata"
  },
  {
    "city": "Kalamata",
    "iata": "KLX",
    "country": "Greece",
    "airlines": [
      "Condor",
      "Eurowings Discover"
    ],
    "frequency": "6× weekly",
    "lat": 37.06829833984375,
    "lng": 22.02549934387207,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Lagos",
    "iata": "LOS",
    "country": "Nigeria",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "6× weekly",
    "lat": 6.57737,
    "lng": 3.32116,
    "timezone": "Africa/Lagos"
  },
  {
    "city": "Lamezia Terme",
    "iata": "SUF",
    "country": "Italy",
    "airlines": [
      "Condor",
      "Lufthansa"
    ],
    "frequency": "6× weekly",
    "lat": 38.906214,
    "lng": 16.246007,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Podgorica",
    "iata": "TGD",
    "country": "Montenegro",
    "airlines": [
      "Air Montenegro",
      "Interjet"
    ],
    "frequency": "6× weekly",
    "lat": 42.359402,
    "lng": 19.2519,
    "timezone": "Europe/Podgorica"
  },
  {
    "city": "Ponta Delgada",
    "iata": "PDL",
    "country": "Portugal",
    "airlines": [
      "Azores Airlines",
      "Lufthansa"
    ],
    "frequency": "6× weekly",
    "lat": 37.7411994934,
    "lng": -25.6979007721,
    "timezone": "Atlantic/Azores"
  },
  {
    "city": "Port Louis",
    "iata": "MRU",
    "country": "Mauritius",
    "airlines": [
      "Condor"
    ],
    "frequency": "6× weekly",
    "lat": -20.430201,
    "lng": 57.683601,
    "timezone": "Indian/Mauritius"
  },
  {
    "city": "Pula",
    "iata": "PUY",
    "country": "Croatia",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "6× weekly",
    "lat": 44.893501,
    "lng": 13.9222,
    "timezone": "Europe/Zagreb"
  },
  {
    "city": "Saint Louis",
    "iata": "STL",
    "country": "United States",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "6× weekly",
    "lat": 38.748697,
    "lng": -90.370003,
    "timezone": "America/Chicago"
  },
  {
    "city": "Santorini Island",
    "iata": "JTR",
    "country": "Greece",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "6× weekly",
    "lat": 36.400045,
    "lng": 25.478638,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Seville",
    "iata": "SVQ",
    "country": "Spain",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "6× weekly",
    "lat": 37.417999,
    "lng": -5.89311,
    "timezone": "Europe/Madrid"
  },
  {
    "city": "Adana",
    "iata": "COV",
    "country": "Türkiye",
    "airlines": [
      "Sun Express"
    ],
    "frequency": "5× weekly",
    "lat": 36.891478,
    "lng": 35.071235,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Bari",
    "iata": "BRI",
    "country": "Italy",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "5× weekly",
    "lat": 41.138901,
    "lng": 16.760599,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Bastia/Poretta",
    "iata": "BIA",
    "country": "France",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "5× weekly",
    "lat": 42.5527,
    "lng": 9.48373,
    "timezone": "Europe/Paris"
  },
  {
    "city": "Bodrum",
    "iata": "BJV",
    "country": "Türkiye",
    "airlines": [
      "Sun Express"
    ],
    "frequency": "5× weekly",
    "lat": 37.249314,
    "lng": 27.66401,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Cape Town",
    "iata": "CPT",
    "country": "South Africa",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "5× weekly",
    "lat": -33.97403,
    "lng": 18.604333,
    "timezone": "Africa/Johannesburg"
  },
  {
    "city": "Evenes",
    "iata": "EVE",
    "country": "Norway",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "5× weekly",
    "lat": 68.491302,
    "lng": 16.678101,
    "timezone": "Europe/Oslo"
  },
  {
    "city": "Jeddah",
    "iata": "JED",
    "country": "Saudi Arabia",
    "airlines": [
      "Saudi Arabian Airlines"
    ],
    "frequency": "5× weekly",
    "lat": 21.680241,
    "lng": 39.157436,
    "timezone": "Asia/Riyadh"
  },
  {
    "city": "Luanda",
    "iata": "NBJ",
    "country": "Angola",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "5× weekly",
    "lat": -9.050734,
    "lng": 13.499078,
    "timezone": "Africa/Luanda"
  },
  {
    "city": "Menorca Island",
    "iata": "MAH",
    "country": "Spain",
    "airlines": [
      "Eurowings Discover",
      "TUIfly"
    ],
    "frequency": "5× weekly",
    "lat": 39.862598,
    "lng": 4.21865,
    "timezone": "Europe/Madrid"
  },
  {
    "city": "Mombasa",
    "iata": "MBA",
    "country": "Kenya",
    "airlines": [
      "Condor",
      "Eurowings Discover"
    ],
    "frequency": "5× weekly",
    "lat": -4.03483,
    "lng": 39.5942,
    "timezone": "Africa/Nairobi"
  },
  {
    "city": "Ranón",
    "iata": "OVD",
    "country": "Spain",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "5× weekly",
    "lat": 43.563599,
    "lng": -6.03462,
    "timezone": "Europe/Madrid"
  },
  {
    "city": "Stuttgart",
    "iata": "STR",
    "country": "Germany",
    "airlines": [
      "ASL Airlines Belgium",
      "Nile Air"
    ],
    "frequency": "5× weekly",
    "lat": 48.689899,
    "lng": 9.22196,
    "timezone": "Europe/Berlin"
  },
  {
    "city": "Zadar",
    "iata": "ZAD",
    "country": "Croatia",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "5× weekly",
    "lat": 44.096986,
    "lng": 15.353565,
    "timezone": "Europe/Zagreb"
  },
  {
    "city": "Zakynthos Island",
    "iata": "ZTH",
    "country": "Greece",
    "airlines": [
      "Condor",
      "Eurowings Discover"
    ],
    "frequency": "5× weekly",
    "lat": 37.7509,
    "lng": 20.8843,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Austin",
    "iata": "AUS",
    "country": "United States",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "4× weekly",
    "lat": 30.197535,
    "lng": -97.662015,
    "timezone": "America/Chicago"
  },
  {
    "city": "Burgas",
    "iata": "BOJ",
    "country": "Bulgaria",
    "airlines": [
      "Eurowings Discover",
      "TUIfly"
    ],
    "frequency": "4× weekly",
    "lat": 42.569917,
    "lng": 27.515173,
    "timezone": "Europe/Sofia"
  },
  {
    "city": "Chengdu",
    "iata": "TFU",
    "country": "China",
    "airlines": [
      "Air China"
    ],
    "frequency": "4× weekly",
    "lat": 30.31252,
    "lng": 104.441284,
    "timezone": "Asia/Shanghai"
  },
  {
    "city": "Colombo",
    "iata": "CMB",
    "country": "Sri Lanka",
    "airlines": [
      "SriLankan Airlines"
    ],
    "frequency": "4× weekly",
    "lat": 7.180759906768799,
    "lng": 79.88410186767578,
    "timezone": "Asia/Colombo"
  },
  {
    "city": "Kayseri",
    "iata": "ASR",
    "country": "Türkiye",
    "airlines": [
      "Sun Express"
    ],
    "frequency": "4× weekly",
    "lat": 38.770401,
    "lng": 35.495399,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Kefallinia Island",
    "iata": "EFL",
    "country": "Greece",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "4× weekly",
    "lat": 38.12009811401367,
    "lng": 20.500499725341797,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Monastir",
    "iata": "MIR",
    "country": "Tunisia",
    "airlines": [
      "Eurowings Discover",
      "Nouvelair Tunisie"
    ],
    "frequency": "4× weekly",
    "lat": 35.75809860229492,
    "lng": 10.75469970703125,
    "timezone": "Africa/Tunis"
  },
  {
    "city": "Muscat",
    "iata": "MCT",
    "country": "Oman",
    "airlines": [
      "Oman Air"
    ],
    "frequency": "4× weekly",
    "lat": 23.600218,
    "lng": 58.285268,
    "timezone": "Asia/Muscat"
  },
  {
    "city": "Mykonos Island",
    "iata": "JMK",
    "country": "Greece",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "4× weekly",
    "lat": 37.435101,
    "lng": 25.348101,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Prishtina",
    "iata": "PRN",
    "country": "KS",
    "airlines": [
      "Eurowings"
    ],
    "frequency": "4× weekly",
    "lat": 42.5728,
    "lng": 21.035801,
    "timezone": "Europe/Belgrade"
  },
  {
    "city": "Trondheim",
    "iata": "TRD",
    "country": "Norway",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "4× weekly",
    "lat": 63.457802,
    "lng": 10.924,
    "timezone": "Europe/Oslo"
  },
  {
    "city": "Westerland",
    "iata": "GWT",
    "country": "Germany",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "4× weekly",
    "lat": 54.9132,
    "lng": 8.34047,
    "timezone": "Europe/Berlin"
  },
  {
    "city": "Anchorage",
    "iata": "ANC",
    "country": "United States",
    "airlines": [
      "Condor"
    ],
    "frequency": "3× weekly",
    "lat": 61.179004,
    "lng": -149.992561,
    "timezone": "America/Anchorage"
  },
  {
    "city": "Arbil",
    "iata": "EBL",
    "country": "Iraq",
    "airlines": [
      "FlexFlight",
      "UR Airlines"
    ],
    "frequency": "3× weekly",
    "lat": 36.236047,
    "lng": 43.946615,
    "timezone": "Asia/Baghdad"
  },
  {
    "city": "Ashgabat",
    "iata": "ASB",
    "country": "Turkmenistan",
    "airlines": [
      "Turkmenistan Airlines"
    ],
    "frequency": "3× weekly",
    "lat": 37.986801,
    "lng": 58.361,
    "timezone": "Asia/Ashgabat"
  },
  {
    "city": "Cluj-Napoca",
    "iata": "CLJ",
    "country": "Romania",
    "airlines": [
      "Anima Wings",
      "AWG"
    ],
    "frequency": "3× weekly",
    "lat": 46.786042,
    "lng": 23.685733,
    "timezone": "Europe/Bucharest"
  },
  {
    "city": "Jebel Ali",
    "iata": "DWC",
    "country": "United Arab Emirates",
    "airlines": [
      "Emirates"
    ],
    "frequency": "3× weekly",
    "lat": 24.896171,
    "lng": 55.16235,
    "timezone": "Asia/Dubai"
  },
  {
    "city": "Kavala",
    "iata": "KVA",
    "country": "Greece",
    "airlines": [
      "Condor"
    ],
    "frequency": "3× weekly",
    "lat": 40.9133,
    "lng": 24.6192,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Mahe Island",
    "iata": "SEZ",
    "country": "Seychelles",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "3× weekly",
    "lat": -4.67434,
    "lng": 55.521801,
    "timezone": "Indian/Mahe"
  },
  {
    "city": "Marsa Alam",
    "iata": "RMF",
    "country": "Egypt",
    "airlines": [
      "Air Cairo",
      "TUIfly"
    ],
    "frequency": "3× weekly",
    "lat": 25.555548,
    "lng": 34.59245,
    "timezone": "Africa/Cairo"
  },
  {
    "city": "Minneapolis",
    "iata": "MSP",
    "country": "United States",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "3× weekly",
    "lat": 44.880081,
    "lng": -93.221741,
    "timezone": "America/Chicago"
  },
  {
    "city": "Portland",
    "iata": "PDX",
    "country": "United States",
    "airlines": [
      "Condor"
    ],
    "frequency": "3× weekly",
    "lat": 45.588699,
    "lng": -122.598,
    "timezone": "America/Los_Angeles"
  },
  {
    "city": "Preveza/Lefkada",
    "iata": "PVK",
    "country": "Greece",
    "airlines": [
      "Condor"
    ],
    "frequency": "3× weekly",
    "lat": 38.925499,
    "lng": 20.765301,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Puerto Plata",
    "iata": "POP",
    "country": "Dominican Republic",
    "airlines": [
      "Condor"
    ],
    "frequency": "3× weekly",
    "lat": 19.7579,
    "lng": -70.57,
    "timezone": "America/Santo_Domingo"
  },
  {
    "city": "Riyadh",
    "iata": "RUH",
    "country": "Saudi Arabia",
    "airlines": [
      "Saudi Arabian Airlines"
    ],
    "frequency": "3× weekly",
    "lat": 24.9576,
    "lng": 46.698799,
    "timezone": "Asia/Riyadh"
  },
  {
    "city": "San José",
    "iata": "SJO",
    "country": "Costa Rica",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× weekly",
    "lat": 9.99386,
    "lng": -84.208801,
    "timezone": "America/Costa_Rica"
  },
  {
    "city": "Tivat",
    "iata": "TIV",
    "country": "Montenegro",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "3× weekly",
    "lat": 42.404701,
    "lng": 18.723301,
    "timezone": "Europe/Podgorica"
  },
  {
    "city": "Bodø",
    "iata": "BOO",
    "country": "Norway",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "2× weekly",
    "lat": 67.269203,
    "lng": 14.3653,
    "timezone": "Europe/Oslo"
  },
  {
    "city": "Brindisi",
    "iata": "BDS",
    "country": "Italy",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "2× weekly",
    "lat": 40.6576,
    "lng": 17.947001,
    "timezone": "Europe/Rome"
  },
  {
    "city": "Cologne",
    "iata": "CGN",
    "country": "Germany",
    "airlines": [
      "AZE",
      "GER"
    ],
    "frequency": "2× weekly",
    "lat": 50.865898,
    "lng": 7.14274,
    "timezone": "Europe/Berlin"
  },
  {
    "city": "Cork",
    "iata": "ORK",
    "country": "Ireland",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "2× weekly",
    "lat": 51.841301,
    "lng": -8.49111,
    "timezone": "Europe/Dublin"
  },
  {
    "city": "Ezhou",
    "iata": "EHU",
    "country": "China",
    "airlines": [
      "SF Airlines"
    ],
    "frequency": "2× weekly",
    "lat": 30.341178,
    "lng": 115.03926,
    "timezone": "Asia/Shanghai"
  },
  {
    "city": "Fort Myers",
    "iata": "RSW",
    "country": "United States",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "2× weekly",
    "lat": 26.534685,
    "lng": -81.752816,
    "timezone": "America/New_York"
  },
  {
    "city": "Gaziantep",
    "iata": "GZT",
    "country": "Türkiye",
    "airlines": [
      "Sun Express"
    ],
    "frequency": "2× weekly",
    "lat": 36.947201,
    "lng": 37.478699,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Nador",
    "iata": "NDR",
    "country": "Morocco",
    "airlines": [
      "Royal Air Maroc"
    ],
    "frequency": "2× weekly",
    "lat": 34.9888,
    "lng": -3.02821,
    "timezone": "Africa/Casablanca"
  },
  {
    "city": "Rijeka",
    "iata": "RJK",
    "country": "Croatia",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "2× weekly",
    "lat": 45.216376,
    "lng": 14.57085,
    "timezone": "Europe/Zagreb"
  },
  {
    "city": "Samos Island",
    "iata": "SMI",
    "country": "Greece",
    "airlines": [
      "Condor"
    ],
    "frequency": "2× weekly",
    "lat": 37.689999,
    "lng": 26.911699,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Samsun",
    "iata": "SZF",
    "country": "Türkiye",
    "airlines": [
      "Sun Express"
    ],
    "frequency": "2× weekly",
    "lat": 41.253988,
    "lng": 36.567546,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Skiathos",
    "iata": "JSI",
    "country": "Greece",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "2× weekly",
    "lat": 39.177101,
    "lng": 23.5037,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Agadir",
    "iata": "AGA",
    "country": "Morocco",
    "airlines": [
      "Condor"
    ],
    "frequency": "Weekly",
    "lat": 30.322478,
    "lng": -9.412003,
    "timezone": "Africa/Casablanca"
  },
  {
    "city": "Berne",
    "iata": "BRN",
    "country": "Switzerland",
    "airlines": [
      "Jetfly Aviation"
    ],
    "frequency": "Weekly",
    "lat": 46.912736,
    "lng": 7.498819,
    "timezone": "Europe/Zurich"
  },
  {
    "city": "Biarritz/Anglet/Bayonne",
    "iata": "BIQ",
    "country": "France",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Weekly",
    "lat": 43.468372,
    "lng": -1.523223,
    "timezone": "Europe/Paris"
  },
  {
    "city": "Bournemouth",
    "iata": "BOH",
    "country": "United Kingdom",
    "airlines": [
      "Klasjet"
    ],
    "frequency": "Weekly",
    "lat": 50.780483,
    "lng": -1.839576,
    "timezone": "Europe/London"
  },
  {
    "city": "Chengdu",
    "iata": "CTU",
    "country": "China",
    "airlines": [
      "—"
    ],
    "frequency": "Weekly",
    "lat": 30.558257,
    "lng": 103.945966,
    "timezone": "Asia/Shanghai"
  },
  {
    "city": "Diyarbakır",
    "iata": "DIY",
    "country": "Türkiye",
    "airlines": [
      "Sun Express"
    ],
    "frequency": "Weekly",
    "lat": 37.893902,
    "lng": 40.201,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Egelsbach",
    "iata": "QEF",
    "country": "Germany",
    "airlines": [
      "IBIS"
    ],
    "frequency": "Weekly",
    "lat": 49.959,
    "lng": 8.643,
    "timezone": "Europe/Berlin"
  },
  {
    "city": "Elazığ",
    "iata": "EZS",
    "country": "Türkiye",
    "airlines": [
      "Sun Express"
    ],
    "frequency": "Weekly",
    "lat": 38.597974,
    "lng": 39.28348,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Farnborough",
    "iata": "FAB",
    "country": "United Kingdom",
    "airlines": [
      "Jetfly Aviation"
    ],
    "frequency": "Weekly",
    "lat": 51.275799,
    "lng": -0.776333,
    "timezone": "Europe/London"
  },
  {
    "city": "Figari Sud-Corse",
    "iata": "FSC",
    "country": "France",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Weekly",
    "lat": 41.50185,
    "lng": 9.097092,
    "timezone": "Europe/Paris"
  },
  {
    "city": "Limerick city",
    "iata": "SNN",
    "country": "Ireland",
    "airlines": [
      "Eurowings Discover"
    ],
    "frequency": "Weekly",
    "lat": 52.702,
    "lng": -8.92482,
    "timezone": "Europe/Dublin"
  },
  {
    "city": "Montego Bay",
    "iata": "MBJ",
    "country": "Jamaica",
    "airlines": [
      "Condor"
    ],
    "frequency": "Weekly",
    "lat": 18.50342,
    "lng": -77.91323,
    "timezone": "America/Jamaica"
  },
  {
    "city": "Oklahoma City",
    "iata": "OKC",
    "country": "United States",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "Weekly",
    "lat": 35.393388,
    "lng": -97.598248,
    "timezone": "America/Chicago"
  },
  {
    "city": "Pátrai",
    "iata": "GPA",
    "country": "Greece",
    "airlines": [
      "TUIfly"
    ],
    "frequency": "Weekly",
    "lat": 38.1511,
    "lng": 21.4256,
    "timezone": "Europe/Athens"
  },
  {
    "city": "Pau/Pyrénées (Uzein)",
    "iata": "PUF",
    "country": "France",
    "airlines": [
      "OYO"
    ],
    "frequency": "Weekly",
    "lat": 43.380001,
    "lng": -0.418611,
    "timezone": "Europe/Paris"
  },
  {
    "city": "Rabil",
    "iata": "BVC",
    "country": "Cape Verde",
    "airlines": [
      "TUIfly"
    ],
    "frequency": "Weekly",
    "lat": 16.136499,
    "lng": -22.888901,
    "timezone": "Atlantic/Cape_Verde"
  },
  {
    "city": "Shenyang",
    "iata": "SHE",
    "country": "China",
    "airlines": [
      "China Southern Airlines"
    ],
    "frequency": "Weekly",
    "lat": 41.6398,
    "lng": 123.483668,
    "timezone": "Asia/Shanghai"
  },
  {
    "city": "Shenzhen",
    "iata": "SZX",
    "country": "China",
    "airlines": [
      "Air China"
    ],
    "frequency": "Weekly",
    "lat": 22.639474,
    "lng": 113.803262,
    "timezone": "Asia/Shanghai"
  },
  {
    "city": "Sta Cruz de la Palma, La Palma Island",
    "iata": "SPC",
    "country": "Spain",
    "airlines": [
      "Condor"
    ],
    "frequency": "Weekly",
    "lat": 28.626499,
    "lng": -17.7556,
    "timezone": "Atlantic/Canary"
  },
  {
    "city": "Tbilisi",
    "iata": "TBS",
    "country": "Georgia",
    "airlines": [
      "Condor"
    ],
    "frequency": "Weekly",
    "lat": 41.669201,
    "lng": 44.9547,
    "timezone": "Asia/Tbilisi"
  },
  {
    "city": "Toulon/Hyères/Le Palyvestre",
    "iata": "TLN",
    "country": "France",
    "airlines": [
      "VallJet"
    ],
    "frequency": "Weekly",
    "lat": 43.097301,
    "lng": 6.14603,
    "timezone": "Europe/Paris"
  },
  {
    "city": "Trabzon",
    "iata": "TZX",
    "country": "Türkiye",
    "airlines": [
      "Sun Express"
    ],
    "frequency": "Weekly",
    "lat": 40.995098,
    "lng": 39.7897,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Uralsk",
    "iata": "URA",
    "country": "Kazakhstan",
    "airlines": [
      "Air Astana"
    ],
    "frequency": "Weekly",
    "lat": 51.151976,
    "lng": 51.543652,
    "timezone": "Asia/Oral"
  },
  {
    "city": "Ürümqi",
    "iata": "URC",
    "country": "China",
    "airlines": [
      "China Southern Airlines"
    ],
    "frequency": "Weekly",
    "lat": 43.913584,
    "lng": 87.479372,
    "timezone": "Asia/Urumqi"
  },
  {
    "city": "Chongqing",
    "iata": "CKG",
    "country": "China",
    "airlines": [
      "China Cargo Airlines",
      "China Southern Airlines"
    ],
    "frequency": "See selected day",
    "lat": 29.712254,
    "lng": 106.651895,
    "timezone": "Asia/Shanghai"
  },
  {
    "city": "Astana",
    "iata": "TSE",
    "country": "Kazakhstan",
    "airlines": [
      "Lufthansa",
      "Air Astana",
      "Cathay Pacific"
    ],
    "frequency": "See selected day",
    "lat": 51.027035,
    "lng": 71.467094,
    "timezone": "Asia/Almaty"
  },
  {
    "city": "Istanbul(Bakırköy)",
    "iata": "ISL",
    "country": "Türkiye",
    "airlines": [
      "Lufthansa",
      "Turkish Airlines"
    ],
    "frequency": "See selected day",
    "lat": 40.971913,
    "lng": 28.823714,
    "timezone": "Europe/Istanbul"
  },
  {
    "city": "Chişinău",
    "iata": "KIV",
    "country": "Moldova",
    "airlines": [
      "Lufthansa",
      "HiSky Europe"
    ],
    "frequency": "See selected day",
    "lat": 46.92774,
    "lng": 28.931704,
    "timezone": "Europe/Chisinau"
  },
  {
    "city": "London, Essex",
    "iata": "STN",
    "country": "United Kingdom",
    "airlines": [
      "AIRZETA"
    ],
    "frequency": "See selected day",
    "lat": 51.884998,
    "lng": 0.235,
    "timezone": "Europe/London"
  },
  {
    "city": "Espargos",
    "iata": "SID",
    "country": "Cape Verde",
    "airlines": [
      "TUIfly",
      "LATAM Cargo Chile"
    ],
    "frequency": "See selected day",
    "lat": 16.7414,
    "lng": -22.9494,
    "timezone": "Atlantic/Cape_Verde"
  },
  {
    "city": "Beijing",
    "iata": "PKX",
    "country": "China",
    "airlines": [
      "Air China"
    ],
    "frequency": "See selected day",
    "lat": 39.501289,
    "lng": 116.413967,
    "timezone": "Asia/Shanghai"
  },
  {
    "city": "Santo Domingo",
    "iata": "SDQ",
    "country": "Dominican Republic",
    "airlines": [
      "Condor"
    ],
    "frequency": "See selected day",
    "lat": 18.42970085144,
    "lng": -69.668899536133,
    "timezone": "America/Santo_Domingo"
  },
  {
    "city": "Frankfurt am Main (Lautzenhausen)",
    "iata": "HHN",
    "country": "Germany",
    "airlines": [
      "Condor"
    ],
    "frequency": "See selected day",
    "lat": 49.946353,
    "lng": 7.261734,
    "timezone": "Europe/Berlin"
  },
  {
    "city": "Mexico City",
    "iata": "NLU",
    "country": "Mexico",
    "airlines": [
      "Lufthansa",
      "Emirates"
    ],
    "frequency": "See selected day",
    "lat": 19.743824,
    "lng": -99.01507,
    "timezone": "America/Mexico_City"
  },
  {
    "city": "Guadalajara",
    "iata": "GDL",
    "country": "Mexico",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "See selected day",
    "lat": 20.523342,
    "lng": -103.310108,
    "timezone": "America/Mexico_City"
  },
  {
    "city": "Monterrey",
    "iata": "MTY",
    "country": "Mexico",
    "airlines": [
      "Lufthansa Cargo",
      "Lufthansa"
    ],
    "frequency": "See selected day",
    "lat": 25.778521,
    "lng": -100.106989,
    "timezone": "America/Monterrey"
  },
  {
    "city": "Kuwait City",
    "iata": "KWI",
    "country": "Kuwait",
    "airlines": [
      "Kuwait Airways"
    ],
    "frequency": "See selected day",
    "lat": 29.224487,
    "lng": 47.969813,
    "timezone": "Asia/Kuwait"
  },
  {
    "city": "Campinas",
    "iata": "VCP",
    "country": "Brazil",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "See selected day",
    "lat": -23.007404,
    "lng": -47.134502,
    "timezone": "America/Sao_Paulo"
  },
  {
    "city": "Curitiba",
    "iata": "CWB",
    "country": "Brazil",
    "airlines": [
      "Lufthansa"
    ],
    "frequency": "See selected day",
    "lat": -25.5285,
    "lng": -49.1758,
    "timezone": "America/Sao_Paulo"
  },
  {
    "city": "Kittilä",
    "iata": "KTT",
    "country": "Finland",
    "airlines": [
      "Discover Airlines"
    ],
    "frequency": "See selected day",
    "lat": 67.700996,
    "lng": 24.8468,
    "timezone": "Europe/Helsinki"
  },
  {
    "city": "Urgench",
    "iata": "UGC",
    "country": "Uzbekistan",
    "airlines": [
      "Uzbekistan Airways"
    ],
    "frequency": "See selected day",
    "lat": 41.58274,
    "lng": 60.64338,
    "timezone": "Asia/Samarkand"
  }
];
