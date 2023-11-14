import puppeteer from 'puppeteer';

export async function PlayCombination(selectedNumbers) {
  (async () => {
    function delay(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      env: { TZ: 'Europe/Belgrade' }
    });

    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36");

    try {
      await page.goto('https://www.mozzartbet.com/sr#/lucky-six', { timeout: 50000 });
      await page.waitForTimeout(3000);

      // Tvoja postojeća logika za klikanje na brojeve
      try {
        await page.waitForSelector('.accept-button');

        // Klikni na dugme "Sačuvaj i zatvori"
        await page.click('.accept-button');

        await page.waitForSelector('#onesignal-slidedown-cancel-button');

        // Kliknite na dugme "Allow"
        await page.click('#onesignal-slidedown-cancel-button');

        // Sačekajte da se izvrše eventualne promene nakon klika (npr. da se zatvori dijalog)
        await page.waitForTimeout(2000);

        // Pronađi sve brojeve unutar .numbers-wrapper i klikni na one koji se nalaze u listi selectedNumbers
        const numbersSelector = '.numbers-wrapper .number';
        const allNumbers = await page.$$(numbersSelector);

        for (let i = 0; i < allNumbers.length; i++) {
          const numberText = await allNumbers[i].$eval('.text.single', (element) => element.textContent.trim());
          if (selectedNumbers.includes(parseInt(numberText))) {
            await allNumbers[i].click();
            await page.waitForTimeout(500);
          }
        }
      } catch (error) {
        console.error('Greška:', error);
      }

      await delay(30000);
    } catch (error) {
      console.error('Greška pri otvaranju stranice:', error);
    } finally {
      await browser.close();
    }
  })();
}

// Primjer poziva funkcije sa listom brojeva [1, 3, 5, 7, 9, 11]
PlayCombination([1, 3, 5, 7, 9, 11]);
