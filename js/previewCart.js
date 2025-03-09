import { getCartOrEmptyCart } from "./utility/utils.js";
import {
  initializeCartQuantities,
  removeFromCart,
  addToCart,
} from "./shoppingCart.js";
import { updateCartCounter } from "./updateCartIcon.js";

export function formatCartItem(item) {
  return {
    id: item.id || "unknown-id",
    title: item.title,
    price: item.price || 0,
    image: item.image
      ? { url: item.image.url }
      : { url: "images/default-image.png" },
    category: item.category || "Misc",
    quantity: item.quantity || 1,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const cart = getCartOrEmptyCart();
  updateCartDisplay(cart);
  updateCartCounter();
});

/**
 * Updates the checkout display, showing the items in the cart and allowing quantity changes.
 * @param {*} cart - the current cart items.
 */
function updateCartDisplay(cart) {
  initializeCartQuantities(cart);

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
                    <div><img src="${
                      item.image?.url || "images/default-image.png"
                    }" alt="${item.title}" class="gameimage-checkout-cart">
</div>
                    <div><h2>${item.title}</h2></div>
                    <div><p>$${item.price}</p></div>
                    <div class="buttons-checkout-details">
                        <button class="minus"> - </button>
                        <span class="item-quantity">${
                          item.quantity
                        }</span> <!-- Quantity span -->
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

  cartContainer.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("pluss")) {
      const itemId = target
        .closest(".cart-item-preview")
        .getAttribute("data-id");
      const item = cart.find((item) => item.id === itemId);
      addToCart(item);
      updateCartCounter();
      updateCartCounterForItem(itemId, getCartOrEmptyCart);
    }

    if (target.classList.contains("minus")) {
      const itemId = target
        .closest(".cart-item-preview")
        .getAttribute("data-id");
      removeFromCart(itemId);
      const updatedCart = getCartOrEmptyCart(); // Get updated cart after removal
      updateCartDisplay(updatedCart); // Refresh the UI
      updateCartCounter();
      updateCartCounterForItem(itemId, updatedCart);
    }
  });
}

/**
 * Updates the quantity displayed in the cart for a specific item.
 * @param {*} itemId - The id of the item whose quantity needs to be updated.
 * @param {*} cart - The current state of the cart.
 */
function updateCartCounterForItem(itemId, cart) {
  const item = cart.find((cartItem) => cartItem.id === itemId);
  if (!item) {
    console.error(`Item with ID ${itemId} not found in cart.`);
    return;
  }

  const quantitySpan = document.querySelector(
    `.cart-item-preview[data-id="${itemId}"] .item-quantity`
  );
  if (quantitySpan) {
    quantitySpan.textContent = item.quantity;
  }
}
