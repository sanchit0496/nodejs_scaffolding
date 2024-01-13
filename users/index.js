const app = require('./app');
const sequelize = require('./config/database');
const { connectKafkaProducer } = require('./kafka/kafkaProducer');

const PORT = process.env.PORT || 3000;


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

// Connect to Kafka when starting the service
connectKafkaProducer().catch(console.error);