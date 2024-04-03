/* eslint-disable no-plusplus */

const questions = [
  {
    question: 'What is the capital of France?',
    image: 'images/paris.jpg',
    answers: [
      { text: 'New York', correct: false },
      { text: 'Paris', correct: true },
      { text: 'London', correct: false },
    ],
  },
  {
    question: 'What is the capital of England?',
    image: 'images/london.jpg',
    answers: [
      { text: 'New York', correct: false },
      { text: 'Paris', correct: false },
      { text: 'London', correct: true },
    ],
  },
  {
    question: 'What is the capital of USA?',
    image: 'images/washington.jpg',
    answers: [
      { text: 'New York', correct: false },
      { text: 'Paris', correct: false },
      { text: 'Washington DC', correct: true },
    ],
  },
  {
    question: 'What is the capital of Spain?',
    image: 'images/madrid.jpg',
    answers: [
      { text: 'New York', correct: false },
      { text: 'Madrid', correct: true },
      { text: 'London', correct: false },
    ],
  },
];

const questionElement = document.getElementById('question');
const imageElement = document.getElementById('question-image');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerText = `${questionNo}. ${currentQuestion.question}`; // innerHtml?

  imageElement.src = currentQuestion.image;

  // randomize order of answer buttons
  currentQuestion.answers.sort(() => Math.random() - 0.5);

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  // Store the selected answer in the questions array
  questions[currentQuestionIndex].selectedAnswer = selectedBtn.innerText;
  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.innerText = `Your score is ${score} out of ${questions.length}!`;
  nextButton.style.display = 'block';
  imageElement.src = 'images/beach.jpg';

  // show each question and if it was correct or not
  // show each question and if it was correct or not
  questions.forEach((question, index) => {
    const questionNo = index + 1;
    const questionSection = document.createElement('div');
    const correctAnswer = question.answers.find((answer) => answer.correct);
    questionSection.innerText = `${questionNo}. ${question.question} (Correct answer: ${correctAnswer.text})`;
    if (question.selectedAnswer === correctAnswer.text) {
      questionSection.style.color = 'green';
    } else {
      questionSection.style.color = 'red';
    }
    questionSection.style.marginBottom = '10px';
    questionSection.style.fontWeight = '500';
    questionSection.style.fontSize = '14px';
    questionSection.style.padding = '8px';
    questionSection.style.border = '1px solid black';
    questionSection.style.borderRadius = '4px';
    // questionSection.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    questionSection.style.backgroundColor = '#fff';
    questionSection.style.width = '100%';
    questionSection.style.marginLeft = '0';
    questionSection.style.marginTop = '10px';
    answerButtons.appendChild(questionSection);
  });
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
    nextButton.innerHTML = 'Restart';
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
