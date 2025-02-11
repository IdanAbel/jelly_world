import express from "express";
import {
  getCandies,
  getCandyById,
  deleteCandy,
  createCandy,
  updateCandy,
  createCandyReview,
  getTopCandies,
  getExampleCandies,
  likeCandy, unlikeCandy,
} from "../controllers/candyController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/example", getExampleCandies);
router.get("/", getCandies);
router.post("/", protect, createCandy);
router.post("/:id/reviews", protect, createCandyReview);
router.get("/top", getTopCandies);
router.get("/:id", getCandyById);
router.delete("/:id", protect, deleteCandy);
router.put("/:id", protect, updateCandy);
router.post('/:id/like', protect, likeCandy);
router.post('/:id/unlike', protect, unlikeCandy);

export default router;

// Swagger documentation for the candy routes
/**
 * @swagger
 * /api/candy:
 *   get:
 *     summary: "Get all candies"
 *     tags:
 *       - candy
 *     responses:
 *       '200':
 *         description: "List of candies"
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 $ref: "#/components/schemas/Candy"
 *   post:
 *     summary: "Create a new candy"
 *     tags:
 *       - candies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Candy"
 *     responses:
 *       '201':
 *         description: "Candy created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Candy"
 */

/**
 * @swagger
 * /api/candy/{id}:
 *   get:
 *     summary: "Get a candy by ID"
 *     tags:
 *       - candy
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the candy to retrieve"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: "Candy details"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Candy"
 *   put:
 *     summary: "Update a candy by ID"
 *     tags:
 *       - candy
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the candy to update"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Candy"
 *     responses:
 *       '200':
 *         description: "Candy updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Candy"
 *   delete:
 *     summary: "Delete a candy by ID"
 *     tags:
 *       - candy
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the candy to delete"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '204':
 *         description: "Candy deleted successfully"
 */

/**
 * @swagger
 * /api/candy/{id}/reviews:
 *   get:
 *     summary: "Get all reviews for a candy"
 *     tags:
 *       - reviews
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the candy to retrieve reviews for"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: "List of reviews for the candy"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Review"
 *   post:
 *     summary: "Post a review for a candy"
 *     tags:
 *       - reviews
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the candy to post a review for"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Review"
 *     responses:
 *       '201':
 *         description: "Review posted successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Review"
 * components:
 *   schemas:
 *     Candy:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *         image:
 *           type: string
 *           format: url
 *         flavor:
 *           type: string
 *         description:
 *           type: string
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 10
 *         stock:
 *           type: integer
 *         reviews:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Review"
 *         createdBy:
 *           type: string
 *       required:
 *         - id
 *         - name
 *         - flavor
 *         - description
 *         - rating
 *         - stock
 *         - reviews
 *         - createdBy
 *       additionalProperties: false
 *       xml:
 *         name: Candy
 *       example:
 *         id: 1
 *         name: Chocolate Delight
 *         image: "https://example.com/chocolate_delight.jpg"
 *         flavor: Chocolate
 *         description: "A delicious chocolate candy that melts in your mouth."
 *         rating: 9.5
 *         stock: 120
 *         reviews:
 *           - id: 1
 *             rating: 10
 *             comment: "Best chocolate candy ever!"
 *             user: "JohnDoe123"
 *           - id: 2
 *             rating: 9
 *             comment: "Really good, but a bit too sweet for me."
 *             user: "JaneSmith456"
 *         createdBy: AdminUser123
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 10
 *         comment:
 *           type: string
 *         user:
 *           type: string
 *       required:
 *         - id
 *         - rating
 *         - comment
 *         - user
 *       additionalProperties: false
 *       xml:
 *         name: Review
 *       example:
 *         id: 1
 *         rating: 9.5
 *         comment: "This candy is amazing!"
 *         user: "JohnDoe123"
 * @swagger
 * /api/candy/{id}/like:
 *   post:
 *     summary: "Like a candy"
 *     tags:
 *       - candy
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the candy to like"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: "Candy liked successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Candy"
 *       '400':
 *         description: "Bad request, invalid data"
 *       '404':
 *         description: "Candy not found"
 * @swagger
 * /api/candy/{id}/unlike:
 *   post:
 *     summary: "Unlike a candy"
 *     tags:
 *       - candy
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the candy to unlike"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: "Candy unliked successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Candy"
 *       '400':
 *         description: "Bad request, invalid data"
 *       '404':
 *         description: "Candy not found"
 */
