import { CssBaseline, Container, Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSWAPI } from "../../hooks/useSWAPI";
import { Page } from "../../components/page/Page";

import {
  KeyboardBackspace as BackIcon,
  Title as TitleIcon,
  ModelTraining as ModelTrainingIcon,
  PrecisionManufacturing,
  Straighten,
  Face2,
  Speed,
  Groups,
  DateRange,
  PersonPinCircle,
  Videocam,
  Launch as UrlIcon,
  PriceChange,
  NumbersRounded,
  RocketLaunch,
} from '@mui/icons-material'
import { ListItem } from "../../components/list-item/ListItem";
import { Button } from "../../components/button/Button";
import { getSlug } from "../../util/util";
import { Vehicle } from "../../types";
import Numbers from "@mui/icons-material/Numbers";

export function VehiclePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const { getVehicle } = useSWAPI();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getVehicle(Number(id)).then((data) => {
      setVehicle(data);
      setLoading(false);
    })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [getVehicle, id]);

  return (
    <Page loading={loading} error={error}>
      {vehicle && <>
        <CssBaseline />
        <Container fixed sx={{ maxWidth: '1024px' }}>
          <Box sx={{ width: '100%', padding: 5, mt: 0.5, boxShadow: 3 }}>
            <nav aria-label="main person details">
              <ListItem>
                <Button startIcon={<BackIcon />} href="/">Go home</Button>
              </ListItem>
              <ListItem primary="Name" secondary={vehicle.name} icon={<TitleIcon />} />
              <ListItem primary="Model" secondary={vehicle.model} icon={<ModelTrainingIcon />} />
              <ListItem primary="Manufacturer" secondary={vehicle.manufacturer} icon={<PrecisionManufacturing />} />
              <ListItem primary="Cost in credits" secondary={vehicle.cost_in_credits} icon={<PriceChange />} />
              <ListItem primary="Length" secondary={vehicle.length} icon={<Straighten />} />
              <ListItem primary="Max atmosphering speed" secondary={vehicle.max_atmosphering_speed} icon={<Speed />} />
              <ListItem primary="Crew" secondary={vehicle.crew} icon={<Face2 />} />
              <ListItem primary="Passengers" secondary={vehicle.passengers} icon={<Groups />} />
              <ListItem primary="Cargo capacity" secondary={vehicle.cargo_capacity} icon={<Numbers />} />
              <ListItem primary="Consumables" secondary={vehicle.consumables} icon={<NumbersRounded />} />
              <ListItem primary="Vehicle class" secondary={vehicle.vehicle_class} icon={<RocketLaunch />} />
              <ListItem primary="Pilots" icon={<PersonPinCircle />} />
              <ListItem>
                <Grid container spacing={1}>
                  {vehicle.pilots.map((pilot) => <Button key={pilot} startIcon={<UrlIcon />} href={`/person/${getSlug(pilot)}`}>{getSlug(pilot)}</Button>)}
                </Grid>
              </ListItem>
              <ListItem primary="Films" icon={<Videocam />} />
              <ListItem>
                <Grid container spacing={1}>
                  {vehicle.films.map((film) => <Button key={film} startIcon={<UrlIcon />} href={`/film/${getSlug(film)}`}>{getSlug(film)}</Button>)}
                </Grid>
              </ListItem>
              <ListItem primary="Created" secondary={new Date(vehicle.created).toDateString()} icon={<DateRange />} />
              <ListItem primary="Edited" secondary={new Date(vehicle.edited).toDateString()} icon={<DateRange />} />
            </nav>
          </Box>
        </Container>
      </>}
    </Page>
  );
}