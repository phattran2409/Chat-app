import { Card } from "@/components/ui/card";
type Props = React.PropsWithChildren

export default function ConversationContainer({children} : Props) {
    return ( 
        <Card className="converstation-container w-full h-[calc(100svh-32px)] lg:h-full flex flex-col gap-2 p-2">
            {children}
        </Card>
    )
};
