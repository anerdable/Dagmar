import { Themeday } from './themeday';
import { themedays as themedays } from './themedays';

function GetMarsDays(): readonly Themeday[] {
  const days = themedays.filter(day => +day.date.getMonth() ===  2);
  return days;
}

function GetDaysWithinMonth(month: number): readonly Themeday[] {
    const days = themedays.filter(day => +day.date.getMonth() ===  month);
    return days;
 }

 function GetListOfWeekdays(weekday: number) {
  let date = new Date();
  const year = date.getFullYear();
  date.setDate(1);
  while (date.getDay() !== weekday) {
    date.setDate(date.getDate() + 1);
  }
  const mondays = Array<Date>();

  // Get all the other Mondays in the month
  while (date.getFullYear() === year || date.getFullYear() === year+1) {
    date.setDate(date.getDate() + 7);
    const pushDate = new Date(date.getTime());
    mondays.push(pushDate);
  }
  return mondays;
 }

export { GetMarsDays, GetDaysWithinMonth, GetListOfWeekdays }