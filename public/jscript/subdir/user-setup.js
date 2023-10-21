const submitBtn = document.getElementById("submitBtn");
const url = require("../../../config/url");

submitBtn.onclick = async (e) => {
  e.preventDefault();

  const url = `http://${url}:4000/setup`;
  const data = {
    APIKEY: document.getElementById("apiKey").value,
    APISECRET: document.getElementById("apiSecret").value,
    ACCESSTOKEN: document.getElementById("accessToken").value,
    ACCESSSECRET: document.getElementById("accessTokenSecret").value,
  };
  console.log(data);
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        window.location.replace(`http://${url}:4000/auth`);
      } else {
        return response.json(); // Return the parsed JSON data
      }
    })
    .then((result) => {
      const redirectUrl = result.url;
      console.log(redirectUrl);
      window.location.replace(redirectUrl);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
