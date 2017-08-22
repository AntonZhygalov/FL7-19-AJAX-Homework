// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "text/plain");
// myHeaders.append("Content-Length", content.length.toString());
// var myInit = {method: 'GET',
// headers: };
// var someA =  {'https://cors-anywhere.herokuapp.com/'+ mode: 'no-cors'};
// var header = new Headers({
//     'Access-Control-Allow-Origin':'*',
//     'Content-Type': 'text/html'
// });
// var options = {method: 'GET', mode: 'no-corse', headers: header};
fetch('https://marsweather.ingenology.com/v1/archive/?format=json').then(function(response) {
  return response.json();
}).then(function(returnedValue) {
  console.log(returnedValue);
    // ...
}).catch(function(err) {
    console.log(err);
});