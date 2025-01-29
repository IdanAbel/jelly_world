import { response, Response } from "express";
import Candy from "../models/candyModel";
import { customAsyncHandler, CustomRequest } from "../common/customTypes";
import ReviewModel, { Review } from "../models/reviewModel";
import mongoose from "mongoose";

const getExampleCandies = customAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const response: any = await fetch(
      "http://jellybellywikiapi.onrender.com/api/beans"
    );
    const candies = await response.json();
    res.json(candies.items);
  }
);

const getCandies = customAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword as string,
            $options: "i",
          },
        }
      : {};

    const rating = req.query.rating
      ? {
          rating: {
            $eq: Number(req.query.rating),
          },
        }
      : {};

    const count = await Candy.countDocuments({
      ...keyword,
      ...rating,
    });

    const candies = await Candy.find({ ...keyword, ...rating });
    res.json({ candies, count });
  }
);

const getCandyById = customAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const candy = await Candy.findById(req.params.id).populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
      },
    });

    if (candy) {
      candy.reviews = candy.reviews.sort(
        (review1: Review, review2: Review) =>
          new Date(review2.createdAt).getTime() -
          new Date(review1.createdAt).getTime()
      );
      res.json(candy);
    } else {
      res.status(404);
      throw new Error("Candy not found");
    }
  }
);

const deleteCandy = customAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const candy = await Candy.findById(req.params.id);

    if (candy) {
      await candy.deleteOne();
      res.json({ message: "Candy removed" });
    } else {
      res.status(404);
      throw new Error("Candy not found");
    }
  }
);

const createCandy = customAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { body, user } = req;

    const candy = new Candy({ ...body, createdBy: user?._id });
    const createdCandy = await candy.save();

    res.status(201).json(createdCandy);
  }
);

const updateCandy = customAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const {
      body: {
        sugarFree,
        groupName,
        description,
        image,
        flavorName,
        glutenFree,
        seasonal,
        kosher,
      },
      params: { id },
    } = req;

    const candy = await Candy.findByIdAndUpdate(
      id,
      {
        description,
        image,
        groupName,
        flavorName,
        sugarFree,
        glutenFree,
        seasonal,
        kosher,
      },
      { new: true }
    );

    if (candy) {
      res.json(candy);
    } else {
      res.status(404);
      throw new Error("Candy not found");
    }
  }
);

const createCandyReview = customAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const {
      body: { review },
    } = req;

    const candy = await Candy.findById(req.params.id);

    if (candy) {
      const reviewToSave = new ReviewModel({
        //   name: req.user.name,
        rating: Number(review.rating),
        comment: review.comment,
        user: new mongoose.Types.ObjectId(req.user!._id as number),
      });

      candy.reviews.push(reviewToSave);
      candy.reviewsAmount = candy.reviews.length;
      candy.rating =
        candy.reviews.reduce(
          (acc: number, item: Review) => item.rating + acc,
          0
        ) / candy.reviews.length;

      const updatedCandy = await candy.save();
      res.json(updatedCandy);
    } else {
      res.status(404);
      throw new Error("Candy not found");
    }
  }
);

const getTopCandies = customAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const candies = await Candy.find({}).sort({ rating: -1 }).limit(4);
    res.json(candies);
  }
);

export {
  getCandies,
  getCandyById,
  deleteCandy,
  createCandy,
  updateCandy,
  createCandyReview,
  getExampleCandies,
  getTopCandies,
};
