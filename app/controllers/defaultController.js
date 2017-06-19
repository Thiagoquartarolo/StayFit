const User = require('../models/user');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

module.exports = {
    getValues: getValues,
    validateLogin: validateLogin,
    logout: logout
}

function getValues(req, res) {
    res.render('default', {
        isLoged: false,
        success: 0,
        error: 0,
        validations: 0
    });
}

function validateLogin(req, res) {
    if (isValid(req, res)) {
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }, (err, user) => {
            if (user != null) {
                localStorage.setItem('isLoged', true);
                localStorage.setItem('user', JSON.stringify(user));

                res.render('default', {
                    isLoged: true,
                    user: user,
                    success: 0,
                    error: 0,
                    validations: 0
                });
            } else {
                localStorage.setItem('isLoged', false);

                res.render('default', {
                    isLoged: false,
                    success: 0,
                    error: 'Usuário não encontrado!',
                    validations: 0
                });
            }
        });
    }
}

function logout(req, res) {
    localStorage.clear()
    res.render('default', {
        isLoged: false,
        success: 0,
        error: 0,
        validations: 0
    });
}

function isValid(req, res) {
    req.checkBody('email', 'Campo E-mail é obrigatório.').notEmpty();
    req.checkBody('password', 'Campo Senha é obrigatório.').notEmpty();

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