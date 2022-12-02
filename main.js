
// Ноды глобально
let pageBody = document.querySelector('.page__body');






// Кол-во проигрышей
let loseGame = 0;

// Проигрыш
function loseMyGame(mistakes) {
    // Выводит результат сыгранных игр
    let loseItemNode = document.querySelector('.content__result--lose');

    // Показывает человека при ошибке
    let arrPosition = mistakes - 1;
    let humanLimb = document.querySelectorAll('.content__base-el')
    if (humanLimb[arrPosition]) {
        humanLimb[arrPosition].style.display = 'block';
    }

    // Проверка на кол-во ошибок: если = 6, то проигрыш
    if (mistakes == 6) {
        // Сообщение о проирыше
        let maskLoseNode = document.querySelector('.content__mask-lose');
        maskLoseNode.classList.remove('content__mask-lose--close');

        // Добавляет класс на Body
        pageBody.classList.add('try-again');
        console.log('Добавился класс на Page');

        // Прибавляет проигрыш
        loseGame++;

        // Выводит кол-во проигрышей
        loseItemNode.textContent = loseGame;
    }
}


// Вывод неправильных букв
function getErrorPressingLetter(ErrorLetter) {
    // Нода вывода буквы
    let outputErrorLetter = document.querySelector('.content__letter');
    let valueIputLetter = ErrorLetter.join(', ')
    outputErrorLetter.textContent = valueIputLetter;
}

// Кол-во ошибок
let mistakes = 0;
let ErrorLetter = [];

// Сравнивает введенную букву и загаданное слово
function compareArrays(pressingLetter, myWord) {
    console.log(pressingLetter);
    console.log(myWord);

    let toUpperCaseWord = myWord.toUpperCase();
    let arrOfMyWord = toUpperCaseWord.split('');

    console.log(arrOfMyWord);

    // Проверка есть ли в загаданном слове введеная буква
    if (arrOfMyWord.includes(pressingLetter)) {
        console.log(`Слово ${myWord} содержит ${pressingLetter}`);
    } else {
        if (!ErrorLetter.includes(pressingLetter)) {
            // Прибавляет ошибку
            mistakes++;
            console.log(mistakes);
            console.log(`Слово ${myWord} не содержит ${pressingLetter}`);

            // Добавляет неповторяющуюся букву в массив с ошибками
            ErrorLetter.push(pressingLetter);
            console.log(ErrorLetter);

            // Функция вывод неправильных букв
            getErrorPressingLetter(ErrorLetter, mistakes);

            // Функция подсчета проигрышей
            loseMyGame(mistakes);
        }
    }
}


// Отслеживает нажатые буквы
function getEventListener(myWord) {
    // Нажатие на клавиатуру
    function keydownEvent(e) {
        // Нода ошибки языка
        let errorLanguage = document.querySelector('.content__error-language');

        // Ввод только русских букв
        let regexp = /[а-яё]/i;

        if (regexp.test(e.key)) {
            // Нажатие на клавиши в верхнем регистре
            let toUpperCaseLetter = e.key.toUpperCase();

            // Функция сравнения введенной буквы и слова
            compareArrays(toUpperCaseLetter, myWord);

            // Удаляет слушатель при добавлении класса try-again
            if (pageBody.classList.contains('try-again')) {
                document.removeEventListener('keydown', keydownEvent);
            }

            // Скрывает ошибку языка
            errorLanguage.style.display = 'none';

        } else {
            // Показывает ошибку языка
            errorLanguage.style.display = 'flex';
        }
    }

    document.addEventListener('keydown', keydownEvent);
}


// Загадать слово
const word = [
    ['Большой, сильный и бурый. Кто это?', 'Медведь'],
    ['Большой, сильный и быстрый. Очень клыкастый?', 'Тигр'],
    ['Как пела Полина Гагарина. Без чего не выжить человечеству?', 'Красота'],
];

// Функция получения слова
let getRandomWord = function (arr) {
    let arrLength = arr.length;
    let randomNumber = Math.floor(Math.random(0, 1) * arrLength);

    return arr[randomNumber][2];
}

// Скрывает человека
function hideMan() {
    let liNode = document.querySelectorAll('.content__base-el')

    for (let i = 0; i < liNode.length; i++) {
        liNode[i].style.display = 'none';
    }
}


////// –––––––––––––––––––––––––––––––––– //////
// Функция начала игры
function startGame() {
    let myWord = getRandomWord(word);
    console.log(myWord);
    hideMan();
    getEventListener(myWord);
}

startGame();