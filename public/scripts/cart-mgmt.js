const addToCartButtonElement = document.querySelector("#beat-details button");
const cartBadgeElement = document.querySelector(".nav-items .badge");

async function addToCart() {
  const beatId = addToCartButtonElement.dataset.beatid;
  const csrfToken = addToCartButtonElement.dataset.csrf;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        beatId: beatId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  const responseData = await response.json();

  const newTotalQuantity = responseData.newTotalItems;

  cartBadgeElement.textContent = newTotalQuantity;
}

addToCartButtonElement.addEventListener("click", addToCart);
