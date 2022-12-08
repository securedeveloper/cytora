import React from 'react'
import { ThemeProvider } from "@emotion/react"
import { createTheme, CssBaseline } from "@mui/material"
import { Header } from "../components/header/header"
import { Link as RouterLink } from 'react-router-dom'
import { LinkProps } from '@mui/material/Link'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from '../pages/home';
import { PersonDetails } from '../pages/Person';
import { Favorites } from '../pages/favorites'
import { FilmPage } from '../pages/film'
import { PlanetPage } from '../pages/planet'
import { StarshipPage } from '../pages/starship'
import { VehiclePage } from '../pages/vehicle'
import { SpeciePage } from '../pages/specie'
import { SearchPage } from '../pages/search'

type LinkBehaviorType = {
  children: React.ReactNode;
  to?: string;
  href?: string;
}

export const LinkBehavior = React.forwardRef((props: LinkBehaviorType, ref: any) => (
  <RouterLink ref={ref} to={(props.to || props.href) as string} {...props} role={undefined} />
));

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    }
  },
});

export function Theme1() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="person/:id" element={<PersonDetails />} />
            <Route path="film/:id" element={<FilmPage />} />
            <Route path="planet/:id" element={<PlanetPage />} />
            <Route path="starship/:id" element={<StarshipPage />} />
            <Route path="vehicle/:id" element={<VehiclePage />} />
            <Route path="specie/:id" element={<SpeciePage />} />
            <Route path="search/:type/:search" element={<SearchPage />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  )
}
