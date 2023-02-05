import express, { Request, Response } from "express";
import { publish } from "../rabbitmq/Publisher";

const router = express.Router();

router.post("/api/tickets/test", async (req: Request, res: Response) => {
  const { message, message2 } = req.body;

  //await publish.publish(JSON.stringify({ message, message2 }));
  res.send("success");
});

export { router as testRouter };
