import DateType from './DateType';
import type { Themeday }from './themeday';

const holidays: readonly { readonly id: number, readonly name: string, readonly date: string, readonly category: string }[] = [
    {"id": 0, "name": "Day 1", "date": "21-03-10", "category": "Yearly" },
    {"id": 1, "name": "Day 2", "date": "21-03-11", "category": "Yearly" },
    {"id": 2, "name": "Day 3", "date": "21-04-01", "category": "Yearly" },
    {"id": 3, "name": "Day 4", "date": "21-04-21", "category": "Yearly" },
    {"id": 4, "name": "Day 5", "date": "21-12-21", "category": "Yearly" },
    {"id": 5, "name": "Day 6", "date": "22-01-01", "category": "Yearly" },
] 

const themedays: readonly Themeday[] = [
    {"id": 0, "title": "Internationella kvinnodagen", "date": new Date("2021-03-08"), "category": DateType.FixedDate },
    {"id": 1, "title": "St Patrick's Day", "date": new Date("2021-03-17"), "category": DateType.FixedDate },
    {"id": 2, "title": "Theravada New Year", "date": new Date("2021-04-27"), "category": DateType.Moveable },
    {"id": 3, "title": "Regnbågsfamiljernas dag", "date": new Date("2021-05-02"), "category": DateType.Moveable },
    {"id": 4, "title": "Teckenspråkets dag", "date": new Date("2021-05-14"), "category": DateType.FixedDate },
    {"id": 5, "title": "Global Accessibility Awareness Day ", "date": new Date("2021-05-20"), "category": DateType.Moveable  },
    {"id": 6, "title": "Norges nationaldag", "date": new Date("2021-05-17"), "category": DateType.FixedDate  },
    {"id": 7, "title": "Internationella dagen för världens ursprungsfolk", "date": new Date("2021-08-09"), "category": DateType.FixedDate  },
    {"id": 8, "title": "Jämställdhetsdagen", "date": new Date("2021-08-26"), "category": DateType.FixedDate  },
    {"id": 9, "title": "Programmerarens dag", "date": new Date("2021-09-13"), "category": DateType.Moveable  },
] 
 
export { holidays, themedays };