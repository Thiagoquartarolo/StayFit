const User = require('../../domain/models/user');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
    getUsers: getUsers,
    createUser: createUser,
    getUserById: getUserById,
    saveUser: saveUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}

function getUsers(req, res) {
    try {
        if (req.session.user != null) {
            User.find({ "terapeutId": req.session.user._id }, (err, pacients) => {
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

function createUser(req, res) {
    res.render('pages/user/create', {
        isLoged: req.session.user != null,
        user: req.session.user,
        success: 0,
        error: 0,
        validations: 0
    });
}

function getUserById(req, res) {
    try {
        User.find({ _id: req.params.id }, (err, pacient) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            res.render('pages/user/edit', {
                pacient: pacient,
                user: req.session.user,
                isLoged: true,
                success: 0,
                error: 0,
                validations: 0
            });
        });

    } catch (exc) {
        res.sendStatus(404).send(exc);
    }
}

function saveUser(req, res) {
    try {
        if (isValid) {

            const user = new User({
                name: req.body.name,
                lastname: req.body.lastName,
                age: req.body.age,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                terapeutId: req.session.user._id,
                isAdmin: false,
                isDev: false
            });

            user.save((err) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
            });

            res.redirect('/users');
        }
    } catch (exception) {
        res.sendStatus(404);
    }
}

function updateUser(req, res) {
    try {
        if (isValid) {

            User.findOne({ _id: req.params.id }, (err, user) => {

                user.name = req.body.name;
                user.lastname = req.body.lastname;
                user.age = req.body.age;
                user.email = req.body.email;

                user.save((err) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                }).then(res.redirect('/users'));


            });
        }
    } catch (exception) {
        res.sendStatus(404).send(exception);
    }
}

function deleteUser(req, res) {
    
    User.remove({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.redirect('/users');
    });
}

//----------------------------------------------
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