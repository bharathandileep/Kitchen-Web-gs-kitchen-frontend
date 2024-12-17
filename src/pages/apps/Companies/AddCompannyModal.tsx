import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Company } from "./data";

interface AddCompanyModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (company: Company) => void;
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ show, onHide, onSubmit }) => {
  const [formData, setFormData] = useState<Company>({
    id: 0,
    logo: "",
    name: "",
    location: "",
    description:"",
    revenue:"",
    noOfEmployees: "",
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, logo: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
        id: 0,
        logo: "",
        name: "",
        location: "",
        description:"",
        revenue:"",
        noOfEmployees: "",
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formLogo">
        <Form.Label>Logo</Form.Label>
        <Form.Control type="file" name="logo" accept="image/*" onChange={handleFileChange} required />
      </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formRevenue">
            <Form.Label>Revenue</Form.Label>
            <Form.Control type="text" name="revenue" value={formData.revenue} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formRevenue">
            <Form.Label>No Of Employees</Form.Label>
            <Form.Control type="text" name="noOfEmployees" value={formData.noOfEmployees} onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCompanyModal;
