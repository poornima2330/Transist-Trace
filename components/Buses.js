import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function Buses(props) {
  const { data, error, isLoading } = useSWR(
    `/api/buses?routeNumber=${props.routeNumber}&stopNumber=${props.stopNumber}`,
    fetcher,
    { refreshInterval: 30000 }
  );
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className={`predictions buses`}>
        <h2 align='center'>{props.stationName} Trains</h2>
        <div className='prediction loading' />
        <div className='prediction loading' />
      </div>
    );

  const buses = data["bustime-response"].prd;

  return (
    <div className='predictions buses'>
      <h2 align='center'>{props.stationName} Buses</h2>
      {buses ? (
        buses.map((bus) => (
          <div
            className={`prediction ${
              isNaN(bus.prdctdn)
                ? bus.prdctdn.toLowerCase()
                : `${bus.prdctdn} mins`
            }`}
            key={bus.prdctdn}
          >
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
        <div className={`prediction`}>
          <p className='prediction-route-number'>No Bus Online</p>
        </div>
      )}
    </div>
  );
}
