const prevbtns = document.querySelectorAll(".btn-prev");
const nextbtns = document.querySelectorAll(".btn");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const btnw = document.querySelectorAll(".btn1");
const container = document.getElementById("container");
const registrbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");
let chatbox = document.getElementById("chatbox");
const sendbtn = document.getElementById("send-btn");






let formStepsNum = 0;

nextbtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log('clicked')
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
    });
});

prevbtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();
    });
});

function updateFormSteps(){
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
    formStep.classList.remove("form-step-active");
  });
    formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar(){
progressSteps.forEach((progressStep , idx )=>{
    if(idx < formStepsNum + 1){
        progressStep.classList.add("progress-step-active");

    }else{
        progressStep.classList.remove("progress-step-active");
        }
    });
    const progressActive = document.querySelectorAll(".progress-step-active");

    progress.style.width = ((progressActive.length -1 ) / (progressSteps.length - 1 )) * 100 + "%";
    

}

function calculateEstimate() {
    // Gather user inputs
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const propertyName = document.getElementById("propertyName").value.trim();
    const email = document.getElementById("email").value;
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    

    // Log values for debugging
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Property Name:", propertyName);
    console.log("Email:", email);

    // Get selected BHK type
    const bhkTypeElement = document.querySelector('input[name="b"]:checked');
    const bhkType = bhkTypeElement ? parseInt(bhkTypeElement.value) : null;
    console.log("BHK Type:", bhkType);

    // Get selected package type
    const packageTypeElement = document.querySelector('input[name="package"]:checked');
    const packageType = packageTypeElement ? packageTypeElement.id : null;
    console.log("Package Type:", packageType);

    // Gather selected rooms
    const roomElements = document.querySelectorAll('#rooms input[type="checkbox"]:checked');
    const selectedRooms = Array.from(roomElements).map(room => room.nextSibling.textContent.trim().toLowerCase());
    console.log("Selected Rooms:", selectedRooms);

    // Validation: Ensure at least one room is selected
    if (selectedRooms.length === 0) {
        alert("Please select at least one type of room.");
        return;
    }

    // Additional Validation: Ensure all fields are filled
    if (!name || !phone || !propertyName || !bhkType || !packageType) {
        alert("Please fill in all required fields.");
        return;
    }

    if (!email) {
        alert("Please enter an email address.");
       
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Invalid email format. Please enter a valid email.");
        
        return;
    }
    

    // Base cost per BHK
    const bhkCost = {
        1: 30000,
        2: 50000,
        3: 70000,
        4: 90000,
        5: 110000
    };

    // Cost per room type
    const roomCost = {
        "living room": 7000,
        "kitchen": 6000,
        "bedroom": 5000,
        "bathroom": 4000,
        "dining": 5000
    };

    // Package multipliers
    const packageMultiplier = {
        essential: 1.0,
        premium: 1.5,
        luxury:2
    };

    // Calculate base cost based on BHK type
    let estimate = bhkCost[bhkType] || 50000; // Default base cost if BHK type not found

    // Add cost for each selected room
    selectedRooms.forEach(room => {
        estimate += roomCost[room] || 0;
    });

    // Apply package multiplier
    estimate *= packageMultiplier[packageType] || 1;

    // Optional: Add tax or other fees if needed
    const taxRate = 0.18; // 18% tax
    const tax = estimate * taxRate;
    estimate += tax;

    // Display the result
    const resultDiv = document.getElementById("estimateResult");
    const formattedEstimate = estimate.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
resultDiv.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>BHK: </strong> ${bhkType}</p>
     <p><strong>Rooms:</strong> ${selectedRooms}</p>
      <p><strong>Package:</strong> ${packageType}</p>
    <p><strong>Property:</strong> ${propertyName}</p>
    <p><strong>Estimated Cost:</strong> ${formattedEstimate}</p>
    `;
;
console.log("Name valid:", !!name);
console.log("Phone valid:", !!phone);
console.log("Property Name valid:", !!propertyName);
console.log("BHK Type valid:", !!bhkType);
console.log("Package Type valid:", !!packageType);
console.log("Selected Rooms valid:", selectedRooms.length > 0);


document.getElementById("getEstimateButton").addEventListener("click", function() {
    let clickCount = parseInt(localStorage.getItem("estimateClickCount")) || 0;
    clickCount++;
    localStorage.setItem("estimateClickCount", clickCount);

    if (clickCount > 3) {
        // Display the login form
        window.location.href = "login.html";
    } else {
        // Proceed with the estimate calculation if under the limit
        calculateEstimate();
    }
});}

if (registrbtn) {
    registrbtn.addEventListener("click", () => {
        container.classList.add("active");
    });
} 

if (loginbtn) {
    loginbtn.addEventListener("click", () => {
        container.classList.remove("active");
    });
}



// Toggle Chatbox Visibility
// Toggle Chatbox Visibility
function toggleChat() {
    let chatbox = document.getElementById("chatbox");
    chatbox.style.display = "flex"; // Open chatbox
}

// Close Chatbox Manually
function closeChat() {
    document.getElementById("chatbox").style.display = "none"; // Close chatbox manually
}

// Auto-Close Chatbox on Scroll
document.addEventListener("scroll", function () {
    let chatbox = document.getElementById("chatbox");
    if (chatbox && window.getComputedStyle(chatbox).display !== "none") {
        console.log("Scroll detected, closing chatbox");
        chatbox.style.display = "none";
    }
});





// Handle Sending Messages
async function sendMessage(event) {
    if (event.key === "Enter" || event.target.id === "send-btn") {
        let input = document.getElementById("chat-input").value.trim();
        if (input === "") return;

        let chatMessages = document.getElementById("chat-messages");

        // Create user message element (align right)
        let userMessage = document.createElement("div");
        userMessage.classList.add("message", "user-message");
        userMessage.innerHTML = `<strong>You:</strong> ${input}`;
        chatMessages.appendChild(userMessage);

   

        try {
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });
    
            const result = await response.json();
            console.log("Response from server:", result);
            let botMessage = document.createElement("div");
            botMessage.classList.add("message", "bot-message");
            botMessage.innerHTML = `<strong>Homy:</strong> ${result.response}`;
            chatMessages.appendChild(botMessage);

            // Clear input and auto-scroll
            document.getElementById("chat-input").value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to run chat. Please try again.");
        }
    }
}

function subscribeNewsletter() {
    let email = document.getElementById("newsletter-email").value;
    
    // Regular expression for a valid email
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.match(emailPattern)) {
        alert("Thank you for subscribing!");
    } else {
        alert("Please enter a valid email address.");
    }
}



document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", function () {
            console.log("Clicked:", this.innerText); // Debugging check

            const answer = this.parentElement.querySelector(".faq-answer"); // Get the FAQ answer div
            const toggleSymbol = this.querySelector(".faq-toggle");

            if (!answer) {
                console.error("FAQ answer not found for:", this.innerText);
                return;
            }

            // Toggle the clicked FAQ
            if (answer.style.display === "block") {
                answer.style.display = "none";
                toggleSymbol.textContent = "+";
            } else {
                answer.style.display = "block";
                toggleSymbol.textContent = "x";
            }
        });
    });
});


// add to cart
document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", function() {
        this.innerText = "Added!";
        this.style.backgroundColor = "black"; // Green color for confirmation
        this.disabled = true;
        
        setTimeout(() => {
            this.innerText = "Add to Cart";
            this.style.background = "transparent";
            this.disabled = false;
        }, 2000); // Reset after 2 seconds
    });
});

document.addEventListener("DOMContentLoaded", function () {
    updateCartBadge();
    displayCart();
    updateCartSummary();
    
    // Convert all prices from "$" to "₹"
    document.querySelectorAll(".price").forEach(function (priceElement) {
        priceElement.innerHTML = priceElement.innerHTML.replace("$", "₹");
    });

    // updateCartBadge();
    // displayCart(); // Ensure cart is displayed on page load

    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", function () {
            let card = this.closest(".row"); // Select the correct row containing image and details
    
            let itemNameElement = card.querySelector("p");
            let itemImageElement = card.querySelector("img");
            let itemPriceElement = card.querySelector(".price"); // Select price from class

            if (!itemNameElement || !itemImageElement || !itemPriceElement) {
                console.error("Item name, image, or price not found in the selected card!");
                return; 
            }

            let itemName = itemNameElement.innerText;
            let itemImage = itemImageElement.src;
            let itemPriceText = itemPriceElement.innerText.replace("Price ₹", "").trim(); // Extract price correctly
            let itemPrice = parseFloat(itemPriceText);

            if (isNaN(itemPrice)) {
                console.error("Price is not a valid number:", itemPriceElement.innerText);
                return;
            }

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            
            let existingItem = cart.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: itemName, image: itemImage, price: itemPrice, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartBadge(); 
            displayCart(); // Ensure cart updates immediately
            showCartNotification(itemName);
            updateCartSummary(); 

            this.innerText = "Added!";
            this.disabled = true;

            setTimeout(() => {
                this.innerText = "Add to Cart";
                this.disabled = false;
            }, 2000);
        });
    });
});



//  Show cart notification function
function showCartNotification(itemName) {
    let notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.innerText = `${itemName} added to cart!`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update badge count function
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + Number(item.quantity), 0);
    let badge = document.getElementById("cart-badge");

    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = "inline-block";
    } else {
        badge.style.display = "none"; // Hide when empty
    }
}


// Display cart items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");

    if (!cartContainer) return; 

    cartContainer.innerHTML = ""; 

    if (cart.length === 0) {
        cartContainer.innerHTML = "<li>Your cart is empty.</li>";
        updateCartBadge();
        return;
    }

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <button class="decrease" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="increase" data-index="${index}">+</button>
            <span>₹${item.price.toFixed(2)}</span>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(li);
    });

    attachEventListeners();
}

//  Attach event listeners to cart buttons
function attachEventListeners() {
    document.querySelectorAll(".increase").forEach((btn) => {
        btn.addEventListener("click", function () {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let index = this.dataset.index;
            cart[index].quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
            updateCartBadge();
        });
    });

    document.querySelectorAll(".decrease").forEach((btn) => {
        btn.addEventListener("click", function () {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let index = this.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1); // Remove item when quantity is 1
            }
                localStorage.setItem("cart", JSON.stringify(cart));
                displayCart();
                updateCartBadge();
            
        });
    });

    document.querySelectorAll(".remove-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let index = this.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
            updateCartBadge();
        });
    });

    document.getElementById("clear-btn")?.addEventListener("click", function () {
        localStorage.removeItem("cart");
        displayCart();
        updateCartBadge();
    });
}

// cart updates on page load
function updateCartSummary() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    let totalPrice = cart.reduce((sum, item) => {
        let price = parseFloat(item.price) || 0;
        return sum + (price * (item.quantity || 0));
    }, 0);

    let totalItemsElement = document.getElementById("total-items");
    let totalPriceElement = document.getElementById("total-price");

    if (totalItemsElement && totalPriceElement) {
        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;
    } else {
        console.error("Element with ID 'total-items' or 'total-price' not found!");
    }
}



document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("register").addEventListener("click", () => {
        document.getElementById("container").classList.add("right-panel-active");
      });
      
      document.getElementById("login").addEventListener("click", () => {
        document.getElementById("container").classList.remove("right-panel-active");
      });
      
      document.getElementById("register-btn").addEventListener("click", () => {
        document.getElementById("container").classList.add("right-panel-active");
      });
      
      document.getElementById("login-btn").addEventListener("click", () => {
        document.getElementById("container").classList.remove("right-panel-active");
      });
      
});
