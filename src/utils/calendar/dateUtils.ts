import type { MonthData, DayData } from '../../types/calendar';

export function getMonthData(date: Date): MonthData {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const days: DayData[] = [];
  
  // Add days from previous month
  const firstDayOfWeek = firstDay.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i);
    days.push({
      date: prevDate,
      isCurrentMonth: false,
      hasCompletedRoutines: false,
    });
  }
  
  // Add days from current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const currentDate = new Date(year, month, i);
    days.push({
      date: currentDate,
      isCurrentMonth: true,
      hasCompletedRoutines: Math.random() > 0.5, // Simulate completed routines
    });
  }
  
  // Add days from next month
  const remainingDays = 42 - days.length; // 6 rows × 7 days
  for (let i = 1; i <= remainingDays; i++) {
    const nextDate = new Date(year, month + 1, i);
    days.push({
      date: nextDate,
      isCurrentMonth: false,
      hasCompletedRoutines: false,
    });
  }

  return {
    monthName: date.toLocaleString('default', { month: 'long' }),
    days,
  };
}