import fs from 'fs';
function writeFileAsync(filePath, data) {
  return new Promise((resolve, reject) => {
      fs.writeFile(filePath, data, (err) => {
          if (err) {
              reject(err);
          } else {
             // console.log('Podaci su uspešno upisani u fajl.');
              resolve();
          }
      });
  });
}
export async function upisiListeUFajl(liste, filePath) {
  let data = '';

  liste.forEach((lista, index) => {
      data += `${index + 1}:[${lista.join(', ')}]\n`;
  });

  try {
      await writeFileAsync(filePath, data);
  } catch (error) {
      console.error('Greška prilikom upisa u fajl:', error);
  }
}

export async function upisiListeListaUFajl(liste, filePath) {
  let data = '';

  liste.forEach((lista, brojIteracije) => {
      const formatiranaLista = lista.map(item => `[${item.join(', ')}]`).join(', ');
      data += `${brojIteracije + 1} : [${formatiranaLista}]\n`;
  });

  try {
      await writeFileAsync(filePath, data);
  } catch (error) {
      console.error('Greška prilikom upisa u fajl:', error);
  }
}
function getFIle(filePath, targetDate) {
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

  function sortirajObjekatPoVrednostima(obj) {
    return Object.fromEntries(
      Object.entries(obj).sort(([, a], [, b]) => b - a)
    );
  }

  

  function brojPojavljivanjaBrojeva(listaIteracija) {
    const allRoundsMaxNumbers = [];
   
    for (const iteracija of listaIteracija) {
      let brojeviPonavljanje = new Array(48).fill(0);
  
      // Prolazak kroz svaki broj u iteraciji i brojanje
      for (const broj of iteracija) {
        brojeviPonavljanje[broj - 1]++;
      }
  
      // Sortiranje brojeva po vrednostima
      const brojeviObjekat = {};
      brojeviPonavljanje.forEach((broj, index) => {
        brojeviObjekat[index + 1] = broj;
      });
  
      const sortiraniBrojevi = {};
      Object.keys(brojeviObjekat).sort((a, b) => brojeviObjekat[b] - brojeviObjekat[a]).forEach(key => {
        sortiraniBrojevi[key] = brojeviObjekat[key];
      });
  
      allRoundsMaxNumbers.push(sortiraniBrojevi);
    }
  
    return allRoundsMaxNumbers;
  }
  
  function sortirajPoVrednostima(listaObjekata) {
    return listaObjekata.map(objekat => {
      const nizParova = Object.entries(objekat);
      nizParova.sort((a, b) => b[1] - a[1]);
      const sortiranObjekat = {};
      for (const [kljuc, vrednost] of nizParova) {
        sortiranObjekat[kljuc] = vrednost;
      }
      return sortiranObjekat;
    });
  }
  function saberiListe(listaIteracija) {
    let sumaPoBrojevima = {}; // Inicijalno prazan objekat za čuvanje sume
    
    const sveSumiraneListe = []; // Ovde ćemo čuvati sve sumirane liste za svaku iteraciju
  
    for (const iteracija of listaIteracija) {
      // console.log(iteracija)
      for (const [broj, brojPonavljanja] of Object.entries(iteracija)) {
        // console.log(broj,brojPonavljanja)
        sumaPoBrojevima[broj] = (sumaPoBrojevima[broj] || 0) + brojPonavljanja;
      }
  
      // Sortiranje objekta
      const nizParova = Object.entries(sumaPoBrojevima);
      
      nizParova.sort((a, b) => b[1] - a[1]);
      
      // Kreiranje novog objekta na osnovu sortiranog niza
      const sortiranObjekat = {};
  
      for (const [kljuc, vrednost] of nizParova) {
        sortiranObjekat[kljuc] = vrednost;
      }
  
      // Dodajemo sortiran objekat u listu sa rezultatima
      sveSumiraneListe.push(nizParova);
    }
  return sveSumiraneListe
    // Ispisivanje rezultata za svaku iteraciju
    sveSumiraneListe.forEach((iteracija, index) => {
      //console.log(`Iteracija ${index + 1}:`, iteracija);
    });
  }
  
  export function   brojanjeISortiranje(filePath,targetDate) {
    let listOfJustNumberAndIndex = [];
    // const filePath = 'putanja/do/vašeg/fajla.txt'; // Postavite putanju do vašeg fajla
    const listOfNumbers = getFIle(filePath, targetDate);
    const rezultat = brojPojavljivanjaBrojeva(listOfNumbers);
    const sortiraniRezultat = sortirajPoVrednostima(rezultat);
     const listOfEachRound = saberiListe(rezultat)
    // saberiListe(sortiraniRezultat);
    listOfEachRound.forEach(row => {
      const newList = row.map(item => item[0]);
      listOfJustNumberAndIndex.push(newList)
    });
    // console.log(listOfJustNumberAndIndex)
    const putanjaDoliste = 'D:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/listanajcesceIzvucenihBrojevasortiranaPoBrojuIzvlacenja.txt'; 

    upisiListeUFajl(listOfJustNumberAndIndex, putanjaDoliste);
    return listOfJustNumberAndIndex
   
 
  }

  export function getIndexOfFristNumbers(filePath,targetDate,numberOfFristNumbers){
    let jusIndexesForFristNumbers =[]
    let fristNumbersAndIndexForDate =[]
    const listOfNumbersForDay = getFIle(filePath, targetDate);
    const listOfIndexForDay = brojanjeISortiranje(filePath,targetDate)
    // console.log(listOfIndexForDay)
    for (let row =1 ; row < listOfNumbersForDay.length; row++){
      let fristNumbersAndIndexForRor = []
      let fristIndexForFristNumbers = []
      const element = listOfNumbersForDay[row];
      let fristNumbers = element.slice(0,numberOfFristNumbers)
      fristNumbers.forEach(number => {
        let indexOfNumber = -1; // Postavite početnu vrednost na -1

        // Pronalaženje indeksa u listi
        for (let i = 0; i < listOfIndexForDay[row - 1].length; i++) {
          
            if (listOfIndexForDay[row - 1][i] == number) {
                indexOfNumber = i+1;
                break; // Prekid kada je broj pronađen
            }
        }
        fristIndexForFristNumbers.push(indexOfNumber)
        
        fristNumbersAndIndexForRor.push([number, indexOfNumber]);
    });
    jusIndexesForFristNumbers.push(fristIndexForFristNumbers)
     fristNumbersAndIndexForDate.push(fristNumbersAndIndexForRor)
    }
    const putanjaDolisteListe = 'D:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/listaTopBrojevaIInexa.txt'; 
    const putanjaDolisteJustIndexes = 'D:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/justIndexOfFristNumbers.txt'; 

    upisiListeUFajl(jusIndexesForFristNumbers, putanjaDolisteJustIndexes);
    upisiListeListaUFajl(fristNumbersAndIndexForDate,putanjaDolisteListe)
    // console.log(jusIndexesForFristNumbers)
    return fristNumbersAndIndexForDate
  }

  


  




