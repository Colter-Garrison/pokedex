import { useEffect, useState } from 'react';
import { getPokemon } from './services/fetch-utils';
import { getYelp } from './services/fetch-utils';
import spinner from './ghost-spinner.gif';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonQuery, setPokemonQuery] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [yelpQuery, setYelpQuery] = useState('Corvallis');
  const [isLoading, setIsLoading] = useState(false);
  
  async function fetchAndStorePokemon() {
    setIsLoading(true);
    const data = await getPokemon(pokemonQuery);
    setIsLoading(false);
    setPokemon(data.results);
  }

  async function fetchAndStoreYelp() {
    setIsLoading(true);
    const data = await getYelp(yelpQuery);
    setIsLoading(false);
    setBusinesses(data.businesses);
  }

  useEffect(() => {
    fetchAndStoreYelp();
    fetchAndStorePokemon();
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
          isLoading ? <img src={spinner} /> : pokemon.map((poke, i) => <div
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
          isLoading ? <img src={spinner} /> : businesses.map((business, i) => <div
            key={business.name + i} className='business'>
            <p>{business.name}</p>
          </div>)
        }
      </div>
    </div>
  );
}

export default App;
