"use client"
import { AddfriendDialog } from "@/app/friend/_components/AddFriend";
import useConversation from "@/app/hook/useConversation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
 

export default function ItemList({ 
    children , title , action : Action
} : React.PropsWithChildren<{ 
    title : string, 
    action? : React.ReactNode
}>) {
    const {isActive} = useConversation();
    return (
      <Card
        className={cn("hidden h-full w-full lg:flex-none lg:w-80 p-2 ", {
          block: !isActive,
          "lg:block": isActive,
        })}
      >
        <div className=" title-page mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight px-3 py-4">
            {title}
          </h1>
          {Action ? <AddfriendDialog /> : null}
        </div>
        <div className="information w-full h-full flex flex-col items-center justify-start gap-2 ">
          {children}
        </div>
      </Card>
    );
};
