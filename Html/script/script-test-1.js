const questions = [
    { question: "Укажите реакцию ионного замещения:", options: ["2NaOH + CuSO4 => Cu(OH)2 + Na2SO4", "MnO2 + 2H2O2 => MnO2 + 2H2O + O2", "Fe2O3 + 3Mg => 3MgO + 2Fe", "Al + CuSO4 => AlSO4 + Cu"], correctAnswer: "Fe2O3 + 3Mg => 3MgO + 2Fe", },
    { question: "Самый горючий элемент:", options: ["K", "P", "O", "Na", "S"], correctAnswer: "O" },
    { question: "Пассивация это:", options: ["Создание оболочки из устойчивого нерастворимого соединения для защиты от коррозии", "Создание тонкой оболочки из коррозий стойкого металла для защиты от коррозии", "Тонкая оксидная плёнка на металле", "Нерастворимое соединение, добавляемое в сплав металлов для защиты от коррозии"], correctAnswer: "Создание оболочки из устойчивого нерастворимого соединения для защиты от коррозии" },
    { question: "Из какой руды чаще всего добывают железо:", options: ["Цинковая обманка", "Гематит", "Гадолинит", "Боксит"], correctAnswer: "Гематит" },
    { question: "Объясните использование циркония в АЭС:", options: ["Поглощает нейтроны", "Устойчив от воздействия окислителя", "Прочность", "Не поглощает нейтроны"], correctAnswer: "Не поглощает нейтроны" },
    { question: "Кислоты-окислители:", options: ["HCl HNO3", "H2SO4 HCl", "H2SO4 HI", "H2SO4 HNO3", "HClO3 HF"], correctAnswer: "H2SO4 HNO3" },
    { question: "Аллотропические формы углерода:", options: ["Уголь, алмаз, графит", "Чёрный уголь, белый уголь, графит", "Угольная кислота, элементарный уголь", "Уголь, карбид, алмаз, графит"], correctAnswer: "Уголь, алмаз, графит" },
    { question: "Аллотропические формы фосфора:", options: ["Металлический, жидкий", "Красный, белый, оранжевый", "Чёрный, белый, красный", "Вулканический, красный, белый"], correctAnswer: "Чёрный, белый, красный" },
    { question: "Что такое органическая химия:", options: ["Химия, занимающаяся изучением соединений из неметаллов", "Химия, занимающаяся изучением длинных соединений", "Химия, занимающаяся изучением природных веществ", "Химия, занимающаяся изучением соединений водорода", "Химия, занимающаяся изучением соединений углерода"], correctAnswer: "Химия, занимающаяся изучением соединений углерода" },
    { question: "Объясните, почему соль убивает моллюсков:", options: ["По принципу диффузии", "По принципу осмоса", "По принципу абсорбции", "По принципу диспропорционирования", "Кислая соль"], correctAnswer: "По принципу осмоса" }
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
    window.location.href = "report1.html"; 
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