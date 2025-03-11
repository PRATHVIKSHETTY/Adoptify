document.addEventListener("DOMContentLoaded", () => {
    const addPetForm = document.getElementById("addPetForm");
    
    // Add Pet Form Submission
    addPetForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const petData = {
            name: document.getElementById("name").value,
            gender: document.getElementById("gender").value,
            age: document.getElementById("age").value,
            size: document.getElementById("size").value,
            description: document.getElementById("description").value,
            traits: document.getElementById("traits").value.split(",").map(trait => trait.trim()),
            image: document.getElementById("image").value,
        };

        try {
            const response = await fetch("http://localhost:5000/pets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(petData),
            });

            const result = await response.json();
            console.log("Server Response:", result);

            if (response.ok) {
                alert("Pet added successfully!");
                addPetForm.reset();
            } else {
                alert("Error adding pet: " + result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to connect to the server.");
        }
    });

    // Fetch Adoption Requests
    async function fetchAdoptionRequests() {
        try {
            const response = await fetch("http://localhost:5000/adoptions");
            const adoptionRequests = await response.json();

            if (response.ok) {
                const adoptionTable = document.getElementById("adoptionRequestsTable");
                adoptionTable.innerHTML = ''; // Clear existing rows

                adoptionRequests.forEach(adoption => {
                    const row = document.createElement("tr");

                    // Create columns for each adoption request
                    row.innerHTML = `
                        <td>${adoption.petName}</td>
                        <td>${adoption.name}</td>
                        <td>${adoption.email}</td>
                        <td>${adoption.phone}</td>
                        <td>${adoption.city}</td>
                        <td>${adoption.dob}</td>
                        <td>${adoption.address}</td>
                        <td>${adoption.native}</td>
                        <td>${adoption.reason}</td>
                        <td>${adoption.familyStatus}</td>
                    `;
                    adoptionTable.appendChild(row);
                });
            } else {
                console.error("Failed to load adoption requests");
            }
        } catch (error) {
            console.error("Error fetching adoption requests:", error);
        }
    }

    // Fetch Donations
    async function fetchDonations() {
        try {
            const response = await fetch("http://localhost:5000/donations");
            const donations = await response.json();

            if (response.ok) {
                const donationsTable = document.getElementById("donationsTable");
                donationsTable.innerHTML = ''; // Clear existing rows

                donations.forEach(donation => {
                    const row = document.createElement("tr");

                    // Create columns for each donation
                    row.innerHTML = `
                        <td>${donation.firstName} ${donation.lastName}</td>
                        <td>$${donation.amount}</td>
                        <td>${donation.email}</td>
                    `;
                    donationsTable.appendChild(row);
                });
            } else {
                console.error("Failed to load donations");
            }
        } catch (error) {
            console.error("Error fetching donations:", error);
        }
    }

    // Fetch data on page load
    fetchAdoptionRequests();
    fetchDonations();
});
