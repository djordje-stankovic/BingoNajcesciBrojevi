
import {checkMoneyStatusFor6NumberForToday} from './workingWithFile/checkCombination.js'
import {getTopNumbers} from './workingWithFile/topNumbersForDay.js'
import {brojanjeISortiranje,getIndexOfFristNumbers} from './workingWithFile/trackingIndexOfFristNumbers.js'
import {izvuciBrojeveIzFajla} from './workingWithFile/workingWithIndex.js'
import {proveraNajcescihBrojevaZaSveDanePoVremenu,pronadjiBrojeveZaVreme, findMissingNumbers,spojiSveListeIVratiOneKojiSePonavljaju,fristIndexOfDay} from './workingWithTime/workingWithtimeOfpartija.js'
import {getPastWeekdays,findLinesInFile,najcesciBrojeeviZaDanIVremeokolo } from './workingWithTime/dayAndTimeOfPartija.js'
//  import {getPastWeekdays } from './workingWithTime/dayAndTimeOfPartija.js'
import fs from 'fs';
//Vraca Vreme sledece runde 
function getNextTimeOfRound(){
  const now = new Date();

// Dobijanje trenutnog sata i minuta
const currentHour = now.getHours();
const currentMinute = now.getMinutes();

// Zaokruživanje minuta na najbliži broj deljiv sa 5
const roundedMinute = Math.ceil(currentMinute / 5) * 5;

// Ažuriranje trenutnog vremena sa zaokruženim minutima
now.setMinutes(roundedMinute);

// Formatiranje rezultujućeg vremena kao "HH:mm"
const formattedTime = now.toTimeString().slice(0, 5);

return formattedTime
}


getTopNumbers()//najcesce izvuceni brojevi po danovima
const userNumbers = [ 2, 39, 8, 10, 20, 27];  
//39, 29, 45, 47, 22, 24, 42, 5, 11, 7, 21, 23, 27
// Proverava dobitak na danasnji dan za kombinaciju
//checkMoneyStatusFor6NumberForToday(userNumbers);

const filePath = 'C:/Djordje/Bingo/output.txt';
const targetDate = '19.10.2023.';
// top Brojevi za svaku partiju za dati datum 
let listOfIndex = brojanjeISortiranje(filePath,targetDate)
//console.log(listOfIndex)
//Pravi listu top Brojeva i listu top indexa izvuciBrojeveIzFajla razi na odnosu na ove liste 
let indexsOfFristNumbers = await getIndexOfFristNumbers(filePath,targetDate,15)



const filePathOfIndex = 'C:/Djordje/BingoNajcesciBrojevi/txtFajls/justIndexOfFristNumbers.txt'; // Postavite putanju do vašeg fajla
//Vraca Iz Fajla Najcesece inddexe prvih brojeva i za trenutnu listu top brojeva vraca brojeve koji su na top listi najcesce izvucenih indexa
 let numberOfIndexOfFristNumbers = 10;
 let numbersForPlay = await izvuciBrojeveIzFajla(filePathOfIndex,numberOfIndexOfFristNumbers)
    // console.log(numbersForPlay)

//let rezultati =  await proveraNajcescihBrojevaZaSveDanePoVremenu(filePath)



const vreme = getNextTimeOfRound(); // Postavite vreme koje tražite
let pathToFajlZapartije =  'C:/Djordje/BingoNajcesciBrojevi/txtFajls/BrojeviPoVremenima/najciseIzvuceniBrojeviZaPartijuPoVremenu.txt'; // Postavite putanju do vašeg fajla
//Vraca za vreme partije najcesce izvucene brojeve kroz istoriju
const brojeviZaPartiju = await pronadjiBrojeveZaVreme(pathToFajlZapartije, vreme,10);
let putanjaDoSvihIzvlacenja = 'C:/Djordje/Bingo/output.txt'
let misingNumbers = await findMissingNumbers(putanjaDoSvihIzvlacenja,3)
// console.log(brojeviZaPartiju);
// console.log(misingNumbers);
//  console.log(numbersForPlay)
const brojeviZaPartijuBrojevi = brojeviZaPartiju.map(Number);
let topNumbersOfDay = getTopNumbers(targetDate).slice(0,10)
// Spajanje svih brojeva u jedan niz


// let sviBrojeviUnqe = new Set(sviBrojevi);




let indexPathh = 'C:/Djordje/BingoNajcesciBrojevi/txtFajls/listOfTopIndex.txt'
let indexOfDay = fristIndexOfDay(indexPathh,10)

// let sviBrojeviallUnqe = new Set(sviBrojeviall);



 //console.log(sviBrojeviUnqe)
 //console.log(sviBrojeviallUnqe)

const numberOfWeeks = 10;
const pastWeekdays = getPastWeekdays(numberOfWeeks,6,vreme);
// console.log(pastWeekdays)
// const groupedDates = groupDatesByWeekday(pastWeekdays);

// Prikazivanje rezultata
// for (const day in groupedDates) {
//   if (groupedDates[day].length > 0) {
//     console.log(`${day} : [${groupedDates[day].join(', ')}]`);
//   }
// }


const matchingLines = findLinesInFile(putanjaDoSvihIzvlacenja, pastWeekdays);

// Upis rezultata u drugi fajl
 fs.writeFileSync('./txtFajls/BrojeviPoVremenima/brojeviZaDanVreme5MinPlus.txt', matchingLines.join('\n'));


 const brojBrojevaKojeVracam = 10;
 const topNumbersFromDayAndTime = najcesciBrojeeviZaDanIVremeokolo('./txtFajls/BrojeviPoVremenima/brojeviZaDanVreme5MinPlus.txt',brojBrojevaKojeVracam)
// console.log(topNumbersFromDayAndTime,'topNumbers')

const sviBrojeviall = [...brojeviZaPartijuBrojevi, ...misingNumbers, ...numbersForPlay, ...topNumbersOfDay, ...indexOfDay,...topNumbersFromDayAndTime];
// console.log(sviBrojevi)
let listOfPredictionall = spojiSveListeIVratiOneKojiSePonavljaju(sviBrojeviall,6)

const sviBrojevi = [...brojeviZaPartijuBrojevi, ...misingNumbers, ...numbersForPlay,...topNumbersFromDayAndTime];
let listOfPrediction = spojiSveListeIVratiOneKojiSePonavljaju(sviBrojevi,6)

 console.log(listOfPrediction)
console.log(listOfPredictionall,'Sa najcesce Izaslim')
console.log(topNumbersFromDayAndTime,'Za dan i vreme')







   
