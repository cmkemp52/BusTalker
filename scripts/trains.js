const trainDiv = document.querySelector("[data-train]");

const trainSelectForm = document.querySelector("trainSelectForm")
// const station = document.getElementById("station");
// const direction = document.getElementById("direction");
// const arrivalTime = document.getElementById("arrivalTime");
// const waitTime = document.getElementById("waitTime");

// const cityForm = document.querySelector("#cityForm");
// const input = document.querySelector(".input");
// const formButton = trainSelectForm.querySelector("button");

// formButton.addEventListener("click", function(e) {
//     e.preventDefault();
// //     const newLocation = input.value;
// //     getWeather(newLocation);
// //     console.log(newLocation);
// });



function addTrains(trains) {
    // filteredTrains = trains.filter(train => train.STATION === "CHAMBLEE STATION")
    // && train.LINE === "RED" && train.DIRECTION === "S")
        trainDiv.innerHTML = "<p><strong>Station</strong></p><p><strong>Line</strong></p><p><strong>Direction</strong></p><p><strong>Arrival Time</strong></p><p><strong>Wait Time</strong></p>"
        trainList =  trains.map(train => {

        stationLi = document.createElement("div");
        lineLi = document.createElement("div");
        directionLi = document.createElement("div");
        arrivalTimeLi = document.createElement("div");
        waitTimeLi = document.createElement("div");

   
        trainDiv.append(stationLi);
        trainDiv.append(lineLi);
        trainDiv.append(directionLi);
        trainDiv.append(arrivalTimeLi);
        trainDiv.append(waitTimeLi);

        stationLi.innerHTML = train.STATION;
        lineLi.innerHTML = train.LINE;
        directionLi.innerHTML = train.DIRECTION;
        arrivalTimeLi.innerHTML = train.NEXT_ARR;
        waitTimeLi.innerHTML = train.WAITING_TIME;
    
        lineLi.style.color = lineLi.innerHTML;
        
    });    
}

function getTrains() {
    const URL = `http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=38713de0-2f9d-4c15-a510-533e53718c3e`;
    get(URL).then(function(response) {
        addTrains(response);
    });
    
}

getTrains();

setInterval(function(){
    getTrains();
},5000);
