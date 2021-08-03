const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const BrandController = require('../controllers/brandController');
const ColorController = require('../controllers/colorController');
const CarController = require('../controllers/carController');
const CarRentController = require('../controllers/carRentController');
const PriceRentController = require('../controllers/priceRentController');
const carController = require('../controllers/carController');
const PaymentController = require('../controllers/paymentController');

//Middlewares
const auth = require('../middlewares/auth');
const admin = require("../middlewares/admin");

// Auth
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

// Colors CRUD
router.post('/api/colors', auth, admin, ColorController.addColor);
router.get('/api/colors', auth, ColorController.showColors);
router.put('/api/colors/:uuid', auth, admin, ColorController.updateColor);
router.delete('/api/colors/:uuid', auth, admin, ColorController.deleteColor);

// Brands CRUD
router.post('/api/brands', auth, admin, BrandController.addBrand);
router.get('/api/brands', BrandController.showBrands);
router.put('/api/brands/:auth,uuid', auth, admin, BrandController.updateBrand);
router.delete('/api/brands/:uuid', auth, admin, BrandController.deleteBrand);

// Cars CRUD
router.post('/api/cars',auth, CarController.addCar);
router.get('/api/cars', CarController.showCars);
router.get('/api/cars/:uuid', CarController.showCar);
router.put('/api/cars/:uuid',auth, admin, carController.updateCar);
router.delete('/api/cars/:uuid',auth, admin, carController.deletCar);

//Rent
router.post('/api/rents',auth, CarRentController.addCarRent);

//PriceRent
router.post('/api/price', auth, admin, PriceRentController.addPriceRent);
router.get('/api/price', auth, admin, PriceRentController.showPriceRent);
router.put('/api/price/:uuid',auth, admin, PriceRentController.updatePriceRent);
router.delete('/api/price/:uuid',auth, admin, PriceRentController.deletePriceRent);

//Payment
router.post('/api/payment',auth, PaymentController.stripePay);

module.exports = router;
