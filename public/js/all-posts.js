const cardsEl = document.getElementsByClassName('card')
const cardsH2El = document.querySelectorAll('.card h2')
const commentBtnEl = document.getElementsByClassName('comment-btn')
const collapseBtn = document.getElementsByClassName("collapse-comment-box")

function displayCommentBox () {
  const cardEl = this.parentElement.parentElement
  console.log(cardEl)
  const commentBoxEl = cardEl.querySelector('.comments')
  commentBoxEl.style.display = "block"    
}

function hideCommentBox (event) {
  event.stopPropagation();
  const commentBoxEl = this.parentElement;  // can also write const commentBoxEl = this.closest(".comments");
  commentBoxEl.style.display = "none";    
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

for (cardH2 of cardsH2El) {
  cardH2.addEventListener('click', displayCommentBox);
}

for (btn of commentBtnEl) {
  btn.addEventListener('click', (e) => {
    const postId = e.target.getAttribute('data-post-id');
    const commentContent = document.getElementById("comment-input-post"+postId).value.trim();
    const userId = document.getElementById('user-welcome').getAttribute('data-user-id');
    submitComment(commentContent, postId, userId);
  })
}

for (btn of collapseBtn) {
  btn.addEventListener("click", hideCommentBox);
}





