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
  
  function   brojanjeISortiranje(filePath,targetDate) {
    // const filePath = 'putanja/do/vašeg/fajla.txt'; // Postavite putanju do vašeg fajla
    const listOfNumbers = analyzeFile(filePath, targetDate);
    const rezultat = brojPojavljivanjaBrojeva(listOfNumbers);
   
    const sortiraniRezultat = sortirajPoVrednostima(rezultat);
    const listOfEachRound = saberiListe(rezultat)
    // saberiListe(sortiraniRezultat);
     console.log(listOfEachRound)
 
  }


  
  
  const filePath = 'C:/Djordje/BingoNajcesciBrojevi-main/BingoNajcesciBrojevi-main/sviBrojevi.txt';
  const targetDate = '17.10.2023.';
  brojanjeISortiranje(filePath,targetDate)



