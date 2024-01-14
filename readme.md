# Node.js Microservice Architecture

This repository contains a Node.js application implementing a microservice architecture with Sequelize ORM, Apache Kafka for Messaging, Redis for Caching, Swagger for Documentation, and Winston for Logging. The application is structured as a scaffolding to kickstart Node.js-based microservice projects.

## Features

- **Express**: Web framework for Node.js.
- **KafkaJS**: Kafka client for Node.js, used for handling event-driven messaging between services.
- **ioredis**: Redis client for Node.js, used for caching data efficiently.
- **Winston**: A logger for just about everything, with `winston-daily-rotate-file` for log rotation.
- **Sequelize**: Promise-based Node.js ORM for MySQL.
- **MySQL**: Used for data persistence.
- **Swagger**: Used for documenting APIs on server.
- **Nodemon**: Utility that monitors for any changes in your source and automatically restarts your server.

### Prerequisites

Before running this application, ensure you have the following installed:

- Node.js
- MySQL
- Apache Kafka and ZooKeeper
- Redis

## How To Install and Run Kafka 
zookeeper-server-start.bat ..\..\config\zookeeper.properties

kafka-server-start.bat ..\..\config\server.properties

kafka-topics.bat --create --topic my-topic --bootstrap-server localhost:9092 --replication-factor 1 --partitions 3

kafka-console-producer.bat --broker-list localhost:9092 --topic my-topic

kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic my-topic --from-beginning

## How to Install and Run Redis
wsl --install

wsl -l -v

curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update

sudo apt-get install redis

sudo service redis-server start

redis-cli 
