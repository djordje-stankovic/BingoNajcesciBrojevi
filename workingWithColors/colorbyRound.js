import  fs from 'fs';

const filePath = 'putanja/do/vasg/fajla.txt';


// Mapiranje boja na brojeve
const boje = {
  1: "crvena",
  2: "zelena",
  3: "plava",
  4: "ljubičasta",
  5: "braon",
  6: "žuta",
  7: "narandžasta",
  8: "crna"
};

const bojeasList = [
  "crvena",
  "zelena",
 "plava",
  "ljubičasta",
  "braon",
   "žuta",
 "narandžasta",
   "crna"
];

export function getMostPulledOutColorForLastGames(){

}



export function getColorForLastGames(filePath, numberOfGames) {
    const statistics = [];
  
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n').reverse().slice(0, numberOfGames);

    lines.forEach((line) => {
      const parts = line.split(' :,') // Dodajte datum i vreme
      const dateAndTime = parts[0]
      const bojeBrojeva = {};
  
       
      if (parts.length === 2) {
        const numbers = parts[1].split(',').map(Number);
  
        numbers.forEach((broj) => {
          const bojaBroja = boje[(broj - 1) % 8 + 1];
  
          if (bojeBrojeva[bojaBroja] === undefined) {
            bojeBrojeva[bojaBroja] = 1;
          } else {
            bojeBrojeva[bojaBroja]++;
          }
        });
  
        const bojeStatistika = Object.entries(bojeBrojeva).map(([boja, broj]) => ({
          boja,
          brojIzaslih: broj,
        }));
  
        statistics.push({ dateAndTime, bojeStatistika });
      }
    });
    // console.log(statistics, 'statistikaaaaaaaa')
    // Sada možete koristiti niz "statistics" za dalju obradu ili ga upisati u fajl
    const outputFilePath = 'colorOfLastGames.txt';
    fs.writeFileSync(outputFilePath, formatirajStatistiku(statistics));
    const totalBojeSum = {};

  statistics.forEach(({ bojeStatistika }) => {
    bojeStatistika.forEach(({ boja, brojIzaslih }) => {
      if (totalBojeSum[boja] === undefined) {
        totalBojeSum[boja] = brojIzaslih;
      } else {
        totalBojeSum[boja] += brojIzaslih;
      }
    });
  });

  // Izlogujte sume za sve boje
  
    // console.log(totalBojeSum);
     const najredjaBoja = findColorWithMinValue(totalBojeSum);
     console.log(najredjaBoja)
     const brojeviZaNajcescuBoju = getNumbersForColor( najredjaBoja);


// console.log(`Boja sa najvećom vrednošću: ${najcescaBoja}`);

   
 return brojeviZaNajcescuBoju;
  }

  function formatirajStatistiku(statistics) {
  const redosledBoja = ["crvena", "zelena", "plava", "ljubičasta", "braon", "žuta", "narandžasta", "crna"];

    let formatted = "";
    statistics.forEach((stat) => {
      formatted += `${stat.dateAndTime} :`;
  
      // Iterirajte kroz željeni redosled boja
      redosledBoja.forEach((boja) => {
        // Pronađite statistiku za trenutnu boju
        const bojaStat = stat.bojeStatistika.find((item) => item.boja === boja);
        if (bojaStat) {
          formatted += ` ${bojaStat.boja}: ${bojaStat.brojIzaslih},`;
        } else {
          // Ako nema statistike za trenutnu boju, dodajte 0
          formatted += ` ${boja}: 0,`;
        }
      });
  
      formatted = formatted.slice(0, -1); // Uklonite poslednji zarez
      formatted += '\n';
    });
    return formatted;
  }

  function findColorWithMinValue(obj) {
    let minColor = null;
    let minValue = Infinity;
    
    for (const color in obj) {
      if (obj[color] < minValue) {
        minColor = color;
        minValue = obj[color];
      }
    }
    
    return minColor;
  }
  function getNumbersForColor(boja) {
    let number
    for (let index = 0; index < bojeasList.length; index++) {
      if (bojeasList[index] == boja){
        number = index + 1
      }
      
    }
   
    const brojeviZaBoju = [];
    for (let i = number; i <= 48; i += 8) {
      brojeviZaBoju.push(i);
    }
    return brojeviZaBoju;
  }