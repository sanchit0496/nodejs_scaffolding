// kafkaProducer.js in users service
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'users-service',
  brokers: ['localhost:9092'] // Replace with your Kafka broker addresses
});

const producer = kafka.producer();

const connectKafkaProducer = async () => {
  await producer.connect();
};

module.exports = { producer, connectKafkaProducer };
