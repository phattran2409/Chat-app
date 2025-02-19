import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { internal } from "./_generated/api";

const http = httpRouter();
// 
console.log("log websocket secret : "+process.env.CLERK_WEBSOCKET_SECRET);
const validatedPayload = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();
  const svixHeader = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };
  const webhook = new Webhook(process.env.CLERK_WEBSOCKET_SECRET || "");

  try {
    const event = webhook.verify(payload, svixHeader) as WebhookEvent;

    return event;
  } catch (error) {
    console.error("Clerk Webhook request could not be verified !", error);
    return undefined;
  }
};
//
const handleClerkWebhook = httpAction(async (ctx, req) => {
  const event = await validatedPayload(req);

  if (!event) {
    return new Response("Could not validate clerk payload", {
      status: 400,
    });
  }
  switch (event.type) {
    case "user.created":
      const user = await ctx.runQuery(internal.user.getUserByClerkId  , {
        clerkId : event.data.id
      })
      if (user) { 
        console.log(`create user : ${event.data.id} `);
      }
  
    
    case "user.updated":
      console.log("Creating  / Updating User", event.data.id);

      await ctx.runMutation(internal.user._createUser, {
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
        userName: event.data.username || event.data.first_name || "Unknown",
        imageUrl: event.data.image_url || "",
      });
      break;
    default: {
      console.log("clerk webhook event not supported", event.type);
    }
  }
  return new Response(null, {
    status: 200,
  });
});


http.route({
  path: "/clerk-user-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

export default http