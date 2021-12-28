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

//find canteens in indb by string input
async function findCanteens(str) {
    const result = await db.canteensStore.where('name').startsWithIgnoreCase(str).toArray();
    return result;
};

//returns JSON of all listed canteens
async function getCanteens() {
    const url = 'https://openmensa.org/api/v2/canteens';
    const response = await fetch(url);
    const canteens = await response.json();
    return canteens;
};