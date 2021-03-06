const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");
const messageThree = document.getElementById("message-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  messageThree.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    messageOne.textContent = "";
    response.json().then((data) => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast.lineOne;
      messageThree.textContent = data.forecast.lineTwo;
    });
  });
});
