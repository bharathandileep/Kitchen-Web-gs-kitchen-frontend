import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Order } from "../../../server/orderDetailsServices";
// import { getEmployees } from "../../../server/employeeServices";
import { getFoodProducts } from "../../../server/foodProductsServices";
// import { Employee } from "../../../server/employeeServices";
import { FoodProduct } from "../../../server/foodProductsServices";

interface UpdateOrderModalProps {
  show: boolean;
  onHide: () => void;
  order: Order | null;
  onSubmit: (updatedOrder: Order) => Promise<void>;
}

const UpdateOrderModal: React.FC<UpdateOrderModalProps> = ({
  show,
  onHide,
  order,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<Order> | null>(null);
//   const [employees, setEmployees] = useState<Employee[]>([]);
  const [foodProducts, setFoodProducts] = useState<FoodProduct[]>([]);
  const [employeeMap, setEmployeeMap] = useState<Map<string, string>>(); // Employee ID to Name map
  const [foodProductMap, setFoodProductMap] = useState<Map<string, string>>(); // Food ID to Name map

  useEffect(() => {
    // const fetchEmployees = async () => {
    //   try {
    //     const employeeList = await getEmployees(1, 1000); // Adjust page and limit if needed
    //     setEmployees(employeeList.data); // Adjust based on your response structure
    //     setEmployeeMap(new Map(employeeList.data.map((emp) => [emp._id, emp.f_name])));
    //   } catch (error) {
    //     console.error("Error fetching employees:", error);
    //   }
    // };

    const fetchFoodProducts = async () => {
      try {
        const foodProductList = await getFoodProducts(1, 1000); // Adjust page and limit if needed
        setFoodProducts(foodProductList.data); // Adjust based on your response structure
        setFoodProductMap(new Map(foodProductList.data.map((food) => [food._id, food.name])));
      } catch (error) {
        console.error("Error fetching food products:", error);
      }
    };

    // fetchEmployees();
    fetchFoodProducts();
  }, []);

  useEffect(() => {
    if (order) {
      setFormData({
        ...order,
        updated_by: "system", // Set default value for updated_by
        updated_at: new Date().toISOString(), // Set default value for updated_at
      });
    }
  }, [order]);

  if (!formData) {
    return null; // Prevent rendering if formData is not set
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) =>
      prevState ? { ...prevState, [name]: value } : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert selected IDs to names
    const updatedOrderData: Partial<Order> = { ...formData };

    if (employeeMap && foodProductMap) {
      const employeeId = formData.employee_id as string;
      const foodId = formData.food_id as string;

      // Find corresponding names
      const employeeName = employeeMap.get(employeeId);
      const foodName = foodProductMap.get(foodId);

      if (employeeName) updatedOrderData.employee_id = employeeId;
      if (foodName) updatedOrderData.food_id = foodId;
    }
    const orderData: Partial<Order> = {
      ...formData,
      updated_at: new Date().toISOString(), // Set default value for updated_at
      updated_by: "66a79aacd02d4640444ccf0c", // Replace with actual user ID or logic to get current user
    };
  
    await onSubmit(orderData as Order);
    setFormData(null);
    onHide();
    // if (updatedOrderData) {
    //   await onSubmit(updatedOrderData as Order);
    // }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="employee_id">
            <Form.Label>Employee Name</Form.Label>
            {/* <Form.Control
              as="select"
              name="employee_id"
              value={formData.employee_id || ""}
              onChange={handleChange}
              required
              style={{ marginBottom: "1rem" }}
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.f_name}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              style={{ marginBottom: "1rem" }}
            />
          </Form.Group>

          <Form.Group controlId="order_status">
            <Form.Label>Order Status</Form.Label>
            <Form.Control
              type="text"
              name="order_status"
              value={formData.order_status || ""}
              onChange={handleChange}
              style={{ marginBottom: "1rem" }}
            />
          </Form.Group>

          <Form.Group controlId="supply_date_time">
            <Form.Label>Supply Date & Time</Form.Label>
            <Form.Control
              type="date"
              name="supply_date_time"
              value={
                formData.supply_date_time instanceof Date
                  ? formData.supply_date_time.toISOString().split("T")[0]
                  : formData.supply_date_time || ""
              }
              onChange={handleChange}
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
              Update Order
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateOrderModal;
