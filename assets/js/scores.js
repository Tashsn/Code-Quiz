// const submitButton = document.getElementById("submit");

// // Event listener for submitting high score
// submitButton.addEventListener("click", function() {
//   const initialsInput = document.getElementById("initials").value;
//   const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//   highScores.push({ initials: initialsInput, score: timeLeft });
//   localStorage.setItem("highScores", JSON.stringify(highScores));
//   // Redirect to highscores.html
//   window.location.href = "highscores.html";
// });

document.addEventListener("DOMContentLoaded", function() {
  const submitButton = document.getElementById("submit");
  
  // Ensure submitButton exists before adding event listener
  if (submitButton) {
    submitButton.addEventListener("click", function() {
      const initialsInput = document.getElementById("initials").value;
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({ initials: initialsInput, score: timeLeft });
      localStorage.setItem("highScores", JSON.stringify(highScores));
      // Redirect to highscores.html
      window.location.href = "highscores.html";
    });
  }
});


// Function to display high scores
function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const highScoresList = document.getElementById("highscores");
  highScoresList.innerHTML = "";
  highScores.forEach(score => {
    const listItem = document.createElement("li");
    listItem.textContent = `${score.initials}: ${score.score}`;
    highScoresList.appendChild(listItem);
  });
}

// Display high scores when the page loads
displayHighScores();
