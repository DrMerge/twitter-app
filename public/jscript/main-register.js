const registerBtn = document.getElementById("registerBtn");
const url1 = "34.205.33.147";
// Specify the path to your JSON animation file

// Simulate loading your website content
// After your content is loaded, you can hide the preloader.
window.addEventListener("load", function () {
  // Select the preloader element
  const preloader = document.querySelector(".preloader");

  // Hide the preloader (you can use CSS transitions for a smoother effect)
  preloader.style.display = "none";
});

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
