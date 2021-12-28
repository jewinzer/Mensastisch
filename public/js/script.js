var elems = document.querySelectorAll('.dropdown-trigger');
var instances = M.Dropdown.init(elems, {
    coverTrigger: false,
    hover: true,
});
/*
//returns JSON of nearby canteens; @params (latitude, longitude, distance)
async function getCanteens(lat, lng, dist) {
    const url = 'https://openmensa.org/api/v2/canteens?near[lat]=' + lat + '&near[lng]=' + lng + '&near[dist]=' + dist;
    const response = await fetch(url);
    const canteens = await response.json();
    let select = document.getElementById('selection');
    select.innerHTML = '';
    canteens.forEach(canteen => {
        let entry = document.createElement('option');
        entry.setAttribute('value', canteen.id);
        entry.textContent = canteen.name + ', ' + canteen.address;
        select.appendChild(entry);
    });
    return canteens;
}

function updateCanteens() {
    let lat = document.getElementsByName("lat")[0].value / 1000000;
    let lng = document.getElementsByName("lng")[0].value / 1000000;
    const dist = document.getElementsByName("dist")[0].value;
    lat = lat.toFixed(6);
    lng = lng.toFixed(6);
    getCanteens(lat, lng, dist);
}

const searchBtn = document.querySelector('#search');
searchBtn.addEventListener('click', function() {
    updateCanteens();
});

let selection = document.querySelector('#selection');
selection.addEventListener('change', function() {
    var today = dateToISO(new Date());
    console.log(today);
    document.getElementById('canteen').innerText = 'Please pick a date'
    appendDatePicker(this.value);
})

async function getMeals(id, date) {
    const url = 'https://openmensa.org/api/v2/canteens/' + id + '/days/' + date + '/meals';
    const response = await fetch(url);
    const meals = await response.json();
    let container = document.getElementById('menu');
    container.innerHTML = '';
    meals.forEach(meal => {
        let title = document.createElement('h3');
        let list = document.createElement('ul');
        list.class = "list-group-item";
        let category = document.createElement('li');
        let rates = document.createElement('li');
        let notes = document.createElement('li');
        title.innerText = meal.name;
        category.innerText = meal.category;
        rates.innerText = meal.prices.students + '€ | ' + meal.prices.employees + '€ | ' + meal.prices.others + '€';
        notes.innerText = meal.notes.toString();
        container.appendChild(title);
        list.appendChild(category);
        list.appendChild(rates);
        list.appendChild(notes);
        container.appendChild(list);
        document.body.appendChild(container);
    });
}

function dateToISO(date) {
    const year = date.getFullYear();
    let dateString = year + '-';
    dateString += date.getMonth() + 1;
    dateString += '-' + date.getDate();
    return dateString;
}

function appendDatePicker(id) {
    let parent = document.getElementById('datepicker');
    parent.innerHTML = '';
    let picker = document.createElement('input');
    picker.type = 'date';
    picker.id = 'picker';
    picker.name = 'picker';
    picker.setAttribute('onchange', 'getMeals(' + id + ',this.value)');
    parent.appendChild(picker);
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
});*/