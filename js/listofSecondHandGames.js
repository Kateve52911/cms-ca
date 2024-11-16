import { get2ndHandGameData } from "./script.js";

const data2ndHand = await get2ndHandGameData();
//console.log(data2ndHand);

const container2ndHandGames = document.querySelector(".container-second-hands-games-page");

function createListOf2ndHandGames() {
   for (let i = 0; i < data2ndHand.length; i++) {
    console.log(data2ndHand[i])
   }
};
createListOf2ndHandGames();

const firstGame = data2ndHand[0]

function create2ndHandSingleGameHTML (game) {
    let gamesHTML2ndHand = `
                    <div class="game">
                    <h3 class="game-page-title-games">${game.name}</h3>
                    <img class="games-page-image" src="${game.images[0].src}" alt = "${game.images[0].alt}">
                    <p class="price-text">${game.price_html}</p>
                    <div class="buttons-gamespage">
                        <a href="product-page-second-hand.html?id=${game.id}" class="cta-gamespage">View</a> 
                        <i class="fa-solid fa-heart heart-icon-gamepage cta-heart-gamespage""></i>
                    </div>
                    </div>`
    console.log(gamesHTML2ndHand)
    return gamesHTML2ndHand
}

create2ndHandSingleGameHTML(firstGame)

function displayAll2ndHandGamesHTML () {
    let all2ndHandGames = "";
    for (let i = 0; i < data2ndHand.length; i++) {
        all2ndHandGames += create2ndHandSingleGameHTML(data2ndHand[i])
    }
    return all2ndHandGames
};

container2ndHandGames.innerHTML = displayAll2ndHandGamesHTML();

/*document.addEventListener("click", (event) => {
    if (event.target.classList.contains("view-button")) {
        const productId = event.target.dataset.id; // Extract the product ID
        window.location.href = `product-page-second-hand.html?id=${productId}`; // Redirect
    }
});*/



