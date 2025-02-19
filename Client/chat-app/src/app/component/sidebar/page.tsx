import React from "react";
import DesktopNavbar from "./nav/DesktopNavbar";
import MobileNavbar from "./nav/MobileNavbar";

export default function SideBarWrapper({children} : React.PropsWithChildren) {
    return (
      <div className="h-full w-full p-4 flex flex-col lg:flex-row gap-4">
        <MobileNavbar/>
        <DesktopNavbar/>
        <main className="h-[calc(100%-80px)] lg:h-full w-full flex gap-4">
            {children}
        </main>
      </div>
    );
};
