
const loginFormPost = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.getElementById('username-login').value.trim();
  const password = document.getElementById('password-login').value.trim();
  
  if (username && password) {

    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const errorMessage = await response.json()    

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(errorMessage.message);  
    }
  }
};

document.querySelector('.login-form-submit').addEventListener("click", loginFormPost)


