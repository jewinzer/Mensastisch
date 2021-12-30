var db = new Dexie("MensastischINDB");
 
// create DB with table "canteensStore"
db.version(1).stores({
    canteensStore: 'id,name,city,address,coordinates, distance',
    });

// populate canteensStore
getCanteens().then(canteens =>{
    canteens.forEach(canteen =>{
        db.canteensStore.put({
            id:canteen.id, name: canteen.name, city: canteen.city, address: canteen.address, coordinates: canteen.coordinates, distance: 0
        });
    })
}).then(() => {
    return db.canteensStore;
}).catch(err => {
    console.warn("Oops... " + err);
});

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

}


//find canteens in indb by string input
async function findCanteens(str) {
    const result = await db.canteensStore.where('city').startsWithIgnoreCase(str).toArray();
    return result;
};

//handle allowGPS checkbox events
document.getElementById('allowGPS').addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    document.location = '../mensa/locate';
  } else {
    document.location = '../mensa/search';
  }
});



//returns JSON of all listed canteens
async function getCanteens() {
    const url = 'https://openmensa.org/api/v2/canteens';
    const response = await fetch(url);
    const canteens = await response.json();
    return canteens;
};

// update indb with distances from current geolocation
function addDistance() {
    db.canteensStore.toCollection().modify(canteen => {
        canteen.distance = canteen.coordinates[1]; // ()
    });
    };
    
    
    //get user's gps coordinates
    function getUserLocation(){
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(geo_success, geo_error, {
                enableHighAccuracy: false, 
                timeout: 1000*30, maximumAge: 
                1000*60*60});
        } else {
            document.getElementById('msgGPS').innerText = 'Please use a 21st century browser';
        }
    
    }
    //callback function if GPS coordinates success
    function geo_success(position){
        document.getElementById('msgGPS').innerText = 'lat: '+position.coords.latitude+'; lng: '+position.coords.longitude;
    
    };
    
    //callback function if GPS coordinates fail
    function geo_error(err){
        //document.getElementById('allowGPS').checked = false;
      // Display error based on the error code.
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

    // update indb with distances from current geolocation
function addDistance() {
    var db = new Dexie("MensastischINDB");
    db.canteensStore.toCollection().modify(canteen => {
        canteen.distance = canteen.coordinates[1]; // ()
    });
    };
