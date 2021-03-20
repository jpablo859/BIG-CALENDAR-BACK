const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/config');
const app = express();

//database
dbConnection();

const PORT = process.env.PORT;

//cors
app.use(cors());

//directorio público
app.use( express.static('public') );

//routes
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/events', require('./routes/events.routes'));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})