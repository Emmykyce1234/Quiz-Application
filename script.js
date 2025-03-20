const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "a. Hyper Transfer Markup Language",
      "b. HyperText Markup Language",
      "c. HighText Machine Language",
      "d. Hyperlink Text Markup Language",
    ],
    answer: "b. HyperText Markup Language",
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["a. Laravel", "b. Django", "c. React", "d. Angular"],
    answer: "c. React",
  },
  {
    question:
      "What is the correct syntax to output 'Hello, World!' in JavaScript?",
    options: [
      "a. print()",
      "b. console.log()",
      "c. echo",
      "d. document.write()",
    ],
    answer: "b. console.log()",
  },
  {
    question: "Which is NOT a programming language?",
    options: ["a. Python", "b. Java", "c. HTML", "d. C++"],
    answer: "c. HTML",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "a. Creative Style Sheets",
      "b. Cascading Style Sheets",
      "c. Computer Styling System",
      "d. Colorful Style Syntax",
    ],
    answer: "b. Cascading Style Sheets",
  },
  {
    question: "Which property is used to make text bold in CSS?",
    options: ["a. text-weight", "b. font-style", "c. font-weight", "d. bold"],
    answer: "c. font-weight",
  },
  {
    question:
      "Which attribute is used to specify that an input field must be filled out before submitting the form?",
    options: ["a. validate", "b. required", "c. mandatory", "d. mustfill"],
    answer: "b. required",
  },
  {
    question: "Which keyword is used to declare a function in JavaScript?",
    options: ["a. func", "b. function", "c. def", "d. declare"],
    answer: "b. function",
  },
  {
    question:
      "Which symbol is used for strict equality comparison in JavaScript?",
    options: ["a. ==", "b. ===", "c. !=", "d. ="],
    answer: "b. ===",
  },
  {
    question:
      "Which CSS property is used to set the background color of an element?",
    options: ["a. color", "b. background-color", "c. bgcolor", "d. background"],
    answer: "b. background-color",
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

  // Hide next button until answer is chosen
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

  const selectedButton = Array.from(
    document.querySelectorAll("#options-container button")
  ).find((btn) => btn.textContent === selectedOption);
  if (selectedButton) {
    selectedButton.classList.add("bg-purple-500", "text-white");
  }
  nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
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
  const confirmExit = confirm("Are you sure you want to exit?");
  
  if (confirmExit) {
    window.location.href = "index.html";
  }
});

if (window.location.pathname.includes("quiz.html")) {
  loadQuestion();
}


function redirectToQuiz() {
  window.location.href = "quiz.html";
}

function fadeInPage() {
  document.body.classList.add("opacity-100");
}

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (!link.href.includes("#")) { 
        e.preventDefault(); 
        document.body.classList.add("opacity-0"); 

        setTimeout(() => {
          window.location.href = link.href;
        }, 300); 
      }
    });
  });
});


