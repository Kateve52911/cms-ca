import { get2ndHandGameData } from "./api2ndHandGames.js";
import { API_URL } from "./constants.js";
import { addToCart } from "./shoppingCart.js";
import { formatCartItem } from "./previewCart.js";

const productContainer = document.getElementById(
  "game-information-second-hand"
);

const productHeader = document.getElementById("game-header-second-hand");

const queryString = document.location.search;
const paramsProductPage = new URLSearchParams(queryString);
const id = paramsProductPage.get("id");
const pageURL = API_URL + "/" + id;

async function initialise2ndHandGamePage() {
  const data2ndHandGame = await get2ndHandGameData(pageURL);
  productHeader.innerHTML = `<h1 class="h1heading">${data2ndHandGame.name}</h1>`;

  const productPage = createHTML2ndHandProductPage(data2ndHandGame);
  productContainer.appendChild(productPage);

  document.querySelector(".add-to-cart").addEventListener("click", () => {
    const cartItem = formatCartItem(data2ndHandGame);
    addToCart(cartItem);
  });
}
initialise2ndHandGamePage();

function createHTML2ndHandProductPage(gameData) {
  const container = document.createElement("div");
  container.classList.add(
    "container-gamepage",
    "container-2ndHand-Product-Page"
  );
  container.setAttribute("data-id", gameData.id);

  const img2ndHand = document.createElement("img");
  img2ndHand.classList.add("product-page-image");
  img2ndHand.setAttribute("src", gameData.images[0].src);
  img2ndHand.setAttribute("alt", gameData.images[0].alt);

  const infoDiv2ndHand = document.createElement("div");
  infoDiv2ndHand.classList.add("info-gamepage");

  const h22ndHand = document.createElement("h2");
  h22ndHand.textContent = gameData.name;

  infoDiv2ndHand.appendChild(h22ndHand);

  const fieldset2ndHand = document.createElement("fieldset");
  fieldset2ndHand.classList.add("game_page");
  const label = document.createElement("label");
  label.setAttribute("for", "digital");
  label.setAttribute("id", "price-radio");
  label.classList.add("label-gamepage");
  label.textContent = `Digital Copy: Kr ${gameData.price}`;

  const input = document.createElement("input");
  input.setAttribute("type", "radio");
  input.setAttribute("name", "price-check");
  input.classList.add("form-input", "one");

  fieldset2ndHand.appendChild(label);
  fieldset2ndHand.appendChild(input);

  const buttonBox = document.createElement("div");
  buttonBox.classList.add("button-boxes-product-page");

  const addButton = document.createElement("button");
  addButton.setAttribute("type", "button");
  addButton.classList.add("cta-gamepage", "add-to-cart");
  addButton.textContent = "Add to cart";

  const heartLink = document.createElement("a");
  heartLink.setAttribute("href", "contact.html");
  heartLink.classList.add("cta-heart");

  const heartIcon = document.createElement("i");
  heartIcon.classList.add("fa-solid", "fa-heart", "heart-icon-gamespage");

  heartLink.appendChild(heartIcon);

  buttonBox.appendChild(addButton);
  buttonBox.appendChild(heartLink);

  const gameInfoDiv = document.createElement("div");
  gameInfoDiv.classList.add("game-info");

  const gameTitle = document.createElement("h2");
  gameTitle.classList.add("game-title-description");
  gameTitle.textContent = gameData.name;

  const gameDescription = document.createElement("p");
  gameDescription.classList.add("game-info-p");
  gameDescription.innerHTML = gameData.description;

  gameInfoDiv.appendChild(gameTitle);
  gameInfoDiv.appendChild(gameDescription);

  infoDiv2ndHand.appendChild(fieldset2ndHand);
  infoDiv2ndHand.appendChild(buttonBox);
  infoDiv2ndHand.appendChild(gameInfoDiv);

  const cartPopup = document.createElement("div");
  cartPopup.setAttribute("id", "cart-popup");
  cartPopup.classList.add("cart-popup", "hidden");
  cartPopup.textContent = "Your item has been added to the cart!";

  container.appendChild(img2ndHand);
  container.appendChild(infoDiv2ndHand);
  container.appendChild(cartPopup);

  return container;
}
