import { useState, useEffect } from 'react';

const useCurrentWeekWithDetails = () => {
  const [week, setWeek] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const startOfWeek = currentDate.getDate() - currentDate.getDay(); // Get the first day of the week (Sunday)
    const weekArray = [];

    for (let i = 0; i < 8; i++) { // Next 7 days including today
      const day = new Date(currentDate.setDate(startOfWeek + i));
      weekArray.push({
        weekday: day.toLocaleDateString(undefined, { weekday: 'long' }),
        day: day.getDate(),
        month: day.toLocaleDateString(undefined, { month: 'long' }),
        year: day.getFullYear(),
      });
    }

    setWeek(weekArray);
  }, []);

  return week;
};

export default useCurrentWeekWithDetails;
