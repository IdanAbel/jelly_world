import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Candy from '../models/CandyModel';

interface Review {
  name: string;
  rating: number;
  comment: string;
  user: string;
}

const getCandies = asyncHandler(async (req: Request, res: Response) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword as string,
          $options: 'i',
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
});

const getCandyById = asyncHandler(async (req: Request, res: Response) => {
  const candy = await Candy.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
      path: 'user',
      model: 'User',
    },
  });

  if (candy) {
    candy.reviews = candy.reviews.sort(
      (review1: Review, review2: Review) =>
        new Date(review2.createdAt).getTime() - new Date(review1.createdAt).getTime()
    );
    res.json(candy);
  } else {
    res.status(404);
    throw new Error('Candy not found');
  }
});

const deleteCandy = asyncHandler(async (req: Request, res: Response) => {
  const candy = await Candy.findById(req.params.id);

  if (candy) {
    await candy.remove();
    res.json({ message: 'Candy removed' });
  } else {
    res.status(404);
    throw new Error('Candy not found');
  }
});

const createCandy = asyncHandler(async (req: Request, res: Response) => {
  const { body, user } = req;

  const candy = new Candy({ ...body, createdBy: user._id });
  const createdCandy = await candy.save();

  res.status(201).json(createdCandy);
});

const updateCandy = asyncHandler(async (req: Request, res: Response) => {
  const {
    body: { name, summary, image, manufacturer, ingredients, flavor },
    params: { id },
  } = req;

  const candy = await Candy.findByIdAndUpdate(id, {
    name,
    summary,
    image,
    ingredients,
    flavor,
  }, { new: true });

  if (candy) {
    res.json(candy);
  } else {
    res.status(404);
    throw new Error('Candy not found');
  }
});

const createCandyReview = asyncHandler(async (req: Request, res: Response) => {
  const {
    body: { rating, comment },
  } = req;

  const candy = await Candy.findById(req.params.id);

  if (candy) {
    const review: Review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    candy.reviews.push(review);
    candy.numReviews = candy.reviews.length;
    candy.rating =
      candy.reviews.reduce((acc: number, item: Review) => item.rating + acc, 0) /
      candy.reviews.length;

    const updatedCandy = await candy.save();
    res.json(updatedCandy);
  } else {
    res.status(404);
    throw new Error('Candy not found');
  }
});

const getTopCandies = asyncHandler(async (req: Request, res: Response) => {
  const candies = await Candy.find({}).sort({ rating: -1 }).limit(4);
  res.json(candies);
});

export {
  getCandies,
  getCandyById,
  deleteCandy,
  createCandy,
  updateCandy,
  createCandyReview,
  getTopCandies,
};
