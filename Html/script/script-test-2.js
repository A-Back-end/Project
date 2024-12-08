const questions = [
    { question: "Какая из перечисленных кислот является самой сильной?", options: ["Серная кислота (H₂SO₄)", "Фтороводородная кислота (HF)", "Азотная кислота (HNO₃)", "Перхлорная кислота (HClO₄)"], correctAnswer: "Перхлорная кислота (HClO₄)" },
    { question: "Какой из элементов имеет наименьшую энергию ионизации?", options: ["Литий (Li)", "Рубидий (Rb)", "Кальций (Ca)", "Магний (Mg)"], correctAnswer: "Рубидий (Rb)" },
    { question: "Какая молекула имеет наиболее полярную связь?", options: ["CO₂", "H₂O", "NH₃", "HF"], correctAnswer: "HF" },
    { question: "В каком из процессов участвует каталитический конвертер?", options: ["Синтез аммиака (Haber-Bosch)", "Разложение перекиси водорода (H₂O₂)", "Очистка выхлопных газов", "Производство серной кислоты"], correctAnswer: "Очистка выхлопных газов" },
    { question: "Какой тип гибридизации характерен для углерода в молекуле этилена (C₂H₄)?", options: ["sp", "sp²", "sp³", "sp³d"], correctAnswer: "sp²" },
    { question: "Какой раствор будет иметь наибольшую концентрацию ионов H⁺ при одинаковой молярной концентрации?", options: ["CH₃COOH", "HNO₃", "H₂CO₃", "H₃PO₄"], correctAnswer: "HNO₃" },
    { question: "Что произойдёт при добавлении катализатора в обратимую химическую реакцию?", options: ["Увеличится только скорость прямой реакции", "Увеличится только скорость обратной реакции", "Увеличатся скорости прямой и обратной реакции", "Изменится равновесное состояние"], correctAnswer: "Увеличатся скорости прямой и обратной реакции" },
    { question: "Какой оксид является амфотерным?", options: ["SO₃", "Al₂O₃", "CaO", "CO₂"], correctAnswer: "Al₂O₃" },
    { question: "Какое вещество используется в качестве главного окислителя в реактивном топливе?", options: ["Гидразин (N₂H₄)", "Пероксид водорода (H₂O₂)", "Дихромат калия (K₂Cr₂O₇)", "Жидкий кислород (O₂)"], correctAnswer: "Жидкий кислород (O₂)" },
    { question: "Какая из следующих реакций представляет собой реакцию диспропорционирования?", options: ["2H₂ + O₂ → 2H₂O", "2KClO₃ → 2KCl + 3O₂", "2H₂O₂ → 2H₂O + O₂", "Cl₂ + 2NaOH → NaCl + NaClO + H₂O"], correctAnswer: "Cl₂ + 2NaOH → NaCl + NaClO + H₂O" }
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
    window.location.href = "report2.html"; 
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