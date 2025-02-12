import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";

// Sample product images (replace with actual images)
// import productImg1 from "../../../assets/images/products/product-1.png";
// import productImg2 from "../../../assets/images/products/product-2.png";
// import productImg3 from "../../../assets/images/products/product-3.png";
// import productImg4 from "../../../assets/images/products/product-4.png";

// Add this import for profile image
import defaultProfile from "../../../assets/images/products/product-10.jpg";

// Add these imports for card images
import dashboardUI from "../../../assets/images/macbook.png";
import cakeImage from "../../../assets/images/products/product-5.png";

// Add this verification button component
const VerificationButton = () => (
  <Button
    variant="danger"
    className="d-flex align-items-center gap-2 px-3 py-2">
    <i className="mdi mdi-close-circle-outline"></i>
    Not Verified
  </Button>
);

interface Product {
  name: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  rating: number;
  status: string;
  features: string[];
}

const ProductDetails: React.FC = () => {
  const [product] = useState<Product>({
    name: "Smart Wireless Headphones",
    brand: "SoundTech",
    description:
      "Experience high-quality sound with active noise cancellation and long battery life.",
    price: 250,
    discount: 15,
    rating: 4.7,
    status: "In Stock",
    features: [
      "Bluetooth 5.0 Connectivity",
      "Active Noise Cancellation",
      "20 Hours Battery Life",
      "Comfortable Over-Ear Fit",
      "Fast Charging Support",
    ],
  });

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <div className="container-fluid px-4 py-3">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item">
            <Link to="/products">Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Profile Section */}
      <div
        className="mb-4 position-relative overflow-hidden"
        style={{
          backgroundColor: "#5bd2bc",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(91, 210, 188, 0.2)",
        }}>
        <Row className="align-items-start">
          {/* Column 1: Profile Image */}
          <Col xs={12} md={3} className="text-center text-md-start">
            <div className="position-relative d-inline-block">
              <img
                src={defaultProfile}
                alt="Business Profile"
                className="rounded-circle"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  border: "4px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)"
                }}
              />
              <div 
                className="position-absolute bg-success rounded-circle"
                style={{
                  border: "2px solid white",
                  width: "24px",
                  height: "24px",
                  bottom: "-10px",
                  right: "90px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                <i className="mdi mdi-check text-white" style={{ fontSize: '14px' }}></i>
              </div>
            </div>
          </Col>

          {/* Column 2: Profile Details */}
          <Col xs={12} md={6} className="text-center text-md-start mt-4 mt-md-0">
            <div className="d-flex flex-column h-100">
              {/* Business Name */}
              <h2 
                className="text-white mb-3"
                style={{ 
                  fontSize: '2rem',
                  fontWeight: '600',
                  lineHeight: '1.2'
                }}>
                Dine Eas
              </h2>

              {/* Contact Information */}
              <div className="mb-3" style={{display: 'flex', flexDirection: 'column'}}>
                {[
                  { icon: "account", text: "Dine Eas" },
                  { icon: "email", text: "DinesEas@gmail.com" },
                  { icon: "phone", text: "1234567891" }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="d-flex align-items-center gap-2 mb-2"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    <i className={`mdi mdi-${item.icon}`} style={{ fontSize: '18px' }}></i>
                    <span style={{ fontSize: '0.95rem' }}>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div className="d-flex gap-2">
                {["Active", "Organic", "Veg"].map((badge, index) => (
                  <Badge
                    key={index}
                    className="rounded-pill px-2 py-1"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                    <i className={`mdi mdi-${
                      badge === 'Active' ? 'check-circle' : 
                      badge === 'Organic' ? 'leaf' : 
                      'food-apple'
                    } text-success me-1`}></i>
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </Col>

          {/* Column 3: Action Buttons */}
          <Col xs={12} md={3} className="d-flex justify-content-md-end mt-4 mt-md-0">
            <div className="d-flex gap-2">
              <Button
                variant="light"
                className="d-flex align-items-center gap-1 px-3 py-1"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  fontSize: '0.9rem',
                  height: '35px'
                }}>
                <i className="mdi mdi-pencil"></i>
                Edit
              </Button>
              <Button
                variant="danger"
                className="d-flex align-items-center gap-1 px-3 py-1"
                style={{
                  backgroundColor: 'rgba(220, 53, 69, 0.9)',
                  border: 'none',
                  fontSize: '0.9rem',
                  height: '35px'
                }}>
                <i className="mdi mdi-delete"></i>
                Delete
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Information Cards */}
      <Row className="mb-4 g-3">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5 className="card-title">FSSAI License</h5>
                <VerificationButton />
              </div>
              <div className="mb-3">
                <p className="mb-2">
                  <strong>Certificate Number:</strong> 12345012345679
                </p>
                <p className="mb-2">
                  <strong>Expiry Date:</strong> 2/13/2025
                </p>
              </div>
              <img
                src={dashboardUI}
                alt="FSSAI Dashboard"
                className="img-fluid rounded"
                style={{
                  maxHeight: "150px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5 className="card-title">PAN Details</h5>
                <VerificationButton />
              </div>
              <div className="mb-3">
                <p className="mb-2">
                  <strong>PAN Number:</strong> BAJPC4350M
                </p>
                <p className="mb-2">
                  <strong>Card Holder:</strong> Owner
                </p>
              </div>
              <img
                src={cakeImage}
                alt="Cake"
                className="img-fluid rounded"
                style={{ maxHeight: "150px", objectFit: "cover" }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5 className="card-title">GST Registration</h5>
                <VerificationButton />
              </div>
              <div className="mb-3">
                <p className="mb-2">
                  <strong>GST Number:</strong> 22AAAAA0000A1Z6
                </p>
                <p className="mb-2">
                  <strong>Expiry Date:</strong> 2/13/2025
                </p>
              </div>
              <img
                src={dashboardUI}
                alt="GST Dashboard"
                className="img-fluid rounded"
                style={{
                  maxHeight: "150px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h5 className="card-title mb-3">Location Details</h5>
              <p className="card-text mb-4">
                Trikkakara Near BHM, Cochin, Ernakulam East, Keralam, 123453,
                Indian
              </p>
              <div
                className="map-container"
                style={{ height: "200px", width: "100%" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.769314809927!2d76.32868731479452!3d10.031941892830645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c31865e74c1%3A0x4742c12c4f2a903f!2sCochin%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1645446314016!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "8px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Product Details Card
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <Row className="g-4">
            <Col
              md={6}
              className="d-flex align-items-center justify-content-center">
              <img
                // src={productImg1}
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </Col>

            <Col md={6}>
              <div className="ps-md-4">
                <h2 className="mb-3">{product.name}</h2>
                <h5 className="text-muted mb-3">by {product.brand}</h5>
                <Badge bg="success" className="mb-4 px-3 py-2">
                  {product.status}
                </Badge>
                <h3 className="mb-4">
                  <del className="text-muted me-3">
                    ${product.price.toFixed(2)}
                  </del>
                  <span className="text-danger">
                    ${discountedPrice.toFixed(2)}
                  </span>
                </h3>

                <p className="mb-4">{product.description}</p>

                <ul className="list-unstyled mb-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="mb-2 d-flex align-items-center">
                      <span className="me-2">✅</span> {feature}
                    </li>
                  ))}
                </ul>

                <div className="d-flex gap-3">
                  <Button variant="primary" size="lg" className="px-4">
                    Add to Cart
                  </Button>
                  <Button variant="outline-danger" size="lg" className="px-4">
                    ❤️ Wishlist
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card> */}
    </div>
  );
};

export default ProductDetails;
