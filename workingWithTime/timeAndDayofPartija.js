import fs from 'fs';

export function getPastWeekdays(numberOfWeeks) {
    const weekdays = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
    const pastDates = [];
  
    for (let i = 0; i < numberOfWeeks * 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      const dayOfWeek = currentDate.getDay();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      pastDates.push(`${day}.${month}.${year} (${weekdays[dayOfWeek]})`);
    }
  
    return pastDates;
  }

  export function groupDatesByWeekday(dates) {
    const groupedDates = {
      Nedelja: [],
      Ponedeljak: [],
      Utorak: [],
      Sreda: [],
      Četvrtak: [],
      Petak: [],
      Subota: [],
    };
  
    dates.forEach((date) => {
      const parts = date.split(' ');
      const dayName = parts[1].slice(1, -1); // Uzimanje imena dana i uklanjanje zagrada
  
      if (groupedDates.hasOwnProperty(dayName)) {
        groupedDates[dayName].push(parts[0]);
      }
    });
  
    return groupedDates;
  }
  