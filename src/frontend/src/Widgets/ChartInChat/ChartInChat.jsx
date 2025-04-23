import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
export default function ChartInChat() {
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: "Walmart",
        data: [
          { x: new Date("2020-03-31").getTime(), y: 30 },
          { x: new Date("2021-03-31").getTime(), y: 40 },
          { x: new Date("2022-03-31").getTime(), y: 35 },
          { x: new Date("2023-03-31").getTime(), y: 50 },
          { x: new Date("2024-03-31").getTime(), y: 49 },
        ],
      },
    ],
    options: {
      chart: {
        type: "line",
        stacked: false,
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: [],
          },
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontFamily: `"Poppins", sans-serif`, // Change this to your desired font-family
        },
      },
      markers: {
        size: 0,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: "yyyy", // Display only the year
          style: {
            fontFamily: `"Poppins", sans-serif`, // Change this to your desired font-family
            fontWeight: "500",
          },
          datetimeFormatter: {
            year: 'yyyy',
            // month: 'MMM yyyy',
            // day: 'dd MMM',
            // hour: 'HH:mm',
          },
        },
      },
      yaxis: {
        title: {
          text: "CAGR analysis (CR)",
          style: {
            fontFamily: `"Poppins", sans-serif`, // Change this to your desired font-family
            fontWeight: "500",
          },
        },
      },
      colors: ["var(--color-primary)"],

      tooltip: {
        shared: true,
        hideEmptySeries: false, // Ensure zero values are shown in the tooltip
        style: {
          fontFamily: `"Poppins", sans-serif`, // Change this to your desired font-family
        },
      },
      //   title: {
      //     text: "Trend Monitoring : DSCR",
      //     align: "left",
      //     style: {
      //       fontFamily: `"Poppins", sans-serif`,
      //       fontWeight: "500",
      //     },
      //   },
    },
  });

  return (
    <div className="bg-white rounded-md mb-4 text-primary-deep font-[var(--default-font-family)]">
      <ReactApexChart
        options={chartOptions.options}
        series={chartOptions.series}
        type="area"
        height={200}
      />
    </div>
  );
}
