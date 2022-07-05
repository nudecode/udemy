const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

// Aff new obj to data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    // clear the main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// Format number as currency
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Double all users money

function doubleMoney() {
    data = data.map((user) => {
        return {...user, money: user.money * 2}
    });
    updateDOM();
}

// Short users by richest (Array.prototype.sort MDN web docs)

function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// show millionaires (Array.prototype.filter MDN web docs)

function getMillionaires() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

// calculate wealth (Array.prototype.reduce MDN web docs)

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3> Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

// Event Linsteners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', getMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
