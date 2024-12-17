import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FoodProduct } from "../../../server/foodProductsServices"; // Adjust the path if needed

interface UpdateMenuModalProps {
  show: boolean;
  onHide: () => void;
  foodItem: FoodProduct; // The food item to be edited
  onSubmit: (menu: Omit<FoodProduct, "_id" | "created_by" | "created_at">) => Promise<void>;
}

const UpdateMenuModal: React.FC<UpdateMenuModalProps> = ({
  show,
  onHide,
  foodItem,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<Omit<FoodProduct, "_id" | "created_by" | "created_at">>>({
    name: foodItem.name,
    price: foodItem.price,
    description: foodItem.description,
    image: foodItem.image,
  });

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

    const additionalData = {
      updated_at: new Date(),
      updated_by: "66a79aacd02d4640444ccf0c", // Replace with actual current user ID or username
    };

    const completeData = { ...formData, ...additionalData };

    await onSubmit(completeData as Omit<FoodProduct, "_id" | "created_by" | "created_at">);
    onHide(); // Close modal after submission
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Menu Item</Modal.Title>
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
              Update Menu Item
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateMenuModal;
