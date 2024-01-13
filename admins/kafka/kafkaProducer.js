// kafkaConsumer.js in admins service
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'admins-service',
  brokers: ['localhost:9092'] // Replace with your Kafka broker addresses
});

const consumer = kafka.consumer({ groupId: 'admins-group' });

const connectKafkaConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-activity', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      // Handle the event (e.g., a new user signup)
      console.log(`Received event: ${event.action} for user ${event.userId}`);

      if (event.action === 'signup') {
        // Logic for handling new user sign up
        console.log(`New user signed up: ${event.userId}`);
        // Add your specific business logic here
      }

    },
  });
};

module.exports = { connectKafkaConsumer };
