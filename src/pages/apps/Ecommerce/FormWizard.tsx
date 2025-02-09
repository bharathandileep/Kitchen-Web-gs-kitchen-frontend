import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { CheckCircle } from 'react-feather';
import './FormWizard.scss'; // Create this file for custom styles

interface FormData {
  step1: {
    firstName: string;
    lastName: string;
  };
  step2: {
    email: string;
    phone: string;
  };
  step3: {
    address: string;
    city: string;
  };
}

const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    step1: { firstName: '', lastName: '' },
    step2: { email: '', phone: '' },
    step3: { address: '', city: '' },
  });

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h4>Personal Information</h4>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.step1.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        step1: { ...formData.step1, firstName: e.target.value },
                      })
                    }
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.step1.lastName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        step1: { ...formData.step1, lastName: e.target.value },
                      })
                    }
                  />
                </div>
              </Col>
            </Row>
          </div>
        );
      case 2:
        return (
          <div>
            <h4>Contact Information</h4>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.step2.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        step2: { ...formData.step2, email: e.target.value },
                      })
                    }
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.step2.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        step2: { ...formData.step2, phone: e.target.value },
                      })
                    }
                  />
                </div>
              </Col>
            </Row>
          </div>
        );
      case 3:
        return (
          <div>
            <h4>Address Information</h4>
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.step3.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        step3: { ...formData.step3, address: e.target.value },
                      })
                    }
                  />
                </div>
              </Col>
              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.step3.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        step3: { ...formData.step3, city: e.target.value },
                      })
                    }
                  />
                </div>
              </Col>
            </Row>
          </div>
        );
      default:
        return null;
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Contact' },
    { number: 3, title: 'Address' }
  ];

  const renderStepper = () => (
    <div className="stepper-wrapper">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`stepper-item ${
            currentStep > step.number
              ? 'completed'
              : currentStep === step.number
              ? 'active'
              : ''
          }`}
        >
          <div className="step-counter">
            <span className="step-number">{step.number}</span>
            <CheckCircle size={20} className="check-icon" />
          </div>
          <div className="step-name">{step.title}</div>
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <Card.Body>
        <div className="form-wizard">
          {renderStepper()}
          {renderStep()}
          <div className="text-center mt-4">
            {currentStep > 1 && (
              <Button variant="secondary" className="me-2" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {currentStep < 3 ? (
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant="success" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FormWizard;
