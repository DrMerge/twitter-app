const submitBtn = document.getElementById("submitBtn");
const url1 = "34.205.33.147";

submitBtn.onclick = async (e) => {
  e.preventDefault();

  const url = `http://localhost:4000/prompt`;
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
    .then((response) => {
      if (!response.ok)
        return window.location.replace(`http://localhost:4000/auth`);
    })
    .then(() => {
      window.location.replace(`http://localhost:4000/prompt`);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
