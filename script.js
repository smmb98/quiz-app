const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const score2 = document.getElementById("score2");
const score = document.getElementById("score");

let shuffledQuestions, currentQuestionIndex;
let points;

//Everything is hidden under question-container in the start

// For starting the game, click start button
startButton.addEventListener("click", startGame);
// For next quiz, click next button
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

//Function for starting the game
function startGame() {
  console.log("start game");
  points = 0;

  startButton.classList.add("hide"); //hiding the start button by adding hide class to it
  shuffledQuestions = quiz.sort(() => Math.random() - 0.5); // for shuffling the questions every beginning of the game, it shuffles the index of questions
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide"); // Removing hide class from question container to reveal question and answers

  setNextQuestion();
}

function setNextQuestion() {
  resetState();

  // shuffledQuestions is an array containing multiple objects, containing questions and answer and currentQuestionIndex refers to the index of array containg objects
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Takes argument of arr with index => "quiz = arr[index]" => index contains object containg both question and answer, so quiz is an object here
function showQuestion(quizObj) {
  score.classList.remove("hide");
  if (points != 0) {
    points--;
  }
  score2.innerText = `${points} out of ${shuffledQuestions.length}`;

  console.log("The Question");
  console.log(quizObj.question);
  questionElement.innerText = `Q.${currentQuestionIndex + 1}: ${
    quizObj.question
  }`; // Replacing question text with the question inside quiz object

  // Here answerObj is an element which will loop inside quiz.answers => "answerObj = quiz.answers[looping element]", it will be an object of answers
  quizObj.answers.forEach((answerObj) => {
    const button = document.createElement("button"); //We are creating a new button here
    button.innerText = answerObj.text; // We changed button's text to answers text
    button.classList.add("btn"); // We add a class of btn to newly created button element

    //We check if answerObj.correct has value of true or not
    if (answerObj.correct) {
      button.dataset.correct = answerObj.correct; //We are adding data attribute on our button element which will contain data now but wont have any visual effect on DOM
      //For more information go this website == https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    }

    button.addEventListener("click", selectAnswer); // the "click" is passed as an argument in selectAnswer function as selectAnswer(click) which is pointerEvent object
    // debugger;
    answerButtonsElement.appendChild(button); //append or push or add the newly created button, after the last child element of div containing id of answer-buttons
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");

  //No need for below operations if we are just adding our answers in new buttons and removing old dummy buttons...... I instead removed the dummy buttons from the HTML file

  //Ignore above statement
  //   debugger;
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// the argument click is a pointer event taken from addEventListener's first parameter of event firing => "click"
function selectAnswer(click) {
  // debugger;

  // This upper part of selectAnswer focus on changing whole document's background color.
  // 1. It extracts the data of button's tag, only data for "true" was created, no data for "false" was created
  // 2. both data and document.body(main body tag) were passed in setClassStatus
  // 3. In setClassStatus the clearStatusClass function removes any previous class placed on it by true or false answer, which would change its color, so it is neutralized
  // 4. It checked the data we extracted, if it was true it would add class correct in body otherwise class wrong.
  // 5. correct will change the background to green and wrong into red

  const selectedButton = click.target; // click.target is the button we clicked, it returns the whole element along with its attributes
  const correct = selectedButton.dataset.correct; // we extracted data attribute from here
  console.log(document.body);
  setClassStatus(document.body, correct);

  // The lower part converts all the buttons created under answerButtonElement into an array,
  // The forEach loop passes each element one by one to setClassStatus as well as their data
  // Element is useless here but data attribute is checked and adds class of either correct or wrong depending on the data

  //".children" returns name of all the tags and "Array.from" converts the list into an array on which the loop is executed.
  //   For reference see = https://www.w3schools.com/jsref/jsref_from.asp
  Array.from(answerButtonsElement.children).forEach((button) => {
    //button here represents all the answer button we have created above
    setClassStatus(button, button.dataset.correct);
  });

  // This checks the end of questions and changes the start button restart replay the game
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    // Once the answer is given next button appears
    nextButton.classList.remove("hide");
  } else {
    points--;
    score2.innerText = `${points} out of ${shuffledQuestions.length}`;
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setClassStatus(element, correct) {
  //   clearStatusClass(element);

  if (correct) {
    element.classList.add("correct");
    points++;
  } else {
    element.classList.add("wrong");
  }

  element.disabled = true; //disables the buttons
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// set of quizes with variable number of answers
const quiz = [
  {
    question: "What is 2 + 2 * 4",
    answers: [
      { text: "8", correct: false },
      { text: "12", correct: false },
      { text: "16", correct: false },
      { text: "10", correct: true },
    ],
  },
  {
    question: "What is 3 * 2 + 5",
    answers: [
      { text: "11", correct: true },
      { text: "10", correct: false },
    ],
  },
  {
    question: "What is 5 + 7 * 2",
    answers: [
      { text: "4", correct: false },
      { text: "19", correct: true },
      { text: "22", correct: false },
    ],
  },
];
