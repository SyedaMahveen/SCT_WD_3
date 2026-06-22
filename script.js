const quizData = [

{
question:"Which language is used to style web pages?",
answers:[
"HTML",
"CSS",
"Python",
"Java"
],
correct:1
},

{
question:"Which language is used for web interactivity?",
answers:[
"C++",
"JavaScript",
"SQL",
"PHP"
],
correct:1
},

{
question:"What does HTML stand for?",
answers:[
"Hyper Text Markup Language",
"High Text Machine Language",
"Hyper Transfer Markup Language",
"Home Tool Markup Language"
],
correct:0
},

{
question:"Which company developed JavaScript?",
answers:[
"Microsoft",
"Google",
"Netscape",
"Apple"
],
correct:2
},

{
question:"Which CSS property changes text color?",
answers:[
"font-style",
"text-color",
"color",
"background"
],
correct:2
}

];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const quizEl = document.getElementById("quiz");

function loadQuestion(){

clearInterval(timer);

timeLeft = 15;
startTimer();

const q = quizData[currentQuestion];

questionEl.textContent = q.question;

document.getElementById(
"questionCounter"
).textContent =
`Question ${currentQuestion+1}/${quizData.length}`;

document.getElementById(
"progressBar"
).style.width =
`${((currentQuestion+1)/quizData.length)*100}%`;

answersEl.innerHTML="";

q.answers.forEach((answer,index)=>{

const btn=document.createElement("button");

btn.classList.add("answer-btn");

btn.textContent=answer;

btn.onclick=()=>selectAnswer(index);

answersEl.appendChild(btn);

});
}

function selectAnswer(selected){

const correct =
quizData[currentQuestion].correct;

const buttons =
document.querySelectorAll(".answer-btn");

buttons.forEach(btn=>btn.disabled=true);

if(selected===correct){
score++;
buttons[selected].classList.add("correct");
}
else{
buttons[selected].classList.add("wrong");
buttons[correct].classList.add("correct");
}
}

function startTimer(){

document.getElementById("timer").textContent =
`${timeLeft}s`;

timer=setInterval(()=>{

timeLeft--;

document.getElementById("timer").textContent =
`${timeLeft}s`;

if(timeLeft===0){

clearInterval(timer);

currentQuestion++;

if(currentQuestion<quizData.length){
loadQuestion();
}
else{
showResult();
}

}

},1000);
}

nextBtn.addEventListener("click",()=>{

currentQuestion++;

if(currentQuestion<quizData.length){
loadQuestion();
}
else{
showResult();
}

});

function showResult(){

quizEl.classList.add("hidden");

resultEl.classList.remove("hidden");

document.getElementById("score").textContent =
`${score} / ${quizData.length}`;

}

function restartQuiz(){

currentQuestion=0;
score=0;

resultEl.classList.add("hidden");
quizEl.classList.remove("hidden");

loadQuestion();

}

loadQuestion();
