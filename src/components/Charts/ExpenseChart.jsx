import React from "react";
import ReactApexChart from "react-apexcharts";
import { calculatePercentage } from "../../config";

const ExpenseChart = ({expenseAmount, totalFoodExpense, totalTravelExpense, totalEntertainmentExpense}) => {
  const options = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Food", "Travel", "Entertainment"],
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      show: false,
    },
  };

  const series = [
    calculatePercentage(totalFoodExpense?.amount, expenseAmount),
    calculatePercentage(totalTravelExpense?.amount, expenseAmount),
    calculatePercentage(totalEntertainmentExpense?.amount, expenseAmount),
  ];

  return (
    <ReactApexChart options={options} series={series} type="pie" width={250} />
  );
};

export default ExpenseChart;
