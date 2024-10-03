const weatherForm= document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");

const apikey="de9178aaab0d79ff90df8719755d198f";


weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();

    const city=cityInput.value;

    if(city){
        try{

            const weatherData= await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }

        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please Ener A City");
    }

});


async function getWeatherData(city){

    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response=await fetch(apiurl);

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }
    

    return await response.json();


}


function displayWeatherInfo(data){
    

    const {
            name:city,
            main : {temp,humidity},
            weather:[{description,id}]}=data;

    card.textContent="";
    card.style.display="flex";

    const cityDisplay=document.createElement("h1");
    cityDisplay.classList.add("cityDisplay");

    const tempDisplay=document.createElement("p");
    tempDisplay.classList.add("tempDisplay");

    const humidityDisplay=document.createElement("p");
    humidityDisplay.classList.add("humidityDisplay");

    const descDisplay=document.createElement("p");
    descDisplay.classList.add("descDisplay");

    const weatherEmoji=document.createElement("p");
    weatherEmoji.classList.add("weatherEmoji");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    descDisplay.textContent=description;
    weatherEmoji.textContent=getWeatherEmoji(id);



    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId){

    switch(true)
    {
        case(weatherId>= 200 && weatherId<300):
        return "⛈️";

        case(weatherId>= 300 && weatherId<400):
        return "🌦️";

        case(weatherId>= 500 && weatherId<600):
        return "🌧️";

        case(weatherId>= 600 && weatherId<700):
        return "🌨️";


        case(weatherId>= 700 && weatherId<800):
        return "🌫️";

        case(weatherId ===800):
        return "🌞";

        case(weatherId> 801 && weatherId<810):
        return "☁️";

        default:
            return"⁉️";



        
    }

}

function displayError(message){

    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);


}