import fs from 'fs';
import readline from 'readline';
//Za sve rezultate vraca listu rezultata po izvlacenju i broj koliko se koji broj puta ponovio
export function proveraNajcescihBrojevaZaSveDanePoVremenu(pathToFile) {
  // Čitanje datoteke
  const data = fs.readFileSync(pathToFile, 'utf8');

  // Razdvajanje datoteke na linije
  const lines = data.split('\n');

  const brojeviPoVremenu = {};

  // Prolazak kroz svaku liniju
  lines.forEach(line => {
    const parts = line.split(' - ');
    if (parts.length === 2) {
      const vreme = parts[1].split(' :,')[0]; // Izbacujemo datum i ':' iz vremena
      const brojevi = parts[1].split(' :,')[1].split(',').map(Number);

      // Ažuriranje brojača za svaki broj u vremenu
      if (!brojeviPoVremenu[vreme]) {
        brojeviPoVremenu[vreme] = {};
      }

      brojevi.forEach(broj => {
        if (!brojeviPoVremenu[vreme][broj]) {
          brojeviPoVremenu[vreme][broj] = 1;
        } else {
          brojeviPoVremenu[vreme][broj]++;
        }
      });
    }
  });

  const sortiraniRezultat = {};

  // Prvo, sortirajte vremena
  const sortiranaVremena = Object.keys(brojeviPoVremenu).sort();

  sortiranaVremena.forEach(vreme => {
    // Sortiranje brojeva po broju ponavljanja
    const sortiraniBrojevi = Object.keys(brojeviPoVremenu[vreme]).sort(
      (a, b) => brojeviPoVremenu[vreme][b] - brojeviPoVremenu[vreme][a]
    );

    // Pronalaženje broja sa najvećim brojem ponavljanja
    const brojSaNajvisePonavljanja = sortiraniBrojevi[0];

    const sortiranRezultatZaVreme = {};

    // Postavljanje broja sa najvećim brojem ponavljanja prvi
    sortiranRezultatZaVreme[brojSaNajvisePonavljanja] = brojeviPoVremenu[vreme][brojSaNajvisePonavljanja];

    // Popunite sortirani rezultat za ostale brojeve
    sortiraniBrojevi.slice(1).forEach(broj => {
      sortiranRezultatZaVreme[broj] = brojeviPoVremenu[vreme][broj];
    });

    sortiraniRezultat[vreme] = sortiranRezultatZaVreme;
  });
  const formatiraniRezultati = Object.keys(sortiraniRezultat).map(vreme => {
    const brojevi = sortiraniRezultat[vreme];
    const formatiraniBrojevi = Object.keys(brojevi)
      .map(broj => `${broj}:${brojevi[broj]}`)
      .join(', ');
    return `${vreme}: {${formatiraniBrojevi}}`;
  });

  const outputFilePath = 'd:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/BrojeviPoVremenima/najciseIzvuceniBrojeviZaPartijuPoVremenu.txt';

  // Upisivanje rezultata u fajl
  fs.writeFile(outputFilePath, formatiraniRezultati.join('\n'), 'utf8', (err) => {
    if (err) {
      console.error('Greška prilikom pisanja u fajl:', err);
    } else {
      // console.log(`Rezultati su uspešno upisani u "${outputFilePath}".`);
    }
  });

  return sortiraniRezultat;
}



export function pronadjiBrojeveZaVreme(pathToFile, trazenoVreme,numberOfMostNumbers) {
  // Čitanje datoteke
  
  const data = fs.readFileSync(pathToFile, 'utf8');
  
  // Razdvajanje datoteke na linije
  const lines = data.split('\n');
  
  const brojeviPoVremenu = {};
  let brojevi;
  // Prolazak kroz svaku liniju i traženje traženog vremena
  lines.forEach(line => {
    const parts = line.split(': ');
    if(parts[0] == trazenoVreme ){
      brojevi = parts[1]
    
    }
   

  });
  const trimmedString = brojevi.substring(1, brojevi.length - 1);
  const objFromLine = lineToObject(trimmedString);
  const sortedObj = Object.fromEntries(
    Object.entries(objFromLine).sort((a, b) => a[1] - b[1] || a[0] - b[0])
  );
  const entries = Object.entries(sortedObj);

// Sortiranje niza prema vrednostima opadajuće
entries.sort((a, b) => b[1] - a[1]);

// Izdvajanje prvih 10 elemenata
const top10Keys = entries.slice(0, numberOfMostNumbers).map(entry => entry[0]);
  
  // console.log(top10Keys);
 
  return top10Keys;
}
function lineToObject(line) {
  const keyValuePairs = line.split(', ');
  const obj = {};

  keyValuePairs.forEach(keyValue => {
    const [key, value] = keyValue.split(':');
    obj[parseInt(key)] = parseInt(value);
  });

  return obj;
}



export async function findMissingNumbers(filePath, brojRedova ) {
  // Lista za čuvanje brojeva
  const sviBrojevi = [];

  // Čitanje datoteke
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

  // Odabir poslednjih "brojRedova" redova
  const poslednjiRedovi = lines.slice(-brojRedova);

  // Iterirajte kroz svaki red
  poslednjiRedovi.forEach((red) => {
    // Proverite da li red sadrži " :,"
    if (red.includes(" :,")) {
      // Izdvojite brojeve iz reda
      const brojeviIzReda = red.split(' :,')[1].split(',').map(Number);

      // Dodajte izdvojene brojeve u listu svih brojeva
      sviBrojevi.push(...brojeviIzReda);
    }
  });

  // Generišite listu svih mogućih brojeva (od 1 do 48)
  const sviMoguciBrojevi = Array.from({ length: 48 }, (_, i) => i + 1);

  // Pronađite brojeve koji se nisu pojavili
  const nedostajuciBrojevi = sviMoguciBrojevi.filter(broj => !sviBrojevi.includes(broj));

  return nedostajuciBrojevi;
}

// export function spojiSveListeIVratiOneKojiSePonavljaju(listOfNumbers,brojBrojevaKojeZelimo){
//   const brojeviPonavljanja = {};
// let bigList = []
// let fristNumbers =[]

// // Iterirajte kroz sve brojeve i brojite njihova ponavljanja
// listOfNumbers.forEach((broj) => {
//   if (brojeviPonavljanja[broj] === undefined) {
//     brojeviPonavljanja[broj] = 1;
//   } else {
//     brojeviPonavljanja[broj]++;
//   }
// });

// console.log(brojeviPonavljanja, 'lista brojeva')
// const sortedNumbers = Object.entries(brojeviPonavljanja)
// .sort(([, a], [, b]) => b - a)
// .map(([broj]) => broj);
// console.log(sortedNumbers, 'sortedNumbers')
// //Ovde provera da li ih ima 6.
// return sortedNumbers.slice(0, brojBrojevaKojeZelimo);
// }

export function fristIndexOfDay(IndexPath,numbersOfIndex){
   // Čitanje datoteke
   const lines = fs.readFileSync(IndexPath, 'utf-8').split('\n');
  
   return lines.slice(numbersOfIndex)
}
// Sa brojevima koji u kojima se ne pojavljuje 3 broja sa istom bojom 
////-------...brojeviZaPartijuBrojevi, ...misingNumbers, ...numbersForPlay,...topNumbersFromDayAndTime
// export function spojiSveListeIVratiOneKojiSePonavljaju(brojeviZaPartijuBrojevi, misingNumbers, numbersForPlay, topNumbersFromDayAndTime, brojBrojevaKojeZelimo, justNumbersOftimeOfPartijaFromHistory) {
//   const brojeviPonavljanja = {};
//   let bigList = []
//   let fristNumbers = []
//   let listOfNumbers = [...brojeviZaPartijuBrojevi, ...numbersForPlay, ...topNumbersFromDayAndTime, ...justNumbersOftimeOfPartijaFromHistory]

//   // Iterirajte kroz sve brojeve i brojite njihova ponavljanja
//   listOfNumbers.forEach((broj) => {
//     if (brojeviPonavljanja[broj] === undefined) {
//       brojeviPonavljanja[broj] = 1;
//     } else {
//       brojeviPonavljanja[broj]++;
//     }
//   });

//   console.log(misingNumbers, 'mising');
//   const sortedNumbers = Object.entries(brojeviPonavljanja)
//     .sort(([, a], [, b]) => b - a)
//     .map(([broj]) => broj);

//   // Ovde provera da li ih ima 6.
//   // console.log(sortedNumbers, 'Svi brojevi koji dodju u listama');
//   const missingNumbersInSorted = misingNumbers.filter(num => !sortedNumbers.includes(num));

//   const numbersToAdd = missingNumbersInSorted.filter(num => !sortedNumbers.includes(num));

//   if (numbersToAdd.length > 0) {
//     sortedNumbers.unshift(...numbersToAdd);
//   }

//   // Pravite mapu boja brojeva
//   const bojeBrojeva = {};
//   // Definišite boje za brojeve
//   const boje = {
//     1: "crvena",
//     2: "zelena",
//     3: "plava",
//     4: "ljubičasta",
//     5: "braon",
//     6: "žuta",
//     7: "narandžasta",
//     8: "crna"
//   };

//   // Pravite mapu koja sadrži broj pojavljivanja svake boje
//   const bojeCount = {};

//   // Proverite boje u nizu `sortedNumbers`
//   const validNumbers = [];
//   sortedNumbers.forEach((broj) => {
//     const bojaBroja = boje[(broj - 1) % 8 + 1];
//     if (bojaBroja) {
//       if (bojeCount[bojaBroja] === undefined) {
//         bojeCount[bojaBroja] = 1;
//       } else {
//         bojeCount[bojaBroja]++;
//       }

//       if (bojeCount[bojaBroja] <= 3) {
//         validNumbers.push(broj);
//       }
//     }
//   });
//   console.log(validNumbers ,'Kao validni')
//   console.log(sortedNumbers, 'koji su sorted' )

//   return validNumbers.slice(0, brojBrojevaKojeZelimo);
// }


//-------...brojeviZaPartijuBrojevi, ...misingNumbers, ...numbersForPlay,...topNumbersFromDayAndTime
// export function spojiSveListeIVratiOneKojiSePonavljaju(colorsOfMostPulledOutBall,brojeviZaPartijuBrojevi, misingNumbers, numbersForPlay, topNumbersFromDayAndTime, brojBrojevaKojeZelimo, justNumbersOftimeOfPartijaFromHistory,brojlopticaKojiSeNajviseJAvljaju) {
//   const brojeviPonavljanja = {};
//   let bigList = []
//   let fristNumbers = []
//   let listOfNumbers = [...colorsOfMostPulledOutBall,...brojeviZaPartijuBrojevi, ...numbersForPlay, ...topNumbersFromDayAndTime, ...justNumbersOftimeOfPartijaFromHistory,...misingNumbers]

//   // Iterirajte kroz sve brojeve i brojite njihova ponavljanja
//   listOfNumbers.forEach((broj) => {
//     if (brojeviPonavljanja[broj] === undefined) {
//       brojeviPonavljanja[broj] = 1;
//     } else {
//       brojeviPonavljanja[broj]++;
//     }
//   });

//   console.log(brojeviPonavljanja, 'brojeviPonavljanja');
//   const sortedNumbers = Object.entries(brojeviPonavljanja)
//     .sort(([, a], [, b]) => b - a)
//     .map(([broj]) => broj);
// // console.log(sortedNumbers, 'SortedFromFunction')
//   // Ovde provera da li ih ima 6.
//   // console.log(sortedNumbers, 'Svi brojevi koji dodju u listama');
//   // console.log(brojeviPonavljanja,'brojeviPonavljanja')
//   const missingNumbersInSorted = misingNumbers.filter(num => !sortedNumbers.includes(num));
// const numbersToAdd = missingNumbersInSorted.filter(num => !sortedNumbers.includes(num));

// if (numbersToAdd.length > 0) {

//   //sortedNumbers.unshift(...numbersToAdd);
// //  console.log(numbersToAdd)
// }


// return sortedNumbers
// // return sortedNumbers.slice(0, brojBrojevaKojeZelimo);
 
// }

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function spojiSveListeIVratiOneKojiSePonavljaju(colorsOfMostPulledOutBall, brojeviZaPartijuBrojevi, misingNumbers, numbersForPlay, topNumbersFromDayAndTime, brojBrojevaKojeZelimo, justNumbersOftimeOfPartijaFromHistory, brojlopticaKojiSeNajviseJAvljaju) {
  const brojeviPonavljanja = {};
  console.log(colorsOfMostPulledOutBall, 'Rezultat ponavljanja 3')
  let bigList = []
  let fristNumbers = []
  let listOfNumbers = [...colorsOfMostPulledOutBall, ...brojeviZaPartijuBrojevi, ...numbersForPlay, ...topNumbersFromDayAndTime, ...justNumbersOftimeOfPartijaFromHistory, ...misingNumbers]

  // Iteriraj kroz sve brojeve i brojite njihova ponavljanja
  listOfNumbers.forEach((broj) => {
      if (brojeviPonavljanja[broj] === undefined) {
          brojeviPonavljanja[broj] = 1;
      } else {
          brojeviPonavljanja[broj]++;
      }
  });
  
  // console.log(listOfNumbers, 'list of numbers')
  // listOfNumbers.map(Number)
  // console.log(listOfNumbers, 'list of numbers as numbers')
  // Sortiraj brojeve prema ponavljanju
  const sortedNumbers = Object.entries(brojeviPonavljanja)
      .sort(([, a], [, b]) => b - a)
      .map(([broj]) => broj);
console.log(misingNumbers)
  // Dodaj nedostajuće brojeve
  // const missingNumbersInSorted = misingNumbers.filter(num => !sortedNumbers.includes(num));
  // const numbersToAdd = missingNumbersInSorted.filter(num => !sortedNumbers.includes(num));

  // if (numbersToAdd.length > 0) {
  //     sortedNumbers.unshift(...numbersToAdd);
  // }

  // Formiraj listu prema broju loptica koje se najviše javljaju
  const finalList = [];

    const addedNumbers = new Set();
// Pronađi maksimalnu vrednost iz brojeviPonavljanja
const maxCount = Math.max(...Object.values(brojeviPonavljanja));

// Dodaj brojeve prema maksimalnoj vrednosti
for (let i = maxCount; i > 1; i--) {
  const numbersWithCount = sortedNumbers.filter(num => brojeviPonavljanja[num] === i && !addedNumbers.has(num));
  if (numbersWithCount.length > 0) {
    // Ako ima više od jednog broja sa istim brojem ponavljanja,
    // njihov redosled se nasumicno menja pre dodavanja u finalList
    if (numbersWithCount.length > 1) {
      shuffleArray(numbersWithCount);
    }
    finalList.push(...numbersWithCount);
    numbersWithCount.forEach(num => addedNumbers.add(num));
  }
}

console.log(brojeviPonavljanja)
// Dodaj brojeve sa vrednošću 1 u random redosledu
const numbersWithValueOne = Object.keys(brojeviPonavljanja).filter(num => brojeviPonavljanja[num] === 1 && !addedNumbers.has(num));

while (numbersWithValueOne.length > 0) {
    const randomIndex = Math.floor(Math.random() * numbersWithValueOne.length);
    const selectedNumber = numbersWithValueOne[randomIndex];
    finalList.push(selectedNumber);
    addedNumbers.add(selectedNumber);
    numbersWithValueOne.splice(randomIndex, 1);
}


  return finalList.slice(0, brojlopticaKojiSeNajviseJAvljaju);
}






////////////////////////////--Brojevi koji se ne pojavljuju////////
export async function findNumbersInEachRow(filePath, brojRedova ) {
  // Lista za čuvanje brojeva koji su izasli u svakom redu
  const brojeviPoRedovima = [];

  // Čitanje datoteke
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

  // Odabir poslednjih "brojRedova" redova
  const poslednjiRedovi = lines.slice(-brojRedova);

  // Iterirajte kroz svaki red
  poslednjiRedovi.forEach((red) => {
    // Proverite da li red sadrži " :,"
    if (red.includes(" :,")) {
      // Izdvojite brojeve iz reda
      const brojeviIzReda = red.split(' :,')[1].split(',').map(Number);

      // Dodajte izdvojene brojeve u listu brojeva po redu
      brojeviPoRedovima.push(brojeviIzReda);
    }
  });
  const zajednickiBrojevi = findCommonNumbers(brojeviPoRedovima);

  return zajednickiBrojevi;
}


function findCommonNumbers(lists) {
  // Prva lista brojeva
  const firstList = lists[0];

  // Filtriranje brojeva koji se javljaju u svakoj listi
  const zajednickiBrojevi = firstList.filter((broj) => {
    return lists.every((lista) => lista.includes(broj));
  });

  return zajednickiBrojevi;
}



//////////////////////////Min brojevi Za igranje 

export function spojiSveListeIVratiOneKojiSePonavljajuZaNeIgranje(listOfNumbers,numberOfNumbers) {
  const brojeviPonavljanja = {};
  // let bigList = []
  // let fristNumbers = []
  // let listOfNumbers = [...colorsOfMostPulledOutBall,...brojeviZaPartijuBrojevi, ...numbersForPlay, ...topNumbersFromDayAndTime, ...justNumbersOftimeOfPartijaFromHistory,...misingNumbers]

  // Iterirajte kroz sve brojeve i brojite njihova ponavljanja
  listOfNumbers.forEach((broj) => {
    if (brojeviPonavljanja[broj] === undefined) {
      brojeviPonavljanja[broj] = 1;
    } else {
      brojeviPonavljanja[broj]++;
    }
  });

  const sortedNumbers = Object.entries(brojeviPonavljanja)
    .sort(([, a], [, b]) => b - a)
    .map(([broj]) => broj);
// console.log(sortedNumbers, 'SortedFromFunction')
  // Ovde provera da li ih ima 6.
  // console.log(sortedNumbers, 'Svi brojevi koji dodju u listama');
 


return sortedNumbers.slice(0, numberOfNumbers);
 
}

export function removeLastFromListOfPrediction(list,listaZaUporedjivanje) {
  // Čitanje datoteke
  let filePath = 'D:/Djordje.stankovic/BingoNajcesciBrojevi/najcesci_brojevi.txt';
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
  let lastNumbers = [];

  // Iteriranje unazad kroz redove
  for (let i = lines.length - 1; i >= 0; i--) {
    const red = lines[i].trim(); // Uklonite prazne znakove sa početka i kraja reda

    // Provera da li je red prazan
    if (red !== '') {
      const splitParts = red.split('.: ');
      if (splitParts.length >= 2) {
        const brojeviIzReda = splitParts[1].split(',').map(Number);
        lastNumbers.push(...brojeviIzReda);
        break; // Prekida petlju kada pronađe prvi red koji nije prazan
      } else {
     
      }
    }
  }
  let justLastNumbers = lastNumbers.slice(-10);
  list = list.map(Number); // Konvertujte sve brojeve iz stringova u brojeve
  list = list.filter((broj) => !justLastNumbers.includes(broj));
  console.log(list.map(Number).sort((a, b) => a - b), 'brojevi od kojih uzimam 6')
  

  const listNumbers = list.map(Number).sort((a, b) => a - b);
  const listaZaUporedjivanjeNumbers = listaZaUporedjivanje.map(Number).sort((a, b) => a - b);

  const zajednickiBrojevi = listNumbers.filter((broj) => listaZaUporedjivanjeNumbers.includes(broj));

  // Logovanje zajedničkih brojeva
  console.log(zajednickiBrojevi, 'Zajednički brojevi');
  const randomSix = getRandomNumbers(zajednickiBrojevi,6)
  // console.log(randomSix, '6 iz liste Random')


  // Vraćanje samo prvih 6 brojeva
  list = list.slice(0, 6);

  return {
    list: list.slice(0, 6),
    randomSix: randomSix,
  }
}


export function allWithIncrisedIndex(putanja){
  const sadrzaj = fs.readFileSync(putanja, 'utf-8');
  const linije = sadrzaj.split('\n').filter(line => line.trim().length > 0);
  
  const poslednjaDva = linije.slice(-2); // Poslednja dva reda

  const prviRed = poslednjaDva[0].match(/\[(.*)\]/)[1].split(',').map(Number);
  const drugiRed = poslednjaDva[1].match(/\[(.*)\]/)[1].split(',').map(Number);

  const brojevi = [];

  prviRed.forEach((num, index) => {
      if (index > 0) {
          const prviIndeks = prviRed.indexOf(num);
          const drugiIndeks = drugiRed.indexOf(num);

          if (
              (prviIndeks < drugiIndeks && prviIndeks > index) ||
              (drugiIndeks < prviIndeks && drugiIndeks < index)
          ) {
              brojevi.push(num);
          }
      }
  });

  return brojevi;
  // const sadrzaj = fs.readFileSync(putanja, 'utf-8');
  // const linije = sadrzaj.split('\n').filter(line => line.trim().length > 0);

  // const poslednjaTri = linije.slice(-3); // Poslednja tri reda

  // const prviRed = poslednjaTri[0].match(/\[(.*)\]/)[1].split(',').map(Number);
  // const drugiRed = poslednjaTri[1].match(/\[(.*)\]/)[1].split(',').map(Number);
  // const treciRed = poslednjaTri[2].match(/\[(.*)\]/)[1].split(',').map(Number);

  // const brojevi = [];

  // prviRed.forEach((num, index) => {
  //     if (index > 0) {
  //         const prviIndeks = prviRed.indexOf(num);
  //         const drugiIndeks = drugiRed.indexOf(num);
  //         const treciIndeks = treciRed.indexOf(num);
  //         console.log(prviIndeks,drugiIndeks,treciIndeks, num)

  //         // Provera da li se indeks povećao u odnosu na sve prethodne redove
  //         if (drugiIndeks < prviIndeks && treciIndeks < drugiIndeks) {
  //             brojevi.push(num);
  //         }
  //     }
  // });

 // return brojevi;
}

function getRandomNumbers(list, count) {
  if (count > list.length) {
    console.log("Traženi broj je veći od dužine liste.");
    return list;
  }

  const shuffledList = [...list]; // Kopira listu kako biste sačuvali originalni redosled
  for (let i = shuffledList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]]; // Zamena elemenata radi mešanja
  }

  const randomNumbers = shuffledList.slice(0, count);
  return randomNumbers;
}


