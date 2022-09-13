const commentTextAreaEl = document.getElementById('comment-text-area');
const commentBtnEl = document.getElementById('comment-btn');

const editBtnsEl = document.querySelectorAll('#edit-btn');
const deleteBtnsEl = document.querySelectorAll('#delete-btn');

const submitBtnsEl = document.querySelectorAll('#submit-edit-btn');
const cancelBtnsEl = document.querySelectorAll('#cancel-edit-btn');

//get p tag with data-comment-id ---> document.querySelector('p[data-comment-id='id_of_comment']');
//get textarea with data-id ---> document.querySelector('textarea[data-comment-id='id_of_comment']);

const postComment = async() => {
   const postCardEl = document.getElementById('post-card');
   const postID = postCardEl.dataset.postId;
   const comment = {
      comment: commentTextAreaEl.value,
      postID: postID,
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
   console.log(event.target.dataset.commentId);
   const commentID = event.target.dataset.commentId;
   try {
      const res = await fetch(`/api/comments/delete/${commentID}`, {
         method: 'DELETE',
      });

      await res.json();
      window.location.reload();
   } catch(error) {
      console.error(error);
      alert(error);
   }
}

const editComment = (event) => {
   const commentID = event.target.dataset.commentId;

   const pTagEl = document.querySelector(`#comment-p[data-comment-id='${commentID}']`);
   const textAreaEl = document.querySelector(`#edit-comment-textarea[data-comment-id='${commentID}']`);
   const editBtnEl = document.querySelector(`#comment-btns[data-comment-id='${commentID}'] #edit-btn`);
   const deleteBtnEl = document.querySelector(`#comment-btns[data-comment-id='${commentID}'] #delete-btn`);
   const submitEditBtnEl = document.querySelector(`#comment-btns[data-comment-id='${commentID}'] #submit-edit-btn`);
   const cancelEditBtnEl = document.querySelector(`#comment-btns[data-comment-id='${commentID}'] #cancel-edit-btn`);

   pTagEl.style.display = "none";
   textAreaEl.style.display = "block";
   editBtnEl.style.display = "none";
   deleteBtnEl.style.display = "none";
   submitEditBtnEl.style.display = "block";
   cancelEditBtnEl.style.display = "block";
}

const submitEdit = async(event) => {
   const commentID = event.target.dataset.commentId;
   const textAreaEl = document.querySelector(`#edit-comment-textarea[data-comment-id='${commentID}']`);
   const updatedComment = textAreaEl.value;

   try {
      const res = await fetch(`/api/comments/update/${commentID}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({updatedComment: updatedComment}),
      });

      await res.json();
      window.location.reload();
   } catch(error) {
      console.error(error);
      alert(error);
   }
}

const cancelEdit = (event) => {
   const commentID = event.target.dataset.commentId;

   const pTagEl = document.querySelector(`#comment-p[data-comment-id='${commentID}']`);
   const textAreaEl = document.querySelector(`#edit-comment-textarea[data-comment-id='${commentID}']`);
   const editBtnEl = document.querySelector(`#comment-btns[data-comment-id='${commentID}'] #edit-btn`);
   const deleteBtnEl = document.querySelector(`#comment-btns[data-comment-id='${commentID}'] #delete-btn`);
   const submitEditBtnEl = document.querySelector(`#comment-btns[data-comment-id='${commentID}'] #submit-edit-btn`);
   const cancelEditBtnEl = document.querySelector(`#comment-btns[data-comment-id='${commentID}'] #cancel-edit-btn`);

   pTagEl.style.display = "block";
   textAreaEl.style.display = "none";
   editBtnEl.style.display = "block";
   deleteBtnEl.style.display = "block";
   submitEditBtnEl.style.display = "none";
   cancelEditBtnEl.style.display = "none";
}

commentBtnEl.addEventListener('click', postComment);

editBtnsEl.forEach(editBtn => {
   editBtn.addEventListener('click', editComment);
});

deleteBtnsEl.forEach(deleteBtn => {
   deleteBtn.addEventListener('click', deleteComment);
});

submitBtnsEl.forEach(submitBtn => {
   submitBtn.addEventListener('click', submitEdit);
});

cancelBtnsEl.forEach(cancelBtn => {
   cancelBtn.addEventListener('click', cancelEdit);
})