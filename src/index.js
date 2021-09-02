module.exports = function solveSudoku(matrix) {
  
// }

//function solveSudoku(matrix) {
  let matrix1 = Array.from(matrix)
  let arrCandidate = []
  // console.log(matrix1);
  let count = 0
  let stop = 0
  let found = false
  let sum = 0;
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  let solutionTemp = [new Set(numbers), new Set(numbers), new Set(numbers), new Set(numbers), new Set(numbers), new Set(numbers), new Set(numbers), new Set(numbers), new Set(numbers)]
  let solutionTemp2 = []
  let wrong = [[], [], [], [], [], [], [], [], []]
  let work = false
  let countX = 0
  let countY = 0


  function isEqual(a, b) {
    let a1 = Array.from(a.values())
    let a2 = Array.from(b.values())
    
    return a1.every(function(v,i) { return v === a2[i]});
  }

    //Make SET for each row
    for (let i = 0; i < matrix1.length; i++) {
      for (let j = 0; j < matrix1[i].length; j++) {
        solutionTemp[i].delete(matrix1[i][j])
      }  
    }

    //Make SET for each element
    for (let i = 0; i < matrix1.length; i++) {
      for (let j = 0; j < matrix1[i].length; j++) {
        if (!(Array.isArray(arrCandidate[i]))) arrCandidate[i] = []
        if (matrix1[i][j] === 0) arrCandidate[i][j] = new Set(solutionTemp[i].values())
        else {
          arrCandidate[i][j] = null
        }
      }  
    }

    while(!work) {

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (arrCandidate[i][j] !== null) {
          for (let k = 0; k < 9; k++) {
            arrCandidate[i][j].delete(matrix1[i][k])
          }
        } 
      } 
    }



    //Check SET of each element for column
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (arrCandidate[i][j] !== null) {
          for (let k = 0; k < 9; k++) {
            arrCandidate[i][j].delete(matrix1[k][j])
          }
        } 
      } 
    }

    let startK = 0
    let finishK = 3
    let startM = 0
    let finishM = 3

    //Check SET of each element for squares
    for (let d = 0; d < 9; d++) {

      for (let i = startK; i < finishK; i++) {
        for (let j = startM; j < finishM; j++) {

          if (arrCandidate[i][j] !== null) {
            for (let k = startK; k < finishK; k++) {
              for (let m = startM; m < finishM; m++) {
                arrCandidate[i][j].delete(matrix1[k][m])
              }
            }
          }
        }
      }

      startK += 3
      finishK +=3
      if (startK === 9) {
        startK = 0
        finishK = 0
        startM +=3
        finishM +=3
      }
    }

   // Check SET.size === 1

   checkLoop: for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (arrCandidate[i][j] !== null && arrCandidate[i][j].size === 1) {
          matrix1[i][j] = Array.from(arrCandidate[i][j].values())[0]
          arrCandidate[i][j] = null
          work = false
          break checkLoop
        }
      } 
      work = true
    }
  

    checkLoop2: for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (arrCandidate[i][j] !== null && arrCandidate[i][j].size === 2) {
          for (let m = 0; m < 9; m++) {
            if (j !== m && arrCandidate[i][m] !== null && arrCandidate[i][m].size === 2 && isEqual(arrCandidate[i][j], arrCandidate[i][m]) && countX < 10) {
              for (let k = 0; k < 9; k++) {
                if (k !== j && k !== m && arrCandidate[i][k] !== null) {
                  arrCandidate[i][k].delete(Array.from(arrCandidate[i][j].values())[0])
                  arrCandidate[i][k].delete(Array.from(arrCandidate[i][j].values())[1])  
                }
              }
              countX++
              work = false
              break checkLoop2
            }
          }
        }
      }
      work = true
    } 

    checkLoop3: for (let j = 0; j < 9; j++) {
      for (let i = 0; i < 9; i++) {
        if (arrCandidate[i][j] !== null && arrCandidate[i][j].size === 2) {
          //console.log(arrCandidate[i][j]);
          for (let m = 0; m < 9; m++) {
            if (i !== m && arrCandidate[m][j] !== null && arrCandidate[m][j].size === 2 && isEqual(arrCandidate[i][j], arrCandidate[m][j]) && countY < 10) {
              for (let k = 0; k < 9; k++) {
                  if (k !== i && k !== m && arrCandidate[k][j] !== null) {
                  arrCandidate[k][j].delete(Array.from(arrCandidate[i][j].values())[0])
                  arrCandidate[k][j].delete(Array.from(arrCandidate[i][j].values())[1])  
                }
              }
              countY++
              work = false
              break checkLoop3   
            }
          }
        }
      }
      work = true
    } 
 
      
      
  }
    
//   console.log(isEqual(arrCandidate[8][4], arrCandidate[8][8]))
// console.log(arrCandidate);
// console.log(matrix1);
 

  const matrixCopy = (mtrx) => {
    let t = []
      for (let i = 0; i < 9; i++) {
      t[i] = Array.from(mtrx[i])
    }
    return t
  }

  let matrix2 = []

  let error = 0

  let timeRandNum2
  let timeArr
  const timeRand = (i, j) => {
    timeArr = Array.from(arrCandidate[i][j].values()).sort(function(){ 
             return 0.5 - Math.random()
           })

    for (let x = 0; x < timeArr.length; x++) {       
      if (solutionTemp2[i].has(timeArr[x])) return timeArr[x] 
    }
    return null
  }
  
// console.log(arrCandidate);
// console.log(solutionTemp);
 
// CHECK SUDOKU

  while (!found) {
    
   // if (stop % 10 === 0) console.log(stop);
    if (stop === 1000000) {
      found = true    
      break
    }
    error = 0
    stop++

    matrix2 = matrixCopy(matrix1)

    for (let i = 0; i < 9; i++) {
      solutionTemp2[i] = new Set(solutionTemp[i].values())
    }

    for (let i = 0; i < 9; i++) {
      if (error === 1) break
      for (let j = 0; j < 9; j++) {
        if (matrix2[i][j] === 0) {

          timeRandNum2 = timeRand(i, j)
          if (timeRandNum2 === null) {
            error = 1
            break
          } else matrix2[i][j] = timeRandNum2 

         solutionTemp2[i].delete(matrix2[i][j])

          for (let k = 0; k < 9; k++) {
            if (matrix2[i][j] === matrix2[i][k] && j !== k) {
              error = 1
              break
            } 
            if (matrix2[i][j] === matrix2[k][j] && i !== k) {
              error = 1
              break
            } 
          }

        }
      }
    }

    if (error === 1) continue
    else {
      console.log('HUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUURAYYYY');
      found = true
    }

  }

  return matrix2
 
}  

// let initial = [
//   [0, 5, 0, 0, 7, 0, 0, 0, 1],
//   [8, 7, 6, 0, 2, 1, 9, 0, 3],
//   [0, 0, 0, 0, 3, 5, 0, 0, 0],
//   [0, 0, 0, 0, 4, 3, 6, 1, 0],
//   [0, 4, 0, 0, 0, 9, 0, 0, 2],
//   [0, 1, 2, 0, 5, 0, 0, 0, 4],
//   [0, 8, 9, 0, 6, 4, 0, 0, 0],
//   [0, 0, 0, 0, 0, 7, 0, 0, 0],
//   [1, 6, 7, 0, 0, 2, 5, 4, 0]
// ];

// solveSudoku(initial)