// Global variables
const startButton = document.getElementById("start");
const questionTitle = document.getElementById("question-title");
const choicesContainer = document.getElementById("choices");
const timeDisplay = document.getElementById("time");
let currentQuestionIndex = 0;
let timeLeft = 60; // Initial time limit in seconds
let timerInterval;

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none";
  displayQuestion();
  // Start the timer
  timerInterval = setInterval(function() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to display a question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.question;
  choicesContainer.innerHTML = ""; // Clear previous choices
  // Create buttons for each choice
  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", function() {
      checkAnswer(index);
    });
    choicesContainer.appendChild(button);
  });
}

// Function to check the selected answer
function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.answer) {
    // Correct answer, move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  } else {
    // Incorrect answer, subtract time
    timeLeft -= 10;
  }
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  questionTitle.textContent = "All done!";
  choicesContainer.innerHTML = `
    <p>Your final score is ${timeLeft}.</p>
    <p>Enter initials: <input type="text" id="initials" maxlength="3" /></p>
    <button id="submit">Submit</button>
  `;
  
  // Event listener for submitting high score
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", function() {
    const initialsInput = document.getElementById("initials").value;
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initialsInput, score: timeLeft });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // Redirect to highscores.html
    window.location.href = "highscores.html";
  });
}

// Event listener for starting the quiz
startButton.addEventListener("click", startQuiz);
