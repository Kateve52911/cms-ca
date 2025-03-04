import { getCartOrEmptyCart } from "./utility/utils.js";
import {
  initializeCartQuantities,
  removeFromCart,
  addToCart,
} from "./shoppingCart.js";
import { updateCartCounter } from "./updateCartIcon.js";

document.addEventListener("DOMContentLoaded", () => {
  const cart = getCartOrEmptyCart();
  updateCartDisplay(cart);
  updateCartCounter(); // Update the cart count in the header
});

/**
 * Updates the checkout display, showing the items in the cart and allowing quantity changes.
 * @param {*} cart - the current cart items.
 */
function updateCartDisplay(cart) {
  initializeCartQuantities(cart); // Initialize quantities before rendering

  const cartContainer = document.querySelector("#cart-items");

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
          `<div class="cart-item-preview" data-id="${item.id}">
                <div class="details-checkout-preview">
                    <div><img src="${item.image.url}" alt="${item.title}" class="gameimage-checkout-cart-preview"></div>
                    <div><h2>${item.title}</h2></div>
                    <div><p>$${item.price}</p></div>
                    <div class="buttons-checkout-details">
                        <button class="minus"> - </button>
                        <span class="item-quantity">${item.quantity}</span> <!-- Quantity span -->
                        <button class="pluss"> + </button>
                    </div>
                </div>
            </div>`
      )
      .join("");

    cartContainer.innerHTML += `<div class="total-cost-preview">
    <h4>Total Cost: $${totalCost.toFixed(2)}</h4>
    </div>`;
  }

  // Event delegation: Attach one listener to the parent container
  cartContainer.addEventListener("click", function (event) {
    const target = event.target;

    // Check if the clicked element is a button with class "pluss"
    if (target.classList.contains("pluss")) {
      const itemId = target
        .closest(".cart-item-preview")
        .getAttribute("data-id");
      const item = cart.find((item) => item.id === itemId);
      addToCart(item); // Increase the quantity
      updateCartCounter(); // Update the cart count in the header
      updateCartCounterForItem(itemId, cart); // Update the quantity in the span tag
    }

    // Check if the clicked element is a button with class "minus"
    if (target.classList.contains("minus")) {
      const itemId = target
        .closest(".cart-item-preview")
        .getAttribute("data-id");
      removeFromCart(itemId); // Decrease the quantity or remove item
      updateCartCounter(); // Update the cart count in the header
      updateCartCounterForItem(itemId, cart); // Update the quantity in the span tag
    }
  });
}

/**
 * Updates the quantity displayed in the cart for a specific item.
 * @param {*} itemId - The id of the item whose quantity needs to be updated.
 * @param {*} cart - The current state of the cart.
 */
function updateCartCounterForItem(itemId, cart) {
  const item = cart.find((item) => item.id === itemId);
  if (item) {
    const quantitySpan = document.querySelector(
      `.cart-item-preview[data-id="${itemId}"] .item-quantity`
    );
    if (quantitySpan) {
      quantitySpan.textContent = item.quantity; // Update the quantity in the span tag
    }
  }
}
