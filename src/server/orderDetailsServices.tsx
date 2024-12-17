const ORDER_API_URL = 'http://localhost:5000/api/orderdetails'; // Update with your actual API URL

export interface Order {
  _id: string;
  order_id: string;
  employee_id: any;
  food_id: string;
  quantity: number;
  order_date: any; // Changed to string to match ISO format
  order_status: string;
  supply_date_time: any; // Changed to string to match ISO format
  created_by: string;
  created_at: string; // Changed to string to match ISO format
  updated_by: string;
  updated_at: string; // Changed to string to match ISO format
}

export interface OrderResponse {
  data: Order[];
  pagination: {
    // total: number;
    // page: number;
    // perPage: number;
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;

  };
}


export const getOrders = async (
  page: number = 1,
  limit: number = 4
): Promise<OrderResponse> => {   
  const response = await fetch(`${ORDER_API_URL}?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }  

  const data: OrderResponse = await response.json();
  return data;
};

// // Fetch all orders
// export const getOrders = async (): Promise<OrderResponse> => {
//   const response = await fetch(ORDER_API_URL);
//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error('Server Error (GET):', errorText);
//     throw new Error('Failed to fetch orders');
//   }
//   return response.json();
// };

// Fetch a specific order by ID
export const getOrderById = async (id: string): Promise<Order> => {
  const response = await fetch(`${ORDER_API_URL}/${id}`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server Error (GET by ID):', errorText);
    throw new Error('Failed to fetch order');
  }
  return response.json();
};

// Delete an order
export const deleteOrder = async (id: string): Promise<void> => {
  const response = await fetch(`${ORDER_API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server Error (DELETE):', errorText);
    throw new Error('Failed to delete order');
  }
};

// Update an order
export const updateOrder = async (
  id: string,
  data: Partial<Order>
): Promise<Order> => {
  const { _id, ...rest } = data; // Exclude _id if included in data

  console.log('Updated Data:', rest); // Log the data being sent

  const response = await fetch(`${ORDER_API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rest),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server Error (PUT):', errorText);
    throw new Error('Failed to update order');
  }

  return response.json();
};

// Add a new order
export const addOrder = async (data: Omit<Order, '_id'>): Promise<Order> => {
  try {
    const response = await fetch(ORDER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server Error (POST):', errorText);
      throw new Error(`Failed to add order: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in addOrder function:', error);
    throw new Error(
      `Failed to add order: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};
