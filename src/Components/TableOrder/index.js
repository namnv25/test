import React from "react";
import styles from "./index.module.scss";
import { Table } from "antd";
import classNames from "classnames";
const statusType = {
  Processing: "processing",
  Shipped: "shipped",
  Delivered: "delivered",
};
const TableOrders = ({ onChangeTable, data, total, page }) => {
  const dataSource = data?.map((item, index) => {
    const newArray = {
      key: index,
      productName: item.product.name,
      price: item.total,
      status: item.status,
    };
    return newArray;
  });

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return (
          <div
            className={classNames(styles.status, {
              [styles.processing]: statusType.Processing === record.status,
              [styles.shipped]: statusType.Shipped === record.status,
              [styles.delivered]: statusType.Delivered === record.status,
            })}
          >
            {record.status}
          </div>
        );
      },
    },
  ];
  const onChangePage = (data) => {
    onChangeTable(data);
  };
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      // pagination={{
      //   position: ["bottomLeft"],
      //   pageSize: 10,
      //   onChange: onChangePage,
      // }}
      pagination={{
        position: ["bottomLeft"],
        current: page,
        pageSize: 50,
        total,
        onChange: onChangePage,
        showSizeChanger: false,
      }}
    />
  );
};
export default TableOrders;
