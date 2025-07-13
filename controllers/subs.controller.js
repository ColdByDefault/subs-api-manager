import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSubscription = async (req, res) => {
  try {
    const {
      name,
      price,
      currency,
      frequency,
      category,
      startDate,
      paymentMethod,
    } = req.body;

    // Validate required fields
    if (!name || !price || !currency || !frequency) {
      return res.status(400).json({
        error:
          "Missing required fields: name, price, currency, and frequency are required",
      });
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId: req.user.id,
        name,
        price: parseFloat(price),
        currency,
        frequency,
        category,
        paymentMethod,
        startDate: startDate ? new Date(startDate) : new Date(),
        status: "ACTIVE",
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "Subscription created successfully",
      subscription,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: "Failed to create subscription" });
  }
};

export const getSubscriptions = async (req, res, next) => {
  try {
    // Convert req.params.id to number for comparison
    const requestedUserId = parseInt(req.params.id);

    // Check if the user is requesting their own subscriptions
    if (req.user.id !== requestedUserId) {
      return res.status(403).json({ error: "Forbidden access" });
    }

    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId: requestedUserId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      message: "Subscriptions retrieved successfully",
      subscriptions,
      count: subscriptions.length,
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
};
