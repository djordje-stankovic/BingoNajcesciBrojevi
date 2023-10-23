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

  const outputFilePath = 'C:/Djordje/BingoNajcesciBrojevi/txtFajls/BrojeviPoVremenima/najciseIzvuceniBrojeviZaPartijuPoVremenu.txt';

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

export function spojiSveListeIVratiOneKojiSePonavljaju(listOfNumbers,brojBrojevaKojeZelimo){
  const brojeviPonavljanja = {};
let bigList = []
let fristNumbers =[]
// Iterirajte kroz sve brojeve i brojite njihova ponavljanja
listOfNumbers.forEach((broj) => {
  if (brojeviPonavljanja[broj] === undefined) {
    brojeviPonavljanja[broj] = 1;
  } else {
    brojeviPonavljanja[broj]++;
  }
});

// Ispisivanje brojeva i njihovih broja ponavljanja
for (const broj in brojeviPonavljanja) {
  if (brojeviPonavljanja[broj] > 1) {
   bigList.push(broj)
  }
}
if (bigList.length > brojBrojevaKojeZelimo){
   fristNumbers = bigList.slice(0,brojBrojevaKojeZelimo)
}
if(fristNumbers.length> 0 ){
  bigList = fristNumbers
}
return bigList
}

export function fristIndexOfDay(IndexPath,numbersOfIndex){
   // Čitanje datoteke
   const lines = fs.readFileSync(IndexPath, 'utf-8').split('\n');
  
   return lines.slice(numbersOfIndex)
}
