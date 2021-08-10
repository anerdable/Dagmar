import DateType from './DateType';

type Themeday = {
    readonly id: number; 
    readonly title: string;
    readonly date: Date;
    readonly category: DateType;
}; 

export type { Themeday };