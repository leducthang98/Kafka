# kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic topic1   ---> create topic
# kafka-topics.sh --list --zookeeper zookeeper:2181   ---> list topics
# kafka-console-producer.sh --broker-list kafka:9092 --topic topic1 --> create producer 
# kafka-console-consumer.sh --bootstrap-server kafka:9092 --topic topic1 --from-beginning --> create consumer


# -- about consumer & partition -- CAN n CONSUMER subcribe 1 PARTITION?

# It depends on Group ID. Suppose you have a topic with 12 partitions.
# If you have 2 Kafka consumers with the same Group Id, they will both read 6 partitions,
# meaning they will read different set of partitions = different set of messages. If you have 4 Kafka cosnumers with the same Group Id,
# each of them will all read three different partitions etc.
# But when you set different Group Id, the situation changes.
# If you have two Kafka consumers with different Group Id they will read all 12 partitions without any interference between each other.
# Meaning both consumers will read the exact same set of messages independently.
# If you have four Kafka consumers with different Group Id they will all read all partitions etc.


# -> Không cùng group ID => các group đều đọc đc hết msg từ topic, độc lập offset với nhau

# -> Cùng group ID => dữ liệu sẽ chia ra cho nhau, và có thể xảy ra tình trạng consumer rảnh rồi
  # partition > consumer => 1 consumer đọc nhiều partition
  # partition < consumer => có consumer rảnh rỗi
  # partition = consumer => 1 consumer đọc 1 partition

# 1 consumer khi đọc msg mà không commit, thì msg đó vẫn sẽ bị đọc lại khi consumer/group consumer đó access lại. Nếu commit rồi thì không đọc lại msg đó nữa.