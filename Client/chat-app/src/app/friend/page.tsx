"use client"
import { useQuery } from "convex/react";
import ConversationFallback from "../component/conversation/conversationFallback";
import { api } from "../../../convex/_generated/api";
import ItemList from "../component/item-list/ItemList";
import { AddfriendDialog } from "./_components/AddFriend";
import { Loader2 } from "lucide-react";
import RequestComponent from "./_components/requestComponent";


export default function FriendPage(params) {
    const requests = useQuery(api.requests.get)
  return (
    <>
      <ItemList title="Friend" action={<AddfriendDialog />}>
        {Array.isArray(requests) ? (
          requests.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No Friend requests
            </p>
          ) : (
            requests.map((request) => (
              <RequestComponent  key={request.request._id} 
                id={request.request._id}
                imageUrl={request.sender.imageUrl}
                email={request.sender.email}
                userName={request.sender.userName}
              >
              </RequestComponent>
            ))
          )
        ) : (
          <Loader2 className="h-8 w-8" />
        )}
      </ItemList>
      <ConversationFallback />
    </>
  );
}
