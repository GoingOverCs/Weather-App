//FOR DOM MANIPULATION

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const clock = document.querySelector('.clock-time');

const updateUI = (data) => {

    console.log(data)
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //destructure properties
    const { cityDets, weather } = data;

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}, ${cityDets.AdministrativeArea.EnglishName}, ${cityDets.Country.EnglishName} </h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;F</span>
    </div>`
    
    //update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    
    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }

    //timeSrc as ternary operator
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc);

    // remove d-none from card
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    }; //when you have an object where the property and the value are the same name you can make it shorthand by just using one name. For example instead of cityDets:cityDets. you can just only say cityDets once and it will do the same thing

}

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim(); //trim method trims white space
    cityForm.reset(); //resets form fields after submit event

    //update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        // .then(data => console.log(data))
        .catch(err => console.log(err));
})

