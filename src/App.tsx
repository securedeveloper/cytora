import './App.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Theme1 } from './theme';
import { FavoritesContextProvider } from './hooks/favoritesContext';

export default function App() {
  return (
    <FavoritesContextProvider>
      <Theme1/>
    </FavoritesContextProvider>
  );
}
