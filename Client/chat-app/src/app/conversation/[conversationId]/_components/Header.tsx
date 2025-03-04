import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { CircleArrowLeft, Settings } from "lucide-react"
import Link from "next/link"
import React from "react"

 
type Props = {
    imageUrl : string, 
    userName : string, 
    option : {
       label : string, 
       destructive : boolean,
       onClick : () => void;
    }[]
}

const Header = ({imageUrl , userName , option} : Props) => {
    return (
      <Card className="w-full flex rounded-lg items-center p-2 justify-between">
        <div className="flex items-center gap-2">
          <Link href="/conversation" className="block lg:hidden">
            <CircleArrowLeft />
          </Link>
          <Avatar className="">
            <AvatarImage src={imageUrl} />
            <AvatarFallback>{userName.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold">{userName}</h2>
        </div>
        <div className="setting flex w-full items-end justify-end ">
          {option && (
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary" >
                  <Settings />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-emerald-600">
                {option.map((option, id) => {
                  return (
                    <DropdownMenuItem
                      key={id}
                      onClick={option.onClick}
                      className={cn(
                        "font-semibold relative right-2 top-2 w-full flex flex-col p-2 gap-2 rounded-lg border-2 border-gray-100",
                        {
                          "text-destructive": option.destructive,
                        }
                      )}
                    >
                      <Button className="bg-red-500 hover:bg-transparent hover:text-red-700 lg:text-xl md:text-sm text-nowrap ">
                        {option.label}
                      </Button>
     
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </Card>
    );
}

export default Header