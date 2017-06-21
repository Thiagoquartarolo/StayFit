const User = require('../../domain/models/user');

module.exports = {
    validateLogin: validateLogin,
    getValues: getValues,
    logout: logout
}

function validateLogin(req, res) {
    
    if (isValid(req, res)) {

        User.findOne({
            email: req.body.email,
            password: req.body.password
        }, (err, user) => {
            if (user != null) {
                req.session.user = user;
                res.render('default', {
                    isLoged: true,
                    user: user,
                    success: 0,
                    error: 0,
                    validations: 0
                });
            } else {
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

function getValues(req, res) {
    res.render('default', {
        isLoged: req.session.user != null,
        user: req.session.user,
        success: 0,
        error: 0,
        validations: 0
    });
}

function logout(req, res) {
    req.session = null;
    res.render('default', {
        isLoged: false,
        success: 0,
        error: 0,
        validations: 0
    });
}

function isValid(req, res) {
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