let currentIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
    // Function to render each section from localStorage
    function renderSectionData(sectionName, containerClass) {
        const container = document.querySelector(containerClass);

        // Clear existing content to avoid duplication
        container.innerHTML = "";

        // Retrieve data from localStorage for the given section
        const sectionData = JSON.parse(localStorage.getItem(sectionName)) || [];

        // Populate the section if data exists
        if (sectionData.length > 0) {
            sectionData.forEach((item, index) => {
                const sectionItem = document.createElement("div");
                sectionItem.classList.add("carousel-item");
                sectionItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="card-content">
                        <h3>${item.title}</h3>
                        <button class="details-btn" onclick="viewDetails('${sectionName}', ${index})">Details</button>
                    </div>
                `;
                container.appendChild(sectionItem);
            });
        } else {
            // Fallback content if no data exists
            container.innerHTML = `<p>No items available. Please check back later.</p>`;
        }
    }

    // Render data for all sections
    renderSectionData('tourPackage', '.tour-package .carousel');
    renderSectionData('airTicket', '.air-ticket .carousel');
    renderSectionData('visa', '.visa .carousel');
    renderSectionData('hotelBooking', '.hotel-booking .carousel');
});

// Function to move carousel in the given direction
function moveCarousel(direction, sectionClass) {
    const carousel = document.querySelector(sectionClass);
    const items = document.querySelectorAll(`${sectionClass} .carousel-item`);
    const totalItems = items.length;

    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    } else if (currentIndex >= totalItems) {
        currentIndex = 0;
    }

    const offset = -currentIndex * (items[0].offsetWidth + 20); // Adjust for margin
    carousel.style.transform = `translateX(${offset}px)`;
}

// Example of how to use moveCarousel for different sections
document.querySelector(".tour-package .carousel-btn.left").addEventListener("click", function() {
    moveCarousel(-1, ".tour-package .carousel");
});
document.querySelector(".tour-package .carousel-btn.right").addEventListener("click", function() {
    moveCarousel(1, ".tour-package .carousel");
});

document.querySelector(".air-ticket .carousel-btn.left").addEventListener("click", function() {
    moveCarousel(-1, ".air-ticket .carousel");
});
document.querySelector(".air-ticket .carousel-btn.right").addEventListener("click", function() {
    moveCarousel(1, ".air-ticket .carousel");
});

document.querySelector(".visa .carousel-btn.left").addEventListener("click", function() {
    moveCarousel(-1, ".visa .carousel");
});
document.querySelector(".visa .carousel-btn.right").addEventListener("click", function() {
    moveCarousel(1, ".visa .carousel");
});

document.querySelector(".hotel-booking .carousel-btn.left").addEventListener("click", function() {
    moveCarousel(-1, ".hotel-booking .carousel");
});
document.querySelector(".hotel-booking .carousel-btn.right").addEventListener("click", function() {
    moveCarousel(1, ".hotel-booking .carousel");
});

// Function to view details of an item
function viewDetails(sectionName, index) {
    const sectionData = JSON.parse(localStorage.getItem(sectionName)) || [];
    const item = sectionData[index];

    if (item) {
        // Store item details in localStorage for use on the details page
        localStorage.setItem('detailsItem', JSON.stringify(item));

        // Redirect to details.html
        window.location.href = 'details.html';
    }
}
