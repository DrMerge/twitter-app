const submitBtn = document.getElementById("submitBtn");
const url1 = "34.205.33.147";

submitBtn.onclick = async (e) => {
  e.preventDefault();

  const url = `http://${url1}:4000/otp`;
  const otp = document.getElementById("otp").value;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ otp: otp }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.message === "User not found")
        return window.location.replace(url);
      if (result.error) {
        const msg = document.getElementById("msg");
        msg.textContent = `Didn't get OTP? Please retry in 30 seconds`;

        const resendBtn = document.createElement("button");
        const body = document.body;

        resendBtn.style.backgroundColor = "blue";
        resendBtn.style.color = "white";

        resendBtn.textContent = `Resend OTP`;

        resendBtn.addEventListener("click", function () {
          // Replace 'your-url-here' with the URL you want to navigate to
          window.location.href = "your-url-here";
        });

        body.appendChild(resendBtn);
      }
      const redirectUrl = result.url;
      window.location.replace(redirectUrl);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
