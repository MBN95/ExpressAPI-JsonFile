const dishesRoutes = require('./dishesRoutes.js');

const appRouter = (app, fs) => {
    //default route

    app.get('/', (req, res, next) => {
        res.send('Welcome to the RESTFUL api that reads from and writes to a JSON file...');
    });

    dishesRoutes(app, fs);
};

module.exports = appRouter;