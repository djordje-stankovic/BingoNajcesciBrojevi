
import {checkMoneyStatusFor6NumberForToday} from './workingWithFile/checkCombination.js'
import {getTopNumbers} from './workingWithFile/topNumbersForDay.js'
import {brojanjeISortiranje,getIndexOfFristNumbers} from './workingWithFile/trackingIndexOfFristNumbers.js'
import {izvuciBrojeveIzFajla} from './workingWithFile/workingWithIndex.js'
import {proveraNajcescihBrojevaZaSveDanePoVremenu,pronadjiBrojeveZaVreme, findMissingNumbers,spojiSveListeIVratiOneKojiSePonavljaju,fristIndexOfDay} from './workingWithTime/workingWithtimeOfpartija.js'
import {getPastWeekdays, groupDatesByWeekday} from './workingWithTime/timeAndDayofPartija.js'

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

const filePath = 'd:/Djordje.stankovic/BingoTest/output.txt';
const targetDate = '19.10.2023.';
// top Brojevi za svaku partiju za dati datum 
let listOfIndex = brojanjeISortiranje(filePath,targetDate)
//console.log(listOfIndex)
//Pravi listu top Brojeva i listu top indexa izvuciBrojeveIzFajla razi na odnosu na ove liste 
let indexsOfFristNumbers = await getIndexOfFristNumbers(filePath,targetDate,15)


const filePathOfIndex = 'D:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/justIndexOfFristNumbers.txt'; // Postavite putanju do vašeg fajla
//Vraca Iz Fajla Najcesece inddexe prvih brojeva i za trenutnu listu top brojeva vraca brojeve koji su na top listi najcesce izvucenih indexa
 let numberOfIndexOfFristNumbers = 10;
 let numbersForPlay = await izvuciBrojeveIzFajla(filePathOfIndex,numberOfIndexOfFristNumbers)
    // console.log(numbersForPlay)

//let rezultati =  await proveraNajcescihBrojevaZaSveDanePoVremenu(filePath)



const vreme = getNextTimeOfRound(); // Postavite vreme koje tražite
let pathToFajlZapartije =  'D:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/BrojeviPoVremenima/najciseIzvuceniBrojeviZaPartijuPoVremenu.txt'; // Postavite putanju do vašeg fajla
//Vraca za vreme partije najcesce izvucene brojeve kroz istoriju
const brojeviZaPartiju = await pronadjiBrojeveZaVreme(pathToFajlZapartije, vreme,10);
let putanjaDoSvihIzvlacenja = 'd:/Djordje.stankovic/BingoTest/output.txt'
let misingNumbers = await findMissingNumbers(putanjaDoSvihIzvlacenja,2)
// console.log(brojeviZaPartiju);
// console.log(misingNumbers);
//  console.log(numbersForPlay)
const brojeviZaPartijuBrojevi = brojeviZaPartiju.map(Number);
let topNumbersOfDay = getTopNumbers(targetDate).slice(0,10)
// Spajanje svih brojeva u jedan niz
const sviBrojevi = [...brojeviZaPartijuBrojevi, ...misingNumbers, ...numbersForPlay];
let listOfPrediction = spojiSveListeIVratiOneKojiSePonavljaju(sviBrojevi)

let sviBrojeviUnqe = new Set(sviBrojevi);




let indexPathh = 'D:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/listOfTopIndex.txt'
let indexOfDay = fristIndexOfDay(indexPathh,10)
const sviBrojeviall = [...brojeviZaPartijuBrojevi, ...misingNumbers, ...numbersForPlay, ...topNumbersOfDay, ...indexOfDay];
// console.log(sviBrojevi)
let listOfPredictionall = spojiSveListeIVratiOneKojiSePonavljaju(sviBrojeviall)
let sviBrojeviallUnqe = new Set(sviBrojeviall);

// console.log(listOfPrediction)
// console.log(listOfPredictionall)

// console.log(sviBrojeviUnqe)
// console.log(sviBrojeviallUnqe)

const numberOfWeeks = 10;
const pastWeekdays = getPastWeekdays(numberOfWeeks);
const groupedDates = groupDatesByWeekday(pastWeekdays);

// Prikazivanje rezultata
for (const day in groupedDates) {
  if (groupedDates[day].length > 0) {
    console.log(`${day} : [${groupedDates[day].join(', ')}]`);
  }
}












   
