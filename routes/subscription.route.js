import { Router } from "express";
import {authorize} from "../middelwares/auth.middleware.js";
import { createSubscription, getSubscriptions } from "../controllers/subs.controller.js";

const SubscriptionRouter = Router();

SubscriptionRouter.get('/', (req, res) => {
    res.send({
        title: 'Fetch all Subscriptions'
    });
});

SubscriptionRouter.post('/', authorize, createSubscription);

SubscriptionRouter.get('/:id', (req, res) => {
    res.send({
        title: 'Fetch one Subscription'
    });
});

SubscriptionRouter.put('/:id', authorize);

SubscriptionRouter.delete('/:id', (req, res) => {
    res.send({
        title: 'Delete one Subscription'
    });
});

SubscriptionRouter.get('/user/:id', authorize, getSubscriptions);

SubscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({
        title: 'Cancel one User Subscription'
    });
});

SubscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({
        title: 'Get all Upcoming Subscriptions'
    });
});

export default SubscriptionRouter;