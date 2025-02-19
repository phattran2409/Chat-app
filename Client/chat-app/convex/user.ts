import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

export const _createUser = internalMutation({
  args: {
    userName: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});

export const getUserByClerkId = internalQuery({
    args : { 
        clerkId : v.string()
    }, 
    handler : async (ctx , args) => {
        return await ctx.db.query("users").
        withIndex("by_clerkId" , (q) => q.eq("clerkId" , args.clerkId) )
        .first()
    }
})
