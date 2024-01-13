const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: true }) // This will check what is the current state of the table in the database (which columns it has, what are their data types, etc), and then perform the necessary changes in the table to make it match the model.
    .then(() => {
        console.log('Database synced');
        // ... start your server here
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });