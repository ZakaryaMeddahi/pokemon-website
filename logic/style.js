
const checkbox = document.getElementById("checkbox");
const container = document.querySelector(".body-container");

// let theme = {
//     themeType: "default", 
//     primaryColor: "", 
//     secondaryColor: "", 
//     shadowColor: "", 
//     fontColor: "black", 
//     headerShadowColor: "transparent"
// }

checkbox.onchange = () => {
    if (checkbox.checked) {
        changeTheme("night-");
    } else {
        changeTheme("");
    }
}

const changeTheme = (mode) => {
    const firstColor = getComputedStyle(document.body).getPropertyValue(`--${mode}primary-color`);
    const secondColor = getComputedStyle(document.body).getPropertyValue(`--${mode}secondary-color`);
    const shadowColor = getComputedStyle(document.body).getPropertyValue(`--${mode}shadow-color`);
    if(mode === "night-") {
        setDarkTheme(firstColor, secondColor, shadowColor);
        return;
    }
    setWhiteTheme(firstColor, secondColor, shadowColor);
}

const setDarkTheme = (primaryColor, secondaryColor, cardShadowColor) => {
    changeColors({
        themeType: "night", 
        primaryColor, 
        secondaryColor, 
        cardShadowColor, 
        fontColor: "white", 
        headerShadowColor: "black"
    });
}

const setWhiteTheme = (primaryColor, secondaryColor, cardShadowColor) => {
    changeColors({
        themeType: "default", 
        primaryColor, 
        secondaryColor, 
        cardShadowColor, 
        fontColor: "black", 
        headerShadowColor: "transparent"
    });
}

function changeColors({primaryColor, secondaryColor, cardShadowColor, fontColor, headerShadowColor}) {
    modifyBodyTheme(primaryColor, fontColor);
    modifyHeaderTheme(secondaryColor, headerShadowColor);
    modifySearchBarTheme(primaryColor, fontColor);
    modifyCardTheme(primaryColor, cardShadowColor);
    const theme = arguments[0];
    storeTheme(theme);
}

const modifyBodyTheme = (primaryPaint, fontPaint) => {
    document.body.style.backgroundColor = primaryPaint;
    document.body.style.color = fontPaint;
}

const modifyHeaderTheme = (secondaryPaint, headerShadowPaint) => {
    const header = document.querySelector("header");
    header.style.backgroundColor = secondaryPaint;
    header.style.boxShadow = `1px 1px 10px ${headerShadowPaint}`;
}

const modifySearchBarTheme = (primaryPaint, fontPaint) => {
    const searchBar = document.querySelector(".search-bar");
    const searchBarInput = document.getElementById("search-bar");
    if(searchBar !== null && searchBarInput) {
        searchBar.style.backgroundColor = primaryPaint;
        searchBarInput.style.color = fontPaint;
    }
}

const modifyCardTheme = (primaryPaint, cardShadowPaint) => {
    const cards = document.querySelectorAll(".pokemon-card");
    cards.forEach(card => {
        card.style.backgroundColor = primaryPaint;
        card.style.boxShadow = `1px 1px 15px ${cardShadowPaint}`
    });
}

const storeTheme = (theme) => {
    localStorage.setItem("theme", JSON.stringify(theme));
}

const applyTheme = () => {
    const theme = localStorage.getItem("theme");
    const themeObject = JSON.parse(theme)
    if(themeObject) {
        changeColors(themeObject);
        checkbox.checked = themeObject.themeType === "night" ? true : false;
    } else {
        console.error("PARSING ERROR IN STYLE.JS");
    }
}


export {
    applyTheme
}