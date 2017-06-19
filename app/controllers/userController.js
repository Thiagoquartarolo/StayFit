const User = require('../models/user');

module.exports = {
    getUsers: getUsers,
    seedUsers: seedUsers
}

function getUsers(req, res) {
    try {
        User.find({}, (err, users) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            // return a view with data
            res.render('pages/user/list', {
                users: users
            });
        });
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