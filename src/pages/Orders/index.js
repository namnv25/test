import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Row, Input } from "antd";
import TableOrders from "../../Components/TableOrder";
import MainLayout from "../../Components/MainLayout";
import axios from "axios";
const { Search } = Input;
const Orders = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState({});
  const [page, setPage] = useState();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://freddy.codesubmit.io/orders", {
        params: {
          page: page,
          q: search,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setOrders(res.data.orders);
        setIsLoading(false);
      })
      .catch((err) => console.log("err", err));
  }, [token, search]);
  const onSearch = (value) => {
    console.log(value);
    setSearch(value);
  };
  const handleChange = (data) => {
    console.log("data", data);
    setPage(data);
  };
  if (isLoading) return;
  return (
    <MainLayout>
      <div className="title">
        <p>Orders</p>
        <Search
          placeholder="search"
          onSearch={onSearch}
          style={{
            width: 200,
          }}
          className={styles.search}
        />
      </div>
      <div>
        <TableOrders onChangeTable={handleChange} data={orders} />
      </div>
    </MainLayout>
  );
};
export default Orders;
