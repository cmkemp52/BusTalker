const trainDiv = document.querySelector("[data-train]");

const trainUpdateButton = document.querySelector(".button");
const stationSelect = document.querySelector(".stationSelect");
const URL = `http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=38713de0-2f9d-4c15-a510-533e53718c3e`;
// const station = document.getElementById("station");
// const direction = document.getElementById("direction");
// const arrivalTime = document.getElementById("arrivalTime");
// const waitTime = document.getElementById("waitTime");

// const cityForm = document.querySelector("#cityForm");
// const input = document.querySelector(".input");
// const formButton = trainSelectForm.querySelector("button");

trainUpdateButton.addEventListener("click", function(e) {
    e.preventDefault();
    getTrains();
});

function addTrains(trains) {
    // filteredTrains = trains.filter(train => train.STATION === "CHAMBLEE STATION")
    // && train.LINE === "RED" && train.DIRECTION === "S")
        trainDiv.innerHTML = "<p><strong>Station</strong></p><p><strong>Line</strong></p><p><strong>Dir.</strong></p><p id='arrivalTime'><strong>Arrival Time</strong></p><p><strong>Wait Time</strong></p>"
        let trainList =  trains.map(train => {

        let stationLi = document.createElement("div");
        let lineLi = document.createElement("div");
        let directionLi = document.createElement("div");
        let arrivalTimeLi = document.createElement("div");
        arrivalTimeLi.setAttribute('id', 'arrivalTime');
        let waitTimeLi = document.createElement("div");

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

function addStationList(trains) {
    stationSelect.innerHTML = "<option>All Stations</option>"
    let stationList = trains.map(train => {
        return train.STATION;
    });

    let filteredStationList = [...new Set(stationList)].sort();

    filteredStationList.forEach(station => {
        stationName = document.createElement("option");
        stationName.innerHTML = station;
        stationSelect.append(stationName);
    })
};

function getTrains() {
    get(URL).then(function(response) {
        addTrains(response);
        addStationList(response);
    });
    
}

stationSelect.onchange = (function() {
    // stationSelect.addEventListener("input", function(e) {
    //     // e.preventDefault();
        let stationValue = stationSelect.value;
        // console.log(stationValue);
        if (stationValue === 'All Stations') {
            return getTrains();
        };
        get(URL).then(function(response) {
            const filteredTrains = response.filter(train => train.STATION === stationValue);
            // console.log(filteredTrains);
            addTrains(filteredTrains);
        });
    });
// });

getTrains();

// setInterval(function(){
//     getTrains();
// },5000);
