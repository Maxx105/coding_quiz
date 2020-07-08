var timerEl = document.querySelector('#timeLeft');
var quizStartButton = document.querySelector('#startButton');
var viewHighscores = document.querySelector('#highscores');
var quizStartDiv = document.querySelector('#quizStart');
var quizHeader = document.querySelector('#quizHeader');
var quizPrompt = document.querySelector('#quizPrompt');
var answerOneDiv = document.querySelector('#answerOneDiv');
var answerTwoDiv = document.querySelector('#answerTwoDiv');
var answerThreeDiv = document.querySelector('#answerThreeDiv');
var answerFourDiv = document.querySelector('#answerFourDiv');
var buttonsDiv = document.querySelector('#buttonsDiv');
var headerAndPrompt = document.querySelector('#headerAndPrompt');
var finalScoreDiv = document.querySelector('#finalScore');
var submitInitials = document.querySelector('#submitInitials');
var highscoresList = document.querySelector('#highscoresList');
var goBackButtonDiv = document.querySelector('#goBackButton');
var hrDiv = document.querySelector('#hrDiv');
var answerOne = document.createElement('button');
var answerTwo = document.createElement('button');
var answerThree = document.createElement('button');
var answerFour = document.createElement('button');
var goBackButton = document.createElement('button');
var clearHighscoresButton = document.createElement('button');
var hr = document.createElement('hr');
var rightOrWrong = document.createElement('p');
var finalScore = document.createElement('p');
var highscoresListItem = document.createElement('li');


var enterInitialsDiv = document.querySelector('#enterInitials');
var enterInitials = document.createElement('p');
var enterInitialsTextDiv = document.querySelector('#enterInitialsText');
var enterInitialsText = document.createElement('input');
var enterInitialsButtonDiv = document.querySelector('#enterInitialsButton');
var enterInitialsButton = document.createElement('button');

var questionsCount = 0;
var timeLeft = 100;
var highscoreCount = 1;

var scoreArray = [];
// This gets the local storage information.
var scoreStorage = JSON.parse(localStorage.getItem('score'));


// this allows you to click on "view highscores" and view the high scores. It removes buttons (answer choices) in case it is pressed while the questions/answers are populated.
viewHighscores.addEventListener('click', function(event){
    buttonsDiv.remove();
    functionHighscoresPage();
    if (scoreStorage === null){
        scoreArray[0] = highscoresListItem.textContent;
    } else {
        scoreArray = scoreStorage;
        scoreArray.push(highscoresListItem.textContent);
    }

    // This is the same for loop as when the submit button is pressed, however the loop iterates up to scoreArray.length - 1 to avoid a blank li being appended to the list.
    for (var i = 0; i < scoreArray.length - 1; i++){
        highscoresListItem = document.createElement('li');
        highscoresListItem.textContent = scoreArray[i];
        highscoresList.appendChild(highscoresListItem);
        highscoresListItem.setAttribute("style", "background-color: cyan;");
    } 
});

// This clears the local storage and removes the highscores.
clearHighscoresButton.addEventListener('click', function(event){
    window.localStorage.clear();
    highscoresList.remove();
});

// This initiates the timer. When the wrong answer is chosen, 10 seconds is taken off the timer.
function quizTimer() {
    timeLeft = 100;
    var timeInterval = setInterval(countDown, 1000);

    function countDown() {
        timerEl.textContent = `Time Left: ${timeLeft}`;
        timeLeft--;

        if (timeLeft <= 0) {
            timerEl.textContent = "Time Left: 0";
            clearInterval(timeInterval);
        }
        if (questionsCount === 6) {
            clearInterval(timeInterval);
        }

    }
}

// When the "Start Quiz" button is pressed, the timer starts.
quizStartButton.addEventListener('click', function(event){
    quizTimer();
    quizPrompt.remove();
    quizStartButton.remove();
    functionQuestionOne();
    questionsCount = 1;
    answerOneDiv.appendChild(answerOne);
    answerTwoDiv.appendChild(answerTwo);
    answerThreeDiv.appendChild(answerThree);
    answerFourDiv.appendChild(answerFour);
});

// This function keeps track of what questions/answers are being displayed by calling the function that corresponds to the questionCount variable. It also appends "Right!" or "Wrong!" depending on the answer choice.
function answerFunction(answers){
    answers.addEventListener('click', function(event){
    questionsCount++
    console.log(questionsCount);
    if (answers.textContent === "alerts" || answers.textContent === "parentheses" || answers.textContent === "all of the above" || answers.textContent === "quotes" || answers.textContent === "console log"){
        hrDiv.appendChild(hr);
        rightOrWrong.textContent = "Right!";
        quizStartDiv.appendChild(rightOrWrong);
    } else {
        hrDiv.appendChild(hr);
        rightOrWrong.textContent = "Wrong!"
        quizStartDiv.appendChild(rightOrWrong);
        timeLeft = timeLeft - 10;
    }
    if (questionsCount === 2){
    functionQuestionTwo();
    }
    else if (questionsCount === 3){
    functionQuestionThree();
    }
    else if (questionsCount === 4){
    functionQuestionFour();
    }
    else if (questionsCount === 5){
    functionQuestionFive();
    }
    else if (questionsCount === 6){
    functionSubmitScore();
    }
    });
}

answerFunction(answerOne);
answerFunction(answerTwo);
answerFunction(answerThree);
answerFunction(answerFour);

// These are the questions/answers functions called in the above functions.
function functionQuestionOne(){
    quizHeader.textContent = "Commonly used data types DO NOT include:";
    answerOne.textContent = "strings";
    answerTwo.textContent = "booleans";
    answerThree.textContent = "alerts";
    answerFour.textContent = "numbers";
}
function functionQuestionTwo(){
    quizHeader.textContent = "The condition in an if/else statement is enclosed within _________";
    answerOne.textContent = "two forward slashes";
    answerTwo.textContent = "parentheses";
    answerThree.textContent = "curly brackets";
    answerFour.textContent = "square brackets";
}
function functionQuestionThree(){
    quizHeader.textContent = "Arrays in JavaScript can be used to store:";
    answerOne.textContent = "numbers and strings";
    answerTwo.textContent = "other arrays";
    answerThree.textContent = "booleans";
    answerFour.textContent = "all of the above";
}
function functionQuestionFour(){
    quizHeader.textContent = "String values must be enclosed with __________ when being assigned to variables.";
    answerOne.textContent = "commas";
    answerTwo.textContent = "curly brackets";
    answerThree.textContent = "quotes";
    answerFour.textContent = "forward slashes";
}
function functionQuestionFive(){
    quizHeader.textContent = "A very useful tool used during development and debugging for printing content to the debugger is:";
    answerOne.textContent = "JavaScript";
    answerTwo.textContent = "terminal/bash";
    answerThree.textContent = "for loops";
    answerFour.textContent = "console log";
}

// This brings up the highscores page by removing anything not associated with that page and adding the go back and clear highscores buttons
function functionHighscoresPage(){
    quizHeader.textContent = "Highscores!"; 
    finalScore.remove();
    submitInitials.remove();
    hr.remove();
    rightOrWrong.remove();
    quizStartButton.remove();
    quizPrompt.remove();
    goBackButton.textContent = "Go Back";
    clearHighscoresButton.textContent = "Clear Highscores";
    goBackButtonDiv.appendChild(goBackButton);
    headerAndPrompt.appendChild(clearHighscoresButton);

}

// this function displays the final score as well as the text box and submit button when the quiz is over.
function functionSubmitScore(){
    quizHeader.textContent = "All done!";
    finalScore.textContent = `Your final score is ${timeLeft}`;
    buttonsDiv.remove();
    
    finalScoreDiv.append(finalScore);

    enterInitials.textContent = "Enter Initials:"
    enterInitialsDiv.append(enterInitials);
    
    enterInitialsText.setAttribute('placeholder', "Enter Initials");
    enterInitialsTextDiv.append(enterInitialsText);

    enterInitialsButton.textContent = "Submit";
    enterInitialsButtonDiv.append(enterInitialsButton);
}

// This determines what happens when the submit button is pressed. It essentially appends the score (with the entered initials) to an ordered list and also sends that info to the local storage.
enterInitialsButtonDiv.addEventListener('click', function(event){
    
    highscoresListItem.textContent = `${enterInitialsText.value} - ${timeLeft + 1}`;

    if (scoreStorage === null){
        scoreArray[0] = highscoresListItem.textContent;
    } else {
        scoreArray = scoreStorage;
        scoreArray.push(highscoresListItem.textContent);
    }
    for (var i = 0; i < scoreArray.length; i++){
        highscoresListItem = document.createElement('li');
        highscoresListItem.textContent = scoreArray[i];
        highscoresList.appendChild(highscoresListItem);
        highscoresListItem.setAttribute("style", "background-color: cyan;");
        console.log(highscoresListItem.textContent);
    } 

    localStorage.setItem('score', JSON.stringify(scoreArray));
    
    functionHighscoresPage();
    
});

