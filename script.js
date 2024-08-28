// toggle instructions 
$("#getInstructions").click(function() {
    $("#instructions").slideToggle("slow");
});


// QUIZ QUESTIONS 
let questions = [{
    question:"Girl falls for her beastly captor.",
    option1: "Beast",
    option2: "Beauty and Beast",
    option3: "Beauty and The Beast",
    option4: "Belle",
    answer:"3"
},
{
    question:"Boy kidnaps children and returns them.",
    option1: "Pan",
    option2: "Peter Pan",
    option3: "Hook",
    option4: "Wendy",
    answer:"2"
},
{
    question:"Orphaned sisters harbour fugative.",
    option1: "Sitch",
    option2: "Frozen",
    option3: "Lilo & Stitch",
    option4: "Brave",
    answer:"3"
},
{
    question:"Young boy saves the city while dealing with loss.",
    option1: "Big Hero 6",
    option2: "Jungle Book",
    option3: "Big Hero",
    option4: "Cars",
    answer:"1"
},
{
    question:"Long-haired girl escapes captitivy & finds love.",
    option1: "Snow White",
    option2: "Aladdin",
    option3: "Brave",
    option4: "Tangled",
    answer:"4"
}];

// -----------  get html quiz attributes  ----------- //

// questions
const question = document.getElementById('question');

//answer options
const options = Array.from(document.getElementsByClassName('option'));

// quiz progress
const quizProgress = document.getElementById('progress');

// score
const scoredPoints = document.getElementById('score');



// -----------  set initial attributes  ----------- //

let currentQuestion = {};

let acceptingAnswers = true;

let score = 0;

let questionCounter = 0;

let availableQuestions = [];


//set score per correct answer
const scoreValue = 5;

// set question total
const maxQuestions = 5;


// -----------  Game ----------- //

// start game function
startGame = () => {

    questionsCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();

};

// if user makes a selection go to next question
getNewQuestion = () => {

    if(availableQuestions.length == 0 || questionCounter >= maxQuestions) {
        confetti({
            particleCount: 150,
            spread: 180
        });
        setTimeout(playAgain, 1000);
    };
    // increase question by 1
    questionCounter++;
    // show progress
    quizProgress.innerText = `${questionCounter} / ${maxQuestions}`;
    //randomly  select a question
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    //pull from available questions radomly selected
    currentQuestion = availableQuestions[questionIndex];
    //change html question to question selected
    question.innerText = currentQuestion.question;

    //pull question options
    options.forEach(option => {
        const number = option.dataset['number'];
        option.innerText = currentQuestion['option' + number];
    })

    //removed answered questions
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

// get player selected option
options.forEach(option => {
    //option player clicked
    option.addEventListener('click', e => {

        acceptingAnswers = false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset['number'];
        
        // show if player selected right or wrong answer by
        let applyClass = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            applyClass = 'correct';
            userScore(scoreValue);
        }

        // set interval between choice and next question
        selectedOption.parentElement.classList.add(applyClass)
        setTimeout( () => {
            selectedOption.parentElement.classList.remove(applyClass);
            getNewQuestion();
        }, 1000);
    });
});

// increase player score
userScore = num => {
    score += num;
    scoredPoints.innerText = score;
};

// let player decide to play again or go home + reveal player final score
function playAgain() {
    let playerChoice = prompt(`You Scored ${score}! Whould you like to play again?`);
    if (playerChoice.toLowerCase() == "yes" || playerChoice.toLowerCase() == "yea" || playerChoice.toLowerCase() == "ok" ) {
        location.reload();
    } else {
        window.location.assign("index.html");
    }
};

startGame();
