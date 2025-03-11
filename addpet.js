document.getElementById("addPetForm").addEventListener("submit", async (event) => {
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
            window.location.reload();
        } else {
            alert("Error adding pet: " + result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to the server.");
    }
});
