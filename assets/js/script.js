// Wait for the DOM to finish loading before running the game.
// Get the button elements and add event listeners to them.

//This below will listen for the DOM content to be loaded before it executes the function in this code block.
document.addEventListener("DOMContentLoaded", function()  {    //This waits for the DOM to finish loading before you start running your code.
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

let questionsElement = document.getElementById("questions-area");
let answersElement = document.getElementById("answers-area");

let myData =  
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
   answers: ['disgorsting', 'disgusting', 'disgausting', 'disgusten'] 
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
}];

/*<p class="questions" id="question1">
      1- Quien es el único jugador de futbol argentino que tiene una serie en Netflix?</p>
    <input type="radio" name="answer1" value="wrong">Diego Maradona
    <input type="radio" name="answer1" value="correct">Carlos Tevez
    <input type="radio" name="answer1" value="wrong">Lionel Messi
    <hr></hr> */

   // let html = ``
    
 

   /*let answerA = document.getElementById("answerA");
   let answerB = document.getElementById("answerB");
   let answerC = document.getElementById("answerC");
   let answerD = document.getElementById("answerD"); */


let randomIndex = Math.floor(Math.random() * myData.length);
for (let i = 0; i < myData.length; i++)  {  //start of question for loop
  questionsElement.innerHTML = myData[randomIndex].question; 
}

  answersElements = myData[randomIndex].answers;  //This returns an array of strings

  

   
  for(let j = 0; j < answersElements.length; j++) {  //same as for (let answerElement of answersElements)
    let answer = "<p>" + answersElements[j] + "</p>";
    answersElement.innerHTML += answer;
  } 

  

  



//}
  
  

  

      

//let AnswerCount = 0;
//let answersLength = myData[AnswerCount].answers;






  


    

