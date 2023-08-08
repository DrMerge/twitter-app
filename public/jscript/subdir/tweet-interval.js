const submitBtn = document.getElementById("submitBtn");

const convertDaysToMilliseconds=(value)=>{

    return value * 24 * 60 * 60 * 1000;

}
const convertHoursToMilliseconds=(value)=>{

    return value * 60 * 60 * 1000;

}
const convertMinutesToMilliseconds=(value)=>{

    return value  * 60 * 1000;

}












submitBtn.onclick = async (e) => {
  e.preventDefault();

  const url = "http://3.82.249.45:4000/interval";
 const digit=document.getElementById("interval").value
const unit= document.getElementById("unit").value
const error= document.getElementById('error')

const digitMilliseconds=unit=='minutes'?convertMinutesToMilliseconds(digit):unit=='hours'?convertHoursToMilliseconds(digit):unit=='days'?convertDaysToMilliseconds(digit):error.textContent='Pick a unit';


if(digitMilliseconds<1800000) return error.textContent='Interval cannot be less than 30 minutes'





  const data = {
    interval:digitMilliseconds
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
        return window.location.replace("http://3.82.249.45:4000/auth");
    })
    .then(() => {
      window.location.replace("http://3.82.249.45:4000/interval");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
