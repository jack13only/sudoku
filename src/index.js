module.exports = function solveSudoku(matrix) {
  
// }

// function solveSudoku(matrix) {
  let matrix1 = Array.from(matrix)
 // console.log(matrix1);
  let count = 0
  let stop = 0
  let found = false
  let sum = 0;
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  let solutionTemp = [new Set(numbers), new Set(numbers), new Set(numbers), new Set(numbers), new Set(numbers), new Set(numbers), new Set(numbers), new Set(numbers), new Set(numbers)]
  for (let i = 0; i < matrix1.length; i++) {
    for (let j = 0; j < matrix1[i].length; j++) {
      solutionTemp[i].delete(matrix1[i][j])
    }  
  }



 
  for (let i = 0; i < matrix1.length; i++) {
      if (solutionTemp[i].size === 1) matrix1[i].forEach(function (item) {
        for (let j = 0; j < matrix1[i].length; j++) {
         if (matrix1[i][j] === 0) matrix1[i][j] = Array.from(solutionTemp[i].values())[0]
        }
      })
  }

  let arr = [[], [], [], [], [], [], [], [], []]

  let arrTest = []
  let matrix2 = []

  for (let i = 0; i < matrix1.length; i++) {
    arr[i] = Array.from(solutionTemp[i])
  } 
 // console.log(arr);

const random = (mas) => {
  let tt = []
  for (let i = 0; i < 9; i++) {
    tt[i] = mas[i].slice().sort(function(){ 
      return 0.5 - Math.random()
    })
  }
  //console.log(mas);
  return tt  
}  

const matrixCopy = (mtrx) => {
  let t = []
  for (let i = 0; i < 9; i++) {
    t[i] = Array.from(mtrx[i])
  }
  //console.log(`t = ${t} `);
  return t
}

  
  while (!found) {

    stop++

    arrTest = random(arr)
    matrix2 = matrixCopy(matrix1)

    sum = 0
    count = 0

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (matrix2[i][j] === 0) matrix2[i][j] = arrTest[i].pop()
      }
    }

       //console.log(matrix2);

    for (let j = 0; j < 9; j++) {
      for (let i = 0; i < 9; i++) {
        sum += matrix2[i][j]
     //   console.log(`matrix2[${i}][${j}] = ${matrix2[i][j]}`);
    //    console.log(`sum = ${sum}`);
      } 
    //  console.log(`Totalsum = ${sum}`);
      if (sum !== 45) {
        sum = 0
        break
      }
      else {
     //   console.log(`count = ${count}`);
        count++
        sum = 0
        }
      }  
  //  console.log(matrix2);
  // console.log(stop);  
    
  if (count === 9) {
 //   console.log(`STOOP = ${stop}`);
 //   console.log(`COUNTT = ${count}`);
    found = true
  }
  if (stop === 450000) found = true

  }
  return matrix2
}  

// let initial = [
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

// solveSudoku(initial)