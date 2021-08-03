const express = require('express');
const app = express();
const cors = require('cors')


//Settings
app.set('port', process.env.PORT || 8000);

//Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(require('./routes'));


const server = app.listen(app.get('port'), () => {
    console.log("Start server on port " + app.get('port'))
})
