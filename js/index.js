import { createMessage, getGameDetails } from "./utility/utils.js";

const containerIndexPage = document.querySelector(".container-index-games");
const subheadingMap = {
  onSale: "On Sale:",
  favorite: "Favorites:",
};

/**
 * Filters games from API call and generates HTML if they match the condition.
 * @param {*} gameData - information from API call.
 * @param {*} condition - metadata field to filter on.
 */
function filterGames(gameData, condition) {
  let filteredGamesHTML = "";
  for (let game of gameData) {
    if (game[condition] === true) {
      filteredGamesHTML += generateGameHTML(game);
    }
  }
  return filteredGamesHTML;
}

function generateSubheading(subheading) {
  const containerDiv = document.createElement("div");
  containerDiv.className = "genre-container";

  const heading = document.createElement("h2");
  heading.className = "h2-title-index-page";
  heading.textContent = subheading;

  containerDiv.appendChild(heading);

  // Return the outerHTML of the element
  return containerDiv.outerHTML;
}

function generateGameHTML(game) {
  const imageUrl = game.image?.url || "default-image.jpg"; // Fallback image if game.image is undefined
  return `<div class="game-section">
        <img class="index-page-image" src="${imageUrl}" alt="${game.title}">
        <div class="game-section-info">
            <h3 class="index-game-title">${game.title}</h3>
            <p class="game-text">${game.description}</p>
            <a href="product-page.html?id=${game.id}" class="cta-homepage">View</a> 
        </div>
    </div>`;
}

/**
 * Creates the banner and filtered games for the condition.
 * @param {*} gameData from API call.
 * @param {*} condition - metadata field to filter on.
 * @returns the HTML for the banner and its games.
 */
function generateIndexHTML(gameData, condition) {
  return `<div class="index-section">
        ${generateSubheading(subheadingMap[condition])}
        <div class="games-container">
        ${filterGames(gameData, condition)} </div>
        </div>`;
}

async function loadGameData() {
  const gameData = await getGameDetails();
  handleGameData(gameData);
}

function handleGameData(gameData) {
  const messageContainer = document.querySelector(".message-container");
  const message = createMessage(
    "error",
    "An issue with the metadata has occurred"
  );
  const containerIndexPage = document.querySelector(".container-index-games");

  containerIndexPage.innerHTML = `<div class="spinner-games-page"></div>`;

  setTimeout(function () {
    try {
      containerIndexPage.innerHTML = "";
      containerIndexPage.innerHTML +=
        generateIndexHTML(gameData, "onSale") +
        generateIndexHTML(gameData, "favorite");

      //filterAndDisplayGames(gameData);
    } catch (error) {
      console.error("An error occurred:", error);
      if (messageContainer) {
        messageContainer.innerHTML = message;
      } else {
        console.error("Error: .message-container not found in the DOM.");
      }
    }
  }, 0);
}

loadGameData();

// const gameData = await getGameDetails();
// const messageContainer = document.querySelector(".message-container");
// const message = createMessage(
//   "error",
//   "An issue with the metadata has occurred"
// );

// containerIndexPage.innerHTML = `<div class="spinner-games-page"></div>`;

// setTimeout(function () {
//   try {
//     containerIndexPage.innerHTML = "";
//     containerIndexPage.innerHTML +=
//       generateIndexHTML(gameData, "onSale") +
//       generateIndexHTML(gameData, "favorite");

//     //filterAndDisplayGames(gameData);
//   } catch (error) {
//     messageContainer.innerHTML = message;
//   }
// }, 0);
