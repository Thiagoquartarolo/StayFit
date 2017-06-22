module.exports = {
    isAdmin: isAdmin,
    isDev: isDev
}

function isAdmin(req, res, next) {
    if (req.session.user != null) {
        if (req.session.user.isAdmin) {
            next();
        } else {
            res.render('default', {
                isLoged: true,
                user: req.session.user,
                success: 0,
                error: 'Usuário não possui permissão de acesso!',
                validations: 0
            });
        }
    } else {
        res.redirect("/");
    }
}

function isDev(req, res, next) {
    if (req.session.user != null) {
        if (req.session.user.isDev) {
            next();
        } else {
            res.render('default', {
                isLoged: true,
                user: req.session.user,
                success: 0,
                error: 'Usuário não possui permissão de acesso!',
                validations: 0
            });
        }
    } else {
        res.redirect("/");
    }
}