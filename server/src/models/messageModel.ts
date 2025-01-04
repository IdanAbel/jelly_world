import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  text: string;
  sender: string;
  senderName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema: Schema<IMessage> = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message: Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  messageSchema
);
export default Message;
