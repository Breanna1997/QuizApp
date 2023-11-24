const questions = [
    {
        // these are arrays of questions and answers
        question: "How do you create a hyperlink in HTML, and what is the purpose of the target attribute?",
        answers: [
            {text: 'use the &lt;a&gt; (anchor) element. The href attribute specifies the URL, and the target attribute, when set to blank opens the link in a new tab or window', correct: true},
            {text: " use the &lt;ul&gt; element. The href attribute specifies the URL, and the target attribute, when set to blank opens the link in a new tab or window", correct: false},
            {text: " use the &lt;li&gt; element. The href attribute specifies the URL, and the target attribute, when set to blank opens the link in a new tab or window", correct: false},
            {text: " use the &lt;ol&gt; element. The href attribute specifies the URL, and the target attribute, when set to blank opens the link in a new tab or window", correct: false},

        ]
    },
    {
        question: " Explain the difference between margin and padding in CSS.",
        answers: [
            {text: "In CSS, margin is the space outside an element, while padding is the space inside an element. Margin is typically used to create space inside elements, while padding is used to create space outside an element.", correct: false},
            {text: " In CSS, justify-content is the space outside an element, while padding is the space inside an element. Margin is typically used to create space between elements, while width is used to create space within an element.", correct: false},
            {text: "In CSS, margin is the space outside an element, while padding is the space inside an element. Padding is typically used to create space between elements, while margin is used to create space within an element.", correct: false},
            {text: " In CSS, margin is the space outside an element, while padding is the space inside an element. Margin is typically used to create space between elements, while padding is used to create space within an element.", correct: true},

        ]
    },
    {
        question: "What is the purpose of the document.getElementById method in JavaScript?.",
        answers: [
            {text: "The document.getElementByClass method is used to retrieve an HTML element based on its class attribute.", correct: false},
            {text: "The document.getElementById method is used to retrieve an HTML element based on its id attribute.", correct: true},
            {text: "The document.getElementById method is used to retrieve an CSS element based on its id attribute.", correct: false},
            {text: "The document.getClassList method is used to retrieve an HTML element based on its class attribute.", correct: false},

        ]
    },
    {
        question: "Which of the following code snippets correctly implements a simple webpage with a button that, when clicked, changes the background color of the webpage using JavaScript, and the button changes its color on hover?",
        answers: [
            {text: "Defines the button styling in an external CSS file and adds a JavaScript file to handle the color change on button click.", correct: true},
            {text: "Uses the button element with inline event handling and styling in the HTML file.", correct: false},
            {text: "Styles the button with inline styles in the HTML file and uses inline JavaScript for the color change.", correct: false},
            {text: "Adds button styling and color change logic in a single JavaScript file.", correct: false},

        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
// this sets all the questions and the score to 0
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
// this functions will show the questions
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex +1;
    questionElement.innerHTML = questionNum + "." + currentQuestion.question;
// this loops through each answer and determines if its correct 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
// this resets the all answers  
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
// ensures the selected answer is correct and increment the score
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";//e.currentTarget.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    // disable all buttons once a button a selected
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}
// show a score based on the answers that were selected 
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again.";
    nextButton.style.display = "block";
}
// goes to the next questions
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();

//e.currentTarget