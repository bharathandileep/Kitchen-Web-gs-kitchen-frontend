import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Order } from "../../../server/orderDetailsServices";
// import { getEmployees } from "../../../server/employeeServices";
import { getFoodProducts } from "../../../server/foodProductsServices";
// import { Employee } from "../../../server/employeeServices";
import { FoodProduct } from "../../../server/foodProductsServices";

interface AddOrderModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (order: Order) => Promise<void>;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({
  show,
  onHide,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<Order>>({});
//   const [employees, setEmployees] = useState<Employee[]>([]);
  const [foodProducts, setFoodProducts] = useState<FoodProduct[]>([]);

  useEffect(() => {
    // const fetchEmployees = async () => {
    //   try {
    //     const employeeList = await getEmployees(1, 1000); // Adjust limit as needed
    //     setEmployees(employeeList.data); // Adjust based on your response structure
    //   } catch (error) {
    //     console.error("Error fetching employees:", error);
    //   }
    // };

    const fetchFoodProducts = async () => {
      try {
        const foodProductList = await getFoodProducts(1, 1000); // Adjust limit as needed
        setFoodProducts(foodProductList.data); // Adjust based on your response structure
      } catch (error) {
        console.error("Error fetching food products:", error);
      }
    };

    // fetchEmployees();
    fetchFoodProducts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData: Partial<Order> = {
      ...formData,
      created_at: new Date().toISOString(),
      created_by: "66a79aacd02d4640444ccf0c", // Replace with actual user ID or logic to get current user
    };

    await onSubmit(orderData as Order);
    setFormData({});
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="employee_id">
            <Form.Label>Employee Name</Form.Label>
            {/* <Form.Control
              as="select"
              name="employee_id"
              value={formData.employee_id || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }}
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.f_name} {employee.l_name}
                </option>
              ))}
            </Form.Control> */}
          </Form.Group>

          <Form.Group controlId="food_id">
            <Form.Label>Food Name</Form.Label>
            <Form.Control
              as="select"
              name="food_id"
              value={formData.food_id || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }}
            >
              <option value="">Select Food</option>
              {foodProducts.map((food) => (
                <option key={food._id} value={food._id}>
                  {food.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }}
            />
          </Form.Group>

          <Form.Group controlId="order_date">
            <Form.Label>Order Date</Form.Label>
            <Form.Control
              type="date"
              name="order_date"
              value={
                formData.order_date instanceof Date
                  ? formData.order_date.toISOString().split("T")[0]
                  : formData.order_date || ""
              }
              onChange={handleInputChange}
              style={{ marginBottom: "1rem" }}
            />
          </Form.Group>

          <Form.Group controlId="order_status">
            <Form.Label>Order Status</Form.Label>
            <Form.Control
              type="text"
              name="order_status"
              value={formData.order_status || ""}
              onChange={handleInputChange}
              style={{ marginBottom: "1rem" }}
            />
          </Form.Group>

          <Form.Group controlId="supply_date">
            <Form.Label>Supply Date</Form.Label>
            <Form.Control
              type="date"
              name="supply_date_time"
              value={
                formData.supply_date_time instanceof Date
                  ? formData.supply_date_time.toISOString().split("T")[0]
                  : formData.supply_date_time || ""
              }
              onChange={handleInputChange}
              style={{ marginBottom: "1rem" }}
            />
          </Form.Group>

          <div className="text-center mt-4">
            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                padding: "0.3rem 1rem",
                borderRadius: "0.25rem",
                fontWeight: "bold",
                transition: "background-color 0.2s ease-in-out",
                fontSize: "0.875rem",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              Add Order
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddOrderModal;
