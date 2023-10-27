import fs from 'fs';
import simpleGit from 'simple-git'

export function getPastWeekdays(numberOfWeeks, targetTime) {
  const weekdays = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
  const pastDates = [];
  const targetTimeParts = targetTime.split(':');
  let targetHour = parseInt(targetTimeParts[0], 10);
  let targetMinute = parseInt(targetTimeParts[1], 10);

  // Dodajte ovu liniju kako biste dobili trenutni dan u nedelji
  const currentDayOfWeek = new Date().getDay();

  for (let i = 0; i < numberOfWeeks * 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - i);

    // Izvući dan u nedelji iz trenutnog datuma
    const dayOfWeek = currentDate.getDay();

    // Dodajte uslov da se datumi dodaju samo za dane koji odgovaraju trenutnom danu u nedelji
    if (dayOfWeek === currentDayOfWeek) {
      const formatTime = (hour, minute) => {
        const totalMinutes = hour * 60 + minute;
        const newHour = Math.floor(totalMinutes / 60);
        const newMinute = totalMinutes % 60;
        
        const formatMinute = String(newMinute).padStart(2, '0');
        const formatHour = String(newHour).padStart(2, '0');
        return `${formatHour}:${formatMinute}`;
      };

      const times = [
        formatTime(targetHour, targetMinute - 5),  // Oduzmite 5 minuta
        formatTime(targetHour, targetMinute),       // Tačno u targetTime
        formatTime(targetHour, targetMinute + 5)    // Dodajte +5 minuta
      ];

      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;
      const formattedTimes = times.map((time) => `${formattedDate}. - ${time}`);

      pastDates.push(formattedTimes);
    }
  }
  //console.log(pastDates);

  return pastDates.flat();
}





  
  
  export function groupDatesByWeekday(dates) {
    const groupedDates = {
      Nedelja: [],
      Ponedeljak: [],
      Utorak: [],
      Sreda: [],
      Četvrtak: [],
      Petak: [],
      Subota: [],
    };
  
    dates.forEach((date) => {
      const parts = date.split(' ');
      const dayName = parts[1].slice(1, -1); // Uzimanje imena dana i uklanjanje zagrada
  
      if (groupedDates.hasOwnProperty(dayName)) {
        groupedDates[dayName].push(parts[0]);
      }
    });
  
    return groupedDates;
  }
  
  export function findLinesInFile(filePath, patterns) {
    const results = [];

    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');

        for (const line of lines) {
            for (const pattern of patterns) {
                if (line.startsWith(pattern)) {
                    results.push(line);
                    break; // Ako se pronađe podudaranje za dati obrazac, prelazi se na sledeći obrazac
                }
            }
        }
    } catch (error) {
        console.error('Greška prilikom čitanja fajla:', error);
    }

    return results;
}


export function najcesciBrojeeviZaDanIVremeokolo(filePath, numberOfNumbers) {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      const lines = data.split('\n');
  
      const numbersCount = {};
      const numbers = [];
  
      // Iteriraj kroz linije fajla i broji brojeve
      lines.forEach((line) => {
        const parts = line.split(':,');
        if (parts.length === 2) {
          const brojevi = parts[1].split(',').map(Number);
          brojevi.forEach((broj) => {
            if (numbersCount[broj]) {
              numbersCount[broj]++;
            } else {
              numbersCount[broj] = 1;
            }
          });
        }
      });
  
      // Sortiraj brojeve prema broju pojavljivanja
      const sortedNumbers = Object.keys(numbersCount).sort((a, b) => numbersCount[b] - numbersCount[a]);
  
      // Izdvoj prvih 'numberOfNumbers' najčešće pojavljujućih brojeva
      for (let i = 0; i < numberOfNumbers; i++) {
        numbers.push(Number(sortedNumbers[i]));
      }
  
      return numbers;
    } catch (error) {
      console.error('Greška prilikom čitanja fajla:', error);
      return [];
    }
  }
  export function getRandomNumbersWithoutRepetition(numbers, count) {
    if (count > numbers.length) {
      throw new Error("Count cannot be greater than the length of the array.");
    }
  
    // Konvertujte sve brojeve u listi u cele brojeve (integers)
    const integerNumbers = numbers.map((number) => parseInt(number, 10));
  
    if (count > integerNumbers.length) {
      throw new Error("Count cannot be greater than the number of available integers.");
    }
  
    const result = new Set();
  
    while (result.size < count) {
      const randomIndex = Math.floor(Math.random() * integerNumbers.length);
      const randomNumber = integerNumbers[randomIndex];
      result.add(randomNumber);
    }
  
    return Array.from(result).sort((a, b) => a - b);
  }

  ///Funkcija koja prati brojeve za sledecu partiju


  function findLargestIndex(userNumbers, numbers) {
    let listAsNumbers = userNumbers.map(Number)
    let largestIndex = -1;
  
    for (const number of listAsNumbers) {
      const index = numbers.indexOf(number);
   
      if (index > largestIndex) {
        largestIndex = index;
      }
    }
  
    return largestIndex;
  }
 
  
  
  function checkUserNumbers(userNumbers, currentNumbers) {
    
    return userNumbers.every(number => currentNumbers.includes(number));
  }

  export function getTopNumberForJustPartijaTime(datumOfPartija, indexOfwantedNumbers = 0) {
    const listOfNumbers = [];
    const filePath = 'D:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/BrojeviPoVremenima/brojeviZaDanVreme5MinPlus.txt';
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    
    const brojeviPonavljanja = {};
    let brojac  = 0
    // Iteriraj kroz linije i broji ponavljanja brojeva
    lines.forEach(line => {
      const [datePart, numbersPart] = line.split(' :,');
      const timePart = datePart.trim().split(' - ');
  
      if (timePart[1] == datumOfPartija) {
        const numbers = numbersPart.split(',').map(Number);
        console.log(numbers,'Brojevi za vreme ')
        numbers.forEach(broj => {
          if (brojeviPonavljanja[broj] === undefined) {
            brojeviPonavljanja[broj] = 1;
          } else {
            brojeviPonavljanja[broj]++;
          }
        });
        brojac = brojac + 1
      }
    });
  console.log(brojeviPonavljanja, 'lista brojeva koji se ponavljaju')
    // Filtriraj brojeve koji se pojavljuju u svakom redu
    const brojeviZaPrikaz = Object.keys(brojeviPonavljanja).filter(broj => brojeviPonavljanja[broj] === brojac);

    if (indexOfwantedNumbers !== 0) {
      return brojeviZaPrikaz.map(Number).slice(0, indexOfwantedNumbers);
    } else {
      return brojeviZaPrikaz.map(Number);
    }
  }


let totalWinnings = -1100;
export function checkMoneyStatusFor6NumbernextGame(userNumbers, previousWinnings = 0) {
  let currentTime = new Date();

  const filePath = 'D:/Djordje.stankovic/BingoTest/output.txt';
  const currentDate = new Date().toLocaleDateString();
  const valuesList = [0, 0, 0, 0, 0, 25000, 15000, 7500, 3000, 1250, 700, 350, 250, 175, 125, 100, 90, 80, 70, 60, 50, 35, 25, 20, 15, 12, 10, 8, 7, 6, 5, 4, 3, 2, 1];

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');

    // Filtrirajte samo poslednji red
    const lastLine = lines.pop(); // Uklonite poslednji red

    const parts = lastLine.split(' :,');
    const numbersText = parts[0]; // Prvi deo je datum i vreme partije
    const numbersPart = parts[1];
    const numbers = numbersPart.split(',').map(Number);

    const timeMatch = numbersText.match(/\d{1,2}:\d{2}/);
    const time = timeMatch ? timeMatch[0] : '';
    let missingUserNumbers = [];
  
    let numbersAllAsNumbers = numbersPart
    let userNumbersAsNumber = userNumbers.map(Number)
    
    userNumbersAsNumber.forEach(numbermising => {
      if (numbers.includes(numbermising)) {
console.log(numbermising,'Izaso broj')
      }
      else {
        missingUserNumbers.push(numbermising);
        console.log(numbermising)
     }
    });
   
    const areUserNumbersDrawn = checkUserNumbers(userNumbersAsNumber, numbers);
  
    if (missingUserNumbers.length == 0) {
      // Pronađite indeks poslednjeg izvučenog broja u listi
      const lastIndex = findLargestIndex(userNumbersAsNumber, numbers);
      console.log(lastIndex, 'lastIn')
      if (lastIndex !== -1) {
        const value = valuesList[lastIndex];
        var winnings = 50 * value - 50;
      } else {
        // Ako nijedan od brojeva korisnika nije izvučen, dobitak je -50
        winnings = -50;
      }
    } else {
      // Ako brojevi nisu izvučeni, dobitak je -50
      winnings = -50;
    }

    // Pratite ukupan dobitak tako da ga dodate dobitku iz prethodnih izvođenja
    totalWinnings += winnings;

    // Odredite brojeve koji nisu izvučeni iz korisničke liste
    

    // Kreirajte novu liniju sa podacima
    const newUserLine = `Lista: ${missingUserNumbers.length === 0 ? 'Izasla' : 'Nije izasla'}, Dobitak: ${winnings},  Lista: ${userNumbersAsNumber}${missingUserNumbers.length === 0 ? '' : `, Brojevi koji nisu izvučeni: [${missingUserNumbers}]`}`;


    const newLine = `${lastLine}, ${newUserLine}, Ukupno stanje: ${totalWinnings}`;
    currentTime = new Date();

    // Dodajte novu liniju na kraj fajla
    fs.appendFileSync('D:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/27-10PracenjePartije.txt', newLine + '\n', 'utf8');
    const git = simpleGit();
                (async () => {
                    try {
                      await git.add('txtFajls/27-10PracenjePartije.txt');
                      await git.commit('dodataPartija');
                      await git.push();
                      console.log('Dodao na git');
                    } catch (error) {
                      console.error('Greška pri slanju na git:', error);
                    }
                  })()
  } catch (err) {
    console.error('Došlo je do greške prilikom čitanja datoteke:', err);
  }
}


