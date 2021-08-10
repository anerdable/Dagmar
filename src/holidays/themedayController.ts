import { Themeday } from './themeday';
import { themedays as themedays } from './themedays';

function GetMarsDays(): readonly Themeday[] {
  const days = themedays.filter((day) => +day.date.getMonth() === 2);
  return days;
}
function GetDaysOfTheWeek(): readonly number[] {
  var week = new Array();
  // Starting Monday not Sunday
  let current = new Date();
  current.setHours(0, 0, 0, 0);
  current.setDate(current.getDate() - current.getDay() + 1);
  for (var i = 0; i < 7; i++) {
    week.push(new Date(current).getTime());
    current.setDate(current.getDate() + 1);
  }
  return week;
}

function GetEventsWithinWeek(): readonly Themeday[] {
  let week = GetDaysOfTheWeek();
  const days = themedays.filter((day) => week.includes(day.date.getTime()));
  return days;
}

function GetDaysWithinMonth(month: number): readonly Themeday[] {
  const days = themedays.filter((day) => +day.date.getMonth() === month);
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
  while (date.getFullYear() === year || date.getFullYear() === year + 1) {
    date.setDate(date.getDate() + 7);
    const pushDate = new Date(date.getTime());
    mondays.push(pushDate);
  }
  return mondays;
}

export {
  GetMarsDays,
  GetDaysWithinMonth,
  GetListOfWeekdays,
  GetEventsWithinWeek,
};
