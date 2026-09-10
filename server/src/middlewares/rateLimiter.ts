import {rateLimit} from "express-rate-limit";

export const perIpLimiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes
    limit: 20, // Limit each IP to 20 requests per window (20 minutes in this case)
    message: {error: 'Too Many attempts, please try again later'},
    standardHeaders: true,
    legacyHeaders: false,
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})

