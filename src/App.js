import React from 'react';
import './App.css';
import {useState, useEffect} from 'react';

import { InputLabel, MenuItem, Select } from '@material-ui/core';

function App() {

  // REPLACE THIS WITH YOUR OWN API KEY
  const API_KEY = "123456789ABCDEF";

  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");

  const [directions, setDirections] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState("");

  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState("");

  const [predictions, setPredictions] = useState([]);


  const handleRouteSelect = (e) => {
    setSelectedRoute(e.target.value);
    setSelectedDirection("");
    setSelectedStop("");
    console.log("selected route: " + e.target.value);
  }

  const handleDirectionSelect = (e) => {
    setSelectedDirection(e.target.value);
    setSelectedStop("");
    console.log("selected Direction " + e.target.value);
  }

  const handleStopSelect = (e) => {
    setSelectedStop(e.target.value);
    console.log("selected stop: " + e.target.value);
  }

  const proxy = "https://can-cors.herokuapp.com/"

  useEffect( ()=> {
    let baseURI = proxy + 'http://ctabustracker.com/bustime/api/v2/getroutes?key='+ API_KEY + '&format=json';
    console.log("fetching routes");
    fetch(baseURI)
    .then(res => res.json())
    .then(response => {
      setRoutes(response["bustime-response"]["routes"]);
    })
    .catch();
  }, []);

  useEffect( ()=> {
      if(selectedRoute){
        console.log("fetching directions");

        let baseURI = proxy + 'http://ctabustracker.com/bustime/api/v2/getdirections?key='  + API_KEY + '&rt=' + selectedRoute + '&format=json';

        fetch(baseURI)
        .then(res => res.json())
        .then(response => {
          setDirections(response["bustime-response"]["directions"]);
        })
        .catch();
      }
  }, [selectedRoute]);

  useEffect( ()=> {
    if(selectedDirection){
      console.log("fetching stops");

      let baseURI = proxy + 'http://ctabustracker.com/bustime/api/v2/getstops?key=' + API_KEY + '&rt=' + selectedRoute + '&dir=' + selectedDirection + '&format=json';

      fetch(baseURI)
      .then(res => res.json())
      .then(response => {
        setStops(response["bustime-response"]["stops"]);
      })
      .catch();
    }
}, [selectedDirection, selectedRoute]);


useEffect( ()=> {
  if(selectedStop){
    console.log("fetching predictions");

    let baseURI = proxy + 'http://ctabustracker.com/bustime/api/v2/getpredictions?key=' + API_KEY + '&rt=' + selectedRoute + '&stpid=' + selectedStop + '&format=json';

    fetch(baseURI)
    .then(res => res.json())
    .then(response => {
      if(response["bustime-response"]["prd"])
        setPredictions(response["bustime-response"]["prd"]);
      else
        setPredictions([]);
    })
    .catch(setPredictions([]));
  }
}, [selectedDirection, selectedRoute, selectedStop]);
  
  return (
    <div className="App">

      <div className="header">
        CTA Bus Tracker
      </div>
      <div className="dropdowns">
        <div className="dropdown-routes">
          <InputLabel id="routes-label">Routes</InputLabel>
          <Select 
            style={{width: 300}}
            labelId="routes-label" 
            id="routes" 
            value={selectedRoute}
            onChange={handleRouteSelect}
          >
            {routes.map((item, index) => <MenuItem value={item.rt}>{item.rt}. {item.rtnm} </MenuItem> )}
          </Select>
        </div>

        <div className="dropdown-direction">
          <InputLabel id="directions-label">Directions</InputLabel>
          <Select 
            style={{ width: 300}}
            labelId="directions-label" 
            id="directions" 
            value={selectedDirection}
            onChange={handleDirectionSelect}
          >
            {directions.map((item, index) => <MenuItem value={item.dir}>{item.dir} </MenuItem> )}
          </Select>
        </div>

        <div className="dropdown-stop">
          <InputLabel id="stops-label">Stops</InputLabel>
          <Select 
            style={{width: 300}}
            labelId="stops-label" 
            id="stops" 
            value={selectedStop}
            onChange={handleStopSelect}
          >
            {stops.map((item, index) => <MenuItem value={item.stpid}>{item.stpnm} </MenuItem> )}
          </Select>
        </div>
      </div>

      <div className="predictions">
        <ul style={{listStyle: "none"} }>
        {predictions.length > 0?
        predictions.map((item, index) => 
            <li >
              <div className="prediction">
                <p className="prediction-route-number">{item.rt + " to " + item.des}</p>
                <p className="prediction-time">{" " + (isNaN(item.prdctdn)?item.prdctdn: item.prdctdn+" min" ) }</p>
              </div>

            </li>)
            :
        <div className="predictions-empty">No Information Availabe</div>
        }
        </ul>
      </div>

    </div>
  );
}

export default App;
