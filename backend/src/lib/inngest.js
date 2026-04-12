import {Inngest} from "inngest";
import { connectDB } from "./db.js";
import User from "./models/User.js";
export const inngest = new Inngest({ id: "talent-IQ" });
const syncUser = inngest.createFunction(
    {id: "sync/user"},
    {event: "clerk.user.created"},
    async ({event}) => {
        await connectDB();

        const {id, email_address, first_name, last_name} = event.data
        const newUser = {
            clerkId: id,
            email: email_address[0].email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            /* The line `profileImage: image_url` is attempting to assign a value to the `profileImage`
            property of the `newUser` object. However, it seems that the `image_url` variable is not
            defined in the provided code snippet. */
            profileImage: image_url
        }
        await User.create(newUser)
    }
)
const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db"},
    {event: "clerk.user.deleted"},
    async ({event}) => {
        await connectDB();

        const {id} = event.data
        
        await User.deleteOne({ clerkId: id })
    }
)
export const functions = [syncUser, deleteUserFromDB];