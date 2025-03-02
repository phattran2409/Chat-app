"use client"
import ConversationContainer from "@/app/component/conversation/conversationContainer";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import React, { use, useState } from 'react';
import { Id } from "../../../../convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatBox from "./_components/input/ChatBox";
import { tree } from "next/dist/build/templates/app-page";


interface Props {
  params: Promise<{ conversationId: Id<"conversations"> }>; // Type params as a Promise
}
type  TypeContent  =  "Audio" | "Video" | null  

const ConversationDetails: React.FC<Props> = ({ params }) => {
  const { conversationId } = use(params); // Unwrap params with React.use()
  const conversation = useQuery(api._conversation.get, { id: conversationId });

  console.log("conversation", conversation);
  const [removeFriendDialogOpen , setRemoveFriendDialogOpen] =  useState(false)
  const [deleteGroupDialogOpen , setDeleteGroupDialogOpen] = useState(false)
  const [LeaveGroupDialogOpen , setLeaveGroupDialogOpen] = useState(false)
  const [callType , setCallType] = useState<TypeContent>(null) 
  

  return conversation === undefined ? (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2 className="w-8 h-8" />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex justify-center items-center">
      Conversation not found
    </p>
  ) : (
    <ConversationContainer>
      <Header
        imageUrl={
          conversation.isGroup ? "" : conversation.otherMember.imageUrl || ""
        }
        userName={
          conversation.isGroup
            ? conversation.name || ""
            : conversation.otherMember.userName || "Unknown"
        }
        option={
          conversation.isGroup
            ? [
               {
                label : "Delete Group" , 
                destructive : false,
                onClick() {
                    setDeleteGroupDialogOpen(true)
                },
               } , 
              {
                label : "Leave Group", 
                destructive: true,
                onClick() {
                    setLeaveGroupDialogOpen(true)
                }, 
                
              }
            ]
            : [
                {
                  label : "Remove friend",
                  destructive : true, 
                  onClick() {
                      setRemoveFriendDialogOpen(true)
                  },
                }
            ]
        }
      />
      <Body />
      <ChatBox />
    </ConversationContainer>
  );
};

export default ConversationDetails;


