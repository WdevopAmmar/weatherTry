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

  const weatherCard = ({ cityName, temp, icon, desc,humid , pressure, wind }) => `
  <div class=" bg-[url('https://static.vecteezy.com/system/resources/thumbnails/001/626/074/small/timelapse-of-fast-moving-clouds-free-video.jpg')] bg-no-repeat bg-cover w-50 h-100 border-4 ring-4 border-grey-400">
  <div class=" flex flex-col px-16 rounded-xl ">
      <h1 class="font-bold text-5xl mt-8 mb-5 px-8">Weather of ${cityName}</h1>
      <div class="elements flex flex-col justify-center items-center">
          <div class="iconTemp flex mb-5">
              <img class="mr-4 border-2 border-blue-300 h-20 w-20" src="https://openweathermap.org/img/wn/${icon}@2x.png">
              <h4 class="font-semibold text-2xl">Teamperature - ${temp} &deg;c</h4>
          </div>
          <h6 class="mb-5 font-semibold text-xl">Description -${desc}</h6>
          <h6 class="mb-5 font-semibold text-xl">Humidity- ${humid}%</h6>
          <h6 class="mb-5 font-semibold text-xl">Pressure- ${pressure} hPa</h6>
          <h6 class="mb-8 font-semibold text-xl">Wind Speed- ${wind} m/sec</h6>
      </div>
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
          card.classList.add("p-20");
          card.innerHTML = weatherCard({
            temp: parseFloat(data.main.temp-273.15).toFixed(2),
            cityName: data.name,
            icon: data.weather[0].icon,
            desc: data.weather[0].description,
            humid:data.main.humidity,
            pressure:data.main.pressure,
            wind:data.wind.speed
          });
          container.append(card);
        });
    });
  }
});

const input = document.querySelector("input");
const button = document.querySelector("button");
const container = document.querySelector(".container");
// const appId = "5f6b8d323af9ca247e5211b8ca44967d";
const weatherCard = ({ cityName, temp, icon, desc,humid , pressure, wind }) => `
<div class=" bg-[url('https://static.vecteezy.com/system/resources/thumbnails/001/626/074/small/timelapse-of-fast-moving-clouds-free-video.jpg')] bg-no-repeat bg-cover w-50 h-100 border-4 ring-4 border-grey-400">
<div class=" flex flex-col px-16 rounded-xl ">
    <h1 class="font-bold text-5xl mt-8 mb-5 px-8">Weather of ${cityName}</h1>
    <div class="elements flex flex-col justify-center items-center">
        <div class="iconTemp flex mb-5">
            <img class="mr-4 border-2 border-blue-300 h-20 w-20" src="https://openweathermap.org/img/wn/${icon}@2x.png">
            <h4 class="font-semibold text-2xl">Teamperature - ${temp} &deg;c</h4>
        </div>
        <h6 class="mb-5 font-semibold text-xl">Description -${desc}</h6>
        <h6 class="mb-5 font-semibold text-xl">Humidity- ${humid}%</h6>
        <h6 class="mb-5 font-semibold text-xl">Pressure- ${pressure} hPa</h6>
        <h6 class="mb-8 font-semibold text-xl">Wind Speed- ${wind} m/sec</h6>
    </div>
</div>
`;
const weatherCheck = async()=>{
  try {
    button.disabled = true;
    button.innerText = "Searching";
    const cityName= input.value;
  
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=af60d6b681c5a3d2b78f92d51dd87a87`)
    const data = await res.json()
    
      container.innerHTML = "";
      console.log(data)
      const card = document.createElement("div");
        // card.style.backgroundImage="url(https://www.pixelstalk.net/wp-content/uploads/2016/07/Download-Free-Weather-Background.jpg)"
        card.classList.add("p-20");
        card.innerHTML = weatherCard({
          temp: parseFloat(data.main.temp-273.15).toFixed(2),
          cityName: data.name,
          icon: data.weather[0].icon,
          desc: data.weather[0].description,
          humid:data.main.humidity,
          pressure:data.main.pressure,
          wind:data.wind.speed
        });
      container.append(card);

  } catch (error) {
    console.log(error)
  }
  finally {
    button.disabled = false;
    button.textContent = "Search";
  }
  };
  button.addEventListener('click', weatherCheck)