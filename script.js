const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Transfer Markup Language",
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlink Text Markup Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Laravel", "Django", "React", "Angular"],
    answer: "React",
  },
  {
    question:
      "What is the correct syntax to output 'Hello, World!' in JavaScript?",
    options: ["print()", "console.log()", "echo", "document.write()"],
    answer: "console.log()",
  },
  {
    question: "Which is NOT a programming language?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Styling System",
      "Colorful Style Syntax",
    ],
    answer: "Cascading Style Sheets",
  },

  {
    question: "Which property is used to make text bold in CSS?",
    options: ["text-weight", "font-style", "font-weight", "bold"],
    answer: "font-weight",
  },
  {
    question: "Which HTML element is used to define an unordered list?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    answer: "<ul>",
  },
  {
    question: "Which keyword is used to declare a function in JavaScript?",
    options: ["func", "function", "def", "declare"],
    answer: "function",
  },
  {
    question:
      "Which symbol is used for strict equality comparison in JavaScript?",
    options: ["==", "===", "!=", "="],
    answer: "===",
  },
  {
    question:
      "Which CSS property is used to set the background color of an element?",
    options: ["color", "background-color", "bgcolor", "background"],
    answer: "background-color",
  },
];

function shuffleQuestions() {
  quizData.sort(() => Math.random() - 0.5);
  return quizData.slice(0, 10);
}

const selectedQuestions = shuffleQuestions();
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const progress = document.getElementById("current-question");

function loadQuestion() {
  let currentQuestion = selectedQuestions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";
  progress.textContent = `${currentQuestionIndex + 1}`;

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add(
      "w-full",
      "bg-gray-200",
      "p-3",
      "rounded-lg",
      "text-lg",
      "hover:bg-gray-300",
      "transition"
    );
    button.addEventListener("click", () => selectAnswer(option));
    optionsContainer.appendChild(button);
  });

  // Hide next button until answer is surely chosen
  nextButton.classList.add("hidden");
}

function selectAnswer(selectedOption) {
  let correctAnswer = selectedQuestions[currentQuestionIndex].answer;

  if (selectedOption === correctAnswer) {
    score++;
  }

  userAnswers[currentQuestionIndex] = {
    question: selectedQuestions[currentQuestionIndex].question,
    selected: selectedOption,
    correctAnswer: correctAnswer,
    correct: selectedOption === correctAnswer,
  };

  document.querySelectorAll("#options-container button").forEach((btn) => {
    btn.classList.remove("bg-purple-500", "text-white", "hover:bg-gray-300");
  });

  const selectedButton = Array.from(
    document.querySelectorAll("#options-container button")
  ).find((btn) => btn.textContent === selectedOption);
  if (selectedButton) {
    selectedButton.classList.add("bg-purple-500", "text-white");
  }
  nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
  if (!userAnswers[currentQuestionIndex]) {
    alert("Please select an answer before proceeding.");
    return;
  }
  if (currentQuestionIndex < selectedQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    score = userAnswers.filter((answer) => answer.correct).length;

    localStorage.setItem("score", score);
    localStorage.setItem("reviewData", JSON.stringify(userAnswers));

    window.location.href = "result.html";
  }
});

document.getElementById("exit-btn").addEventListener("click", function () {
  localStorage.setItem("score", score);
  localStorage.setItem("reviewData", JSON.stringify(userAnswers));
  window.location.href = "result.html";
});

if (window.location.pathname.includes("quiz.html")) {
  loadQuestion();
}
