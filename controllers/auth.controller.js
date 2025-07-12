import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION } from "../config/env.js";

const prisma = new PrismaClient();

export const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409; // Conflict
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401; // Unauthorized
      throw error;
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401; // Unauthorized
      throw error;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    res.status(200).json({
      success: true,
      message: "Sign in successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    // In a stateless JWT system, sign out is typically handled on the client side
    // by removing the token from storage. However, we can still send a response
    // to confirm the sign out action.

    res.status(200).json({
      success: true,
      message: "Sign out successful",
    });
  } catch (error) {
    next(error);
  }
};
