const User = require('../../domain/models/user');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
    seedUsers: seedUsers
}

function create(name, lastname, age, email, password, isAdmin, isDev) {

    const user = new User(
        {
            name: name,
            lastname: lastname,
            age: age,
            email: email,
            password: bcrypt.hashSync(password),
            isAdmin: isAdmin,
            isDev: isDev
        }
    );

    User.remove({}, () => {
        user.save(function (err) {
            if (err) {
                console.log('Não foi possível gerar o usuário: ' + name + ' ' + lastname);
            } else {
                console.log('Usuário ' + name + ' ' + lastname + ' criado com sucesso.');
            }
        });
    });
    
}

function seedUsers() {
    create('Thiago', 'Quartarolo', 32, 'thiagoquarta@hotmail.com', '123', true, true);
}