
// declared constent variables at the top of page. These variables will not change. 
const container = document.querySelector('.container'); 
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// set variable to ticketPrice. This variable will update based on selection, so needs to be declared as let rather than const.
let ticketPrice = +movieSelect.value; // or you can use parse 

// Save selected Movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); // const selectedSeats will return a node list
    
    //copy the selected seats into array
    // Map through array
    // return a new array of indexes

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat)); 
// using the spread operator, will copy the array to other array
// because we are only returning a single return one expression the return key word is not required as well as the curly braces. Otherwise it will be writen
// const seatsIndex = [...selectedSeats].map((seat) => {
//    return [...seats].indexOf(seat)
//}); 

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // because seatsIndex is an array you need to wrap it in a JSON.stringify
    
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    
}

// Get data from localstorage and populate UI

function populateUI () {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); // need to be parsed back into an array bcause stringified it when setting localstaorage in updatedSelectedCount()

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) { // checking if greater than negitive 1 because if there is nothing in the arrary it will return negitive 1
                seat.classList.add('selected');
            }
        })

    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex; // setting the movie selected to its index
    }
}



// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
   setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount(); // call to selected count function
})

// Seat selected click event
container.addEventListener('click', (e) => { // either and arrow => function or function container.addEventListner('click', function (e){})
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount(); // call to function
    }

});

// intial count and total set
updateSelectedCount(); // call to function


