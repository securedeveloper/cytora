import { CssBaseline, Container, Box, List, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSWAPI } from "../../hooks/useSWAPI";
import { Film } from "../../types";
import { Page } from "../../components/page/Page";
import { Button } from "../../components/button/Button";

import BackIcon from '@mui/icons-material/ArrowBack';
import TitleIcon from '@mui/icons-material/Title';
import NumbersIcon from '@mui/icons-material/Numbers';
import DescriptionIcon from '@mui/icons-material/Description';
import VideocamIcon from '@mui/icons-material/Videocam';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SnowmobileIcon from '@mui/icons-material/Snowmobile';
import SpeciesIcon from '@mui/icons-material/Bloodtype';
import UrlIcon from '@mui/icons-material/Phonelink';


import { ListItem } from "../../components/list-item/ListItem";
import { getSlug } from "../../util/util";


export function FilmPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [film, setFilm] = useState<Film | null>(null);

  const { getFilms } = useSWAPI();


  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getFilms(Number(id)).then((data) => {
      setFilm(data);
      setLoading(false);
    })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [id, getFilms]);

  return (
    <Page loading={loading} error={error}>
      {film && <>
        <CssBaseline />
        <Container fixed sx={{ maxWidth: '1024px' }}>
          <Box sx={{ width: '100%', padding: 5, mt: 0.5, boxShadow: 3 }}>
            <nav aria-label="main person details">
              <List>
                <ListItem>
                  <Button startIcon={<BackIcon />} href="/">Go home</Button>
                </ListItem>
                <ListItem primary="Title" secondary={film!.title} icon={<TitleIcon />} />
                <ListItem primary="Episode" secondary={film!.episode_id + ''} icon={<NumbersIcon />} />
                <ListItem primary="Opening" secondary={film!.opening_crawl} icon={<DescriptionIcon />} />
                <ListItem primary="Director" secondary={film!.director} icon={<VideocamIcon />} />
                <ListItem primary="Producer" secondary={film!.producer} icon={<GroupWorkIcon />} />
                <ListItem primary="Release Date" secondary={new Date(film!.release_date).toDateString()} icon={<CalendarMonthIcon />} />
                <ListItem primary="Characters" icon={<PersonPinCircleIcon />} />
                <ListItem>
                  <Grid container spacing={1}>
                    {film!.characters.map((character) => <Button key={character} startIcon={<UrlIcon />} href={`/person/${getSlug(character)}`}>{getSlug(character)}</Button>)}
                  </Grid>
                </ListItem>
                <ListItem primary="Planets" icon={<GpsFixedIcon />} />
                <ListItem>
                  <Grid container spacing={1}>
                    {film!.planets.map((planet) => <Button startIcon={<UrlIcon />} key={planet} href={`/planet/${getSlug(planet)}`}>{getSlug(planet)}</Button>)}
                  </Grid>
                </ListItem>
                <ListItem primary="Starships" icon={<RocketLaunchIcon />} />
                <ListItem>
                  <Grid container spacing={1}>
                    {film!.starships.map((starship) => <Button startIcon={<UrlIcon />} key={starship} href={`/starship/${getSlug(starship)}`}>{getSlug(starship)}</Button>)}
                  </Grid>
                </ListItem>
                <ListItem primary="Vehicles" icon={<SnowmobileIcon />} />
                <ListItem>
                  <Grid container spacing={1}>
                    {film!.vehicles.map((vehicle) => <Button startIcon={<UrlIcon />} key={vehicle} href={`/vehicle/${getSlug(vehicle)}`}>{getSlug(vehicle)}</Button>)}
                  </Grid>
                </ListItem>
                <ListItem primary="Species" icon={<SpeciesIcon />} />
                <ListItem>
                  <Grid container spacing={1}>
                    {film!.species.map((specie) => <Button startIcon={<UrlIcon />} key={specie} href={`/specie/${getSlug(specie)}`}>{getSlug(specie)}</Button>)}
                  </Grid>
                </ListItem>
                <ListItem primary="Created" secondary={new Date(film!.created).toDateString()} icon={<CalendarMonthIcon />} />
                <ListItem primary="Edited" secondary={new Date(film!.edited).toDateString()} icon={<CalendarMonthIcon />} />
              </List>
            </nav>
          </Box>
        </Container>
      </>}
    </Page>
  );
}
