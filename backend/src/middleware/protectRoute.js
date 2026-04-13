import {  requireAuth } from '@clerk/express'
import user from '../models/user.js';


export const protectRoute = [
    requireAuth({signInUrl:"/sign-in"}), // This middleware checks for a valid session and populates req.auth
    async (req, res, next) => {
        try {
            const clerkId = req.auth.userId; // Get the Clerk user ID from the session
            if (!clerkId) {
                return res.status(401).json({ error: 'Unauthorized-Invalid token' });
            }
            const foundUser = await user.findOne({ clerkId });
            if (!foundUser) {
                return res.status(401).json({ error: 'User not found' });
            }
            req.user = foundUser; // Attach the user to the request object for downstream use
            next();
        } catch (err) {
            console.error('err in protectRoute middleware:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
];