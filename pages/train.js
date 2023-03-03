import Trains from "../components/Trains";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function TrainPage() {
  const router = useRouter();
  const { stationNumber, route } = router.query;

  const { data, error, isLoading } = useSWR(
    `/api/getTrainRoutes?route=${route}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className={`predictions buses`}>
        <h2 align='center'>Buses</h2>
        <div className='prediction loading' />
        <div className='prediction loading' />
      </div>
    );

  console.log(data);

  return (
    <div className='main'>
      <div className='grid'>
        <Trains stationNumber={stationNumber} />
      </div>
    </div>
  );
}
