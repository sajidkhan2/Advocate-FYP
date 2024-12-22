// Mock Lawyer Data (replace with real API or database)
const lawyers = [
    { name: "Ali Khan", lawArea: "Criminal Law", city: "Quetta", image: "https://via.placeholder.com/300", experience: "5 years" },
    { name: "Sara Ahmed", lawArea: "Family Law", city: "Gwadar", image: "https://via.placeholder.com/300", experience: "7 years" },
    { name: "Zahid Baloch", lawArea: "Corporate Law", city: "Khuzdar", image: "https://via.placeholder.com/300", experience: "10 years" },
    { name: "Maria Khan", lawArea: "Civil Law", city: "Sibi", image: "https://via.placeholder.com/300", experience: "8 years" },
];

// Function to retrieve search parameters from the URL
function getSearchParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        lawyerName: params.get("lawyerName")?.toLowerCase() || "",
        lawArea: params.get("lawArea")?.toLowerCase() || "",
        city: params.get("city")?.toLowerCase() || "",
    };
}

// Function to filter and display lawyers based on search criteria
function displayResults() {
    const { lawyerName, lawArea, city } = getSearchParams();
    const resultsContainer = document.getElementById("resultsContainer");

    // Filter lawyers based on search parameters
    const filteredLawyers = lawyers.filter(lawyer => {
        return (
            (lawyerName === "" || lawyer.name.toLowerCase().includes(lawyerName)) ||
            (lawArea === "" || lawyer.lawArea.toLowerCase().includes(lawArea)) ||
            (city === "" || lawyer.city.toLowerCase().includes(city))
        );
    });

    // Clear existing results
    resultsContainer.innerHTML = "";

    // Check if no results are found
    if (filteredLawyers.length === 0) {
        resultsContainer.innerHTML = `<p class="no-results">No lawyers found. Please refine your search criteria.</p>`;
        return;
    }

    // Generate lawyer cards dynamically
    filteredLawyers.forEach(lawyer => {
        const lawyerCard = document.createElement("div");
        lawyerCard.classList.add("lawyer-card");
        lawyerCard.innerHTML = `
            <img src="${lawyer.image}" alt="${lawyer.name}">
            <div class="card-content">
                <h3>${lawyer.name}</h3>
                <p><strong>Law Area:</strong> ${lawyer.lawArea}</p>
                <p><strong>City:</strong> ${lawyer.city}</p>
                <p><strong>Experience:</strong> ${lawyer.experience}</p>
            </div>
        `;
        resultsContainer.appendChild(lawyerCard);
    });
}

// Call the function to display results on page load
document.addEventListener("DOMContentLoaded", displayResults);



// Add logic for handling additional filters like experience and ratings:
function getSearchParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        lawyerName: params.get("lawyerName")?.toLowerCase() || "",
        lawArea: params.get("lawArea")?.toLowerCase() || "",
        city: params.get("city")?.toLowerCase() || "",
        experience: params.get("experience") || "",
        rating: params.get("rating") || "",
    };
}

function filterLawyers() {
    const { lawyerName, lawArea, city, experience, rating } = getSearchParams();
    return lawyers.filter(lawyer => {
        const experienceRange = lawyer.experience.split(" ")[0]; // Mock experience parsing
        const matchesName = lawyerName === "" || lawyer.name.toLowerCase().includes(lawyerName);
        const matchesArea = lawArea === "" || lawyer.lawArea.toLowerCase().includes(lawArea);
        const matchesCity = city === "" || lawyer.city.toLowerCase().includes(city);
        const matchesExperience = experience === "" || (parseInt(experienceRange) <= parseInt(experience.split("-")[1]) && parseInt(experienceRange) >= parseInt(experience.split("-")[0]));
        const matchesRating = rating === "" || lawyer.rating >= parseInt(rating);

        return matchesName && matchesArea && matchesCity && matchesExperience && matchesRating;
    });
}


