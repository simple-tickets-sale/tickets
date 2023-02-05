import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/get", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  if (!tickets) {
    return res.send("No tickets were found!");
  }

  res.send(tickets);
});

export { router as getTicketsRouter };
