import fs from 'fs';

export function getPastWeekdays(numberOfWeeks, targetDay, targetTime) {
  console.log(targetTime);
  const weekdays = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
  const pastDates = [];
  const targetTimeParts = targetTime.split(':');
  let targetHour = parseInt(targetTimeParts[0], 10);
  let targetMinute = parseInt(targetTimeParts[1], 10);

  for (let i = 0; i < numberOfWeeks * 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - i);

    // Provera dana u nedelji
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === targetDay) {
      const formatTime = (hour, minute) => {
        const formatMinute = String(minute).padStart(2, '0');
        const formatHour = String(hour).padStart(2, '0');
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
  console.log(pastDates);

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