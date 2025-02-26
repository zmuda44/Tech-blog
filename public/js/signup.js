// Define inputs
const usernameInput = document.querySelector('#username-signup')
const passwordInput = document.querySelector('#password-signup')

const signupFormPost= async (event) => {
  event.preventDefault();

  //Get values of inputs    
  const username = usernameInput.value.trim();    
  const password = passwordInput.value.trim();

  if (password.length < 8) {
    alert("Password must be at least 8 characters long")
    return
  }

  if (username && password) {
    
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    }); 
    
    const errorMessage = await response.json()

    if (response.ok) {
      console.log(response)
      document.location.replace('/dashboard');

    } else {
      alert(errorMessage.message || response.statusText);
    }
  }

  usernameInput.value = "";
  passwordInput.value = ""; 
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormPost);