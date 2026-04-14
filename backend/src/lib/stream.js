import {StreamChat} from 'stream-chat';
import { ENV } from "./env.js"; 

const apikey = ENV.STREAM_API_KEY;
const secretapi = ENV.STREAM_SECRET_KEY;

if (!apikey || !secretapi) {
  throw new Error("STREAM_API_KEY and STREAM_SECRET_KEY are required");
}

export const streamClient = new StreamChat(apikey, secretapi);
export const chatClient = new StreamChat(apikey, secretapi);
export const client = chatClient;

export const upsertStreamUser = async (userData) => {
    try { 
        await chatClient.upsertUser(userData);
        console.log("Stream user upserted:", userData);
    } catch (error) {
        console.error("Error upserting Stream user:", error);
        throw error;
    }
};

export const deleteStreamUser = async (userId) => {
    try { 
        await chatClient.deleteUser(userId);
        console.log("Stream user deleted:", userId);
    } catch (error) {
        console.error("Error deleting Stream user:", error);
        throw error;
    }
};