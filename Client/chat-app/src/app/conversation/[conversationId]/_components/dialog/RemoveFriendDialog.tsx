import React, { Dispatch, SetStateAction } from 'react';
import { Id } from '../../../../../../convex/_generated/dataModel';

import { api } from '../../../../../../convex/_generated/api';
import { useMutationState } from '@/app/hook/useMutation';
import { toast } from 'react-toastify';
import { ConvexError } from 'convex/values';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ComponentNameProps {
  // Define props here
  conversationId : Id<"conversations">, 
  open : boolean, 
  setOpen : Dispatch<SetStateAction<boolean>>

}

const RemoveFriendDialog: React.FC<ComponentNameProps> = ({
    conversationId , open , setOpen
}) => {
    const { mutate: removeFriend, pending } = useMutationState(
      api.friend.remove
    );
    const handleRemoveFriend = async () => { 
       await removeFriend({conversationId}).then(() => {
        toast.success("remove friend success")
       }).catch((err) => {
        toast.error(err instanceof ConvexError ? err.data : "Unexcpectd Error occured")
       })
    }
    console.log("prop OPEN :",open);
  return <> 
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                         Are you sure
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        this action cannot be undone .All message wwill be deleted ,and you message will be deleted and you will not be able to message this user. All group chats will still work as normal
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={pending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className='bg-red-500 text-white hover:bg-transparent hover:text-red-500 hover:border-red-500 hover:border-2' disabled={pending} onClick={handleRemoveFriend}>
                        Remove
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>;
};

export default RemoveFriendDialog;