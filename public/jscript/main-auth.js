const submitBtn = document.getElementById("submitBtn");
const url1 = require("../../config/url");

submitBtn.onclick = async (e) => {
  e.preventDefault();

  const url = `http://${url1}:4000/auth`;
  const data = {
    username_phoneNo: document.getElementById("username_phoneNo").value,
    password: document.getElementById("password").value,
  };
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const url = result.url;
      window.location.replace(url);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
