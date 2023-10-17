
import {checkMoneyStatusFor6NumberForToday} from './workingWithFile/checkCombination.js'
import {getTopNumbers} from './workingWithFile/topNumbersForDay.js'

getTopNumbers()//najcesce izvuceni brojevi po danovima
const userNumbers = [ 2, 39, 8, 10, 20, 27];  
//39, 29, 45, 47, 22, 24, 42, 5, 11, 7, 21, 23, 27
checkMoneyStatusFor6NumberForToday(userNumbers);

