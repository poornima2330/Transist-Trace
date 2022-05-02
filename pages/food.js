import React, { useEffect, useState } from "react";
import Head from "next/head";
import Buses from "../components/Buses";
import Trains from "../components/Trains";

export default function Food() {
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState("Loading");

  useEffect(() => {
    getSchedule();
  }, []);

  async function getSchedule() {
    const fetchData = await fetch("https://api.sheetson.com/v2/sheets/Data", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SHEETSON_BEARER}`,
        "X-Spreadsheet-Id": process.env.NEXT_PUBLIC_SHEETSON_ID,
      },
    });
    const data = await fetchData.json();
    const day = currentDay();
    setSchedule(data.results[day]);

    setLoading(false);
    return data;
  }

  function currentDay() {
    const date = new Date().toString().split(" ")[0];
    if (date === "Sun") return 6;
    if (date === "Mon") return 0;
    if (date === "Tue") return 1;
    if (date === "Wed") return 2;
    if (date === "Thu") return 3;
    if (date === "Fri") return 4;
    if (date === "Sat") return 5;
    return date;
  }

  return (
    <div className='main food'>
      <Head>
        <title>Schedule</title>
      </Head>
      <br />
      <h1>Local Schedule</h1>
      {/* {!loading ? (
        <div className='food-schedule'>
          <div>Lunch: {schedule.Lunch}</div>
          <div>Dinner: {schedule.Dinner}</div>
        </div>
      ) : (
        "Loading"
      )} */}
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
