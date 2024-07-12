import React from 'react';
import Chart from 'react-apexcharts';

const MultipleRadialBarChart = ({ data }) => {
  const series = data.map(item => item.value);
  const labels = data.map(item => item.label);
  const colors = data.map(item => item.color);

  const options = {
    chart: {
      type: 'radialBar',
      background: 'transparent',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '50%',
          background: 'transparent',
        },
        track: {
          show: false, // Hides the track
        },
        dataLabels: {
          name: {
            show: true,
            color: '#fff',
          },
          value: {
            show: true,
            color: '#fff',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: () => series.reduce((a, b) => a + b, 0),
            color: '#fff',
          },
        },
       
      },
      },
    stroke: {
    lineCap: "round",
  },
    labels: labels,
    colors: colors,
  };

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <Chart options={options} series={series} type="radialBar" height="350" />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
            <div style={{ width: 10, height: 10, backgroundColor: item.color, marginRight: 5 }}></div>
            <div style={{ color: '#fff' }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleRadialBarChart;
