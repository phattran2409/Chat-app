import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./user";



export const get = query({args : {} , 
    handler : async (ctx , args ) => {
        const identity  = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthorized")
        }
        const  getCurrUsr  = await 
        getUserByClerkId(
            ctx , {clerkId : identity.subject} 
        )

        if(!getCurrUsr) {
            throw new ConvexError("User Not Found")
        }
        
        const conversationMembership = await ctx.db.query("conversationMembers").
        withIndex("by_memberId" , q => q.eq("memberId" , getCurrUsr._id)).collect()
        
        const conversations =await Promise.all(
            conversationMembership?.map(async (membership) => { 
                 const conversation = await ctx.db.get(membership.conversationId)
                 if (!conversation) {
                    throw new ConvexError("Conversation could not be found")
                 }
              return conversation
            })
        )

        const conversationwithDetails = await Promise.all(
          conversations.map( async (conversation  , index) => {
                const allConversationMemberships =  await ctx.db.query("conversationMembers")
                .withIndex("by_conversationId" , q =>  q.eq("conversationId" ,  conversation?._id))
                .collect()

                if(conversation.isGroup) { 
                    return (conversation)
                }else { 
                     const otherMembership = allConversationMemberships.filter(
                        (membership) => membership.memberId !== getCurrUsr._id
                     )[0];

                     const otherMember = await ctx.db.get(otherMembership.memberId)
                    
                     return { 
                        conversation , otherMember
                     }
                }
            })
        )
    }
        
})
