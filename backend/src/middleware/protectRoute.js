import { requireAuth } from '@clerk/express'
import User from '../models/user.js';

export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth.userId;
            if (!clerkId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const user = await User.findOne({ clerkId });
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            req.user = user;
            next();
        } catch (err) {
            console.error('err in protectRoute middleware:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
];