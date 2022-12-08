import { cache } from '../util/cache';

const BASE_URL = 'https://swapi.dev/api';

const swapiFetcher = async (url: string) => {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const res = await fetch(url);
  const json = await res.json();
  
  cache.set(url, json);

  return json;
}

const getSWPeople = async (page = 1) => swapiFetcher(`${BASE_URL}/people/?page=${page}`);

const getPlanet = async (id: number) => swapiFetcher(`${BASE_URL}/planets/${id}`);

const getSWStarShip = async (id: number) => swapiFetcher(`${BASE_URL}/starships/${id}`);

const getPeopleDetails = async (id: number) => swapiFetcher(`${BASE_URL}/people/${id}`);

const getFilms = async (id: number) => swapiFetcher(`${BASE_URL}/films/${id}`);

const getSpecies = async (id: number) => swapiFetcher(`${BASE_URL}/species/${id}`);

const getVehicle = async (id: number) => swapiFetcher(`${BASE_URL}/vehicles/${id}`);

export type SearchType = 'people' | 'planets' | 'starships' | 'vehicles' | 'species' | 'films';

const searchSW = async (type: SearchType, query: string) => swapiFetcher(`${BASE_URL}/${type}/?search=${query}`);

export {
  getSWPeople,
  getPlanet,
  getSWStarShip,
  getPeopleDetails,
  getFilms,
  getSpecies,
  getVehicle,
  searchSW
}
