
// Ноды глобально
let pageBody = document.querySelector('.page__body');






// Вывод неправильных букв
function getErrorPressingLetter(ErrorLetter, mistakes) {
    // Нода вывода буквы
    let outputErrorLetter = document.querySelector('.content__letter');
    let valueIputLetter = ErrorLetter.join(', ')
    outputErrorLetter.textContent = valueIputLetter;

    if (mistakes >= 6) {
        pageBody.classList.add('try-again');
        console.log('Добавился класс на Page');
    }
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


// Функция отслеживания нажатия клавиши
function getDownInput(myWord) {
    // Слушатель на клавиши 
    getEventListener(myWord);
}

// Загадать слово
const word = [
    'Медведь',
    'Тигр',
    'Красота',
];

// Функция получения слова
let getRandomWord = function (arr) {
    let arrLength = arr.length;
    let randomNumber = Math.floor(Math.random(0, 1) * arrLength);

    return arr[randomNumber];
}


////// –––––––––––––––––––––––––––––––––– //////
// Функция начала игры
function startGame() {
    let myWord = getRandomWord(word);
    console.log(myWord);
    getDownInput(myWord);
}

startGame();