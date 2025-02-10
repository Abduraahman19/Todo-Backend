const express = require('express');
const router = express.Router();
const { signUp, signIn, getUserById, getAllUsers } = require('../controllers/authController');

router.post('/signup', signUp);

router.post('/signin', signIn);

router.get('/user/:id', getUserById);

router.get('/users', getAllUsers);

module.exports = router;
