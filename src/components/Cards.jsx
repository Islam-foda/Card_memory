// import React from "react";

export default function Cards({ pokemon, handleClick }) {
//  log(pokemon)
  return (
    <ul>
      {pokemon.map((ele) => (
        <li onClick={handleClick} key={ele.id}>
          <img src={ele.image} alt={ele.name}/>
          {ele.name}
        </li>
      ))}
    </ul>
  );
}
