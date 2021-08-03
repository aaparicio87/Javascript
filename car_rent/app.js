const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
//crear conexion a la bd con sequelize
const db = require('./config/db');

//Importar el modelo
require('./models/Users');
require('./models/Brands');
require('./models/Colors');
require('./models/Cars');
require('./models/PriceRents');
require('./models/CarRents');
db.sync()
    .then(() => console.log('Conectado al servidor de BD'))
    .catch((error) => console.log(error));

const app = express();
const port = 5000;
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
 
// parse application/json
app.use(bodyParser.json());

app.use(routes);

app.listen(port);