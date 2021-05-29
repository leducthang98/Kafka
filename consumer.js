const { Kafka } = require('kafkajs')

async function run() {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092']
    })

    const consumer = kafka.consumer({ groupId: 'my-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'topic1', fromBeginning: true })

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log('--GET MESSAGE--')
            console.log('topic:', topic)
            console.log('partition:', partition)
            console.log({
                value: message.value.toString(),
            })
        },
    })
}
run()