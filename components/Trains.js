import React from 'react';
import { useState, useEffect } from 'react';

export default function Trains(props) {
  const TRAIN_API_KEY = process.env.NEXT_PUBLIC_CTA_TRAIN_API;
  const [trains, setTrains] = useState([]);

  async function trainTimes(data) {
    const TRAIN_API_URL = `https://can-cors.herokuapp.com/http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${TRAIN_API_KEY}&stpid=${
      props.stationNumber || '30012'
    }&outputType=JSON`;
    const response = await fetch(TRAIN_API_URL);
    const trainData = await response.json();
    setTrains(trainData.ctatt.eta);
  }

  function cleanTime(data) {
    const hourMinutes = data.split('T')[1];
    const today = new Date();
    const currentTime =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const diff = Math.abs(
      new Date('2020/10/09 ' + hourMinutes) -
        new Date('2011/10/09 ' + currentTime)
    );
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    return minutes;
  }

  useEffect(() => {
    trainTimes();
    const updateEveryMinute = setInterval(() => {
      trainTimes();
    }, 30000);
    return () => clearInterval(updateEveryMinute);
  }, []);

  return (
    <div className='predictions trains'>
      <h2 align='center'>{props.stationName} Trains</h2>
      {trains ? (
        trains.map((train) => (
          <div className='prediction' key={train.arrT}>
            <p className='prediction-route-number'>
              {'To ' + train.destNm}
              <span className='prediction-route-number-direction'>
                {train.staNm} Station
              </span>
            </p>
            <p className='prediction-time'>
              {cleanTime(train.arrT) < 2
                ? 'Due'
                : cleanTime(train.arrT) + ` mins`}
            </p>
          </div>
        ))
      ) : (
        <div className='prediction'>Loading...</div>
      )}
    </div>
  );
}
