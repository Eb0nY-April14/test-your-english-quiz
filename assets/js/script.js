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

function runGame() {

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

    
}

let question = document.getElementById("question-area");

let questionHTML = ` [
    {
      question: "I kept your food on the ------------------.",
      answers: {
        a. "tabel",
        b. "tablet",
        c. "table",
        d. "tabble"
      },
      correctAnswer: "c"
    },
    {
      question: "She is a very ----------------------- lady.",
      answers: {
        a. "optimistik",
        b. "optamistic",
        c. "optimicite",
        d. "optimistic"
      },
      correctAnswer: "d"
    },
    {
        question: "An act of ---------------- is dangerous.",
        answers: {
          a: "rebellion",
          b: "rebelion",
          c: "rebbellion",
          d: "rebelione"
        },
        correctAnswer: "a"
      },
      {
        question: "The food I bought at the supermarket tasted ------------------------.",
        answers: {
          a: "disgusting",
          b: "disgausten",
          c: "disgorsting",
          d: "disgustine"
        },  
        correctAnswer: "a"
      },
      {
        question: "I am very ------------------ at the salesgirl's attitude.",
        answers: {
          a: "disapointed",
          b: "disappointed",
          c: "dissappointed",
          d: "dicappointed"
        },
        correctAnswer: "b"
      },
      {
        question: "My spouse's ---------------- party was fun.",
        answers: {
          a: "rebellion",
          b: "rebelion",
          c: "rebbellion",
          d: "rebelione"
        },
        correctAnswer: "a"
      },
      {
        question: "An act of ---------------- is dangerous",
        answers: {
          a: "rebellion",
          b: "rebelion",
          c: "rebbellion",
          d: "rebelione"
        },
        correctAnswer: "a"
      },
      {
        question: "An act of ---------------- is dangerous",
        answers: {
          a: "rebellion",
          b: "rebelion",
          c: "rebbellion",
          d: "rebelione"
        },
        correctAnswer: "a"
      },
      {
        question: "An act of ---------------- is dangerous",
        answers: {
          a: "rebellion",
          b: "rebelion",
          c: "rebbellion",
          d: "rebelione"
        },
        correctAnswer: "a"
      },
      {
        question: "An act of ---------------- is dangerous",
        answers: {
          a: "rebellion",
          b: "rebelion",
          c: "rebbellion",
          d: "rebelione"
        },
        correctAnswer: "a"
      }
    ];


`