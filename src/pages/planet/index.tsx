import { Box, Container, CssBaseline, Grid, List } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { ListItem } from "../../components/list-item/ListItem";
import { useSWAPI } from "../../hooks/useSWAPI";
import { Planet } from "../../types";
import { Page } from "../../components/page/Page";

import BackIcon from '@mui/icons-material/ArrowBack';
import TitleIcon from '@mui/icons-material/Title';
import NumbersIcon from '@mui/icons-material/Numbers';
import CloudIcon from '@mui/icons-material/Cloud';
import DescriptionIcon from '@mui/icons-material/Description';
import VideocamIcon from '@mui/icons-material/Videocam';
import WaterIcon from '@mui/icons-material/Water';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import UrlIcon from '@mui/icons-material/Phonelink';
import { getSlug } from "../../util/util";

export function PlanetPage() {
  const { id } = useParams();
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { getPlanet } = useSWAPI();


  useEffect(() => {
    setIsLoading(true);
    getPlanet(Number(id))
      .then((planet) => setPlanet(planet))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false))
  }, [getPlanet, id]);

  return (
    <Page loading={isLoading} error={error}>

      {planet && (
        <>
          <CssBaseline />
          <Container fixed sx={{ maxWidth: '1024px' }}>
            <Box sx={{ width: '100%', padding: 5, mt: 0.5, boxShadow: 3 }}>
              <nav aria-label="main person details">
                <List>
                  <ListItem>
                    <Button startIcon={<BackIcon />} href="/">Go back</Button>
                  </ListItem>
                  <ListItem primary="Name" secondary={planet.name} icon={<TitleIcon />} />
                  <ListItem primary="Rotation period" secondary={planet.rotation_period} icon={<NumbersIcon />} />
                  <ListItem primary="Orbital period" secondary={planet.orbital_period} icon={<NumbersIcon />} />
                  <ListItem primary="Diameter" secondary={planet.diameter} icon={<NumbersIcon />} />
                  <ListItem primary="Climate" secondary={planet.climate} icon={<CloudIcon />} />
                  <ListItem primary="Gravity" secondary={planet.gravity} icon={<DescriptionIcon />} />
                  <ListItem primary="Terrain" secondary={planet.terrain} icon={<VideocamIcon />} />
                  <ListItem primary="Surface water" secondary={planet.surface_water} icon={<WaterIcon />} />
                  <ListItem primary="Population" secondary={planet.population} icon={<GroupWorkIcon />} />
                  <ListItem primary="Residents" icon={<PersonPinCircleIcon />} />
                  <ListItem>
                    <Grid container spacing={1}>
                      {planet.residents.map((resident) => <Button key={resident} startIcon={<UrlIcon />} href={`/person/${getSlug(resident)}`}>{getSlug(resident)}</Button>)}
                    </Grid>
                  </ListItem>
                  <ListItem primary="Films" icon={<VideocamIcon />} />
                  <ListItem>
                    <Grid container spacing={1}>
                      {planet.films.map((film) => <Button key={film} startIcon={<UrlIcon />} href={`/film/${getSlug(film)}`}>{getSlug(film)}</Button>)}
                    </Grid>
                  </ListItem>
                  <ListItem primary="Created" secondary={new Date(planet.created).toDateString()} icon={<CalendarMonthIcon />} />
                  <ListItem primary="Edited" secondary={new Date(planet.edited).toDateString()} icon={<CalendarMonthIcon />} />
                </List>
              </nav>
            </Box>
          </Container>
        </>
      )}
    </Page>
  );

}