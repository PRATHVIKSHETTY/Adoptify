// Function to get pet name from the URL
function getPetNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("petName");  // Get petName parameter from the URL
}

// Function to fetch pet details by petName
async function showPetDetails() {
    const petName = getPetNameFromURL();  // Get petName from URL
    if (!petName) {
        alert("Pet name is missing!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/pets?name=${petName}`);  // Fetch pet details by name
        const pets = await response.json();

        if (pets.length > 0) {
            const pet = pets[0];  // We expect only one pet to match the name

            const container = document.getElementById("pet-container");

            // Create a pet card and append details to it
            const petCard = document.createElement("div");
            petCard.className = "pet-card";

            const petImage = document.createElement("img");
            petImage.src = pet.image;  // This will be something like '/image/pet1.jpg'
            petImage.alt = pet.name;

            // Add the pet's name and other details
            const petDetails = `
                <h2>${pet.name}</h2>
                <p><strong>Gender:</strong> ${pet.gender}</p>
                <p><strong>Age:</strong> ${pet.age}</p>
                <p><strong>Vaccinated:</strong> ${pet.vaccinated ? "Yes" : "No"}</p>
                <p><strong>Sterilized:</strong> ${pet.sterilized ? "Yes" : "No"}</p>
                <p><strong>Size:</strong> ${pet.size}</p>
                <p>${pet.description}</p>
                <p><strong>Traits:</strong> ${pet.traits.join(", ")}</p>
            `;

            petCard.innerHTML = petDetails;
            petCard.insertBefore(petImage, petCard.firstChild);
            container.appendChild(petCard);  // Add the pet details to the container

            // Create the "Adopt" button
            const adoptButton = document.createElement("button");
            adoptButton.textContent = `Adopt ${pet.name}`;
            adoptButton.onclick = () => adoptPet(pet.name);  // Make sure `pet.name` is passed when button is clicked

            // Append the button to the container
            container.appendChild(adoptButton);
        } else {
            alert("Pet not found!");
        }
    } catch (error) {
        console.error("Error fetching pet data:", error);
        alert("Failed to load pet data.");
    }
}

// Function to handle adoption (redirect to form page)
function adoptPet(petName) {
    if (!petName) {
        alert("Pet name is missing!");
        return;
    }
    const queryParams = new URLSearchParams({ petName });  // Pass petName to the next page
    window.location.href = `forms.html?${queryParams.toString()}`;  // Redirect to forms page with petName in the URL
}

// Call the function to display pet details when the page loads
window.onload = showPetDetails;
