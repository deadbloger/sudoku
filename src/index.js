// const initial = [
//   [6, 5, 0, 7, 3, 0, 0, 8, 0],
//   [0, 0, 0, 4, 8, 0, 5, 3, 0],
//   [8, 4, 0, 9, 2, 5, 0, 0, 0],
//   [0, 9, 0, 8, 0, 0, 0, 0, 0],
//   [5, 3, 0, 2, 0, 9, 6, 0, 0],
//   [0, 0, 6, 0, 0, 0, 8, 0, 0],
//   [0, 0, 9, 0, 0, 0, 0, 0, 6],
//   [0, 0, 7, 0, 0, 0, 0, 5, 0],
//   [1, 6, 5, 3, 9, 0, 4, 7, 0]
// ];

// console.log(solveSudoku(initial))
module.exports = 


function solveSudoku(matrix) {
  const sudokuSize = 9; //Размер Судоку (9x9)

  //функция копирования матрицы
  function getCopy(arr) {
    let result = [];
    for (let i = 0; i < sudokuSize; i++) {
      result.push(arr[i].slice())
    }
    return result
  }



  //функция заполнения ячек возможными вариантами(кандидатами)
  function countEmpty(matrix) {
    let result = getCopy(matrix); // в каждом новом цикле получаем свежую матрицу
    let emptyCounter = 0; //счетчик незаполненых ячеек
    for (let row = 0; row < sudokuSize; row++) { //перебор строк
      for (let column = 0; column < sudokuSize; column++) { //перебор столбцов
        if (result[row][column] === 0 || result[row][column] instanceof Array) { // если значение равно 0 (пустое) или значение значение ячейки все еще неопределено (массив из кандидатов)
          let candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          //далее проверкой ряда/столбца/блока ячейки удаляем невозможные значения

          //проверка ряда
          for (let secCol = 0; secCol < sudokuSize; secCol++) {
            let ind = candidates.indexOf(result[row][secCol]); // перебираем значения рядов [row][secCol] с первого (значения слева направа) и по последний
            if (ind != -1) // полученное значение есть в возможных кандидатах?
            {
              candidates.splice(ind, 1)
            } //если в возможных значение числится, то удаляем (array.splice(start, deleteCount))
          }

          //проверка колонки
          for (let secRow = 0; secRow < sudokuSize; secRow++) {
            let ind = candidates.indexOf(result[secRow][column]);
            if (ind != -1) // полученное значение есть в возможных кандидатах?
            {
              candidates.splice(ind, 1)
            } //если в возможных значение числится, то удаляем (array.splice(start, deleteCount))
          }
          /* С каждым удалением наш массив кандидатов уменьшается и ... */
          //проверка блока
          //поиск левойверхней координаты блока
          let startRow = 0;
          if (row >= 0 && row <= 2) {
            startRow = 0
          }
          if (row >= 3 && row <= 5) {
            startRow = 3
          }
          if (row >= 6 && row <= 8) {
            startRow = 6
          }

          let startColumn = 0;
          if (column >= 0 && column <= 2) {
            startColumn = 0
          }
          if (column >= 3 && column <= 5) {
            startColumn = 3
          }
          if (column >= 6 && column <= 8) {
            startColumn = 6
          }

          for (let i = startRow; i <= startRow + 2; i++) { // перебор строк блока
            for (let j = startColumn; j <= startColumn + 2; j++) { // перебор столбцов блока
              let ind = candidates.indexOf(result[i][j]); //поиск ЗАПОЛНЕННОГО значения в возможных
              if (ind != -1) {
                candidates.splice(ind, 1)
              } 
            }
          }
          if (candidates.length === 0) {
            return 1
          } //если в возможных значениях нет, возвращаем тригер continue

          if (candidates.length === 1) { // если по итогу у нас остался 1 вариант, то вносим его и запускаем функцию снова
            result[row][column] = candidates[0]; // присваиваем значению полученный результат (индекс элемента ноль, т.к. он один)
            return countEmpty(result)
          }
          result[row][column] = candidates; // заполняем ячейку массивом кандидатов          
          emptyCounter++ //плюсуем счетчик
        }
      }
    }
    if (emptyCounter === 0) { // если не заполнено (не найдено) пустых, возврат массива
      finalResult = result;
      return
    }
    return tryCandidate(result) // запуск функции подстановки
  }

  //функция подстановки
  function tryCandidate(arr) {
    //поиск ячейки с кандидатом
    for (let row = 0; row < sudokuSize; row++) { //перебор рядов
      for (let column = 0; column < sudokuSize; column++) { //перебор колонок
        if (arr[row][column] instanceof Array) {
          let candidate = arr[row][column];
          //перебор значений кандидата
          for (let i = 0, len = candidate.length; i < len; i++) { //поочередная подстановка возможных значений
            let attempt = getCopy(arr);
            attempt[row][column] = candidate[i];
            //запускаем внутри if функцию заполнения ячеек.
            if (countEmpty(attempt) === 1) {
              continue
            }
            //если сработал тригер, это значение не подходит. если тригера небыло, значит значение верное и функцию можно прекратить
            return
          }
          //если после перебора всех значений функция не прекратилась, возвращаем тригер continue
          return 1;
        }
      }
    }
  }




  countEmpty(matrix);
  return finalResult;

}