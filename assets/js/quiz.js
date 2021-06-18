// Wait for the DOM to finish loading before running the game.
// Get the button elements and add event listeners to them.

//This below will listen for the DOM content to be loaded before it executes the function in this code block.
/*document.addEventListener("DOMContentLoaded", function()  {    //This waits for the DOM to finish loading before you start running your code.
    let buttons = document.getElementsByTagName("button");  //Returns an array of buttons so we can loop through it.
    for (let button of buttons)  {      //Same as for(i=0; i<buttons.length; i++)
        button.addEventListener("click", function() {   //We add an eventlistener that wait for an individual button to be clicked then the code in this block will run
            if (this.getAttribute("data-type") === "submit")  {  //"this" refers to the button that was clicked at any point in time. if "addition" button was clicked then 'this' refers to it  & so on...
                alert("You clicked the Submit button!");
            }  else  {
                let buttonType = this.getAttribute("data-type");
                alert(`You clicked the ${buttonType}`);   //It tells the user which button was clicked
            }   
        })
    }     
})
*/

/**
 * The document.querySelector() & document.querySelectorAll() returns the first element within the document that matches the 
specified selector or group of selectors. They both return null if no matches are found.
 */
const question = document.querySelector('#question');  //question was used in the video but i want to use QUESTION so will change it later
const options = Array.from(document.querySelectorAll('.option-text'));  //choices was used 
const progressText = document.querySelector('#progressText');   //same as video
const scoreText = document.querySelector('#score'); //same as video
const progressLevelFull = document.querySelector('#progressLevelFull'); //progressBarFull was used

let currentQuestion = {}
let availableQuestions = []
let questionCounter = 0
let score = 0
let receiveAnswers = true     /* acceptingAnswers was used in the tutorial video */


let questions = [ //questions was used in the video but i want to use myQuestions so will change it later
{
  question: 'I kept your food on the ------------------.',
  option1: 'tabel',     //the variable "choice1"  was used in the video but i used "option1" for mine.
  option2: 'tabule',
  option3: 'table',
  option4: 'tablet',
  correctAnswer: 3,     //the variable "answer" was used in the video but i used "correctAnswer" for mine.
}, 
{
  question: 'She is a very ----------------------- lady.',
  option1: 'optimistik',
  option2: 'optamistic',
  option3: 'optimicite',
  option4: 'optimistic',
  correctAnswer: 4,
}, 
{
   question: 'An act of ---------------- is dangerous.',
   option1: 'rebellion',
  option2: 'rebelion',
  option3: 'rebbellion',
  option4: 'rebelione',
  correctAnswer: 1,
}, 
{
   question: 'My friend made a very ---------------- meal.',
   option1: 'dilisious',
  option2: 'delicious',
  option3: 'dilicious',
  option4: 'deliciouce',
  correctAnswer: 2,
}, 
{
   question: 'I am very ---------------- at the attitude of the staff.',
   option1: 'disapointed',
  option2: 'disappointed',
  option3: 'dissappointed',
  option4: 'dicappointed',
  correctAnswer: 2,
}, 
{
   question: 'I attended a  ---------------- party last weekend.',
   option1: 'suprise',
   option2: 'surprice',
   option3: 'sorprice',
   option4: 'surprise',
  correctAnswer: 4,
}, 
{
   question: 'My colleague made a fantastic  ----------------.',
   option1: 'propocition',
  option2: 'proposition',
  option3: 'propositione',
  option4: 'propocision',
  correctAnswer: 2,
}, 
{
   question: 'The company adopted a very ---------------- approach.',
   option1: 'pragmatik',
  option2: 'pragmatice',
  option3: 'pragmmatic',
  option4: 'pragmatic',
  correctAnswer: 4,
}, 
{
   question: 'My daughter is the ---------------- of the famous award.',
   option1: 'recipient',
  option2: 'resipient',
  option3: 'ressipient',
  option4: 'recepient',
  correctAnswer: 1,
}, 
{
   question: 'The immense ---------------- of the outgoing president was recognised.',
   option1: 'contribiution',
  option2: 'contribution',
  option3: 'contrebution',
  option4: 'contrebutione',
  correctAnswer: 2,
}
]

const MAX_QUESTIONS = 10;
const SCORE_POINTS = 100;

/*startQuiz = () => {
   questionCounter = 0;
   score = 0;
   availableQuestions = [...questions];
   getNewQuestion();
} */

function startQuiz() {
   questionCounter = 0;
   score = 0;
   availableQuestions = [...questions];
   getNewQuestion();
}

/** the 1st if statement in the function below keeps track of the score, if there are no more 
 * questions or the question counter is greater than the max number of questions (i.e 10), then 
 * the local storage which takes 2 arguments i.e "'mostRecentScore'" which is a string that specifies
 * the name of the key that you want to set the value of and the variable called "score" which is also
 * a string that specifies the value of the key that you want to set the value of and the last statement 
 * "return window.location.assign()" which is also a method causes the window to load and display the
 * score(document) at the URL specified which in this case is an html file called "end.html" in order to
 * display the user's overall score to them, this signifies the end of the quiz. 
 * 
 * This "getNewQuestion" function gets us the new question each time it's called */ 
getNewQuestion = () => {    // getNewQuestion function starts
   if(availableQuestions.length === 0  || questionCounter > MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score)

      return window.location.assign('/end.html')  /* "/end.html" was used in the video tutorial */ 
   }

   /* These 2 lines of code below will increment questionCounter and display the message: "Question 1 of 
   10" and the number before 'of' updates itself as user progresses through the questions */
   questionCounter++;
   progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
   progressLevelFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

   const randomQuestionIndex = Math.floor(Math.random() * availableQuestions.length);  /* const questionsIndex was used in the video tutorial */
   currentQuestion = availableQuestions[randomQuestionIndex]  /*keps track of the question the user is currently on */
   question.innerText = currentQuestion.question   //This will know the particular question asked


   options.forEach(option => {
       const number = option.dataset['number']
       option.innerText = currentQuestion['option' + number]
   })

   availableQuestions.splice(randomQuestionIndex, 1)
   receiveAnswers = true
}     // getNewQuestion function ends


options.forEach(option => {
       option.addEventListener('click', e => {
           if(!receiveAnswers) return

           receiveAnswers = false;
           const selectedOption = e.target     // selectedChoice was used in the video
           const selectedResult = selectedOption.dataset['number'] //selectedAnswer was used here

           let optionToApply = selectedResult == currentQuestion.correctAnswer ? 'rightAnswer' : 'wrongAnswer'     //classToApply was used in the video

           if(optionToApply === 'rightAnswer') {
               incrementScore(SCORE_POINTS)
           }

           selectedOption.parentElement.classList.add(optionToApply); //This code adds the right answer to the parent element when the user gets the answer right

           setTimeout(() => {
            selectedOption.parentElement.classList.remove(optionToApply)
            getNewQuestion()

           }, 1000)
           
       })

    })




   /*function getNewQuestion() {
      if(availableQuestions.length === 0  || questionsCounter > MAX_QUESTIONS) {
         localStorage.setItem('mostRecentScore', score);
   
         return window.location.assign('end.html');   /* "/end.html" was used in the video tutorial */ 
  // }




/* We need to avoid creating Global variables as much as possible because they can be overwritten
 unknowingly so we are containing our variables within the different functions i.e local scopes so
that's why functions come in handy */

/*function runGame() {

}

function checkUserAnswer() {
    
}

function giveSystemAnswer() {
    
}

function incrementRightAnswerScore() {
    
}

function incrementWrongAnswerScore() {
    
}

function displayQuestion() {

    
}  */

/*let questionsElement = document.getElementById("questions-area");
let answersElement = document.getElementById("answers-area"); */
/*let answersElement = document.getElementsByClassName("allAnswers"); */

/*let myData =  
[{
  question: 'I kept your food on the ------------------.',
  answers: ['tabel', 'tabule', 'table', 'tablet'] 
}, 
{
  question: 'She is a very ----------------------- lady.',
  answers: ['optimistik', 'optamistic', 'optimicite', 'optimistic']
}, 
{
   question: 'An act of ---------------- is dangerous.',
   answers: ['rebellion', 'rebelion', 'rebbellion', 'rebelione'] 
}, 
{
   question: 'My friend made a very ---------------- meal.',
   answers: ['dilisious', 'delicious', 'dilicious', 'deliciouce'] 
}, 
{
   question: 'I am very ---------------- at the attitude of the staff.',
   answers: ['disapointed', 'disappointed', 'dissappointed', 'dicappointed'] 
}, 
{
   question: 'I attended a  ---------------- party last weekend.',
   answers: ['suprise', 'surprice', 'sorprice', 'surprise'] 
}, 
{
   question: 'My colleague made a fantastic  ----------------.',
   answers: ['propocition', 'proposition', 'propositione', 'propocision'] 
}, 
{
   question: 'The company adopted a very ---------------- approach.',
   answers: ['pragmatik', 'pragmatice', 'pragmmatic', 'pragmatic'] 
}, 
{
   question: 'My daughter is the ---------------- of the famous award.',
   answers: ['recipient', 'resipient', 'ressipient', 'recepient'] 
}, 
{
   question: 'The immense ---------------- of the outgoing president was recognised.',
   answers: ['contribiution', 'contribution', 'contrebution', 'contrebutione'] 
}]; */


   
  

   
  
      








  


    

// Wait for the DOM to finish loading before running the game.
// Get the button elements and add event listeners to them.

//This below will listen for the DOM content to be loaded before it executes the function in this code block.
/*document.addEventListener("DOMContentLoaded", function()  {    //This waits for the DOM to finish loading before you start running your code.
    let buttons = document.getElementsByTagName("button");  //Returns an array of buttons so we can loop through it.
    for (let button of buttons)  {      //Same as for(i=0; i<buttons.length; i++)
        button.addEventListener("click", function() {   //We add an eventlistener that wait for an individual button to be clicked then the code in this block will run
            if (this.getAttribute("data-type") === "submit")  {  //"this" refers to the button that was clicked at any point in time. if "addition" button was clicked then 'this' refers to it  & so on...
                alert("You clicked the Submit button!");
            }  else  {
                let buttonType = this.getAttribute("data-type");
                alert(`You clicked the ${buttonType}`);   //It tells the user which button was clicked
            }   
        })
    }     
})
*/

/**
 * The document.querySelector() & document.querySelectorAll() returns the first element within the document that matches the 
specified selector or group of selectors. They both return null if no matches are found.
 */
const question = document.querySelector('#question');  //question was used in the video but i want to use QUESTION so will change it later
const options = Array.from(document.querySelectorAll('.option-text'));  //choices was used 
const progressText = document.querySelector('#progressText');   //same as video
const scoreText = document.querySelector('#score'); //same as video
const progressLevelFull = document.querySelector('#progressLevelFull'); //progressBarFull was used

let currentQuestion = {}
let availableQuestions = []
let questionCounter = 0
let score = 0
let receiveAnswers = true     /* acceptingAnswers was used in the tutorial video */


let questions = [ //questions was used in the video but i want to use myQuestions so will change it later
{
  question: 'I kept your food on the ------------------.',
  option1: 'tabel',     //the variable "choice1"  was used in the video but i used "option1" for mine.
  option2: 'tabule',
  option3: 'table',
  option4: 'tablet',
  correctAnswer: 3,     //the variable "answer" was used in the video but i used "correctAnswer" for mine.
}, 
{
  question: 'She is a very ----------------------- lady.',
  option1: 'optimistik',
  option2: 'optamistic',
  option3: 'optimicite',
  option4: 'optimistic',
  correctAnswer: 4,
}, 
{
   question: 'An act of ---------------- is dangerous.',
   option1: 'rebellion',
  option2: 'rebelion',
  option3: 'rebbellion',
  option4: 'rebelione',
  correctAnswer: 1,
}, 
{
   question: 'My friend made a very ---------------- meal.',
   option1: 'dilisious',
  option2: 'delicious',
  option3: 'dilicious',
  option4: 'deliciouce',
  correctAnswer: 2,
}, 
{
   question: 'I am very ---------------- at the attitude of the staff.',
   option1: 'disapointed',
  option2: 'disappointed',
  option3: 'dissappointed',
  option4: 'dicappointed',
  correctAnswer: 2,
}, 
{
   question: 'I attended a  ---------------- party last weekend.',
   option1: 'suprise',
   option2: 'surprice',
   option3: 'sorprice',
   option4: 'surprise',
  correctAnswer: 4,
}, 
{
   question: 'My colleague made a fantastic  ----------------.',
   option1: 'propocition',
  option2: 'proposition',
  option3: 'propositione',
  option4: 'propocision',
  correctAnswer: 2,
}, 
{
   question: 'The company adopted a very ---------------- approach.',
   option1: 'pragmatik',
  option2: 'pragmatice',
  option3: 'pragmmatic',
  option4: 'pragmatic',
  correctAnswer: 4,
}, 
{
   question: 'My daughter is the ---------------- of the famous award.',
   option1: 'recipient',
  option2: 'resipient',
  option3: 'ressipient',
  option4: 'recepient',
  correctAnswer: 1,
}, 
{
   question: 'The immense ---------------- of the outgoing president was recognised.',
   option1: 'contribiution',
  option2: 'contribution',
  option3: 'contrebution',
  option4: 'contrebutione',
  correctAnswer: 2,
}
]

const MAX_QUESTIONS = 10;
const SCORE_POINTS = 100;

/*startQuiz = () => {
   questionCounter = 0;
   score = 0;
   availableQuestions = [...questions];
   getNewQuestion();
} */

function startQuiz() {
   questionCounter = 0;
   score = 0;
   availableQuestions = [...questions];
   getNewQuestion();
}

/** the 1st if statement in the function below keeps track of the score, if there are no more 
 * questions or the question counter is greater than the max number of questions (i.e 10), then 
 * the local storage which takes 2 arguments i.e "'mostRecentScore'" which is a string that specifies
 * the name of the key that you want to set the value of and the variable called "score" which is also
 * a string that specifies the value of the key that you want to set the value of and the last statement 
 * "return window.location.assign()" which is also a method causes the window to load and display the
 * score(document) at the URL specified which in this case is an html file called "end.html" in order to
 * display the user's overall score to them, this signifies the end of the quiz. 
 * 
 * This "getNewQuestion" function gets us the new question each time it's called */ 
getNewQuestion = () => {    // getNewQuestion function starts
   if(availableQuestions.length === 0  || questionCounter > MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score)

      return window.location.assign('/end.html')  /* "/end.html" was used in the video tutorial */ 
   }

   /* These 2 lines of code below will increment questionCounter and display the message: "Question 1 of 
   10" and the number before 'of' updates itself as user progresses through the questions */
   questionCounter++;
   progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
   progressLevelFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

   const randomQuestionIndex = Math.floor(Math.random() * availableQuestions.length);  /* const questionsIndex was used in the video tutorial */
   currentQuestion = availableQuestions[randomQuestionIndex]  /*keps track of the question the user is currently on */
   question.innerText = currentQuestion.question   //This will know the particular question asked


   options.forEach(option => {
       const number = option.dataset['number']
       option.innerText = currentQuestion['option' + number]
   })

   availableQuestions.splice(randomQuestionIndex, 1)
   receiveAnswers = true
}     // getNewQuestion function ends


options.forEach(option => {
       option.addEventListener('click', e => {
           if(!receiveAnswers) return

           receiveAnswers = false;
           const selectedOption = e.target     // selectedChoice was used in the video
           const selectedResult = selectedOption.dataset['number'] //selectedAnswer was used here

           let optionToApply = selectedResult == currentQuestion.correctAnswer ? 'rightAnswer' : 'wrongAnswer'     //classToApply was used in the video

           if(optionToApply === 'rightAnswer') {
               incrementScore(SCORE_POINTS)
           }

           selectedOption.parentElement.classList.add(optionToApply); //This code adds the right answer to the parent element when the user gets the answer right

           setTimeout(() => {
            selectedOption.parentElement.classList.remove(optionToApply)
            getNewQuestion()

           }, 1000)
           
       })

    })




   /*function getNewQuestion() {
      if(availableQuestions.length === 0  || questionsCounter > MAX_QUESTIONS) {
         localStorage.setItem('mostRecentScore', score);
   
         return window.location.assign('end.html');   /* "/end.html" was used in the video tutorial */ 
  // }




/* We need to avoid creating Global variables as much as possible because they can be overwritten
 unknowingly so we are containing our variables within the different functions i.e local scopes so
that's why functions come in handy */

/*function runGame() {

}

function checkUserAnswer() {
    
}

function giveSystemAnswer() {
    
}

function incrementRightAnswerScore() {
    
}

function incrementWrongAnswerScore() {
    
}

function displayQuestion() {

    
}  */

/*let questionsElement = document.getElementById("questions-area");
let answersElement = document.getElementById("answers-area"); */
/*let answersElement = document.getElementsByClassName("allAnswers"); */

/*let myData =  
[{
  question: 'I kept your food on the ------------------.',
  answers: ['tabel', 'tabule', 'table', 'tablet'] 
}, 
{
  question: 'She is a very ----------------------- lady.',
  answers: ['optimistik', 'optamistic', 'optimicite', 'optimistic']
}, 
{
   question: 'An act of ---------------- is dangerous.',
   answers: ['rebellion', 'rebelion', 'rebbellion', 'rebelione'] 
}, 
{
   question: 'My friend made a very ---------------- meal.',
   answers: ['dilisious', 'delicious', 'dilicious', 'deliciouce'] 
}, 
{
   question: 'I am very ---------------- at the attitude of the staff.',
   answers: ['disapointed', 'disappointed', 'dissappointed', 'dicappointed'] 
}, 
{
   question: 'I attended a  ---------------- party last weekend.',
   answers: ['suprise', 'surprice', 'sorprice', 'surprise'] 
}, 
{
   question: 'My colleague made a fantastic  ----------------.',
   answers: ['propocition', 'proposition', 'propositione', 'propocision'] 
}, 
{
   question: 'The company adopted a very ---------------- approach.',
   answers: ['pragmatik', 'pragmatice', 'pragmmatic', 'pragmatic'] 
}, 
{
   question: 'My daughter is the ---------------- of the famous award.',
   answers: ['recipient', 'resipient', 'ressipient', 'recepient'] 
}, 
{
   question: 'The immense ---------------- of the outgoing president was recognised.',
   answers: ['contribiution', 'contribution', 'contrebution', 'contrebutione'] 
}]; */


   
  

   
  
      








  


    

// Wait for the DOM to finish loading before running the game.
// Get the button elements and add event listeners to them.

//This below will listen for the DOM content to be loaded before it executes the function in this code block.
/*document.addEventListener("DOMContentLoaded", function()  {    //This waits for the DOM to finish loading before you start running your code.
    let buttons = document.getElementsByTagName("button");  //Returns an array of buttons so we can loop through it.
    for (let button of buttons)  {      //Same as for(i=0; i<buttons.length; i++)
        button.addEventListener("click", function() {   //We add an eventlistener that wait for an individual button to be clicked then the code in this block will run
            if (this.getAttribute("data-type") === "submit")  {  //"this" refers to the button that was clicked at any point in time. if "addition" button was clicked then 'this' refers to it  & so on...
                alert("You clicked the Submit button!");
            }  else  {
                let buttonType = this.getAttribute("data-type");
                alert(`You clicked the ${buttonType}`);   //It tells the user which button was clicked
            }   
        })
    }     
})
*/

/**
 * The document.querySelector() & document.querySelectorAll() returns the first element within the document that matches the 
specified selector or group of selectors. They both return null if no matches are found.
 */
const question = document.querySelector('#question');  //question was used in the video but i want to use QUESTION so will change it later
const options = Array.from(document.querySelectorAll('.option-text'));  //choices was used 
const progressText = document.querySelector('#progressText');   //same as video
const scoreText = document.querySelector('#score'); //same as video
const progressLevelFull = document.querySelector('#progressLevelFull'); //progressBarFull was used

let currentQuestion = {}
let availableQuestions = []
let questionCounter = 0
let score = 0
let receiveAnswers = true     /* acceptingAnswers was used in the tutorial video */


let questions = [ //questions was used in the video but i want to use myQuestions so will change it later
{
  question: 'I kept your food on the ------------------.',
  option1: 'tabel',     //the variable "choice1"  was used in the video but i used "option1" for mine.
  option2: 'tabule',
  option3: 'table',
  option4: 'tablet',
  correctAnswer: 3,     //the variable "answer" was used in the video but i used "correctAnswer" for mine.
}, 
{
  question: 'She is a very ----------------------- lady.',
  option1: 'optimistik',
  option2: 'optamistic',
  option3: 'optimicite',
  option4: 'optimistic',
  correctAnswer: 4,
}, 
{
   question: 'An act of ---------------- is dangerous.',
   option1: 'rebellion',
  option2: 'rebelion',
  option3: 'rebbellion',
  option4: 'rebelione',
  correctAnswer: 1,
}, 
{
   question: 'My friend made a very ---------------- meal.',
   option1: 'dilisious',
  option2: 'delicious',
  option3: 'dilicious',
  option4: 'deliciouce',
  correctAnswer: 2,
}, 
{
   question: 'I am very ---------------- at the attitude of the staff.',
   option1: 'disapointed',
  option2: 'disappointed',
  option3: 'dissappointed',
  option4: 'dicappointed',
  correctAnswer: 2,
}, 
{
   question: 'I attended a  ---------------- party last weekend.',
   option1: 'suprise',
   option2: 'surprice',
   option3: 'sorprice',
   option4: 'surprise',
  correctAnswer: 4,
}, 
{
   question: 'My colleague made a fantastic  ----------------.',
   option1: 'propocition',
  option2: 'proposition',
  option3: 'propositione',
  option4: 'propocision',
  correctAnswer: 2,
}, 
{
   question: 'The company adopted a very ---------------- approach.',
   option1: 'pragmatik',
  option2: 'pragmatice',
  option3: 'pragmmatic',
  option4: 'pragmatic',
  correctAnswer: 4,
}, 
{
   question: 'My daughter is the ---------------- of the famous award.',
   option1: 'recipient',
  option2: 'resipient',
  option3: 'ressipient',
  option4: 'recepient',
  correctAnswer: 1,
}, 
{
   question: 'The immense ---------------- of the outgoing president was recognised.',
   option1: 'contribiution',
  option2: 'contribution',
  option3: 'contrebution',
  option4: 'contrebutione',
  correctAnswer: 2,
}
]

const MAX_QUESTIONS = 10;
const SCORE_POINTS = 100;

/*startQuiz = () => {
   questionCounter = 0;
   score = 0;
   availableQuestions = [...questions];
   getNewQuestion();
} */

function startQuiz() {
   questionCounter = 0;
   score = 0;
   availableQuestions = [...questions];
   getNewQuestion();
}

/** the 1st if statement in the function below keeps track of the score, if there are no more 
 * questions or the question counter is greater than the max number of questions (i.e 10), then 
 * the local storage which takes 2 arguments i.e "'mostRecentScore'" which is a string that specifies
 * the name of the key that you want to set the value of and the variable called "score" which is also
 * a string that specifies the value of the key that you want to set the value of and the last statement 
 * "return window.location.assign()" which is also a method causes the window to load and display the
 * score(document) at the URL specified which in this case is an html file called "end.html" in order to
 * display the user's overall score to them, this signifies the end of the quiz. 
 * 
 * This "getNewQuestion" function gets us the new question each time it's called */ 
getNewQuestion = () => {    // getNewQuestion function starts
   if(availableQuestions.length === 0  || questionCounter > MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score)

      return window.location.assign('/end.html')  /* "/end.html" was used in the video tutorial */ 
   }

   /* These 2 lines of code below will increment questionCounter and display the message: "Question 1 of 
   10" and the number before 'of' updates itself as user progresses through the questions */
   questionCounter++;
   progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
   progressLevelFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

   const randomQuestionIndex = Math.floor(Math.random() * availableQuestions.length);  /* const questionsIndex was used in the video tutorial */
   currentQuestion = availableQuestions[randomQuestionIndex]  /*keps track of the question the user is currently on */
   question.innerText = currentQuestion.question   //This will know the particular question asked


   options.forEach(option => {
       const number = option.dataset['number']
       option.innerText = currentQuestion['option' + number]
   })

   availableQuestions.splice(randomQuestionIndex, 1)
   receiveAnswers = true
}     // getNewQuestion function ends


options.forEach(option => {
       option.addEventListener('click', e => {
           if(!receiveAnswers) return

           receiveAnswers = false;
           const selectedOption = e.target     // selectedChoice was used in the video
           const selectedResult = selectedOption.dataset['number'] //selectedAnswer was used here

           let optionToApply = selectedResult == currentQuestion.correctAnswer ? 'rightAnswer' : 'wrongAnswer'     //classToApply was used in the video

           if(optionToApply === 'rightAnswer') {
               incrementScore(SCORE_POINTS)
           }

           selectedOption.parentElement.classList.add(optionToApply); //This code adds the right answer to the parent element when the user gets the answer right

           setTimeout(() => {
            selectedOption.parentElement.classList.remove(optionToApply)
            getNewQuestion()

           }, 1000)
           
       })

    })

    incrementScore = num => {
       score +=num;
       scoreText.innerText = score;
    }




   /*function getNewQuestion() {
      if(availableQuestions.length === 0  || questionsCounter > MAX_QUESTIONS) {
         localStorage.setItem('mostRecentScore', score);
   
         return window.location.assign('end.html');   /* "/end.html" was used in the video tutorial */ 
  // }




/* We need to avoid creating Global variables as much as possible because they can be overwritten
 unknowingly so we are containing our variables within the different functions i.e local scopes so
that's why functions come in handy */

/*function runGame() {

}

function checkUserAnswer() {
    
}

function giveSystemAnswer() {
    
}

function incrementRightAnswerScore() {
    
}

function incrementWrongAnswerScore() {
    
}

function displayQuestion() {

    
}  */

/*let questionsElement = document.getElementById("questions-area");
let answersElement = document.getElementById("answers-area"); */
/*let answersElement = document.getElementsByClassName("allAnswers"); */

/*let myData =  
[{
  question: 'I kept your food on the ------------------.',
  answers: ['tabel', 'tabule', 'table', 'tablet'] 
}, 
{
  question: 'She is a very ----------------------- lady.',
  answers: ['optimistik', 'optamistic', 'optimicite', 'optimistic']
}, 
{
   question: 'An act of ---------------- is dangerous.',
   answers: ['rebellion', 'rebelion', 'rebbellion', 'rebelione'] 
}, 
{
   question: 'My friend made a very ---------------- meal.',
   answers: ['dilisious', 'delicious', 'dilicious', 'deliciouce'] 
}, 
{
   question: 'I am very ---------------- at the attitude of the staff.',
   answers: ['disapointed', 'disappointed', 'dissappointed', 'dicappointed'] 
}, 
{
   question: 'I attended a  ---------------- party last weekend.',
   answers: ['suprise', 'surprice', 'sorprice', 'surprise'] 
}, 
{
   question: 'My colleague made a fantastic  ----------------.',
   answers: ['propocition', 'proposition', 'propositione', 'propocision'] 
}, 
{
   question: 'The company adopted a very ---------------- approach.',
   answers: ['pragmatik', 'pragmatice', 'pragmmatic', 'pragmatic'] 
}, 
{
   question: 'My daughter is the ---------------- of the famous award.',
   answers: ['recipient', 'resipient', 'ressipient', 'recepient'] 
}, 
{
   question: 'The immense ---------------- of the outgoing president was recognised.',
   answers: ['contribiution', 'contribution', 'contrebution', 'contrebutione'] 
}]; */


   
  

   
  
      








  


    

