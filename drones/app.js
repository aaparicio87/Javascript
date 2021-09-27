const path = require('path');
const cron = require('node-cron');
const express = require('express');
const routes = require('./routes');
require('dotenv').config()
const cors = require('cors');
const expressValidator = require('express-validator');
const fs = require('fs');
const multer = require('multer');

const DroneController = require('./controllers/droneController');

//crear conexion a la bd con sequelize
const db = require('./config/db');

//Import model
require('./models/Drones');
require('./models/Medications');

db.sync()
    .then(() => console.log('Conected with DB'))
    .catch((error) => console.log(error));

const app = express();
const port = 5000;
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
 
// parse application/json
app.use(express.json());

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images'))); 
app.use(routes);


if (!fs.existsSync(process.env.LOG_FILE)){
    fs.open(process.env.LOG_FILE, 'w', function (err, file) {
        if (err) throw err;
        console.log('Created a Log File!');
    });
}

cron.schedule('* 1 * * *', function() {
    DroneController.checkAllBAttery()
  });

app.listen(port);