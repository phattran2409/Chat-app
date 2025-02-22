import { defineSchema , defineTable } from "convex/server";
import { v } from "convex/values";

export default  defineSchema({
    //table users
    users : defineTable({
        userName : v.string(), 
        imageUrl : v.string(), 
        clerkId : v.string(), 
        email :  v.string()

    }).index("by_email" , ["email"])
    .index("by_clerkId" , ["clerkId"]),
    // table requests 
    requests: defineTable({
        sender : v.id("users"), 
        receiver : v.id("users")

    }).index("by_receiver" ,  ["receiver"]). 
    index("by_receiver_sender" , ["receiver" ,"sender"])
})
