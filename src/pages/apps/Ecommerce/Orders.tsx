import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import classNames from "classnames";

// components
import Table from "../../../components/Table";

// dummy data
import { orders, OrdersItemTypes } from "./data";

/* order column render */
const OrderColumn = ({ row }: { row: any }) => {
  return (
    <>
      <Link to="/apps/ecommerce/order/details" className="text-body fw-bold">
        #BM{row.original.order_id}
      </Link>
    </>
  );
};

/* product column render */
const ProductsColumn = ({ row }: { row: any }) => {
  return (
    <>
      {(row.original.product_img || []).map((img: string, index: number) => {
        return (
          <Link to="/apps/ecommerce/product-details" key={index}>
            <img src={img} alt="" height="32" />
          </Link>
        );
      })}
    </>
  );
};

/* orderdate column render */
const OrderDateColumn = ({ row }: { row: any }) => {
  return (
    <>
      {row.original.order_date}{" "}
      <small className="text-muted">{row.original.order_time}</small>
    </>
  );
};

/* payment column render */
const PaymentStatusColumn = ({ row }: { row: any }) => {
  return (
    <>
      <h5>
        <span
          className={classNames("badge", {
            "bg-soft-success text-success":
              row.original.payment_status === "Paid",
            "bg-soft-danger text-danger":
              row.original.payment_status === "Payment Failed",
            "bg-soft-info text-info": row.original.payment_status === "Unpaid",
            "bg-soft-warning text-warning":
              row.original.payment_status === "Awaiting Authorization",
          })}
        >
          {row.original.payment_status === "Paid" && (
            <i className="mdi mdi-bitcoin me-1"></i>
          )}
          {row.original.payment_status === "Payment Failed" && (
            <i className="mdi mdi-cancel me-1"></i>
          )}
          {row.original.payment_status === "Unpaid" && (
            <i className="mdi mdi-cash me-1"></i>
          )}
          {row.original.payment_status === "Awaiting Authorization" && (
            <i className="mdi mdi-timer-sand me-1"></i>
          )}
          {row.original.payment_status}
        </span>
      </h5>
    </>
  );
};

/* status column render */
const StatusColumn = ({ row }: { row: any }) => {
  return (
    <>
      <h5>
        <span
          className={classNames("badge", {
            "bg-success": row.original.order_status === "Delivered",
            "bg-danger": row.original.order_status === "Cancelled",
            "bg-info": row.original.order_status === "Shipped",
            "bg-warning": row.original.order_status === "Processing",
          })}
        >
          {row.original.order_status}
        </span>
      </h5>
    </>
  );
};

/* action column render */
const ActionColumn = () => {
  return (
    <>
      <Link to="#" className="action-icon">
        {" "}
        <i className="mdi mdi-eye"></i>
      </Link>
      <Link to="#" className="action-icon">
        {" "}
        <i className="mdi mdi-square-edit-outline"></i>
      </Link>
      <Link to="#" className="action-icon">
        {" "}
        <i className="mdi mdi-delete"></i>
      </Link>
    </>
  );
};

// get all columns
const columns = [
  {
    Header: "Order ID",
    accessor: "order_id",
    Cell: OrderColumn,
  },
  {
    Header: "Products",
    accessor: "product_img",
    Cell: ProductsColumn,
  },
  {
    Header: "Date",
    accessor: "order_date",
    Cell: OrderDateColumn,
  },
  {
    Header: "Payment Status",
    accessor: "payment_status",
    Cell: PaymentStatusColumn,
  },
  {
    Header: "Total",
    accessor: "total",
  },
  {
    Header: "Payment Method",
    accessor: "payment_method",
  },
  {
    Header: "Order Status",
    accessor: "order_status",
    Cell: StatusColumn,
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ActionColumn,
  },
];

// get pagelist to display
const sizePerPageList = [
  {
    text: "10",
    value: 10,
  },
  {
    text: "20",
    value: 20,
  },
  {
    text: "50",
    value: 50,
  },
];

// main component
const Orders = () => {
  const [orderList, setOrderList] = useState<OrdersItemTypes[]>(orders);
  const [searchTerm, setSearchTerm] = useState('');

  // change order status group
  const changeOrderStatusGroup = (OrderStatusGroup: string) => {
    let updatedData = [...orders];
    //  filter
    updatedData =
      OrderStatusGroup === "All"
        ? orders
        : [...orders].filter((o) =>
            o.payment_status?.includes(OrderStatusGroup)
          );
    setOrderList(updatedData);
  };

  // Add search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    const filtered = value === "" 
      ? orders 
      : orders.filter(order => 
          order.order_id.toString().toLowerCase().includes(value.toLowerCase())
        );
    setOrderList(filtered);
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb m-2">
          <li className="breadcrumb-item">
            <Link to="/apps/ecommerce/orders">Ecommerce</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Orders
          </li>
        </ol>
      </nav>
      <div className="mb-3" style={{ backgroundColor: "#5bd2bc", padding: "10px" }}>
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="page-title m-0" style={{ color: "#fff" }}>
            Orders
          </h3>
          <Button className="btn btn-danger waves-effect waves-light">
            <i className="mdi mdi-plus-circle me-1"></i> Add New Order
          </Button>
        </div>
      </div>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="justify-content-between">
                <Col md={4}>
                  <div className="d-flex align-items-center w-auto">
                    <label htmlFor="status-select" className="me-2">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="status-select"
                      onChange={(e: any) => changeOrderStatusGroup(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Paid">Paid</option>
                      <option value="Authorization">Awaiting Authorization</option>
                      <option value="Failed">Payment failed</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </Col>
                <Col md={4} className="text-end">
                  <Button className="btn btn-light">Export</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table
                columns={columns}
                data={orderList}
                isSearchable={false}
                pageSize={10}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSelectable={true}
                theadClass="table-light"
                searchBoxClass="mb-2"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Orders;
