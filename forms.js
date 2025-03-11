document.getElementById("adoptionForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const petName = new URLSearchParams(window.location.search).get("petName");  // Get petName instead of petId
  if (!petName) {
      alert("Error: Pet name is missing.");
      return;
  }

  const formData = {
      petName,  // Pass petName instead of petId
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      city: document.getElementById("city").value,
      dob: document.getElementById("dob").value,
      address: document.getElementById("address").value,
      native: document.getElementById("native").value,
      reason: document.getElementById("reason").value,
      familyStatus: document.querySelector("input[name='familyStatus']:checked").value,
  };

  try {
      const response = await fetch("http://localhost:5000/submit-form", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      });

      if (response.ok) {
          alert("Adoption form submitted successfully!");
          window.location.href = "succes.html"; // Redirect to home
      } else {
          const errorText = await response.text();
          console.error("Backend error:", errorText);
          alert("An error occurred. Please try again.");
      }
  } catch (error) {
      console.error("Request error:", error);
      alert("Failed to connect to the server. Please try again.");
  }
});
