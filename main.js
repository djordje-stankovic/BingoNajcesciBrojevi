
import {checkMoneyStatusFor6NumberForToday} from './workingWithFile/checkCombination.js'
import {getTopNumbers} from './workingWithFile/topNumbersForDay.js'
import {brojanjeISortiranje,getIndexOfFristNumbers} from './workingWithFile/trackingIndexOfFristNumbers.js'
import {izvuciBrojeveIzFajla} from './workingWithFile/workingWithIndex.js'

//getTopNumbers()//najcesce izvuceni brojevi po danovima
const userNumbers = [ 2, 39, 8, 10, 20, 27];  
//39, 29, 45, 47, 22, 24, 42, 5, 11, 7, 21, 23, 27
// Proverava dobitak na danasnji dan za kombinaciju
//checkMoneyStatusFor6NumberForToday(userNumbers);

const filePath = 'd:/Djordje.stankovic/BingoTest/output.txt';
const targetDate = '18.10.2023.';
// top Brojevi za svaku partiju za dati datum 
let listOfIndex = brojanjeISortiranje(filePath,targetDate)
//console.log(listOfIndex)
let indexsOfFristNumbers = getIndexOfFristNumbers(filePath,targetDate,15)
const filePathOfIndex = 'D:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/justIndexOfFristNumbers.txt'; // Postavite putanju do vašeg fajla
let numbersForPlay = izvuciBrojeveIzFajla(filePathOfIndex,15)
  console.log(numbersForPlay)
   
