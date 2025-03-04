import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function useConversation() {
    const params = useParams()

    const conversationId = useMemo(() => params?.conversationId || ("" as string), [params?.conversationId])

    const isActive = useMemo(() => {
        
       return  !!conversationId
    } , [conversationId])
    return  {
        isActive , conversationId
    }
};
 