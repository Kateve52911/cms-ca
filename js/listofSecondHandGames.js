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

  const buttons2ndHand = createElement("div", ["buttons-gamepage"]);

  const viewButton2ndHand = createElement("a", ["cta-gamespage"], "View", {
    href: "product-page-second-hand.html?id=${game.id}",
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

/*let newProduct = document.createElement("div");
  newProduct.classList.add("game", "game2ndHand");

  let game2ndHandTitle = document.createElement("h3");
  game2ndHandTitle.classList.add("game-page-title-games");
  game2ndHandTitle.textContent = game.name;

  let game2ndHandImage = document.createElement("img");
  game2ndHandImage.classList.add("games-page-image");
  game2ndHandImage.src = game.images[0].src;
  game2ndHandImage.alt = game.images[0].alt;

  let game2ndHandPrice = document.createElement("p");
  game2ndHandPrice.classList.add("price-text");
  game2ndHandPrice.innerHTML = game.price_html;

  let buttons2ndHand = document.createElement("div");
  buttons2ndHand.classList.add("buttons-gamespage");

  let viewButton2ndHand = document.createElement("a");
  viewButton2ndHand.href = "product-page-second-hand.html?id=${game.id}";
  viewButton2ndHand.classList.add("cta-gamespage");
  viewButton2ndHand.textContent = "View";

  let heartButton2ndHand = document.createElement("a");
  heartButton2ndHand.classList.add(
    "fa-solid",
    "fa-heart",
    "heart-icon-gamepage",
    "cta-heart-gamespage"
  );

  buttons2ndHand.appendChild(viewButton2ndHand);
  buttons2ndHand.appendChild(heartButton2ndHand);

  newProduct.appendChild(game2ndHandTitle);
  newProduct.appendChild(game2ndHandImage);
  newProduct.appendChild(game2ndHandPrice);
  newProduct.appendChild(buttons2ndHand);

  container2ndHandGames.appendChild(newProduct);*/
