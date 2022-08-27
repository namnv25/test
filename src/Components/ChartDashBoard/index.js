import React from "react";
import styles from "./index.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

const ChartDashBoard = ({ months, dashBoard }) => {
  const timeWeek = dashBoard.sales_over_time_week;
  const timeMonth = dashBoard.sales_over_time_year;
  const time = months ? timeMonth : timeWeek;
  const array = Object.keys(time).map(function (key) {
    return time[key].total;
  });
  const labelsWeek = [
    "Today",
    "yesterday",
    "day 3",
    "day 4",
    "day 5",
    "day 6",
    "day 7",
  ];
  const labelsYear = [
    "this Month",
    "last month",
    "month 3",
    "month 4",
    "month 5",
    "month 6",
    "month 7",
    "month 8",
    "month 9",
    "month 10",
    "month 11",
    "month 12",
  ];
  const labels = months ? labelsYear : labelsWeek;
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: array,
      },
    ],
  };
  return (
    <>
      <div className="title">
        Revenue (last {months ? `12 month` : "7 days"})
      </div>
      <Bar options={options} data={data} />
    </>
  );
};
export default ChartDashBoard;
