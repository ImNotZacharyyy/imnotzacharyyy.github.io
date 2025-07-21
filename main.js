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
