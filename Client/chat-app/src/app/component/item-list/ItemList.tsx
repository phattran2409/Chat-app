import { Card } from "@/components/ui/card";
import React from "react";
 

export default function ItemList({ 
    children , title , action : Action
} : React.PropsWithChildren<{ 
    title : string, 
    action? : React.ReactNode
}>) {
    return ( 
        <Card className="h-full w-full lg:flex-none "> 
            <div className=" title-page mb-4 flex justify-between items-center">
                 <h1 className="text-2xl font-semibold tracking-tight px-3 py-4">
                    {title}
                 </h1>
                {Action ? Action : null}
            </div>
            <div className="information w-full h-full flex flex-col items-center justify-start gap-2 ">
                {children}
            </div>
        </Card>
    )
};
