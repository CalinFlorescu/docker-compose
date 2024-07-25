const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});

// Create User model
const User = mongoose.model('User', userSchema);

// Insert a new user
const newUser = new User({
    name: 'John Doe',
    email: 'john@example.com',
});

newUser.save()
    .then(() => {
        console.log('User saved successfully');
    })
    .catch((error) => {
        console.error('Failed to save user:', error);
    });

// Retrieve users
User.find()
    .then((users) => {
        console.log('Users:', users);
    })
    .catch((error) => {
        console.error('Failed to retrieve users:', error);
    });