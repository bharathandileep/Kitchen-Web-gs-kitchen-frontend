import React, { useState } from "react";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";

// components
import Billing from "./Billing";
import Shipping from "./Shipping";
import Payment from "./Payment";
import Summary from "./Summary";

import productImg5 from "../../../../assets/images/products/product-5.png";
import productImg2 from "../../../../assets/images/products/product-1.png";
import productImg3 from "../../../../assets/images/products/product-3.png";

interface CartItems {
  items: {
    id: number;
    image: string;
    name: string;
    size: string;
    color: string;
    price: number;
    qty: number;
    total: number;
  }[];
  sub_total: number;
  shipping: number;
  total: number;
}

// Checkout
const Checkout = () => {
  const [cart, setCart] = useState<CartItems>({
    items: [
      {
        id: 1,
        image: productImg2,
        name: "Polo Navy blue T-shirt",
        size: "Large",
        color: "Light Green",
        price: 39,
        qty: 1,
        total: 39,
      },
      {
        id: 2,
        image: productImg5,
        name: "Red Hoodie for men",
        size: "Small",
        color: "Brown",
        price: 46,
        qty: 2,
        total: 92,
      },
      {
        id: 3,
        image: productImg3,
        name: "	Designer Awesome T-Shirt",
        size: "Medium",
        color: "Green",
        price: 26,
        qty: 1,
        total: 26,
      },
    ],
    sub_total: 157,
    shipping: 0,
    total: 157,
  });

  /**
   * Update the shipping cost
   */
  const updateShipping = (shippingCost: number) => {
    var localCart = { ...cart };
    localCart["shipping"] = shippingCost;
    localCart["total"] = localCart["sub_total"] + shippingCost;
    setCart(localCart);
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb m-2">
          <li className="breadcrumb-item">
            <Link to="/apps/ecommerce/checkout">
              Ecommerce
            </Link>
          </li>
          <li
            className="breadcrumb-item active"
            aria-current="page"
          >
            Checkout
          </li>
        </ol>
      </nav>
      <div
        className="mb-3"
        style={{ backgroundColor: "#5bd2bc", padding: "10px" }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="page-title m-0" style={{ color: "#fff" }}>
            Checkout
          </h3>
          <Link to="/apps/ecommerce/cart" className="btn btn-danger waves-effect waves-light">
            <i className="mdi mdi-cart me-1"></i> Back to Cart
          </Link>
        </div>
      </div>

      <Tab.Container defaultActiveKey="1">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col lg={4}>
                    <Nav
                      variant="pills"
                      className="nav nav-pills flex-column navtab-bg nav-pills-tab text-center"
                    >
                      <Nav.Link
                        href="#"
                        eventKey="1"
                        className="nav-link cursor-pointer py-2"
                      >
                        <i
                          className={classnames(
                            "mdi mdi-account-circle",
                            "d-block",
                            "font-24"
                          )}
                        ></i>
                        <span className="d-none d-lg-block">Billing Info</span>
                      </Nav.Link>
                      <Nav.Link
                        href="#"
                        eventKey="2"
                        className="nav-link cursor-pointer mt-2 py-2"
                      >
                        <i
                          className={classnames(
                            "mdi mdi-truck-fast",
                            "d-block",
                            "font-24"
                          )}
                        ></i>
                        <span className="d-none d-lg-block">Shipping Info</span>
                      </Nav.Link>
                      <Nav.Link
                        href="#"
                        eventKey="3"
                        className="nav-link cursor-pointer mt-2 py-2"
                      >
                        <i
                          className={classnames(
                            "mdi mdi-cash-multiple",
                            "d-block",
                            "font-24"
                          )}
                        ></i>
                        <span className="d-none d-lg-block">Payment Info</span>
                      </Nav.Link>
                    </Nav>
                    <Summary cart={cart} />
                  </Col>
                  <Col lg={8}>
                    <Tab.Content className="p-3">
                      <Tab.Pane eventKey="1">
                        <Billing />
                      </Tab.Pane>
                      <Tab.Pane eventKey="2">
                        <Shipping updateShipping={updateShipping} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="3">
                        <Payment />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </React.Fragment>
  );
};

export default Checkout;
