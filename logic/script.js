
let id;

// This anoying function to create card for pokemon
function pokemonCard(pokemon) {
    const card = document.createElement("div");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const container = document.querySelector(".pokemons-container");
    if(container !== null) {
      const theme = localStorage.getItem("theme");
      const themeObject = JSON.parse(theme);
      card.classList = "pokemon-card";
      card.dataset.id = pokemon.id;
      card.dataset.pokemon = JSON.stringify(pokemon);
      //div.dataset.desc = pokemon.description
      // console.log(div.dataset.pokemon);
      card.style.backgroundColor = themeObject.primaryColor;
      card.style.boxShadow = `1px 1px 15px ${themeObject.cardShadowColor}`;
      img.src = pokemon.image;
      img.classList = "pokemon-img"
      h3.textContent = pokemon.name;
      h3.classList = "pokemon-name"

      card.appendChild(img);
      card.appendChild(h3);
      container.appendChild(card);
      retrieveDescription(pokemon, card);
    }
}

// #Creating Card
// create card(div)
// create h3 node
// create img node
// style div
// add imgUrl to img


// #Requirements API
// create http request
// open connection with https://pokeapi.co/api/v2/pokemon/
// listen for request if it's loaded
// send request 
// Result:
// object containes count property (number of pokemons)
// so we need another request to get pokemons and their descrition (name, img ...)



function getPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  requestPokemons(url);
}

// Request "https://pokeapi.co/api/v2/pokemon/"
// to get the number of Pokemons (count)
const requestPokemons = (url) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onreadystatechange = () => {
    if(request.readyState === 4 && request.status === 200) {
      const pokemons = JSON.parse(request.response);
      requestAllPokemons(url, pokemons);
    }
  }
  request.send();
}

const requestAllPokemons = (url, pokemons) => {
  id = 1;
  for(let i = 1; i < pokemons.count; i++) {
    // there is no pokemons with id (1011 -> 1280)
    // so skip them
    if(i < 1011 || i > 1280) {
      requestPokemon(url+i);
    }
  }
}

// Request "https://pokeapi.co/api/v2/pokemon/${i}"
// to get single pokemon
const requestPokemon = (url) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onreadystatechange = () => {
    requestPokemonResponse(request);
  }
  request.send();
}

// Get response
const requestPokemonResponse = (request) => {
  if(request.readyState === 4 && request.status === 200) {
    const pokemon = JSON.parse(request.response);
    if(pokemon.sprites.other.dream_world["front_default"] !== null) {
      getDataForCard(pokemon, id);
      id++;
    }
  }
}

// Send another request to get desription about pokemon
const retrieveDescription = (pokemon, card) => {
  const url = pokemon.url;
  const request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.onreadystatechange = () => {
    if(request.readyState === 4 && request.status === 200) {
      const description = JSON.parse(request.response);
      getPokemonDescription(pokemon, description, card);
    }
  }
  request.send();
  console.log("inside retrieve");
}

const getPokemonDescription = (pokemon, description, card) => {
  let descriptions = [];
  description.flavor_text_entries.forEach((desc) => {
    if(desc.language.name === "en" && !descriptions.includes(desc.flavor_text)) {
      console.log(desc);
      console.log(card.dataset.id);
      descriptions.push(desc.flavor_text);
      card.dataset.description += desc.flavor_text;
      console.log("inside get description");
    }
  });
  console.log(pokemon);
}

// Create Pokemon Object
const getDataForCard = (pokemon, id) => {
  const pokemonSpecification = {
    id: id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    image: pokemon.sprites.other.dream_world["front_default"],
    url: pokemon.species.url
  };
  pokemonCard(pokemonSpecification);
}

getPokemons();

export {
  getPokemons
}