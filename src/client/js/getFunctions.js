//////////////////////////GET functions/////////////////////////////

// getGeoData function
async function getGeoData(geonames_URL, toCity, geonames_key) {
    const response = await fetch(geonames_URL + toCity + "&username=" + geonames_key);
    try {
        const dataFromApi = await response.json();
        return dataFromApi;
    } catch (error) {
        console.log("Error in getGeoData: ", error);
    }
}

// getWeatherData function
async function getWeatherData(Weatherbit_URL, weatherbit_key, cityLat, cityLong) {
    const response = await fetch(Weatherbit_URL + '?lat=' + cityLat + '&lon=' + cityLong + '&key=' + weatherbit_key);
    try {
        const dataFromApi = await response.json();
        return dataFromApi;
    } catch (error) {
        console.log("Error in getWeatherData: ", error);
    }
}


// getPixData function
async function getPixData(pixabay_URL, pixabay_key, city) {
    const response = await fetch(pixabay_URL + pixabay_key + "&q=" + city + "+city&image_type=photo");
    try {
        const dataFromApi = await response.json();
        return dataFromApi;
    } catch (error) {
        console.log("Error in getPixData: ", error);
    }
}

export { getGeoData, getWeatherData, getPixData }