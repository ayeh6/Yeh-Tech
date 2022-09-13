const signOutLinkEl = document.getElementById('sign-out-link');

const signout = async () => {
   try {
      const res = await fetch('/api/users/signout', {
         method: 'POST'
      });
      await res.json();
   } catch(error) {
      console.error(error);
      alert(error);
   }

   window.location.href = '/';
}

signOutLinkEl.addEventListener('click', signout);