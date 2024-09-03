const cardsEl = document.getElementsByClassName('card')
const commentBtnEl = document.getElementsByClassName('comment-btn')

function displayCommentBox () {
  console.log()
    const commentBoxEl = this.querySelector('.comments')
    commentBoxEl.style.display = "block"    
}

const submitComment = async (content, post_id, user_id) => {
  if (content && post_id) {

        const response = await fetch('/api/posts/comment', {
          method: 'POST',
          body: JSON.stringify({ content, post_id, user_id, }),

          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {

          document.location.replace('/');
        } else {
          alert(response.statusText);
        }
    }
}

const editPost = async (content, post_id) => {
  
}

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
  
      if (response.ok) {

        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };






for (card of cardsEl) {
card.addEventListener('click', displayCommentBox)
}

for (btn of commentBtnEl) {
  btn.addEventListener('click', (e) => {
    const postId = e.target.getAttribute('data-post-id')
    const commentContent = document.getElementById("comment-input-post"+postId).value.trim()
    const userId = document.getElementById('user-welcome').getAttribute('data-user-id')
    submitComment(commentContent, postId, userId)
  })
}


