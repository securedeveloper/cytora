import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Page } from "../../components/page/Page";
import { ListItem } from "../../components/list-item/ListItem";
import { Film, Person, Planet, Species, Starship, Vehicle } from "../../types";

import { CssBaseline, Container, Box } from "@mui/material";
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import TitleIcon from '@mui/icons-material/Title';
import LinkIcon from '@mui/icons-material/Link';

import { Button } from "../../components/button/Button";
import { useSWAPI } from "../../hooks/useSWAPI";
import { SearchType } from "../../api/SWAPI";
import { getSlug } from "../../util/util";

export function SearchPage() {
  const { type, search } = useParams();
  const { searchSW } = useSWAPI();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [characters, setCharacters] = useState<Person[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [species, setSpecies] = useState<Species[]>([]);

  useEffect(() => {
    if (!(search && type)) return;

    setLoading(true);
    searchSW(type as SearchType, search).then((data) => {
      if (type === 'people') setCharacters(data.results);
      else if (type === 'films') setFilms(data.results);
      else if (type === 'planets') setPlanets(data.results);
      else if (type === 'starships') setStarships(data.results);
      else if (type === 'vehicles') setVehicles(data.results);
      else if (type === 'species') setSpecies(data.results);
    })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, searchSW, type]);

  return (
    <Page loading={loading} error={error}>
      {species && <>
        <CssBaseline />
        <Container fixed sx={{ maxWidth: '1024px' }}>
          <Box sx={{ width: '100%', padding: 5, mt: 0.5, boxShadow: 3 }}>
            <nav aria-label="main person details">
              <ListItem>
                <Button startIcon={<BackIcon />} href="/">Go home</Button>
              </ListItem>
              {type === 'people' && characters.map((character, index) => (
                <ListItem key={index} primary="Name" secondary={character.name} icon={<TitleIcon />}>
                  <Button startIcon={<LinkIcon />} href={`/person/${getSlug(character.url)}`}>View</Button>
                </ListItem>
              ))}
              {type === 'films' && films.map((film, index) => (
                <ListItem key={index} primary="Name" secondary={film.title} icon={<TitleIcon />}>
                  <Button startIcon={<LinkIcon />} href={`/film/${getSlug(film.url)}`}>View</Button>
                </ListItem>
              ))}
              {type === 'planets' && planets.map((planet, index) => (
                <ListItem key={index} primary="Name" secondary={planet.name} icon={<TitleIcon />}>
                  <Button startIcon={<LinkIcon />} href={`/planet/${getSlug(planet.url)}`}>View</Button>
                </ListItem>
              ))}
              {type === 'starships' && starships.map((starship, index) => (
                <ListItem key={index} primary="Name" secondary={starship.name} icon={<TitleIcon />}>
                  <Button startIcon={<LinkIcon />} href={`/starship/${getSlug(starship.url)}`}>View</Button>
                </ListItem>
              ))}
              {type === 'vehicles' && vehicles.map((vehicle, index) => (
                <ListItem key={index} primary="Name" secondary={vehicle.name} icon={<TitleIcon />}>
                  <Button startIcon={<LinkIcon />} href={`/vehicle/${getSlug(vehicle.url)}`}>View</Button>
                </ListItem>
              ))}
              {type === 'species' && species.map((specie, index) => (
                <ListItem key={index} primary="Name" secondary={specie.name} icon={<TitleIcon />}>
                  <Button startIcon={<LinkIcon />} href={`/specie/${getSlug(specie.url)}`}>View</Button>
                </ListItem>
              ))}
            </nav>
          </Box>
        </Container>
      </>}
    </Page>
  )
}
