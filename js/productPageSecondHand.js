import { get2ndHandGameData } from "./api2ndHandGames.js";
import { API_URL } from "./constants.js";

const productContainer = document.getElementById(
  "game-information-second-hand"
);

const productHeader = document.getElementById("game-header-second-hand");

const queryString = document.location.search;
const paramsProductPage = new URLSearchParams(queryString);
const id = paramsProductPage.get("id");
const pageURL = API_URL + "/" + id;
console.log(pageURL);

async function initialise2ndHandGamePage() {
  const data2ndHandGame = await get2ndHandGameData(pageURL);
  productHeader.innerHTML = `<h1 class="h1heading">${data2ndHandGame.name}</h1>`;
  productContainer.innerHTML = createHTML2ndHandProductPage(data2ndHandGame);
}
initialise2ndHandGamePage();

function createHTML2ndHandProductPage(gameData) {
  return `<div class="container-gamepage" data-id="${gameData.id}">
                  <img class="product-page-image " src="${gameData.images[0].src}" alt = "${gameData.images[0].alt}">
                  <div class="info-gamepage"> 
                      <div><h2>${gameData.name}</h2></
                      <div>
                      <fieldset class="game_page">
                      <label for="digital" id="price-radio" class="label-gamepage">Digital copy: ${gameData.price_html}</label>
                      <input type="radio" name="price-check" class="form-input one">
                      </fieldset>
                      <fieldset class="game_page">
                      <label for="Physical" id="price-radio" class="label-gamepage">Physical copy: ${gameData.price_html}</label>
                      <input type="radio" name="price-check" class="form-input two">
                      </fieldset>
                      </
                      <div class="button-boxes-product-page">
                          <button type="button" class="cta-gamepage add-to-cart">Add to cart</button>
                          <a href="contact.html" class="cta-heart"><i class="fa-solid fa-heart heart-icon-gamespage"></i></a>
                      </
                      <div class="delivery-info">
                          <div>
                              <p class="delivery-truck-2nd-hand"><i class="fa-solid fa-truck fa-2xl icon-truck"></i></p>
                          </div>
                          <div>
                              <p>Free shipping over $50</p>
                              <p>Estimated delivery 1-2 days</p>
                          </div>
                      </
                  </div>
                   <div class="game-info">
                      <h2 class="game-title-description">${gameData.name}</h2></div>
                      <p class="game-info-p">${gameData.description}</p>
                      </div>
                  
                  <div id="cart-popup" class="cart-popup hidden">
                      Your item has been added to the cart!
                      </div>`;
}
