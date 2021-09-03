import axios from "axios";

const key = 'vmHNMA96eGz649cXs2L9mhrsPgRVNupV';

const getCity = async city => {

    try {
        const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        const query = `?apikey=${key}&q=${city}`;

        const data = await (await axios.get(base + query)).data;

        return data[0];
    } catch (e) {
        console.error(e);
    }

};

const getWeather = async id => {
    
    try {
        const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
        const query = `${id}?apikey=${key}`;

        const data = await (await axios.get(base + query)).data;

        return data[0];
    } catch (e) {
        console.error(e);
    }

};

const getFiveDays = async id => {

    try {
        const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
        const query = `${id}?apikey=${key}&metric=true`;

        const data = await (await axios.get(base + query)).data;

        return data;
    } catch (e) {
        console.error(e);
    }

};

const getInfo = async city => {

    try {
        const cityDets = await getCity(city);

        if (cityDets === null || cityDets === undefined) {
            return;
        }

        const weatherDets = await getWeather(cityDets.Key);
        const fiveDaysDets = await getFiveDays(cityDets.Key);

        return { cityDets, weatherDets, fiveDaysDets };
    } catch (e) {
        console.error(e);
    }

};

export default getInfo;