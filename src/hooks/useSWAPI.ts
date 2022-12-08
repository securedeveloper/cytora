import {
  getSWPeople,
  getPlanet,
  getSWStarShip,
  getPeopleDetails,
  getFilms,
  getSpecies,
  getVehicle,
  searchSW
} from '../api/SWAPI';

export const useSWAPI = () => {
  return {
    getPlanet,
    getSWStarShip,
    getPeopleDetails,
    getFilms,
    getSpecies,
    getVehicle,
    getSWPeople,
    searchSW
  }
}
