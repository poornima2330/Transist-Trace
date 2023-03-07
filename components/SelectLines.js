import { useEffect, useState } from "react";
import { train_routes, determineRouteName } from "../lib/trainLines";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
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

  const handleChange = (e) => {
    const { name, checked } = e.target;
    const isChecked = checked;

    setSelectedStops((prevState) => [...prevState, name]);
    if (!isChecked)
      setSelectedStops(selectedStops.filter((stop) => stop !== name));
  };

  const handleTrainRouteSelect = (e) => {
    setSelectedTrainRoute(e.target.value);
  };

  return (
    <div>
      <div>
        <InputLabel id='routes-label'>Train Routes</InputLabel>
        {selectedStops && selectedStops.length > 0 ? (
          <div>
            {selectedStops.map((item, index) => (index ? ", " : "") + item)}
            <Button
              variant='contained'
              color='primary'
              disabled={selectedStops.length > 3}
              onClick={() =>
                router.push(
                  `/train?stationNumber=${selectedStops.map(
                    (stop) => stop
                  )}&route=${selectedTrainRoute}`
                )
              }
            >
              Go &rarr;
            </Button>
          </div>
        ) : null}

        <Select
          style={{ width: 300 }}
          labelId='routes-label'
          id='train-routes'
          value={selectedTrainRoute}
          onChange={handleTrainRouteSelect}
        >
          {train_routes.map((item, index) => (
            <MenuItem value={item} key={index}>
              {determineRouteName(item)}
            </MenuItem>
          ))}
        </Select>
      </div>
      {stops && stops.length > 1 ? (
        <FormGroup row>
          {stops.map((stop) => (
            <FormControlLabel
              key={stop.stop_id}
              control={<Checkbox onChange={handleChange} name={stop.stop_id} />}
              label={stop.stop_name}
            />
          ))}
        </FormGroup>
      ) : null}
    </div>
  );
}
