import React from "react";
import ReactApexChart from "react-apexcharts";

export default function BarChart({ data }) {
  const seriesList = [];
  Object.entries(data?.data_series).map(([key, data]) =>
    seriesList.push({ name: key, data: data })
  );
  const series = seriesList;

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [
      function ({ value }) {
        if (value < 0) {
          return "#FF4560"; // Red for values below 0
        } else {
          return "#00E396"; // Green for values 0 and above
        }
      },
    ],
    xaxis: {
      categories: data?.categories,
    },
    yaxis: {
      title: {
        text: "",
      },

      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
  };

  return (
    <div className="mb-8 demoChart bg-white text-primary pt-2 px-4 rounded-2xl">
      <h2 className="!pt-0"> {data?.c_name}</h2>
      {/* <hr className="mb-2 border-gray-300" /> */}
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
}
