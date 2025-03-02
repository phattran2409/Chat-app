
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import React from "react";
import { from } from "svix/dist/openapi/rxjsStub";


interface Props {
  // Define props here
  fromCurrentUser: boolean;
  senderImg: string;
  senderName: string;
  lastByUser: boolean;
  content: string[];
  createAt: number;
  type: string;
}

const Messages: React.FC<Props> = ({
  fromCurrentUser,
  senderImg,
  senderName,
  lastByUser,
  content,
  createAt,
  type,
}) => {
  const formatTime = (timestamp: number) => {
    return format(timestamp, "HH:mm");
  };
  console.log("fromCurrentUser :", fromCurrentUser);
  return (
    <>
      <div
        className={cn("flex items-end ", {
          "justify-end": fromCurrentUser,
        })}
      >
        <div
          className={cn("message-content flex flex-col w-full mx-2 ", {
            "order-1 items-end": fromCurrentUser,
            "order-2 items-start": !fromCurrentUser,
          })}
        >
          <div
            className={cn("px-4 py-2 rounded-lg max-w-[70%]", {
              "bg-blue-500 text-primary-foreground": fromCurrentUser,
              "bg-secondary text-secondary-foreground ": !fromCurrentUser,
              "rounded-br-none": !lastByUser && fromCurrentUser,
              "rounded-bl-none": !lastByUser && !fromCurrentUser,
            })}
          >
            {type === "Text" ? (
              <p className="text-wrap break-words whitespace-pre-wrap">
                {content}
              </p>
            ) : null}
            <p
              className={cn("text-xs flex w-full my-2", {
                "text-primary-foreground justify-end": fromCurrentUser,
                "text-secondary-foreground": !fromCurrentUser,
              })}
            >
              {formatTime(createAt)}
            </p>
          </div>
        </div>

        <Avatar
          className={cn("relatived flex w-8 h-8", {
            "order-2": fromCurrentUser,
            "order-1": !fromCurrentUser,
          })}
        >
          <AvatarImage src={senderImg} />
          <AvatarFallback>
             {senderName.substring(0 , 1)}
          </AvatarFallback>
        </Avatar>
      </div>
    </>
  );
};

export default Messages;
