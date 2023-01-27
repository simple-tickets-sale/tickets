import mongoose from "mongoose";

interface TicketAttr {
  name: string;
  price: number;
  quantity: number;
}

interface TicketDoc extends mongoose.Document {
  name: string;
  price: number;
  quantity: number;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttr): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

ticketSchema.statics.build = (attrs: TicketAttr) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("tickets", ticketSchema);

export { Ticket };
