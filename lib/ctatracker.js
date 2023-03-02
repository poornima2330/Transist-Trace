const TRAIN_API_KEY = process.env.NEXT_PUBLIC_CTA_TRAIN_API;
const API_KEY = process.env.NEXT_PUBLIC_CTA_BUS_API;

const TRAIN_API_URL = `https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${TRAIN_API_KEY}`;

const BUS_API_URL = `http://ctabustracker.com/bustime/api/v2/getpredictions?key=${API_KEY}`;

export const getTrains = async (stationNumber) => {
  return fetch(
    `${TRAIN_API_URL}&stpid=${stationNumber || "30012"}&outputType=JSON`
  );
};

export const getBuses = async (routeNumber, stopNumber) => {
  return fetch(
    `${BUS_API_URL}&rt=${routeNumber}&stpid=${stopNumber}&format=json`
  );
};

export const getBusRoutes = async () => {
  const base_url =
    "http://ctabustracker.com/bustime/api/v2/getroutes?key=" +
    API_KEY +
    "&format=json";

  return fetch(base_url);
};

export const getSelectedBusDirection = async (selectedRoute) => {
  const base_url =
    "http://ctabustracker.com/bustime/api/v2/getdirections?key=" +
    API_KEY +
    "&rt=" +
    selectedRoute +
    "&format=json";

  return fetch(base_url);
};

export const getSelectedBusStops = async (selectedRoute, selectedDirection) => {
  const base_url =
    "http://ctabustracker.com/bustime/api/v2/getstops?key=" +
    API_KEY +
    "&rt=" +
    selectedRoute +
    "&dir=" +
    selectedDirection +
    "&format=json";

  return fetch(base_url);
};

export const getSelectedBusPredictions = async (
  selectedRoute,
  selectedStop
) => {
  const base_url =
    "http://ctabustracker.com/bustime/api/v2/getpredictions?key=" +
    API_KEY +
    "&rt=" +
    selectedRoute +
    "&stpid=" +
    selectedStop +
    "&format=json";

  return fetch(base_url);
};
