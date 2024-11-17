import { get2ndHandGameData } from "./api2ndHandGames.js";

const data2ndHand = await get2ndHandGameData();
//console.log(data2ndHand);

const container2ndHandGames = document.querySelector(
  ".container-second-hand-games-page"
);

function createListOf2ndHandGames() {
  data2ndHand.forEach((game) => {
    const gameElement = create2ndHandSingleGameHTML(game);
    container2ndHandGames.appendChild(gameElement);
  });
}

createListOf2ndHandGames();

function createElement(tag, classNames = [], content = "", attributes = {}) {
  const element = document.createElement(tag);
  if (classNames.length) element.classList.add(...classNames);
  if (content) element.textContent = content;
  for (const [key, value] of Object.entries(attributes)) {
    element[key] = value;
  }
  return element;
}

function create2ndHandSingleGameHTML(game) {
  const newProduct = createElement("div", ["game", "game2ndHand"]);
  console.log(newProduct);

  const game2ndHandTitle = createElement(
    "h3",
    ["game-page-title-games"],
    game.name
  );
  console.log(game2ndHandTitle);

  const game2ndHandImage = createElement("img", ["games-page-image"], "", {
    src: game.images[0].src,
    alt: game.images[0].alt,
  });

  console.log(game2ndHandImage);

  const game2ndHandPrice = createElement("p", ["price-text"], "", {
    innerHTML: game.price_html,
  });
  console.log(game2ndHandPrice);

  const buttons2ndHand = createElement("div", ["buttons-gamespage"]);

  const viewButton2ndHand = createElement("a", ["cta-gamespage"], "View", {
    href: `product-page-second-hand.html?id=${game.id}`,
  });

  const heartButton2ndHand = createElement("a", [
    "fa-solid",
    "fa-heart",
    "heart-icon-gamepage",
    "cta-heart-gamespage",
  ]);

  buttons2ndHand.append(viewButton2ndHand, heartButton2ndHand);
  newProduct.append(
    game2ndHandTitle,
    game2ndHandImage,
    game2ndHandPrice,
    buttons2ndHand
  );

  return newProduct;
}
