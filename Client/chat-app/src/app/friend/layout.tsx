import React from "react";
import SideBarWrapper from "../component/sidebar/page";
import ItemList from "../component/item-list/ItemList";
import { AddfriendDialog } from "./_components/AddFriend";


export default function Friendlayout({
  children,
}: Readonly<{ children: React.ReactNode }>) { 
  return (
    <SideBarWrapper>
   
      {children}
    </SideBarWrapper>
  );
 
}
