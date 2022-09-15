const signUpUsernameInputEl = document.getElementById('signup-username-input');
const signUpPasswordInputEl = document.getElementById('signup-password-input');
const signUpPasswordConfirmInputEl = document.getElementById('signup-password-confirm-input');
const signUpBtnEl = document.getElementById('signup-btn');

const signUp = async() => {
   const username = signUpUsernameInputEl.value;
   const password = signUpPasswordInputEl.value;
   const passwordConfirm = signUpPasswordConfirmInputEl.value;

   if(username.trim().length === 0) {
      alert('Please enter a username');
      return;
   }

   if(password.trim().length < 6) {
      alert('Please enter a password with 6 or more characters');
      return;
   }

   if(password !== passwordConfirm) {
      alert('Passwords do not match');
      return;
   }

   try {
      const res = await fetch('/api/users/signup', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            username,
            password,
         })
      });

      const resData = await res.json();
      if(resData.success) {
         window.location.href = '/';
      } else {
         alert('An error has occured');
      }
   } catch(error) {
      console.error(error);
      alert(error);
   }
}

signUpBtnEl.addEventListener('click', signUp);