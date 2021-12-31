

    //set up indexedDB
    var db = new Dexie("MensastischINDB");
    // create table "canteensStore"
    db.version(1).stores({
        canteensStore: 'id,name,city,address,coordinates, distance',
        });
    // populate canteensStore
    getCanteens().then(canteens =>{
        canteens.forEach(canteen =>{
            db.canteensStore.put({
                id:canteen.id,
                name: canteen.name,
                city: canteen.city,
                address: canteen.address,
                coordinates: checkCoords(canteen.coordinates),
                distance: 999
            });
        })
    }).then(() => {
        return db.canteensStore;
    }).catch(err => {
        console.warn("Oops... " + err);
    });


//checkCoords
function checkCoords(data){
    if (data != null){
        return data;
    } else return [0,0];
}

//show canteen search results
async function showCanteens(str){
    const results = await findCanteens(str);
    let resultList = document.getElementById('searchResults');
    resultList.setAttribute('class','collection');
    resultList.innerHTML='';
    results.forEach(result =>{
        let entry = document.createElement('li');
        entry.setAttribute('class', 'collection-item');
        let icon = document.createElement('i');
        icon.setAttribute('class', 'material-icons');
        icon.innerHTML='send';
        let a = document.createElement('a');
        a.href='#!';
        a.setAttribute('class', 'secondary-content');
        let div = document.createElement('div');
        let name = document.createElement('span');
        name.setAttribute('class', 'title');
        name.innerText=result.name;
        let address = document.createElement('span');
        address.setAttribute('class', '');
        address.innerHTML='<br>'+result.address;
        div.appendChild(name);
        div.appendChild(address);
        a.appendChild(icon);
        div.appendChild(a);
        entry.appendChild(div);
        resultList.appendChild(entry);
    })

};


//find canteens in indb by string input
async function findCanteens(str) {
    await db.open();
    const result = await db.canteensStore.where('city').startsWithIgnoreCase(str).toArray();
    return result;
};


//returns JSON of all listed canteens
async function getCanteens() {
    const url = 'https://openmensa.org/api/v2/canteens';
    const response = await fetch(url);
    const canteens = await response.json();
    return canteens;
};


    
//get user's gps coordinates
function getUserLocation(){
    document.getElementById('msgGPS').innerHTML ='<div class="progress"><div class="indeterminate"></div></div>';
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(geo_success, geo_error, {
            enableHighAccuracy: false, 
            timeout: 1000*30, maximumAge: 
            1000*60*60});
    } else {
        document.getElementById('msgGPS').innerText = 'Please use a 21st century browser';
    }
};

//expand indexedDB, add column "distance"
async function addDistance(lat, lng){
    await db.open();
    await db.canteensStore
        .orderBy('name')
        .modify(canteen => {
        canteen.distance = getDistance(lat, lng, canteen.coordinates[0], canteen.coordinates[1]);
    });
};

//get x nearest Canteens
async function getNearestCanteens(int) {
    db.open().then(function(){
        return db.canteensStore.orderBy('distance').limit(int).toArray();
    }).then(function(canteensStore){
        postData('../mensa/locate', canteensStore);
        console.log(JSON.stringify(canteensStore));
    }).catch (Dexie.MissingAPIError, function (e) {
        log ("Couldn't find indexedDB API");
    }).catch ('SecurityError', function(e) {
      log ("SecurityError - This browser doesn't like indexedDB.");
    });
};

// post data
function postData(url,data){
    fetch(url, {method: 'POST',headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(data),
    }).then(response => response.json()
    ).then(data => {
    console.log('Success:', data);
    }).catch((error) => {
    console.error('Error:', error);
    });
};




//callback function if GPS coordinates available
async function geo_success(position){
    await addDistance(position.coords.latitude, position.coords.longitude);
    getNearestCanteens(10);
};

    
//callback function if getLocation throws error
function geo_error(err){
    const { code } = err;
    switch (code) {
        case GeolocationPositionError.TIMEOUT:
            document.getElementById('msgGPS').innerText = "timeout";
            break;
        case GeolocationPositionError.PERMISSION_DENIED:
            document.getElementById('msgGPS').innerText = "permission denied";
            break;
        case GeolocationPositionError.POSITION_UNAVAILABLE:
            document.getElementById('msgGPS').innerText = "position unavailable";
          break;
    }
};

// calculate distance between 2 coordinates, credits: http://jsfiddle.net/edgren/gAHJB/
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLng = deg2rad(lng2-lng1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c;
    return roundToTwo(distance);
  }
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}