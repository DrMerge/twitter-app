const botToggle = document.getElementById("botToggle");
let botOn;

botToggle.onclick = () => {
  botOn = !botOn;
  botToggle.innerText = botOn ? "BOT IS RUNNING" : "BOT IS AWAY";

  // Adjust the botStatus assignment to match the bot state
  let botStatus = botOn ? true : false;

  console.log(botStatus);

  const url = `http://localhost:4000/botData`;

  // Add the code to dynamically change the button color based on botOn state
  if (botOn) {
    botToggle.style.backgroundColor = "green"; // Set color when the bot is running
  } else {
    botToggle.style.backgroundColor = "red"; // Set color when the bot is away
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ botStatus: botStatus }),
  })
    .then((response) => {
      if (!response.ok)
        return window.location.replace(`http://localhost:4000/auth`);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
