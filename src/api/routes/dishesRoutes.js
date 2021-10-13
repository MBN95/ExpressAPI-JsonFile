var uuid = require('uuid');
var prettyPrintJson = require('pretty-print-json');

//import dishes json file
var dishes = "./src/api/mock/db/dishes.json";



const dishesRoutes = (app, fs) => {

    const readFile = (callback, returnJson = false, filePath = dishes, encoding='utf8' ) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if(err){
                console.log(err);
                throw err;
            }
            else{
                
                callback(returnJson ? JSON.parse(data): JSON.parse(data));
            }
        });
    }
    
    const writeFile = (fileData, callback, returnJson = false, filePath = dishes, encoding='utf-8') => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if(err){
                console.log(err);
                throw err;
            }
            else{
                callback();
            }
        });
    }

    app.route('/dishes')
        .get((req, res, next) => {
            readFile(dishesData => {
                if(dishesData){
                    res.status(200).send(JSON.stringify(dishesData, null, 4));
                }
            }, true);   

        })
        .post((req, res, next) => {
            console.log(req)
                readFile(dishesData => {
                    const newUserID = uuid.v4().toString() + 'newDish';
                    dishesData[newUserID] = req.body;
                    
                    writeFile(JSON.stringify(dishesData, null, 4), () => {
                        res.status(200).send(`${JSON.stringify(dishesData, null, 4)}`);
                    });
                }, true);
        });

    app.route('/dishes/:id')
        .put((req, res, next) => {
            readFile(dishesData => {
                const userId = req.params.id;
                dishesData[userId] = req.body;

                writeFile(JSON.stringify(dishesData, null, 4), () => {
                    res.status(200).send(`User ID: ${userId} updated successfully`);
                });
            }, true);
        })
        .delete((req, res, next) => {
            readFile(dishesData => {
                const userId = req.params.id;
                console.log('before deleting')
                console.log(JSON.stringify(dishesData, null, 4));
                
                delete dishesData[userId];
                console.log(JSON.stringify(dishesData, null, 4));
                writeFile(JSON.stringify(dishesData, null, 4), () => {
                    res.status(200).send(`User ID: ${userId} deleted successfully`);
                });
            });
        });

};

module.exports = dishesRoutes;