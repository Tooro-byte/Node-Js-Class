// public/vanila-js/chick-request.js

document.addEventListener("DOMContentLoaded", () => {
  const starterRadio = document.getElementById("starter");
  const returningRadio = document.getElementById("returning");
  const numChicks = document.getElementById("numChicks");
  const unitPriceInput = document.getElementById("unitPrice");
  const totalPrice = document.getElementById("totalPrice");
  const chickType = document.getElementById("chickType");
  const requestDate = document.getElementById("requestDate");
  const form = document.getElementById("chickRequestForm");
  const maxChicksText = document.querySelector("#numChicks + small.form-text");

  // Function to update the total price 
  function updatePrice() {
    const quantity = parseInt(numChicks.value) || 0;
    const pricePerChick = parseFloat(unitPriceInput.value) || 0;
    const total = quantity * pricePerChick;
    
    // Store the numeric value without formatting for form submission
    totalPrice.value = total;
    
    // Update the display with formatting
    totalPrice.setAttribute('data-display', `UGX ${total.toLocaleString()}`);
    totalPrice.style.setProperty('--content', `"UGX ${total.toLocaleString()}"`);
  }

  // Function to enforce limits based on farmer type
  function enforceLimits() {
    let type = "";
    
    if (starterRadio.checked) {
      type = "starter";
    } else if (returningRadio.checked) {
      type = "returning";
    }

    // Clear any previous constraints
    numChicks.removeAttribute("readonly");
    numChicks.removeAttribute("disabled");

    if (type === "starter") {
      numChicks.setAttribute("min", "1");
      numChicks.setAttribute("max", "100");
      maxChicksText.textContent = "Maximum: 100 Chicks";
      
      // Set default value if empty or exceeds limit
      const currentValue = parseInt(numChicks.value) || 0;
      if (currentValue === 0) {
        numChicks.value = 50; // Default for starter
      } else if (currentValue > 100) {
        numChicks.value = 100;
      }
      
    } else if (type === "returning") {
      numChicks.setAttribute("min", "300");
      numChicks.setAttribute("max", "500");
      maxChicksText.textContent = "Minimum: 300, Maximum: 500 Chicks";
      
      // Set default value if empty or below minimum
      const currentValue = parseInt(numChicks.value) || 0;
      if (currentValue < 300) {
        numChicks.value = 300;
      } else if (currentValue > 500) {
        numChicks.value = 500;
      }
      
    } else {
      // Default state when no farmer type is selected
      numChicks.setAttribute("min", "1");
      numChicks.removeAttribute("max");
      maxChicksText.textContent = "Please select farmer type first";
    }
    
    updatePrice();
  }

  // Form validation function
  function validateForm() {
    let isValid = true;
    const errors = [];

    // Check farmer type
    if (!starterRadio.checked && !returningRadio.checked) {
      errors.push("Please select a farmer type");
      isValid = false;
    }

    // Check chick type
    if (!chickType.value) {
      errors.push("Please select a chick type");
      isValid = false;
    }

    // Check number of chicks
    const numChicksValue = parseInt(numChicks.value);
    if (!numChicksValue || numChicksValue <= 0) {
      errors.push("Please enter a valid number of chicks");
      isValid = false;
    }

    // Check limits based on farmer type
    if (starterRadio.checked && (numChicksValue < 1 || numChicksValue > 100)) {
      errors.push("Starter farmers can request 1-100 chicks");
      isValid = false;
    }

    if (returningRadio.checked && (numChicksValue < 300 || numChicksValue > 500)) {
      errors.push("Returning farmers can request 300-500 chicks");
      isValid = false;
    }

    // Check request date
    if (!requestDate.value) {
      errors.push("Please select a request date");
      isValid = false;
    }

    // Show errors if any
    if (!isValid) {
      alert("Please fix the following errors:\n\n" + errors.join("\n"));
    }

    return isValid;
  }

  // Event listeners
  starterRadio.addEventListener("change", enforceLimits);
  returningRadio.addEventListener("change", enforceLimits);
  
  numChicks.addEventListener("input", () => {
    // Enforce limits in real-time
    const minValue = parseInt(numChicks.getAttribute("min")) || 1;
    const maxValue = parseInt(numChicks.getAttribute("max")) || Infinity;
    const currentValue = parseInt(numChicks.value);
    
    if (currentValue < minValue) {
      numChicks.value = minValue;
    } else if (currentValue > maxValue) {
      numChicks.value = maxValue;
    }
    
    updatePrice();
  });

  chickType.addEventListener("change", updatePrice);

  // Form submission handler
  form.addEventListener("submit", (e) => {
    if (!validateForm()) {
      e.preventDefault();
      return false;
    }
    
    // Ensure total price is numeric for database storage
    const total = parseInt(numChicks.value) * parseFloat(unitPriceInput.value);
    totalPrice.value = total;
    
    // Allow form to submit normally
    return true;
  });

  // Initial setup
  enforceLimits();
  updatePrice();

  // Set today's date as default if not set
  if (!requestDate.value) {
    const today = new Date().toISOString().split('T')[0];
    requestDate.value = today;
  }
});