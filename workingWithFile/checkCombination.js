import fs from 'fs';



const valuesList = [0,0,0,0,0, 25000, 15000, 7500, 3000, 1250, 700, 350, 250, 175, 125, 100, 90, 80, 70, 60, 50, 35, 25, 20, 15, 12, 10, 8, 7, 6, 5, 4, 3, 2, 1];
// Funkcija za pisanje najčešćih brojeva u fajl


function checkUserNumbers(userNumbers, currentNumbers) {
  return userNumbers.every(number => currentNumbers.includes(number));
}

// Funkcija za izvršavanje zadatka
export function checkMoneyStatusFor6NumberForToday(userNumbers) {
    const filePath = 'D:/Djordje.stankovic/BingoTest/output.txt';
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    const currentDate = new Date().toLocaleDateString(); 
  
 
    const currentLines = lines.filter(line => line.startsWith(currentDate));
  
    let totalLoss = 0; // Ukupan gubitak
  
    for (let i = 0; i < currentLines.length; i++) {
      const line = currentLines[i];
  
      // Provera da li linija ima sadržaj
      if (!line.trim()) {
        console.log(`Linija ${i + 1} je prazna.`);
        continue;
      }
  
    
      if (!line.startsWith(currentDate)) {
        console.log(`Linija ${i + 1} nema današnji datum.`);
        continue;
      }
  
      const parts = line.split(' :,');
      const numbersPart = parts[1];
      const numbers = numbersPart.split(',').map(Number);
  
      // Izdvajanje vremena iz linije
      const timeMatch = line.match(/\d{1,2}:\d{2}/);
      const time = timeMatch ? timeMatch[0] : '';
  
      const areUserNumbersDrawn = checkUserNumbers(userNumbers, numbers);
  
      if (areUserNumbersDrawn) {
        
        const lastIndex = userNumbers.map(num => numbers.lastIndexOf(num)).sort((a, b) => b - a)[0];
  
      
        const value = valuesList[lastIndex];
  
        
        const winnings = value !== undefined ? 50 * value - 50 : -50;
  
        totalLoss += winnings; 
        console.log(`Vreme: ${time}, brojevi: ${userNumbers.join(', ')}, Dobitak ${winnings} Ukupno stanje : ${totalLoss}.`);
      } else {
        totalLoss -= 50; // Oduzmite 50 od ukupnog gubitka ako brojevi nisu izvučeni
        console.log(`Vreme: ${time}, Ukupno stanje  ${totalLoss}.`);
      }
    }
  }





