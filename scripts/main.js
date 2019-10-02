function addTemp(temp) {
    const temperatureElement = document.createElement('p');
    temperatureElement.innerHTML = `Temperature: ${temp.toFixed(0)} &#7506;`;
    weatherDiv.append(temperatureElement)
}

function addSummary(summary) {
    const summaryElement = document.createElement('p');
    summaryElement.innerHTML = `${summary}`;
    weatherDiv.append(summaryElement);
}

function addTime(time) {
    time = moment.unix(time).format("HH:MM");
    const timeElement = document.createElement('p');
    timeElement.innerHTML = `${time}`; 
    weatherDiv.append(timeElement);
}

function addPrecipitation(precipitation) {
    const precipitationElement = document.createElement('p');
    precipitationElement.innerHTML = `Precipitation probability: ${precipitation}`;
    weatherDiv.append(precipitationElement);
}

function addIcon(icon) {
    //// Will be switch statement//////
    
    const iconElement = document.createElement('p');
    if (icon == 'clear-day') {
    iconElement.innerHTML = `<src="images/sun.png">`;
    weatherDiv.append(iconElement);
    console.log('worked')
    }
    if(icon == "partly-cloudy-day"){
    iconElement.innerHTML = `<src="images/cloudy.png">`;
    weatherDiv.append(iconElement);
    console.log('worked')
    }
    if(icon == "fog"){
    iconElement.innerHTML = `src="images/foggy.png">`;
    weatherDiv.append(iconElement);
    console.log('worked')
    }
    if(icon == "partly-cloudy-night") {
    iconElement.innerHTML = `<img src="images/sun-weather.gif" height="100px" width=“200px" class='sun'>`;
    weatherDiv.append(iconElement);
    console.log('worked')
    }
    else {
        console.log('error')
    }
}

function getWeather(icon) {
    const URL = `https://api.darksky.net/forecast/1010d61071e3e5e3e99eed847a82272c/33.7490,-84.3880`;

    get(URL).then(function(response) {
        console.log(response.currently.icon);
        console.log(response.currently.time);
        console.log(response)
        addIcon(response.minutely.icon);
        addTemp(response.currently.temperature);
        addSummary(response.hourly.summary);
        addTime(response.currently.time);
        addPrecipitation(response.currently.precipProbability);
    });
}
getWeather()

/// clear-day, clear-night, partly-cloudy-day,partly-cloudy-night,cloudy,rain,sleet,snow,wind,fog