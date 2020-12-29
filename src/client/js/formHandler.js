import { getGeoData, getWeatherData, getPixData } from './getFunctions'
// ////////////////////// APIs /////////////////////////
// Geonames api
const geonames_URL = "http://api.geonames.org/searchJSON?q=";
const geonames_key = "seham";
// Weatherbit api
const current_Weatherbit_URL = 'https://api.weatherbit.io/v2.0/current';
// const forecast_Weatherbit_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';
// const weatherbit_URL = "http://api.geonames.org/searchJSON?q=";
const weatherbit_key = "556f89cf23064db385ce83998c81eeee";
// Pixabay api
const pixabay_URL = "https://pixabay.com/api/?key=";
const pixabay_key = "19674080-4b47da232d77b414a555c2ad9";

//////////////////////// input fields values /////////////////////
const fromCity = document.querySelector('input[name="fromCity"]');
const toCity = document.querySelector('input[name="toCity"]');
const depDate = document.querySelector('input[name="depDate"]');
const retDate = document.querySelector('input[name="retDate"]');

//////////////add default date in date picked///////////////////
//// source of this function:https://stackoverflow.com/questions/6982692/how-to-set-input-type-dates-default-value-to-today
// Date.prototype.toDateInputValue = (function() {
//     var local = new Date(this);
//     local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
//     return local.toJSON().slice(0, 10);
// });
// depDate.value = new Date().toDateInputValue();
// retDate.value = new Date().toDateInputValue();
//////////////////////////////////////////////////////////////////////

const dataSection = document.querySelector(".data-section")

// const submitButton = document.querySelector(".submit-btn")
// document.querySelector(".submit-btn").addEventListener("click", handleSubmit)

//////////////////////////////handleSumit function ///////////////////////////
function handleSubmit(event) {
    event.preventDefault()
        // check for the fields
    if (toCity.value == "") {
        alert("Please enter a city to visit")
    } else if (depDate.value == "") {
        alert("Please enter a departing date")
    } else if (retDate.value == "") {
        alert("Please enter a returning date")

    } else {
        console.log("::: Form Submitted :::")
            /// object stores all the input entered by the user
        const userInputs = {
            fromcity: fromCity.value,
            tocity: toCity.value,
            depDate: depDate.value,
            retDate: retDate.value
        }
        console.log(userInputs)
            /// get lat,lng,country name using geonames api
        getGeoData(geonames_URL, toCity.value, geonames_key)
            .then(function(dataFromGeonames) {
                // console.log(dataFromGeonames)
                try {
                    const country = dataFromGeonames.geonames[0].countryName;
                    const cityLat = dataFromGeonames.geonames[0].lat;
                    const cityLong = dataFromGeonames.geonames[0].lng;
                    // storing the data obtained from geonames in an object
                    const cityData = { countryName: country, lat: cityLat, lng: cityLong }
                    console.log(cityData)
                        /// get temp and description using weatherbit api
                    getWeatherData(current_Weatherbit_URL, weatherbit_key, cityData.lat, cityData.lng)
                        .then(function(dataFromWeatherbit) {
                            // console.log(dataFromWeatherbit)
                            try {
                                const temp = dataFromWeatherbit.data[0].temp;
                                const desc = dataFromWeatherbit.data[0].weather.description;
                                // storing the data obtained from weatherbit in an object
                                const weatherData = { tempreture: temp, description: desc }
                                console.log(weatherData)
                                    // get image of the destination city using pixabay api
                                getPixData(pixabay_URL, pixabay_key, userInputs.tocity)
                                    .then(function(dataFromPixabay) {
                                        try {
                                            const image = dataFromPixabay.hits[0].webformatURL
                                                // if there is an image found update the UI using data +image
                                            UpdateUserInterface(userInputs, weatherData, image)

                                            .then(function(tripData) {
                                                console.log(tripData)
                                                    // add the trip to the server array
                                                addTrip(tripData)
                                                    // showAllTrips()
                                            })
                                        } catch (error) {
                                            // alert("no pic for the city found!")
                                            // if there no is an image found update the UI using data
                                            UpdateUserInterfaceWithoutImg(userInputs, weatherData)
                                                .then(function(tripData) {
                                                    console.log(tripData)
                                                        // add the trip to the server array
                                                    addTrip(tripData)
                                                        // showAllTrips()
                                                })
                                        }
                                    })
                            } catch (error) {
                                alert("Error in getting weather data from api")
                            }
                        })
                } catch (error) {
                    alert("Error in getting city location from api")
                }
            })
    }
}

// //////////////////// UpdateUserInterface function /////////////////
async function UpdateUserInterface(userInputs, weatherData, image) {
    try {
        // console.log(userInputs.fromcity)
        // if the user entered their origin city, update the UI using it, if not, remove From from html
        if (userInputs.fromcity == "") {
            document.querySelector(".from-text").classList.add("hide")
        }
        // remve hide class from the trip card
        dataSection.classList.remove("hide")

        // document.querySelector(".city-figure").classList.remove("hide")

        // add the image to UI
        document.querySelector(".city-image").setAttribute('src', image)

        /////// calculate the days left until the day of trip and the lenght of the trip
        const today = (Date.now()) / 1000;

        const depDateValue = depDate.value;
        const dep = (new Date(depDateValue).getTime()) / 1000;

        const retDateValue = retDate.value;
        const ret = (new Date(retDateValue).getTime()) / 1000;

        const daysLeft = Math.round((dep - today) / 86400);
        const tripDays = Math.round((ret - dep) / 86400);

        // update the UI using the data 
        document.querySelector(".tripDays").innerHTML = tripDays;
        document.querySelector(".days-away").innerHTML = daysLeft;

        document.querySelector(".from-city").innerHTML = userInputs.fromcity;
        document.querySelector(".to-city").innerHTML = userInputs.tocity;
        document.querySelector(".date-text").innerHTML = userInputs.depDate
        document.querySelector(".date-text-2").innerHTML = userInputs.retDate
        document.querySelector(".temp").innerHTML = weatherData.tempreture;
        document.querySelector(".weather").innerHTML = weatherData.description;

        // save the trip data into an object
        const trip = {
                from: userInputs.fromcity,
                to: userInputs.tocity,
                depDate: userInputs.depDate,
                retDate: userInputs.retDate,
                temp: weatherData.tempreture,
                desc: weatherData.description
            }
            // smooth scrolling to trip data section
        dataSection.scrollIntoView({ behavior: 'smooth' });
        return trip;
        // console.log(trip)
    } catch (error) {
        console.log("Error in UpdateUserInterface: ", error)
    }
}
////////////////////// update user interface function if there is not image found for the city////
async function UpdateUserInterfaceWithoutImg(userInputs, weatherData) {
    try {
        // console.log(userInputs.fromcity)
        // if the user entered their origin city, update the UI using it, if not, remove From from html

        if (userInputs.fromcity == "") {
            document.querySelector(".from-text").classList.add("hide")
        }
        // remve hide class from the trip card

        dataSection.classList.remove("hide")

        /////// calculate the days left until the day of trip and the lenght of the trip

        const today = (Date.now()) / 1000;

        const depDateValue = depDate.value;
        const dep = (new Date(depDateValue).getTime()) / 1000;

        const retDateValue = retDate.value;
        const ret = (new Date(retDateValue).getTime()) / 1000;

        const daysLeft = Math.round((dep - today) / 86400);
        const tripDays = Math.round((ret - dep) / 86400);


        document.querySelector(".tripDays").innerHTML = tripDays;
        document.querySelector(".days-away").innerHTML = daysLeft;

        // dataSection.classList.remove("hide")

        // document.querySelector(".city-figure").classList.add("hide")
        document.querySelector(".city-image").setAttribute('src', "")
            // update the UI using the data 

        document.querySelector(".from-city").innerHTML = userInputs.fromcity
        document.querySelector(".to-city").innerHTML = userInputs.tocity
        document.querySelector(".date-text").innerHTML = userInputs.depDate
        document.querySelector(".date-text-2").innerHTML = userInputs.retDate
        document.querySelector(".temp").innerHTML = weatherData.tempreture
        document.querySelector(".weather").innerHTML = weatherData.description

        // save the trip data into an object

        const trip = {
                from: userInputs.fromcity,
                to: userInputs.tocity,
                depDate: userInputs.depDate,
                retDate: userInputs.retDate,
                temp: weatherData.tempreture,
                desc: weatherData.description
            }
            // smooth scrolling to trip data section
        dataSection.scrollIntoView({ behavior: 'smooth' });
        return trip;
    } catch (error) {
        console.log("Error in UpdateUserInterface: ", error)
    }
}


/////////////////////// POST to the server function //////////////////
async function postTripData(url = '', data = {}) {
    const request = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    console.log("Trips Data: ");
    try {
        const newData = await request.json();
        return newData;
    } catch (error) {
        console.log("Error in postData: ", error)
    }
}


/////////////Get data from the server//////////////
async function getTripsData(url) {
    const response = await fetch(url);
    try {
        const dataFromServer = await response.json();
        return dataFromServer;
    } catch (error) {
        console.log("Error in getTripsData: ", error);
    }
}
///////////////////add trip to server//////////////////////////////
async function addTrip(tripData) {
    /// post the trip data object to the server
    postTripData("http://localhost:8086/trip", tripData)
        .then(function(res) {
            // console.log(res)
            // show the trips data 
            showAllTrips()
        })

}

/////////////// show all trips obtained from the server //////////
async function showAllTrips() {
    /// get all the trips from the server
    getTripsData("http://localhost:8086/getTrips")
        .then(function(res) {
            console.log(res)
        })
}


export {
    handleSubmit,
    UpdateUserInterface,
    UpdateUserInterfaceWithoutImg,
    postTripData,
    getTripsData,
    addTrip,
    showAllTrips
}