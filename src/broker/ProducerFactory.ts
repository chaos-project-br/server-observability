import { logger } from "cyber-logger";
import kafkajs, { logLevel, Message, Producer } from "kafkajs";

export default class ProducerFactory {
  private producer: Producer;

  private topic: string = process.env.SERVER_CONTROL_TOPIC || "server-control";

  constructor() {
    this.producer = this.createProducer();
  }

  public async sendMessage(message: Message[]): Promise<void> {
    await this.producer
      .connect()
      .then(() => {
        logger.info(`Sending message to ${this.topic} topic.`);

        this.producer
          .send({
            topic: this.topic,
            compression: kafkajs.CompressionTypes.GZIP,
            messages: message,
          })
          .then(() => {
            logger.info("Message sended to the topic!");
          })
          .catch((err) => {
            logger.error(`Error while send message: \n${err}`);
          });
      })
      .finally(() => this.producer.disconnect());
  }

  private createProducer(): Producer {
    const kafka = new kafkajs.Kafka({
      clientId: "producer-client",
      brokers: [process.env.BROKER_ADDRESS],
      logLevel: logLevel.NOTHING,
      retry: {
        initialRetryTime: 3000,
        retries: 10,
      },
    });

    return kafka.producer();
  }
}
