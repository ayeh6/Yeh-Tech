const titleInputEl = document.getElementById('create-post-title-input');
const contentTextAreaEl = document.getElementById('create-post-content-textarea');
const postBtnEl = document.getElementById('create-post-btn');

const createPost = async () => {
   const title = titleInputEl.value;
   const content = contentTextAreaEl.value;
   const post = {
      title: title,
      content: content,
   };
   console.log(post);
   try {
      const res = await fetch('/api/posts/create', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(post),
      });
      const response = await res.json();
      console.log(response);
      if(response === "success") {
         window.location.href = '/dashboard';
      }
   } catch(error) {
      console.error(error);
      alert(error);
   }
}

postBtnEl.addEventListener('click', createPost);