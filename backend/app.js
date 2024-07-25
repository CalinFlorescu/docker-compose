const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
const port = 8080;

const { MONGODB_URI } = process.env

// Allow requests from every origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());

// Connect to MongoDB
mongoose.connect(`${MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Server connected to MongoDB!');
})
.catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});

// Use the users route
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

app.get('/', (req, res) => {
    console.log('I was accessed!')
    if (process.env.NODE_ENV === 'production')
        res.send('Prod version is up and running!');
    else
        res.send('Dev version is up and running!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});