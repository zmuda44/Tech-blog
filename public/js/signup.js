
const signupFormPost= async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
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
  };

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormPost);