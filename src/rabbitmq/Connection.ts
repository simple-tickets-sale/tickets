import amqlib, { ConfirmChannel } from "amqplib";

export class Connection {
  private _channel?: ConfirmChannel;

  get channel() {
    if (!this._channel) {
      throw new Error("no channel is defined!!");
    }

    return this._channel;
  }

  async connect(uri: string) {
    const connection = await amqlib.connect(uri);
    this._channel = await connection.createConfirmChannel();
  }
}

export const rabbitmqConnection = new Connection();
