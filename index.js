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
      await page.waitForTimeout(1000);

      // Tvoja postojeća logika za klikanje na brojeve
      try {
        await page.waitForSelector('.accept-button');

        // Klikni na dugme "Sačuvaj i zatvori"
        await page.click('.accept-button');

        await page.waitForSelector('#onesignal-slidedown-cancel-button');

        // Kliknite na dugme "Allow"
        await page.click('#onesignal-slidedown-cancel-button');
        await page.waitForTimeout(2000);

        const headerSelector = '#pageWrapper > div > header';
        const header = await page.$(headerSelector);
        console.log(header, 'header')
        if (header) {
          const articlesSelector = 'section > article';
          const allArticles = await header.$$(articlesSelector);
        
          // Proverite da li postoji barem jedan article element
          if (allArticles.length > 0) {
            const lastArticle = allArticles[allArticles.length - 1];
            console.log(lastArticle, 'last Ar');
          
            // Sačekajte 2 sekunde da se elementi učitaju
            await page.waitForTimeout(1000);
          
            // Pronađite formu unutar poslednjeg article elementa koristeći relativni selektor
            const formElementSelector = 'section.user-nav.logged-out form.new-login-form';
const formElement = await page.$(formElementSelector);

          
            if (formElement) {
              console.log('Forma nadjena ')
              const loginButtonSelector = 'a.login-btn.new-version';
                  const loginButton = await formElement.$(loginButtonSelector);

                  if (loginButton) {
                    // Kliknite na gumb za prijavu
                    await loginButton.click();
                    console.log('Kliknuto na gumb za prijavu.');
                  } else {
                    console.log(`Element sa selektorom ${loginButtonSelector} nije pronađen unutar forme.`);
                  }
              
              // const loginLinkSelector = 'a.login-btn.new-version';
              // const loginLink = await formElement.$(loginLinkSelector);
          
              // if (loginLink) {
              //   await loginLink.click();
              //   console.log('Kliknuto na link za prijavu.');
              // } else {
              //   console.log(`Element sa selektorom ${loginLinkSelector} nije pronađen unutar forme.`);
              // }
              // Ovde možete nastaviti sa tvojim kodom za rad sa formom
            } else {
              console.log(`Element sa selektorom ${formElementSelector} nije pronađen unutar poslednjeg article elementa.`);
            }
          } else {
            console.log(`Nijedan element sa selektorom ${articlesSelector} nije pronađen unutar header-a.`);
          }
          
          
        } else {
          console.log('Element #pageWrapper > div > header nije pronađen.');
        }

     
      

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
