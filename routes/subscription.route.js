import { Router } from "express";

const SubscriptionRouter = Router();

SubscriptionRouter.get('/', (req, res) => {
    res.send({
        title: 'Fetch all Subscriptions'
    });
});

SubscriptionRouter.post('/', (req, res) => {
    res.send({
        title: 'Create a Subscription'
    });
});

SubscriptionRouter.get('/:id', (req, res) => {
    res.send({
        title: 'Fetch one Subscription'
    });
});

SubscriptionRouter.put('/:id', (req, res) => {
    res.send({
        title: 'Update one Subscription'
    });
});

SubscriptionRouter.delete('/:id', (req, res) => {
    res.send({
        title: 'Delete one Subscription'
    });
});

SubscriptionRouter.get('/user/:id', (req, res) => {
    res.send({
        title: 'Get one User Subscription'
    });
});

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