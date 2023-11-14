import fs from 'fs';


function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

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

//Ovo broji najcesce indekse koji izlaze i trazi brojeve na tim indeksima iz najcesce izaslih brojeva
export async function izvuciBrojeveIzFajla(putanjaDoFajla, brojIndexa) {
    try {
        let numbersToPlayNext = []
        const data = await readFileAsync(putanjaDoFajla);

        const lines = data.split('\n');
        const numberCountMap = new Map();

        lines.forEach((line, lineNumber) => {
            const parts = line.split(':');
            if (parts.length !== 2) {
                // console.error(`Line ${lineNumber + 1} is not in the expected format. Skipping.`);
                return;
            }

            const numbers = parts[1].match(/\d+/g);

            if (!numbers) {
                console.error(`No numbers found in line ${lineNumber + 1}. Skipping.`);
                return;
            }

            numbers.map(Number).forEach((num) => {
                if (numberCountMap.has(num)) {
                    numberCountMap.set(num, numberCountMap.get(num) + 1);
                } else {
                    numberCountMap.set(num, 1);
                }
            });
        });

        const numberCounts = Array.from(numberCountMap, ([number, count]) => ({ number, count }));
        numberCounts.sort((a, b) => b.count - a.count);

        const numbersOnly = numberCounts.map((entry) => entry.number);
        const formattedData = numbersOnly.slice(0, 40).join(',');
        const indexOfNumbers = formattedData.split(',').map(Number);
        // 
        // console.log(brojevi)
        //  console.log(indexOfNumbers)

        await writeFileAsync('d:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/listOfTopIndex.txt', formattedData);

        const secondData = await readFileAsync('d:/Djordje.stankovic/BingoNajcesciBrojevi/txtFajls/listanajcesceIzvucenihBrojevasortiranaPoBrojuIzvlacenja.txt');
         const lines2 = secondData.split('\n');
        const lastLine = lines2[lines2.length -2];
       
        let lastMaxNumbersOnIndexRow = lastLine.split(':')
        let lastMaxNumbersOnIndex = lastMaxNumbersOnIndexRow[1].replace(/\[|\]/g, '');
        
       
        const numbersOfIndex =  lastMaxNumbersOnIndex.split(',').map(Number);
       
        indexOfNumbers.forEach(index => {
            numbersToPlayNext.push(numbersOfIndex[index -1])
        });
        // console.log(numbersToPlayNext, 'Numbes')
        //const vrednostiNaIndeksima = formattedData.map((formattedData) => lastMaxNumbersOnIndex[indeks]);
        // const vrednostiNaIndeksima = formattedData.split(',').map((broj) => lastMaxNumbersOnIndex[broj]);
        return numbersToPlayNext.slice(0,brojIndexa);
    } catch (error) {
        console.error('Greška:', error);
    }
    
}

function nadjiVrednostiNaIndeksima(prvaLista, indeksi) {
    const vrednosti = [];
    
    for (let i = 0; i < indeksi.length; i++) {
        const indeks = indeksi[i];
        if (indeks >= 0 && indeks < prvaLista.length) {
            vrednosti.push(prvaLista[indeks]);
        } else {
            vrednosti.push(null); // Indeks van opsega
        }
    }
    
    return vrednosti;
}

export function pronadjiNajcesceBrojeve(brojevi, brojNajcescih) {
    // Spajamo sve brojeve u jedan niz
    const sviBrojevi = [].concat(...brojevi);

    // Koristimo objekat za brojanje pojavljivanja svakog broja
    const brojPojavljivanja = sviBrojevi.reduce((rezultat, broj) => {
        rezultat[broj] = (rezultat[broj] || 0) + 1;
        return rezultat;
    }, {});

    // Sortiramo brojeve po broju pojavljivanja, silazno
    const sortiraniBrojevi = Object.keys(brojPojavljivanja).sort((a, b) => {
        return brojPojavljivanja[b] - brojPojavljivanja[a];
    });

    // Izdvajamo prvih brojNajcescih brojeva
    const najcesciBrojevi = sortiraniBrojevi.slice(0, brojNajcescih);

    return najcesciBrojevi;
}






