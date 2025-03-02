import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
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
             <AvatarFallback>
                {userName.substring(0 , 1)}
             </AvatarFallback>
          </Avatar>
           <h2 className="font-semibold">
             {userName}
           </h2>
           <div className="setting flex gap-2">
              {option && ( <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button size="icon" variant="secondary">
                       <Settings/>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     {
                      option.map((option ,id) => { 
                          return (
                            <DropdownMenuItem
                             key={id}
                              onClick={option.onClick}
                              className={cn("font-semibold" , 
                                  {"text-destructive" : option.destructive}
                              )}
                            >
                                
                            </DropdownMenuItem>
                          )
                      })
                     }
                  </DropdownMenuContent>
              </DropdownMenu>)
              
              }
           </div>
        </div>
      </Card>
    );
}

export default Header