import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FoodProduct } from "../../../server/foodProductsServices"; // Import your FoodProduct type

interface AddMenuModalProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (menu: Omit<FoodProduct, "_id">) => Promise<void>; // Correct type
  }
  

const AddMenuModal: React.FC<AddMenuModalProps> = ({
  show,
  onHide,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState<Partial<Omit<FoodProduct, "_id">>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.description) {
      alert("Please fill all required fields.");
      return;
    }

    // Assign default values for created_at and created_by
    const additionalData = {
      created_at: new Date(),
      created_by: "66a79aacd02d4640444ccf0c", // Replace with the actual current user ID or username
    };

    const completeData = { ...formData, ...additionalData };

    await onSubmit(completeData as Omit<FoodProduct, "_id">);
    setFormData({});
    onHide(); // Close modal after submission
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Menu Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMenuName">
            <Form.Label>Menu Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }} // Inline style for spacing
            />
          </Form.Group>
          <Form.Group controlId="formMenuPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={formData.price || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }} // Inline style for spacing
            />
          </Form.Group>
          <Form.Group controlId="formMenuDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }} // Inline style for spacing
            />
          </Form.Group>
          <Form.Group controlId="formMenuImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formData.image || ""}
              onChange={handleInputChange}
              style={{ marginBottom: "1rem" }} // Inline style for spacing
            />
          </Form.Group>
          <div className="text-center mt-4">
            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: "#007bff", // Primary color
                borderColor: "#007bff",
                padding: "0.3rem 1rem", // Reduced padding for a smaller button
                borderRadius: "0.25rem",
                fontWeight: "bold",
                transition: "background-color 0.2s ease-in-out",
                fontSize: "0.875rem", // Smaller font size
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              } // Darker blue on hover
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              Add Menu Item
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMenuModal;
