// DOM Elements
const startScreen = document.getElementById("start_screen");
const quizScreen = document.getElementById("quiz_screen");
const resultScreen = document.getElementById("result_screen");
const startButton = document.getElementById("start_btn");
const questionText = document.getElementById("question_text");
const answersContainer = document.getElementById("answers_container");
const currentQuestionSpan = document.getElementById("current_question");
const totalQuestionsSpan = document.getElementById("total_questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final_score");
const maxScoreSpan = document.getElementById("max_score");
const resultMessage = document.getElementById("result_message");
const restartButton = document.getElementById("restart_btn");
const progressBar = document.getElementById("progress");
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

// Quiz Questions
const quizQuestions = [
  {
    question: "when was gta san andreas released",
    answers: [
      { text: "2000", correct: false },
      { text: "2005", correct: false },
      { text: "2002", correct: true },
      { text: "1999", correct: false },
    ],
  },
  {
    question: "What is the best selling game of all time ?",
    answers: [
      { text: "Rta V", correct: false },
      { text: "Minecraft", correct: true },
      { text: "Roblox", correct: false },
      { text: "call of duty black ops II", correct: false },
    ],
  },
  {
    question: "What was lara croft original name on the tomb raider series?",
    answers: [
      { text: "Dora Croft", correct: false },
      { text: "Laura Craft", correct: false },
      { text: "Layla Croft", correct: false },
      { text: "Laura Cruz", correct: true },
    ],
  },
  {
    question: "What does NES stand for?",
    answers: [
      { text: "New Enterprise System", correct: false },
      { text: "Never Ending Simulation", correct: false },
      { text: "Nintendo Entertainment System", correct: true },
      { text: "Not Ever Still", correct: false },
    ],
  },
  {
    question: "Which of these is not a Rockstar-developed game?",
    answers: [
      { text: "Grand Theft Auto 5", correct: false },
      { text: "Bully", correct: false },
      { text: "Blur", correct: true },
      { text: "Red Dead Redemption 2", correct: false },
    ],
  },
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  questionText.textContent = currentQuestion.question;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer_btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
  if (isCorrect) {
  score++;
  scoreSpan.textContent = score;
  correctSound.play(correctSound); 
} else {
  wrongSound.play(wrongSound); 
}
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a looser!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep gaming!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! ";
  } else {
    resultMessage.textContent = "Keep touching grass";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
