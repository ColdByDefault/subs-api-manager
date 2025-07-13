import aj from "../config/arcjet.config.js";
import { isSpoofedBot } from "@arcjet/inspect";


const arcjetMiddleware = async (req, res, next) => {

    try {
        const decision = await aj.protect(req, {requested: 1});

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({ error: "Too Many Requests" });
            } else if (decision.reason.isBot()) {
                res.status(403).json({ error: "No bots allowed" });
            } else {
                res.status(403).json({ error: "Forbidden" });
            }
        } else if (decision.results.some(isSpoofedBot)) {
            res.status(403).json({ error: "Forbidden" });
        } else {
            next();
        }


    } catch (error) {
        console.error("Arcjet middleware error:", error);
        res.status(500).json({ error: "Internal Server Error" });
        next(error);
    }

}

export default arcjetMiddleware;