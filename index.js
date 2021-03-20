const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/config');
const app = express();

const path = require('path');

//database
dbConnection();

const PORT = process.env.PORT;

//cors
app.use(cors());

//directorio público
app.use('/login', express.static('public') );



//routes
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/events', require('./routes/events.routes'));

app.get('*', ( req, res ) => {
    res.sendFile( path.join( __dirname+'/public/index.html' ) );
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})