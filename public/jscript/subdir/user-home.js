const botToggle = document.getElementById("botToggle");
let botOn;

botToggle.onclick = () => {
  botOn = !botOn;
  botToggle.innerText = botOn ? "BOT IS RUNNING" : "BOT IS AWAY";

  // Adjust the botStatus assignment to match the bot state
  let botStatus = botOn ? true : false;

  console.log(botStatus);

  const url = "http://localhost:4000/botData";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ botStatus: botStatus }),
  }).catch((error) => {
    console.error("Error:", error);
  });
};
