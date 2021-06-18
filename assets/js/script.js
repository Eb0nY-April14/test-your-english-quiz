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

let commendation = document.querySelector('#commendation');
//let badCommendation = document.querySelector('#badCommendation');

let goodCommendation = document.querySelector('#goodCommendation');
let badCommendation = document.querySelector('#badCommendation');

//SCORE_POINTS = 100;
//let totalScoreOfGradePercent = SCORE_POINTS * MAX_QUESTIONS


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
let totalScoreOfGradePercent = (SCORE_POINTS * MAX_QUESTIONS)    // - SCORE_POINTS


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
 * a string that specifies the value of the key that you want to set the value of, calls the setItem() 
 * method to set this value. The last statement in this function which is "return window.location.assign()",
 * also a method causes the window to load and display the score(document) at the URL specified which in
 * this case is an html file called "end.html" in order to display the user's overall score to them, this
 * signifies the end of the quiz. 
 * 
 */

function getNewQuestion() {
   if(availableQuestions.length === 0  || questionCounter > MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score) 

      //return window.location.assign('end.html')  /* "/end.html" was used in the video tutorial */ 
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

           //let optionToApply = selectedResult == currentQuestion.correctAnswer ? 'rightAnswer' : 'wrongAnswer'     //classToApply was used in the video
           let optionToApply;
           if (selectedResult == currentQuestion.correctAnswer) {
             optionToApply = 'rightAnswer';
           } else {
            optionToApply = 'wrongAnswer';
           }


           let finalScoreCounter = 0;
           if (optionToApply === 'rightAnswer') {
               incrementScore(SCORE_POINTS)
               goodCommendation.innerText = `Yippee!!! You got the last Question right, You Are doing great buddie!😊`  //${score}
               finalScoreCounter += score
               badCommendation.innerText = ``
           } else {
              goodCommendation.innerText = ``
              badCommendation.innerText = `Oops!!! A miss, Keep at it buddie!😦`
           }

           //let finalResult = document.querySelector('#finalResult');  

            

           if(availableQuestions.length === 0  || questionCounter > MAX_QUESTIONS) {
            //progressText.innerText = ``
            //progressText.innerText = `Question ${questionCounter - 1} of ${MAX_QUESTIONS}`
            if (finalScoreCounter > 500 && finalScoreCounter <= 1000)  {
               //goodCommendation.innerText = ``
               //badCommendation.innerText = ``
               goodCommendation.innerText = `Congratulations buddie😊!!! You got ${score} out of ${totalScoreOfGradePercent} You are a Pro!`;
               console.log("Congratulations buddie😊!!! You got " + score + "out of " + totalScoreOfGradePercent + "You are a Pro!");
               //badCommendation.innerText = ``
            } else {    //less than or equal to 500
               //goodCommendation.innerText = ``
               //badCommendation.innerText = ``
               badCommendation.innerText = `Oops, it's a fail buddie😭!!! You got ${score} out of ${totalScoreOfGradePercent} Better Luck Next Time!`;
               console.log("Oops, it's a fail buddie😭!!! You got " + score + "out of  " + totalScoreOfGradePercent + "Better Luck Next Time!");
            }


        
         
            console.log("Your final Score is " + score) //used this to check my code and it displayed the correct Total Result

             alert("Your final Score is " + score)  //used this to check my code and it displayed the correct Total Result
           }
          

           selectedOption.parentElement.classList.add(optionToApply); //This code adds the right answer to the parent element when the user gets the answer right

           setTimeout(() => {
            selectedOption.parentElement.classList.remove(optionToApply)
            getNewQuestion()

           }, 1000)
           
       })

    })


   function incrementScore(num) {
      score +=num;
      scoreText.innerText = score;
   } 

   startQuiz();


   /********************************************************************************************** */
   /*                                 JAVASCRIPT FOR end.html FILE.                                                            */
   /******************************************************************************************** */

  // const username = document.querySelector('#fullname');  // username = #username was used in the video
  // const saveResultBtn = document.querySelector('#saveResultBtn'); //saveScoreBtn = #saveScoreBtn was used in the video
  // let feedbackResult = document.querySelector('#feedbackResult'); //finalScore = #finalScore was used in the video 
  // feedbackResult.innerText = `Well-done Buddie! Your Total Score is ${finalScoreCounter}`;

   
   //const mostRecentScore = document.querySelector('#mostRecentScore');  

   //let totalResult = localStorage.setItem('mostRecentScore', score);

/*let incrementScoreCounter = 0; 

   function doTotalScore() {
      incrementScore(num)
      //score +=num;
      //scoreText.innerText = score;
      incrementScoreCounter++
      if(incrementScoreCounter === MAX_QUESTIONS) {
         myTotal = incrementScore(num)
      } else {
         //incrementScore(num)
      }
   } 

   doTotalScore() */

//const finalScore = document.querySelector('#score'); 
//feedbackResult.innerText = `Well-done Buddie! Your Total Score is ${finalScoreCounter}`;


//if (finalScore >= 7 && finalScore <= 10) {
   //finalResult.innerText = `Congratulations buddie!!! You got ${finalScore} out of  MAX_QUESTIONS !😊`;
   //finalResult.innerText = finalScore;
//} else if (finalScore >= 4 && finalScore <= 6) { 
  // finalResult.innerText = `Well-done buddie but there's room for improvement!!! You got ${finalScore} out of  MAX_QUESTIONS !😊`;
//} else {
  // finalResult.innerText = `Oops, it's a fail, Please try again!!! You got ${finalScore} out of  MAX_QUESTIONS !😊`;
//}
  







   
  

   
  
      








  


    

