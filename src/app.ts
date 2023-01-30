import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { rabbitmqConnection } from "./rabbitmq/Connection";

import { addTicketRouter } from "./routes/add";
import { updateTicketRouter } from "./routes/update";
import { rabbitmqConsumer } from "./rabbitmq/Consumer";
import { testRouter } from "./routes/testing";

const app = express();

app.use(express.json());
app.use(cors());

app.use(addTicketRouter);
app.use(updateTicketRouter);
app.use(testRouter);

app.get("/api/tickets/ping", (req, res) => {
  res.send("works :)");
});

app.all("*", () => {
  throw new Error("4044040404040400404");
});

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("mongoURI wasn't found");
  }
  if (!process.env.RABBITMQ_CONNECTION) {
    throw new Error("rabbitmq uri wasn't found!!");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    await rabbitmqConnection.connect(process.env.RABBITMQ_CONNECTION);
    await rabbitmqConsumer.consume((msg) => {
      console.log(msg!.content.toString());
    });
  } catch (error) {
    console.error(error);
  }

  app.listen(4000, () => {
    console.log("listening on port 4000");
  });
};

start();
