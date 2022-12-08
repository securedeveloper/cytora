type SWAPI_URL = string;

export type Person = {
  name: string
  height: number,
  mass: number,
  hair_color: string,
  skin_color: string
  eye_color: string,
  birth_year: string
  gender: string,
  homeworld: SWAPI_URL,
  films: SWAPI_URL[],
  species: [],
  vehicles: SWAPI_URL[],
  starships: SWAPI_URL[],
  created: string,
  edited: string,
  url: SWAPI_URL
}

export type Film = {
  title: string,
  episode_id: string,
  opening_crawl: string,
  director: string,
  producer: string,
  release_date: string,
  characters: SWAPI_URL[],
  planets: SWAPI_URL[],
  starships: SWAPI_URL[],
  vehicles: SWAPI_URL[],
  species: SWAPI_URL[],
  created: string,
  edited: string,
  url: SWAPI_URL
}

export type Planet = {
  name: string, 
  rotation_period: string, 
  orbital_period: string, 
  diameter: string, 
  climate: string, 
  gravity: string,
  terrain: string, 
  surface_water: string, 
  population: string, 
  residents: SWAPI_URL[],
  films: SWAPI_URL[],
  created: string, 
  edited: string, 
  url: SWAPI_URL
}

export type Starship = {
  name: string,
  model: string,
  manufacturer: string,
  cost_in_credits: string,
  length: string,
  max_atmosphering_speed: string,
  crew: string,
  passengers: string,
  cargo_capacity: string,
  consumables: string,
  hyperdrive_rating: string,
  MGLT: string,
  starship_class: string,
  pilots: SWAPI_URL[],
  films: SWAPI_URL[],
  created: string,
  edited: string,
  url: SWAPI_URL
}

export type Vehicle = {
  name: string,
  model: string,
  manufacturer: string,
  cost_in_credits: string,
  length: string,
  max_atmosphering_speed: string,
  crew: string,
  passengers: string,
  cargo_capacity: string,
  consumables: string,
  vehicle_class: string,
  pilots: SWAPI_URL[],
  films: SWAPI_URL[],
  created: string,
  edited: string,
  url: SWAPI_URL
}

export type Species = {
  name: string,
  classification: string,
  designation: string,
  average_height: string,
  skin_colors: string,
  hair_colors: string,
  eye_colors: string,
  average_lifespan: string,
  homeworld: SWAPI_URL,
  language: string,
  people: SWAPI_URL[],
  films: SWAPI_URL[],
  created: string,
  edited: string,
  url: SWAPI_URL
}
