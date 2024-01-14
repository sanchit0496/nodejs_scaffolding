const Admin = require('../models/admin'); // Assuming you have an admin model defined
const redisClient = require('../redisClient')

exports.createAdmin = (req, res) => {
    Admin.create(req.body)
        .then(admin => res.status(201).json(admin))
        .catch(err => res.status(400).json(err));
};

exports.getAdminById = async (req, res) => {
    const adminId = req.params.id;
    const cacheKey = `admin:${adminId}`;

    try {
        // Try to get the admin data from Redis cache first
        const cachedAdmin = await redisClient.get(cacheKey);
        if (cachedAdmin) {
            console.log('from cache')
            return res.json(JSON.parse(cachedAdmin));
        }

        // If not in cache, fetch from database
        const admin = await Admin.findByPk(adminId);
        if (admin) {
            // Cache the retrieved admin data
            console.log("from db")
            await redisClient.setex(cacheKey, 3600, JSON.stringify(admin)); // Cache for 1 hour
            return res.json(admin);
        } else {
            return res.status(404).json({ message: 'Admin not found' });
        }

    } catch (error) {
        console.error('Error fetching admin:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateAdmin = async (req, res) => {
    const adminId = req.params.id;
    const cacheKey = `admin:${adminId}`;

    try {
        // Update the admin in the database
        const [rowsUpdate] = await Admin.update(req.body, {
            where: { id: adminId }
        });

        if (rowsUpdate === 0) {
            // No rows updated, admin not found
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Fetch the updated admin data
        const updatedAdmin = await Admin.findByPk(adminId);
        if (!updatedAdmin) {
            // Admin not found after update
            return res.status(404).json({ message: 'Admin not found after update' });
        }

        // Update the cache with the new admin data
        await redisClient.setex(cacheKey, 3600, JSON.stringify(updatedAdmin));

        return res.status(200).json(updatedAdmin);

    } catch (error) {
        console.error('Error updating admin:', error);
        return res.status(400).json(error);
    }
};

exports.deleteAdmin = (req, res) => {
    Admin.destroy({
        where: { id: req.params.id }
    })
    .then(deleted => {
        if (deleted) {
            res.status(200).json({ message: 'Admin deleted successfully' });
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    })
    .catch(err => res.status(400).json(err));
};

exports.getAllAdmins = (req, res) => {
    Admin.findAll()
    .then(admins => {
        res.json(admins);
    })
    .catch(err => res.status(400).json(err));
};
