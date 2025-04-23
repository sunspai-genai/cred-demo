import React from "react";
import ReactApexChart from "react-apexcharts";

export default function LineChart({ data }) {
  const seriesList = [];
  Object.entries(data?.data_series).map(([key, data]) =>
    seriesList.push({ name: key, data: data })
  );
  const series = seriesList;

  const options = {
    chart: {
      type: data?.chart_type,
    },
    xaxis: {
      categories: data?.financial_years,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    dataLabels: {
      enabled: false,
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
    tooltip: {
      y: {
        formatter: function (val) {
          return "$" + val;
        },
      },
    },
  };
  return (
    <div className="mb-8 demoChart bg-white text-primary pt-2 px-4 rounded-2xl">
      <h2 className="!pt-0"> {data?.c_name}</h2>
      {/* <hr className="mb-2 border-gray-300" />  */}
      <ReactApexChart
        options={options}
        series={series}
        type={data?.chart_type}
        height={350}
      />
    </div>
  );
}
