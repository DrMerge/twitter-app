const registerBtn = document.getElementById("registerBtn");

registerBtn.onclick = async (e) => {
  e.preventDefault();

  const url = "http://3.82.249.45:4000/register";
  const data = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    phone_No: document.getElementById("phone_No").value,
    password: document.getElementById("password").value,
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
      return response.json(); // Return the parsed JSON data
    })
    .then((result) => {
      const redirectUrl = result.url;
      console.log(redirectUrl);
      window.location.replace(redirectUrl); // Use the correct variable name
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
