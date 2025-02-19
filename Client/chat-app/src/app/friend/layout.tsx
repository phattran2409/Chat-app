import React from "react";
import SideBarWrapper from "../component/sidebar/page";
import ItemList from "../component/item-list/ItemList";

export default function Friendlayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SideBarWrapper>
      <ItemList title="Friend"></ItemList>
      {children}
    </SideBarWrapper>
  );
 
}
