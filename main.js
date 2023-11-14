
import {checkMoneyStatusFor6NumberForToday} from './workingWithFile/checkCombination.js'
import {getTopNumbers} from './workingWithFile/topNumbersForDay.js'
import {brojanjeISortiranje,getIndexOfFristNumbers} from './workingWithFile/trackingIndexOfFristNumbers.js'
import {izvuciBrojeveIzFajla} from './workingWithFile/workingWithIndex.js'
import {proveraNajcescihBrojevaZaSveDanePoVremenu,pronadjiBrojeveZaVreme, findMissingNumbers,spojiSveListeIVratiOneKojiSePonavljaju,fristIndexOfDay,findNumbersInEachRow,spojiSveListeIVratiOneKojiSePonavljajuZaNeIgranje,removeLastFromListOfPrediction,allWithIncrisedIndex} from './workingWithTime/workingWithtimeOfpartija.js'
import {getPastWeekdays,findLinesInFile,najcesciBrojeeviZaDanIVremeokolo,getRandomNumbersWithoutRepetition,checkMoneyStatusFor6NumbernextGame,getTopNumberForJustPartijaTime,najredjiBrojeeviZaDanIVremeokolo,getnumbersForNotPlayForJustPartijaTime } from './workingWithTime/dayAndTimeOfPartija.js'
  import {getColorForLastGames } from './workingWithColors/colorbyRound.js'
import cron from 'node-cron';
import fs from 'fs';
import simpleGit from 'simple-git'
import crypto from 'crypto'

//Vraca Vreme sledece runde 


function generateUniqueRandomNumbers(min, max, count) {
  if (count > max - min + 1) {
    throw new Error('Nemoguće generisati toliko jedinstvenih brojeva.');
  }

  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}

function getTodayDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Mjeseci su indeksirani od 0 (januar) do 11 (decembar)
  const year = today.getFullYear();

  // Formatiranje datuma
  const formattedDay = day < 10 ? day : day.toString();
  const formattedMonth = month < 10 ? '0' + month : month.toString(); // Promena formata meseca

  const formattedDate = `${formattedDay}.${formattedMonth}.${year}.`;

  return formattedDate;
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

function getRandomNumbers(count) {
  const randomNumbers = [];
  while (randomNumbers.length < count) {
    const randomNumber = Math.floor(Math.random() * 48) + 1; // Generiše slučajan broj od 1 do 48
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }
  return randomNumbers;
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
   let numberOfIndexOfFristNumbers = 40;
   let numbersForPlay = await izvuciBrojeveIzFajla(filePathOfIndex,numberOfIndexOfFristNumbers)
      // console.log(numbersForPlay)
  
  //let rezultati =  await proveraNajcescihBrojevaZaSveDanePoVremenu(filePath)
  
  
  
  const vreme = getRoundedTime(); // Postavite vreme koje tražite
  let pathToFajlZapartije =  'd:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/BrojeviPoVremenima/najciseIzvuceniBrojeviZaPartijuPoVremenu.txt'; // Postavite putanju do vašeg fajla
  //Vraca za vreme partije najcesce izvucene brojeve kroz istoriju
  const brojeviZaPartiju = await pronadjiBrojeveZaVreme(pathToFajlZapartije, vreme,25);
  let putanjaDoSvihIzvlacenja = 'D:/Djordje.stankovic/BingoTest/output.txt'
  let misingNumbers = await findMissingNumbers(putanjaDoSvihIzvlacenja,3)


  // console.log(brojeviZaPartiju);
  // console.log(misingNumbers);
  //  console.log(numbersForPlay)
  const brojeviZaPartijuBrojevi = brojeviZaPartiju.map(Number);

  // Spajanje svih brojeva u jedan niz
  
  
  // let sviBrojeviUnqe = new Set(sviBrojevi);
  
  
  
  const brojBrojevaKojeVracam = 35;
  let indexPathh = 'd:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/listOfTopIndex.txt'
  let indexOfDay = fristIndexOfDay(indexPathh,brojBrojevaKojeVracam)
  let topNumbersOfDay = getTopNumbers(targetDate).slice(0,brojeviZaPartijuBrojevi)
  
  let lastNumbersForDay = getTopNumbers(targetDate).slice(-6)
  
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
  
  
  
   const topNumbersFromDayAndTime = najcesciBrojeeviZaDanIVremeokolo('./txtFajls/BrojeviPoVremenima/brojeviZaDanVreme5MinPlus.txt',brojBrojevaKojeVracam)
   


  // console.log(topNumbersFromDayAndTime,'topNumbers')
  
  const sviBrojeviall = [...brojeviZaPartijuBrojevi, ...misingNumbers, ...numbersForPlay, ...topNumbersOfDay,...topNumbersFromDayAndTime];
  //  console.log(topNumbersOfDay, 'topNumbersOfDay')
  //  console.log(brojeviZaPartijuBrojevi, 'brojeviZaPartijuBrojevi')
  //  console.log(misingNumbers, 'misingNumbers')
  //  console.log(topNumbersFromDayAndTime, 'topNumbersFromDayAndTime')
  //  console.log(numbersForPlay, 'numbersForPlay')
  // let listOfPredictionall = spojiSveListeIVratiOneKojiSePonavljaju(sviBrojeviall,6)
  
  const sviBrojevi = [...brojeviZaPartijuBrojevi, ...misingNumbers, ...numbersForPlay,...topNumbersFromDayAndTime];
 
  let justNumbersOftimeOfPartijaFromHistory = getTopNumberForJustPartijaTime(vreme,10)
  // console.log(justNumbersOftimeOfPartijaFromHistory.slice(0,6),'Brojevi koji se ponavljaju u svakoj partiji');
  // let listOfPrediction = spojiSveListeIVratiOneKojiSePonavljaju(sviBrojevi,6)
  
  // let listOfPredictionall = getRandomNumbersWithoutRepetition(sviBrojeviall,6)
  
  //13,8%
  //let listOfPredictionall = spojiSveListeIVratiOneKojiSePonavljaju(brojeviZaPartijuBrojevi,misingNumbers,numbersForPlay,topNumbersFromDayAndTime,6,justNumbersOftimeOfPartijaFromHistory)
  
  //bez Najcesce Izaslih Brojeva

  // console.log(justNumbersOftimeOfPartijaFromHistory,'Za vreme igranja')
let brojlopticaKojiSeNajviseJAvljaju = 20;
  let colorsOfMostPulledOutBall = getColorForLastGames(putanjaDoSvihIzvlacenja,3)

  // let listOfPredictionall = spojiSveListeIVratiOneKojiSePonavljaju(colorsOfMostPulledOutBall,brojeviZaPartijuBrojevi,misingNumbers,numbersForPlay,topNumbersFromDayAndTime,6,justNumbersOftimeOfPartijaFromHistory).slice(0,6)

  //let listOfPredictionall = spojiSveListeIVratiOneKojiSePonavljaju(colorsOfMostPulledOutBall,brojeviZaPartijuBrojevi,misingNumbers,numbersForPlay,topNumbersFromDayAndTime,6,justNumbersOftimeOfPartijaFromHistory,6)
  const putanjaDoFajla = 'D:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/listanajcesceIzvucenihBrojevasortiranaPoBrojuIzvlacenja.txt';
  const rezultat = allWithIncrisedIndex(putanjaDoFajla).map(Number).sort((a, b) => a - b)


  let listPrvihKOjiBitrebliDaSeIgraju = spojiSveListeIVratiOneKojiSePonavljaju(rezultat,brojeviZaPartijuBrojevi,misingNumbers,numbersForPlay,topNumbersFromDayAndTime,6,justNumbersOftimeOfPartijaFromHistory,brojlopticaKojiSeNajviseJAvljaju)


  // console.log(listOfPredictionall ,'koje vrati lista')

  //  console.log(listPrvihKOjiBitrebliDaSeIgraju ,'od kojih se biraju'
  

  const result = removeLastFromListOfPrediction(listPrvihKOjiBitrebliDaSeIgraju,rezultat);
  let listaNajcesceIzaslihBezNajredjeIzvucenihZaDanas = result.list
  const randomSix = result.randomSix
  
  
  

  ///////Brojevi koji ne izlaze
   let brojeviKojiNajredjeIzlaze = najredjiBrojeeviZaDanIVremeokolo('./txtFajls/BrojeviPoVremenima/brojeviZaDanVreme5MinPlus.txt',13)
  //  console.log(brojeviKojiNajredjeIzlaze,'Koji bi dosli u main');
   let brojeviZaPartijuPlusMinusPet = getnumbersForNotPlayForJustPartijaTime(vreme,13)
  //  console.log(brojeviZaPartijuPlusMinusPet, 'Koji ne izlaze filtrirani')
   let brojeviKojiSeJavljajuUPoslednjimRedovima = await findNumbersInEachRow(putanjaDoSvihIzvlacenja,8)

  // let sviBZaNeIgranje = [...brojeviKojiNajredjeIzlaze,...brojeviZaPartijuPlusMinusPet,...brojeviKojiSeJavljajuUPoslednjimRedovima]
  //  let brojeviKOjiNeBiTrebaloDaIzadju = spojiSveListeIVratiOneKojiSePonavljajuZaNeIgranje(sviBZaNeIgranje,6)
  // console.log("Rezultat:", rezultat);
  console.log(randomSix.map(Number).sort((a, b) => a - b),'random 6 iz liste izlazecih')
    console.log(listaNajcesceIzaslihBezNajredjeIzvucenihZaDanas.map(Number).sort((a, b) => a - b),'Koji  bi cesce trebalo da izadju')
 
  
  setTimeout(() => {
      checkMoneyStatusFor6NumbernextGame(listaNajcesceIzaslihBezNajredjeIzvucenihZaDanas.map(Number).sort((a, b) => a - b),'D:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/14-11Pracenje.txt');
      checkMoneyStatusFor6NumbernextGame(randomSix.map(Number).sort((a, b) => a - b),'D:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/14-11PracenjeRandomSix.txt');
     
      const git = simpleGit();
     (async () => {
         try {
            await git.add('txtFajls/14-11PracenjeRandomSix.txt');
            await git.add('txtFajls/14-11Pracenje.txt');
           await git.commit('dodataPartija');
           await git.push();
           console.log('Dodao na git');
         } catch (error) {
           console.error('Greška pri slanju na git:', error);
         }
       })()
 
    }, 180000);
  
}
oneBigFunc()
cron.schedule('*/5 * * * *', oneBigFunc);






   
