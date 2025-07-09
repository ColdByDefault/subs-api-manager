import express from 'express';
import { PORT } from './config/env.js';
// Importing routes
import subscriptionRouter from './routes/subscription.route.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';


const app = express();



app.get('/', (req, res) => {
    res.send('Subscription API Management!');
})

// Routing
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Subscription API Management is running on http://localhost:${PORT}`);
});


export default app;