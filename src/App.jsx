import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";

const POKEMON = [
  "ditto",
  "pikachu",
  "bulbasaur",
  "charmander",
  "squirtle",
  "eevee",
];

function shuffle(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    if (j !== i) result[i] = result[j];
    result[j] = array[i];
  }
  return result;
}
const url = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);

  //example test
  const handleClick = (e) => {
    setPokemon(shuffle(pokemon));
    console.log(e.target.alt);
  };

  //fetching the data
  useEffect(() => {
    let ignore = false;
    async function fetchPokemons() {
      try {
        const results = await Promise.all(
          POKEMON.map(async (poke) => {
            const res = await fetch(`${url}${poke}`);
            if (!res.ok) throw new Error("failed to fetch");
            const data = await res.json();
            return {
              id: data.id,
              name: data.name,
              image: data.sprites.other["official-artwork"].front_shiny,
            };
          }),
        );
        if (!ignore) setPokemon(results);
      } catch (error) {
        console.error(error.error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchPokemons();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Cards pokemon={pokemon} handleClick={handleClick} />
        )}
      </div>
    </>
  );
}

export default App;
