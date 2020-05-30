const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

/// rotas

const carrosRoutes = require("../routes/carros.js");
const clientesRoutes = require("../routes/clientes.js");

/// Inciado rotas

app.use('/carros', carrosRoutes );
app.use('/clientes', clientesRoutes);

module.exports = app;
