///////////////////////////////
//// URL Fetch With Proxy ////
/////////////////////////////

function get(url) {
    return fetch('https://my-little-cors-proxy.herokuapp.com/' + url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        return data;
    });
}
