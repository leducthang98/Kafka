const { Kafka } = require('kafkajs')

async function run() {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092']
    })

    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'topic1',
        messages: [
            { value: "receive_kafka_message" },
        ],
    })

    await producer.disconnect()
}

run()