const problemElement = document.querySelector('.problem');
const ourForm = document.querySelector('.our-form');
const ourField = document.querySelector('.our-field');
const pointsNeeded = document.querySelector('.points-needed');
const mistakesAllowed = document.querySelector('.mistakes-allowed');
const progressBar = document.querySelector('.section-sm');
const endMessage = document.querySelector('.end-message');
const resetButton = document.querySelector('.reset-button');
const displayMessage = document.querySelector('.display-message');

let state = {
    score: 0,
    wrongAnswers: 0,
};

function updateProblem() {
    state.currentProblem = generateProblem();
    problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`;

    ourField.value = '';
    ourField.focus();
}
updateProblem();

function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1));
}
function generateProblem() {
    return {
        numberOne: generateNumber(10),
        numberTwo: generateNumber(10),
        operator: ['+', '-', 'x'][generateNumber(2)],
    };
}
ourForm.addEventListener('submit', handleSubmit);
var textnode;

function handleSubmit(e) {
    e.preventDefault();
    let correctAnswer;
    const p = state.currentProblem;
    if (p.operator == '+') correctAnswer = p.numberOne + p.numberTwo;
    if (p.operator == '-') correctAnswer = p.numberOne - p.numberTwo;
    if (p.operator == 'x') correctAnswer = p.numberOne * p.numberTwo;

    function checkValue() {
        const inputValue = ourField.value;
        const regex = /^-?\d+$/;
        const isDigit = regex.test(inputValue);

        if (isDigit) {
            displayMessage.textContent = '';
            if (inputValue == correctAnswer) {
                state.score++;
                pointsNeeded.textContent = 5 - state.score;
                updateProblem();
                renderProgressBar();
                checkLogic();
            } else {
                state.wrongAnswers++;
                mistakesAllowed.textContent = 2 - state.wrongAnswers;
                problemElement.classList.add('is-animated-wrong');
                textnode.textContent = '';
                ourField.value = '';
                checkLogic();
                setTimeout(
                    () => problemElement.classList.remove('is-animated-wrong'),
                    331
                );
            }
        } else {
            state.wrongAnswers++;
            displayMessage.textContent = 'please choose a number';
            mistakesAllowed.textContent = 2 - state.wrongAnswers;
            problemElement.classList.add('is-animated-wrong');
            checkLogic();
            ourField.value = '';
            setTimeout(() => (displayMessage.textContent = ''), 1000);
        }
    }
    checkValue();
}

function checkLogic() {
    if (state.score == 5) {
        endMessage.textContent = 'Congratulation, u won';
        document.body.classList.add('overlay-is-open');
        setTimeout(() => resetButton.focus(), 331);
    }
    if (state.wrongAnswers === 2) {
        endMessage.textContent = 'sorry u lost';
        document.body.classList.add('overlay-is-open');
        setTimeout(() => resetButton.focus(), 331);
    }
}
resetButton.addEventListener('click', resetGame);

function resetGame() {
    document.body.classList.remove('overlay-is-open');
    updateProblem();
    state.score = 0;
    state.wrongAnswers = 0;
    pointsNeeded.textContent = 5;
    mistakesAllowed.textContent = 2;
    progressBar.textContent = '';
}
// progress bar
function renderProgressBar() {
    progressBar.style.transform = `scaleX(1)`;
    textnode = document.createTextNode('( ͡° ͜ʖ ͡°) ');
    progressBar.appendChild(textnode);
}
