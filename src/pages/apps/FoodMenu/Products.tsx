import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Pagination
} from "react-bootstrap";
import { Link } from "react-router-dom";

import PageTitle from "../../../components/PageTitle";
import AddFoodModal from "./AddFoodModal";
 import UpdateFoodModal from "./UpdateFoodModal";
import {
getFoodProducts,
  deleteFoodProduct,
  FoodProduct,
  updateFoodProduct,
  addFoodProduct
} from "../../../server/foodProductsServices";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import LoaderModal from '../../../server/LoaderModal'; 



const Products: React.FC = () => {
  const [foodMenu, setFoodMenu] = useState<FoodProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [currentFood, setCurrentFood] = useState<FoodProduct | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [foodToDelete, setFoodToDelete] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);


  const [foodToEdit, setFoodToEdit] = useState<FoodProduct | null>(null);
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);

  const itemsPerPage =8 ;
   


    const handlePreviousClick = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextClick = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePageClick = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
  
  // Generate pagination items
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageClick(i)}
        className="rounded-circle"
      >
        {i}
      </Pagination.Item>
    );
  }


    const fetchFoodMenu = async (page: number, limit: number) => {
      try {
        const response = await getFoodProducts(page, limit);
        console.log('API Response:', response);
    
        if (response && response.data && response.pagination) {
          const { data, pagination } = response;
          setFoodMenu(data || []);
          setTotalPages(pagination.totalPages || 0);
          console.log('Fetched Employees:', data);
          console.log('Pagination Info:', pagination);
        } else {
          console.error('Unexpected API Response Structure:', response);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    
  
   useEffect(() => {
    console.log(`Fetching data for page ${currentPage}`);
    fetchFoodMenu(currentPage, itemsPerPage);
  }, [currentPage,itemsPerPage]);
 
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
 
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
 
  // const handleDelete = async (id: string) => {
  //   setShowLoader(true)
  //   try {
  //     await deleteFoodProduct(id);
      
  //     // await deleteFoodProduct(employeeToDelete._id);
  //     fetchFoodMenu(currentPage, itemsPerPage);

  //    toast.success("Food Product deleted successfully!");
  //   } catch (error) {
  //     console.error("Error deleting food item:", error);
  //     toast.error("Error deleting food item");
  //     setShowToast(true);
  //   } finally {
  //     setShowConfirmDelete(false);
  //     setTimeout(() => {
  //       setShowLoader(false);
  //     }, 1000);

  //   }
  // };
  const handleDelete = async (id: string) => {
    setShowLoader(true);
    try {
      await deleteFoodProduct(id);
  
      // Fetch the updated food menu after deletion
      fetchFoodMenu(currentPage, itemsPerPage);
      
      setTimeout(() => {
        toast.success("Food Product deleted successfully!");
        setShowLoader(false);
      }, 1000);
    } catch (error) {
      console.error("Error deleting food item:", error);
  
      setTimeout(() => {
        toast.error("Error deleting food item");
        setShowLoader(false);
      }, 1000);
      
      setShowToast(true);
    } finally {
      setShowConfirmDelete(false);
    }
  };
  
  const handleAddFood = async (menu: Omit<FoodProduct, "_id">) => {
    setShowLoader(true)
    try {
      await addFoodProduct(menu); // Ensure this function matches the API's expected input
      setTimeout(() => {
        toast.success("Food product added successfully!");
         setShowLoader(false);
      }, 1000);
         fetchFoodMenu(currentPage, itemsPerPage);

    } catch (error) {
      console.error("Error adding food product:", error);
      setTimeout(() => {
        toast.error("Failed to add food product.");
        setShowLoader(false);
      }, 1000);
      
    }
  
  };
  
   
  const handleUpdateFood = (updatedFood: FoodProduct) => {
    setFoodMenu((prevFoodMenu) =>
      prevFoodMenu.map((item) =>
        item._id === updatedFood._id ? updatedFood : item
      )
    );
  };
 
  const openUpdateModal = (food: FoodProduct) => {
    setCurrentFood(food);
    setShowUpdateModal(true);
  };
  const onCloseAddModal = () => setShowAddModal(false);
  const onOpenAddModal = () => setShowAddModal(true);

  const onCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentFood(null); // Reset currentEmployee when closing the modal
  };



  const handleEdit = async (menu: Omit<FoodProduct, "_id" | "created_by" | "created_at">) => {
    if (!currentFood) return;
  
    setShowLoader(true); // Show loader modal
  
    const updatedFoodProduct: FoodProduct = {
      ...currentFood,
      ...menu,
      updated_at: new Date(),
      updated_by: "66a79aacd02d4640444ccf0c", // Replace with actual user ID or username
    };
  
    try {
      await updateFoodProduct(updatedFoodProduct._id, updatedFoodProduct);
      fetchFoodMenu(currentPage, itemsPerPage);
      setTimeout(() => {
        toast.success("Food Products updated successfully!");
      setShowLoader(false);
      }, 1000);

      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating food products:", error.message);
        setTimeout(() => {
          toast.error("Error updating food products: ");
          setShowLoader(false);
        }, 1000);
      } else {
        console.error("Unknown error updating food product:", error);
        toast.error("An unknown error occurred while updating the food product");
      }
    } finally {
      setShowEditModal(false);
      setCurrentFood(null);
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }
  };
  

const confirmEdit = () => {
  if (foodToEdit) {
     setCurrentFood(foodToEdit);
  setShowEditModal(true);
   }
 setShowConfirmEdit(false)
  
  }


 
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
   const handleEditClick = (food: FoodProduct) => {
    setFoodToEdit(food);
    setShowConfirmEdit(true);
  };

  const handleDeleteClick = (foodId: string) => {
    setFoodToDelete(foodId);
    setShowConfirmDelete(true);
  };
 
  const confirmDelete = () => {
    if (foodToDelete) {
      handleDelete(foodToDelete);
    }
  };
 
  return (
    <>
             <LoaderModal show={showLoader} />

      <PageTitle
        breadCrumbItems={[
          { label: "Ecommerce", path: "/apps/products" },
          { label: "Products", path: "/apps/food", active: true },
        ]}
        title={"Products"}
      />
 
      <Row>
        <Col>
          <Card >
            <Card.Body>
              <Row className="justify-content-between" >
                <Col className="col-auto">
                  <form className="d-flex flex-wrap align-items-center">
                    <label htmlFor="inputPassword2" className="visually-hidden">
                      Search
                    </label>
                    <div className="me-3">
                      <input
                        type="search"
                        className="form-control my-1 my-lg-0"
                        id="inputPassword2"
                        placeholder="Search..."
                      />
                    </div>
                    <label htmlFor="status-select" className="me-2">
                      Sort By
                    </label>
                    <div className="me-sm-3">
                      <select
                        className="form-select my-1 my-lg-0"
                        id="status-select"
                      >
                        <option>All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </form>
                </Col>
                <Col className="col-auto">
                  <Button
                    variant="danger"
                    className="mb-2"
                    onClick={() => setShowAddModal(true)}
                  >
                    <i className="mdi mdi-basket me-2"></i> Add Food
                  </Button>
                </Col>
              </Row>
 
            </Card.Body>
          </Card>
        </Col>
      </Row> 

<Row>
        {(foodMenu || []).map((food, index) => {
          return (
            <Col key={index} md={6} xl={3}>
              <Card className="product-box" style={{ width: '375px', height: '400px' }}>
                <Card.Body>
                  <div className="product-action">
                    <Link
                      to="#"
                      className="btn btn-success btn-xs waves-effect waves-light me-1"
                      onClick={() =>  handleEditClick(food)}
                        

                    >
                      <i className="mdi mdi-pencil"></i>
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-danger btn-xs waves-effect waves-light"
                      onClick={() => handleDeleteClick(food._id)}
                    >
                      <i className="mdi mdi-close"></i>
                    </Link>
                  </div>

                  {/* <div className="bg-light">
                    <img src={food.image_url} alt="" className="img-fluid" />
                  </div> */}
{/* <div className="bg-light" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
  <img src={food.image_url} alt="" className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</div> */}
<div
  className="bg-light"
  style={{
    width: "325px", // Set desired width
    height: "200px", // Set desired height
    overflow: "hidden",
  }}
>
  <img
    src={food.image}
    alt=""
    className="img-fluid"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover", // Ensures the image covers the entire container
    }}
  />
</div>

                  <div className="product-info">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="font-16 mt-0 sp-line-1">
                          <Link
                            to="/apps/ecommerce/product-details"
                            className="text-dark"
                          >
                            {food.name}
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
                          <span className="text-muted ">
                            {" "}
                              {food.description} 
                          </span>
                        </h5>
                      </div>
                      <div className="col-auto">
                        <div className="product-price-tag">
                          ${food.price}
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


      <Row>
      <Col>
        <ul className="pagination pagination-rounded justify-content-end mb-3">
          <div className="d-flex justify-content-end mt-3">
            <div className="pagination pagination-rounded-end mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handlePreviousClick} aria-label="Previous">
                  <span aria-hidden="true">«</span>
                  <span className="visually-hidden">Previous</span>
                </button>
              </li>

              <Pagination>{paginationItems}</Pagination>

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleNextClick} aria-label="Next">
                  <span aria-hidden="true">»</span>
                  <span className="visually-hidden">Next</span>
                </button>
              </li>
            </div>
          </div>
        </ul>
      </Col>
    </Row>

      {/* <Row>
        <Col>
          <ul className="pagination justify-content-center mb-4">
            <li className="page-item">
              <Button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
                }`}
              >
                <Button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
            <li className="page-item">
              <Button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </li>
          </ul>
        </Col>
      </Row> */}
 
      <AddFoodModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSubmit={handleAddFood}
      />
      {/* {currentFood && (
        <UpdateFoodModal
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          foodItem={currentFood}
          onUpdateFood={handleUpdateFood}
        />
      )} */}
            {/* <UpdateFoodModal
        show={showEditModal}
        onHide={onCloseEditModal}
        foodItem={currentFood}
        onSubmit={handleEdit}
        //  error={error}
      />
 */}
 {currentFood && (
  <UpdateFoodModal
    show={showEditModal}
    onHide={onCloseEditModal}
    foodItem={currentFood}
    onSubmit={handleEdit}
  />
)}

      {/* Confirmation Modal for Delete */}
      <Modal
        show={showConfirmDelete}
        onHide={() => setShowConfirmDelete(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this food item?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmDelete(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmEdit} onHide={() => setShowConfirmEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to edit{" "}
          {/* {foodToEdit ? `${foodToEdit.f_name} ${foodToEdit.l_name}` : "this employee"}? */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmEdit(false)}>
            Cancel
          </Button>
          <Button variant="primary"  onClick={confirmEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

 
      {/* Toast Notification  */}
      {/* <ToastContainer
        position="top-end"
        className="p-3"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer> */}
    </>
  );
};
 
export default Products;
 