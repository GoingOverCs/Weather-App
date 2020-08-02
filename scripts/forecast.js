//FOR INTERACTING WITH APIS

const key = 'fOX8RLuLJy3bSAGfnOZP9A4jmR8ZSYGX'

//get weather info
const getWeather = async (code) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${code}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}

//get city info to insert into getWeather function
const getCity = async (city) => {
    
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${key}&q=${city}`;
    
    const response = await fetch(base + query);
    const data = await response.json();

    return (data[0]);
};

//testing getCity and getWeather
// getCity('tickhill').then(data => {
//     return getWeather(data.Key);
// }).then(data =>{
//     console.log(data);
// }).catch (err => console.log(err));


