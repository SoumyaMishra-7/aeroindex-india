export const airfareMockData = {
  "DEL-BOM": {
    route: "DEL → BOM",
    origin: "DEL",
    destination: "BOM",

    dataDate: "25 Aug 2026",

    bookingWindow: [
      {
        label: "T+1",
        daysAhead: 1,
        fare: 9200,
        changeFromT45: 124,
        insight:
          "Last-minute bookings show a significantly higher observed fare.",
      },
      {
        label: "T+7",
        daysAhead: 7,
        fare: 7600,
        changeFromT45: 85,
        insight:
          "Booking one week ahead shows a moderate reduction in observed fare.",
      },
      {
        label: "T+15",
        daysAhead: 15,
        fare: 6100,
        changeFromT45: 49,
        insight:
          "The fare continues to decline as the booking window increases.",
      },
      {
        label: "T+30",
        daysAhead: 30,
        fare: 4800,
        changeFromT45: 17,
        insight:
          "Thirty-day advance booking approaches the lower observed fare range.",
      },
      {
        label: "T+45",
        daysAhead: 45,
        fare: 4100,
        changeFromT45: 0,
        insight:
          "T+45 records the lowest observed fare in this demo dataset.",
      },
    ],

    fareComposition: {
      baseFare: 5200,
      taxes: 920,
      airportFee: 150,
      convenienceFee: 100,
      totalConsumerFare: 6370,
    },

    indicators: {
      dataConfidence: 94,
      shortWindowPremium: 31,
      elasticityScore: 0.72,
    },
    indicators: {
  dataConfidence: 94,
  shortWindowPremium: 27,
  elasticityScore: 0.72,
  bookingPressure: 68,
},
  },

  "DEL-BLR": {
    route: "DEL → BLR",
    origin: "DEL",
    destination: "BLR",

    dataDate: "25 Aug 2026",

    bookingWindow: [
      {
        label: "T+1",
        daysAhead: 1,
        fare: 9800,
        changeFromT45: 118,
        insight:
          "Short-notice bookings show a substantial fare premium.",
      },
      {
        label: "T+7",
        daysAhead: 7,
        fare: 8100,
        changeFromT45: 80,
        insight:
          "Booking one week ahead reduces the observed fare premium.",
      },
      {
        label: "T+15",
        daysAhead: 15,
        fare: 6700,
        changeFromT45: 49,
        insight:
          "Mid-range advance booking shows continued fare reduction.",
      },
      {
        label: "T+30",
        daysAhead: 30,
        fare: 5200,
        changeFromT45: 16,
        insight:
          "The fare approaches the lower end of the observed range.",
      },
      {
        label: "T+45",
        daysAhead: 45,
        fare: 4500,
        changeFromT45: 0,
        insight:
          "T+45 records the lowest observed fare in this demo dataset.",
      },
    ],

    fareComposition: {
      baseFare: 5800,
      taxes: 950,
      airportFee: 170,
      convenienceFee: 100,
      totalConsumerFare: 7020,
    },

    indicators: {
      dataConfidence: 91,
      shortWindowPremium: 28,
      elasticityScore: 0.68,
    },
  },
};