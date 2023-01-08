import React, { useState, useEffect } from "react";

export default function Trains(props) {
  const TRAIN_API_KEY = process.env.NEXT_PUBLIC_CTA_TRAIN_API;
  const [trains, setTrains] = useState([]);

  const proxy = "https://cors-anywhere.herokuapp.com/";

  async function trainTimes(data) {
      props.stationNumber || "30012"
    }&outputType=JSON`;
    const response = await fetch(TRAIN_API_URL, {
      method: "GET",
      body: JSON.stringify(data),
    });

    const trainData = await response.json();
    setTrains(trainData.ctatt.eta);
  }

  function cleanTime(data) {
    const hourMinutes = data.split("T")[1];
    const today = new Date();
    const currentTime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const diff = Math.abs(
      new Date("2020/10/09 " + hourMinutes) -
        new Date("2011/10/09 " + currentTime)
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
    <div className={`predictions trains`}>
      <h2 align='center'>
        {props.stationName} Train{trains < 2 ? "" : "s"}
      </h2>
      {trains && trains.length ? (
        trains.map((train) => (
          <div
            className={`prediction ${cleanTime(train.arrT) < 2 ? "due" : ""}`}
            key={train.arrT}
          >
            <p className='prediction-route-number'>
              {"To " + train.destNm}
              <span className='prediction-route-number-direction'>
                {train.staNm} Station
              </span>
            </p>
            <p className='prediction-time'>
              {cleanTime(train.arrT) < 2
                ? "Due"
                : cleanTime(train.arrT) + ` mins`}
            </p>
          </div>
        ))
      ) : (
        <>
          <div className='prediction loading' />
          <div className='prediction loading' />
        </>
      )}
    </div>
  );
}
