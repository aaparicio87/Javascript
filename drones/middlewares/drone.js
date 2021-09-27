const { body, param } = require('express-validator')

module.exports = {

     validate(method) {
        switch (method) {
            case 'loadMedication': {
             return [ 
                body('medication_uuids', 'Needs at least one medication').notEmpty(),
                param('uuid','Drone does not exists').isUUID()
               ]   
            }
            case 'checkMedication': {
                return [ 
                   param('uuid','Drone does not exists').isUUID()
                ]   
            }
            case 'checkBattery':{
                return [ 
                    param('uuid','Drone does not exists').isUUID()
                 ]   
            }
        }
      }
} 