window.onload = function() {
    const userScore = localStorage.getItem('userScore');
    if (userScore) {
        document.getElementById("dynamic-score").textContent = userScore;
    } else {
        document.getElementById("dynamic-score").textContent = "Баллы не найдены";
    }
};
