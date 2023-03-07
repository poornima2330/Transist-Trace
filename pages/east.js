import Head from "next/head";
import Buses from "../components/Buses";
import Trains from "../components/Trains";

export default function East() {
  return (
    <div className='main'>
      <Head>
        <title>East Side Schedule</title>
        <link rel='icon' type='image/png' href='/favicon.png' />
      </Head>
      <br />
      <h1>Local Schedule</h1>
      <div className='grid'>
        <Trains stationName='Howard' stationNumber='30279' color='red' />
        <Trains stationName='95th/Dan Ryan' stationNumber='30280' color='red' />

        <Buses
          stationName='Streeterville/Taylor'
          routeNumber='157'
          stopNumber='1101'
        />
        <Buses
          stationName='Chestnut/Lake Shore'
          routeNumber='157'
          stopNumber='1123'
        />

        <Buses stationName='Chicago West' routeNumber='66' stopNumber='601' />
        <Buses stationName='Chicago East' routeNumber='66' stopNumber='18223' />
      </div>
    </div>
  );
}
