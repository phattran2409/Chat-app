import React, { Dispatch, SetStateAction } from 'react';
import { Id } from '../../../../../../convex/_generated/dataModel';

import { api } from '../../../../../../convex/_generated/api';
import { useMutationState } from '@/app/hook/useMutation';
import { toast } from 'react-toastify';
import { ConvexError } from 'convex/values';
import { AlertDialog, AlertDialogContent, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';

interface ComponentNameProps {
  // Define props here
  ConversationId : Id<"conversations">, 
  open : boolean, 
  setOpen : Dispatch<SetStateAction<boolean>>

}

const ComponentName: React.FC<ComponentNameProps> = ({
    ConversationId , open , setOpen
}) => {
    const { mutate: removeFriend, pending } = useMutationState(
      api.friend.remove
    );
    const handleRemoveFriend = async () => { 
       await removeFriend({ConversationId}).then(() => {
        toast.success("remove friend success")
       }).catch((err) => {
        toast.error(err instanceof ConvexError ? err.data : "Unexcpectd Error occured")
       })
    }
  return <> 
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                         Are you sure
                    </AlertDialogTitle>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    </>;
};

export default ComponentName;