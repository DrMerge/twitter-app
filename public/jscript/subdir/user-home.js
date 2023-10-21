const url = require("../../../config/url");
const botToggle = document.getElementById("botToggle");
let botOn;

botToggle.onclick = () => {
  botOn = !botOn;
  botToggle.innerText = botOn ? "BOT IS RUNNING" : "BOT IS AWAY";

  // Adjust the botStatus assignment to match the bot state
  let botStatus = botOn ? true : false;

  console.log(botStatus);

  const url = `http://${url}:4000/botData`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ botStatus: botStatus }),
  })
    .then((response) => {
      if (!response.ok)
        return window.location.replace(`http://${url}:4000/auth`);
    })

    .catch((error) => {
      console.error("Error:", error);
    });
};
