const questions = [
    { question: "Формула углекислого газа:", options: ["CO2", "CO", "CO3", "HCO2"], correctAnswer: "CO2" },
    { question: "Принцип действия катализаторов:", options: ["Замедление химической реакции", "Абсорбция", "Ускорение химической реакции", "Разложение химических соединений"], correctAnswer: "Ускорение химической реакции" },
    { question: "Что такое осмос?", options: ["Процесс плавного перехода жидкости", "Вспасование жидкости", "Переход молекул в наименьшую концентрацию", "Переход молекул в небольшую концентрацию"], correctAnswer: "Переход молекул в наименьшую концентрацию" },
    { question: "Формула хлороводородной кислоты:", options: ["HClO", "HClO2", "HCl", "HClO3", "HClO4"], correctAnswer: "HCl" },
    { question: "Ацетаты — соли какой кислоты?", options: ["Серной", "Соляной", "Муравьиной", "Уксусной", "Ацетоновой"], correctAnswer: "Уксусной" },
    { question: "Диссоциация Na2CO3 в воде:", options: ["2Na+ CO3²-", "Na²+ CO3-", "2Na+ 2CO²-", "2Na+ HCO2-"], correctAnswer: "2Na+ CO3²-" },
    { question: "Какую среду показывают следующие реактивы: CsOH, Na2CO3, NaHCO3?", options: ["Кислую", "Щелочную", "Нейтральную"], correctAnswer: "Щелочную" },
    { question: "Укажите амфотерные гидроксиды:", options: ["Al(OH)3", "NaOH", "Zn(OH)2", "KOH", "Mn(OH)2"], correctAnswer: "Al(OH)3" },
    { question: "При горении органические соединения оставляют:", options: ["Газ и воду", "Твёрдый продукт реакции и газ", "Газ, вода и остаток", "Воду и растворимое соединение", "Газ и органику"], correctAnswer: "Газ и воду" },
    { question: "Виды химических реакций:", options: ["Разложение, соединение, обмен, замещение, горение", "Коррозия, окисление, смешение, разложение", "Горение, разложение, разъедание, коррозия"], correctAnswer: "Разложение, соединение, обмен, замещение, горение" }
];

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;
document.getElementById("total-questions").textContent = totalQuestions;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question-text").textContent = currentQuestion.question;
    const answerOptions = document.getElementById("answer-options");
    answerOptions.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        li.dataset.answer = option;
        answerOptions.appendChild(li);
    });

    document.getElementById("current-question").textContent = currentQuestionIndex + 1;
}

function selectAnswer(event) {
    const selected = event.target;
    if (selected.tagName === "LI") {
        const previouslySelected = document.querySelector(".answer-panel ul .selected");
        if (previouslySelected) {
            previouslySelected.classList.remove("selected");
        }
        selected.classList.add("selected");
    }
}
function nextQuestion() {
    const selectedOption = document.querySelector(".answer-panel ul .selected");
    if (!selectedOption) {
        alert("Please select an answer before moving to the next question.");
        return;
    }

    const selectedAnswer = selectedOption.dataset.answer;
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        score += 150;  
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        loadQuestion();
    } else {
        document.getElementById("quiz-container").style.display = "none";
        document.getElementById("next-button").style.display = "none";
        document.getElementById("submit-button").style.display = "inline-block";
    }
}

function submitQuiz() {
    localStorage.setItem('userScore', score);  
    window.location.href = "report.html"; 
}


let timeLeft = 15 * 60; 
const timerElement = document.getElementById("timer");

function startTimer() {
    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Time's up!";
            submitQuiz();  
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            timeLeft--;
        }
    }, 1000);
}


startTimer();
loadQuestion();