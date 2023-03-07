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
        <h2 align='center'>Buses</h2>
        <div className='prediction loading' />
        <div className='prediction loading' />
      </div>
    );

  console.log(data);

  const buses = data["bustime-response"].prd;

  return (
    <div className='predictions buses'>
      <h2 align='center'>
        {buses
          ? `${buses[0].rt} ${buses[0].rtdir} Bus${
              buses.length > 1 ? "es" : ""
            }`
          : null}
      </h2>
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
                {bus.stpnm}
              </span>
            </p>
            <p className='prediction-time'>
              {isNaN(bus.prdctdn) ? bus.prdctdn : `${bus.prdctdn} mins`}
            </p>
          </div>
        ))
      ) : (
        <div className={`prediction loading`}>
          <p className='prediction-route-number'>No Bus Online</p>
        </div>
      )}
    </div>
  );
}
