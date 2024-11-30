// Data structure for storing carousel items
let carouselData = {
    tourPackage: JSON.parse(localStorage.getItem("tourPackage")) || [],
    airTicket: JSON.parse(localStorage.getItem("airTicket")) || [],
    visa: JSON.parse(localStorage.getItem("visa")) || [],
    hotelBooking: JSON.parse(localStorage.getItem("hotelBooking")) || [],
};

// Render preview for a specific section
function renderCarouselPreview(section) {
    const preview = document.getElementById(`${section}-preview`);
    preview.innerHTML = ""; // Clear existing content

    if (carouselData[section].length > 0) {
        carouselData[section].forEach((item, index) => {
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");

            // Ensure all properties exist before using them
            const image = item.image || "placeholder.jpg"; // Use a placeholder if the image is missing
            const title = item.title || "Untitled";
            const description = item.description
                ? item.description.replace(/\n/g, "<br>")
                : "No description available";

            carouselItem.innerHTML = `
                <img src="${image}" alt="${title}" style="width:300px;height:200px">
                <h3>${title}</h3>
                <button class="details-btn" onclick="navigateToDetails('${section}', ${index})">View Details</button>
                <button class="delete-btn" onclick="deleteCarouselItem('${section}', ${index})">Delete</button>
            `;
            preview.appendChild(carouselItem);
        });
    } else {
        preview.innerHTML = `<p>No items available for ${section.replace(/([A-Z])/g, ' $1').toLowerCase()}. Add some!</p>`;
    }
}

// Add or update an item in a specific section
function addOrUpdateCarouselItem(section) {
    const title = document.getElementById(`${section}-title`).value.trim();
    const description = document.getElementById(`${section}-description`).value.trim();
    const imageUrl = document.getElementById(`${section}-image-url`).value.trim();
    const priceDetails = document.getElementById(`${section}-price-details`).value.trim().split("\n");
    const embassyInfo = document.getElementById(`${section}-embassy-info`).value.trim().split("\n");

    if (title && description && imageUrl) {
        // Avoid duplicate entries
        if (!carouselData[section].some(item => item.title === title && item.image === imageUrl)) {
            carouselData[section].push({
                title,
                description,
                image: imageUrl,
                priceDetails,
                embassyInfo,
            });
            localStorage.setItem(section, JSON.stringify(carouselData[section])); // Save updated data
            renderCarouselPreview(section); // Re-render the preview
            alert(`${section.replace(/([A-Z])/g, ' $1')} item saved!`);

            // Clear form inputs after saving
            document.getElementById(`${section}-title`).value = "";
            document.getElementById(`${section}-description`).value = "";
            document.getElementById(`${section}-image-url`).value = "";
            document.getElementById(`${section}-price-details`).value = "";
            document.getElementById(`${section}-embassy-info`).value = "";
        } else {
            alert("This item already exists in the section!");
        }
    } else {
        alert("Please fill all required fields.");
    }
}

// Delete an item from a specific section
function deleteCarouselItem(section, index) {
    if (index >= 0 && index < carouselData[section].length) {
        carouselData[section].splice(index, 1); // Remove item at specified index
        localStorage.setItem(section, JSON.stringify(carouselData[section])); // Update localStorage
        renderCarouselPreview(section); // Re-render the preview
        alert(`${section.replace(/([A-Z])/g, ' $1')} item deleted!`);
    } else {
        alert("Invalid item index.");
    }
}

// Navigate to details page
function navigateToDetails(section, index) {
    const selectedItem = carouselData[section][index];
    if (selectedItem) {
        localStorage.setItem("detailsItem", JSON.stringify(selectedItem)); // Save the item for details page
        window.location.href = "details.html"; // Redirect to details page
    } else {
        alert("Invalid item selected.");
    }
}

// Initialize previews for all sections
function initializePreviews() {
    Object.keys(carouselData).forEach(renderCarouselPreview);
}

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("isAuthenticated"); // Remove authentication state
    window.location.href = "login.html"; // Redirect to login
});

// Redirect to login if not authenticated
document.addEventListener("DOMContentLoaded", function () {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
        window.location.href = "login.html";
    }

    initializePreviews(); // Initialize previews on page load
});
