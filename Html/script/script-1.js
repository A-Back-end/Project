const submitButton = document.querySelector('.download');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    window.location.href = 'index.html';
});
