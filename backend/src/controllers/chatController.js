import { client } from '../lib/stream.js';

export async function getStreamToken(req, res) {
    try {
        const token = client.createToken(req.user.clerkId);
        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image
        });
    } catch (err) {
        console.error('Error in getStreamToken controller:', err);
        res.status(500).json({ error: 'internal server error' });
    }
}