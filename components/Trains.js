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
        <h2 align='center'>{props.stationName} Trains</h2>
        <div className='prediction loading' />
        <div className='prediction loading' />
      </div>
    );

  const trains = data.ctatt.eta;

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

  return (
    <div className={`predictions trains`}>
      <h2 align='center'>
        {props.stationName} Train{trains < 2 ? "" : "s"}
      </h2>
      {trains.map((train) => (
        <div
          className={`prediction ${props.color} ${
            cleanTime(train.arrT) < 2 ? "due" : ""
          }`}
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
      ))}
    </div>
  );
}
