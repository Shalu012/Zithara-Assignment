// backend/index.js

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'my_database',
    password: 'shalu',
    port: 5432,
});

// Get all customers with pagination and sorting
app.get('/customerData', async (req, res) => {
    try {
        const { query, page = 1, sortBy } = req.query;
        const offset = (page - 1) * 20;
        let orderBy = '';

        if (sortBy === 'date') {
            orderBy = 'ORDER BY date';
        } else if (sortBy === 'time') {
            orderBy = 'ORDER BY time';
        }

        let queryText = 'SELECT * FROM customerData';
        let queryParams = [];

        if (query) {
            queryText += ' WHERE customer_name ILIKE $1 OR location ILIKE $1';
            queryParams.push(`%${query}%`);
        }

        queryText += ` ${orderBy} LIMIT 20 OFFSET $${queryParams.length + 1}`;

        const queryResult = await pool.query(queryText, queryParams.concat(offset));
        res.json(queryResult.rows);
    } catch (error) {
        console.error('Error retrieving customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Search customers by name or location
app.get('/customerData/search', async (req, res) => {
    try {
        const { query } = req.query;
        const queryResult = await pool.query('SELECT * FROM customerData WHERE customer_name ILIKE $1 OR location ILIKE $1', [`%${query}%`]);
        res.json(queryResult.rows);
    } catch (error) {
        console.error('Error searching customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}....`);
});
