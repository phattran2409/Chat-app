"use client"
import { useMutation, useQuery } from "convex/react";
import ConversationFallback from "../component/conversation/conversationFallback";
import { api } from "../../../convex/_generated/api";
import ItemList from "../component/item-list/ItemList";
import { AddfriendDialog } from "./_components/AddFriend";
import { Loader2 } from "lucide-react";
import RequestComponent from "./_components/requestComponent";
import FriendList from "./_components/FriendList";



export default function FriendPage() {
    const requests = useQuery(api.requests.get)
    const Friends = useQuery(api.friend.get)
    
   Friends?.map((friend) => {
      console.log(friend);
    })
  return (
    <>
    <div className="w-full h-full flex flex-col lg:flex-row gap-5 ">
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
       {Friends?.length ===  0 ? (
         <div>
            Dont have any Friend request friends  
         </div>
       ) : (
        <div className="List-Friend w-full h-full flex flex-col gap-2 p-2 bg-muted overflow-y-auto rounded-md">
          <h4 className="font-semibold w-full text-center text-lg">Your Friend</h4>
        {
         Friends?.map((friend ,index) => {
          return (
              <FriendList
                userName={friend?.name}
                imageUrl={friend?.imageUrl}
                userId={friend?.friendId}
                key={index}
              />
          );
         })
        }
        </div>
       )}
      </div>
    </>
  );
}
