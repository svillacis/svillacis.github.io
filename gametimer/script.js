// Get all the player buttons
const playerButtons = document.querySelectorAll('.player-btn');

// Set up a variable to keep track of the current active player
let activePlayer = 0;

// Set up a variable to keep track of the current timer interval
let timerInterval;

// Function to start the timer for a player
function startTimer(playerIndex) {
  // Set the active player
  activePlayer = playerIndex;
  
  // Get the timer element for the player and update the display to show it is active
  const timerElement = playerButtons[activePlayer].querySelector('.btn-text-time');
  timerElement.classList.add('active-timer');
  playerButtons[activePlayer].classList.add('active');


  // Get the time from the timer element and parse it into minutes and seconds
  let timeArray = timerElement.innerHTML.split(':');
  let minutes = parseInt(timeArray[0]);
  let seconds = parseInt(timeArray[1]);

  // Set up the timer interval to run every second
  timerInterval = setInterval(() => {
    // Decrement the seconds and minutes
    seconds--;
    if (seconds < 0) {
      minutes--;
      seconds = 59;
    }

    // Check if the timer has reached zero
    if (minutes === 0 && seconds === 0) {
      // Clear the interval and move on to the next player
      clearInterval(timerInterval);
      startTimer((activePlayer + 1) % numPlayers);
      return;
    }

    // Update the timer display with the new time
    timerElement.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }, 1000);
}

// Function to stop the timer for a player
function stopTimer(playerIndex) {
  // Get the timer element for the player and update the display to show it is inactive
  const timerElement = playerButtons[playerIndex].querySelector('.btn-text-time');
  timerElement.classList.remove('active-timer');
  playerButtons[activePlayer].classList.remove('active');


  // Clear the timer interval
  clearInterval(timerInterval);
}

// Loop through all the player buttons and add event listeners
playerButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Stop the timer for the current player
    stopTimer(activePlayer);

    // Start the timer for the next player
    startTimer((index + 1) % numPlayers);
  });
});

// Get the pause button
const pauseBtn = document.querySelector('.pause-btn');

// Set up a variable to keep track of whether the timer is paused
let timerPaused = false;

// Function to pause the timer for all players
function pauseTimer() {
  // Clear the timer interval
  clearInterval(timerInterval);

  // Update the pause button text
  pauseBtn.querySelector('.btn-text2').innerHTML = 'Resume';
  playerButtons[activePlayer].classList.remove('active');

  // Set the timer paused flag to true
  timerPaused = true;
}

// Function to resume the timer for all players
function resumeTimer() {
  // Start the timer for the active player
  startTimer(activePlayer);

  // Update the pause button text
  pauseBtn.querySelector('.btn-text2').innerHTML = 'Pause';
  playerButtons[activePlayer].classList.add('active');

  // Set the timer paused flag to false
  timerPaused = false;
}

// Add event listener to the pause button
pauseBtn.addEventListener('click', () => {
  if (timerPaused) {
    // If the timer is paused, resume it
    resumeTimer();
  } else {
    // If the timer is running, pause it
    pauseTimer();
  }
});

// Get the reset button and add an event listener to reload the page on click
const resetButton = document.querySelector('.reset-btn');
resetButton.addEventListener('click', () => {
  location.reload();
});


// Start the timer for the first player


// Get the modal element
const modal = document.getElementById("modal");

// Get the button that starts the game
const startBtn = document.getElementById("start-btn");



// Set up the game when the button is clicked
startBtn.addEventListener("click", () => {



  const numPlayersInput = document.getElementById("players-input");
  const timerInput = document.getElementById("timer-input");

  if (timerInput < 1 || timerInput > 60) {
    alert("Please enter a timer value between 1 and 60 minutes.");
    return;
  }
  

  numPlayers = parseInt(numPlayersInput.value);
  initialTime = parseInt(timerInput.value);

  if (numPlayers == 3){
    document.querySelector('.player4').classList.add('hide');
    //document.querySelector('.bottom').innerHTML = '<div class="player-btn"><p class="btn-text-player">Player 3</p><p class="btn-text-time">20:00</p></div>'
  }

  // Update HTML for player buttons
  const playerBtns = document.querySelectorAll(".player-btn");
  for (let i = 0; i < numPlayers; i++) {
    playerBtns[i].innerHTML = `<div class="btn-text-player">Player ${i + 1}</div><div class="btn-text-time">${initialTime}:00</div>`;
  }

  // Hide the modal
  modal.style.display = "none";

  // Start the game
  startTimer(0);
});
