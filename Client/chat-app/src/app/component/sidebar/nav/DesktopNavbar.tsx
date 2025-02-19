"use client";
import useNavigation from "@/app/hook/useNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserButton } from "@clerk/nextjs";
import { MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";

export default function DesktopNavbar() {
  const paths = useNavigation();

  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
        <TooltipProvider>
          <nav className="">
            <ul className="space-y-4 flex flex-col">
              {paths.map((path, id) => (
                <li key={id} className="relative">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={path.href || ""}>
                        <Button
                          size="icon"
                          variant={path.active ? "default" : "outline"}
                        >
                          {path.icon}
                        </Button>
                      </Link>
                    </TooltipTrigger>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </nav>
        </TooltipProvider>
        <div className="lg:px-2 lg:py-4">
          <UserButton />
        </div>
  
    </Card>
  );
}
