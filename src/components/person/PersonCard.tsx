import { Typography, Grid, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import FavoriteIcon from '@mui/icons-material/FavoriteOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import { Person } from "../../types";
import { Button } from "../../components/button/Button";
import { useContext } from "react";
import { FavoritesContext } from "../../hooks/favoritesContext";

export function PersonCard({ person }: { person: Person }) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const urlParts = person.url.split('/');
  const lastSegment = urlParts.pop() || urlParts.pop();
  const isFavorite = favorites.find(p => p.url === person.url);

  return (
    (
      <Grid item key={person.url} xs={12} sm={6} md={4}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}
        >
          <CardMedia>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              {person.gender === 'male' ? <MaleIcon sx={{ fontSize: 100, color: '#347DC1' }} /> : <FemaleIcon sx={{ fontSize: 100, color: '#CC6594' }} />}
            </div>
          </CardMedia>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography textAlign="center" gutterBottom variant="h5" component="h2">
              {person.name}
            </Typography>
          </CardContent>
          <CardActions>
            {!isFavorite && (
              <Button size="small" onClick={(ev) => addFavorite(person)}>
                <FavoriteBorderOutlinedIcon sx={{ color: '#CC6594' }} />
              </Button>
            )}
            {isFavorite && (
              <Button size="small" onClick={() => removeFavorite(person)}>
                <FavoriteIcon sx={{ color: '#CC6594' }} />
              </Button>
            )}

            <Button size="small" href={`/person/${lastSegment}`}>
              Profile <ArrowRightAltRoundedIcon />
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  );
}
