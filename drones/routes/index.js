const express = require('express');
const router = express.Router();
const DroneController = require('../controllers/droneController'); 
const MedicationController = require('../controllers/medicationController'); 

//Middlewares
const drone = require('../middlewares/drone');

// Drones CRUD
router.get('/api/drones', DroneController.showDrones);
router.post('/api/drones' , DroneController.addDrone);
router.put('/api/drones/:uuid' , DroneController.updateDrone);
router.delete('/api/drones/:uuid' , DroneController.deleteDrone);

// Medication CRUD
router.get('/api/medications', MedicationController.showMedications);
router.post('/api/medications', MedicationController.addMedication);
router.put('/api/medications/:uuid' , MedicationController.updateMedication);
router.delete('/api/medications/:uuid' , MedicationController.deleteMedication);

//Loading a drone with medication items;
router.post('/api/drones/load_medications/:uuid',drone.validate('loadMedication'), DroneController.loadMedication);
//Checking loaded medication items for a given drone;
router.get('/api/drones/check_loaded/:uuid',drone.validate('checkMedication'), DroneController.checkMedication);
//Checking available drones for loading;
router.get('/api/drones/available_drones', DroneController.availableDrones);
//Check drone battery level for a given drone;
router.get('/api/drones/check_battery/:uuid', drone.validate('checkBattery'), DroneController.checkBattery);

module.exports = router;
