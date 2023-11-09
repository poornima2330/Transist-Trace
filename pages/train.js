import { useEffect, useState } from "react";
import Trains from "../components/Trains";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function TrainPage({}) {
  const router = useRouter();
  const [stationNumbers, setStationNumbers] = useState([]);

  useEffect(() => {
    if (router && router.query) {
      console.log(router.query);
      setStationNumbers(router.query.stationNumber.split(","));
    }
  }, [router]);

  return (
    <div className='main'>
      <Head>
        <title>CTA Tracker // Dashboard</title>
      </Head>
      <div className='grid'>
        {stationNumbers.map((station) => (
          <Trains stationNumber={station} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
