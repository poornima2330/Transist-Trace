import { useEffect, useState } from "react";
import { train_routes, determineRouteName } from "../lib/trainLines";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useRouter } from "next/router";

export default function SelectLines() {
  const router = useRouter();
  const [stops, setStops] = useState([]);
  const [selectedTrainRoute, setSelectedTrainRoute] = useState("");
  const [selectedStops, setSelectedStops] = useState([]);

  useEffect(() => {
    if (selectedTrainRoute) {
      fetch(`/api/getTrainStops?route=${selectedTrainRoute}`)
        .then((res) => res.json())
        .then((response) => {
          setStops(response);
        })
        .catch();
    }
  }, [selectedTrainRoute]);

  const handleChange = (e, v) => {
    console.log("e", e, v);
    const { name, checked } = e.target;
    const isChecked = checked;

    setSelectedStops(v);
    // if (!isChecked)
    //   setSelectedStops(selectedStops.filter((stop) => stop !== name));
  };

  console.log("selectedStops", selectedStops);

  const handleTrainRouteSelect = (route) => {
    setSelectedTrainRoute(route);
  };

  return (
    <div>
      <div>
        {selectedStops && selectedStops.length > 0 ? (
          <div>
            {selectedStops.map(
              (item, index) => (index ? ", " : "") + item.stop_id
            )}
            <Button
              variant='contained'
              color='primary'
              disabled={selectedStops.length > 4}
              onClick={() =>
                router.push(
                  `/train?stationNumber=${selectedStops.map(
                    (stop) => stop.stop_id
                  )}&route=${selectedTrainRoute}`
                )
              }
            >
              Go &rarr;
            </Button>
          </div>
        ) : null}

        {train_routes.map((item, index) => (
          <Button onClick={() => handleTrainRouteSelect(item)} key={index}>
            {determineRouteName(item)}
          </Button>
        ))}
      </div>
      {stops && stops.length > 1 ? (
        <>
          <h2>{determineRouteName(selectedTrainRoute)}</h2>
          <Autocomplete
            id='all-stops'
            stops
            multiple
            disableCloseOnSelect
            options={stops}
            onChange={handleChange}
            getOptionLabel={(stop) => stop.stop_name}
            renderOption={(stop, { selected }) => (
              <React.Fragment>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {stop.stop_name}
              </React.Fragment>
            )}
            renderInput={(params) => (
              <>
                <TextField
                  onChange={handleChange}
                  {...params}
                  margin='normal'
                  variant='outlined'
                  label='Stops'
                />
              </>
            )}
          />
        </>
      ) : null}
    </div>
  );
}
