import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.post("/api/tickets/add", async (req: Request, res: Response) => {
  const { name, price, quantity } = req.body;

  const ticket = new Ticket({
    name,
    price,
    quantity,
  });

  await ticket.save();

  res.send(ticket);
});

export { router as addTicketRouter };
