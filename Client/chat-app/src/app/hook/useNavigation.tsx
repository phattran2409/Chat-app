"use client";
import { useQuery } from "convex/react";
import { MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { api } from "../../../convex/_generated/api";

export default function useNavigation() {
  const pathName = usePathname();
  const requestCount = useQuery(api.requests.count)
  const paths = useMemo(
    () => [
      {
        name: "Conversation",
        href: "/conversation",
        icon: <MessageSquare />,
        active: pathName.startsWith("/conversation"),
      },
      {
        name: "Friends",
        href: "/friend",
        icon: <Users/>,
        active: pathName.startsWith("/friend"),
        count: requestCount
      },
    ],
    [pathName]
  );

  return paths;
}
