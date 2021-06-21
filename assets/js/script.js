/**
 * The document.querySelector() & document.querySelectorAll() returns the first element within the document that matches the 
specified selector or group of selectors. They both return null if no matches are found.
 */
const question = document.querySelector('#question');  
const options = Array.from(document.querySelectorAll('.option-text'));  
const progressText = document.querySelector('#progressText');   
const scoreText = document.querySelector('#score'); 
const progressLevelFull = document.querySelector('#progressLevelFull'); 

let goodCommendation = document.querySelector('#goodCommendation');
let badCommendation = document.querySelector('#badCommendation');

let currentQuestion = {}
let availableQuestions = []
let questionCounter = 0
let score = 0
let receiveAnswers = true   

/**
 * Declaring variables used for putting sounds into the quiz game.
 */
let correctSound = new Audio("sounds/correct_sound.mp3");
let incorrectSound = new Audio("sounds/incorrect_sound.mp3");


let myQuestions = [ 
{
  question: 'I kept your food on the ------------------.',
  option1: 'tabel',     
  option2: 'tabule',
  option3: 'table',
  option4: 'tablet',
  correctAnswer: 3,     
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

const MAX_QUESTIONS = 11;
const SCORE_POINTS = 100;
let totalScoreOfGradePercent = (SCORE_POINTS * MAX_QUESTIONS) - SCORE_POINTS


function startQuiz() {
   questionCounter = 0;
   score = 0;
   availableQuestions = [...myQuestions];
   getNewQuestion();
}

/** the 1st if statement in the function below keeps track of the score, if there are no more 
 * questions or the question counter is greater than the max number of questions (i.e 10), then 
 * the local storage which takes 2 arguments i.e "'mostRecentScore'" which is a string that specifies
 * the name of the key that you want to set the value of and the variable called "score" which is also
 * a string that specifies the value of the key that you want to set the value of, calls the setItem() 
 * method to set this value for onward use. */
 

function getNewQuestion() {      // getNewQuestion function starts
   if(availableQuestions.length === 0  || questionCounter > MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score) 
   }

   /* These 2 lines of code below will increment questionCounter and display the message: "Question 1 of 
   10" and the number before 'of' updates itself as user progresses through the questions */
   questionCounter++;
   progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
   progressLevelFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

   const randomQuestionIndex = Math.floor(Math.random() * availableQuestions.length);  
   currentQuestion = availableQuestions[randomQuestionIndex]  //This will randomly generate the questions.
   question.innerText = currentQuestion.question   //This will display the randomly generated questions to the user in sequence. 


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
           const selectedOption = e.target     
           const selectedResult = selectedOption.dataset['number'] 

           let optionToApply;
           if (selectedResult == currentQuestion.correctAnswer) {
             optionToApply = 'rightAnswer';
           } else {
            optionToApply = 'wrongAnswer';
           }


           let finalScoreCounter = 0;
           if (optionToApply === 'rightAnswer') {
               incrementScore(SCORE_POINTS) 
               correctSound.play()
               finalScoreCounter += score
           } else {
              goodCommendation.innerText = ``
              incorrectSound.play()
              finalScoreCounter += score
           }


           if(availableQuestions.length === 0  || questionCounter > MAX_QUESTIONS) {

            if (finalScoreCounter > 500 && finalScoreCounter <= 1000)  {
               goodCommendation.innerText = `Congratulations buddie😊!!! Your Final score is ${score} out of ${totalScoreOfGradePercent}, You are a Pro!`;
            } else {    //less than or equal to 500
               badCommendation.innerText = `Oops, it's a fail buddie😭!!! Your Final score is ${score} out of ${totalScoreOfGradePercent}, Better Luck Next Time!`;
            }
            
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


   






   
  

   
  
      








  


    

