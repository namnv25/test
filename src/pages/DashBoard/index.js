import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Row, Col, Switch } from "antd";
import ChartDashBoard from "../../Components/ChartDashBoard";
import BestSellers from "../../Components/BestSellers";
import MainLayout from "../../Components/MainLayout";
import axios from "axios";
import dayjs from "dayjs";
const DashBoard = () => {
  const [months, setMonths] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [dashBoard, setDashBoard] = useState({});

  const onChange = (checked) => {
    setMonths(checked);
  };
  useEffect(() => {
    axios
      .get("https://freddy.codesubmit.io/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setDashBoard(res.data.dashboard);
        setIsLoading(false);
      })
      .catch((err) => console.log("err", err));
  }, [token]);
  const today = () => {
    let index = 0;

    const getToday = dayjs().day();

    if (getToday === 7) {
      index = 7;
    } else {
      index = getToday;
    }

    return dashBoard && dashBoard?.sales_over_time_week?.[index];
  };

  const lastWeek = () => {
    let total = 0;
    let orders = 0;

    if (dashBoard?.sales_over_time_week) {
      Object.entries(dashBoard?.sales_over_time_week).forEach(
        ([key, value]) => {
          total += value.total;
          orders += value.orders;
        }
      );
    }

    return { total, orders };
  };

  const lastMonth = () => {
    const getMonth = dayjs().month() + 1;

    return dashBoard && dashBoard?.sales_over_time_year?.[getMonth];
  };

  const getRevenueToday = today();

  const getRevenueLastWeek = lastWeek();

  const getRevenueLastMonth = lastMonth();

  if (isLoading) return;
  return (
    <MainLayout>
      <div className={styles.pageDashBoard}>
        <div className="title">DashBoard</div>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <div className={styles.itemStatistics}>
              <div>Today</div>
              <div>
                ${getRevenueToday.total} / {getRevenueToday.orders} orders
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.itemStatistics}>
              <div>Last Week</div>
              <div>
                ${getRevenueLastWeek.total} / {getRevenueLastWeek.orders} orders
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.itemStatistics}>
              <div>Last Month</div>
              <div>
                ${getRevenueLastMonth.total} / {getRevenueLastMonth.orders}{" "}
                orders
              </div>
            </div>
          </Col>
        </Row>
        <Row className={styles.chart}>
          <ChartDashBoard months={months} dashBoard={dashBoard} />
          <div className={styles.switch}>
            <Switch onChange={onChange} />
          </div>
        </Row>
        <BestSellers data={dashBoard.bestsellers} />
      </div>
    </MainLayout>
  );
};
export default DashBoard;
