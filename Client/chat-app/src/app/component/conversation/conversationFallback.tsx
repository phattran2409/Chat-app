import { Card } from "@/components/ui/card";


export default function ConversationFallback( ) {
    return ( 
        <Card className="hidden lg:flex w-full h-full  justify-center items-center p-2 bg-secondary text-secondary-foreground">
            Select/start a conversation  to get started ! 
        </Card>
    )
};
