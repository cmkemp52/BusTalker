const mymap = L.map('mapDiv').setView([33.75, -84.38], 10);
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