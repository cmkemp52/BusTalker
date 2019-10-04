////////////////////////////////
//// Bus Map Functionality ////
//////////////////////////////

const mymap = L.map('mapDiv',{center: [33.75, -84.38], zoom: 12, minZoom:12, maxZoom:16, scrollWheelZoom: false});
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
            let busLate = 0;
            let busEarly = 0;
            let busOnTime = 0;
            for(bus in jsondata){
                if(jsondata[bus].ADHERENCE >0){
                    busLate++;
                }
                if(jsondata[bus].ADHERENCE <0){
                    busEarly++;
                }
                if(jsondata[bus].ADHERENCE ==0){
                    busOnTime++;
                }
                switch(jsondata[bus].DIRECTION){
                    case "Northbound":
                            mymap.eachLayer(function(tlayer){
                                if(tlayer._icon != undefined){
                                    if(tlayer._popup._content.includes(`Bus ID:${jsondata[bus].VEHICLE}`)){
                                        mymap.removeLayer(tlayer);
                                    }
                                }});
                            let nIcon = L.icon({iconUrl:"images/busnorth.png",iconSize:[50,50],iconAnchor:[25,25],popupAnchor:[0,-10]});
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
                            let sIcon = L.icon({iconUrl:"images/bussouth.png",iconSize:[50,50],iconAnchor:[25,25],popupAnchor:[0,-10]});
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
                            let eIcon = L.icon({iconUrl:"images/buseast.png",iconSize:[50,50],iconAnchor:[25,25],popupAnchor:[0,-10]});
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
                            let wIcon = L.icon({iconUrl:"images/buswest.png",iconSize:[50,50],iconAnchor:[25,25],popupAnchor:[0,-10]});
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
            busLatePercent = (busLate/(busLate+busEarly+busOnTime))*100
            busEarlyPercent = (busEarly/(busLate+busEarly+busOnTime))*100
            busOnTimePercent = (busOnTime/(busLate+busEarly+busOnTime))*100
            CanvasJS.addColorSet("martaColors",["#0092D0","#FDBE43","#FF7500"]);
            chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: false,
                colorSet: 'martaColors',
                backgroundColor: "#9E9C9C",
                title: {
                    text: "How late Marta is running"
                },
                data: [{
                    type: "pie",
                    startAngle: 240,
                    yValueFormatString: "##0.00\"%\"",
                    indexLabel: "{label} {y}",
                    dataPoints: [
                        {y: busLatePercent, label: "Late Buses"},
                        {y: busEarlyPercent, label: "Early Buses"},
                        {y: busOnTimePercent, label: "On Time Buses"},
                    ]
                }]
            });
            chart.render();
        })
        .catch(err=>console.log(err));
}

////////////////////////////////////
//// Twitter and Icon Resizing ////
//////////////////////////////////

$( window ).resize(function() {
    if($(window).width()>768){
        $(".navbar-brand").attr("src","images/bustalker.png");
        $(".twitter-timeline").remove();
        $("#tweets").prepend("<a class=\"twitter-timeline\" data-lang=\"en\" data-width=\"900\" data-height=\"420\" data-theme=\"dark\" data-link-color=\"#2B7BB9\" href=\"https://twitter.com/MARTASERVICE?ref_src=twsrc%5Etfw\">Tweets by MARTASERVICE</a> <script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>");
    }
    if($(window).width()<768){
        $(".navbar-brand").attr("src","images/bustalkersmall.png");
        $(".twitter-timeline").remove();
        $("#tweets").prepend("<a class=\"twitter-timeline\" data-lang=\"en\" data-width=\"900\" data-height=\"250\" data-theme=\"dark\" data-link-color=\"#2B7BB9\" href=\"https://twitter.com/MARTASERVICE?ref_src=twsrc%5Etfw\">Tweets by MARTASERVICE</a> <script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>");
    }
});


///////////////////////////////////
//// Weather App Functionality ////
//////////////////////////////////

function addTemp(temp) {
    const temperatureElement = document.createElement('p');
    temperatureElement.innerHTML = `<b>${temp.toFixed(0)} &#7506 F</b>`;
    temperatureElement.setAttribute('style', 'font-size: 40px; font-weight: bold;'); 
    timeAndTemp.append(temperatureElement);
}
        

function addSummary(summary) {
    const summaryElement = document.createElement('p');
    summaryElement.innerHTML = `${summary}`;
    summaryElement.setAttribute('style', 'font-weight: bold; font-size: 1rem;');
    iconStatus.append(summaryElement);
}

function addTime(time) {
    time = moment.unix(time).format('h:mm a');
    const timeElement = document.createElement('p');
    timeElement.innerHTML = `<b>NOW ${time}<b>`;
    timeElement.setAttribute('style', 'opacity: .5; font-size: 1rem;') 
    iconStatus.append(timeElement);
}

function addDate(date) {
    date = moment.unix(date).format('LL');
    const dateElement = document.createElement('p');
    dateElement.innerHTML = `${date}`;
    dateElement.setAttribute('style', 'text-decoration: underline');
    timeAndTemp.append(dateElement);
}
function addPrecipitation(precipitation) {
    const precipitationElement = document.createElement('p');
    precipitationElement.innerHTML = `Chance of Rain: ${precipitation} &#37;`;
    precipitationElement.setAttribute('style', 'opacity: .5; font-size: 1rem;') 
    timeAndTemp.append(precipitationElement);
}

function addIcon(icon) {
    // clear-day, clear-night, partly-cloudy-day,partly-cloudy-night,cloudy,rain,sleet,snow,wind,fog
    
    const iconElement = document.createElement('p');
    switch(icon) {
        case "clear-day":
            iconElement.innerHTML = `<img src="weatherIcons/sunny.png">`;
            iconStatus.append(iconElement);
          break;
        case "clear-night":
            iconElement.innerHTML = `<img src="weatherIcons/sunny.png">`;
            iconStatus.append(iconElement);
            break;
        case "partly-cloudy-day":
            iconElement.innerHTML = `<img src="weatherIcons/cloudy.png">`;
            iconStatus.append(iconElement);
          break;
        case "clear-partly-cloudy-night":
            iconElement.innerHTML = `<img src="weatherIcons/cloudy.png">`;
            iconStatus.append(iconElement);
          break;
        case "cloudy":
            iconElement.innerHTML = `<img src="weatherIcons/cloudy.png">`;
            iconStatus.append(iconElement);
          break;
        case "rain":
            iconElement.innerHTML = `<img src="weatherIcons/cloudyrain.png">`;
            iconStatus.append(iconElement);
          break;
        case "sleet":
            iconElement.innerHTML = `<img src="weatherIcons/snow.png">`;
            iconStatus.append(iconElement);
          break;
        case "snow":
            iconElement.innerHTML = `<img src="weatherIcons/snow.png">`;
            iconStatus.append(iconElement);
          break;
        case "wind":
            iconElement.innerHTML = `<img src="weatherIcons/storm.png">`;
            iconStatus.append(iconElement);
          break;
        case "fog":
            iconElement.innerHTML = `<img src="images/cloudy.png">`;
            iconStatus.append(iconElement);
          break;
        default:
            iconElement.innerHTML = `<img src="images/sun.png">`;
            iconStatus.append(iconElement);
      }
}

function getWeather(icon) {
    const URL = `https://api.darksky.net/forecast/1010d61071e3e5e3e99eed847a82272c/33.7490,-84.3880`;

    get(URL).then(function(response) {
        // addTime(response.currently.time);
        // addDate(response.currently.time);
        addTemp(response.currently.temperature);
        addPrecipitation(response.currently.precipProbability);
        addIcon(response.minutely.icon);
        addSummary(response.hourly.summary);
        console.log(response);
    });
}
getWeather();

////////////////////////////////
//// Smooth Scroll on Divs ////
//////////////////////////////

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});