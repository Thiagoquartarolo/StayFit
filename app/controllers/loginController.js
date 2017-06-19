module.exports = {
    getLogin: getLogin
}

function getLogin(req, res) {
    res.render('default', {
        isLoged: true
    });
}