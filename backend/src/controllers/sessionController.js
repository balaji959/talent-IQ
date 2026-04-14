import { streamClient } from "../lib/stream.js";
import Session from "../models/session.js";
export async function  createSession(req, res) {
    try{
        const {problem, difficulty} = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;
        if(!problem || !difficulty){
            return res.status(400).json({error: "problem and difficulty are required"});
        }
        
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        // Create a new session document in MongoDB
        const session = await Session.create({
            problem,
            difficulty,
            hostuserId: userId,
            callId
        });
// create stream video call with the same callId and custom data containing problem, difficulty, sessionId
        await streamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: {
                    problem,
                    difficulty,
                    sessionId: session._id.toString()
                },
            }
        }); 

        //chat messaging
chatClient.channel("messaging", callId, {
    name: `${problem} session`,
    created_by_id: clerkId,
    member:[clerkId]
});

await channel.create();

        res.status(201).json({ session});
    } catch (err) {
        console.error('err in createSession controller:', err);
        res.status(500).json({ error: 'Internal server error' });

    }
}

export async function  getActiveSession(req, res) {
    try {
        const session = await Session.find({ status: "active" })
        .populate("host", "name email profileImage clerkId")
        .sort({ createdAt: 1 })
        .limit(20);
        res.status(200).json({ session });
    } catch (err) {
        console.error('err in getActiveSession controller:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function  getMyRecentSessions(req, res) {
    try {
        const userId = req.user._id;
        const sessions = await Session.find({
            $or: [{ host: userId }, { participants: userId }],
        })

        .sort({ createdAt: -1 })
        .limit(20);
        res.status(200).json({ sessions });
    }  catch (err) {
        console.error('err in getMyRecentSessions controller:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function  getSessionById(req, res) {
    try {
        const { id } = req.params;
        const session = await Session.findById(id)
        .populate("host", "name email profileImage  clerkId")
        .populate("participants", "name email profileImage clerkId");

        if (!session) return res.status(404).json({ error: "Session not found" });
        
        res.status(200).json({ session });
    } catch (err) {
        console.error('err in getSessionById controller:', err);
        res.status(500).json({ error: 'Internal server error' });
    }

}

export async function  joinSession(req, res) {
    try { const { id } = req.params;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;
        const session = await Session.findById(id);
        if (!session) return res.status(404).json({ error: "Session not found" });
        if (session.status !== "active") return res.status(400).json({ error: "Session is not active" });
        if (session.host.toString() === userId.toString()) return res.status(400).json({ error: "Host cannot join as participant" });
        if (session.participants.includes(userId)) return res.status(400).json({ error: "User is already a participant" });
        session.participants = [...session.participants, userId];
        await session.save();
        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkId]);
        res.status(200).json({ session });
    } catch (err) {
        console.error('err in joinSession controller:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function  endSession(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const session = await Session.findById(id);
        if (!session) return res.status(404).json({ error: "Session not found" });
        if (session.host.toString() !== userId.toString()) {
            return res.status(403).json({ error: "Only host can end the session" });
        }
        if (session.status !== "completed") {
           
           

            // delete stream video call
            const call = streamClient.video.call("default", session.callId);
            await call.delete({ hard: true });

            // delete stream chat channel
            const channel = chatClient.channel("messaging", session.callId);
            await channel.delete();
            session.status = "completed";
            await session.save();
        }
        res.status(200).json({ session, message: "Session ended successfully" });
    } catch (err) {
        console.error('err in endSession controller:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}