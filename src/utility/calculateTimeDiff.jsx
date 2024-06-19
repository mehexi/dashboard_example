import React, { useState, useEffect } from "react";

const TimeDifference = ({ givenDate }) => {
  const [timeDifference, setTimeDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeDifference = () => {
      const givenDateTime = new Date(givenDate);
      const currentDate = new Date();
      const differenceInMilliseconds = currentDate - givenDateTime;

      const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor(
        (differenceInMilliseconds % (1000 * 60)) / 1000
      );

      setTimeDifference({ days, hours, minutes, seconds });
    };

    calculateTimeDifference();

    // Optional: Update the difference every second
    const intervalId = setInterval(calculateTimeDifference, 1000);
    return () => clearInterval(intervalId);
  }, [givenDate]);

  return (
      <p>
          account created {"    "}
      {timeDifference.days} days, {timeDifference.hours} hours ago
    </p>
  );
};

export default TimeDifference;
