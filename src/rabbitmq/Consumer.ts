import { rabbitmqConnection } from "./Connection";

export class Consumer {
  async consume() {
    try {
      await rabbitmqConnection.channel.assertExchange("test", "topic", {
        durable: false,
      });
      const q = await rabbitmqConnection.channel.assertQueue("", {
        exclusive: true,
      });
      await rabbitmqConnection.channel.bindQueue(q.queue, "test", "tickets.#");

      /*await rabbitmqConnection.channel.assertQueue("test", { durable: true });
      await rabbitmqConnection.channel.prefetch(1); //only one "worker" at a time, one pod at a time can recieve a message*/

      rabbitmqConnection.channel.consume(
        q.queue,
        (msg) => {
          console.log(msg!.content.toString());
        },
        { noAck: true }
      );
    } catch (error) {
      console.error(error);
    }
  }
}

export const rabbitmqConsumer = new Consumer();
