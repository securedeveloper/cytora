import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSWAPI } from "../../hooks/useSWAPI";
import { Person } from "../../types";

import CssBaseline from '@mui/material/CssBaseline';
import {
  Container, Box, List, Stack
} from "@mui/material";

import HeightIcon from '@mui/icons-material/Height';
import BadgeIcon from '@mui/icons-material/Badge';
import WeightIcon from '@mui/icons-material/FitnessCenter';
import SkinIcon from '@mui/icons-material/PanoramaFishEye';
import HairMaleIcon from '@mui/icons-material/Face';
import HairFemaleIcon from '@mui/icons-material/Face4';
import NeutralIcon from '@mui/icons-material/Face5';
import EyeIcon from '@mui/icons-material/Visibility';
import BirthdayIcon from '@mui/icons-material/CalendarMonth';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HomeWorldIcon from '@mui/icons-material/TravelExplore';
import FilmsIcon from '@mui/icons-material/CameraRoll';
import SpeciesIcon from '@mui/icons-material/Bloodtype';
import VehicleIcon from '@mui/icons-material/Snowmobile';
import StarShipIcon from '@mui/icons-material/RocketLaunch';
import DateIcon from '@mui/icons-material/Event';
import UrlIcon from '@mui/icons-material/Phonelink';
import BackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "../../components/button/Button";
import { ListItem } from "../../components/list-item/ListItem";
import { Page } from "../../components/page/Page";

export function PersonDetails() {
  const { id } = useParams();
  const { getPeopleDetails } = useSWAPI();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [person, setPerson] = useState<Person | null>(null);

  const getSlug = (url?: string) => {
    if (!url) return;

    const slug = url.split('/').filter(Boolean);
    return slug.pop() || slug.pop();
  }

  useEffect(() => {
    setIsLoading(true);
    getPeopleDetails(Number(id))
      .then((person) => setPerson(person))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false))
  }, [getPeopleDetails, id]);

  const isMale = person?.gender === 'male';
  const isFemale = person?.gender === 'female';
  const isNeutral = !isMale && !isFemale;

  const homeWorldSlug = getSlug(person?.homeworld);

  return (
    <Page loading={isLoading} error={error}>
      <CssBaseline />
      {person && <Container fixed sx={{ maxWidth: '1024px' }}>
        <Box sx={{ width: '100%', padding: 5, mt: 0.5, boxShadow: 3 }}>
          <nav aria-label="main person details">
            <List>
              <ListItem>
                <Button startIcon={<BackIcon />} href="/">Go back</Button>
              </ListItem>
              <ListItem primary="Name" secondary={person.name} icon={<BadgeIcon />} />
              <ListItem primary="Height" secondary={person.height + ''} icon={<HeightIcon />} />
              <ListItem primary="Weight" secondary={person.mass + ''} icon={<WeightIcon />} />
              <ListItem primary="Hair Color" secondary={person.hair_color} icon={<>
                {isMale && <HairMaleIcon />}
                {isFemale && <HairFemaleIcon />}
                {isNeutral && <NeutralIcon />}
              </>} />
              <ListItem primary="Skin Color" secondary={person.hair_color} icon={<SkinIcon />} />
              <ListItem primary="Eye Color" secondary={person.eye_color} icon={<EyeIcon />} />
              <ListItem primary="Birth Year" secondary={person.birth_year} icon={<BirthdayIcon />} />
              <ListItem primary="Gender" secondary={person.gender} icon={<>
                {isMale && <MaleIcon />}
                {isFemale && <FemaleIcon />}
                {isNeutral && <NeutralIcon />}</>} />
              <ListItem primary="Planet" icon={<HomeWorldIcon />}>
                {
                  homeWorldSlug && <Button href={`/planet/${homeWorldSlug}`} variant="outlined" size="small" startIcon={<UrlIcon />}>
                    {homeWorldSlug}
                  </Button>
                }
              </ListItem>
              <ListItem primary="Films" icon={<FilmsIcon />}>
                <Stack direction="row" spacing={1}>
                  {person.films.map((url) => (
                    <Button key={url} href={`/film/${getSlug(url)}`} variant="outlined" size="small" startIcon={<UrlIcon />}>
                      {getSlug(url)}
                    </Button>
                  ))}
                </Stack>
              </ListItem>
              <ListItem primary="Species" icon={<SpeciesIcon />}>
                <Stack direction="row" spacing={1}>
                  {person.species.map((url) => (
                    <Button key={url} href={`/species/${getSlug(url)}`} variant="outlined" size="small" startIcon={<UrlIcon />}>
                      {getSlug(url)}
                    </Button>
                  ))}
                </Stack>
              </ListItem>
              <ListItem primary="Vehicle" icon={<VehicleIcon />}>
                <Stack direction="row" spacing={1}>
                  {person.vehicles.map((url) => (
                    <Button key={url} href={`/vehicle/${getSlug(url)}`} variant="outlined" size="small" startIcon={<UrlIcon />}>
                      {getSlug(url)}
                    </Button>
                  ))}
                </Stack>
              </ListItem>
              <ListItem primary="Starships" icon={<StarShipIcon />}>
                <Stack direction="row" spacing={1}>
                  {person.starships.map((url) => (
                    <Button key={url} href={`/starship/${getSlug(url)}`} variant="outlined" size="small" startIcon={<UrlIcon />}>
                      {getSlug(url)}
                    </Button>
                  ))}
                </Stack>
              </ListItem>
              <ListItem primary="Created" secondary={new Date(person.created).toDateString()} icon={<DateIcon />} />
              <ListItem primary="Edited" secondary={new Date(person.edited).toDateString()} icon={<DateIcon />} />
            </List>
          </nav>
        </Box>
      </Container>}
    </Page>
  );
}