

import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../../Context/notes/noteContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "flowbite-react"
import { FaUser, FaMoneyBillAlt, FaCalendar } from 'react-icons/fa';
import { BiSolidError } from "react-icons/bi";

export default function AdminOrders({ setadminView, adminView }) {
  const { host } = useContext(noteContext);

  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  let navigate = useNavigate()

  const handleAdminCheck = async () => {
    try {

    const response = await fetch(`${host}/api/admin/check`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("authtoken_admin")
      },
    });
    const data = await response.json();
    if (!data.success) {
      localStorage.removeItem('authtoken_admin');
      navigate("/admin")
    }

    
  } catch (error) {
    console.log(error)
  }
  };

  useEffect(() => {
    handleAdminCheck()
  }, [])



  const handleViewDetailsClick = async (order_id) => {
    try {

    const response = await fetch(`${host}/api/admin/getOrderDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("authtoken_admin")

      },
      body: JSON.stringify({ order_id })
    });
    const data = await response.json();
    if (data.success) {
      setOrderDetails(data.orderDetails);
      setUserDetails(data.userDetails);
      setShowModal(true); // Show the modal with the details
    } else {
      alert('Failed to fetch order details');
    }
  } catch (error) {
    console.log(error)
  }
  };


  // Function to fetch orders based on status
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${host}/api/admin/getOrders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("authtoken_admin")
        },
        body: JSON.stringify({ status: adminView }),
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        // Handle failure
        alert('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Error fetching orders');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`${host}/api/admin/updateGiftStatus/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("authtoken_admin")
        },
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      if (data.success) {
        alert(`Order status updated to ${status}`);
        setShowModal(false); // Close the modal after updating
        fetchOrders(); // Refresh orders to reflect the status update
      } else {
        // Handle failure
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [adminView]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="container mt-1 ">
      <div className="logos-containers">
        {/* <img src={logo} alt="Logo" className="logo-image" /> */}
        <div className="brands-texts">
          <span>{capitalizeFirstLetter(adminView)} Orders</span>
        </div>
      </div>

      {showModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="fixed inset-0 overflow-y-auto backdrop-filter backdrop-blur-md bg-opacity-50">
            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="modal fixed z-50 inset-0 bg-white bg-opacity-100 backdrop-filter backdrop-blur-md shadow-lg transition-opacity"></div>
              <div className="modal-dialog modal-lg"> {/* Use modal-lg for larger modal */}
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Order and User Details</h5>
                  </div>
                  <div className="modal-body p-4 md:p-8">
                    <div className="flex flex-col md:flex-row md:space-x-8">
                      <div className="mb-8 md:w-1/2">
                        <h6 className="mb-4 text-lg font-bold">User Details:</h6>
                        <p><strong>Name:</strong> {userDetails?.name}</p>
                        <p><strong>Email:</strong> {userDetails?.email}</p>
                        <p><strong>Date:</strong> {new Date(userDetails?.date).toLocaleString()}</p>
                        <p><strong>Address:</strong> {userDetails?.address}</p>
                        <p><strong>Phone:</strong> {userDetails?.phno}</p>
                        <p><strong>Credit Card:</strong> {userDetails?.creditCard}</p>
                      </div>
                      <div className="mb-8 md:w-1/2">
                        <h6 className="mb-4 text-lg font-bold">Order Details:</h6>
                        <p><strong>Recipient Name:</strong> {orderDetails?.recipientName}</p>
                        <p><strong>Relationship:</strong> {orderDetails?.relationship}</p>
                        <p><strong>Occasion:</strong> {orderDetails?.occasion}</p>
                        <p><strong>Gender:</strong> {orderDetails?.gender}</p>
                        <p><strong>Address:</strong> {orderDetails?.address}</p>
                        <p><strong>Phone Number:</strong> {orderDetails?.phoneNumber}</p>
                        <p><strong>Email:</strong> {orderDetails?.email}</p>
                        <p><strong>Interests:</strong> {orderDetails?.interests}</p>
                        <p><strong>Budget:</strong> {orderDetails?.budget}</p>
                        <p><strong>Default Option:</strong> {orderDetails?.defaultOption}</p>
                        <p><strong>Comments:</strong> {orderDetails?.comments}</p>
                        <p><strong>Date:</strong> {orderDetails?.date}</p>
                        <p><strong>Status:</strong> {orderDetails?.status}</p>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <Button gradientMonochrome="info" onClick={() => setShowModal(false)}>Close</Button>
                    {(adminView == "new" || adminView == "rejected") && <Button gradientMonochrome="success" onClick={() => updateOrderStatus(orderDetails._id, "processed")}>Proceed</Button>}
                    {(adminView == "processed") && <Button gradientMonochrome="success" onClick={() => updateOrderStatus(orderDetails._id, "finished")}>Finish</Button>}
                    {(adminView == "new" || adminView == "processed") && <Button gradientMonochrome="failure" onClick={() => updateOrderStatus(orderDetails._id, "rejected")}>Reject</Button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



      {orders.length === 0 ? (
        <div className="flex items-center justify-center mt-20">
          <div className="text-red-500 text-5xl flex flex-col items-center">
            <span className="mb-4">
              {/* Add your icon here, for example, a red exclamation mark */}
              <BiSolidError className="mr-2" />
            </span>
            <p className="text-center">
              No {capitalizeFirstLetter(adminView)} orders found.
            </p>
          </div>
        </div>
      ) : (
        <div className="list-group mb-4">
          {orders.map((order) => (
            <div key={order._id} className="mt-1 card h-100 p-3 sm:col-md-6 md:col-md-8 lg:col-md-10 xl:col-md-10 mb-2 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 sm:p-4">
              <div className="flex flex-col items-center justify-between sm:flex-row">
                <div className="mb-4 sm:mb-0 sm:mr-4">
                  <h5 className="mb-1 flex items-center">
                    <FaUser className="mr-2" />
                    Recipient: {order.recipientName || 'N/A'}
                  </h5>
                  <p className="mb-1 flex items-center">
                    <FaMoneyBillAlt className="mr-2" />
                    Budget: {order.budget || 'N/A'}
                  </p>
                  <small className="flex items-center">
                    <FaCalendar className="mr-2" />
                    Date: {order.date || 'N/A'}
                  </small>
                </div>
                <Button gradientDuoTone="pinkToOrange" onClick={() => handleViewDetailsClick(order._id)}>
                  View Order
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
