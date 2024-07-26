import React from "react";
import useCurrentWeekWithDetails from "../hooks/useCurrentWeekWithDetails";
const EstimatedSchedule = ({ handleScheduleDate, scheduleData }) => {
  const week = useCurrentWeekWithDetails();
  console.log(week);
  return (
    <div className="flex flex-row gap-5">
      <h1>Estimated Schedule</h1>
      <div className="flex flex-col">
        <div className="flex flex-row"></div>
      </div>
    </div>
  );
};

export default EstimatedSchedule;
