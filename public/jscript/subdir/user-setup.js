const submitBtn = document.getElementById("submitBtn");

submitBtn.onclick = async (e) => {
  e.preventDefault();

  const url = "http://3.82.249.45:4000/setup";
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
        window.location.replace("http://3.82.249.45:4000/auth");
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
