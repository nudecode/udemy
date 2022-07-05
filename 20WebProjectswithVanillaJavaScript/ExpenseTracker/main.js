const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     {id: 1, text: 'flowers', amount: -20.00},
//     {id: 2, text: 'salary', amount: 300.00},
//     {id: 3, text: 'Book', amount: -10.00},
//     {id: 4, text: 'Camera', amount: 150.00}
// ];

const localStroageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStroageTransactions : [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a item and amount'); // add alert to UI later
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

    text.value = '';
    amount.value = '';
    }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add tranactios to DOM list
function addTransactionDOM(transaction) {
    //Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}
        </span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})"><i class="far fa-trash-alt"></i></button>
    `;

    list.appendChild(item);
}

// update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// Init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

// remove tranasction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


// init app (initiate app)
init();

form.addEventListener('submit', addTransaction);