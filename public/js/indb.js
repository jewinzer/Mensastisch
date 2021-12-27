var db = new Dexie("MensastischINDB");
  
// DB with table "friends" with primary key "id" and
// indexes on properties "name" and "age"
db.version(1).stores({
    canteensStore: 'id,name,city,address,coordinates',
    });

// populate canteensStore
getCanteens().then(canteens =>{
    canteens.forEach(canteen =>{
        db.canteensStore.put({id:canteen.id, name: canteen.name, city: canteen.city, address: canteen.address, coordinates: canteen.coordinates});
    })
}).then(() => {
    return db.canteensStore;
}).catch(err => {
    console.warn("Oops... " + err);
});
 

//returns JSON of all listet canteens
async function getCanteens() {
    const url = 'https://openmensa.org/api/v2/canteens';
    const response = await fetch(url);
    const canteens = await response.json();
    return canteens;
}