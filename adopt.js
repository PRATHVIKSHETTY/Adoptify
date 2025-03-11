// Reference to the container
const petContainer = document.getElementById("pet-container");

// Function to fetch pet data from the server
async function fetchPets() {
    try {
        const response = await fetch("http://localhost:5000/pets");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const pets = await response.json();
        if (!Array.isArray(pets) || pets.length === 0) {
            console.warn("No pets found in the database.");
            petContainer.innerHTML = "<p>No pets available for adoption.</p>";
            return;
        }

        createPetCards(pets);
    } catch (error) {
        console.error("Error fetching pets:", error);
        petContainer.innerHTML = "<p>Failed to load pet data.</p>";
    }
}

// Function to create pet cards
function createPetCards(pets) {
    petContainer.innerHTML = ""; // Clear previous content
    pets.forEach((pet) => {
        const card = document.createElement("div");
        card.className = "card";

        const petImage = document.createElement("img");
        petImage.src = pet.image.startsWith("/image/") ? pet.image : `/image/${pet.image}`;
        petImage.alt = pet.name;    
        card.appendChild(petImage);

        const name = document.createElement("h3");
        name.textContent = pet.name;
        card.appendChild(name);

        const button = document.createElement("button");
        button.textContent = `Adopt ${pet.name}`;
        button.onclick = () => navigateToDetails(pet.name);
        card.appendChild(button);

        petContainer.appendChild(card);
    });
}

// Function to navigate to adoption page with pet details
function navigateToDetails(petName) {
    const queryParams = new URLSearchParams({ petName });  // Ensure you're passing the petName properly
    window.location.href = `adoption1.html?${queryParams.toString()}`; // Navigate to adoption page with query string
}

// Load pets from database
fetchPets();
