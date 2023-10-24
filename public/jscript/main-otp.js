const submitBtn = document.getElementById("submitBtn");
const url1 = "34.205.33.147"

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
      if (result.message==='User not found')return window.location.replace(url);
      const redirectUrl = result.url;
      window.location.replace(redirectUrl);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
