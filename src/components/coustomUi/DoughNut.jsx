import React, { useState } from "react";
import { RadialBarChart, RadialBar, Tooltip } from "recharts";
import styled from "styled-components";
import { Separator } from "../ui/separator";
import LineChartTool from "./LineChartTool";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px;
  position: relative; /* To position the title absolutely inside it */
`;

const CustomLegend = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;

  div {
    display: flex;
    align-items: center;
  }

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    background: ${(props) => props.background};
  }
`;

const CenteredTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.2em;
  pointer-events: none; /* So it doesn't interfere with tooltip */
`;

// Define the gradient colors
const gradients = [
  {
    id: "grad1",
    startColor: "#e3f2fd",
    middleColor: "#90caf9",
    endColor: "#42a5f5",
  },
  {
    id: "grad2",
    startColor: "#f3e5f5",
    middleColor: "#ce93d8",
    endColor: "#ab47bc",
  },
  {
    id: "grad3",
    startColor: "#e57373",
    middleColor: "#f44336",
    endColor: "#d32f2f",
  },
  {
    id: "grad4",
    startColor: "#ffb74d",
    middleColor: "#ffa726",
    endColor: "#f57c00",
  },
  {
    id: "grad5",
    startColor: "#4fc3f7",
    middleColor: "#29b6f6",
    endColor: "#0288d1",
  },
  {
    id: "grad6",
    startColor: "#81c784",
    middleColor: "#66bb6a",
    endColor: "#388e3c",
  },
];

const MultipleRadialBarChart = ({ data }) => {
  const [hoveredData, setHoveredData] = useState(null);

  const chartData = data.map((product, index) => ({
    name: product.name,
    value: product.stat[0].yearlyTotalSoldUnits,
    fill: `url(#grad${index + 1})`, // Apply gradient to each bar
    gradient: `linear-gradient(to right, ${gradients[index].startColor}, ${gradients[index].middleColor}, ${gradients[index].endColor})`
  }));

  return (
    <ChartContainer>
      <CardDescription className="mr-auto">Yearly Sold Units by Product</CardDescription>
      <CenteredTitle>
        {hoveredData ? 
         ( <CardHeader>
            <CardDescription className='font-bold'  style={{ background: hoveredData.gradient, WebkitBackgroundClip: 'text', color: 'transparent' }}>
              {hoveredData.name}
            </CardDescription>
            <CardTitle>{hoveredData.value}</CardTitle>
          </CardHeader>) : 
         ( <CardHeader>
            <CardDescription>Total Products</CardDescription>
            <CardTitle>3</CardTitle>
          </CardHeader>)
        }
      </CenteredTitle>
      <RadialBarChart
        width={300}
        height={300}
        cx="50%"
        cy="50%"
        innerRadius="50%"
        outerRadius="100%"
        barSize={18}
        data={chartData}
        startAngle={90}
        endAngle={-270}
      >
        <defs>
          {gradients.map((gradient) => (
            <linearGradient
              key={gradient.id}
              id={gradient.id}
              x1="0"
              y1="0"
              x2="1"
            >
              <stop offset="0%" stopColor={gradient.startColor} />
              <stop offset="50%" stopColor={gradient.middleColor} />
              <stop offset="100%" stopColor={gradient.endColor} />
            </linearGradient>
          ))}
        </defs>
        <RadialBar
          minAngle={15}
          clockWise
          dataKey="value"
          cornerRadius={10}
          onMouseEnter={(data, index) => setHoveredData(chartData[index])}
          onMouseLeave={() => setHoveredData(null)}
        />
      </RadialBarChart>
      <Separator />
      <CustomLegend>
        {chartData.map((entry, index) => (
          <div key={index}>
            <span style={{ background: entry.gradient }}></span>
            {entry.name}
          </div>
        ))}
      </CustomLegend>
    </ChartContainer>
  );
};

export default MultipleRadialBarChart;
