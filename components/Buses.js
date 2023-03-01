import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function Buses(props) {
  const { data, error, isLoading } = useSWR(
    `/api/buses?routeNumber=${props.routeNumber}&stopNumber=${props.stopNumber}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const buses = data["bustime-response"].prd;

  return (
    <div className='predictions buses'>
      <h2 align='center'>{props.stationName} Buses</h2>
      {buses && buses.length ? (
        buses.map((bus) => (
          <div className='prediction' key={bus.prdctdn}>
            <p className='prediction-route-number'>
              {bus.rt + " To " + bus.des}
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
        <>
          <div className='prediction loading' />
          <div className='prediction loading' />
        </>
      )}
    </div>
  );
}
