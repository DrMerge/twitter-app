const submitBtn = document.getElementById("submitBtn");

submitBtn.onclick = async (e) => {
  e.preventDefault();

  const url = "http://localhost:4000/otp";
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
      const redirectUrl = result.url;
      window.location.replace(redirectUrl);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
