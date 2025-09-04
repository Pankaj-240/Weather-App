let cityInput = document.querySelector("#cityInput");
let btn = document.querySelector("#searchBtn");
let container = document.querySelector(".container");
let result = document.querySelector("#weatherResult");
let theme_switch= document.querySelector("#theme-switch");

let darkMode=localStorage.getItem('darkMode');


theme_switch.addEventListener("click",()=>{

  if(darkMode ==="active"){
    disableDarkmode();
  }
  else{
    enableDardmode();
  }
})

function enableDardmode(){
  document.body.classList.add("darkMode");
  darkMode="active";
  localStorage.setItem('darkMode','active');
}

function disableDarkmode(){
  document.body.classList.remove("darkMode");
  darkMode="null";
  localStorage.setItem('darkMode','null');
}

if(darkMode==="active"){
  enableDardmode();
}

btn.addEventListener("click", () => {
  let city = cityInput.value;
  console.log(city);
  if(city===""){
    alert("Enter the city Name")
  }
  else{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=971162df8a341c749f777e92d8ad35aa`;
  container.style.height = "280px";
  showData(url);
  }
});

async function getweather(url) {
  try {
    let req = await fetch(url);
    let data = await req.json();
    return [data.main.temp, data.main.pressure, data.main.humidity];
  } catch {
    return [0, 0, 0];
  }
}

async function showData(url) {
  container.style.height = "450px";

  let data = await getweather(url);

  let Temperature = document.querySelector(".tem");
  let Pressure = document.querySelector(".pre");
  let Humidity = document.querySelector(".hum");

  let convertBtn=document.querySelector(".convert");
  convertBtn.style.display="inline";
  convertBtn.classList.add("convertBtn");
  console.dir(convertBtn.classList);

  let tem=localStorage.getItem("tem");
  convertBtn.addEventListener("click",()=>{
    if(tem==="null"){   
    kalvinToCelsius(data[0]);
    localStorage.setItem("tem","active");
    tem="active";
    }
    else{
    Temperature.innerText = `Temperature : ${data[0]}K `;
    localStorage.setItem("tem","null");
    tem="null"      
    }    
  })

  if(tem==="active"){
    kalvinToCelsius(data[0]);
  }
  else{
    Temperature.innerText = `Temperature : ${data[0]}K `;
  }
  Pressure.innerText = `Pressure : ${data[1]}`;
  Humidity.innerText = `Humidity : ${data[2]}`;
}

function kalvinToCelsius(k){
  let Temperature = document.querySelector(".tem");
  let celcius=(k-273.15).toFixed(2);
  Temperature.innerText= `Temperature : ${celcius}C `;
}

