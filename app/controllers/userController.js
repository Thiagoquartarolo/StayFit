const User = require('../models/user');
const Def = require('../controllers/defaultController');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = LocalStorage('./scratch');

module.exports = {
    getUsers: getUsers,
    seedUsers: seedUsers
}

function getUsers(req, res) {
    try {
        var isLoged = localStorage.getItem('isLoged');
        var user = localStorage.getItem('user');

        if (isLoged) {
            User.find({}, (err, pacients) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }

                // return a view with data
                res.render('pages/user/list', {
                    pacients: pacients,
                    user: JSON.parse(user),
                    isLoged: isLoged,
                    success: 0,
                    error: 0,
                    validations: 0
                });
            });
        }

    } catch (exc) {
        res.sendStatus(404).send(exc);
    }
}

function seedUsers(req, res) {
    // create some events
    const users = [
        { name: 'Thiago', lastname: 'Quartarolo', age: 32, email: 'thiagoquarta@hotmail.com', password: '123456', isAdmin: true }
    ];

    // use the Event model to insert/save
    User.remove({}, () => {
        for (user of users) {
            var newUser = new User(user);
            newUser.save();
        }
    });

    //Seeded!
    res.send('Database seeded!');
}