import useConversation from '@/app/hook/useConversation';
import { useQueries, useQuery } from 'convex/react';
import React from 'react';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';
import Messages from './Messsage';


interface Props {
 
}

const Body: React.FC<Props> = () => {
   const { conversationId} = useConversation();
   const messages = useQuery(api.messages.get , { id : conversationId as Id<"conversations"> } )
  return  (
    <div className="flex flex-1 w-full overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
        {messages?.map(({message , senderImage , senderName , isCurrentUser} , index) => { 
          // const lastByUser = messages[index-1].message.senderId === messages[index].message.senderId
          console.log(isCurrentUser);
          return (
            <Messages key={message._id}
                fromCurrentUser={isCurrentUser}
                senderImg={senderImage}
                senderName={senderName}
                lastByUser={false}
                content={message.content}
                createAt={message._creationTime}
                type={message.type}
                  />
          )
         }
        ) }
    </div>
  )
}
export default Body