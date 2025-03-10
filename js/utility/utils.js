const messageContainer = document.querySelector(".message-container");
const message = createMessage();
/**
 * This is a function that calls to the API.
 * It adds it to a variable called gameData which is used through the page.
 */
export async function getGameDetails(
  url = "https://v2.api.noroff.dev/gamehub/"
) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    const gameData = results.data;
    return gameData;
  } catch (error) {
    messageContainer.innerHTML = message;
  }
}

/**
 * This is to create an error message is there is something wrong with the API call.
 * @param {*} type - the type of message it is.
 * @param {*} message - what the message should say.
 * @returns an error message
 */
export function createMessage(type = "success", message = "No message") {
  const HTML = `<div class="message ${type}">${message}</div>`;
  return HTML;
}

/**
 * This function grabs the shopping-cart container.
 * @returns - the shopping cart that is used in the checkout process.
 */

export function getCartContainer() {
  let cartContainer = document.querySelector(".cart-container");
  if (cartContainer === null) {
    cartContainer = document.createElement("div");
  }
  return cartContainer;
}

/**
 * This retrives the information in the local storage and parses it into a string
 * @returns this returns either the information in the local storage or an empty string.
 */

export function getCartOrEmptyCart() {
  let cart = localStorage.getItem("shoppingCart");
  if (!cart) {
    return []; // Return an empty cart if nothing is in localStorage
  }
  return JSON.parse(cart); // Parse the cart JSON if it exists
}

/**
 * Updates the quantity displayed in the cart for a specific item.
 * @param {*} itemId - The id of the item whose quantity needs to be updated.
 * @param {*} cart - The current state of the cart.
 */
export function updateCartCounterForItem(itemId, cart) {
  const item = cart.find((cartItem) => cartItem.id === itemId);

  if (!item) {
    console.error(`Item with ID ${itemId} not found in cart.`);
    return;
  }

  // Select the quantity span for this item in the cart
  const quantitySpan = document.querySelector(
    `.cart-item-preview[data-id="${itemId}"] .item-quantity`
  );

  if (quantitySpan) {
    // Update the quantity displayed
    quantitySpan.textContent = item.quantity;
  }
}
