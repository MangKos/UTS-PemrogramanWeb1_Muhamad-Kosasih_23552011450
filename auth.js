/* ============================================
   AUTH.JS - Handle Authentication Forms
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // LOGIN FORM HANDLER
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // REGISTER FORM HANDLER
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
    
    // Password validation
    const pwInput = document.getElementById('regPassword');
    const pwConfirm = document.getElementById('regConfirm');
    const pwError = document.getElementById('pwError');
    
    [pwInput, pwConfirm].forEach(input => {
      input?.addEventListener('change', validatePassword);
    });
  }
});

// VALIDATE PASSWORD MATCH
function validatePassword() {
  const pwInput = document.getElementById('regPassword');
  const pwConfirm = document.getElementById('regConfirm');
  const pwError = document.getElementById('pwError');
  
  if (pwInput.value !== pwConfirm.value) {
    pwError.style.display = 'block';
    pwConfirm.classList.add('is-invalid');
    return false;
  } else {
    pwError.style.display = 'none';
    pwConfirm.classList.remove('is-invalid');
    return true;
  }
}

// HANDLE LOGIN
async function handleLogin(e) {
  e.preventDefault();

  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const errorDiv = document.getElementById('loginError');
  const loadingDiv = document.getElementById('loginLoading');
  const submitBtn = document.querySelector('button[type="submit"]');

  // Show loading
  if (loadingDiv) loadingDiv.style.display = 'block';
  submitBtn.disabled = true;
  if (errorDiv) errorDiv.style.display = 'none';

  // Simple validation using if statement
  if (username === '' || password === '') {
    if (errorDiv) {
      errorDiv.textContent = 'Username dan password harus diisi';
      errorDiv.style.display = 'block';
    }
    if (loadingDiv) loadingDiv.style.display = 'none';
    submitBtn.disabled = false;
    return;
  }

  try {
    // Call API
    const response = await API.login(username, password);

    if (response.success) {
      // Login berhasil - simpan user data
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      // Redirect ke halaman menu utama (dashboard)
      setTimeout(() => {
        window.location.href = '../dashboard/dashboard.html';
      }, 500);
    } else {
      // Login gagal
      if (errorDiv) {
        errorDiv.textContent = response.message || 'Username atau password salah';
        errorDiv.style.display = 'block';
      }
    }
  } catch (error) {
    if (errorDiv) {
      errorDiv.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
      errorDiv.style.display = 'block';
    }
    console.error('Login error:', error);
  } finally {
    if (loadingDiv) loadingDiv.style.display = 'none';
    submitBtn.disabled = false;
  }
}

// HANDLE REGISTER
async function handleRegister(e) {
  e.preventDefault();
  
  // Validate password
  if (!validatePassword()) {
    alert('Password tidak cocok!');
    return;
  }
  
  const fullname = document.querySelector('input[name="fullname"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const errorDiv = document.getElementById('registerError');
  const loadingDiv = document.getElementById('registerLoading');
  const submitBtn = document.querySelector('button[type="submit"]');
  
  // Show loading
  loadingDiv.style.display = 'block';
  submitBtn.disabled = true;
  errorDiv.style.display = 'none';
  
  try {
    // Call API
    const response = await API.register(fullname, email, password);
    
    if (response.success) {
      // Register berhasil - simpan user data
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      // Redirect ke dashboard
      setTimeout(() => {
        window.location.href = '../dashboard/dashboard.html';
      }, 500);
    } else {
      // Register gagal
      errorDiv.textContent = response.message || 'Pendaftaran gagal. Silakan coba lagi.';
      errorDiv.style.display = 'block';
    }
  } catch (error) {
    errorDiv.textContent = 'Error: ' + error.message;
    errorDiv.style.display = 'block';
    console.error('Register error:', error);
  } finally {
    loadingDiv.style.display = 'none';
    submitBtn.disabled = false;
  }
}
