import { requireAuth } from '@clerk/express'
import user from '../models/user.js';

export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth.userId;
            if (!clerkId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const foundUser = await user.findOne({ clerkId });
            if (!foundUser) {
                return res.status(401).json({ error: 'User not found' });
            }
            req.user = foundUser;
            next();
        } catch (err) {
            console.error('err in protectRoute middleware:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
];