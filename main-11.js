

// БУКВЫ
let arrOfAnyLetter = [];
let arrOfUniqueLetter = [];


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
    
            // Всталяет нажатые буквы в масиив
            arrOfAnyLetter.push(toUpperCaseLetter);
    
            // Создаём массив с уникальными буквами
            let uniqueLetter = new Set(arrOfAnyLetter);
            arrOfUniqueLetter = Array.from(uniqueLetter);
            console.log(arrOfUniqueLetter);
            

            function 
    
            if (arrOfUniqueLetter.length > 5) {
                document.removeEventListener('keydown', keydownEvent);
            }
    
            // Скрывает ошибку
            errorLanguage.style.display = 'none';
    
        } else {
            // Показывает ошибку
            errorLanguage.style.display = 'flex';
        }
    }
    
    console.log(myWord);
    
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