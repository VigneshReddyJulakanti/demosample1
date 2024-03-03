import React, { useContext, useEffect, useState } from 'react'
import MiniNavBar from './MiniNavBar'
import noteContext from '../../Context/notes/noteContext';
import { Textarea } from 'flowbite-react';

export default function AdminNote() {
    const { host } = useContext(noteContext);

    const [adminView2, setadminView2] = useState("Hiring")
    const [Orders2, setOrders2] = useState([])

      // Function to fetch orders based on status
  const fetchOrders2 = async (type) => {
    try {
      const response = await fetch(`${host}/api/admin/getNotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("authtoken_admin")
        },
        body: JSON.stringify({ type })
      });
      const data = await response.json();
      if (data.success) {
        setOrders2(data.data);
      } else {
        // Handle failure
        alert('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Error fetching orders');
    }
  };

  useEffect(() => {
    fetchOrders2(adminView2)
  }, [,adminView2])
  
  return (
    <div>
        <MiniNavBar setadminView2={setadminView2} adminView2={adminView2}/>

        <div className="list-group mb-4 container my-2">
            {Orders2.length==0 && <p className='text-center text-primary text-3xl fw-bold mt-3'>No {adminView2} Requests yet</p>}
            {Orders2.length!=0 && <p className='text-center text-primary text-3xl fw-bold mt-3'> {adminView2} Requests </p>}
            <div className='container px-4'>
          {Orders2.length!=0 && Orders2.map((order) => (
            <div key={order._id} className="mt-1 card h-100 p-3 sm:col-md-6 md:col-md-8 lg:col-md-10 xl:col-md-10 mb-2 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 sm:p-4">
              <div className="flex flex-col items-center justify-between sm:flex-row">
                <div className="mb-4 sm:mb-0 sm:mr-4">
                  <h5 className="mb-1 flex items-center">
                    email: {order.email || 'N/A'}
                  </h5>
                  <p className="mb-1 flex items-center">
                    name: {order.name || 'N/A'}
                  </p>

                  <p className="mb-1 flex items-center">
                    details: <Textarea value={order.details || 'N/A'}  style={{ width: '70vw', height: '20vh' }} ></Textarea>
                  </p>
               
                  
                  
                </div>
              </div>
            </div>
            
          ))}
          </div>
        </div>
    </div>
  )
}
