"use client"
import React from "react";
import SideBarWrapper from "../component/sidebar/page";
import ItemList from "../component/item-list/ItemList";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import DMConversationItem from "./_components/DMConversation";

export default function ConversationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const conversations = useQuery(api.conversation.get);
  return (
    <SideBarWrapper>
      <ItemList title="conversation">
        {conversations ? (
          conversations.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No conversation found
            </p>
          ) : (
            conversations.map((conversationItem) => {
              if ("conversation" in conversationItem) {
                return conversationItem.conversation.isGroup ? null : (
                  <DMConversationItem
                    key={conversationItem.conversation._id}
                    id={conversationItem.conversation._id}
                    imageUrl={conversationItem.otherMember?.imageUrl || ""}
                    userName={conversationItem.otherMember?.userName || ""}
                    lastMessageContent={
                       conversationItem.lastMessage?.content
                    }
                    lastMessageSender={conversationItem.lastMessage?.sender}
                    
                  />
                );
              }
            })
          )
        ) : (
          <Loader2 />
        )}
      </ItemList>
      {children}
    </SideBarWrapper>
  );
}
