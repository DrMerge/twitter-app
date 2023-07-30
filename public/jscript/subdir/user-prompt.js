const submitBtn = document.getElementById("submitBtn");

submitBtn.onclick = async (e) => {
  e.preventDefault();

  const url = "http://localhost:4000/prompt";
  const data = {
    prompt: document.getElementById("prompt").value,
  };
  console.log(data);
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      window.location.replace("http://localhost:4000/home");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
