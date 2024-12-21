export interface DayData {
  date: Date;
  isCurrentMonth: boolean;
  hasCompletedRoutines: boolean;
}

export interface MonthData {
  monthName: string;
  days: DayData[];
}