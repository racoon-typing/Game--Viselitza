
// Ноды глобально
let pageBody = document.querySelector('.page__body');



// Кол-во проигрышей
let winGame = 0;

// Функция подсчета побед
function winMyGame(ArrOfСorrectLetter, arrOfMyWord) {
    // Выводит результат сыгранных игр
    let winItemNode = document.querySelector('.content__result--win');

    console.log(ArrOfСorrectLetter);
    console.log(arrOfMyWord);

    // Кол-во совпавших букв
    let equalLetter = 0;
    // Индекс совпавшей буквы
    let numOfEqualLetter;

    // Находит совпадающие буквы
    let index = -1;
    arrOfMyWord.forEach(function (elementOfMyWord) {
        index++;
        ArrOfСorrectLetter.forEach(function (elementOfСorrectLetter) {
            if (JSON.stringify(elementOfMyWord) === JSON.stringify(elementOfСorrectLetter)) {
                // Индекс совпавшей буквы
                numOfEqualLetter = index;

                equalLetter++;
                console.log(equalLetter);
                // console.log(numOfEqualLetter);




            }
        });
    });

    if (equalLetter == arrOfMyWord.length) {
        // Добавляет класс на Body
        pageBody.classList.add('try-again');
        console.log('Добавился класс на Page');

        // Прибавляет проигрыш
        winGame++;

        // Выводит кол-во выигрышей
        winItemNode.textContent = winGame;
    }
}


// Кол-во проигрышей
let loseGame = 0;

// Функция подсчета проигрышей
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
function getErrorPressingLetter(ArrOfErrorLetter) {
    // Нода вывода буквы
    let outputErrorLetter = document.querySelector('.content__letter');
    let valueIputLetter = ArrOfErrorLetter.join(', ')
    outputErrorLetter.textContent = valueIputLetter;
}

// Кол-во ошибок
let mistakes = 0;
let ArrOfErrorLetter = [];
let ArrOfСorrectLetter = [];

// Сравнивает введенную букву и загаданное слово
function compareArrays(pressingLetter, myWord) {
    console.log(pressingLetter);
    console.log(myWord);

    let toUpperCaseWord = myWord.toUpperCase();
    let arrOfMyWord = toUpperCaseWord.split('');

    console.log(arrOfMyWord);

    // Проверка есть ли в загаданном слове введеная буква
    if (arrOfMyWord.includes(pressingLetter)) {

        if (!ArrOfСorrectLetter.includes(pressingLetter)) {
            console.log(`Слово ${myWord} содержит ${pressingLetter}`);

            // Добавляет неповторяющуюся букву в массив с правильные буквы
            ArrOfСorrectLetter.push(pressingLetter);

            winMyGame(ArrOfСorrectLetter, arrOfMyWord);
        }
    } else {
        if (!ArrOfErrorLetter.includes(pressingLetter)) {
            // Прибавляет ошибку
            mistakes++;
            console.log(`Слово ${myWord} не содержит ${pressingLetter}`);

            // Добавляет неповторяющуюся букву в массив с ошибками
            ArrOfErrorLetter.push(pressingLetter);

            // Функция вывод неправильных букв
            getErrorPressingLetter(ArrOfErrorLetter, mistakes);

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

function giveOutputQuestion(myQuestion) {
    let questionText = document.querySelector('.content__question-text');

    // Выводит текст на страницу
    questionText.textContent = myQuestion;
}


// Массив слов для загадки
const ArrOfMystery = [
    ['Большой, сильный и бурый. Кто это?', 'Медведь'],
    ['Большой, сильный и быстрый. Очень клыкастый?', 'Тигр'],
    ['Как пела Полина Гагарина. Без чего не выжить человечеству?', 'Красота'],
];

// Функция получения рандомной цифры
function getRandomArr(arr) {
    let arrLength = arr.length;
    let randomNumber = Math.floor(Math.random(0, 1) * arrLength);

    return arr[randomNumber];
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
    // Поучаю мой массив
    let myRandomArr = getRandomArr(ArrOfMystery);

    // Поучаю слово для загадки из своего массива
    let myWord = myRandomArr[1];

    // Поучаю вопрос для загадки из своего массива
    let myQuestion = myRandomArr[0];
    console.log(myQuestion);
    console.log(myWord);

    // Прячет человека
    hideMan();

    // Вывод вопрос
    giveOutputQuestion(myQuestion);

    // Слушательна ввод букв
    getEventListener(myWord);
}

startGame();
