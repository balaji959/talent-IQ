import {StreamChat} from 'stream-chat';
import { ENV } from "./env.js";
const apikey = ENV.STREAM_API_KEY;
const secretapi = ENV.STREAM_SECRET_KEY;
if (!apikey || !secretapi) {
  throw new Error("STREAM_API_KEY and STREAM_SECRET_KEY are required");
}
export const client = StreamChat(apikey, secretapi);
export const upsertStreamUser = async (userData) => {
    try { 
        await client.upsertUser(userData);
       console.log("Stream user upserted:", userData); // Return the user data after upserting
    } catch (error) {
        console.error("Error upserting Stream user:", error);
        throw error;
    }
};
export const deleteStreamUser = async (userId) => {
    try { 
        await client.deleteUser(userId);
       console.log("Stream user deleted:", userId); // Return the user ID after deletion
    } catch (error) {
        console.error("Error deleting Stream user:", error);
        throw error;
    }
};
