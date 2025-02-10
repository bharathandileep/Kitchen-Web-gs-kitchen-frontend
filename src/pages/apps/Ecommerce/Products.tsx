import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";

// dummy data
import { products as data, ProductItemTypes } from "./data";
import axios from "axios";

// main component
const Products = () => {
  const [products, setProducts] = useState<Array<ProductItemTypes>>(data);

  /*
   * search product by name
   */
  const searchProduct = (value: string) => {
    if (value === "") setProducts(data);
    else {
      var modifiedProducts = data;
      modifiedProducts = modifiedProducts.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      setProducts(modifiedProducts);
    }
  };

  const check = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/health");
    console.log(res);
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb m-2">
          <li className="breadcrumb-item">
            <Link to="/apps/ecommerce/products">Ecommerce</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Products
          </li>
        </ol>
      </nav>
      <div
        className="mb-3"
        style={{ backgroundColor: "#5bd2bc", padding: "10px" }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="page-title m-0" style={{ color: "#fff" }}>
            Products
          </h3>
          <Link
            to="#"
            className="btn btn-danger waves-effect waves-light"
            onClick={check}
          >
            <i className="mdi mdi-plus-circle me-1"></i> Add New
          </Link>
        </div>
      </div>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="justify-content-between">
                <Col className="col-auto">
                  <form className="d-flex align-items-center">
                    <label htmlFor="inputPassword2" className="visually-hidden">
                      Search
                    </label>
                    <div>
                      <input
                        type="search"
                        className="form-control my-1 my-lg-0"
                        id="inputPassword2"
                        placeholder="Search..."
                        onChange={(e: any) => searchProduct(e.target.value)}
                      />
                    </div>
                  </form>
                </Col>
                <Col className="col-auto">
                  <div className="d-flex align-items-center">
                    <label htmlFor="status-select" className="me-2 mb-0">
                      Sort By
                    </label>
                    <div>
                      <select
                        className="form-select my-1 my-lg-0"
                        id="status-select"
                      >
                        <option defaultValue="all">All</option>
                        <option value="popular">Popular</option>
                        <option value="pricelow">Price Low</option>
                        <option value="pricehigh">Price High</option>
                        <option value="soldout">Sold Out</option>
                      </select>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {(products || []).map((product, index) => {
          return (
            <Col key={index} md={6} xl={3} className="mb-3">
              <Card className="product-box h-100">
                <Card.Body className="d-flex flex-column">
                  <div className="product-action">
                    <Link
                      to="#"
                      className="btn btn-success btn-xs waves-effect waves-light me-1"
                    >
                      <i className="mdi mdi-pencil"></i>
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-danger btn-xs waves-effect waves-light"
                    >
                      <i className="mdi mdi-close"></i>
                    </Link>
                  </div>

                  <div className="bg-light mb-3">
                    <img src={product.image} alt="" className="img-fluid" />
                  </div>

                  <div className="product-info mt-auto">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="font-16 mt-0 sp-line-1">
                          <Link
                            to="/apps/ecommerce/product-details"
                            className="text-dark"
                          >
                            {product.name}
                          </Link>
                        </h5>
                        <div className="text-warning mb-2 font-13">
                          <i className="fa fa-star me-1"></i>
                          <i className="fa fa-star me-1"></i>
                          <i className="fa fa-star me-1"></i>
                          <i className="fa fa-star me-1"></i>
                          <i className="fa fa-star"></i>
                        </div>
                        <h5 className="m-0">
                          {" "}
                          <span className="text-muted">
                            {" "}
                            Stocks : {product.quantity} pcs
                          </span>
                        </h5>
                      </div>
                      <div className="col-auto">
                        <div className="product-price-tag">
                          ${product.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

export default Products;
