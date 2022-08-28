import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Input, Spin } from "antd";
import TableOrders from "../../Components/TableOrder";
import MainLayout from "../../Components/MainLayout";
import axios from "axios";
import { useHistory } from "react-router";
const { Search } = Input;
const Orders = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState({});
  const [page, setPage] = useState();
  const [total, setTotal] = React.useState(0);
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const params = {
      page: page,
      q: search,
    };
    Object.keys(params).forEach((key) => {
      if (params[key] == undefined || params[key] === "") {
        delete params[key];
      }
    });
    axios
      .get("https://freddy.codesubmit.io/orders", {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setOrders(res.data.orders);
        setTotal(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          history.push("/");
        }
      });
  }, [token, search, page]);
  const onSearch = (value) => {
    console.log(value);
    setSearch(value);
  };
  const onChangePage = (data) => {
    console.log("data", data);
    setPage(data);
  };
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
        {isLoading ? (
          <Spin />
        ) : (
          <TableOrders
            onChangeTable={onChangePage}
            data={orders}
            total={total}
            page={page}
          />
        )}
      </div>
    </MainLayout>
  );
};
export default Orders;
