import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function Trains(props) {
  const { data, error, isLoading } = useSWR(
    `/api/trains?stationNumber=${props.stationNumber}`,
    fetcher,
    { refreshInterval: 30000 }
  );
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className={`predictions trains`}>
        <h2 align='center'>Trains</h2>
        <div className='prediction loading' />
        <div className='prediction loading' />
      </div>
    );

  const trains = data.ctatt.eta;

  function cleanTime(data) {
    const today = new Date();
    const diff = Math.abs(new Date(data).getTime() - today.getTime());
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    return minutes;
  }

  return (
    <div className={`predictions trains`}>
      <h2 align='center'>
        {data.ctatt.eta ? `${data.ctatt.eta[0].staNm} Station` : null}
      </h2>
      {trains ? (
        trains.map((train) => (
          <div
            className={`prediction ${train.rt.toLowerCase()} ${
              cleanTime(train.arrT) < 2 ? "due" : ""
            }`}
            key={train.arrT}
          >
            <p className='prediction-route-number'>
              {"To " + train.destNm}
              {/* <span className='prediction-route-number-direction'>
                {train.stpDe}
              </span> */}
            </p>
            <p className='prediction-time'>
              {cleanTime(train.arrT) < 2
                ? "Due"
                : cleanTime(train.arrT) + ` mins`}
            </p>
          </div>
        ))
      ) : (
        <div className={`prediction loading`}>
          <p className='prediction-route-number'>No Train Online</p>
        </div>
      )}
    </div>
  );
}
