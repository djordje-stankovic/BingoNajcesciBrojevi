
import {checkMoneyStatusFor6NumberForToday} from './workingWithFile/checkCombination.js'
import {getTopNumbers} from './workingWithFile/topNumbersForDay.js'
import {brojanjeISortiranje,getIndexOfFristNumbers} from './workingWithFile/trackingIndexOfFristNumbers.js'
import {izvuciBrojeveIzFajla} from './workingWithFile/workingWithIndex.js'
import {proveraNajcescihBrojevaZaSveDanePoVremenu,pronadjiBrojeveZaVreme, findMissingNumbers,spojiSveListeIVratiOneKojiSePonavljaju,fristIndexOfDay} from './workingWithTime/workingWithtimeOfpartija.js'
import {getPastWeekdays,findLinesInFile,najcesciBrojeeviZaDanIVremeokolo,getRandomNumbersWithoutRepetition,checkMoneyStatusFor6NumbernextGame } from './workingWithTime/dayAndTimeOfPartija.js'
//  import {getPastWeekdays } from './workingWithTime/dayAndTimeOfPartija.js'
import cron from 'node-cron';
import fs from 'fs';
//Vraca Vreme sledece runde 

function getTodayDate(){
  const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; // Mjeseci su indeksirani od 0 (januar) do 11 (decembar)
const year = today.getFullYear();

// Formatiranje datuma
const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}.`;
return formattedDate
}

//Vraca 5 min u buducnosti
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
//Vraca okruglo 5 min u proslisti
function getRoundedTime() {
  const now = new Date();

  // Dobijanje trenutnog sata i minuta
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Zaokruživanje minuta na najbliži broj deljiv sa 5
  const roundedMinute = Math.round(currentMinute / 5) * 5;

  // Postavljanje zaokruženih minuta u trenutnom vremenu
  now.setMinutes(roundedMinute);

  // Formatiranje rezultujućeg vremena kao "HH:mm"
  const formattedTime = now.toTimeString().slice(0, 5);
  // console.log(formattedTime)
  return formattedTime;
}


async function oneBigFunc(){
  

  getTopNumbers()//najcesce izvuceni brojevi po danovima
  const userNumbers = [ 2, 39, 8, 10, 20, 27];  
  //39, 29, 45, 47, 22, 24, 42, 5, 11, 7, 21, 23, 27
  // Proverava dobitak na danasnji dan za kombinaciju
  //checkMoneyStatusFor6NumberForToday(userNumbers);
  
  const filePath = 'D:/Djordje.stankovic/BingoTest/output.txt';
  const targetDate = getTodayDate() //'24.10.2023.';
  // top Brojevi za svaku partiju za dati datum 
  let listOfIndex = brojanjeISortiranje(filePath,targetDate)
  //console.log(listOfIndex)
  //Pravi listu top Brojeva i listu top indexa izvuciBrojeveIzFajla razi na odnosu na ove liste 
  let indexsOfFristNumbers = await getIndexOfFristNumbers(filePath,targetDate,15)
  
  
  
  const filePathOfIndex = 'd:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/justIndexOfFristNumbers.txt'; // Postavite putanju do vašeg fajla
  //Vraca Iz Fajla Najcesece inddexe prvih brojeva i za trenutnu listu top brojeva vraca brojeve koji su na top listi najcesce izvucenih indexa
   let numberOfIndexOfFristNumbers = 10;
   let numbersForPlay = await izvuciBrojeveIzFajla(filePathOfIndex,numberOfIndexOfFristNumbers)
      // console.log(numbersForPlay)
  
  //let rezultati =  await proveraNajcescihBrojevaZaSveDanePoVremenu(filePath)
  
  
  
  const vreme = getRoundedTime(); // Postavite vreme koje tražite
  let pathToFajlZapartije =  'd:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/BrojeviPoVremenima/najciseIzvuceniBrojeviZaPartijuPoVremenu.txt'; // Postavite putanju do vašeg fajla
  //Vraca za vreme partije najcesce izvucene brojeve kroz istoriju
  const brojeviZaPartiju = await pronadjiBrojeveZaVreme(pathToFajlZapartije, vreme,6);
  let putanjaDoSvihIzvlacenja = 'D:/Djordje.stankovic/BingoTest/output.txt'
  let misingNumbers = await findMissingNumbers(putanjaDoSvihIzvlacenja,3)
  // console.log(brojeviZaPartiju);
  // console.log(misingNumbers);
  //  console.log(numbersForPlay)
  const brojeviZaPartijuBrojevi = brojeviZaPartiju.map(Number);
  let topNumbersOfDay = getTopNumbers(targetDate).slice(0,6)
  // Spajanje svih brojeva u jedan niz
  
  
  // let sviBrojeviUnqe = new Set(sviBrojevi);
  
  
  
  
  let indexPathh = 'd:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/listOfTopIndex.txt'
  let indexOfDay = fristIndexOfDay(indexPathh,7)
  
  // let sviBrojeviallUnqe = new Set(sviBrojeviall);
  
  
  
   //console.log(sviBrojeviUnqe)
   //console.log(sviBrojeviallUnqe)
  
  const numberOfWeeks = 10;
  const pastWeekdays = getPastWeekdays(numberOfWeeks,vreme);
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
  
  
   const brojBrojevaKojeVracam = 8;
   const topNumbersFromDayAndTime = najcesciBrojeeviZaDanIVremeokolo('./txtFajls/BrojeviPoVremenima/brojeviZaDanVreme5MinPlus.txt',brojBrojevaKojeVracam)
  // console.log(topNumbersFromDayAndTime,'topNumbers')
  
  const sviBrojeviall = [...brojeviZaPartijuBrojevi, ...misingNumbers, ...numbersForPlay, ...topNumbersOfDay,...topNumbersFromDayAndTime];
   console.log(topNumbersOfDay, 'topNumbersOfDay')
   console.log(brojeviZaPartijuBrojevi, 'brojeviZaPartijuBrojevi')
   console.log(misingNumbers, 'misingNumbers')
   console.log(topNumbersFromDayAndTime, 'topNumbersFromDayAndTime')
   console.log(numbersForPlay, 'numbersForPlay')
  // let listOfPredictionall = spojiSveListeIVratiOneKojiSePonavljaju(sviBrojeviall,6)
  
  const sviBrojevi = [...brojeviZaPartijuBrojevi, ...misingNumbers, ...numbersForPlay,...topNumbersFromDayAndTime];
 
  
  // let listOfPrediction = spojiSveListeIVratiOneKojiSePonavljaju(sviBrojevi,6)
  
  // let listOfPredictionall = getRandomNumbersWithoutRepetition(sviBrojeviall,6)
   let listOfPredictionall = spojiSveListeIVratiOneKojiSePonavljaju(brojeviZaPartijuBrojevi,misingNumbers,numbersForPlay,topNumbersFromDayAndTime,6)
  // console.log(getRandomNumbersWithoutRepetition(listOfPredictionall,6))
  // console.log(getRandomNumbersWithoutRepetition(sviBrojevi,6))
  // checkMoneyStatusFor6NumbernextGame(listOfPredictionall,listOfPrediction)
  let listOfNumberRucnih = ['1','37','42','19','8','3','40']
  console.log(listOfPredictionall.map(Number).sort((a, b) => a - b) ,' koje igram')
  // console.log(listOfPrediction.map(Number).sort((a, b) => a - b) ,' koje ne igram')
  // console.log(listOfPrediction, 'koje ne igram')
  
  setTimeout(() => {
    checkMoneyStatusFor6NumbernextGame(listOfPredictionall.map(Number).sort((a, b) => a - b));
  }, 180000);
  
}
oneBigFunc()
cron.schedule('*/5 * * * *', oneBigFunc);






   
