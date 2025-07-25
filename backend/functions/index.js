const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authroutes');
const functions = require('firebase-functions');
const incomeRoutes = require('./routes/incomeroute');
const app = express();


app.use(cors({ origin: true }));


app.use(express.json());


app.use('/auth', authRoutes);
app.use('/income',incomeRoutes);





exports.api = functions.https.onRequest(app);
