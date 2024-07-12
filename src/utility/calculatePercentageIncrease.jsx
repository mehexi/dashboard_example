export const calculatePercentageIncrease = (data) => {
    // Sort data by date
    const sortedData = data.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  
    // Get today's and yesterday's data
    const lastDay = sortedData[sortedData.length - 1];
    const previousDay = sortedData[sortedData.length - 2];
  
    // Calculate the percentage change
    const change = ((lastDay.totalUnits - previousDay.totalUnits) / previousDay.totalUnits) * 100;
    const isIncrease = change >= 0;
  
    return { change: Math.abs(change).toFixed(2), isIncrease };
  };