import React, { useEffect } from "react";
import Head from "next/head";
import Buses from "../components/Buses";
import Trains from "../components/Trains";

export default function Food() {
  useEffect(() => {
    async function fetchData() {
      await fetch("/api/getSheetData")
        .then((res) => res.json())
        .then((data) => console.log("res", data));
    }
    fetchData();
  }, []);
  return (
    <div className='main food'>
      <Head>
        <title>Schedule</title>
        <link rel='icon' type='image/png' href='/favicon.png' />
      </Head>
      <br />
      <h1>Local Schedule</h1>
      <div className='grid'>
        <Trains stationName='Forest Park' stationNumber='30198' />
        <Trains stationName="O'Hare" stationNumber='30197' />

        <Buses
          stationName='Milwaukee South'
          routeNumber='56'
          stopNumber='5466'
        />
        <Buses
          stationName='Milwaukee North'
          routeNumber='56'
          stopNumber='5560'
        />

        <Buses stationName='Diversey East' routeNumber='76' stopNumber='5466' />

        <Buses
          stationName='Diversey West'
          routeNumber='76'
          stopNumber='11068'
        />
      </div>
    </div>
  );
}
