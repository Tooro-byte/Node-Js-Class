// public/js/chick-request.js

document.addEventListener("DOMContentLoaded", () => {
  const farmerType = document.getElementById("farmerType");
  const numChicks = document.getElementById("numChicks");
  const totalPrice = document.getElementById("totalPrice");

  const PRICE_PER_CHICK = 1650;

  function updatePrice() {
    const quantity = parseInt(numChicks.value) || 0;
    totalPrice.value = "UGX " + (quantity * PRICE_PER_CHICK).toLocaleString();
  }

  function enforceLimits() {
    const type = farmerType.value;
    if (type === "starter") {
      numChicks.value = 100;
      numChicks.setAttribute("readonly", true);
    } else if (type === "returning") {
      numChicks.removeAttribute("readonly");
      numChicks.setAttribute("min", "300");
      numChicks.setAttribute("max", "500");
      if (parseInt(numChicks.value) < 300) {
        numChicks.value = 300;
      }
    } else {
      numChicks.removeAttribute("readonly");
    }
    updatePrice();
  }

  farmerType.addEventListener("change", enforceLimits);
  numChicks.addEventListener("input", updatePrice);
});
