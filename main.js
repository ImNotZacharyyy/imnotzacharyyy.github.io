// main.js

// THEME TOGGLE
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

function updateThemeBtnText(theme) {
    themeToggleBtn.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

// On load: apply saved theme
let savedTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeBtnText(savedTheme);

// Toggle theme on click
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeBtnText(newTheme);
});


// LOGIN MODAL
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const authModal = document.getElementById('auth-modal');
const authCancelBtn = document.getElementById('auth-cancel-btn');

// Show modal on login button click
loginBtn.addEventListener('click', () => {
    authModal.style.display = 'flex';
});

// Hide modal on cancel button click
authCancelBtn.addEventListener('click', () => {
    authModal.style.display = 'none';
});

// Hide modal if user clicks outside the modal content
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
});


// LOGOUT BUTTON
logoutBtn.addEventListener('click', () => {
    // Assuming you have Firebase or other auth logout here
    // For now just reload page or redirect
    alert('Logged out!');
    window.location.href = '/';
});
