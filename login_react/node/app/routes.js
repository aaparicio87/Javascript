const express = require('express');
const router = express.Router();

// Controllers
const AuthController = require('./controllers/AuthController');

// Home
router.get('/', (req, res) => res.json({ hello: "World" }));

// /api/singin
router.post('/api/signin', AuthController.signIn);

module.exports = router;