const trainDiv = document.querySelector("[data-train]");

const trainSelectForm = document.querySelector("trainSelectForm")
// const station = document.getElementById("station");
// const direction = document.getElementById("direction");
// const arrivalTime = document.getElementById("arrivalTime");
// const waitTime = document.getElementById("waitTime");

// const cityForm = document.querySelector("#cityForm");
// const input = document.querySelector(".input");
// const formButton = cityForm.querySelector("button");

// formButton.addEventListener("click", function(e) {
//     e.preventDefault();
//     const newLocation = input.value;
//     getWeather(newLocation);
//     console.log(newLocation);
// });

function addTrains(trains) {
    // filteredTrains = trains.filter(train => train.LINE === "RED" && train.DIRECTION === "S")
    trainList =  trains.map(train => {

        stationLi = document.createElement("div");
        lineLi = document.createElement("div");
        directionLi = document.createElement("div");
        arrivalTimeLi = document.createElement("div");
        waitTimeLi = document.createElement("div");
        stationLi.innerHTML = train.STATION;
        lineLi.innerHTML = train.LINE;
        directionLi.innerHTML = train.DIRECTION;
        arrivalTimeLi.innerHTML = train.NEXT_ARR;
        waitTimeLi.innerHTML = train.WAITING_TIME;

        lineLi.style.color = lineLi.innerHTML

        trainDiv.append(stationLi);
        trainDiv.append(lineLi);
        trainDiv.append(directionLi);
        trainDiv.append(arrivalTimeLi);
        trainDiv.append(waitTimeLi);
    });    
}

// function addMap(lat, lon) {
//     const mapUrl = `http://maps.google.com/maps?q=${lat},${lon}&output=embed`;
//     // add an <iframe> element with the src = mapURL
//     const iframe = document.createElement("iframe");
//     iframe.src = mapUrl;
//     weatherDiv.append(iframe);
// }

// function readableDate(unixDate) {
//     // Use moment.js to convert Unix Date to readable Date
//     return moment.unix(unixDate).format('MMMM Do YYYY, h:mm:ss a');
// }

function getTrains() {
    const URL = `http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=38713de0-2f9d-4c15-a510-533e53718c3e`;
    get(URL).then(function(response) {
        addTrains(response);
    });
    
}

getTrains();
