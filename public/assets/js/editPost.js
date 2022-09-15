const titleInputEl = document.getElementById('edit-post-title-input');
const contentTextAreaEl = document.getElementById('edit-post-content-textarea');
const publishBtnEl = document.getElementById('edit-post-btn');

const editPost = async () => {
   const title = titleInputEl.value;
   const content = contentTextAreaEl.value;
   const post = {
      title: title,
      content: content,
   }
   try {
      const res = await fetch(`/api/posts/update/${publishBtnEl.dataset.postId}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(post),
      });
      await res.json();
      window.location.href = '/dashboard';
   } catch(error) {
      console.error(error);
      alert(error);
   }
}

publishBtnEl.addEventListener('click', editPost);