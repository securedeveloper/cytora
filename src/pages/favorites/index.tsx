import { Container, Grid, Typography } from "@mui/material";
import { Person } from "../../types";
import { useContext } from "react";
import { FavoritesContext } from "../../hooks/favoritesContext";
import { PersonCard } from "../../components/person/PersonCard";
import { Button } from "../../components/button/Button";
import { Page } from "../../components/page/Page";


export const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <Page>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {(favorites || []).map((person: Person) => <PersonCard key={person.url} person={person} />)}
          {favorites.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" color="inherit" noWrap>
                No favorites yet, try adding some!
              </Typography>
              <Button size="small" href="/">
                Go Home
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
