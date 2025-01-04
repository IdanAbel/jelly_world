import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Message, { IMessage } from "../models/MessageModel";

const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const messages = await Message.find({});
  res.json({ messages });
});

const createMessage = async (message: {
  text: string;
  sender: string;
  senderName: string;
}): Promise<IMessage> => {
  const newMessage = new Message({
    text: message.text,
    sender: message.sender,
    senderName: message.senderName,
  });

  return await newMessage.save();
};

export { getMessages, createMessage };
