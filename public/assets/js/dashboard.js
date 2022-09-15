const deleteBtnsEl = document.querySelectorAll('#delete-post-btn');
const editBtnsEl = document.querySelectorAll('#edit-post-btn');


const deletePost = async (event) => {
   const postID = event.target.dataset.postId;
   console.log(postID);
   try {
      const res = await fetch(`/api/posts/delete/${postID}`, {
         method: 'DELETE',
      });

      await res.json();
      window.location.reload();
   } catch(error) {
      console.error(error);
      alert(error);
   }
}

const editPost = async (event) => {
   const postID = event.target.dataset.postId;
   window.location.href = `/posts/edit/${postID}`;
}

deleteBtnsEl.forEach(deleteBtn => {
   deleteBtn.addEventListener('click', deletePost);
});

editBtnsEl.forEach(editBtn => {
   editBtn.addEventListener('click', editPost);
});