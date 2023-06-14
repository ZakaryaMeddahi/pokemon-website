
let id;

// Create card for pokemon
function pokemonCard(pokemon) {
    const container = document.querySelector(".pokemons-container");
    const card = document.createElement("div");
    if(container !== null) {
      createDiv(pokemon, container, card);
    }
    retrieveDescription(pokemon, card);
}

const createDiv = (pokemon, container, card) => {
  card.classList = "pokemon-card";
  card.dataset.id = pokemon.id;
  card.dataset.pokemon = JSON.stringify(pokemon);
  styleDiv(card);
  container.appendChild(card);
  createH3(pokemon, card);
  createImg(pokemon, card);
}

const styleDiv = (card) => {
  const theme = localStorage.getItem("theme");
  if(theme) {
    const themeObject = JSON.parse(theme);
    card.style.backgroundColor = themeObject.primaryColor;
    card.style.boxShadow = `1px 1px 15px ${themeObject.cardShadowColor}`;
  }
}

const createH3 = (pokemon, card) => {
  const h3 = document.createElement("h3");
  h3.textContent = pokemon.name;
  h3.classList = "pokemon-name";
  card.appendChild(h3);
}

const createImg = (pokemon, card) => {
  const img = document.createElement("img");
  img.src = pokemon.image;
  img.classList = "pokemon-img";
  card.appendChild(img);
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
  const container = document.querySelector(".pokemons-container");
  for(let i = 1; i <= 150/*pokemons.count*/; i++) {
    // there is no pokemons with id (1011 -> 1280)
    // so skip them
    if(i < 1011 || i > 1280) {
      const intervalId = setInterval(() => {
        if(container.children[i-2] !== undefined || i === 1) {
          clearInterval(intervalId);
          requestPokemon(url+i);
        }
      }, 50);
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

// Send another request to get description about pokemon
const retrieveDescription = (pokemon, card) => {
  const url = pokemon.url;
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onreadystatechange = () => {
    if(request.readyState === 4 && request.status === 200) {
      const description = JSON.parse(request.response);
      getPokemonDescription(pokemon, description, card);
    }
  }
  request.send();
}

// Loop throug "description.flavor_text_entries"
// to get all paragraphs
const getPokemonDescription = (pokemon, description, card) => {
  let descriptions = [];
  description.flavor_text_entries.forEach((desc) => {
    if(desc.language.name === "en" && !descriptions.includes(desc.flavor_text)) {
      descriptions.push(desc.flavor_text);
      card.dataset.description += desc.flavor_text;
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
/**************************************************/
// getPokemons(); /***********************************/
/**************************************************/

export {
  getPokemons
}