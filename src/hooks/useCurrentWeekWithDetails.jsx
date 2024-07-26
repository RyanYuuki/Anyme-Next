import { useState, useEffect } from 'react';

const useCurrentWeekWithDetails = () => {
  const [week, setWeek] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const startOfWeek = currentDate.getDate() - currentDate.getDay(); 
    const weekArray = [];

    for (let i = 0; i < 15; i++) {
      const day = new Date(currentDate.setDate(startOfWeek + i));
      weekArray.push({
        weekday: day.toLocaleDateString(undefined, { weekday: 'long' }),
        day: day.getDate(),
        month: day.toLocaleDateString(undefined, { month: 'long' }),
        monthNumber: String(day.getMonth() + 1).padStart(2, '0'), 
        year: day.getFullYear(),
      });
    }

    setWeek(weekArray);
  }, []);

  return week;
};

export default useCurrentWeekWithDetails;
