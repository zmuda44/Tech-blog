const followBtn = document.getElementById("follow-button")
const userInfoEl = document.getElementById("userInfo")

async function followUser () {

  const userId = userInfoEl.getAttribute('user-id')

  const response = await fetch(`/api/users/follow/${userId}`, {
    method: 'POST',
    // body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

}





followBtn.addEventListener('click', followUser)