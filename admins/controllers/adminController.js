const Admin = require('../models/admin'); // Assuming you have an admin model defined

exports.createAdmin = (req, res) => {
    Admin.create(req.body)
        .then(admin => res.status(201).json(admin))
        .catch(err => res.status(400).json(err));
};

exports.getAdminById = (req, res) => {
    Admin.findByPk(req.params.id)
        .then(admin => {
            if (admin) res.json(admin);
            else res.status(404).json({ message: 'Admin not found' });
        })
        .catch(err => res.status(400).json(err));
};

exports.updateAdmin = (req, res) => {
    Admin.update(req.body, {
        where: { id: req.params.id }
    })
    .then(([rowsUpdate, [updatedAdmin]]) => {
        if (rowsUpdate) {
            res.status(200).json(updatedAdmin);
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    })
    .catch(err => res.status(400).json(err));
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
