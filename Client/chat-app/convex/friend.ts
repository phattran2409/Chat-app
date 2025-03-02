import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { _getUserByClerkId } from "./_utils";

export const remove = mutation({
    args  : {
        conversationId : v.id("conversations"), 
        type : v.string(), 
        content : v.array(v.string())
    } , 
     handler : async (ctx, args) => {
         const identity = await ctx.auth.getUserIdentity();
        
        if (!identity) {
              throw new ConvexError("Unauthorized");
        }
            //
        const currentUser = await _getUserByClerkId({
            ctx,
            clerkId: identity.subject,
        });

        if (!currentUser) {
            throw new ConvexError("User not found");
        }
        const conversation = await ctx.db.get(args.conversationId)

        if(!conversation) {
            throw new ConvexError("Conversation not found")
        }
        const memberShip = await ctx.db.query("conversationMembers")
        .withIndex("by_conversationId" , (q) => q.eq("conversationId" , args.conversationId))
         .collect()  

        if(!memberShip || memberShip.length !== 2 ) {
            throw new ConvexError("this conversation does not have any members")
        }

        const friendShip = await ctx.db.query("friends")
        .withIndex("by_conversationId" , (q) => q.eq("conversationId" , args.conversationId ))
        .unique()

        if(!friendShip) {
            throw new ConvexError("friend could not be found")
        }
    
        const messages = await ctx.db.query("messages")
        .withIndex("by_conversationId" , (q) => q.eq("conversationId" , args.conversationId))
        .collect()
        
        await ctx.db.delete(args.conversationId)

         await ctx.db.delete(friendShip._id)
        
         await Promise.all(memberShip.map(async memberShip => {
            await ctx.db.delete(memberShip._id)
         }))
        
         await Promise.all(messages.map(async message => {
            await ctx.db.delete(message._id)
         }))
    },
})