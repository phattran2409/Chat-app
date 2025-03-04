"use client"
import { useMutationState } from '@/app/hook/useMutation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'react-toastify';
import { ConvexError } from 'convex/values';
import { Id } from '../../../../convex/_generated/dataModel';

interface ComponentNameProps {
  // Define props here
    userName : string | undefined, 
    imageUrl : string | undefined, 
    userId: Id<"users">
}

const FriendList : React.FC<ComponentNameProps> = ({userName , imageUrl , userId}) => {
    const {mutate : RemoveFriend , pending} = useMutationState(api.friend.removeFriend)
     const [openAlert , setOpenAlert] = useState(false)
    const handleRemoveFriend  =  async () => {
        RemoveFriend({userId}).then(() =>{ 
            toast.success("Delete Friend success")
        }).catch((err) => {
            toast.error(err instanceof ConvexError ? err.data : "Unexpected error occured")
        })
    }
  return (
    <>
      <Card className="flex w-full h-20 items-center justify-center p-4 gap-2">
        <div className="flex w-full items-center gap-2 ">
          <Avatar className="w-10 lg:w-10">
            <AvatarImage src={imageUrl} />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
          <div className="truncate">{userName}</div>
        </div>
        <div>
          <Button onClick={() => setOpenAlert(true)}>
            <X />
          </Button>
        </div>
      </Card>
      <Dialog  open={openAlert} onOpenChange={setOpenAlert}>
        <DialogContent className=''>
          <DialogHeader>
            <DialogTitle>Remove Friend</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {userName} as a friend? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenAlert(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRemoveFriend}
              disabled={pending}
            >
              {pending ? "Removing..." : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FriendList;