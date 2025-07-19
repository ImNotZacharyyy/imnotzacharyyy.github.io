const toggleAuth = document.getElementById('toggle-auth');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const formTitle = document.getElementById('form-title'); // optional if you have a title

toggleAuth.addEventListener('click', () => {
    if (loginForm.style.display === 'none') {
        // Show login, hide signup
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        toggleAuth.textContent = "Don't have an account? Sign Up";
        if (formTitle) formTitle.textContent = 'Login';
    } else {
        // Show signup, hide login
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        toggleAuth.textContent = "Already have an account? Login";
        if (formTitle) formTitle.textContent = 'Sign Up';
    }
});
