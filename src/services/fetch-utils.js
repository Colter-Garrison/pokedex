export async function getPokemon(filter) {
  const rawData = await fetch(`http://localhost:8888/.netlify/functions/pokemon?pokeQuery=${filter}`);
  const data = await rawData.json();

  return data;
}

export async function getYelp(filter) {
  const rawData = await fetch(`http://localhost:8888/.netlify/functions/yelp?yelpQuery=${filter}`);
  const data = await rawData.json();

  return data;
}