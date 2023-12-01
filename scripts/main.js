"use strict"
const cities = [
    {
        name: "Atlanta, GA",
        latitude: 33.748990137923755,
        longitude: -84.3810084128257,
    },
    {
        name: "Miami, FL",
        latitude: 25.761051320220773,
        longitude: -80.19444400640424,
    },
    {
        name: "Phoenix, AZ",
        latitude: 33.45157558527898,
        longitude: -112.07293277055459,
    },
    {
        name: "Newark, NJ",
        latitude: 40.736197063163054,
        longitude: -74.17416279691376,
    },
    {
        name: "Brooklyn, NY",
        latitude: 40.68002461668083,
        longitude: -73.96011901884512,
    },
]

window.onload = function (_event) {
    const citySelect = document.getElementById("city")
    citySelect.onchange = handleCity

    populateCities(cities, citySelect)
}

function populateCities(cities, selectElement) {
    let html = ""
    for (let index = 0; index < cities.length; index += 1) {
        const currentCity = cities[index]
        html += `<option value="${currentCity.latitude},${currentCity.longitude}">${currentCity.name}</option>`
    }
    selectElement.innerHTML += html
}

function handleCity(event) {
    const selectedCoordinates = event.target.value
    fetch(`https://api.weather.gov/points/${selectedCoordinates}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data.properties.forecast
        })
        .then(getForecasts)
}

function getForecasts(forecastURL) {
    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {
            return (data.properties.periods)
        })
        .then(renderForecasts)
}

function renderForecasts(forecasts) {
    let html = ""
    for (let index = 0; index < forecasts.length; index += 1) {
        const forecastResults = forecasts[index];
        html +=
        `
            <div class="card h-100">
                <img src="${forecastResults.icon}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${forecastResults.name}</h5>
                    <p class="card-text">${forecastResults.shortForecast}</p>
                </div>
            </div>
        `
        
    }
    const resultsDiv = document.getElementById("forecastResults")
    resultsDiv.innerHTML = html
}


// function createForecastCard (forecast){
//     console.log(forecasts)
// }