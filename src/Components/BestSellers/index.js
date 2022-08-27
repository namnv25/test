import React from "react";
import styles from "./index.module.scss";
import { Table } from "antd";

const columns = [
  {
    title: "Product Name",
    dataIndex: "product",
    key: "product",
    render: (_, record) => {
      return <>{record?.product?.name}</>;
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "# Units Sold",
    dataIndex: "units",
    key: "units",
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    key: "revenue",
  },
];
const BestSellers = ({ data }) => {
  return (
    <>
      <div className="title">BestSellers</div>
      <Table dataSource={data} columns={columns} pagination={false} />
    </>
  );
};
export default BestSellers;
