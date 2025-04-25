const prevbtns = document.querySelectorAll(".btn-prev");
const nextbtns = document.querySelectorAll(".btn");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step")

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

    // Log values for debugging
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Property Name:", propertyName);

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
// JavaScript for handling click limit on "Get My Estimate" button
// document.getElementById("getEstimateButton").addEventListener("click", function() {
//     // Retrieve the current click count from local storage, or set it to 0 if not found
//     let clickCount = parseInt(localStorage.getItem("estimateClickCount")) || 0;
    
//     // Increment the click count
//     clickCount++;

//     // Update the count in local storage
//     localStorage.setItem("estimateClickCount", clickCount);

//     // Check if the click limit has been reached
//     if (clickCount > 3) {
//         alert("You have reached the limit for free estimates. Please log in to continue.");
//         // Redirect to the login page (or show a login modal if you prefer)
//         window.location.href = "/login"; // Adjust the URL to your login page
//     } else {
//         // Proceed with the "Get My Estimate" function if under the limit
//         calculateEstimate();
//     }
// });

document.getElementById("getEstimateButton").addEventListener("click", function() {
    let clickCount = parseInt(localStorage.getItem("estimateClickCount")) || 0;
    clickCount++;
    localStorage.setItem("estimateClickCount", clickCount);

    if (clickCount >= 3) {
        // Display the login form
        document.getElementById("loginForm").style.display = "block";
    } else {
        // Proceed with the estimate calculation if under the limit
        calculateEstimate();
    }
});


}

document.addEventListener("DOMContentLoaded", function () {
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
        let elements = document.querySelectorAll(".scroll-visible");
        let currentScrollY = window.scrollY;

        elements.forEach((el) => {
            let elementTop = el.getBoundingClientRect().top;

            if (currentScrollY < lastScrollY && elementTop < window.innerHeight) {
                // Scrolling up → Show elements
                el.classList.add("scroll-active");
            } else {
                // Scrolling down → Hide elements
                el.classList.remove("scroll-active");
            }
        });

        lastScrollY = currentScrollY;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
        let elements = document.querySelectorAll(".scroll-hidden");
        let currentScrollY = window.scrollY;

        elements.forEach((el) => {
            let elementTop = el.getBoundingClientRect().top;

            if (currentScrollY > lastScrollY && elementTop < window.innerHeight) {
                // Scrolling down → Show elements
                el.classList.add("scroll-visible1");
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up → Hide elements
                el.classList.remove("scroll-visible1");
            }
        });

        lastScrollY = currentScrollY;
    });
});