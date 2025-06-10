function showSignup() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('signup-form').classList.remove('hidden');
  document.getElementById('form-title').innerText = 'Sign Up';
}
function showLogin() {
  document.getElementById('signup-form').classList.add('hidden');
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('form-title').innerText = 'Login';
}

// Handle Login

document.getElementById('login-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  const msg = document.getElementById('login-message');
  if (res.ok) {
    msg.textContent = data.message;
    msg.className = 'message success';
    setTimeout(() => {
      window.location.href = 'gallery.html';
    }, 1000);
  } else {
    msg.textContent = data.message;
    msg.className = 'message';
  }
});

// Handle Signup

document.getElementById('signup-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  const res = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  const msg = document.getElementById('signup-message');
  if (res.ok) {
    msg.textContent = data.message;
    msg.className = 'message success';
  } else {
    msg.textContent = data.message;
    msg.className = 'message';
  }
});
