import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { publish } from "../rabbitmq/Publisher";

const router = express.Router();

router.put("/api/tickets/buy", async (req: Request, res: Response) => {
  const { ticketid, userid } = req.body;

  const isExist = await Ticket.findOne({ ticketid });

  if (!isExist) {
    throw new Error("no ticket was found");
  }

  isExist.quantity = isExist.quantity - 1;
  try {
    await isExist.save();
    await publish.publish(
      JSON.stringify({ ticketid, userid }),
      "order",
      "order.ticket"
    );
  } catch (error) {
    console.error(error);
  }

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
