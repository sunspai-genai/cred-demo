import React from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";

export default function BarChart() {
  const currentMonth = dayjs().format("MMMM");
  const nextMonth = dayjs().add(1, "month").format("MMMM");
  const nextSixMonths = Array.from({ length: 6 }, (_, i) =>
    dayjs()
      .add(i + 2, "month")
      .format("MMMM")
  );

  //   const categories = [currentMonth, nextMonth, ...nextSixMonths];
  const categories = ["Current Month", "Next Month", "Next 6 month"];

  const series = [
    {
      name: "Sales",
      data: [30, 40, 100],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false, // Disable the toolbar
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    xaxis: {
      categories,
       

      labels: {
        style: {
          colors: "#FFFFFF", // Change x-axis label color to white
          fontSize: '1.1rem', 
          fontWeight:'700'
        },
      },
    },

    yaxis: {
      

      labels: {
        style: {
          colors: "#FFFFFF", // Change y-axis label color to white
          fontSize: '1.2rem', 
          
        },
      },
    },

    grid: {
    //   show: false, // Remove horizontal grid lines
    borderColor: 'rgba(255,255,255,0.1)', 
    },

    colors: ["var(--color-primary)"],
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={220}
      />
    </div>
  );
}
