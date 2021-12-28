var db = new Dexie("MensastischINDB");
  
// create DB with table "canteensStore"
db.version(1).stores({
    canteensStore: 'id,name,city,address,coordinates',
    });

// populate canteensStore
getCanteens().then(canteens =>{
    canteens.forEach(canteen =>{
        db.canteensStore.put({
            id:canteen.id, name: canteen.name, city: canteen.city, address: canteen.address, coordinates: canteen.coordinates
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
        div.innerText=result.name;
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

//returns JSON of all listed canteens
async function getCanteens() {
    const url = 'https://openmensa.org/api/v2/canteens';
    const response = await fetch(url);
    const canteens = await response.json();
    return canteens;
};