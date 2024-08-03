console.log("start");
//step : 1 : vars
const puzzle = document.getElementById("puzzle");

const moves = document.getElementById("moves");

const times = document.getElementById("times");

const btn = document.getElementById("btn");

let nbrMovers = 0;
let totalTimes = 0;
let indexInterval;

//step : 2 : arry the nbers

//const array = Array.from(Array(15),(_,x)=>x+1).concat('');
const numbers = [...Array(15).keys()].map((x) => x + 1).concat("");

const numbersWin = [...numbers];

//step : 3 : function for shuffle Array numbers

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = 0; i < newArray.length - 1; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

//step : 4 : function for initializing game

function initGame() {
  nbrMovers = 0;
  totalTimes = 0;
  moves.textContent = nbrMovers;
  times.textContent = "00:00";

  const shuffled = shuffleArray(numbers);
  puzzle.innerHTML = "";
  shuffled.forEach((num) => {
    const box = document.createElement("span");
    box.className = "box";
    box.textContent = num;
    puzzle.appendChild(box);
  });

  if (indexInterval) {
    clearInterval(indexInterval);
  }
  startTimer();
}

function startTimer() {
  indexInterval = setInterval(() => {
    totalTimes++;
    const minutes = Math.floor(totalTimes / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(totalTimes % 60)
      .toString()
      .padStart(2, "0");
    times.textContent = `${minutes}:${seconds}`;
  }, 1000);
}
// start game after click
btn.addEventListener("click", initGame);
// start game after rellod page
initGame();

//step : 5 : moves after click in class box
puzzle.addEventListener("click", function (e) {
  if (e.target.classList.contains("box")) {
    const emptyBox = puzzle.querySelector(".box:empty");
    const allBox = Array.from(puzzle.querySelectorAll(".box"));
    const indexBoxEmpty = allBox.indexOf(emptyBox);
    const clickBox = e.target;
    const indexClick = allBox.indexOf(clickBox);

    //console.log(indexBoxEmpty);

    if (
      Math.abs(indexClick - indexBoxEmpty) === 1 && Math.floor(indexClick/4)===Math.floor(indexBoxEmpty/4)||
      Math.abs(indexClick - indexBoxEmpty) === 4
  ) {
    [emptyBox.textContent,clickBox.textContent] = [clickBox.textContent,emptyBox.textContent];
    nbrMovers++;
    moves.textContent=nbrMovers;


  }
  
  }
});

// // Get DOM elements
// const puzzle = document.getElementById('puzzle');
// const btn = document.getElementById('btn');
// const moveCounter = document.getElementById('move');
// const timeCounter = document.getElementById('times');

// let moves = 0;
// let time = 0;
// let timerInterval;

// // Define the winning array
// const winningArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];

// // Create array of numbers 1-15 and empty string
// const numbers = [...winningArray];

// // Fisher-Yates shuffle algorithm
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// // Initialize the game
// function initGame() {
//     moves = 0;
//     time = 0;
//     moveCounter.textContent = moves;
//     timeCounter.textContent = '00:00';
//     clearInterval(timerInterval);

//     const shuffled = shuffleArray([...numbers]);
//     puzzle.innerHTML = '';
//     shuffled.forEach(num => {
//         const box = document.createElement('span');
//         box.className = 'box';
//         box.textContent = num;
//         puzzle.appendChild(box);
//     });

//     startTimer();
// }

// // Start the timer
// function startTimer() {
//     timerInterval = setInterval(() => {
//         time++;
//         const minutes = Math.floor(time / 60).toString().padStart(2, '0');
//         const seconds = (time % 60).toString().padStart(2, '0');
//         timeCounter.textContent = `${minutes}:${seconds}`;
//     }, 1000);
// }

// // Check if the puzzle is solved
// function checkWin() {
//     const currentOrder = Array.from(puzzle.children).map(box => box.textContent === "" ? "" : parseInt(box.textContent));
//     return JSON.stringify(currentOrder) === JSON.stringify(winningArray);
// }

// // Handle box click
// puzzle.addEventListener('click', (e) => {
//     if (e.target.classList.contains('box')) {
//         const emptyBox = puzzle.querySelector('.box:empty');
//         const clickedBox = e.target;
//         const emptyIndex = Array.from(puzzle.children).indexOf(emptyBox);
//         const clickedIndex = Array.from(puzzle.children).indexOf(clickedBox);

//         if (
//             (Math.abs(emptyIndex - clickedIndex) === 1 && Math.floor(emptyIndex / 4) === Math.floor(clickedIndex / 4)) ||
//             Math.abs(emptyIndex - clickedIndex) === 4
//         ) {
//             [emptyBox.textContent, clickedBox.textContent] = [clickedBox.textContent, emptyBox.textContent];
//             moves++;
//             moveCounter.textContent = moves;

//             if (checkWin()) {
//                 clearInterval(timerInterval);
//                 alert(`Congratulations! You solved the puzzle in ${moves} moves and ${timeCounter.textContent} time.`);
//             }
//         }
//     }
// });

// // Initialize game on button click
// btn.addEventListener('click', initGame);

// // Initialize game on page load
// initGame();
