import { useState, createContext, ReactNode } from "react";
import { Person } from "../types";

type FavoritesContextType = {
  favorites: Person[];
  addFavorite: (person: Person) => void;
  removeFavorite: (person: Person) => void;
}

export const FavoritesContext = createContext({
  favorites: [],
  addFavorite: (person: Person) => { },
  removeFavorite: (person: Person) => { },
} as FavoritesContextType);

export const FavoritesContextProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavourites] = useState<Person[]>([]);

  const addFavorite = (person: Person) => {
    setFavourites([...favorites, person]);
  };

  const removeFavorite = (person: Person) => {
    setFavourites(favorites.filter(favourite => favourite.url !== person.url));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
