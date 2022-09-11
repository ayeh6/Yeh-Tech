const loginUsernameInput = document.getElementById('login-username-input');
const loginPasswordInput = document.getElementById('login-password-input');
const loginButton = document.getElementById('login-button');

const login = async () => {
   const username = loginUsernameInput.value;
   const password = loginPasswordInput.value;

   if(username.trim().length === 0) {
      alert('Please enter your username');
      return;
   }

   if(password.trim().length === 0) {
      alert('Please enter your password');
      return;
   }

   try {
      const res = await fetch('/api/users/login', {
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
         alert('Please enter correct username and password');
      }
   } catch(error) {
      console.error(error);
      alert(error);
   }
}

loginButton.addEventListener('click', login);