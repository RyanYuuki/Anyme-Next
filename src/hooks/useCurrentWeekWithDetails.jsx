import { useState, useEffect } from 'react';

const useCurrentMonthWithDetails = () => {
  const [month, setMonth] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // First day of the month
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Last day of the month

    const monthArray = [];
    for (let date = startOfMonth; date <= endOfMonth; date.setDate(date.getDate() + 1)) {
      const day = new Date(date);
      monthArray.push({
        weekday: day.toLocaleDateString(undefined, { weekday: 'long' }),
        day: day.getDate(),
        dayNumber: String(day.getDate()).padStart(2, '0'), // Day number (01-31)
        month: day.toLocaleDateString(undefined, { month: 'long' }),
        monthNumber: String(day.getMonth() + 1).padStart(2, '0'), // Month number (01-12)
        year: day.getFullYear(),
      });
    }

    setMonth(monthArray);
  }, []);

  return month;
};

export default useCurrentMonthWithDetails;
