// navigator.geolocation.getCurrentPosition(function(position) {
//     console.log(position)
//   })
window.addEventListener("load", () => {
  let lat;
  let lon;
  const container = document.querySelector(".container");
  const appId = "5f6b8d323af9ca247e5211b8ca44967d";
  // const url1 = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${5}&appid=${appId}`
  // const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

  const weatherCard = ({ cityName, temp, icon, desc }) => `
<div class="w-50 h-100">
            <div class=" flex flex-col px-16 rounded-xl border-5 border-grey-600"
                >
                <h1 class="font-bold text-3xl text-center pt-6 pb-3">${cityName}</h1>
                <img class="pb-3" src="${icon}">
                <h2 class="font-semibold pb-3">Teamperature- ${temp}</h2>
                <h4 class="font-medium pb-8">Description- ${desc}</h4>
            </div>
`;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      console.log(position);

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const card = document.createElement("div");
          card.style.backgroundImage="url(https://www.pixelstalk.net/wp-content/uploads/2016/07/Download-Free-Weather-Background.jpg)"
          card.classList.add("p-20");
          card.innerHTML = weatherCard({
            temp: data.main.temp,
            cityName: data.name,
            icon: data.weather[0].icon,
            desc: data.weather[0].description,
          });
          container.append(card);
        });
    });
  }
});

const input = document.querySelector("input");
const button = document.querySelector("button");
const container = document.querySelector(".container");
const appId = "5f6b8d323af9ca247e5211b8ca44967d";
const weatherCard = ({ cityName, temp, icon, desc }) => `
<div class="w-50 h-100">
            <div class=" flex flex-col px-16 rounded-xl border-5 border-grey-600"
                >
                <h1 class="font-bold text-3xl text-center pt-6 pb-3">${cityName}</h1>
                <img class="pb-3" src="${icon}">
                <h2 class="font-semibold pb-3">Teamperature- ${temp}</h2>
                <h4 class="font-medium pb-8">Description- ${desc}</h4>
            </div>
`;
const weatherCheck = async()=>{
  try {
    button.disabled = true;
    button.innerText = "Searching";
    const cityName= input.value;
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${1}&appid=${appId}`)
    let data = await res.json()
    data =async()=>{
      const lat = data.lat
      const lon = data.lon
      console.log(lon)
      container.innerHTML = "";
      const resource = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`)
      const wet = await resource.json()
      wet=()=>{
        const card = document.createElement("div");
        card.style.backgroundImage="url(https://www.pixelstalk.net/wp-content/uploads/2016/07/Download-Free-Weather-Background.jpg)"
        card.classList.add("p-20");
        card.innerHTML = weatherCard({
          temp: wet.main.temp,
          cityName: wet.name,
          icon: wet.weather[0].icon,
          desc: wet.weather[0].description,
      });
      container.append(card);
    }
  }} catch (error) {
    console.log(error)
  }
  finally {
    button.disabled = false;
    button.textContent = "Search";
  }
};
button.addEventListener('click', weatherCheck)