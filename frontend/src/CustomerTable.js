import React from 'react';

const CustomerTable = ({ customers, currentPage, pageSize }) => {
   
    return (
        <div className="table-responsive">
            <table className='table table-bordered'>
                <thead className='table-info'>
                    <tr>
                        <th rowSpan="2">S.No</th>
                        <th rowSpan="2">Customer Name</th>
                        <th rowSpan="2">Age</th>
                        <th rowSpan="2">Phone</th>
                        <th rowSpan="2">Location</th>
                        <th colSpan="2">Created At</th>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            <th>{customer.sno}</th>
                            <td>{customer.customer_name}</td>
                            <td>{customer.age}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.location}</td>
                            <td>{customer.date}</td>
                            <td>{customer.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;
