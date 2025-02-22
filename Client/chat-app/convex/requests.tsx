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
        const request = await ctx.db.
        query("requests")
        .withIndex("by_receiver" , (q) => q.eq("receiver" , getCurrUsr._id))
        .collect();
        
        const requestWithSender = await 
        Promise.all(
            request.map( async (req) => {
                const sender = await ctx.db.get(req.sender)

                if (!sender) {
                    throw new ConvexError("Request sender could not be found ")
                }
                
                return { 
                    sender , request : req
                }
            })
        )
        return  requestWithSender
    }
        
})

export const count = query( 
{   args :{},
    handler: async (ctx ,args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
          throw new Error("Unauthorized");
        }
        const getCurrUsr = await getUserByClerkId(ctx, {
          clerkId: identity.subject,
        });

        if (!getCurrUsr) {
          throw new ConvexError("User Not Found");
        }
        const request = await ctx.db
          .query("requests")
          .withIndex("by_receiver", (q) => q.eq("receiver", getCurrUsr._id))
          .collect();

        return request.length
        
        
    }
}
)