import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
   
        <SignOutButton></SignOutButton>
  
    </>
  );
}
