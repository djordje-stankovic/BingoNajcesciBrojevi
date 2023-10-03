const fs = require('fs');
const cron = require('node-cron');
const simpleGit = require('simple-git');
// Funkcija za analizu fajla
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
    console.log('Rezultati su uspešno zapisani u fajl.');
  } catch (error) {
    console.error('Došlo je do greške pri pisanju u fajl:', error);
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
    const topNumbers = sortedNumbers.slice(0, 10);
    
    // Dodavanje ovih brojeva u rezultat
    topNumbersByDate[date] = topNumbers;
  }
  
  return topNumbersByDate;
}
function writeTopNumbersToFile(topNumbersByDate, outputTopNumbersFilePath) {
    try {
      const outputStream = fs.createWriteStream(outputTopNumbersFilePath);
  
      for (const date in topNumbersByDate) {
        const topNumbers = topNumbersByDate[date].slice(0, 10);
        const resultLine = `${date}: ${topNumbers.join(', ')}`;
        outputStream.write(resultLine + '\n');
      }
  
      outputStream.end();
      console.log('Najčešći brojevi po datumima su uspešno zapisani u fajl.');
    } catch (error) {
      console.error('Došlo je do greške pri pisanju najčešćih brojeva u fajl:', error);
    }
  }
function myTask() {
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
          console.log(`Najčešći brojevi za datum ${date}: ${topNumbers.join(', ')}`);
        }
      
        // Pisanje najčešćih brojeva po datumima u poseban fajl
        const outputTopNumbersFilePath = 'najcesci_brojevi.txt';
        writeTopNumbersToFile(topNumbersByDate, outputTopNumbersFilePath);
        const git = simpleGit();
                (async () => {
                    try {
                      await git.add('najcesci_brojevi.txt');
                      await git.commit('Dodat novi red unajcesci_brojevi.txt');
                      await git.push();
                      console.log('Dodao na git');
                    } catch (error) {
                      console.error('Greška pri slanju na git:', error);
                    }
                  })()
      // Dodajte ovde logiku za čitanje rezultata iz fajla i slanje na odgovarajuću lokaciju.
      // Na primer, možete koristiti FTP biblioteku za slanje rezultata na FTP server.
      // Takođe, možete koristiti HTTP POST za slanje rezultata na web server.
    }
}
 myTask()
cron.schedule('*/5 * * * *', myTask);