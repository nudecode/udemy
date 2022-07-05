const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// fetch exchange rates and update DOM
function calculate() { 
    currency_one = currencyEl_one.value;
    currency_two = currencyEl_two.value;

    // const newRequest = new newRequest(`https://api.exchangerate-api.com/v6/latest/${currency_one}`, {
    //     method: 'GET',
    //     headers: reqHeaders,
    //     mode:  'no-cors',
    //     cache: 'default'
    // });
    // const reqHeaders = new Headers();
    // reqHeaders.append()

    // fetch (`https://api.exchangerate-api.com/v6/latest/${currency_one}`)
    // .then(res => res.json())
    // .then(data => { 
    //     //console.log(data);
    //     const rate = data.rates[currency_two];

    //     console.log(rate);

    //    rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

    //    amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    // })
    
    fetch (`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
    .then(res => res.json())
    .then(data => { 
        // console.log(data);
        const rate = data.rates[currency_two];

        // console.log(rate);

       rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

       amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    })
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});

calculate();

