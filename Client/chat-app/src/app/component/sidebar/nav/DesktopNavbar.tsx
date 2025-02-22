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
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";


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
                        className="relative"
                      >
                        {path.icon}
                      </Button>
                      {path.count ? (
                          <Badge className="absolute left-6 bottom-6 w-2 rounded-lg flex justify-center items-center" variant="destructive">
                            {path.count > 100 ? 99 : path.count}
                          </Badge>
                      ) : null}
                    </Link>
                  </TooltipTrigger>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
      </TooltipProvider>
      <div className="lg:px-2 lg:py-4 flex flex-col gap-4 items-center">
        <ul className="feature">
          <li>
            <ThemeToggle />
          </li>
        </ul>
        <UserButton />
      </div>
    </Card>
  );
}
