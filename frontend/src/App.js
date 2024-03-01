import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from './CustomerTable';

function App() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState(null);
    const pageSize = 20;

    useEffect(() => {
        const fetchCustomers = () => {
            axios.get(`http://localhost:5000/customerData?query=${searchTerm}&page=${currentPage}&sortBy=${sortBy}`)
                .then(response => {
                    setCustomers(response.data);
                })
                .catch(error => {
                    console.error('Error fetching customers:', error);
                });
        };

        fetchCustomers();

    }, [searchTerm, currentPage, sortBy]); // Dependencies of the useEffect hook

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset current page to 1 when performing a new search
    };

    const handlePagination = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSort = (sortType) => {
        setSortBy(sortType);
        setCurrentPage(1); // Reset current page to 1 when changing sorting criteria
    };

    return (
        <div className="container-fluid">
            <h1 className="text-center text-dark">Customer Records</h1>
            <div className="row">
                <div className="col-md">
                    <input type="text" className="form-control" placeholder="Search by name or location" value={searchTerm} onChange={handleSearch} />
                </div>
                <div className="col-md-auto">
                    <select className="form-select" onChange={(event) => handleSort(event.target.value)}>
                        <option value="">Sort By</option>
                        <option value="date">Date</option>
                        <option value="time">Time</option>
                    </select>
                </div>
            </div>
            <CustomerTable customers={customers} currentPage={currentPage} pageSize={pageSize} />
            <div className="row">
                <div className="col text-center">
                    <button className='btn btn-success' disabled={currentPage === 1} onClick={() => handlePagination(currentPage - 1)} >&#8592; Previous</button>
                    <span>{currentPage} page out of  {Math.ceil(50 / pageSize)}</span>
                    <button className='btn btn-success' disabled={customers.length === 0 || customers.length < pageSize} onClick={() => handlePagination(currentPage + 1)}>Next &#8594;</button>
                </div>
            </div>
        </div>
    );
}

export default App;
