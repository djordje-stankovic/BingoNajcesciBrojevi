import fs from 'fs';
function analyzeFile(filePath, targetDate) {
    try {
      // Čitanje sadržaja fajla
      const data = fs.readFileSync(filePath, 'utf8');
      
      // Razdvajanje teksta po redovima
      const lines = data.split('\n');
      
      const results = []; // Rezultati će biti smešteni u listi
      
      let isTargetDate = false; // Flag za praćenje da li smo došli do traženog datuma
      
      lines.forEach(line => {
        // Razdvajanje linije na datum i brojeve
        const [datePart, numbersPart] = line.split(' :,');
      
        if (datePart && numbersPart,numbersPart) {
          // Izdvajanje datuma bez vremena
          const date = datePart.trim().split(' - ')[0];
          
          // Provera da li smo došli do traženog datuma
          if (date === targetDate) {
            isTargetDate = true;
          }
          
          // Ako smo došli do traženog datuma ili ga već prošli, dodajemo brojeve u rezultate
          if (isTargetDate) {
            // Izdvajanje brojeva
            const numbers = numbersPart.split(',').map(Number);
            
            // Dodavanje liste brojeva u rezultate
            results.push(numbers);

          }
        }
      });
      
      
      return results;
    } catch (error) {
      console.error('Došlo je do greške pri čitanju fajla:', error);
      return null;
    }
  }

 


function brojanjeISortiranje() {
    // Spajamo sve listove u jedan veliki niz
    const listOfNumbers = analyzeFile(filePath, targetDate);

    // Objekat za brojanje ponavljanja brojeva po svakoj iteraciji
    const brojaciPoIteracijama = [];

    listOfNumbers.forEach((iteracija, index) => {
        console.log(`Iteracija ${index + 1}:`);

        // Objekat za brojanje ponavljanja brojeva u trenutnoj iteraciji
        const ukupniBrojac = {};

        // Spajamo sve listove u jedan veliki niz za trenutnu iteraciju
        const flattenedArray = iteracija.flat();

        // Brojimo ponavljanje svakog broja u trenutnoj iteraciji
        flattenedArray.forEach((broj) => {
            ukupniBrojac[broj] = (ukupniBrojac[broj] || 0) + 1;
        });

        // Sortiramo brojeve za trenutnu iteraciju prema broju ponavljanja
        const sortiraniBrojevi = Object.entries(ukupniBrojac).sort((a, b) => b[1] - a[1]);

        // Ispisujemo rezultat za trenutnu iteraciju
        sortiraniBrojevi.forEach(([broj, ponavljanje]) => {
            // console.log(`${broj}: ${ponavljanje}`);
        });

        // Dodajemo trenutni brojač u listu brojača po iteracijama
        brojaciPoIteracijama.push(ukupniBrojac);
    });

    // Ispisujemo sve brojače po iteracijama
    brojaciPoIteracijama.forEach((brojac, index) => {
        // console.log(`Brojač za iteraciju ${index + 1}:`);
      
    });
    console.log(brojaciPoIteracijama);
}


 

  
 

  
  const filePath = 'D:/Djordje.stankovic/BingoTest/output.txt';
  const targetDate = '17.10.2023.';
  brojanjeISortiranje()

