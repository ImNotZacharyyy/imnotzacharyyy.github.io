// Theme toggle
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

// Search functionality
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('#commands ul li');

    items.forEach(item => {
        const commandText = item.textContent.toLowerCase();
        item.style.display = commandText.includes(term) ? 'block' : 'none';
    });
});

// WebSocket (optional)
const status = document.getElementById('status');
const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
    status.innerText = "✅ Connected to Streamer.bot";
};

ws.onmessage = (event) => {
    console.log("Message from Streamer.bot:", event.data);
};

ws.onerror = () => {
    status.innerText = "❌ Error connecting to WebSocket";
};

ws.onclose = () => {
    status.innerText = "🔌 Disconnected from Streamer.bot";
};
