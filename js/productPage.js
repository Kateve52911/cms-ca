import { createMessage, getGameDetails } from "./utility/utils.js";
import { addToCart } from "./shoppingCart.js";
import { updateCartCounter } from "./updateCartIcon.js";
import { formatCartItem } from "./previewCart.js";

const resultsContainer = document.querySelector(".game-information");
const headerContainer = document.querySelector(".game-header");
const messageContainer = document.querySelector(".message-container");

const queryString = document.location.search;
const paramsProductPage = new URLSearchParams(queryString);
const id = paramsProductPage.get("id");
const pageURL = "https://v2.api.noroff.dev/gamehub/" + id;

/**
 * This function initialises the loading of the content onto the product page.
 * It uses a setTimeout function to add the content on to the webpage.
 */
async function init() {
  if (!id) {
    console.error("Error: No game ID found in the URL.");
    return;
  }

  try {
    const gameData = await getGameDetails(pageURL);

    if (!gameData) {
      throw new Error("No game data returned from API.");
    }

    resultsContainer.innerHTML = `<div class="spinner-product-page"></div>`;
    setTimeout(() => {
      resultsContainer.innerHTML = "";
      headerContainer.innerHTML = `<h1 class="h1heading">${gameData.title}</h1>`;
      resultsContainer.innerHTML = createHTMLProductPage(gameData);

      document.querySelector(".add-to-cart").addEventListener("click", () => {
        const cartItem = formatCartItem(gameData);
        addToCart(cartItem);
      });
    }, 1000);
  } catch (error) {
    console.error("Error fetching game data:", error);
    messageContainer.innerHTML = createMessage(
      "error",
      "Failed to load game details."
    );
  }
}

/**
 * Creates the HTML for the product page
 * @param {*} gameData - the results fom the call to the API
 * @returns - the HTML for the product page.
 */
function createHTMLProductPage(gameData) {
  return `<div class="container-gamepage" data-id="${gameData.id}">
    <img class="product-page-image" src="${gameData.image.url}" alt="${gameData.title}">
    <div class="info-gamepage"> 
        <div><p>${gameData.genre}</p></div>
        <div><h2>${gameData.title}</h2></div>
        <div>
            <fieldset class="game_page">
                <label for="digital" id="price-radio" class="label-gamepage">Digital copy: $${gameData.price}</label>
                <input type="radio" name="price-check" class="form-input one">
            </fieldset>
            <fieldset class="game_page">
                <label for="Physical" id="price-radio" class="label-gamepage">Physical copy: $${gameData.price}</label>
                <input type="radio" name="price-check" class="form-input two">
            </fieldset>
        </div>
        <div class="button-boxes-product-page">
            <button type="button" class="cta-gamepage add-to-cart">Add to cart</button>
            <a href="contact.html" class="cta-heart"><i class="fa-solid fa-heart heart-icon-gamespage"></i></a>
        </div>
        <div class="delivery-info">
            <p class="delivery-truck"><i class="fa-solid fa-truck fa-2xl icon-truck"></i></p>
            <p>Free shipping over $50</p>
            <p>Estimated delivery 1-2 days</p>
        </div>
        <div class="game-info">
            <h2>${gameData.title}</h2>
            <p>${gameData.description}</p>
            <p>Released: ${gameData.released}</p>
        </div>
    </div>
    <div id="cart-popup" class="cart-popup hidden">
        Your item has been added to the cart!
    </div>
</div>`;
}

init();
updateCartCounter();
