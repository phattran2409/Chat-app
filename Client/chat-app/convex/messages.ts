import { ConvexError, v } from "convex/values"
import { query } from "./_generated/server"
import { getUserByClerkId } from "./user"

export const get = query({args : {
    id : v.id("conversations")
} , 
    handler : async (ctx , args ) => {
        const identity  = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthorized")
        }
        const  currentUser  = await 
        getUserByClerkId(
            ctx , {clerkId : identity.subject} 
        )

        if(!currentUser) {
            throw new ConvexError("User Not Found")
        }

        const messages = await ctx.db.query("messages"). 
        withIndex("by_conversationId" , (q) => q.eq("conversationId" , args.id ))
        .order("desc").collect()

        const messageWithUsers = Promise.all(
            messages.map(async (_message) =>{ 
                const messageSender = await ctx.db.get(_message.senderId)  
                if (!messageSender) { 
                    throw new ConvexError("could not find sender of message")
                }

                return { 
                    message : _message ,
                    senderImage : messageSender.imageUrl, 
                    senderName : messageSender.userName, 
                    isCurrentUser  : messageSender._id === currentUser._id
                }
             }
            )
        )
        return messageWithUsers;
    }
})