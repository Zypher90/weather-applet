document.addEventListener("DOMContentLoaded", () => {

    document.querySelector(".info").classList.add("hidden");
    let city = document.querySelector(".city-input");
    let submit = document.querySelector(".submit-btn");
    let error = document.querySelector(".error");
    let info = document.querySelector(".info");
    let icon = document.querySelector(".condition-img");

    const API_KEY = "8922c7bc950772d32c2ee141cc370384";
    
    
    submit.addEventListener("click", function(e) {
        if(!city.value){
            return;
        }
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}&units=metric`;
        fetchResponse(URL);
    })

    async function fetchResponse(URL){
        let response = await fetch(URL);
        if(!response.ok){
            info.classList.add("hidden");
            error.classList.remove("hidden");
            city.value = "";
            return;
        }
        else{
            error.classList.add("hidden");
            displayResponse(await response.json());
        }
    }   

    function displayResponse(response){
        console.log(response);
        error.classList.add("hidden");
        info.classList.remove("hidden");
        document.querySelector(".city-name").innerHTML = capitalize(city.value);
        document.querySelector(".temp").innerHTML = `${response.main.temp}°C`;
        document.querySelector(".humidity").innerHTML = `${response.main.humidity}%`;
        document.querySelector(".wind-speed").innerHTML = `${response.wind.speed}`;
        switch(response.weather[0].main){
            case "Clear":
                icon.src = "assets/clear.png";
                break;
            case "Clouds":
                icon.src = "assets/clouds.png";
                break;
            case "Snow":
                icon.src = "assets/snow.png";
                break;
            case "Rain":
                icon.src = "assets/rain.png";
                break;
            case "Mist":
                icon.src = "assets/mist.png";
                break;
            case "Drizzle":
                icon.src = "assets/drizzle.png";
                break;
            default:
                break;
        }
    }

    function capitalize(string){
        return String(string).charAt(0).toUpperCase() + String(string).slice(1);
    }
})