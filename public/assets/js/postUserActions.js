const commentTextAreaEl = document.getElementById('comment-text-area');
const commentButtonEl = document.getElementById('comment-button');
const editButtonsEl = document.querySelectorAll('#edit-btn');
const deleteButtonsEl = document.querySelectorAll('#delete-btn');

const postComment = async() => {
   const comment = {
      comment: commentTextAreaEl.value,
      postID: window.location.pathname.substring(7)
   }
   try {
      const res = await fetch('/api/comments/create', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(comment),
      });

      await res.json();
      window.location.reload();
   } catch(error) {
      console.error(error);
      alert(error);
   }
}

const deleteComment = async (event) => {
   console.log(event.target.dataset.id);
}

const editComment = async (event) => {
   console.log(event.target.dataset.id);
}

commentButtonEl.addEventListener('click', postComment);
editButtonsEl.forEach(editBtn => {
   editBtn.addEventListener('click', editComment);
});
deleteButtonsEl.forEach(deleteBtn => {
   deleteBtn.addEventListener('click', deleteComment);
});