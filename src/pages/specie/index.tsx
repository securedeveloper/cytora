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
  Height,
  Face2,
  HourglassBottom,
  DateRange,
  PersonPinCircle,
  Videocam,
  Launch as UrlIcon,
  RemoveRedEye,
  Language,
  Rocket,
} from '@mui/icons-material'
import { ListItem } from "../../components/list-item/ListItem";
import { Button } from "../../components/button/Button";
import { getSlug } from "../../util/util";
import { Species } from "../../types";

export function SpeciePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [specie, setSpecie] = useState<Species | null>(null);
  const { getSpecies } = useSWAPI();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getSpecies(Number(id)).then((data) => {
      setSpecie(data);
      setLoading(false);
    })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [getSpecies, id]);

  return (
    <Page loading={loading} error={error}>
      {specie && <>
        <CssBaseline />
        <Container fixed sx={{ maxWidth: '1024px' }}>
          <Box sx={{ width: '100%', padding: 5, mt: 0.5, boxShadow: 3 }}>
            <nav aria-label="main person details">
              <ListItem>
                <Button startIcon={<BackIcon />} href="/">Go home</Button>
              </ListItem>
              <ListItem primary="Name" secondary={specie.name} icon={<TitleIcon />} />
              <ListItem primary="Classification" secondary={specie.classification} icon={<ModelTrainingIcon />} />
              <ListItem primary="Designation" secondary={specie.designation} icon={<PrecisionManufacturing />} />
              <ListItem primary="Average Height" secondary={specie.average_height} icon={<Height />} />
              <ListItem primary="Skin Colors" secondary={specie.skin_colors} icon={<Face2 />} />
              <ListItem primary="Hair Colors" secondary={specie.hair_colors} icon={<Face2 />} />
              <ListItem primary="Eye Colors" secondary={specie.eye_colors} icon={<RemoveRedEye />} />
              <ListItem primary="Average Lifespan" secondary={specie.average_lifespan} icon={<HourglassBottom />} />
              <ListItem primary="Language" secondary={specie.language} icon={<Language />} />
              <ListItem primary="Planet" icon={<Rocket />}>
                <Button startIcon={<UrlIcon/>} href={`/planet/${getSlug(specie.homeworld)}`}>{getSlug(specie.homeworld)}</Button>
              </ListItem>
              <ListItem primary="People" icon={<PersonPinCircle />} />
              <ListItem>
                <Grid container spacing={1}>
                  {specie.people.map((person) => <Button key={person} startIcon={<UrlIcon />} href={`/person/${getSlug(person)}`}>{getSlug(person)}</Button>)}
                </Grid>
              </ListItem>
              <ListItem primary="Films" icon={<Videocam />} />
              <ListItem>
                <Grid container spacing={1}>
                  {specie.films.map((film) => <Button key={film} startIcon={<UrlIcon />} href={`/film/${getSlug(film)}`}>{getSlug(film)}</Button>)}
                </Grid>
              </ListItem>
              <ListItem primary="Created" secondary={new Date(specie.created).toDateString()} icon={<DateRange />} />
              <ListItem primary="Edited" secondary={new Date(specie.edited).toDateString()} icon={<DateRange />} />
            </nav>
          </Box>
        </Container>
      </>}
    </Page>
  );
}