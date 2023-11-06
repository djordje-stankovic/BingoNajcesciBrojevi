import fs from 'fs';

function analyzeFile(filePath) {
  try {
    // Čitanje sadržaja fajla
    const data = fs.readFileSync(filePath, 'utf8');
    
    // Razdvajanje teksta po redovima
    const lines = data.split('\n');
    
    const results = {}; // Rezultati će biti smešteni u objektu
    
    lines.forEach(line => {
      // Razdvajanje linije na datum i brojeve
      const [datePart, numbersPart] = line.split(' :,');
      
      if (datePart && numbersPart) {
        // Izdvajanje datuma bez vremena
        const date = datePart.trim().split(' - ')[0];
        
        // Izdvajanje brojeva
        const numbers = numbersPart.split(',').map(Number);
        
        // Kreiranje objekta za čuvanje brojeva i njihovih frekvencija za ovaj datum
        if (!results[date]) {
          results[date] = {};
        }
        
        // Brojanje ponavljanja brojeva za ovaj datum
        numbers.forEach(number => {
          results[date][number] = (results[date][number] || 0) + 1;
        });
      }
    });
    
    return results;
  } catch (error) {
    console.error('Došlo je do greške pri čitanju fajla:', error);
    return null;
  }
}

// Funkcija za zapisivanje rezultata u fajl
function writeResultsToFile(results, outputFilePath) {
  try {
    const outputStream = fs.createWriteStream(outputFilePath);
    
    for (const date in results) {
      const numbersAndFrequency = results[date];
      const resultArray = [];
      
      for (let number = 1; number <= 48; number++) {
        const frequency = numbersAndFrequency[number] || 0;
        resultArray.push(`${number} : ${frequency}`);
      }
      
      const resultLine = `${date} ${resultArray.join(', ')}`;
      outputStream.write(resultLine + '\n');
    }
    
    outputStream.end();
    // console.log('Rezultati su uspešno zapisani u fajl.');
  } catch (error) {
    // console.error('Došlo je do greške pri pisanju u fajl:', error);
  }
}

// Funkcija za izdvajanje 6 brojeva sa najvećom frekvencijom
function extractTopNumbers(results) {
  const topNumbersByDate = {};
  
  for (const date in results) {
    const numbersAndFrequency = results[date];
    
    // Sortiranje brojeva po frekvenciji u opadajućem redosledu
    const sortedNumbers = Object.keys(numbersAndFrequency).sort((a, b) => numbersAndFrequency[b] - numbersAndFrequency[a]);
    
    // Izdvajanje prvih 6 brojeva
    const topNumbers = sortedNumbers.slice(0, 47);
    
    // Dodavanje ovih brojeva u rezultat
    topNumbersByDate[date] = topNumbers;
  }
  
  return topNumbersByDate;
}
function writeTopNumbersToFile(topNumbersByDate, outputTopNumbersFilePath) {
    try {
      const outputStream = fs.createWriteStream(outputTopNumbersFilePath);
  
      for (const date in topNumbersByDate) {
        const topNumbers = topNumbersByDate[date].slice(0, 47);
        const resultLine = `${date}: ${topNumbers.join(', ')}`;
        outputStream.write(resultLine + '\n');
      }
  
      outputStream.end();
      // console.log('Najčešći brojevi po datumima su uspešno zapisani u fajl.');
    } catch (error) {
      // console.error('Došlo je do greške pri pisanju najčešćih brojeva u fajl:', error);
    }
  }
export function getTopNumbers(dateOfDay) {
    const filePath = 'D:/Djordje.stankovic/BingoTest/output.txt'; // Postavite putanju do vašeg fajla
    const analysisResult = analyzeFile(filePath);
  
    // Postavite putanju do fajla u koji želite da zapišete rezultate
    const outputFilePath = 'rezultati.txt';
  
    // Prikazivanje rezultata
    if (analysisResult) {
        const topNumbersByDate = extractTopNumbers(analysisResult);

        // Pisanje rezultata u fajl
        writeResultsToFile(analysisResult, outputFilePath);
      
        // Prikazivanje top 6 brojeva po datumima
        for (const date in topNumbersByDate) {
          const topNumbers = topNumbersByDate[date];
          // console.log(`Najčešći brojevi za datum ${date}: ${topNumbers.join(', ')}`);
        }
      
        // Pisanje najčešćih brojeva po datumima u poseban fajl
        const outputTopNumbersFilePath = 'najcesci_brojevi.txt';
     
        writeTopNumbersToFile(topNumbersByDate, outputTopNumbersFilePath);
        const brojeviZaDatum = topNumbersByDate[dateOfDay];
        // console.log(topNumbersByDate)
        

  return brojeviZaDatum
    }
}


  
  // Funkcija za praćenje frekvencije brojeva
  function trackNumberFrequency(results, numbersOrder) {
    const numberFrequency = {};
  
    for (let i = 0; i < numbersOrder.length; i++) {
      const number = numbersOrder[i];
      if (!numberFrequency[number]) {
        numberFrequency[number] = { count: 0, positions: [] };
      }
      numberFrequency[number].count++;
      numberFrequency[number].positions.push(i + 1); // Dodajemo 1 jer indeksi krecu od 0
    }
  
    return numberFrequency;
  }
  
  // Funkcija za izdvajanje brojeva koji se najmanje pojavljuju
  function extractLeastFrequentNumbers(numberFrequency, count) {
    const sortedNumbers = Object.keys(numberFrequency).sort(
      (a, b) => numberFrequency[a].count - numberFrequency[b].count
    );
  
    return sortedNumbers.slice(0, count);
  }
  
  // Funkcija za prikaz rezultata
  function displayResults(leastFrequentNumbers) {
    // console.log(`Najmanje frekventni brojevi za sledeći red: ${leastFrequentNumbers.join(', ')}`);
  }
  
  export function getLeastFrequentNumbers(count) {
    const filePath = 'D:/Djordje.stankovic/BingoTest/output.txt';
    const { results, numbersOrder } = analyzeFile(filePath);
    const numberFrequency = trackNumberFrequency(results, numbersOrder);
    const leastFrequentNumbers = extractLeastFrequentNumbers(numberFrequency, count);
    // console.log(leastFrequentNumbers,'leastFrequentNumbers')
    displayResults(leastFrequentNumbers);
  }
  
