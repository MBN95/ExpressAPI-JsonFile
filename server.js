const express = require('express');
const api = express();
const fs = require('fs');

api.use(express.json());
api.use(express.urlencoded({extended: true}));
const routes = require('./src/api/routes/routes.js')(api, fs);
const server = api.listen(3003, () => {
    console.log(`api listening on port ${server.address().port}`);
})
