import { ConvexError, v } from "convex/values"
import { query } from "./_generated/server"
import { getUserByClerkId } from "./user"

export const get = query({
    args : {
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
        const conversation = await ctx.db.get(args.id)
        
        if (!conversation) {
            throw new ConvexError("Conversation Not Found");
        }
        const membership = await ctx.db.query("conversationMembers")
        .withIndex("by_memberId_conversationId" , q => q.eq("memberId" , currentUser._id).eq("conversationId" , conversation._id))
        .unique()

        if (!membership) {
            throw new ConvexError("You aren't a member of this conversation")
        }
        
        const allConversationMemberShip  = await ctx.db.query("conversationMembers")
        .withIndex("by_conversationId" , q => q.eq("conversationId" , conversation._id))
        .collect()
        
        if(!conversation.isGroup) { 
            const  otherMembership = allConversationMemberShip.
            filter((membership) => membership.memberId !== currentUser._id)[0]
        

        const otherMemberDetail = await ctx.db.get(otherMembership.memberId);
         return {
            ...conversation ,
             otherMember : { 
                ...otherMemberDetail,
                lastSeenMessageId : otherMembership.lastSeenMessage
             } ,
            otherMembers : null
         }
        }
    }
        
})