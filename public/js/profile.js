const followBtn = document.getElementById("follow-button")
const userInfoEl = document.getElementById("userInfo")

async function followUser () {
  const userId = userInfoEl.getAttribute('user-id')

  const response = await fetch(`/api/users/follow/${userId}`, {
    method: 'POST',
    // body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const message = await response.json();

  if (response.ok) {
    document.location.reload()
  } 

  else {
    alert(message)
  }
}

const unFollowUser = async () => {

  const userId = userInfoEl.getAttribute('user-id')

  const response = await fetch(`/api/users/unfollow/${userId}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  });

  if (response.ok) {
    document.location.reload()
  }

  else {
    alert(response.statusText)
  }
}

// If the button says 'follow', run function to follow user, if the button says 'unfollow', run function to unfollow
if (followBtn.textContent == "Follow") {
  followBtn.addEventListener('click', followUser)
}
else {
  followBtn.addEventListener('click', unFollowUser)
}

