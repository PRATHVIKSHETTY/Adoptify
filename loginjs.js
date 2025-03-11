// JavaScript Code

// Handle Sign Up
function handleSignUp() {
    const signupForm = document.getElementById('signup-form');
    const username = signupForm.elements['username'].value;
    const email = signupForm.elements['email'].value;
    const password = signupForm.elements['password'].value;
  
    if (username && email && password) {
      alert(`Welcome, ${username}! Your account has been created.`);
      signupForm.reset(); // Clear the form
    } else {
      alert('Please fill out all fields.');
    }
  }
  
  // Handle Login
  function handleLogin() {
    const loginForm = document.getElementById('login-form');
    const email = loginForm.elements['email'].value;
    const password = loginForm.elements['password'].value;
  
    if (email && password) {
      alert('Login successful!');
      loginForm.reset(); // Clear the form
    } else {
      alert('Please fill out all fields.');
    }
  }
  