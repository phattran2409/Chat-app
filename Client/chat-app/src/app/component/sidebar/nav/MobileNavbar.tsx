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
import Link from "next/link";

export default function MobileNavbar() {
  const paths = useNavigation();

  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <TooltipProvider>
        <nav className="w-full flex justify-between">
          <ul className=" flex justify-around items-center w-full  ">
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

            <div className="">
              <UserButton />
            </div>
          </ul>
        </nav>
      </TooltipProvider>
    </Card>
  );
}
