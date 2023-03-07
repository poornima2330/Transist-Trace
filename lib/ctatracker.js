const TRAIN_API_KEY = process.env.CTA_TRAIN_API;
const API_KEY = process.env.CTA_BUS_API;

const TRAIN_API_URL = `https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${TRAIN_API_KEY}`;

const BUS_API_URL = `http://ctabustracker.com/bustime/api/v2/getpredictions?key=${API_KEY}`;

export const getTrains = async (stationNumber) => {
  return fetch(
    `${TRAIN_API_URL}&stpid=${stationNumber || "30012"}&outputType=JSON`
  );
};

export const getTrainStops = async (route) => {
  return fetch(
    `https://data.cityofchicago.org/resource/8pix-ypme.json?$query=SELECT%0A%20%20%60stop_id%60%2C%0A%20%20%60direction_id%60%2C%0A%20%20%60stop_name%60%2C%0A%20%20%60station_name%60%2C%0A%20%20%60station_descriptive_name%60%2C%0A%20%20%60map_id%60%2C%0A%20%20%60ada%60%2C%0A%20%20%60red%60%2C%0A%20%20%60blue%60%2C%0A%20%20%60g%60%2C%0A%20%20%60brn%60%2C%0A%20%20%60p%60%2C%0A%20%20%60pexp%60%2C%0A%20%20%60y%60%2C%0A%20%20%60pnk%60%2C%0A%20%20%60o%60%2C%0A%20%20%60location%60%2C%0A%20%20%60%3A%40computed_region_6mkv_f3dw%60%2C%0A%20%20%60%3A%40computed_region_vrxf_vc4k%60%2C%0A%20%20%60%3A%40computed_region_bdys_3d7i%60%2C%0A%20%20%60%3A%40computed_region_43wa_7qmu%60%0AWHERE%20%60${route}%60%20%3D%3D%20TRUE%0AORDER%20BY%20%60station_name%60%20ASC%20NULL%20LAST`
  );
};

export const getTrainLocations = async (route) => {
  return fetch(
    `https://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${TRAIN_API_KEY}&rt=${route}&outputType=JSON`
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
