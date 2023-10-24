const submitBtn = document.getElementById("submitBtn");
const url1 = "34.205.33.147";
const msg = document.getElementById("msg");

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
      if (result.message === "User not found") {
        return window.location.replace(url);
      }

      if (result.error) {
        let durationInSeconds = 30; // Set the timer duration to 30 seconds

        function updateTimer() {
          // Calculate minutes and seconds
          const minutes = Math.floor(durationInSeconds / 60);
          const seconds = durationInSeconds % 60;

          // Format the time as "mm:ss"
          const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;

          // Update the timer display in the 'msg' element
          msg.textContent = `Didn't get OTP? Please retry in ${timeString}`;

          // Decrement the time left
          durationInSeconds--;

          // If the timer reaches 0, stop the timer and replace the text with a "Get OTP" button
          if (durationInSeconds < 0) {
            clearInterval(timer);
            createGetOTPButton();
          }
        }

        // Call the updateTimer function every second
        const timer = setInterval(updateTimer, 1000);
      } else {
        const redirectUrl = result.url;
        window.location.replace(redirectUrl);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

function createGetOTPButton() {
  // Create a "Get OTP" button
  const getOtpButton = document.createElement("button");
  getOtpButton.textContent = "Get OTP";
  getOtpButton.id = "getOtpButton";

  // Add an event listener to the button for handling the "Get OTP" action
  getOtpButton.addEventListener("click", function () {
    // Replace with your logic for getting a new OTP
    alert("Get OTP button clicked!");
  });

  // Replace the countdown text with the "Get OTP" button
  msg.innerHTML = ""; // Clear the existing content
  msg.appendChild(getOtpButton);
}
