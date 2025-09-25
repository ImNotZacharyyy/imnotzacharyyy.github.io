let ws;
const toggle = document.getElementById("sbToggle");

// dialog elements
const connectDialog = document.getElementById("sb-connect-dialog");
const sbAddressInput = document.getElementById("sb-address");
const sbPortInput = document.getElementById("sb-port");
const sbPasswordInput = document.getElementById("sb-password");
const sbErrorLabel = document.getElementById("sb-error-label");
const backdrop = document.getElementById("sb-dialog-backdrop");
const statusIcon = document.getElementById("statusIcon");

function ClosenConnectDialog() {
  backdrop.style.display = "none";
}

function showConnectDialog() {
  backdrop.style.display = "flex"; // flex centers the child dialog
}

// clicking the status icon shows the dialog
statusIcon.addEventListener("click", () => {
  showConnectDialog();
});

// allow ESC key to close the dialog
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    ClosenConnectDialog();
  }
});


function setStatus(connected) {
  if (connected) {
    statusIcon.src = "/assets/connected.svg";
    ClosenConnectDialog(); // hide dialog if it was open
  } else {
    statusIcon.src = "/assets/disconnected.svg";
    showConnectDialog();   // <-- open dialog automatically
  }
}


function ClosenConnectDialog() {
  const backdrop = document.getElementById("sb-dialog-backdrop");
  backdrop.style.display = "none"; // hides blur + dialog
}

function connectWebSocket(address = "127.0.0.1", port = "8080", password = "") {
  try {
    ws = new WebSocket(`ws://${address}:${port}`);

    ws.onopen = () => {
      console.log("Connected to Streamer.bot");
      setStatus(true);

      // If password is required, send authentication request here:
      if (password) {
        ws.send(JSON.stringify({
          request: "Authenticate",
          id: "auth-1",
          password: password
        }));
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from Streamer.bot");
      setStatus(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      sbErrorLabel.textContent = "Connection failed.";
      setStatus(false);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Reply:", data);

        if (data.error) {
          sbErrorLabel.textContent = "Error: " + data.error;
        } else {
          sbErrorLabel.textContent = "";
        }
      } catch {
        console.log("Raw message:", event.data);
      }
    };
  } catch (e) {
    console.error("Failed to open WebSocket:", e);
    sbErrorLabel.textContent = "Invalid address/port.";
  }
}

// called when you click the Connect button in dialog
function Connect() {
  const address = sbAddressInput.value || "127.0.0.1";
  const port = sbPortInput.value || "8080";
  const password = sbPasswordInput.value || "";
  connectWebSocket(address, port, password);
}

toggle.addEventListener("change", () => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    const actionName = toggle.checked
      ? "[INZ] Channel Points On"
      : "[INZ] Channel Points Off";

    const actionId = toggle.checked ? "toggle-on" : "toggle-off";

    // RUNS THE ACTIONS
    ws.send(JSON.stringify({
      request: "DoAction",
      id: actionId,
      action: { name: actionName }
    }));
  } else {
    console.warn("WebSocket not connected.");
    connectDialog.style.display = "block"; // force dialog open
  }
});

// try auto-connect on page load with defaults
connectWebSocket();
