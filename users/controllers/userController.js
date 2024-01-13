const User = require('../models/user');
const { producer } = require('../kafka/kafkaProducer');

exports.createUser = async (req, res) => {
    try {
        // Logic to create a new user
        const newUser = await User.create(req.body);

        // Once the user is created, send a message to Kafka
        await producer.send({
            topic: 'user-activity',
            messages: [{ value: JSON.stringify({ userId: newUser.id, action: 'signup' }) }],
        });

        // Send response back to client
        res.status(201).json(newUser);
    } catch (err) {
        // Handle errors
        res.status(400).json(err);
    }
};

exports.getUserById = (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
            if (user) res.json(user);
            else res.status(404).json({ message: 'User not found' });
        })
        .catch(err => res.status(400).json(err));
};

exports.updateUser = (req, res) => {
    User.update(req.body
, {
where: { id: req.params.id }
})
.then(() => {
res.status(200).json({ message: 'User updated successfully' });
})
.catch(err => res.status(400).json(err));
};

exports.deleteUser = (req, res) => {
User.destroy({
where: { id: req.params.id }
})
.then(() => {
res.status(200).json({ message: 'User deleted successfully' });
})
.catch(err => res.status(400).json(err));
};

exports.getAllUsers = (req, res) => {
User.findAll()
.then(users => {
res.json(users);
})
.catch(err => res.status(400).json(err));
};