"use client"
import ConversationFallback from "@/app/component/conversation/conversationFallback";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function Error({error} : {error : Error}) {
    const router = useRouter();
    useEffect(() => { 
        router.push("/conversation")
    }, [error , router])

    return <ConversationFallback/>
};
