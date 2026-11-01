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
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [highScore, setHighScore] = useState(0);

  const calcScore = (e) => {
    const target = e.target.alt;
    if (clicked.includes(target)) {
      setHighScore((previousHighScore) => Math.max(previousHighScore, score));
      setScore(0);
      setClicked([]);
    } else {
      setClicked((preValue) => [...preValue, target]);
      setScore((preValue) => preValue + 1);
    }
  };

  //handle the shuffle and log the clicked card
  const handleClick = (e) => {
    calcScore(e);
    setPokemon(shuffle(pokemon));
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
          <>
            <h1> Memory Card Game</h1>
            <div className="result">
              <p>Score Board</p>
              <div className="score">
                <p>High Score: {highScore}</p>
              </div>
              <div className="score">
                <p>your Score: {score} </p>
              </div>
            </div>

            <Cards pokemon={pokemon} handleClick={handleClick} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
