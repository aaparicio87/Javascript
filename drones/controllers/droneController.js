const drone = require('../middlewares/drone');
const Drone = require('../models/Drones');
const Medication = require('../models/Medications');
const fs = require('fs');
const Medications = require('../models/Medications');
require('dotenv').config()

module.exports = {

    async addDrone(req, res){
        let { serial,
            model,
            weight_limit,
            battery_capacity,
            state
         }= req.body;


        if(battery_capacity < 25){
            state = 'LOADING';
        }
        try {
                await Drone.create({
                    serial: serial,
                    model: model,
                    weight_limit: weight_limit,
                    battery_capacity: battery_capacity,
                    state: state
                });
                return res.status(200).json({msg: 'Drone created'});
        } catch (error) {
            return res.status(500).json({ error: error.message })  
        }
    },

    async showDrones(req, res){
        try {
            const drones = await Drone.findAll();
            return res.status(200).json({drones: drones});
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async updateDrone(req, res){
        const { uuid } = req.params;
        let { serial,
            model,
            weight_limit,
            battery_capacity,
            state
        }= req.body;

        try {
            await Drone.update(
                {
                    serial: serial,
                    model: model,
                    weight_limit: weight_limit,
                    battery_capacity: battery_capacity,
                    state: state
                },
                { where: { uuid: uuid } }
            )
            res.json({ msg: 'Drone Updated' });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async deleteDrone(req, res){
        const { uuid } = req.params;
        try {
            await Drone.findOne({ where:{uuid: uuid}})
            res.json({ msg: 'Drone Deleted' });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async loadMedication(req, res){
        const { uuid } = req.params;
        const { medication_uuids } = req.body;
        let sum_weight = 0;
        let medications = [];

        try {
            const drone = await Drone.findOne({
                where:{uuid: uuid},
                include: 'medications',
            });
            if (drone.state === 'LOADING'){
                return res.status(500).json({ warning: 'The battery of this drone is **below 25%**' })
            }
            if (drone.medication.length === 0){
                medication_uuids.foreach( async ( uuid_medication ) => {
                    Medication.findOne({ where: { uuid: uuid_medication } }).then(
                        medication =>{
                            sum_weight = sum_weight + medication.weight
                            if(sum_weight < drone.weight_limit){
                                medications = [...medications, medication];
                            }
                            return res.status(500).json({ error: 'The weight of the medication exceeds the weight limit of the drone' })
                        }
                    );   
                })
                medications.forEach(async (medication)=>{
                    await Drone.update({
                        medications: medication
                    })
                   })
                res.json({ msg: 'Drone Loaded' });
            }
            return res.status(500).json({ msg: 'Drone is loaded with medication' });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async checkMedication(req, res){
        const { uuid } = req.params;
        try {
            let drone = await Drone.findOne({ where: { uuid: uuid },  include: 'medications', });
            if(!drone){
                return res.status(422).json({msg: 'Drone does not exist'});
            }
            if (drone.medications.length === 0){
                res.json({ msg: "This drone do not have any medication loaded" });
            }            
            res.json({ medications: drone.medications });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async availableDrones(req, res){
        try {
            const drones = await Drone.findAll({
                include: 'medications',
            });
            let list_availables = drones.filter(drone => drone.medications.length === 0)
            return res.status(200).json({drones: list_availables});
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async checkBattery(req, res){
        const { uuid } = req.params;
        try {
            const drone = await Drone.findOne({where: { uuid: uuid }});
            console.log(drone)
            return res.status(200).json({battery_level: drone.battery_capacity});
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    async checkAllBAttery(){
        let text = ''
        try {
            const drones = await Drone.findAll({
                attributes: [['serial', 'serial'], ['battery_capacity', 'battery_capacity'] ]
            });
            if(drones.length === 0){
                text = `${new Date().toISOString()}: There is no Drones to check`;
                fs.appendFile(process.env.LOG_FILE, `${text}\n`, (err) => {
                    if (err)
                      console.log(err);
                    else {
                      console.log("File written successfully\n");
                    }
                  });
            }
            else{
                    drones.forEach(drone =>{
                        text = text + `${new Date().toISOString()}: Serial:${drone.serial}, Battery capacity:${drone.battery_capacity}\n`;
                    }) 

                    fs.appendFile(process.env.LOG_FILE, `${text}\n`, (err) => {
                        if (err)
                        console.log(err);
                        else {
                        console.log("File written successfully\n");
                        }
                    });
            }
            
        } catch (error) {
            text = `${new Date().toISOString()}: ${error.message}`;
            fs.appendFile(process.env.LOG_FILE, `${text}\n`, (err) => {
                if (err)
                  console.log(err);
                else {
                  console.log("File written successfully\n");
                }
             });
        }
    }
}