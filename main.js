// Ноды глобально
let pageBody = document.querySelector('.page__body');


// Показывает отгаданную букву
function openWord(numOfEqualLetter, arrOfMyWord) {
    let spanNodes = document.querySelectorAll('.content__output-item--span')

    // Вставляет в Span отгаданную буквы
    spanNodes[numOfEqualLetter].textContent = arrOfMyWord[numOfEqualLetter];
}

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

                // Прибавляет кол-во совпавших букв
                equalLetter++;

                // Функция показывающая отгаданную букву
                openWord(numOfEqualLetter, arrOfMyWord);
            }
        });
    });

    // Проверка совпадения длины массива правильных букв и загаданного слова
    if (equalLetter == arrOfMyWord.length) {
        // Сообщение о выигрыше
        let maskWinNode = document.querySelector('.content__mask-win');
        maskWinNode.classList.remove('content__mask-win--close');

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
    // Приводит загаданное слово к заглавным буквам
    let toUpperCaseWord = myWord.toUpperCase();
    let arrOfMyWord = toUpperCaseWord.split('');

    // Проверка есть ли в загаданном слове введеная буква
    if (arrOfMyWord.includes(pressingLetter)) {

        if (!ArrOfСorrectLetter.includes(pressingLetter)) {
            console.log(`Слово ${myWord} содержит ${pressingLetter}`);

            // Добавляет неповторяющуюся букву в массив с правильные буквы
            ArrOfСorrectLetter.push(pressingLetter);

            winMyGame(ArrOfСorrectLetter, arrOfMyWord);

            console.log(ArrOfСorrectLetter);

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

            console.log(ArrOfErrorLetter);

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
    // 1
    ['Большой, сильный и бурый. Кто это?', 'Медведь'],
    // 2
    ['Большой, сильный и быстрый. Очень клыкастый.', 'Тигр'],
    // 3
    ['Как пела Полина Гагарина. Без чего не выжить человечеству?', 'Красота'],
    // 4
    ['Жарким летом по горам. В шубе бегает...', 'Баран'],
    // 5
    ['Он пятнистый великан – Шея длинная, как кран: По сафари ходит «граф», А зовут его ...?', 'Жираф'],
    // 6
    ['Мера объема жидких тел.', 'Литр'],
    // 7
    ['Инструмент для построения окружностей.', 'Циркуль'],
    // 8
    ['Наименьшая денежная единица недавнего прошлого в России.', 'Копейка'],
    // 9
    ['Название семизначного числа, придуманного Марко Поло.', 'Миллион'],
    // 10
    ['Прибор для измерения и построения углов.', 'Транспортир'],
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

// Функция заполнения шаблона букв
function createTemplate(word) {
    let contentOutputWrapper = document.querySelector('.content__output-content');

    // Очищает предыдущий шаблон
    if (document.querySelector('.content__output-item')) {
        let liNodes = document.querySelectorAll('.content__output-item')

        for (let i = 0; i < liNodes.length; i++) {
            liNodes[i].remove();
        }
    }

    // Создает новый шаблон
    for (let i = 0; i < word.length; i++) {
        // Элемент
        let liNode = document.createElement("li");
        liNode.classList.add('content__output-item');

        // Буква
        let spanNode = document.createElement("span")
        spanNode.classList.add('content__output-item--span');
        liNode.append(spanNode);

        contentOutputWrapper.append(liNode);
    }
}


////// –––––––––––––––––––––––––––––––––– //////
// Функция начала игры
function startGame() {
    pageBody.classList.remove('try-again');

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

    // Создает шаблон слова
    createTemplate(myWord);

    // Вывод вопрос
    giveOutputQuestion(myQuestion);

    // Слушательна ввод букв
    getEventListener(myWord);
}


// Кнопка СТАРТА
let blockMask = document.querySelector('.content__mask');
let buttonMask = document.querySelector('.content__mask-button');

buttonMask.addEventListener('click', () => {
    blockMask.style.display = 'none';

    // Начинает игру
    startGame();
});

// Повтроная игра
let tryAgainButtonWin = document.querySelector('.content__mask-win-button');
let tryAgainButtonLose = document.querySelector('.content__mask-lose-button');
let maskNodeWin = document.querySelector('.content__mask-win');
let maskNodeLose = document.querySelector('.content__mask-lose');


// Очистить массивы с буквами
function cleanAllData() {
    mistakes = 0;
    ArrOfErrorLetter = [];
    ArrOfСorrectLetter = [];

    // Нода вывода буквы
    let outputErrorLetter = document.querySelector('.content__letter');
    outputErrorLetter.textContent = '';
}


// Повтор после выигрыша
tryAgainButtonWin.addEventListener('click', () => {
    maskNodeWin.classList.add('content__mask-win--close');
    
    // Очистить данные
    cleanAllData();

    // Начинает игру
    startGame();
});

// Повтор после проигрыша
tryAgainButtonLose.addEventListener('click', () => {
    maskNodeLose.classList.add('content__mask-lose--close');
    
    // Очистить данные
    cleanAllData();

    // Начинает игру
    startGame();
});