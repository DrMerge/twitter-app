const registerBtn = document.getElementById("registerBtn");
const url1 = "34.205.33.147";
// Specify the path to your JSON animation file

var animationContainer2 = document.getElementById("lottie-container-2");
var animationData2 = {
  container: animationContainer2,
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: "ash.json",
};
var animation2 = lottie.loadAnimation(animationData2);

registerBtn.onclick = async (e) => {
  e.preventDefault();

  const url = ` http://localhost:4000/register`;
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
      if (result.message === "User not found")
        return window.location.replace(url);
      const redirectUrl = result.url;
      console.log(redirectUrl);
      window.location.replace(redirectUrl); // Use the correct variable name
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
