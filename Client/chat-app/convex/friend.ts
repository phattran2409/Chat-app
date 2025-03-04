import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { _getUserByClerkId } from "./_utils";

export const remove = mutation({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
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
    const conversation = await ctx.db.get(args.conversationId);

    if (!conversation) {
      throw new ConvexError("Conversation not found");
    }
    const memberShip = await ctx.db
      .query("conversationMembers")
      .withIndex("by_conversationId", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .collect();

    if (!memberShip || memberShip.length !== 2) {
      throw new ConvexError("this conversation does not have any members");
    }

    const friendShip = await ctx.db
      .query("friends")
      .withIndex("by_conversationId", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .unique();

    if (!friendShip) {
      throw new ConvexError("friend could not be found");
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversationId", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .collect();

    await ctx.db.delete(args.conversationId);

    await ctx.db.delete(friendShip._id);

    await Promise.all(
      memberShip.map(async (memberShip) => {
        await ctx.db.delete(memberShip._id);
      })
    );

    await Promise.all(
      messages.map(async (message) => {
        await ctx.db.delete(message._id);
      })
    );
  },
});

export const get = query({
  args: {
  },
  handler: async (ctx, args) => {
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
     
   const friendsAsUser1 = await ctx.db
     .query("friends")
     .withIndex("by_user1", (q) => q.eq("user1", currentUser._id))
     .collect();

   const friendsAsUser2 = await ctx.db
     .query("friends")
     .withIndex("by_user2", (q) => q.eq("user2", currentUser._id))
     .collect();

     const FriendList = [
       ...friendsAsUser1.map((friend) => ({
         friendId: friend.user2,
         conversationId: friend.conversationId,
       })),
       ...friendsAsUser2.map((friend) => ({
         friendId: friend.user1,
         conversationId: friend.conversationId,
       })),
     ];

     const uniqueFriendList = Array.from(
       new Map(FriendList.map((f) => [f.friendId, f])).values()
     );
     const friendIds = uniqueFriendList.map(f => f.friendId);

     const friendsWithDetails = await Promise.all(
        friendIds.map((id) => ctx.db.get(id))
     )
     
     const FriendListWithDetails = uniqueFriendList.map((friend, index) => ({
       ...friend,
       name: friendsWithDetails[index]?.userName,
        imageUrl :  friendsWithDetails[index]?.imageUrl, 
       // Add other user fields
     }));
     return FriendListWithDetails
  },
});

export const removeFriend = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
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
  

    const friendShip = await ctx.db
      .query("friends")
      .withIndex("by_user1_user2", (q) =>
        q.eq("user1", currentUser._id).eq("user2" , args.userId)
      )
      .unique();

    if (!friendShip) {
        const revertFriendShip = await ctx.db.query("friends")
        .withIndex("by_user1_user2" , (q) => q.eq("user1" , args.userId).eq("user2", currentUser._id)
        ).unique()

        if(!revertFriendShip) {
            throw new ConvexError("Friend ship not found")
        }
        await ctx.db.delete(revertFriendShip._id)
        return;
    }
    
     await ctx.db.delete(friendShip._id);
    
  },
});
    