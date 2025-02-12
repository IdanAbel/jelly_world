import express from "express";
import {
  login,
  googleLogin,
  register,
  getUserProfile,
  updateUserProfile,
  getAll,
  deleteUser,
  getById,
} from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", protect, getAll);
router.get("/:id", getById);
router.get("/profile", protect, getUserProfile);
router.post("/", register);
router.post("/login", login);
router.post("/googleLogin", googleLogin);
router.put("/profile", updateUserProfile);
router.delete("/:id", protect, deleteUser);

export default router;

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: "Get all users"
 *     tags:
 *       - users
 *     responses:
 *       '200':
 *         description: "List of users"
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 $ref: "#/components/schemas/User"
 *   post:
 *     summary: "Create a new user"
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       '201':
 *         description: "User created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *
 * /api/users/{userId}:
 *   get:
 *     summary: "Get user by ID"
 *     tags:
 *       - users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: "ID of the user to retrieve"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: "User details"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *   put:
 *     summary: "Update user by ID"
 *     tags:
 *       - users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: "ID of the user to update"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       '200':
 *         description: "User updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *
 * /api/users/login:
 *   post:
 *     summary: "User login"
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Login"
 *     responses:
 *       '200':
 *         description: "Login successful"
 * /api/users/googlelogin:
 *   post:
 *     summary: "User login with Google"
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               googleId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: "Login with Google successful"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         image:
 *           type: string
 *           format: url
 *         googleId:
 *           type: string
 *       required:
 *         - id
 *         - name
 *         - email
 *         - password
 *       additionalProperties: false
 *       xml:
 *         name: User
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: password123
 *         image: "https://example.com/johndoe.jpg"
 *         googleId: googleId123
 *
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 *       additionalProperties: false
 *       xml:
 *         name: Login
 *       example:
 *         email: johndoe@example.com
 *         password: password123
 */
