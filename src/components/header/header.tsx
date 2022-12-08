import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { LinkBehavior } from "../../theme";
import { Button } from "../button/Button";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLocation, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { Bloodtype, Explore, Movie, Person, RocketLaunch, Search, Snowmobile } from "@mui/icons-material";
import { SearchBar } from "../search/SearchBar";

const pageTitleMap: Record<string, string> = {
  favorites: ' - Favorite Characters',
  person: ' -  Character',
  film: ' - Film',
  planet: ' - Planet',
  starship: '- Starship',
  vehicle: ' - Vehicle',
  specie: ' - Specie',
}

const iconStyle = { display: { xs: 'none', md: 'flex' }, mr: 1 }

const pageIconMap: Record<string, ReactNode> = {
  favorites: <FavoriteIcon sx={iconStyle} />,
  person: <Person sx={iconStyle} />,
  film: <Movie sx={iconStyle} />,
  planet: <Explore sx={iconStyle} />,
  starship: <RocketLaunch sx={iconStyle} />,
  vehicle: <Snowmobile sx={iconStyle} />,
  specie: <Bloodtype sx={iconStyle} />,
  search: <Search sx={iconStyle} />,
}

export function Header() {
  const location = useLocation();
  const urlChunks = location.pathname.split('/');
  const currentPage = urlChunks[1];
  const [ search, type ] = [ urlChunks[2], urlChunks[3]];
  const isSearchPage = currentPage === 'search' && search && type;
  const pageTitle = isSearchPage ? ` - ${type} - ${search}` : (pageTitleMap[currentPage || 'n-a']) as string || '';
  const PageIcon = pageIconMap[currentPage || 'n-a'] as ReactNode || <HomeIcon sx={iconStyle} />;


  return (
    <>
      <AppBar position="static" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {PageIcon}
            <Typography
              variant="h6"
              component={LinkBehavior}
              href="/"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Star Wars {pageTitle}
            </Typography>

            {!isSearchPage && <SearchBar />}

            <Button color="warning" variant="outlined" href="/favorites">
              <FavoriteIcon />&nbsp;&nbsp;Favorites
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}