const User = require('../models/user');
const { producer } = require('../kafka/kafkaProducer');
const redisClient = require('../redisClient')

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

exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    const cacheKey = `user:${userId}`;

    try {
        // Try to get the user data from Redis first
        const cachedUser = await redisClient.get(cacheKey);

        if (cachedUser) {
            // If cached data exists, send it as response
            console.log('from cache')
            return res.json(JSON.parse(cachedUser));
        }

        // If not in cache, fetch from database
        const user = await User.findByPk(userId);
        if (user) {
            console.log('from other')
            // Cache the retrieved user data
            await redisClient.setex(cacheKey, 3600, JSON.stringify(user)); // Cache for 1 hour
            return res.json(user);
        } else {
            // User not found, send a 404 response
            return res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        // Handle any errors here
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
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