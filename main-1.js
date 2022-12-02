// Начало программы

// Задача
// Удалить слушатель на ввод букв




// Загадать слово
const word = [
    'Медведь',
    'Тигр',
    'Красота',
    'Королева',
    'Машина',
];

let getRandomWord = function (arr) {
    let arrLength = arr.length;
    let randomNumber = Math.floor(Math.random(0, 1) * arrLength);

    return arr[randomNumber];
}

// Загаданное слово
// let myWord = getRandomWord(word);

// Скрывает человека
function hideMan() {
    let liNode = document.querySelectorAll('.content__base-el')

    for (let i = 0; i < liNode.length; i++) {
        liNode[i].style.display = 'none';
    }
}

// Выводит слово
let contentOutputWrapper = document.querySelector('.content__output-content');


////// –––––––––––––––––––––––––––––––––––––––––––– //////
let pageBody = document.querySelector('.page__body');


let resultWinNode = document.querySelector('.content__result--win');
let winGame = 0;

// Показывает слово
function openWord(index) {
    let spanLetterNode = document.querySelectorAll('.content__output-item--span');
    spanLetterNode[index].style.display = 'block';
}

// Функция нахождения совпадающих букв
function findEqualObjects(someArray, otherArray) {
    let equalObjects = [];

    // Находит совпадающие буквы
    let index = -1;
    someArray.forEach(function (elementOfSomeArray) {
        index++;
        otherArray.forEach(function (elementOfOrherArray) {
            if (JSON.stringify(elementOfSomeArray) === JSON.stringify(elementOfOrherArray)) {
                // Индекс совпавшей буквы
                let numOfEqual = index;

                // Передает индекс в фунцию показа буквы
                openWord(numOfEqual);

                // Вставляет в массив совпавшие буквы
                equalObjects.push(elementOfOrherArray);
            }
        });
    });

    let wordLength = someArray.length;
    let equalObjectsLength = equalObjects.length;
    console.log(someArray);

    // Победа !!!
    if (wordLength == equalObjectsLength) {
        winGame++;
        resultWinNode.textContent = winGame;

        // Сообщение о выигрыше
        let maskWinNode = document.querySelector('.content__mask-win');
        maskWinNode.classList.remove('content__mask-win--close');

        pageBody.classList.add('try-again')

        // Удаляет обработчик
        window.removeEventListener('keydown', keydownEvent);
    }
}

// Выигрыш
// function winMyGame(word, arrOfUniqueLetter) {
//     findEqualObjects(word, arrOfUniqueLetter);
// }


////// –––––––––––––––––––––––––––––––––––––––––––– //////


let loseGame = 0;

// Проигрыш
function loseMyGame(mistakes) {
    // Выводит результат сыгранных игр
    let loseItemNode = document.querySelector('.content__result--lose');

    // Ошибки с поправкой на начало массива
    let arrPosition = mistakes - 1;

    let liNode = document.querySelectorAll('.content__base-el')
    if (liNode[arrPosition]) {
        liNode[arrPosition].style.display = 'block';
    }

    if (mistakes == 6) {
        // Сообщение о проирыше
        let maskLoseNode = document.querySelector('.content__mask-lose');
        maskLoseNode.classList.remove('content__mask-lose--close');
        // Прибавляет проигрыш
        loseGame++;
        loseItemNode.textContent = loseGame;

        // Удаляет обработчик
        window.removeEventListener('keydown', keydownEvent);
    }
}

// Вывод неправильных букв
function getErrorInput(letter) {
    // Нода вывода буквы
    let outputIputLetter = document.querySelector('.content__letter');
    let valueIputLetter = letter.join(', ')
    outputIputLetter.textContent = valueIputLetter;
}

// Неправильные буквы
let noLetter = [];
let noUniqueLetter = [];
// Правильные буквы
let isLetter = [];
let isUniqueLetter = [];
// Кол-во ошибок
let numberMistakes = 0;

// Заполнение масcивов
function checkInputValue(word, letter) {
    // Слово трансформированное в массив
    let toUpperCaseWord = word.toUpperCase();
    let arrOfMyWord = toUpperCaseWord.split('');

    if (arrOfMyWord.includes(letter)) {
        // Правильные буквы
        isLetter.push(letter);
        console.log(isLetter);

        // Массив неповторяющихся правильных букв
        let uniqueLetter = new Set(isLetter);
        isUniqueLetter = Array.from(uniqueLetter);

        // Выйгрыш
        // winMyGame(arrOfMyWord, isUniqueLetter);
        findEqualObjects(arrOfMyWord, isUniqueLetter);

    } else {
        noLetter.push(letter);
        // Массив неповторяющихся неправильных букв
        let uniqueLetter = new Set(noLetter);
        noUniqueLetter = Array.from(uniqueLetter);

        // Кол-во ошибок
        numberMistakes = noUniqueLetter.length;
        // console.log(numberMistakes);

        // Выводит ошибчные буквы на экран
        getErrorInput(noUniqueLetter);

        // Проигрыш
        loseMyGame(numberMistakes);
    }
}

// БУКВЫ
let arrOfAnyLetter = [];
let arrOfUniqueLetter = [];

let errorLanguage = document.querySelector('.content__error-language');


// Слушатель с параметром
function getEventListener(myWord) {
    var keydownEvent = function (e) {
        // Ввод только русских букв
        let regexp = /[а-яё]/i;

        if (regexp.test(e.key)) {
            // Нажатие на клавиши в верхнем регистре
            let toUpperCaseLetter = e.key.toUpperCase();

            // Всталяет нажатые буквы в масиив
            arrOfAnyLetter.push(toUpperCaseLetter);

            // Создаём массив с уникальными буквами
            let uniqueLetter = new Set(arrOfAnyLetter);
            arrOfUniqueLetter = Array.from(uniqueLetter);
            // console.log(arrOfUniqueLetter);

            // Принимает загаданное слово и массив уникальных букв        
            checkInputValue(myWord, toUpperCaseLetter);

            // Удаляет обработчик
            if (pageBody.classList.contains('try-again')) {
                window.removeEventListener('keydown', keydownEvent);
            }

            // Скрывает ошибку
            errorLanguage.style.display = 'none';
        } else {
            // Показывает ошибку
            errorLanguage.style.display = 'flex';
        }
    };

    window.addEventListener('keydown', keydownEvent);
};


// Функция отслеживания нажатия клавиши
function getDownInput(myWord) {
    // Слушатель на клавиши 
    getEventListener(myWord);
}


// Функция заполнения шаблона букв
function createTemplate(word) {
    for (let i = 0; i < word.length; i++) {
        // Элемент
        let liNode = document.createElement("li");
        liNode.classList.add('content__output-item');

        // Буква
        let spanNode = document.createElement("span")
        spanNode.textContent = word[i];
        spanNode.classList.add('content__output-item--span');
        liNode.append(spanNode);

        contentOutputWrapper.append(liNode);
    }
}



// Функция начала игры
function startGame() {
    let blockMask = document.querySelector('.content__mask');
    let buttonMask = document.querySelector('.content__mask-button');

    buttonMask.addEventListener('click', () => {
        blockMask.style.display = 'none';

        // Загаданное слово
        let myWord = getRandomWord(word);

        hideMan();
        createTemplate(myWord);
        getDownInput(myWord);
    });
}

startGame();

// Очистить инпут ввода букв
function cleanAllData() {
    // Удаляет маску
    let blockMask = document.querySelector('.content__mask');
    blockMask.style.display = 'none';

    // Очищает массивы
    // 1 этап
    arrOfAnyLetter = [];
    // 2 этап
    noLetter = [];
    noUniqueLetter = [];
    isLetter = [];
    isUniqueLetter = [];
    numberMistakes = 0;

    // Очищает вывод букв на страницу
    let outputIputLetter = document.querySelector('.content__letter');
    outputIputLetter.textContent = '';
}


// Очистить шаблон под буквы буквы
function cleanTemplateOfWord() {
    let liNodeLetter = document.querySelectorAll('.content__output-item');

    for (let i = 0; i < liNodeLetter.length; i++) {
        liNodeLetter[i].remove();
    }
}

// Повтроная игра
let tryAgainButtonWin = document.querySelector('.content__mask-win-button');
let tryAgainButtonLose = document.querySelector('.content__mask-lose-button');
let maskNodeWin = document.querySelector('.content__mask-win');
let maskNodeLose = document.querySelector('.content__mask-lose');

// Повтор после выигрыша
tryAgainButtonWin.addEventListener('click', () => {
    maskNodeWin.classList.add('content__mask-win--close');
    cleanAllData();

    // Загаданное слово
    let myWord = getRandomWord(word);

    hideMan();
    cleanTemplateOfWord();
    createTemplate(myWord);
    getDownInput(myWord);
});

// Повтор после проигрыша
tryAgainButtonLose.addEventListener('click', () => {
    maskNodeLose.classList.add('content__mask-lose--close');
    cleanAllData();

    // Загаданное слово
    let myWord = getRandomWord(word);


    hideMan();
    cleanTemplateOfWord();
    createTemplate(myWord);
    getDownInput(myWord);
})