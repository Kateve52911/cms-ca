import { getCartContainer, getCartOrEmptyCart } from "./utility/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const cart = getCartOrEmptyCart();
  updateCartDisplay(cart);
});

/**
 * Adds an item to the cart or increases the quantity if it already exists.
 * @param {*} newItem - the item to add or increase in the cart.
 */
export function addToCart(newItem) {
  let cart = getCartOrEmptyCart();

  const existingItem = cart.find((item) => item.id === newItem.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    newItem.quantity = 1;
    cart.push(newItem);
  }

  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  updateCartDisplay(cart);
}

/**
 * Removes or decreases quantity from the cart if one presses the minus button.
 * If the item quantity is 1, remove the item entirely.
 * @param {*} itemId - the id of the item to modify.
 */
export function removeFromCart(itemId) {
  let cart = getCartOrEmptyCart();

  if (cart.length > 0) {
    const index = cart.findIndex((item) => String(item.id) === String(itemId));

    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
    }

    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    updateCartDisplay(cart);
  }
}

/**
 * Ensures that each item in the cart has a quantity field initialized to 1.
 * @param {*} cart - the cart to check.
 */
export function initializeCartQuantities(cart) {
  cart.forEach((item) => {
    if (!item.quantity) {
      item.quantity = 1;
    }
  });
}

/**
 * Updates the checkout display, showing the items in the cart and allowing quantity changes.
 * @param {*} cart - the current cart items.
 */
function updateCartDisplay(cart) {
  initializeCartQuantities(cart);

  const cartContainer = getCartContainer();
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    const totalCost = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    cartContainer.innerHTML = cart
      .map(
        (item) =>
          `<div class="cart-item" data-id="${item.id}">
                <div class="details-checkout">
                    <div><img src="${item.image.url}" alt="${item.title}" class="gameimage-checkout-cart"></div>
                    <div><h2>${item.title}</h2></div>
                    <div><p>$${item.price}</p></div>
                    <div class="buttons-checkout-details">
                        <button class="minus"> - </button>
                        <span> ${item.quantity} </span>
                        <button class="pluss"> + </button>
                    </div>
                </div>
            </div>`
      )
      .join("");

    cartContainer.innerHTML += `<div class="total-cost">
        <h3>Total Cost: $${totalCost.toFixed(2)}</h3>
        </div>`;
  }

  document.querySelectorAll(".pluss").forEach((button) => {
    button.addEventListener("click", function () {
      const itemId =
        this.parentElement.parentElement.parentElement.getAttribute("data-id");
      const item = cart.find((item) => item.id === itemId);
      addToCart(item);
    });
  });

  // Event listeners for decreasing quantity
  document.querySelectorAll(".minus").forEach((button) => {
    button.addEventListener("click", function () {
      const itemId =
        this.parentElement.parentElement.parentElement.getAttribute("data-id");
      removeFromCart(itemId);
    });
  });
}
