import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    // Validate if the ID is a valid integer
    if (isNaN(userId)) {
      const error = new Error("Invalid user ID format");
      error.statusCode = 400;
      throw error;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404; // Not Found
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
