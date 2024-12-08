const form = document.querySelector('.form');
const submitButton = document.querySelector('.submit');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputs = form.querySelectorAll('input');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red'; 
        } else {
            input.style.borderColor = '';
        }
    });
    if (isValid) {
        window.location.href = 'test.html';
    } else {
        alert('Please fill in all required fields.');
    }
});
