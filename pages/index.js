import React from "react";
import Head from "next/head";
import { useState, useEffect } from "react";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import Trains from "../components/Trains";
import Buses from "../components/Buses";
import Time from "../components/Time";

function App() {
  // REPLACE THIS WITH YOUR OWN API KEY
  const API_KEY = process.env.NEXT_PUBLIC_CTA_BUS_API;
  const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");

  const [directions, setDirections] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState("");

  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState("");

  const [predictions, setPredictions] = useState([]);

  const [weather, setWeather] = useState({
    coord: { lon: -87.7, lat: 41.95 },
    weather: [
      {
        id: 501,
        main: "Rain",
        description: "Always sunny in Philly",
        icon: "10d",
      },
    ],
    base: "stations",
    main: {
      temp: 42,
      feels_like: 77.76,
      temp_min: 77,
      temp_max: 86,
      pressure: 1013,
      humidity: 54,
    },
    visibility: 16093,
    wind: { speed: 11.41, deg: 210 },
    rain: { "1h": 2.54 },
    clouds: { all: 75 },
    dt: 1593466811,
    sys: {
      type: 1,
      id: 4861,
      country: "US",
      sunrise: 1593425902,
      sunset: 1593480607,
    },
    timezone: -18000,
    id: 0,
    name: "Chicago",
    cod: 200,
  });

  const handleRouteSelect = (e) => {
    setSelectedRoute(e.target.value);
    setSelectedDirection("");
    setSelectedStop("");
    console.log("selected route: " + e.target.value);
  };

  const handleDirectionSelect = (e) => {
    setSelectedDirection(e.target.value);
    setSelectedStop("");
    console.log("selected Direction " + e.target.value);
  };

  const handleStopSelect = (e) => {
    setSelectedStop(e.target.value);
    console.log("selected stop: " + e.target.value);
  };

  const popularBusRoutes = [4, 9, 77];

  const proxy = "https://cors-anywhere.herokuapp.com/";

  async function getWeather() {
    const weatherURL = `${proxy}https://api.openweathermap.org/data/2.5/weather?zip=60618,us&units=imperial&appid=${WEATHER_API_KEY}`;
    setWeather("Loading Weather Info...");
    fetch(weatherURL)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setWeather(response);
      });
  }

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      getWeather();
      const updateEvery2Minute = setInterval(() => {
        getWeather();
      }, 1800000);
      return () => clearInterval(updateEvery2Minute);
    }
  }, []);

  useEffect(() => {
    let baseURI =
      "http://ctabustracker.com/bustime/api/v2/getroutes?key=" +
      API_KEY +
      "&format=json";
    console.log("fetching routes", baseURI);
    fetch(baseURI)
      .then((res) => res.json())
      .then((response) => {
        setRoutes(response["bustime-response"]["routes"]);
      })
      .catch();
  }, []);

  useEffect(() => {
    if (selectedRoute) {
      console.log("fetching directions");

      let baseURI =
        "http://ctabustracker.com/bustime/api/v2/getdirections?key=" +
        API_KEY +
        "&rt=" +
        selectedRoute +
        "&format=json";

      fetch(baseURI)
        .then((res) => res.json())
        .then((response) => {
          setDirections(response["bustime-response"]["directions"]);
        })
        .catch();
    }
  }, [selectedRoute]);

  useEffect(() => {
    if (selectedDirection) {
      console.log("fetching stops");

      let baseURI =
        "http://ctabustracker.com/bustime/api/v2/getstops?key=" +
        API_KEY +
        "&rt=" +
        selectedRoute +
        "&dir=" +
        selectedDirection +
        "&format=json";

      let baseURI2 =
        "http://ctabustracker.com/bustime/api/v2/getstops?key=" +
        API_KEY +
        "&rt=" +
        selectedRoute +
        "&dir=" +
        directions[1] +
        "&format=json";

      fetch(baseURI)
        .then((res) => res.json())
        .then((response) => {
          setStops(response["bustime-response"]["stops"]);
          console.log("STTAAAHPPS", response["bustime-response"]["stops"]);
        })
        .catch();

      //   const direction2 = fetch(baseURI2)
      //   .then(res => res.json())
      //   .then(response => {
      //     setStops(response["bustime-response"]["stops"]);
      //     console.log('STTAAAHPPS', response["bustime-response"]["stops"])
      //   })
      //   .catch();

      // console.log('direction2', direction2);
    }
  }, [selectedDirection, selectedRoute]);

  useEffect(() => {
    if (selectedStop) {
      console.log("fetching predictions", selectedStop);

      let baseURI =
        "http://ctabustracker.com/bustime/api/v2/getpredictions?key=" +
        API_KEY +
        "&rt=" +
        selectedRoute +
        "&stpid=" +
        selectedStop +
        "&format=json";

      fetch(baseURI)
        .then((res) => res.json())
        .then((response) => {
          if (response["bustime-response"]["prd"])
            setPredictions(response["bustime-response"]["prd"]);
          else setPredictions([]);
        })
        .catch(setPredictions([]));
    }
    console.log(selectedDirection, selectedRoute, selectedStop);
  }, [selectedDirection, selectedRoute, selectedStop]);

  return (
    <div className='App'>
      <Head>
        <title>CTA Tracker for Logan Square, Chicago IL</title>
        <link rel='icon' type='image/png' href='/favicon.png' />
      </Head>
      <div className='header'>CTA Bus Tracker</div>
      <div className='welcome'>
        <div className='welcome-left'>
          <h2 className='welcome-title'>Real-time bus tracker</h2>
          <p className='welcome-description'>
            Get up to date travel times on your route via bus in Chicago.
          </p>
        </div>
        <div className='welcome-right'></div>
      </div>

      <div className='main'>
        <div className='dropdowns'>
          <div className='dropdown-routes'>
            <InputLabel id='routes-label'>Routes</InputLabel>
            <Select
              style={{ width: 300 }}
              labelId='routes-label'
              id='routes'
              value={selectedRoute}
              onChange={handleRouteSelect}
            >
              {routes.map((item, index) => (
                <MenuItem value={item.rt} key={item.rt}>
                  {item.rt}. {item.rtnm}{" "}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className='dropdown-direction'>
            <InputLabel id='directions-label'>Directions</InputLabel>
            <Select
              style={{ width: 300 }}
              labelId='directions-label'
              id='directions'
              value={selectedDirection}
              onChange={handleDirectionSelect}
            >
              {directions.map((item, index) => (
                <MenuItem value={item.dir} key={item.dir}>
                  {item.dir}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className='dropdown-stop'>
            <InputLabel id='stops-label'>Stops</InputLabel>
            <Select
              style={{ width: 300 }}
              labelId='stops-label'
              id='stops'
              value={selectedStop}
              onChange={handleStopSelect}
            >
              {stops.map((item, index) => (
                <MenuItem value={item.stpid} key={item.stpid}>
                  {item.stpnm}{" "}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>

        <div className='shortcuts'>
          {popularBusRoutes.map((bus) => (
            <div className='shortcuts-button' key={bus}>
              <span onClick={() => setSelectedRoute(bus)}>#{bus}</span>
            </div>
          ))}
        </div>

        <div className='grid'>
          <Time />
          {!weather.main || weather.main.length ? (
            ""
          ) : (
            <div className='weather'>
              <div className='weather-icon'>
                <img
                  src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                />
              </div>
              <div className='weather-temp'>
                {weather.main.temp}&deg;<span>F</span>
                <br />
                <div className='weather-temp-description'>
                  {weather.weather[0].description}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='grid'>
          <Trains stationName='Forest Park' stationNumber='30013' />
          <Trains stationName="O'Hare" stationNumber='30012' />

          <Buses
            stationName='Kimball South'
            routeNumber='82'
            stopNumber='11139'
          />

          <Buses
            stationName='Kimball North'
            routeNumber='82'
            stopNumber='11271'
          />

          <Buses
            stationName='Belmont East'
            routeNumber='77'
            stopNumber='9273'
          />

          <Buses
            stationName='Belmont West'
            routeNumber='77'
            stopNumber='9314'
          />
        </div>
        <div className='predictions'>
          <h2 align='center'>Bus Times</h2>
          <ul style={{ listStyle: "none" }}>
            {predictions.length > 0 ? (
              predictions.map((item, index) => (
                <li className={item.rtprdctdn}>
                  <div className='prediction'>
                    <p className='prediction-route-number'>
                      {item.rt + " to " + item.des}
                      <span className='prediction-route-number-direction'>
                        {item.rtdir}
                      </span>
                    </p>
                    <p className='prediction-time'>
                      {" " +
                        (isNaN(item.prdctdn)
                          ? item.prdctdn
                          : item.prdctdn + " min")}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <div className='predictions-empty'>No information found</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
