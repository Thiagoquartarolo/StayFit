const User = require('../models/user');
const Def = require('../controllers/defaultController');

module.exports = {
    getUsers: getUsers,
    saveUser: saveUser,
    seedUsers: seedUsers
}

function getUsers(req, res) {
    try {
        if (req.session.user != null) {
            User.find({ "terapeutId" : req.session.user._id }, (err, pacients) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }

                res.render('pages/user/list', {
                    pacients: pacients,
                    user: req.session.user,
                    isLoged: true,
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

function saveUser(req, res) {
    if (isValid) {

        const user = new User({
            name: req.body.name,
            lastname: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
            terapeutId: req.session.user._id,
            isAdmin: false,
        });

        user.save((err) => {
            if (err)
                throw err;

        });

        res.redirect('/users');
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

function isValid(req, res) {
    req.checkBody('name', 'Campo nome é obrigatório.').notEmpty();
    req.checkBody('lastName', 'Campo sobrenome é obrigatório.').notEmpty();
    req.checkBody('age', 'Campo idade é obrigatório.').notEmpty().isInt();
    req.checkBody('email', 'Campo e-mail é obrigatório.').notEmpty();
    req.checkBody('password', 'Campo senha é obrigatório.').notEmpty();

    // if there are errors, redirect and save errors to flash
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors.map(err => err.msg));
        return res.render('default', {
            isLoged: false,
            success: 0,
            error: 0,
            validations: errors
        });
    }
    return true;
}