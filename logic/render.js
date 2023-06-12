import { applyTheme } from "./style.js";
import { getPokemons } from "./script.js";

const container = document.querySelector(".body-container");

const renderDescriptionPage = () => {
    const pokemonContainer = document.querySelector(".pokemons-container");
    pokemonContainer.addEventListener("click", (event) => {
        Array.from(pokemonContainer.children).forEach(card => {
            let target = event.target;
            // Get id of the cliked pokemon card
            let cardId = target.dataset.id || target.parentElement.dataset.id;
            if(cardId === card.dataset.id) {
                const pokemonObject = JSON.parse(card.dataset.pokemon);
                container.innerHTML = loadDescriptionPage(pokemonObject, card.dataset.description);
                console.log(pokemonObject, card);
            }
        });
    });
}

const loadDescriptionPage = (pokemon, desc) => {
    clearContainer();
    return `
        <div class="arrow">
            <span class="angle"></span>
            <span class="line"></span>
        </div>
        <div class="desc-container">
            <h2 class="pok-name">${pokemon.name}</h2>
            <div class="upper-box">
                ${loadUpperBox(pokemon)}
            </div>
            <div class="bottom-box">
                ${loadBottomBox(desc)}
            </div>
        </div>
    `
}

const loadUpperBox = ({id, name, height, weight, image}) => {
    return `
        <div class="img-card">
            <img class="pok-image" src=${image} alt="">
        </div>
        <div class="specification-box">
            <h2 class="desc-header2">Specification</h2>
            <ul class="specification-list">
                <li>Identifier: <span>${id}</span></li>
                <li>Name: <span>${name}</span></li>
                <li>Height: <span>${height}</span></li>
                <li>Weight: <span>${weight}</span></li>
            </ul>
        </div>
    `
}

const loadBottomBox = (description) => {
    return `
        <h2 class="desc-header2">description</h2>
        <p class="description">
            ${description}
        </p>
    `
}

const loadHomePage = () => {
    clearContainer();
    return `
        <div class="search-container">
            <div class="search-bar">
                <input type="text" id="search-bar" placeholder="pikachu">
                <i id="search-button" class="fa-brands fa-searchengin"></i>
            </div>
        </div>
        <section class="pokemons-container"></section>
    `
}

const clearContainer = () => {
    for(let i = 0; i < container.children.length; i++) {
        container.children[i].style.display = 'none';
    }
    // container.innerHTML = "";
}

const listenToBackArrow = () => {
    const arrow = document.querySelector(".arrow");
    if(arrow !== null) {
        arrow.onclick = () => {
            container.innerHTML = loadHomePage();
            getPokemons();
            applyTheme();
            renderDescriptionPage();
        }
    }
}

// Generate popstate event
const dispatchPopstateEvent = () => {
    const popsateEvent = new Event("popstate");
    window.dispatchEvent(popsateEvent);
}

const mainFunction = () => {
    container.innerHTML = loadHomePage();
    renderDescriptionPage();
    applyTheme();
    container.onclick = () => {
        listenToBackArrow();
        dispatchPopstateEvent();
    }
}

/* START */
mainFunction();

