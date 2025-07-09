import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send({
        title: 'Fetch all Users'
    });
});

userRouter.post('/', (req, res) => {
    res.send({
        title: 'Create a User'
    });
});

userRouter.get('/:id', (req, res) => {
    res.send({
        title: 'Fetch one User'
    });
});

userRouter.post('/:id', (req, res) => {
    res.send({
        title: 'Update one User'
    });
});

userRouter.delete('/:id', (req, res) => {
    res.send({
        title: 'Delete one User'
    });
});

export default userRouter;