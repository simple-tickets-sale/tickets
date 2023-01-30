import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { publish } from "../rabbitmq/Publisher";

const router = express.Router();

router.put("/api/tickets/buy", async (req: Request, res: Response) => {
  const { name, userid } = req.body;

  const isExist = await Ticket.findOne({ name });

  if (!isExist) {
    throw new Error("no ticket was found");
  }

  isExist.quantity = isExist.quantity - 1;
  await isExist.save();
  //await publish.publish(JSON.stringify({ ticketid: isExist._id, userid }));

  res.send(isExist);
});

router.put("/api/tickets/restock", async (req: Request, res: Response) => {
  const { name, quantity } = req.body;

  const isExist = await Ticket.findOne({ name });

  if (!isExist) {
    throw new Error("no ticket was found");
  }

  isExist.quantity = quantity;
  await isExist.save();

  res.send(isExist);
});

export { router as updateTicketRouter };
