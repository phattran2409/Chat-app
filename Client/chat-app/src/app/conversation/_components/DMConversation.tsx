"use client"
import Link from "next/link";
import { Id } from "../../../../convex/_generated/dataModel"
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import { Span } from "next/dist/trace";

type Props = { 
    id : Id<"conversations">; 
    imageUrl: string; 
    userName : string;
    lastMessageSender? : string ; 
    lastMessageContent? : string ;
}
const DMConversationItem  = ({
    id , imageUrl , userName , lastMessageContent , lastMessageSender
} : Props) => {
 return (
   <Link href={`/conversation/${id}`} className="w-full">
     <Card className="p-2 flex flex-row items-center gap-4 truncate">
       <div className="flex flex-row items-center gap-4 truncate">
         <Avatar>
           <AvatarImage src={imageUrl} />
           <AvatarFallback>
             <User />
           </AvatarFallback>
         </Avatar>
         <div className="">
           <h4>{userName}</h4>
           {lastMessageContent && lastMessageSender ? (
             <span className="flex text-xs text-muted-foreground truncate overflow-ellipsis">
                <p className="font-semibold">
                    {lastMessageSender}
                    {":"}&nbsp;
                </p>
                <p className="truncate overflow-ellipsis"> 
                    {lastMessageContent}
                </p>
             </span>
           ) : (
             <p className="text-xs text-muted-foreground truncate">
               Start conversation
             </p>
           )}
         </div>
       </div>
     </Card>
   </Link>
 );
}

export default DMConversationItem