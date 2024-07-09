import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const TimeDifference = ({ givenDate }) => {
  const [timeDifference, setTimeDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeDifference = () => {
      const givenDateTime = moment.tz(givenDate, "Asia/Dhaka");

      // Ensure givenDateTime is valid
      if (!givenDateTime.isValid()) {
        console.error("Invalid date format:", givenDate);
        return;
      }

      const currentDate = moment.tz("Asia/Dhaka");
      const duration = moment.duration(currentDate.diff(givenDateTime));

      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      setTimeDifference({ days, hours, minutes, seconds });
    };

    calculateTimeDifference();

    // Optional: Update the difference every second
    const intervalId = setInterval(calculateTimeDifference, 1000);
    return () => clearInterval(intervalId);
  }, [givenDate]);

  return (
    <p>
      Account created {timeDifference.days} days, {timeDifference.hours} hours,{" "}
      {timeDifference.minutes} minutes, and {timeDifference.seconds} seconds ago.
    </p>
  );
};

export default TimeDifference;
