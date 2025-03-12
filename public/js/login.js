const usernameInput = document.getElementById('username-login')
const passwordInput = document.getElementById('password-login')

const loginFormPost = async (event) => {
  event.preventDefault();

  // Collect values from the login form  
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  
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
      // alert(response.statusText);
      alert(errorMessage.message);  
    }
  };

  //Clear input fields
  usernameInput.value = "";
  passwordInput.value = "";
};

document.querySelector('.login-form-submit').addEventListener("click", loginFormPost)


