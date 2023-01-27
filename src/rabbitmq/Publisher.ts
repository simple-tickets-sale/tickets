import { rabbitmqConnection } from "./Connection";

export class Publisher {
  async publish(message: string) {
    try {
      await rabbitmqConnection.channel.assertExchange("test", "topic", {
        durable: false,
      });
      rabbitmqConnection.channel.publish(
        "test",
        "tickets.receive",
        Buffer.from(message)
      );
      rabbitmqConnection.channel.publish(
        "test",
        "brown.receive",
        Buffer.from("testingtesting")
      );
      /*await rabbitmqConnection.channel.assertQueue(queue, { durable: true });
      rabbitmqConnection.channel.sendToQueue(queue, Buffer.from(message), {
        persistent: true,
      });*/
    } catch (error) {
      console.error(error);
    }
  }
}

export const publish = new Publisher();
