const baseURL = 'http://localhost:5000/api/menu'; // Update with your actual API URL

export interface FoodProduct {
  _id: any;
  Menu_id: string;
  name: string;
  price : string;
  image : string;
  description: string;
  available: string;
  created_by: any; // ObjectId type
  created_at: Date;    
  updated_by: any; // ObjectId type
  updated_at: Date;
}

interface FoodProductResponse {
  data: FoodProduct[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}
export const getFoodProducts = async (
  page: number = 1,
  limit: number = 8
): Promise<FoodProductResponse> => {
  const response = await fetch(`${baseURL}?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const data: FoodProductResponse = await response.json();
  return data;
};

// export const getFoodProducts = async (): Promise<FoodProduct[]> => {
//   const response = await fetch(baseURL);
//   if (!response.ok) {
//     throw new Error('Failed to fetch food products');
//   }
//   return response.json();
// };

export const getFoodProductById = async (id: string): Promise<FoodProduct> => {
  const response = await fetch(`${baseURL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch food product');
  }
  return response.json();
};

export const deleteFoodProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server Error (DELETE):', errorText);
    throw new Error('Failed to delete food product');
  }
};

export const updateFoodProduct = async (
  id: string,
  data: Partial<FoodProduct>
): Promise<FoodProduct> => {
  const { _id, ...rest } = data;

  console.log('Updated Data:', rest); // Log the data being sent

  const response = await fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rest),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server Error (PUT):', errorText);
    throw new Error('Failed to update food product');
  }

  return response.json();
};

export const addFoodProduct = async (data: Omit<FoodProduct, '_id'>): Promise<FoodProduct> => {
  const response = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server Error (POST):', errorText);
    throw new Error('Failed to add food product');
  }
  return response.json();
};

