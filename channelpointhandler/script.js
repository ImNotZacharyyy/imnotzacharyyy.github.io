const sb = new StreamerbotClient({ host: "127.0.0.1", port: 8080 });



// CONNECT TO STREAMER.BOT
sb.on("connected", () => {
  console.log("Connected to Streamer.bot!");
});

sb.on("disconnected", () => {
  console.log("Disconnected from Streamer.bot");
});

const ACTION_ID_CHECKED = "257083b8-d763-4c1f-a34a-c5f3845a94dd";
const ACTION_ID_UNCHECKED = "9021e342-f815-494e-b99e-aaff11cc49b6";

// Grab the checkbox
const checkbox = document.querySelector("input[type=checkbox]");

// THE THING TO RUN THEM

checkbox.addEventListener("change", (e) => {
  const actionId = e.target.checked ? ACTION_ID_CHECKED : ACTION_ID_UNCHECKED;

  sb.doAction({ id: actionId });
  console.log("Triggered action:", actionId);
});
