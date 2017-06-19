module.exports = {
    getValues: getValues
}

function getValues(req, res) {
    res.render('default', {
        isLoged: false
    });
}