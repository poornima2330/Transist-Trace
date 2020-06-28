import React from 'react';
import { useState, useEffect } from 'react';

export default function Buses(props) {
  const API_KEY = process.env.NEXT_PUBLIC_CTA_BUS_API;
  const [buses, setBuses] = useState([]);

  async function busTimes(data) {
    const BUS_API_URL = `https://can-cors.herokuapp.com/http://ctabustracker.com/bustime/api/v2/getpredictions?key=${API_KEY}&rt=${props.routeNumber}&stpid=${props.stopNumber}&format=json`;
    const response = await fetch(BUS_API_URL);
    console.log(BUS_API_URL);
    const busData = await response.json();
    setBuses(busData['bustime-response'].prd);
    console.log('new bus times fetched');
  }

  useEffect(() => {
    busTimes();
    const updateEveryMinute = setInterval(() => {
      busTimes();
    }, 30000);
    return () => clearInterval(updateEveryMinute);
  }, []);

  return (
    <div className='predictions buses'>
      <h2 align='center'>{props.stationName} Buses</h2>
      {buses ? (
        buses.map((bus) => (
          <div className='prediction' key={bus.prdctdn}>
            <p className='prediction-route-number'>
              {bus.rt + ' To ' + bus.des}
              <span className='prediction-route-number-direction'>
                {bus.rtdir}
              </span>
            </p>
            <p className='prediction-time'>
              {isNaN(bus.prdctdn) ? bus.prdctdn : `${bus.prdctdn} mins`}
            </p>
          </div>
        ))
      ) : (
        <div className='prediction'>No Buses</div>
      )}
    </div>
  );
}
