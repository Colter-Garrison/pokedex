import { useEffect, useState } from 'react';
import { getPokemon } from './services/fetch-utils';
import { getYelp } from './services/fetch-utils';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonQuery, setPokemonQuery] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [yelpQuery, setYelpQuery] = useState('Corvallis');
  
  async function fetchAndStorePokemon() {
    const data = await getPokemon(pokemonQuery);
    setPokemon(data.results);
  }

  async function fetchAndStoreYelp() {
    const data = await getYelp(yelpQuery);
    setBusinesses(data.businesses);
  }

  useEffect(() => {
    fetchAndStorePokemon();
    fetchAndStoreYelp();
  }, []); //eslint-disable-line

  async function handleSubmit(e) {
    e.preventDefault();
    await fetchAndStorePokemon();
    setPokemonQuery('');
  }
  
  async function handleYelpSubmit(e) {
    e.preventDefault();
    await fetchAndStoreYelp();
    setYelpQuery('');
  }

  return (
    <div className="App">
      <div className='pokemon-list'>
        <form onSubmit={handleSubmit}>
          <input onChange={e => setPokemonQuery(e.target.value)} />
          <button>Search</button>
        </form>
        {
          pokemon.map((poke, i) => <div
            key={poke.pokemon + i} className='pokemon'>
            <img src={poke.url_image} />
            <p>{poke.pokemon}</p>
          </div>)
        }
      </div>
      <div className='yelp-list'>
        <form onSubmit={handleYelpSubmit}>
          <input onChange={e => setYelpQuery(e.target.value)} />
          <button>Search</button>
        </form>
        {
          businesses.map((business, i) => <div
            key={business.name + i} className='business'>
            <p>{business.name}</p>
          </div>)
        }
      </div>
    </div>
  );
}

export default App;
