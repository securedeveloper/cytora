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
  PriceChange,
  Straighten,
  Speed,
  Diversity3,
  Groups,
  Scale,
  HourglassBottom,
  Bolt,
  FlashOn,
  MergeType,
  DateRange,
  PersonPinCircle,
  Videocam,
  Launch as UrlIcon,
} from '@mui/icons-material'
import { ListItem } from "../../components/list-item/ListItem";
import { Button } from "../../components/button/Button";
import { getSlug } from "../../util/util";
import { Starship } from "../../types";

export function StarshipPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [starship, setStarship] = useState<Starship | null>(null);
  const { getSWStarShip } = useSWAPI();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getSWStarShip(Number(id)).then((data) => {
      setStarship(data);
      setLoading(false);
    })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [getSWStarShip, id]);

  return (
    <Page loading={loading} error={error}>
      {starship && <>
        <CssBaseline />
        <Container fixed sx={{ maxWidth: '1024px' }}>
          <Box sx={{ width: '100%', padding: 5, mt: 0.5, boxShadow: 3 }}>
            <nav aria-label="main person details">
            <ListItem>
                  <Button startIcon={<BackIcon />} href="/">Go home</Button>
                </ListItem>
                <ListItem primary="Name" secondary={starship.name} icon={<TitleIcon />} />
                <ListItem primary="Model" secondary={starship.model} icon={<ModelTrainingIcon />} />
                <ListItem primary="Manufacturer" secondary={starship.manufacturer} icon={<PrecisionManufacturing />} />
                <ListItem primary="Cost in credits" secondary={starship.cost_in_credits} icon={<PriceChange />} />
                <ListItem primary="Length" secondary={starship.length} icon={<Straighten />} />
                <ListItem primary="Max atmosphering speed" secondary={starship.max_atmosphering_speed} icon={<Speed />} />
                <ListItem primary="Crew" secondary={starship.crew} icon={<Groups />} />
                <ListItem primary="Passengers" secondary={starship.passengers} icon={<Diversity3 />} />
                <ListItem primary="Cargo capacity" secondary={starship.cargo_capacity} icon={<Scale />} />
                <ListItem primary="Consumables" secondary={starship.consumables} icon={<HourglassBottom />} />
                <ListItem primary="Hyperdrive rating" secondary={starship.hyperdrive_rating} icon={<Bolt />} />
                <ListItem primary="MGLT" secondary={starship.MGLT} icon={<FlashOn />} />
                <ListItem primary="Starship class" secondary={starship.starship_class} icon={<MergeType />} />
                <ListItem primary="Pilots" icon={<PersonPinCircle />} />
                <ListItem>
                  <Grid container spacing={1}>
                    {starship.pilots.map((pilot: string) => <Button key={pilot} startIcon={<UrlIcon />} href={`/person/${getSlug(pilot)}`}>{getSlug(pilot)}</Button>)}
                  </Grid>
                </ListItem>
                <ListItem primary="Films" icon={<Videocam />} />
                <ListItem>
                  <Grid container spacing={1}>
                    {starship.films.map((film: string) => <Button key={film} startIcon={<UrlIcon />} href={`/film/${getSlug(film)}`}>{getSlug(film)}</Button>)}
                  </Grid>
                </ListItem>
                <ListItem primary="Created" secondary={new Date(starship.created).toDateString()} icon={<DateRange />} />
                <ListItem primary="Edited" secondary={new Date(starship.edited).toDateString()} icon={<DateRange />} />
            </nav>
          </Box>
        </Container>
      </>}
    </Page>
  );
}