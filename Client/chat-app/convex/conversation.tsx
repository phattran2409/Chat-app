import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./user";
import { Id } from "./_generated/dataModel";
import  {QueryCtx , MutationCtx} from "./_generated/server"

export const get = query({args : {} , 
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
        
        const conversationMembership = await ctx.db.query("conversationMembers").
        withIndex("by_memberId" , q => q.eq("memberId" , currentUser._id)).collect()
        
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
          conversations.map( async (conversation ) => {
                 const lastMessage = await getLastMessageDetails({
                   ctx,
                   id: conversation.lastMessageId,
                 });
                
                 if (lastMessage?.sender === currentUser.userName  ){
                    lastMessage.sender = "Your"
                 }

                const allConversationMemberships =  await ctx.db.query("conversationMembers")
                .withIndex("by_conversationId" , q =>  q.eq("conversationId" ,  conversation?._id))
                .collect()

                if(conversation.isGroup) { 
                    return (conversation)
                }else { 
                     
                     const otherMembership = allConversationMemberships.filter(
                        (membership) => membership.memberId !== currentUser._id
                     )[0];

                     const otherMember = await ctx.db.get(otherMembership.memberId)
                    
                     return {
                       conversation,
                       otherMember,
                       lastMessage,     
                     };
                }
            })
        )

        return conversationwithDetails
    }
        
})


 const getLastMessageDetails = async (
    {ctx , id} : 
     {  ctx : QueryCtx  | MutationCtx
        id: Id<"messages"> | undefined
     }
) => { 
    if(!id) return null 
    const message = await ctx.db.get(id)

    if (!message) return null
    
    const sender = await ctx.db.get(message.senderId)
    
    if (!sender) return  null
    
    const content = getMessageContent(message.type , message.content as unknown  as string)
    return {
         content, 
         sender : sender.userName
    }
}

const getMessageContent = (type : string , content :string) => { 
    switch(type) {
        case  "Text": 
            return content
        default  :  
          return "[no-content]"
    }
}