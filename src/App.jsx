import { useState } from "react";
import "./App.css";

const initialArray = ["one", "two", "three", "four", "five", "six"];

function shuffle(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    if (j !== i) result[i] = result[j];
    result[j] = array[i];
  }
  return result;
}
const url = 'https://pokeapi.co/api/v2/pokemon/ditto'

fetch(url).then((res)=>{
  res.json();
console.log(res)
})

function App() {
  const [rndArray, setRndArray] = useState(initialArray);

  const handleClick = () => {
    setRndArray(shuffle(rndArray));
  };

  return (
    <>
      <div className="container">
        <ul onClick={handleClick}>
          {rndArray.map((ele) => (
            <li key={ele}>{ele}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
