const followBtn = document.getElementById("follow-button")
const userInfoEl = document.getElementById("userInfo")

async function followUser () {

  const userId = userInfoEl.getAttribute('user-id')

  const response = await fetch(`/api/users/follow/${userId}`, {
    method: 'POST',
    // body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload()
  }

  else {
    alert(response.statusText)
  }
}



if (followBtn.innerHTML == "follow") {
  followBtn.addEventListener('click', followUser)
}
else {
  console.log("unfllow")
}

