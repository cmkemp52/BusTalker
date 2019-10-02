const mymap = L.map('mapDiv').setView([33.75, -84.38],12);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY21rZW1wNTIiLCJhIjoiY2sxN3czcWZ0MWw4aDNicWQ5ZGk3ZGRiciJ9.TmrrAvuGokXxLMhoa96krg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
}).addTo(mymap);


updateMap();
setInterval(function(){
    updateMap();
},5000);


function updateMap(){
    fetch("http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus")
        .then(data=>data.json())
        .then(function(jsondata){
            for(bus in jsondata){
                switch(jsondata[bus].DIRECTION){
                    case "Northbound":
                            mymap.eachLayer(function(tlayer){
                                if(tlayer._icon != undefined){
                                    if(tlayer._popup._content.includes(`Bus ID:${jsondata[bus].VEHICLE}`)){
                                        mymap.removeLayer(tlayer);
                                    }
                                }});
                            let nIcon = L.icon({iconUrl:"images/busnorth.png",iconSize:[50,50],iconAnchor:[0,0],popupAnchor:[25,10]});
                            marker = L.marker([jsondata[bus].LATITUDE, jsondata[bus].LONGITUDE],{icon:nIcon}).addTo(mymap);
                            if(jsondata[bus].ADHERENCE >0){
                                marker.bindPopup(`<b>Bus Rt: ${jsondata[bus].ROUTE} Bus ID:${jsondata[bus].VEHICLE}</b><br> Currently ${jsondata[bus].ADHERENCE} minute\(s\) ahead of schedule`);
                            }
                            if(jsondata[bus].ADHERENCE <0){
                                marker.bindPopup(`<b>Bus Rt: ${jsondata[bus].ROUTE} Bus ID:${jsondata[bus].VEHICLE}</b><br> Currently ${Math.abs(jsondata[bus].ADHERENCE)} minute\(s\) behind schedule`);
                            }
                            if(jsondata[bus].ADHERENCE ==0){
                                marker.bindPopup(`<b>Bus Rt: ${jsondata[bus].ROUTE} Bus ID:${jsondata[bus].VEHICLE}</b><br> Currently on schedule`);
                            }
                            break;
                    case "Southbound":
                            mymap.eachLayer(function(tlayer){
                                if(tlayer._icon != undefined){
                                    if(tlayer._popup._content.includes(`Bus ID:${jsondata[bus].VEHICLE}`)){
                                        mymap.removeLayer(tlayer);
                                    }
                            }});
                            let sIcon = L.icon({iconUrl:"images/bussouth.png",iconSize:[50,50],iconAnchor:[0,0],popupAnchor:[25,10]});
                            marker = L.marker([jsondata[bus].LATITUDE, jsondata[bus].LONGITUDE],{icon:sIcon}).addTo(mymap);
                            if(jsondata[bus].ADHERENCE >0){
                                marker.bindPopup(`<b>Bus Rt: ${jsondata[bus].ROUTE} Bus ID:${jsondata[bus].VEHICLE}</b><br> Currently ${jsondata[bus].ADHERENCE} minute\(s\) ahead of schedule`);
                            }
                            if(jsondata[bus].ADHERENCE <0){
                                marker.bindPopup(`<b>Bus Rt: ${jsondata[bus].ROUTE} Bus ID:${jsondata[bus].VEHICLE}</b><br> Currently ${Math.abs(jsondata[bus].ADHERENCE)} minute\(s\) behind schedule`);
                            }
                            if(jsondata[bus].ADHERENCE ==0){
                                marker.bindPopup(`<b>Bus Rt: ${jsondata[bus].ROUTE} Bus ID:${jsondata[bus].VEHICLE}</b><br> Currently on schedule`);
                            }
                            break;
                    case "Eastbound":
                            mymap.eachLayer(function(tlayer){
                                if(tlayer._icon != undefined){
                                    if(tlayer._popup._content.includes(`Bus ID:${jsondata[bus].VEHICLE}`)){
                                        mymap.removeLayer(tlayer);
                                    }
                            }});
                            let eIcon = L.icon({iconUrl:"images/buseast.png",iconSize:[50,50],iconAnchor:[0,0],popupAnchor:[25,10]});
                            marker = L.marker([jsondata[bus].LATITUDE, jsondata[bus].LONGITUDE],{icon:eIcon}).addTo(mymap);
                            if(jsondata[bus].ADHERENCE >0){
                                marker.bindPopup(`<b>Bus Rt: ${jsondata[bus].ROUTE} Bus ID:${jsondata[bus].VEHICLE}</b><br> Currently ${jsondata[bus].ADHERENCE} minute\(s\) ahead of schedule`);
                            }
                            if(jsondata[bus].ADHERENCE <0){
                                marker.bindPopup(`<b>Bus Rt: ${jsondata[bus].ROUTE} Bus ID:${jsondata[bus].VEHICLE}</b><br> Currently ${Math.abs(jsondata[bus].ADHERENCE)} minute\(s\) behind schedule`);
                            }
                            if(jsondata[bus].ADHERENCE ==0){
                                marker.bindPopup(`<b>Bus Rt: ${jsondata[bus].ROUTE} Bus ID:${jsondata[bus].VEHICLE}</b><br> Currently on schedule`);
                            }
                            break;
                    case "Westbound":
                            mymap.eachLayer(function(tlayer){
                                if(tlayer._icon != undefined){
                                    if(tlayer._popup._content.includes(`Bus ID:${jsondata[bus].VEHICLE}`)){
                                        mymap.removeLayer(tlayer);
                                    }
                            }});
                            let wIcon = L.icon({iconUrl:"images/buswest.png",iconSize:[50,50],iconAnchor:[0,0],popupAnchor:[25,10]});
                            marker = L.marker([jsondata[bus].LATITUDE, jsondata[bus].LONGITUDE],{icon:wIcon}).addTo(mymap);
                            if(jsondata[bus].ADHERENCE >0){
                                marker.bindPopup(`<b>Bus Rt: ${jsondata[bus].ROUTE} Bus ID:${jsondata[bus].VEHICLE}</b><br> Currently ${jsondata[bus].ADHERENCE} minute\(s\) ahead of schedule`);
                            }
                            if(jsondata[bus].ADHERENCE <0){
                                marker.bindPopup(`<b>Bus Rt: ${jsondata[bus].ROUTE} Bus ID:${jsondata[bus].VEHICLE}</b><br> Currently ${Math.abs(jsondata[bus].ADHERENCE)} minute\(s\) behind schedule`);
                            }
                            if(jsondata[bus].ADHERENCE ==0){
                                marker.bindPopup(`<b>Bus Rt: ${jsondata[bus].ROUTE} Bus ID:${jsondata[bus].VEHICLE}</b><br> Currently on schedule`);
                            }
                            break;
                }
            }
        })
        .catch(err=>console.log(err));
}
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
    time = moment.unix(time).format('h:mm a');
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
    iconElement.innerHTML = `<img src="images/sun.png">`;
    weatherDiv.append(iconElement);
    console.log('worked')
    }
    if(icon == "partly-cloudy-day"){
    iconElement.innerHTML = `<img src="images/cloudy.png">`;
    weatherDiv.append(iconElement);
    console.log('worked')
    }
    if(icon == "fog"){
    iconElement.innerHTML = `<img src="images/foggy.png">`;
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
