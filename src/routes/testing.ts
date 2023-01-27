import express, { Request, Response } from "express";
import { publish } from "../rabbitmq/Publisher";

const router = express.Router();

router.post("/api/tickets/test", async (req: Request, res: Response) => {
  const message = req.body.message;

  await publish.publish(message);
  res.send("success");
});

export { router as testRouter };
