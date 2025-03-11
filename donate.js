document.addEventListener("DOMContentLoaded", () => {
    const donationForm = document.getElementById("donation-form");
    const amountInput = document.getElementById("amount");
    const totalAmountDisplay = document.getElementById("total-amount");
    const amountButtons = document.querySelectorAll(".preset-btn");
    const paymentMethods = document.querySelectorAll("input[name='payment']");

    // 🛑 Ensure amount updates when clicking preset amount buttons
    amountButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedAmount = button.getAttribute("data-amount");
            amountInput.value = selectedAmount;
            updateTotalAmount(selectedAmount);
        });
    });

    // 🛑 Update total amount display when typing custom amount
    amountInput.addEventListener("input", () => {
        updateTotalAmount(amountInput.value);
    });

    function updateTotalAmount(amount) {
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            totalAmountDisplay.innerText = "₹0.00";
        } else {
            totalAmountDisplay.innerText = `₹${parseFloat(amount).toFixed(2)}`;
        }
    }

    // 🛑 Form Submission
    donationForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Get form values
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const amountValue = amountInput.value.trim();
        const selectedPayment = [...paymentMethods].find(radio => radio.checked);
        const anonymous = document.getElementById("anonymous-donation").checked;
        const taxExemptionInput = document.querySelector("input[name='tax-exemption']:checked");

        // 🛑 **Validation Checks**
        if (!firstName) {
            alert("Please enter your first name.");
            return;
        }
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (!phone || !/^\d{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }
        if (!amountValue || isNaN(parseFloat(amountValue)) || parseFloat(amountValue) <= 0) {
            alert("Please enter a valid donation amount.");
            return;
        }
        if (!selectedPayment) {
            alert("Please select a payment method.");
            return;
        }

        const donationData = {
            firstName,
            lastName,
            email,
            phone,
            amount: parseFloat(amountValue),
            paymentMethod: selectedPayment.value,
            anonymous,
            taxExemption: taxExemptionInput ? taxExemptionInput.value : "no",
        };

        try {
            const response = await fetch("http://localhost:5000/donate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(donationData),
            });

            if (response.ok) {
                alert("Donation successful! Thank you for your support. ❤️");
                donationForm.reset();
                updateTotalAmount(0);
                window.location.href = "tud.html"; // Redirect to home

            } else {
                const errorResponse = await response.json();
                alert(`Error: ${errorResponse.message || "An unexpected error occurred."}`);
            }
        } catch (error) {
            alert("Failed to connect to the server. Please try again.");
        }
    });
});
