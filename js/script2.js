var myData;
var widget = document.getElementsByClassName('widget')[0];
var index = 0;


newData('http://marsweather.ingenology.com/v1/archive/?format=jsonp&callback=myCallback');

function myCallback(data) {
    document.getElementsByClassName('loader')[0].remove();
    myData = data;
    display(myData, index);
}


function display(data, index) {
    let newDiv = document.createElement('div')
    newDiv.innerHTML = `THE WEATHER ON MARS FOR ${myData.results[index].terrestrial_date}:`;
    widget.appendChild(newDiv);
    newDiv = document.createElement('div')
    newDiv.innerHTML = `${(myData.results[index].max_temp+myData.results[index].min_temp)/2}&#8451;`;
    newDiv.style.fontSize = '100px';
    widget.appendChild(newDiv);
    newDiv = document.createElement('div')
    if (myData.results[index].wind_speed === null) {
        newDiv.innerHTML = `Wind speed: --`;
    } else {
        newDiv.innerHTML = `Wind speed: ${myData.results[index].wind_speed}`;
    }
    widget.appendChild(newDiv);
    newDiv = document.createElement('div')
    newDiv.innerHTML = `Wind direction: ${myData.results[index].wind_direction}`;
    widget.appendChild(newDiv);
    let newButton = document.createElement('button');
    newButton.innerHTML = 'Previous';
    widget.appendChild(newButton);
    newButton.addEventListener('click', previous);
    newButton = document.createElement('button');
    newButton.innerHTML = 'Next';
    widget.appendChild(newButton);
    newButton.addEventListener('click', next);
}

function previous() {
    if (index === myData.results.length - 1 && myData.next != null) {
        newData(myData.next);
        index = 0;
    } else {
        index++;
        while (widget.hasChildNodes()) {
            widget.removeChild(widget.lastChild);
        }
        display(myData, index);
    }
}

function next() {
    if (index === 0 && myData.previous != null) {
        newData(myData.previous);
        index = myData.results.length - 1;
    } else if (index === 0 && myData.previous === null) {
        alert('No more');
    } else {
        index--;
        while (widget.hasChildNodes()) {
            widget.removeChild(widget.lastChild);
        }
        display(myData, index);
    }
}

function newData(url) {
    while (widget.hasChildNodes()) {
        widget.removeChild(widget.lastChild);
    }
    let newDiv = document.createElement('div')
    newDiv.classList.add('loader');
    widget.appendChild(newDiv);
    let script = document.createElement("script");
    script.setAttribute("src", url);
    script.onerror = function() {
        document.getElementsByClassName('loader')[0].remove();
        let newDiv = document.createElement('div')
        newDiv.innerHTML = 'Could not load data';
        newDiv.style.marginTop = '170px';
        widget.appendChild(newDiv);
    }
    if (document.body.getElementsByTagName('script')[1]) {
        document.body.getElementsByTagName('script')[1].remove();
    }
    document.body.appendChild(script);
}