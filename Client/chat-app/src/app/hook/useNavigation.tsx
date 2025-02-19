"use client";
import { MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function useNavigation() {
  const pathName = usePathname();

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
      },
    ],
    [pathName]
  );

  return paths;
}
